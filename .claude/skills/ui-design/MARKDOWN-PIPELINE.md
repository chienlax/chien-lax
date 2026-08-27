# Markdown pipeline

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A tool reference: YAML, HTML, JSON, CSS, and the flag names are standard
     terms. -->

`scripts/build.py` turns a markdown report into a page. It needs
`markdown-it-py` and `PyYAML` and nothing else.

```bash
python .claude/skills/ui-design/scripts/build.py report.md -o out/
```

Output:

```
out/index.html    the page
out/style.css     copied from assets/
out/script.js     copied from assets/
```

The `--name` flag renames the HTML file. Rerunning overwrites all three.

## Front matter

Every key is optional. Without any front matter the page still builds.

```yaml
---
title: Scheduling under a dominant-enrollment proctor rule
dek: A per-room attribution rule couples three decision families.
eyebrow: Research report
date: 10 August 2026
brand: Timetabling study
description: Used for the meta description tag.
meta:
  - 12 min read
  - v2
nav:
  - {label: Method, href: "#method"}
toc: true
---
```

| Key | Effect |
|---|---|
| `title` | the H1, the tab title, and the header brand when `brand` is absent |
| `dek` | the 22px summary under the title. Omitted keys leave no empty element |
| `eyebrow` | the uppercase line above the title, default `Report` |
| `date` | the first chip under the hero rule |
| `meta` | more chips, in order |
| `brand` | the header wordmark |
| `description` | the meta description tag, default `dek` |
| `nav` | header links. Without it, the first five H2 headings are used |
| `toc` | set `false` to hide the contents rail |

## Construct mapping

| Markdown | HTML |
|---|---|
| `##`, `###` | an anchored heading, plus a contents entry |
| paragraph | `<p>` at 17px on 1.6 |
| `>` blockquote | a pull quote with a left rule |
| `> <cite>…</cite>` | the source line under a pull quote |
| `> [!NOTE]` | a callout. `TIP`, `IMPORTANT`, `WARNING`, `CAUTION` also work |
| table | a carded table inside a scrolling breakout wrapper |
| ` ```mermaid ` | a themed diagram in a figure |
| ` ```chart ` | a rendered chart, numbered and captioned |
| any other fence | a code block with a language label and a copy button |
| `![alt](src)` | a numbered figure with the alt text as its caption |
| `[^1]` and `[^1]: …` | a superscript reference and a footnote with a backlink |
| `---` | a hairline rule |
| `$...$` and `$$...$$` | math, rendered by KaTeX in the browser |

Inline HTML passes through, so any component from
[COMPONENTS.md](COMPONENTS.md) can be dropped into the markdown directly. A
sourced pull quote uses that route:

```markdown
> The quoted sentence.
> <cite>Section 3.2, problem description</cite>
```

## Math

Write LaTeX between single dollar signs for inline math and between double
dollar signs for display math. KaTeX renders it in the browser.

```markdown
Each courier $k \in \mathcal{K}$ declines when the surplus is negative.

$$
\min \sum_{k,d} c_{ij} x^{kd}_{ij} + \pi^B \sum_{i,d} g^d_i
$$
```

The converter pulls every math span out of the source before the markdown parse
runs, replaces it with a plain token, and puts it back after the page is
assembled. Without that step markdown-it strips the backslash in front of
punctuation, which turns `\{1, \dots\}` into `{1, \dots}` and breaks the
expression.

Three consequences follow:

1. A dollar sign inside a fenced block or inside inline code stays a dollar
   sign. Neither is scanned for math.
2. A display block that stands alone in its own paragraph becomes a
   `div.math-block`, which scrolls sideways when the expression is wider than
   the reading column.
3. An opening dollar sign followed by a space, or a closing dollar sign
   preceded by a space, is treated as ordinary text. Write `$x_i$`, never
   `$ x_i $`.

The build report prints the span count, so a page that reports zero math spans
while the source uses dollar signs points at a delimiter written with a space.

## The chart fence

The body is the JSON spec from [DATA-VISUALIZATION.md](DATA-VISUALIZATION.md),
plus one extra key, `caption`.

````markdown
```chart
{
  "type": "groupedBar",
  "title": "Solve time to a 2 percent gap",
  "categories": ["Small", "Medium", "Large"],
  "unit": "s",
  "series": [
    {"name": "Baseline", "values": [11, 24, 38]},
    {"name": "With rule", "values": [38, 96, 172]}
  ],
  "caption": "The rule multiplies solve time by roughly four."
}
```
````

Invalid JSON produces a red callout naming the parse error, so the failure is
visible on the page instead of silent.

## Figure numbering

One counter runs across charts, images, and Mermaid blocks, in document
order. A caption reads `Figure 3:` in bold, then the text. A Mermaid block
takes a number but no caption, because the fence has nowhere to put one.
Write the caption as the sentence before the diagram.

## Footnotes

Handled inside `build.py`, so no plugin package is needed.

```markdown
The claim.[^rule]

[^rule]: The note text. Indented continuation lines join the same note.
```

References are numbered in definition order. Each note gets a back-link, and
jumping to one flashes its background.

## Writing a report for this pipeline

1. **One H1 comes from the front matter.** Start the body at `##`.
2. **Keep H2 titles short.** They appear in the header nav and the contents
   rail.
3. **State the finding in the `dek`.** A reader who reads nothing else reads
   that sentence.
4. **Put a number in the caption.** A chart shows a shape, and the caption
   states the value.
5. **Prefer a table when the reader will quote the number.** A chart is for a
   comparison, a table is for a value.

## Extending the converter

Renderer rules are installed in `PageRenderer._install_rules`. Each one is a
markdown-it render rule, so adding a construct means adding one method:

| Rule | Method |
|---|---|
| `fence` | `_fence`, which routes `mermaid` and `chart` |
| `heading_open` | `_heading_open`, which assigns the id and records the entry |
| `blockquote_open` | `_blockquote_open`, which detects the callout marker |
| `table_open` | a lambda that emits the wrapper |
| `image` | `_image`, which wraps and numbers the figure |
