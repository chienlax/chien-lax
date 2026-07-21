# Style Guide — Color & Typography Usage Rules

## Contents

- Color role mapping (Catppuccin)
- Background layer hierarchy
- Text color hierarchy
- Accent color assignments
- "On Accent" rule
- Dark mode rules
- Typography conventions
- Code editor syntax colors
- Status color semantics

## Color Role Mapping

### Background Layers (darkest → lightest in dark mode, reversed in light)

| Layer | Color | Use |
|---|---|---|
| Background pane | Base | Main page background |
| Secondary panes | Crust, Mantle | Nav bg, code block bg |
| Surface elements | Surface 0, 1, 2 | Cards, borders, elevated elements |
| Overlays | Overlay 0, 1, 2 | Subtle text, muted text, comments |

### Text Hierarchy

| Function | Color | Notes |
|---|---|---|
| Body copy | Text | Primary content |
| Main headlines | Text | Same as body — weight carries hierarchy |
| Sub-headlines, labels | Subtext 0, Subtext 1 | Secondary content |
| Subtle / muted | Overlay 1 | Captions, timestamps |
| On Accent | Base | Text on colored backgrounds |
| Links, URLs | Blue | Always underlined in prose |
| Tags, pills | Blue | Badge backgrounds |

### Status Colors

| Status | Color | Token |
|---|---|---|
| Success | Green | `--color-success` |
| Warning | Yellow | `--color-warning` |
| Error / Danger | Red | `--color-danger` |
| Info | Teal | `--color-info` |

### Selection & Focus

| Element | Color | Notes |
|---|---|---|
| Selection background | Overlay 2 at 20-30% opacity | Text selection highlight |
| Focus ring | Lavender | `:focus-visible` outline, 2px solid |
| Active nav border | Lavender | Left border on `aria-current="page"` |
| Cursor | Rosewater | Input cursor color |

## The "On Accent" Rule

When text appears on a colored background (buttons, badges, alerts):

- **Always** use `var(--ctp-base)` for the text color
- This ensures legibility in both Latte and Mocha
- Example: `.btn--primary { background: var(--ctp-blue); color: var(--ctp-base); }`

## Dark Mode Rules

### Architecture

1. Dark mode is NOT color inversion
2. Only the `--ctp-*` palette variables change (Latte → Mocha)
3. All semantic tokens (`--surface`, `--text-primary`, etc.) auto-resolve
4. No separate dark-mode overrides needed for components

### Implementation

Three selectors work together:

```css
/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* Mocha values */ }
}
/* Explicit dark */
[data-theme="dark"] { /* Mocha values */ }
/* Explicit light */
[data-theme="light"] { /* Latte values */ }
```

### Key principle

From Apple HIG: "Think of Dark Mode as having the lights dimmed rather than everything flipped inside out."

- Base is `#1e1e2e` (deep blue-grey) — never pure black
- Maintain the same relative contrast steps between layers
- Images with white backgrounds may need a dark-mode border

## Typography Conventions

### Hierarchy rules

1. **Weight and color carry hierarchy before size** — varying weight within a scale creates more scannable pages than size alone
2. Headings: `font-weight: 600`, negative tracking (`letter-spacing: -0.02em` to `-0.005em`)
3. Body: `font-weight: 400`, no tracking, `line-height: 1.6`
4. Labels/small: `font-weight: 500`, `--text-muted` color

### Font pairing

- **Inter** — Body, headings, UI text. Variable weight 400/500/600.
- **JetBrains Mono** — Code blocks, inline code, tokens, mono labels. Weight 400/500.
- Never mix additional font families.

### Prose constraints

- `max-inline-size: var(--measure)` (65ch) on `<p>` elements
- Page header meta: `max-inline-size: 60ch`
- Section descriptions: `max-inline-size: var(--measure)`

## Code Editor Syntax Colors

For syntax-highlighted code blocks:

| Syntax Element | Color |
|---|---|
| Keywords | Mauve |
| Strings | Green |
| Symbols, atoms | Red |
| Escape sequences, regex | Pink |
| Comments | Overlay 2 |
| Constants, numbers | Peach |
| Operators | Sky |
| Braces, delimiters | Overlay 2 |
| Methods, functions | Blue |
| Parameters | Maroon |
| Builtins | Red |
| Classes, types, enums | Yellow |
| Properties, attributes | Yellow |
| Variables | Text |
| Tags (HTML/XML) | Mauve |
| Tag attributes | Yellow |

## Status Pattern Usage

### Badge variants

```html
<span class="badge badge--success">Active</span>   <!-- Green tint -->
<span class="badge badge--warning">Pending</span>   <!-- Yellow tint -->
<span class="badge badge--accent">New</span>        <!-- Blue tint -->
<span class="badge badge--default">Draft</span>     <!-- Neutral -->
```

### Callout variants

- `callout--info` — Blue/accent tint for informational notes
- `callout--mauve` — Mauve tint for design philosophy or special emphasis

### Toast icon colors

- Success: `--color-success` (Green)
- Info: `--color-info` (Teal)
- Warning: `--color-warning` (Yellow)
