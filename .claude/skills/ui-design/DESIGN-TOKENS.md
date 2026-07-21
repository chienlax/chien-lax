# Design Tokens Reference

## Contents

- Catppuccin Latte palette (light mode defaults)
- Catppuccin Mocha palette (dark mode)
- Semantic token mappings
- Fluid type scale
- Fluid space scale
- Border radii
- Animation easing
- Font stacks

For full copy-paste CSS blocks: See [resources/tokens-css.md](resources/tokens-css.md)
For complete palette hex tables: See [resources/palette-full.md](resources/palette-full.md)

## Catppuccin Latte (Light Default)

### Neutral Layers

| Token | Hex | Role |
|---|---|---|
| `--ctp-base` | `#eff1f5` | Page background (`--surface`) |
| `--ctp-mantle` | `#e6e9ef` | Nav background, code block bg |
| `--ctp-crust` | `#dce0e8` | Deepest background layer |
| `--ctp-surface0` | `#ccd0da` | Cards, raised surfaces (`--surface-card`) |
| `--ctp-surface1` | `#bcc0cc` | Borders, separators (`--border`) |
| `--ctp-surface2` | `#acb0be` | Elevated elements |
| `--ctp-overlay0` | `#9ca0b0` | Subtle text |
| `--ctp-overlay1` | `#8c8fa1` | Muted text (`--text-muted`) |
| `--ctp-overlay2` | `#7c7f93` | Comments, delimiters |
| `--ctp-subtext0` | `#6c6f85` | Labels |
| `--ctp-subtext1` | `#5c5f77` | Secondary text (`--text-secondary`) |
| `--ctp-text` | `#4c4f69` | Primary text (`--text-primary`) |

### Accent Colors

| Token | Hex | Role |
|---|---|---|
| `--ctp-blue` | `#1e66f5` | Primary accent, links (`--accent`) |
| `--ctp-lavender` | `#7287fd` | Focus rings (`--accent-focus`) |
| `--ctp-sapphire` | `#209fb5` | Visited links |
| `--ctp-sky` | `#04a5e5` | Operators (syntax) |
| `--ctp-teal` | `#179299` | Info status (`--color-info`) |
| `--ctp-green` | `#40a02b` | Success (`--color-success`) |
| `--ctp-yellow` | `#df8e1d` | Warning (`--color-warning`) |
| `--ctp-peach` | `#fe640b` | Constants (syntax) |
| `--ctp-maroon` | `#e64553` | Parameters (syntax) |
| `--ctp-red` | `#d20f39` | Danger (`--color-danger`) |
| `--ctp-mauve` | `#8839ef` | Keywords (syntax), callout variant |
| `--ctp-pink` | `#ea76cb` | Regex, escape sequences |
| `--ctp-flamingo` | `#dd7878` | Decorative |
| `--ctp-rosewater` | `#dc8a78` | Cursor, macros |

## Semantic Tokens

| Token | Latte Value | Mocha Value | Usage |
|---|---|---|---|
| `--surface` | Base `#eff1f5` | Base `#1e1e2e` | Page background |
| `--surface-raised` | Surface 0 | Surface 0 | Cards, hover |
| `--surface-card` | Surface 0 | Surface 0 | Card backgrounds |
| `--text-primary` | Text `#4c4f69` | Text `#cdd6f4` | Body, headings |
| `--text-secondary` | Subtext 1 | Subtext 1 | Supporting text |
| `--text-muted` | Overlay 1 | Overlay 1 | Labels, captions |
| `--separator` | Surface 1 | Surface 1 | Horizontal rules |
| `--border` | Surface 1 | Surface 1 | Borders |
| `--accent` | Blue `#1e66f5` | Blue `#89b4fa` | Links, primary CTA |
| `--accent-focus` | Lavender `#7287fd` | Lavender `#b4befe` | Focus rings |
| `--accent-dim` | Blue 14% opacity | Blue 14% opacity | Accent backgrounds |
| `--accent-light` | Blue 8% mixed with Base | Blue 8% mixed with Base | Light accent tint |
| `--color-success` | Green `#40a02b` | Green `#a6e3a1` | Success states |
| `--color-warning` | Yellow `#df8e1d` | Yellow `#f9e2af` | Warning states |
| `--color-danger` | Red `#d20f39` | Red `#f38ba8` | Destructive actions |
| `--color-info` | Teal `#179299` | Teal `#94e2d5` | Informational |

## Fluid Type Scale

All values use `clamp(min, preferred, max)`:

| Token | Formula | Range |
|---|---|---|
| `--step--1` | `clamp(0.83rem, 0.78rem + 0.24vw, 0.94rem)` | Small/caption |
| `--step-0` | `clamp(1.00rem, 0.95rem + 0.28vw, 1.13rem)` | Body |
| `--step-1` | `clamp(1.20rem, 1.14rem + 0.34vw, 1.41rem)` | h4 |
| `--step-2` | `clamp(1.44rem, 1.36rem + 0.41vw, 1.76rem)` | h3 |
| `--step-3` | `clamp(1.73rem, 1.63rem + 0.49vw, 2.20rem)` | h2 |
| `--step-4` | `clamp(2.07rem, 1.95rem + 0.59vw, 2.75rem)` | h1 |

## Fluid Space Scale

| Token | Formula | Range |
|---|---|---|
| `--space-3xs` | `clamp(0.25rem, 0.23rem + 0.07vw, 0.31rem)` | 4–5px |
| `--space-2xs` | `clamp(0.50rem, 0.47rem + 0.14vw, 0.63rem)` | 8–10px |
| `--space-xs` | `clamp(0.75rem, 0.70rem + 0.21vw, 0.94rem)` | 12–15px |
| `--space-s` | `clamp(1.00rem, 0.95rem + 0.28vw, 1.25rem)` | 16–20px |
| `--space-m` | `clamp(1.50rem, 1.42rem + 0.43vw, 1.88rem)` | 24–30px |
| `--space-l` | `clamp(2.00rem, 1.89rem + 0.57vw, 2.50rem)` | 32–40px |
| `--space-xl` | `clamp(3.00rem, 2.84rem + 0.85vw, 3.75rem)` | 48–60px |
| `--space-2xl` | `clamp(4.00rem, 3.79rem + 1.14vw, 5.00rem)` | 64–80px |

## Radii & Animation

| Token | Value | Use |
|---|---|---|
| `--radius-s` | `4px` | Inline code, small elements |
| `--radius-m` | `8px` | Cards, code blocks, buttons |
| `--radius-l` | `12px` | Nav panel, chart cards |
| `--radius-pill` | `999px` | Badges, search, toggles |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Standard ease-out |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Apple-like physics bounce |
| `--duration` | `250ms` | Default transition length |

## Font Stacks

| Token | Value |
|---|---|
| `--font-sans` | `"Inter", system-ui, -apple-system, "Segoe UI", sans-serif` |
| `--font-mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace` |
| `--measure` | `65ch` |
