# Pitfalls

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A defect list: CSS, ARIA, SVG, CDN, and the file names are standard
     terms. -->

Nine defects found in the six source pages, what each one costs, and how this
kit answers it. Then a checklist to run before shipping a page.

## Defects in the source pages

**1. No toast is announced.** Five pages show a toast on copy. None sets
`role="status"` or `aria-live`, so a screen reader never hears "Copied to
clipboard". The kit sets both on the element and builds it that way when the
page has none.

**2. A focus ring is removed with no replacement.** Both newsroom pages set
`outline-none` on the search input. No page defines any `:focus` or
`:focus-visible` style, so keyboard users depend on whatever the browser does
after the Tailwind reset. The kit styles `:focus-visible` once, globally, with
a 2px accent ring.

**3. No page handles reduced motion.** Three keyframe animations and dozens of
transitions run regardless of the reader's setting. The kit ends `style.css`
with a `prefers-reduced-motion: reduce` block that collapses every duration.

**4. Decorative SVG is unlabelled.** Logos, illustrations, and chart paths
have no `aria-hidden` and no `role="img"`, so assistive technology reports
unlabelled graphics. The kit marks decorative icons hidden and gives every
chart a `role` and a label.

**5. Dependencies float.** Every page loads `lucide@latest`, so the icon
markup can change between two visits. The kit pins all six dependencies to an
exact version.

**6. Controls that do nothing.** Three FastVLM figures show segmented controls
that look interactive and have no click handler. The kit wires
`[data-segmented]` automatically, and a control with no panel still emits a
`segmentchange` event.

**7. Dead CSS.** The complete FastVLM page defines `.animated-flow` and never
uses it. The kit provides the same recipe as `.flow-line`, with an example in
[DIAGRAMS.md](DIAGRAMS.md).

**8. Declared tokens go unused.** Every page defines an `apple.*` Tailwind
palette and then writes `bg-[#f5f5f7]` in the markup. The design system exists
in the config and not on the page. In this kit no component rule names a hex
value, and the Tailwind colours point at the same custom properties the CSS
uses.

**9. One source file is truncated.**
`apple_machine_learning_research_fastvlm.html` ends at line 406 with no
closing tags, no script block, and no footer. It duplicates
`fastvlm_apple_machine_learning_research.html`, which is complete at 1086
lines. Read FastVLM patterns from the complete file.

## Mistakes to avoid in a new page

**Do not write a hex value in a component rule.** It survives the theme
switch and then fights the page. Use a token.

**Do not define a colour only inside a dark block.** It resolves to nothing in
light mode. Every token needs a light value on bare `:root`.

**Do not set a fixed pixel width on content.** Every measure is a
`max-width`. A fixed width scrolls the page sideways on a phone.

**Do not put a wide `flowchart LR` in a report.** It scales down and its
labels become unreadable. Use `TD`. See [DIAGRAMS.md](DIAGRAMS.md).

**Do not truncate a bar axis.** A bar is drawn to a ratio, and a floor above
zero misstates it. Lifting the floor is correct for a line, and the renderer
already does that automatically.

**Do not pick a heading level for its size.** Headings descend one level at a
time, and the contents rail is built from them.

**Do not use a `print:` Tailwind utility.** The Play CDN generates classes at
runtime. Print rules go in the plain CSS block at the end of `style.css`.

**Do not add a seventh chart series.** Colour stops separating anything.
Use small multiples.

**Do not give every stacked-bar segment its own corner radius.** Each segment
rounds on its own, and the stack reads as separate pills glued together
instead of one bar. Clip the whole stack to a single rounded rect sized to
its full height, and draw the segments square-cornered inside that clip.

**Do not leave a chart's title, subtitle, and legend left-aligned.** They
read as bolted onto the corner instead of belonging to the plot under them.
Centre all three, on every chart type, not only the one a reviewer happens
to look at.

## Failure modes of the runtime

| Symptom | Cause |
|---|---|
| The page flashes light, then goes dark | The inline snippet in `<head>` was removed. It must run before the stylesheet paints |
| Code has no syntax colours in one theme | Both `hljs-light` and `hljs-dark` link tags need their ids. The theme module toggles `disabled` on them |
| A diagram does not redraw on a theme switch | The Mermaid module block was dropped from the template, or the element lost its `data-src` |
| A chart does not recolour | The chart was drawn with a literal colour rather than a `--data-*` token |
| The contents rail is empty | The article lost `data-toc-root`, or every heading is an H1 |
| A figure hides under the rail | The figure is missing the `breakout` class, so the 1280px clamp never applies |
| Copy does nothing over `file://` | Expected. The clipboard API needs a secure context, and the fallback path runs instead |

## Five or more Mermaid diagrams on one page

