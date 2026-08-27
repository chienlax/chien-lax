# Components

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A markup catalogue: HTML, CSS, ARIA, SVG, and the class names are
     standard terms. -->

Copy-paste markup for every component in the kit. Data components are in
[DATA-VISUALIZATION.md](DATA-VISUALIZATION.md). Diagrams are in
[DIAGRAMS.md](DIAGRAMS.md).

The converter emits most of this automatically. Reach for the markup when you
build a page by hand.

## Prose

Inside `.doc`, plain elements are already styled. Write `<p>`, `<h2>`, `<ul>`,
`<hr>` with no classes.

```html
<article class="doc" data-toc-root>
  <p class="lead">A larger opening paragraph, 18 to 22px.</p>
  <p>Body text at 17px on a 1.6 line height.</p>
  <h2>A section</h2>
  <h3>A subsection</h3>
  <ul><li>An item</li></ul>
</article>
```

An H2 and an H3 gain an id and a hover-revealed `#` anchor from `script.js`.

### Pull quote

```html
<blockquote>
  <p>The quoted sentence, in italic at 19px.</p>
  <cite>Section 3.2, problem description</cite>
</blockquote>
```

### Callout

Four tones. Each one takes a 3px left edge in its own colour.

```html
<div class="callout callout--note">
  <p class="callout__title">Note</p>
  <p>The body, at 15px.</p>
</div>
```

`callout--note` blue, `callout--tip` green, `callout--warning` amber,
`callout--danger` red. In markdown, write `> [!NOTE]` as the first line of a
blockquote.

### Figure and caption

```html
<div class="figure breakout">
  <div class="figure__body">
    …the figure…
  </div>
  <p class="figure__caption"><strong>Figure 3:</strong> What it shows.</p>
</div>
```

Add `figure__body--plain` to drop the card, which suits a photograph. The
caption returns to the 730px measure on its own.

The converter's markdown `![alt](src)` syntax always emits `figure__body--plain`,
since a pasted image is normally a photograph. A diagram or a chart image
needs the card kept, so write the raw HTML block above directly instead of
markdown image syntax — see the pre-rendered-diagram pattern in
`PITFALLS.md`'s "Five or more Mermaid diagrams on one page" section for a
worked example with a light/dark image pair.

### Footnote

```html
<p>A claim.<sup id="ref1"><a class="footnote-ref" href="#fn1">1</a></sup></p>

<section class="footnotes prose-col">
  <ol>
    <li id="fn1">The note. <a class="footnote-back" href="#ref1">&#8617;</a></li>
  </ol>
</section>
```

Jumping to a footnote flashes its background for two seconds. Only one of the
six source pages wires the whole loop. Two of them leave the numbers inert.

### Citation cross-link

Links a body mention of an author to that paper's row in a Sources table. Use
this on a report with a Sources or References table, so a reader mid-paragraph
can jump straight to the full entry instead of scanning down.

```html
<p>…Talluri and van Ryzin's
  <a class="citation-link" id="citeref-talluri-van-ryzin-2004" href="#src-talluri-van-ryzin-2004">(2004)</a>
  concept of an efficient set…</p>

<table>
  <tr>
    <td><a id="src-talluri-van-ryzin-2004" class="citation-anchor">Talluri and van Ryzin 2004</a>
      <a class="citation-back" href="#citeref-talluri-van-ryzin-2004" aria-label="Back to text">&#8617;</a></td>
    <td>…</td>
  </tr>
</table>
```

Rules:

- One `src-{slug}` anchor per paper, on its Sources-table row. If the report
  has both a per-section reading list and a Sources table, anchor the Sources
  table only — one canonical target per paper.
- One `citeref-{slug}` id per paper, on its first prose mention. A later
  mention of the same paper links to the same `#src-{slug}` target but has
  no `id`, so the back-arrow always returns to the first mention.
- `{slug}` is kebab-case surname(s) and year, matching the footnote system's
  `ref{n}`/`fn{n}` pair in shape: `train-2009`, `talluri-van-ryzin-2004`.
- `class="citation-anchor"` has no `href`, so it is a jump target, not a
  link. `.doc a.citation-anchor` overrides the kit's blanket `.doc a` color
  rule back to plain text, since an unclickable blue span reads as a dead
  link. The extra `.doc a` prefix is required: a bare `.citation-anchor`
  loses the specificity fight against `.doc a`, the same trap `PITFALLS.md`
  already documents for the `fig-dark` swap.
