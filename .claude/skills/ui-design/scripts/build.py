#!/usr/bin/env python3
"""Turn a markdown report into a ui-design page.

    python build.py report.md -o out/

Writes ``out/index.html`` and copies ``style.css`` and ``script.js`` from the
skill's ``assets/`` directory next to it.

Front matter (YAML, optional)
-----------------------------
    ---
    title: The report title
    dek: One or two sentences that state the finding.
    eyebrow: RESEARCH REPORT
    date: 10 August 2026
    brand: Project name
    description: Used for the meta description tag.
    meta: ["12 min read", "v2"]        # chips under the hero rule
    nav:                                # header links; inferred from H2s if absent
      - {label: Method, href: "#method"}
    toc: true
    ---

Fenced blocks
-------------
``mermaid``   rendered as a diagram, themed with the page
``chart``     a JSON spec passed to ``UI.renderChart``
anything else a code block with a language label and a copy button

Only ``markdown-it-py`` and ``PyYAML`` are required.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sys
from pathlib import Path

try:
    import yaml
    from markdown_it import MarkdownIt
    from markdown_it.token import Token
except ImportError as exc:  # pragma: no cover
    sys.exit(f"missing dependency: {exc.name}. Install markdown-it-py and PyYAML.")

ASSETS = Path(__file__).resolve().parent.parent / "assets"

CALLOUT_KINDS = {
    "NOTE": ("note", "Note"),
    "TIP": ("tip", "Tip"),
    "IMPORTANT": ("note", "Important"),
    "WARNING": ("warning", "Warning"),
    "CAUTION": ("danger", "Caution"),
}

COPY_ICON = (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<rect x="9" y="9" width="13" height="13" rx="2"/>'
    '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
)


# --------------------------------------------------------------------------
# front matter
# --------------------------------------------------------------------------

# --------------------------------------------------------------------------
# math
# --------------------------------------------------------------------------

MATH_TOKEN = "MATHSPANZ{}Z"
MATH_TOKEN_RE = re.compile(r"MATHSPANZ(\d+)Z")
FENCE_RE = re.compile(r"^(\s*)(`{3,}|~{3,})")
INLINE_CODE_RE = re.compile(r"(`+)(?:(?!\1).)*\1", re.DOTALL)
DISPLAY_MATH_RE = re.compile(r"\$\$(.+?)\$\$", re.DOTALL)
INLINE_MATH_RE = re.compile(r"(?<!\$)\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\$)")


def protect_math(text: str) -> tuple[str, list[tuple[bool, str]]]:
    r"""Replace every math span with a plain token.

    markdown-it strips a backslash before punctuation, which corrupts LaTeX such
    as ``\{`` or ``\\``. Pulling the math out before the parse runs keeps the
    source intact. Fenced blocks and inline code are left alone, so a dollar
    sign inside a code sample stays a dollar sign.
    """
    spans: list[tuple[bool, str]] = []

    def take(display: bool, body: str) -> str:
        spans.append((display, body))
        return MATH_TOKEN.format(len(spans) - 1)

    # Walk the document fence by fence so code blocks are skipped whole.
    pieces: list[str] = []
    in_fence = False
    fence_marker = ""
    buffer: list[str] = []

    def flush(code: bool) -> None:
        if not buffer:
            return
        chunk = "\n".join(buffer)
        pieces.append(chunk if code else convert(chunk))
        buffer.clear()

    def convert(chunk: str) -> str:
        codes: list[str] = []

        def stash(m: re.Match) -> str:
            codes.append(m.group(0))
            return f"CODESPANZ{len(codes) - 1}Z"

        chunk = INLINE_CODE_RE.sub(stash, chunk)
        chunk = DISPLAY_MATH_RE.sub(lambda m: take(True, m.group(1).strip()), chunk)
        chunk = INLINE_MATH_RE.sub(lambda m: take(False, m.group(1)), chunk)
        for i, code in enumerate(codes):
            chunk = chunk.replace(f"CODESPANZ{i}Z", code)
        return chunk

    for line in text.splitlines():
        match = FENCE_RE.match(line)
        if match and not in_fence:
            flush(False)
            in_fence, fence_marker = True, match.group(2)[0] * 3
            buffer.append(line)
            continue
        if match and in_fence and match.group(2).startswith(fence_marker):
            buffer.append(line)
            flush(True)
            in_fence = False
            continue
        buffer.append(line)
    flush(in_fence)

    return "\n".join(pieces), spans


def restore_math(page: str, spans: list[tuple[bool, str]]) -> str:
    """Put the math back, escaped for HTML. KaTeX renders it in the browser."""
    if not spans:
        return page

    def block(m: re.Match) -> str:
        index = int(m.group(1))
        display, body = spans[index]
        if not display:
            return m.group(0)
        return f'<div class="math-block">$${html.escape(body)}$$</div>'

    page = re.sub(r"<p>\s*MATHSPANZ(\d+)Z\s*</p>", block, page)

    def token(m: re.Match) -> str:
        display, body = spans[int(m.group(1))]
        marker = "$$" if display else "$"
        return f"{marker}{html.escape(body)}{marker}"

    return MATH_TOKEN_RE.sub(token, page)


def split_front_matter(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw = text[3:end]
    body = text[end + 4 :].lstrip("\n")
    data = yaml.safe_load(raw) or {}
    if not isinstance(data, dict):
        return {}, text
    return data, body


# --------------------------------------------------------------------------
# footnotes, handled here so no plugin package is needed
# --------------------------------------------------------------------------

DEF_RE = re.compile(r"^\[\^([\w-]+)\]:[ \t]*(.*)$")
REF_RE = re.compile(r"\[\^([\w-]+)\]")


def extract_footnotes(text: str) -> tuple[str, list[tuple[str, str]]]:
    """Pull ``[^id]: text`` definitions out of the body.

    A definition continues while following lines are indented or blank-then-
    indented, which matches the usual markdown footnote shape.
    """
    lines = text.split("\n")
    kept: list[str] = []
    defs: dict[str, list[str]] = {}
    order: list[str] = []
    current: str | None = None

    for line in lines:
        match = DEF_RE.match(line)
        if match:
            current = match.group(1)
            order.append(current)
            defs[current] = [match.group(2)]
            continue
        if current is not None and (line.startswith(("    ", "\t")) or not line.strip()):
            if line.strip():
                defs[current].append(line.strip())
                continue
            current = None
            continue
        current = None
        kept.append(line)

    body = "\n".join(kept)
    numbers = {fid: i + 1 for i, fid in enumerate(order)}

    def sub(match: re.Match) -> str:
        fid = match.group(1)
        if fid not in numbers:
            return match.group(0)
        n = numbers[fid]
        return (
            f'<sup id="ref{n}"><a class="footnote-ref" href="#fn{n}" '
            f'aria-label="Footnote {n}">{n}</a></sup>'
        )

    body = REF_RE.sub(sub, body)
    items = [(str(numbers[f]), " ".join(defs[f]).strip()) for f in order]
    return body, items


def render_footnotes(items: list[tuple[str, str]], md: MarkdownIt) -> str:
    if not items:
        return ""
    rows = []
    for n, text in items:
        inner = md.renderInline(text)
        rows.append(
            f'<li id="fn{n}">{inner} <a class="footnote-back" href="#ref{n}" '
            f'aria-label="Back to text">&#8617;</a></li>'
        )
    return (
        '<section class="footnotes prose-col" aria-label="Footnotes">'
        "<ol>" + "".join(rows) + "</ol></section>"
    )


# --------------------------------------------------------------------------
# renderer
# --------------------------------------------------------------------------

def slugify(text: str) -> str:
    # A math token inside a heading must not reach the anchor, because the
    # token is an internal placeholder rather than words the reader can see.
    text = MATH_TOKEN_RE.sub("", text)
    s = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[\s_]+", "-", s)[:60] or "section"


class PageRenderer:
    def __init__(self) -> None:
        self.md = MarkdownIt("gfm-like", {"html": True, "linkify": True, "typographer": True})
        self.headings: list[tuple[int, str, str]] = []
        self.chart_calls: list[str] = []
        self.figure_no = 0
        self._install_rules()

    # -- rules ------------------------------------------------------------
    def _install_rules(self) -> None:
        rules = self.md.renderer.rules
        rules["fence"] = self._fence
        rules["table_open"] = lambda *a: '<div class="table-wrap breakout">\n<table>\n'
        rules["table_close"] = lambda *a: "</table>\n</div>\n"
        rules["heading_open"] = self._heading_open
        rules["blockquote_open"] = self._blockquote_open
        rules["blockquote_close"] = self._blockquote_close
        rules["image"] = self._image
        rules["hr"] = lambda *a: "<hr>\n"

    def _heading_open(self, tokens, idx, options, env) -> str:
        token = tokens[idx]
        level = int(token.tag[1])
        text = tokens[idx + 1].content
        if level in (2, 3):
            anchor = slugify(text)
            base = anchor
            n = 2
            while any(a == anchor for _, a, _ in self.headings):
                anchor = f"{base}-{n}"
                n += 1
            self.headings.append((level, anchor, text))
            return f'<{token.tag} id="{anchor}">'
        return f"<{token.tag}>"

    def _fence(self, tokens, idx, options, env) -> str:
        token = tokens[idx]
        info = (token.info or "").strip()
        lang = info.split()[0] if info else ""
        code = token.content

        if lang == "mermaid":
            self.figure_no += 1
            return (
                '<div class="figure breakout">'
                '<div class="figure__body">'
                f'<pre class="mermaid">{html.escape(code)}</pre>'
                "</div></div>\n"
            )

        if lang == "chart":
            return self._chart(code)

        label = lang or "text"
        cls = f' class="language-{html.escape(lang)}"' if lang else ""
        return (
            '<div class="code-block breakout">'
            '<div class="code-block__head">'
            f"<span>{html.escape(label)}</span>"
            '<button class="copy-btn" type="button" data-copy="code" '
            f'data-copy-message="Code copied">{COPY_ICON}Copy</button>'
            "</div>"
            f"<pre><code{cls}>{html.escape(code)}</code></pre>"
            "</div>\n"
        )

    def _chart(self, code: str) -> str:
        try:
            spec = json.loads(code)
        except json.JSONDecodeError as exc:
            return (
                '<div class="callout callout--danger breakout">'
                f"<p>Chart spec is not valid JSON: {html.escape(str(exc))}</p></div>\n"
            )
        caption = spec.pop("caption", None)
        self.figure_no += 1
        cid = f"chart-{self.figure_no}"
        self.chart_calls.append(
            f"UI.renderChart('#{cid}', {json.dumps(spec, ensure_ascii=False)});"
        )
        cap = ""
        if caption:
            cap = (
                f'<p class="figure__caption"><strong>Figure {self.figure_no}:</strong> '
                f"{self.md.renderInline(caption)}</p>"
            )
        return (
            '<div class="figure breakout--full breakout">'
            f'<div class="figure__body"><div id="{cid}"></div></div>'
            f"{cap}</div>\n"
        )

    def _blockquote_open(self, tokens, idx, options, env) -> str:
        inline = self._first_inline(tokens, idx)
        if inline is not None:
            match = re.match(r"\[!(\w+)\]\s*", inline.content)
            if match:
                kind = match.group(1).upper()
                if kind in CALLOUT_KINDS:
                    modifier, label = CALLOUT_KINDS[kind]
                    inline.content = inline.content[match.end() :]
                    inline.children = self.md.parseInline(inline.content, env)[0].children
                    env.setdefault("callout_depth", []).append(True)
                    return (
                        f'<div class="callout callout--{modifier}">'
                        f'<p class="callout__title">{label}</p>'
                    )
        env.setdefault("callout_depth", []).append(False)
        return "<blockquote>\n"

    def _blockquote_close(self, tokens, idx, options, env) -> str:
        stack = env.get("callout_depth") or [False]
        return "</div>\n" if stack.pop() else "</blockquote>\n"

    @staticmethod
    def _first_inline(tokens: list[Token], idx: int) -> Token | None:
        for token in tokens[idx + 1 : idx + 4]:
            if token.type == "inline":
                return token
        return None

    def _image(self, tokens, idx, options, env) -> str:
        token = tokens[idx]
        src = token.attrGet("src") or ""
        alt = token.content or ""
        title = token.attrGet("title") or ""
        self.figure_no += 1
        caption = title or alt
        cap = ""
        if caption:
            cap = (
                f'<p class="figure__caption"><strong>Figure {self.figure_no}:</strong> '
                f"{html.escape(caption)}</p>"
            )
        return (
            '<span class="figure breakout" style="display:block">'
            '<span class="figure__body figure__body--plain" style="display:block">'
            f'<img src="{html.escape(src)}" alt="{html.escape(alt)}" loading="lazy">'
            f"</span>{cap}</span>"
        )

    # -- entry point --------------------------------------------------------
    def render(self, text: str) -> str:
        return self.md.render(text)


# --------------------------------------------------------------------------
# page assembly
# --------------------------------------------------------------------------

def build_nav(meta: dict, headings: list[tuple[int, str, str]]) -> str:
    nav = meta.get("nav")
    if nav is None:
        nav = [
            {"label": text, "href": "#" + anchor}
            for level, anchor, text in headings
            if level == 2
        ][:5]
    return "".join(
        f'<a href="{html.escape(str(item["href"]))}">{html.escape(str(item["label"]))}</a>'
        for item in nav
    )


def build_chips(meta: dict) -> str:
    chips = []
    if meta.get("date"):
        chips.append(str(meta["date"]))
    chips.extend(str(x) for x in (meta.get("meta") or []))
    return "".join(f'<span class="chip">{html.escape(c)}</span>' for c in chips)


def assemble(meta: dict, body: str, footnotes: str, nav: str, chips: str, scripts: str) -> str:
    template = (ASSETS / "template.html").read_text(encoding="utf-8")
    title = str(meta.get("title", "Untitled report"))
    fields = {
        "{{TITLE}}": html.escape(title),
        "{{DESCRIPTION}}": html.escape(str(meta.get("description", meta.get("dek", "")))),
        "{{BRAND}}": html.escape(str(meta.get("brand", title))),
        "{{EYEBROW}}": html.escape(str(meta.get("eyebrow", "Report"))),
        "{{DEK}}": html.escape(str(meta.get("dek", ""))),
        "{{HEADER_NAV}}": nav,
        "{{META_CHIPS}}": chips,
        "{{CONTENT}}": body,
        "{{FOOTNOTES}}": footnotes,
        "{{SCRIPTS}}": scripts,
    }
    for key, value in fields.items():
        template = template.replace(key, value)

    if not meta.get("dek"):
        template = template.replace('<p class="hero__dek"></p>', "")
    if meta.get("toc") is False:
        template = template.replace('<aside class="toc scroll-hidden" data-toc', '<aside class="toc scroll-hidden" hidden data-toc')
    return template


def main() -> int:
    parser = argparse.ArgumentParser(description="Build a ui-design page from markdown.")
    parser.add_argument("source", type=Path, help="the markdown report")
    parser.add_argument("-o", "--out", type=Path, default=Path("out"), help="output directory")
    parser.add_argument("--name", default="index.html", help="output file name")
    args = parser.parse_args()

    text = args.source.read_text(encoding="utf-8")
    meta, body_md = split_front_matter(text)
    body_md, math_spans = protect_math(body_md)
    body_md, footnote_items = extract_footnotes(body_md)

    renderer = PageRenderer()
    body_html = renderer.render(body_md)
    footnotes_html = render_footnotes(footnote_items, renderer.md)

    scripts = ""
    if renderer.chart_calls:
        scripts = "<script>\n" + "\n".join(renderer.chart_calls) + "\n</script>"

    page = assemble(
        meta,
        body_html,
        footnotes_html,
        build_nav(meta, renderer.headings),
        build_chips(meta),
        scripts,
    )

    page = restore_math(page, math_spans)

    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / args.name).write_text(page, encoding="utf-8")
    for asset in ("style.css", "script.js"):
        shutil.copy2(ASSETS / asset, args.out / asset)

    print(f"wrote {args.out / args.name}")
    print(f"  {len(renderer.headings)} headings, {renderer.figure_no} figures, "
          f"{len(renderer.chart_calls)} charts, {len(footnote_items)} footnotes, "
          f"{len(math_spans)} math spans")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