A page with five `mermaid` fences, built and checked against the CDN's current
`mermaid@11` build, rendered only the first diagram correctly. Diagrams two
through five all drew into the second diagram's target element, stacked on
top of each other, so the page showed one scrambled box in the second
diagram's position and four empty figure cards after it. The bug was
reproducible across repeated builds, so it was not a one-off timing glitch.

Two suspects turned out not to be the cause. Giving each `pre.mermaid`
element a unique `id` before calling `mermaid.run()` changed nothing. Neither
did replacing the batched `mermaid.run({ nodes: blocks })` call in
`template.html`'s Mermaid module with a loop that awaits one node at a time.
The corruption survived both changes identically, which points at the pinned
CDN build's `run()` implementation itself rather than at anything this kit's
template does.

The reliable fix skips client-side rendering. Render each diagram to a static
SVG at build time with `mermaid-cli` (`npx -p @mermaid-js/mermaid-cli mmdc`),
once with a `themeVariables` block matching the light tokens and once
matching the dark tokens, and give each a unique `id` inside the SVG (`sed`
the CLI's default `my-svg` id to something per-figure, so two inlined SVGs on
one page never collide). Reference the pair as two `<img>` tags in the
figure's markup, `fig-light` and `fig-dark`, inside the ordinary boxed
`.figure__body` wrapper — **not** `.figure__body--plain`. A pre-rendered
diagram is still a diagram, not a photograph, and every source page's own
figure (`bg-[#f5f5f7]`/`bg-[#111113]`, a subtle border, a shadow) puts a
muted card behind exactly this kind of content. `--plain` drops that card
for a photograph, where a frame around the image would look wrong; it does
not apply to a diagram. Dropping the card from a diagram is a regression, not
a stylistic choice: the
`docs/02-first-direction.md` build first wrote this fix with `--plain` in the
wrapper, and all five of its diagrams shipped without a card as a result.

**Give the swap rule enough specificity to beat `.figure img`.** The kit's
`.figure img, .figure svg { display: block; … }` rule has specificity
`(0,1,1)`. A same-looking toggle copied from the `hljs-light`/`hljs-dark`
pattern but written as a bare class, `.fig-dark { display: none; }`, is only
`(0,1,0)` and loses to the kit rule in the plain default-light case (no
`data-theme` attribute, no `prefers-color-scheme: dark`), so both images show
at once, stacked. The two theme-scoped branches (`:root[data-theme='dark']
…` and the `prefers-color-scheme` media block) already have enough compound
selectors to win, which is why this defect only shows in plain light mode
and passes a dark-mode-only check. Add the extra `.figure__body img` terms
to every branch, including the base one, so all three outrank the kit rule
the same way. `.figure__body` alone, two classes plus the `img` type
selector, already outranks the kit rule; the specificity fix never needed
`--plain`, which only ever caused the mistaken choice to drop the card:

```css
.figure__body img.fig-dark { display: none; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .figure__body img.fig-light { display: none; }
  :root:not([data-theme='light']) .figure__body img.fig-dark { display: block; }
}
:root[data-theme='dark'] .figure__body img.fig-light { display: none; }
:root[data-theme='dark'] .figure__body img.fig-dark { display: block; }
```

This trades the client-side re-theme-on-toggle behaviour for reliability.
Confirm the count before trusting a client-side-rendered page: a page with
one or two diagrams may never hit this, and a page with five should be
screenshot-checked figure by figure, not just glanced at in a single
full-page capture, since a downscaled full-page screenshot can compress a
scrambled diagram into something that reads as plausible at a glance. Check
plain default light mode specifically, not only an explicit `data-theme`
toggle in each direction — a light/dark swap that only works under an
attribute or a media query, and silently fails in the plain default case, is
exactly the failure this specificity mistake produces.

### A pre-rendered SVG's own opaque background double-boxes the card

Putting the pre-rendered pair back inside `.figure__body` (the fix just
above) is not enough on its own. `mermaid-cli` paints its own background
into the SVG unless told otherwise: the default invocation, and the
`-b white` / `-b "#000000"` flags `docs/02`'s own build notes once
recommended, both leave `style="background-color: white"` (or `#000000`) on
the SVG's root element. An `<img>` referencing that SVG is a solid rectangle,
so it sits inside the card's muted `--surface` tint as a second, brighter
(or in dark mode, blacker) box nested inside the first — a diagram on white
on gray, not a diagram on gray. `demo/index.html` and `mock/index.html`
never show this because their diagrams render inline through client-side
Mermaid, which leaves the SVG background transparent by default; a
pre-rendered SVG has to be told the same thing explicitly.