- The citation-link color reuses `--accent`, the same blue the footnote
  numbers use, so both link types read as one system.

Jumping to a `src-` target flashes its background the same way a footnote
jump does — `initJumpFlash` in `script.js` matches both `#fn` and `#src-`
hashes.

## Cards and surfaces

```html
<div class="card">A card on the tinted surface.</div>
<div class="card card--nested">A card inside a card.</div>
<div class="card card--interactive">Lifts on hover.</div>
```

### Comparison panel

Two columns above 768px, one below.

```html
<div class="figure breakout">
  <div class="figure__body">
    <div class="compare">
      <div class="card card--nested">
        <p class="compare__label">Low resolution</p>
        <p>The answer text.</p>
        <p class="verdict verdict--fail">✕ Incorrect</p>
      </div>
      <div class="card card--nested">
        <p class="compare__label">High resolution</p>
        <p>The answer text.</p>
        <p class="verdict verdict--pass">✓ Correct</p>
      </div>
    </div>
  </div>
  <p class="figure__caption"><strong>Figure 1:</strong> The comparison.</p>
</div>
```

### Mockup frame

The device and application chrome from the newsroom pages.

```html
<div class="mockup breakout">
  <div class="mockup__screen">
    <div class="mockup__chrome">
      <span class="mockup__dot" style="background:#ff5f57"></span>
      <span class="mockup__dot" style="background:#febc2e"></span>
      <span class="mockup__dot" style="background:#28c840"></span>
    </div>
    <div style="padding:1rem">…the screen…</div>
  </div>
</div>
```

The three traffic-light dots are the only place a literal hex belongs. They
are a real object, not a themed surface.

## Controls

### Buttons

```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--outline">Outline</button>
<button class="btn btn--quiet">Quiet</button>
<button class="icon-btn" aria-label="Copy link">…svg…</button>
```

Every button is a pill, which matches all six source pages. An icon button is
32px and round, and it always needs an `aria-label`.

### Segmented control

```html
<div class="segmented" data-segmented="sizes">
  <button data-value="0.5B" data-panel="#p1" aria-selected="true">0.5B</button>
  <button data-value="1.5B" data-panel="#p2">1.5B</button>
</div>

<div id="p1" data-panel-group="sizes">…</div>
<div id="p2" data-panel-group="sizes" hidden>…</div>
```

`script.js` wires the selection, the panel swap, and a `segmentchange` event.
**Never ship a segmented control with no handler.** Three figures in the
source pages look interactive and do nothing when clicked.

### Collapsible section

```html
<details>
  <summary class="collapse__summary">
    <svg …>▸</svg> The heading
  </summary>
  <p>The body.</p>
</details>
```

### Toast

One call. The element builds itself if the page has none.

```js
UI.showToast('Link copied');
```

The element sets `role="status"` and `aria-live="polite"`, so a screen reader
announces it. No source page announces its toast.

### Copy buttons

Declarative, no JavaScript to write.

```html
<button class="icon-btn" data-copy="link" data-copy-message="Link copied">…</button>
<button class="copy-btn" data-copy="code">Copy</button>
<button class="copy-btn" data-copy="#summary-text">Copy summary</button>
```

`data-copy="code"` copies the `<code>` inside the enclosing `.code-block`. Any
other value is treated as a selector. The handler uses
`navigator.clipboard.writeText` and falls back to the older path on `file://`.

### Back to top

```html
<button class="to-top" data-to-top aria-label="Back to top">…svg…</button>
```

It appears after 800px of scrolling.

### Theme toggle

```html
<button class="icon-btn" data-theme-toggle aria-label="Switch theme" aria-pressed="false">
  <svg data-icon-moon …></svg>
  <svg data-icon-sun … style="display:none"></svg>
</button>
```

The module swaps the icon, the label, and the `aria-pressed` state, and stores
the choice. Charts and diagrams redraw on the `themechange` event.

## Chips and status

```html
<span class="chip">12 min read</span>
<span class="verdict verdict--pass">✓ Correct</span>
<span class="verdict verdict--fail">✕ Incorrect</span>
```

## Accessibility rules for every component

1. An icon-only button needs an `aria-label`.
2. A decorative SVG needs `aria-hidden="true"`.
3. Never remove a focus ring. `:focus-visible` is styled once, globally.
4. A control that shows or hides a region needs `aria-expanded`.
5. A transient message needs `role="status"` and `aria-live="polite"`.
6. Headings descend one level at a time. Never pick an H3 because it looks
   right.
