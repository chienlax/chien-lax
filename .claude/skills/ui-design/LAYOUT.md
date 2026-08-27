# Layout

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A structural reference: CSS, HTML, TOC, and px are standard terms. -->

The page frame, the columns, and how a figure escapes the reading measure.

## The frame

```
┌──────────────────────────────────────────────────────────┐
│ ◆ Brand    Summary  Method  Results       ⌕ ⎙ ☾          │  52px glass, fixed
├──────────────────────────────────────────────────────────┤
│▔▔▔▔▔▔▔▔▔▔▔▔                                              │  2px progress
│              ░░░░░░░ hero band ░░░░░░░░                  │  tinted, full width
│ ▾ Summary  │ RESEARCH REPORT · 10 Aug 2026 │             │
│ ▾ Method   │ The title                     │             │
│   Setup    │ The dek paragraph             │             │
│ ▸ Results  │ ───────────────               │             │
│            │ [chip] [chip] 🔗              │             │
│  260px     ├───────────────────────────────┤             │
│  fixed     │      730px prose column       │             │
│  rail      │                               │             │
│            │ ◄──── 980px breakout ────►    │             │
└──────────────────────────────────────────────────────────┘
```

Four fixed elements sit above the flow: the header at `z-50`, the progress
hairline at `z-49`, the contents rail at `z-40`, and the toast at `z-70`.

## The header

One rule, `.glass-header`, replaces the two the source pages use
(`.ml-header` on the research pages, `.apple-nav` on the newsroom pages). The
difference between them was the background colour, which is now
`--header-bg`.

```html
<header class="glass-header">
  <div class="glass-header__inner">
    <div style="display:flex;align-items:center;gap:.5rem">
      <button class="icon-btn toc-toggle" data-toc-toggle aria-expanded="false"
              aria-label="Show contents">…</button>
      <a class="glass-header__brand" href="#top">Project name</a>
    </div>
    <nav class="glass-header__nav" aria-label="Sections">
      <a href="#method">Method</a>
      <a href="#results" aria-current="true">Results</a>
    </nav>
    <div class="glass-header__actions">…</div>
  </div>
</header>
```

- The bar is 52px, dark, and blurred in both themes. Its text is always light.
- The section nav appears at 1024px and above. Below that it disappears, and
  the contents button takes over. At 768px a five-item nav wrapped onto two
  lines and broke the bar height, which is why the breakpoint is 1024 and not
  768.
- Keep the nav to five links. Longer labels belong in the contents rail.
- The inner container is 980px wide, so the brand lines up with the widest
  figure below it.

## The hero band

The tinted band is the research-page pattern. The dek paragraph and the chip
row come from the newsroom pages.

```html
<section class="hero">
  <div class="prose-col">
    <p class="hero__eyebrow">Research report</p>
    <h1 class="hero__title">The title</h1>
    <p class="hero__dek">One or two sentences that state the finding.</p>
    <div class="hero__rule"></div>
    <div class="hero__meta">
      <span class="chip">10 August 2026</span>
      <span class="chip">12 min read</span>
    </div>
  </div>
</section>
```

The band spans the full page width and its content sits in the 730px column.
Its top padding clears the fixed header.

## The columns

`.doc` sets no width. Each child claims its own. A figure can therefore exceed
the reading measure without leaving the flow. No block, wide or narrow, has
its own side padding — its box edge and its text edge are the same edge, so a
list marker, a callout border, or a table card lines up with plain paragraph
text instead of sitting inset from it.

```css
.doc > *            { max-width: 730px; margin-inline: auto; }
.doc > .breakout    { width: fit-content; min-width: min(100%, 730px);
                      max-width: min(980px, 92vw); }
.doc > .breakout--full { width: 100%; max-width: min(980px, 92vw); }
```

**The adaptive rule.** A figure declares no fixed width. It grows to what its
content needs, stops at 980px, and centres. Content that is tall and narrow
stays narrow, because `width: fit-content` never stretches it. Content that is
wide and short reaches the full breakout. A chart uses `breakout--full`,
because an SVG has no natural width to shrink to.

**The caption always returns to 730px.** `.figure__caption` sets its own
`max-width`, so a caption under a 980px figure still reads at the prose
measure. This matches every figure in the source pages.

**The rail never collides with a figure.** Above 1280px, `main` and `.hero`
take a left padding equal to the rail's width, so the rail is excluded from
their content box once, at the top of the tree:

```css
@media (min-width: 1280px) {
  main, .hero { padding-left: 260px; }
}
```

Every centred child inside (prose blocks, breakouts, figure captions)
inherits the correction, because a box centred inside an already-corrected
box lands in the corrected position too. The breakout formula itself needs no
rail-aware term: `min(980px, 92vw)` alone clears the rail, since 980px is
already smaller than the content box's minimum width once the rail appears
(1280px viewport minus 260px rail leaves 1020px, still wider than 980px). The
prose column centres on the space to the right of the rail, not on the full
viewport. A page with a rail and a page without one no longer line up. That
is the intended result: the rail visibly narrows the reading area, so the
reading area should visibly recentre in what is left.

## The contents rail

The rail builds itself from the H2 and H3 elements inside `[data-toc-root]`.
No source page has one.

```html
<aside class="toc scroll-hidden" data-toc aria-label="Table of contents">
  <div class="toc__label">On this page</div>
  <div data-toc-body></div>
</aside>
```

- Each H2 becomes a row. An H2 with H3 children gains a caret that collapses
  them. An H2 with no children keeps an invisible caret, so every label starts
  at the same x position.
- The nested level indents past the caret column. Without that indent an H3
  lines up with an H2 and reads as a sibling.
- `.scroll-hidden` removes the scrollbar and keeps the scrolling. The rail
  scrolls on its own with `overscroll-behavior: contain`, so reaching its end
  does not scroll the page.
- An `IntersectionObserver` marks the current section with
  `aria-current="true"`.
- Below 1280px the rail becomes a slide-in drawer with a scrim. Escape closes
  it, and so does clicking any link inside it.

Skip a heading with `data-toc-skip`. Rebuild the rail after inserting headings
with `UI.buildToc()`.

## Responsive behaviour

| Width | What changes |
|---|---|
| ≥ 1280px | The rail is fixed and visible. The reading column recentres in the space it leaves, and figures already reach the full 980px there. |
| 1024 to 1279px | The rail becomes a drawer; the header nav stays |
| 768 to 1023px | The header nav hides; the contents button remains |
| < 768px | Comparison grids collapse to one column; figures fill the width |

Nothing sets a fixed pixel width on prose. Every measure is a `max-width`, so
no page scrolls horizontally at any size.

## Print

`style.css` ends with a print block written in plain CSS. Tailwind Play
generates classes at runtime, so a `print:` utility never reaches the printer
reliably. The block hides the header, rail, progress bar, toast, and buttons,
prevents figures and tables from splitting across pages, and prints each link
target after its text.