The fix is one flag: `-b transparent` on the `mmdc` invocation, for both the
light and the dark render. Nothing else about the command changes — the
`themeVariables` block, the `-c` theme file, and the `sed` id-rename step all
stay as PITFALLS.md's own build notes describe. Confirm the fix by grepping
the rendered SVG rather than trusting the flag: `grep -o 'style="background-color[^"]*"'`
against the file should print nothing (or `transparent`), never `white` or a
hex triple. A full-page screenshot at normal zoom can still read this as
fine, since a white card on a near-white light background is a low-contrast
mistake to spot; the layered edge shows clearly at 100% crop around one
figure, in both themes, which is the check to run rather than a glance at
the whole page.

### A portrait diagram needs a width cap, not just `max-width: 100%`

A `flowchart TD` with a short vertical chain of boxes and no wide branch
renders with a native aspect ratio under 1 (taller than wide, for example
`280 × 630`). The kit's default figure sizing lets an image grow to its
breakout width (up to 980px) with `height: auto`; for a portrait diagram that
stretches the height in the same proportion, several screens tall, for no
readability gain, since each box is already legible at native size.

Check the SVG's own `viewBox` at build time (width divided by height) and
apply a width cap when the ratio is under 1, rather than judging by diagram
type alone: a `flowchart TD` with a wide branch (see Figure 1 in the
"Sizing and diagram direction" section of `DIAGRAMS.md`) still needs the full
breakout, and a `flowchart LR` can in principle end up portrait too. About
440px, roughly half the 980px breakout, reads well for a narrow chain of four
or five boxes:

```css
.figure--narrow .figure__body img { max-width: 440px; }
```

Add the `figure--narrow` class to that figure's wrapper `<div class="figure
breakout">` only; leave every wide diagram at its default sizing.

### A caption written next to the figure, not inside it

Every source page holds this line without exception, worded differently each
time but always the same three properties: a smaller size than body text, a
muted colour, and a bold lead-in ("**Figure 1:**") for emphasis. The MLX
research page states it as `text-[13px] leading-relaxed text-[#6e6e73]`,
which is exactly `--text-caption` and `--text-muted`, the same pair
`COMPONENTS.md`'s figure markup already names.

Hand-building a figure from a Mermaid fence plus a manual `<img>` swap (the
portrait-diagram and multi-diagram fixes above both do this) makes it easy to
drop the caption as its own markdown paragraph directly below the closing
`</div>`, matching how a plain Mermaid fence's caption sits below it in
source. That paragraph renders as ordinary 17px body text: markdown-it never
reprocesses the inside of a raw HTML block, so a caption written outside the
block gets ordinary paragraph handling, and a caption pasted inside the block
as raw text skips inline markdown entirely and shows literal `**bold**` and
backticks. Neither is the kit's caption style.

The caption has to be a `<p class="figure__caption">` **element inside** the
figure's wrapper `<div>`, per `COMPONENTS.md`'s own figure markup, with its
markdown rendered through `md.renderInline()` (the same call `_chart()` in
`build.py` already uses for chart captions) before it goes in the HTML block:

```python
caption_html = md.renderInline(caption_markdown)
figure_html = (
    '<div class="figure breakout">\n'
    '<div class="figure__body">…</div>\n'
    f'<p class="figure__caption">{caption_html}</p>\n'
    '</div>\n'
)
```

Check this by grepping the built page for `figure__caption`: the count
should match the figure count, and every occurrence should contain the
caption text, not a separate plain `<p>` sitting next to an empty-of-caption
figure `<div>`.

## Before shipping a page

Build it, open it, and check all ten. Set the window height to the page
height, because `--screenshot` captures the window and not the whole
scrollable page. A report of four sections runs 6000px or more.

```bash
python scripts/build.py report.md -o out/
chromium --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1440,3000 --virtual-time-budget=15000 \
  --screenshot=light.png "file://$PWD/out/index.html"
```

1. The build exits 0 and reports the heading, figure, and chart counts.
2. The console shows no error. The Tailwind production warning is expected.
3. Every surface changes with the theme. Nothing keeps a light-mode colour.
4. The stored theme survives a reload, with no flash on load.
5. The contents rail lists every H2 and H3, collapses, and tracks the scroll.
6. Every diagram renders in both themes, and the labels are legible. Crop or
   zoom to each figure at its native resolution rather than judging from a
   downscaled full-page screenshot — a full-page capture reads a stacked
   diagram (the batched-`run()` defect above) or a double-boxed one (the
   opaque-background defect above) as plausible at a glance, and both defects
   only became visible once a figure was checked at its own size.
7. Every chart draws its axes and legend, and recolours on the switch. A
   stacked bar reads as one rounded block, not stacked pills, and its title,
   subtitle, and legend all centre over the plot.
8. Code blocks show syntax colours in both themes, and the copy button works.
9. The prose measure is 730px, and a wide figure stays centred.
10. At 768px the rail becomes a drawer and the page does not scroll sideways.

For the dark check, copy the page and set `data-theme="dark"` on the `html`
element:

```bash
sed 's|<html lang="en">|<html lang="en" data-theme="dark">|' \
  out/index.html > out/dark.html
```
