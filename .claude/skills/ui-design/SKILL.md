---
name: ui-design
description: >-
  Builds HTML pages in an Apple-derived design system: one light and dark token set, a 52px glass header, a collapsible left table of contents, a 730px reading column with adaptive figure breakout, a data-driven chart renderer, and themed Mermaid diagrams. Includes a markdown-to-page converter for research reports. Use when creating any HTML page, report, dashboard, or documentation site.
---

# ui-design

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A routing file: it names its own resource files, and CSS, HTML, SVG, CDN,
     and the filenames are standard terms. Skill files use bold lead-in
     bullets by house convention. -->

The system comes from six Apple pages: four Apple Machine Learning Research
articles and two Apple Newsroom press releases. The kit fuses the two families
into one page shape. Sources are in [reference/](reference/).

## Two ways to build a page

**A markdown report.** Write the report, then run the converter. This is the
common path.

```bash
python .claude/skills/ui-design/scripts/build.py report.md -o out/
open out/index.html
```

**A hand-built page.** Copy `assets/template.html`, `assets/style.css`, and
`assets/script.js` into the output directory. Replace the `{{...}}` fields and
write the body with the component markup from [COMPONENTS.md](COMPONENTS.md).

Both paths produce three files: `index.html`, `style.css`, `script.js`.

## Rules that decide the look

1. **One token set, two themes.** Every colour is a CSS custom property with a
   light value and a dark value. No component rule names a hex value. Change a
   token, change the page.
2. **The reading column is 730px.** Body text is 17px on a 1.6 line height,
   about 76 characters per line. No block inside it has its own side
   padding, so a list marker, a callout border, or a table card lines up with
   plain paragraph text at the same edge.
3. **A figure claims the width it needs.** It grows to 980px maximum, centres
   in the space to the right of the contents rail, and never slides under it.
   Its caption returns to 730px.
4. **The header is 52px and dark in both themes.** Glass blur, one hairline
   progress bar under it.
5. **The contents rail is fixed to the left gutter.** It never pushes the
   prose, so a page with a rail lines up with a page without one.
6. **Type is Inter. Code is Monaspace Neon.** No other family appears.
7. **Motion stops for a reader who asks it to stop.** Every animation sits
   behind `prefers-reduced-motion`.
8. **Math keeps its source.** The converter pulls every `$...$` and `$$...$$`
   span out before the markdown parse and puts it back afterwards, because
   markdown-it strips the backslash in front of punctuation and would corrupt
   the LaTeX. KaTeX renders it in the browser.
9. **A reader can mark up the page.** Selecting text raises a highlighter with
   four colours and an optional note. Highlights are stored per page in the
   browser.

## File map

| Need | File |
|---|---|
| Colour values, type scale, spacing, radius, shadow, the theme mechanism | [DESIGN-TOKENS.md](DESIGN-TOKENS.md) |
| Page frame, header, hero, columns, breakout, contents rail, responsive rules | [LAYOUT.md](LAYOUT.md) |
| Prose elements, callouts, cards, buttons, toast, tabs, mockups | [COMPONENTS.md](COMPONENTS.md) |
| `renderChart` API, chart types, tables, stat tiles, code blocks | [DATA-VISUALIZATION.md](DATA-VISUALIZATION.md) |
| Mermaid theming and diagram authoring rules | [DIAGRAMS.md](DIAGRAMS.md) |
| Reader text highlighting, notes, and the record format | [HIGHLIGHTS.md](HIGHLIGHTS.md) |
| Front matter, fence handling, math delimiters, the converter contract | [MARKDOWN-PIPELINE.md](MARKDOWN-PIPELINE.md) |
| Defects in the source pages and how this kit avoids them | [PITFALLS.md](PITFALLS.md) |

## Kit contents

```
ui-design/
  assets/
    style.css        the whole system: tokens, frame, document, components
    script.js        8 runtime modules, public surface is window.UI
    template.html    the page shell, with {{FIELD}} placeholders
  scripts/
    build.py         markdown report -> page
  reference/
    demo-report.md   a fixture that exercises every construct
    *.html           the six Apple source pages
```

## Dependencies

Every page loads seven pinned resources. All of them need network access when
the page opens.

| Resource | Version | Purpose |
|---|---|---|
| `cdn.tailwindcss.com` | 3.4.17 | utility classes for hand-built markup |
| Google Fonts | Inter 400 to 700 | all text |
| `@fontsource/monaspace-neon` | 5.3.0 | code only |
| `mermaid` | 11 | diagrams |
| `highlight.js` | 11.10.0 | syntax colours, two themes |
| `lucide` | 0.454.0 | icons |
| `KaTeX` | 0.16.11 | math, with the auto-render extension |

The converter needs `markdown-it-py` and `PyYAML`. Nothing else.

## The runtime surface

```js
UI.renderChart('#target', spec)   // see DATA-VISUALIZATION.md
UI.showToast('Copied')            // announced with aria-live
UI.setTheme('dark')               // 'light' | 'dark' | 'system'
UI.getTheme()                     // resolved 'light' | 'dark'
UI.buildToc()                     // rebuild the rail after adding headings
UI.highlights.list()              // -> the array of highlight records for this page
UI.highlights.clear()             // removes every highlight from the page and storage
UI.highlights.exportJSON()        // copies pretty-printed JSON, returns the JSON string
UI.highlights.importJSON(text)    // parses text, replaces the stored set, re-renders
document.addEventListener('themechange', fn)
```

## Check the result

Render the page before you call it done.

```bash
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1440,3000 --virtual-time-budget=15000 \
  --screenshot=shot.png "file://$PWD/out/index.html"
```

`--screenshot` captures the window, not the whole scrollable page. Set the
window height to the page height, or the shot stops part way down. A report
with four sections and three figures runs 6000px to 8000px. To read one band
of a long page, hide the rest with a temporary style block:

```bash
python - <<'EOF'
import pathlib
p = pathlib.Path('out/index.html'); h = p.read_text()
css = "<style>.hero{display:none}.doc>*{display:none}#results,#results~*{display:block}</style>"
pathlib.Path('out/band.html').write_text(h.replace('</head>', css + '</head>'))
EOF
```

To see the dark theme, copy the page and set `data-theme="dark"` on the `html`
element. The checklist is at the end of [PITFALLS.md](PITFALLS.md).
