# Design tokens

<!-- register-exempt: BOLD-FIRST-BULLET SWE-JARGON UNDEFINED-ACRONYM -->
<!-- A value table: CSS, RGB, HTML, and the token names are standard terms. -->

Every value in the system. All of them live in `assets/style.css` section 1.

## The theme mechanism

A colour token is a **channel triplet**, not a hex string.

```css
:root { --accent: 0 102 204; }
.thing { color: rgb(var(--accent)); }
.faded { color: rgb(var(--accent) / 0.5); }   /* opacity still works */
```

The triplet also feeds the Tailwind config in `template.html`, so
`text-accent/50` produces the same colour as the CSS above.

Dark values appear in two blocks, and both are required.

```css
:root { /* light values */ }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) { /* dark values */ }
}

:root[data-theme='dark'] { /* the same dark values */ }
```

The media block serves a reader who never touches the toggle. The attribute
block serves a reader who did. The `:not([data-theme='light'])` guard lets the
toggle force light on a dark system.

**Never give a colour its only definition inside a dark block.** A token
defined only there resolves to nothing in light mode.

## Colour

| Token | Light | Dark | Used by |
|---|---|---|---|
| `--bg` | `255 255 255` | `0 0 0` | page background |
| `--bg-tint` | `245 245 247` | `17 17 19` | hero band |
| `--surface` | `245 245 247` | `29 29 31` | cards, figures, code, table header |
| `--surface-2` | `255 255 255` | `45 45 47` | a card inside a card |
| `--surface-hover` | `235 235 240` | `45 45 47` | row and card hover |
| `--text` | `29 29 31` | `245 245 247` | body text |
| `--text-muted` | `110 110 115` | `134 134 139` | captions, axis labels, contents rail |
| `--text-invert` | `245 245 247` | `29 29 31` | text on a filled accent |
| `--border` | `210 210 215` | `51 51 54` | dividers, chip and button outlines |
| `--border-subtle` | `229 229 234` | `34 34 36` | card edges, grid lines |
| `--accent` | `0 102 204` | `41 151 255` | links, progress, primary button |
| `--accent-hover` | `0 68 153` | `0 119 237` | the hover state of each |
| `--success` | `48 160 88` | `48 209 88` | pass verdicts, upward deltas |
| `--warning` | `191 120 0` | `255 214 10` | caution callouts |
| `--danger` | `209 55 55` | `255 69 58` | fail verdicts, downward deltas |
| `--header-bg` | `rgb(29 29 31 / .92)` | `rgb(0 0 0 / .82)` | the glass bar |
| `--header-text` | `245 245 247` | same | header text, light in both themes |

The light accent is Apple ML Research blue. The dark accent is Apple Newsroom
blue. Each one meets 4.5:1 against its own page background.

### Data series

Six series colours, calibrated against `--surface` rather than `--bg`, because
every chart sits on a card.

| Token | Light | Dark |
|---|---|---|
| `--data-1` | `0 102 204` blue | `41 151 255` |
| `--data-2` | `0 168 143` teal | `45 212 191` |
| `--data-3` | `125 82 204` purple | `168 85 247` |
| `--data-4` | `40 165 80` green | `48 209 88` |
| `--data-5` | `214 42 76` crimson | `255 55 95` |
| `--data-6` | `191 120 0` amber | `255 214 10` |

The chart renderer reads these at draw time, so a theme switch recolours every
series without a page reload. Beyond six series, colour stops separating
anything: use small multiples instead.

## Type

Inter for text, Monaspace Neon for code. Both load from a pinned CDN, and both
fall back to the Apple system stack.

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', …
--font-mono: 'Monaspace Neon', 'SF Mono', SFMono-Regular, Menlo, Consolas, …
```

| Token | Size | Weight | Tracking | Line height | Role |
|---|---|---|---|---|---|
| `--text-h1` | 32 to 40px fluid | 700 | −0.022em | 1.12 | page title |
| `--text-h2` | 24 to 28px fluid | 700 | −0.022em | 1.20 | section |
| `--text-h3` | 20px | 600 | −0.015em | 1.30 | subsection |
| `--text-h4` | 17px | 600 | normal | 1.4 | figure and card titles |
| `--text-dek` | 18 to 22px fluid | 500 | −0.01em | 1.38 | the hero summary |
| `--text-body` | 17px | 400 | normal | 1.60 | body |
| `--text-small` | 15px | 400 | normal | 1.6 | not currently used |
| `--text-caption` | 13px | 400 | normal | 1.5 | figure captions, rail links |
| `--text-fine` | 12px | 400 | normal | 1.6 | footnotes, chips, legends |

Inter has a larger x-height than SF Pro, so every heading takes the negative
tracking. Without it the titles read heavier than the Apple originals.

Fluid sizes use `clamp()`. No media query changes a font size.

## Space

The vertical rhythm follows the source pages.

| Gap | Value | Where |
|---|---|---|
| Between blocks | `1.5rem` | `.doc > * + *` |
| Before an H2 | `3.5rem` | section break |
| Before an H3 | `2.5rem` | subsection break |
| Around a figure | `2.5rem` | above and below |
| Card padding | `1.25rem` to `1.5rem` | cards, callouts, figure bodies |
| Column gutter | `1.5rem` (`--gutter`) | the header's inner padding only. A content column has no side padding of its own, so its box edge and its text edge are the same edge. |

## Frame

| Token | Value | Meaning |
|---|---|---|
| `--header-h` | `52px` | the glass bar, and every `scroll-margin-top` |
| `--rail-w` | `260px` | the contents rail |
| `--prose-w` | `730px` | the reading column |
| `--breakout-w` | `980px` | the widest a figure reaches |

## Radius and shadow

`--r-sm` 6px, `--r-md` 10px, `--r-lg` 12px, `--r-xl` 16px, `--r-2xl` 20px.
Pills and dots use `999px`.

Small cards take `--r-lg`. Callouts and code blocks take `--r-xl`. Figures and
mockups take `--r-2xl`.

Five shadows, `--shadow-xs` through `--shadow-xl`. Dark mode deepens every
one, because a soft shadow disappears against black.

## Motion

| Token | Value |
|---|---|
| `--dur-fast` | 0.15s, hover and colour changes |
| `--dur-base` | 0.25s, panels and the toast |
| `--dur-slow` | 0.4s, a bar growing to its value |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |

The easing curve comes from the toast in five of the six source pages.

A `prefers-reduced-motion: reduce` block collapses every duration to
0.001ms. No source page handles this.

## Changing the palette

Replace the triplets in the two dark blocks and the light `:root` block.
Nothing else refers to a colour. To check the result, run the demo report and
compare both themes:

```bash
python scripts/build.py reference/demo-report.md -o /tmp/palette-check/
```
