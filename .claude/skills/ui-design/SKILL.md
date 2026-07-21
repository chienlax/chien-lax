---
name: ui-design
description: >-
  Builds premium web UIs using an Apple HIG-inspired design system with Catppuccin
  color palette, fluid typography, Every Layout CSS primitives, and interactive
  components. Use when creating HTML/CSS pages, dashboards, documentation sites,
  or any web interface that needs a polished, accessible design.
---

# UI Design System

Apple HIG structure + Catppuccin colors + Every Layout primitives.
Latte (light) ↔ Mocha (dark). All colors flow from `--ctp-*` CSS variables.

## Quick Start

```html
<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <!-- Content here -->
  <script src="./script.js"></script>
</body>
</html>
```

## Design Philosophy

Four HIG principles guide every decision:

- **Clarity** — Legible at any size. High-contrast text. Icons express one concept. Every link describes its destination. Every heading announces its section.
- **Deference** — Typography is the hero. UI chrome recedes. No decorative textures. Whitespace carries visual groups.
- **Depth** — Spatial layers via shadows, sticky navs, translucent backdrops. Smooth transitions reinforce spatial understanding.
- **Consistency** — Same heading hierarchy, code-block treatment, link color, and interaction patterns on every page.

From Dieter Rams: "Less, but better." Grayscale-first layout, one font family, one accent color, obsessive micro-state attention.

## Color Architecture

### How it works

1. `--ctp-*` variables define the full Catppuccin palette (Latte light / Mocha dark)
2. Semantic tokens reference `--ctp-*`: `--surface`, `--text-primary`, `--accent`, etc.
3. Dark mode only remaps the `--ctp-*` palette — semantic tokens auto-resolve

### Key semantic tokens

| Token | Maps to | Usage |
|---|---|---|
| `--surface` | `--ctp-base` | Page background |
| `--surface-raised` | `--ctp-surface0` | Cards, hover states |
| `--text-primary` | `--ctp-text` | Body, headings |
| `--text-secondary` | `--ctp-subtext1` | Supporting text |
| `--text-muted` | `--ctp-overlay1` | Labels, captions |
| `--accent` | `--ctp-blue` | Links, primary buttons |
| `--accent-focus` | `--ctp-lavender` | Focus rings |
| `--color-success` | `--ctp-green` | Success states |
| `--color-warning` | `--ctp-yellow` | Warning states |
| `--color-danger` | `--ctp-red` | Destructive actions |
| `--border` | `--ctp-surface1` | Borders, separators |
| `--accent-dim` | Blue 14% opacity | Accent backgrounds |

### Accent color roles

- **Blue** — Links, primary buttons, active states
- **Lavender** — Focus rings, active nav border (distinct from Blue)
- **Green/Yellow/Red** — Status: success, warning, danger
- **Mauve** — Keywords, callout variant, logo accent
- **"On Accent" text** — Always use `var(--ctp-base)` on colored backgrounds

For complete hex values: See [DESIGN-TOKENS.md](DESIGN-TOKENS.md)
For color role mapping details: See [STYLE-GUIDE.md](STYLE-GUIDE.md)

## Typography

### Font stacks

```css
--font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

### Fluid type scale (clamp-based)

| Token | Range | Line-height | Use |
|---|---|---|---|
| `--step-4` | 2.07–2.75 rem | 1.15 | h1 display |
| `--step-3` | 1.73–2.20 rem | 1.2 | h2 page heading |
| `--step-2` | 1.44–1.76 rem | 1.25 | h3 section |
| `--step-1` | 1.20–1.41 rem | 1.3 | h4 subsection |
| `--step-0` | 1.00–1.13 rem | 1.6 | Body text |
| `--step--1` | 0.83–0.94 rem | 1.5 | Small/caption |

### Rules

- Body: 15–25px (Butterick). Measure: `--measure: 65ch`
- Hierarchy: weight + color before size. Headings get negative tracking.
- Single font family. Mono only for code.

## Space Scale

Eight fluid steps on an 8-point grid. All use `clamp()`.

| Token | Range |
|---|---|
| `--space-3xs` | 0.25–0.31 rem |
| `--space-2xs` | 0.50–0.63 rem |
| `--space-xs` | 0.75–0.94 rem |
| `--space-s` | 1.00–1.25 rem |
| `--space-m` | 1.50–1.88 rem |
| `--space-l` | 2.00–2.50 rem |
| `--space-xl` | 3.00–3.75 rem |
| `--space-2xl` | 4.00–5.00 rem |

Never use arbitrary values — pick the nearest step.

## Layout Primitives

### Every Layout composable patterns

- **Stack** — Vertical rhythm: `.stack > * + * { margin-block-start: var(--stack-gap) }`
  - Variants: `.stack--s`, `.stack--l`, `.stack--xl`
- **Cluster** — Wrapping flex row: `.cluster { display: flex; flex-wrap: wrap; gap: var(--space-s) }`
- **Sidebar** — Two columns without breakpoints. Below threshold, stacks vertically.

### Three-column docs grid

```css
.docs {
  display: grid;
  grid-template-columns: minmax(0, 18.5rem) minmax(0, 1fr) minmax(0, 14rem);
  gap: var(--space-xl);
}
/* Collapses at 60rem */
@media (max-width: 60rem) { .docs { grid-template-columns: 1fr; } }
```

For complete layout CSS: See [LAYOUT.md](LAYOUT.md)

## Components

| Component | Classes | Notes |
|---|---|---|
| **Buttons** | `.btn--primary/secondary/ghost/danger` | 5 states; spring animation on active |
| **Badges** | `.badge--default/accent/success/warning` | Pill-shaped with tinted backgrounds |
| **Callouts** | `.callout--info/mauve` | Icon + body flex layout |
| **Code Blocks** | `.code-block` | Filename header, copy btn, focal/dim lines |
| **Data Tables** | `.data-table` | Mono first-column, semantic borders |
| **Search** | `.search-wrapper` + `.search-input` | Pill shape, Lavender focus glow |
| **Segmented** | `.segmented-control` | Sliding pill indicator (spring) |
| **Tabs** | `.tabs-nav` + `.tabs-content` | Sliding underline + fade-in panes |
| **Switches** | `.switch` | iOS-style toggle with spring thumb |
| **Checkboxes** | `.checkbox-label` + `.custom-checkbox__box` | Spring transition |
| **Radios** | `.radio-label` + `.custom-radio__circle` | Animated dot |
| **Slider** | `.range-slider` | Dynamic gradient fill |
| **Toasts** | `.toast` in `.toast-container` | Spring entry, auto-dismiss progress bar |
| **Glow Cards** | `.glow-card` | Cursor-tracking border glow (Linear style) |

For HTML patterns + CSS details: See [COMPONENTS.md](COMPONENTS.md)

## Dark Mode

### Implementation

1. Set `<html data-theme="auto">` and `<meta name="color-scheme" content="light dark">`
2. Dark mode remaps only the `--ctp-*` palette variables (Latte → Mocha)
3. All semantic tokens auto-resolve — no overrides needed
4. Toggle via `data-theme="light"`, `data-theme="dark"`, or `data-theme="auto"`

### Key rule

Dark mode is NOT color inversion. It is Catppuccin Mocha — a deep blue-grey (`#1e1e2e`), never pure black. Think "lights dimmed," not "flipped inside out."

## Accessibility

- **Contrast**: WCAG AA minimum (4.5:1). Text on Base is ~12:1 in both Latte and Mocha
- **Focus rings**: Lavender via `:focus-visible` — distinct from Blue action color
- **Motion**: `prefers-reduced-motion` disables all transitions
- **Keyboard**: All interactive elements reachable by Tab
- **Screen readers**: Semantic HTML + `aria-label` on icon-only buttons
- **Skip link**: First Tab target jumps to `#main`
- **Font sizes**: All in `rem` — scales with browser text setting
- **On Accent**: Text on colored backgrounds uses `var(--ctp-base)`

## Data Visualization

Inline SVG charts following Apple's charting rules:
- Never rely on color alone — pair with shapes/patterns
- Gridlines: dashed, thin, semi-transparent
- Available: activity rings, donut charts, line charts, bar charts, heatmaps

For chart patterns: See [DATA-VISUALIZATION.md](DATA-VISUALIZATION.md)

## Animation & Easing

```css
--ease:        cubic-bezier(0.16, 1, 0.3, 1);       /* standard ease-out */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Apple-like bounce */
--duration:    250ms;
```

- Border radii: `--radius-s: 4px`, `--radius-m: 8px`, `--radius-l: 12px`, `--radius-pill: 999px`

## Reference Files

| File | When to read |
|---|---|
| [DESIGN-TOKENS.md](DESIGN-TOKENS.md) | Need exact token values, palette hex codes, or clamp formulas |
| [COMPONENTS.md](COMPONENTS.md) | Building interactive elements — buttons, tabs, toasts, etc. |
| [LAYOUT.md](LAYOUT.md) | Setting up page structure, navigation, responsive grid |
| [DATA-VISUALIZATION.md](DATA-VISUALIZATION.md) | Creating charts, dashboards, data displays |
| [STYLE-GUIDE.md](STYLE-GUIDE.md) | Color role decisions, dark mode rules, typography conventions |

The `resources/` subfolder contains full CSS code blocks for copy-paste when bootstrapping new projects:

| File | Content |
|---|---|
| [resources/tokens-css.md](resources/tokens-css.md) | Complete `:root` and dark mode CSS variable definitions |
| [resources/components-css.md](resources/components-css.md) | Full CSS for all interactive components |
| [resources/layout-css.md](resources/layout-css.md) | Full layout shell, nav, TOC, breadcrumb CSS |
| [resources/charts-examples.md](resources/charts-examples.md) | Complete SVG chart HTML + JS examples |
| [resources/palette-full.md](resources/palette-full.md) | Every Catppuccin Latte + Mocha hex value |

## Workflow

1. **Tokens first** — Start with the CSS variables from `resources/tokens-css.md`
2. **Layout** — Apply the docs grid or layout primitives from LAYOUT.md
3. **Components** — Add interactive elements from COMPONENTS.md
4. **Content** — Write semantic HTML with proper heading hierarchy
5. **Dark mode** — Verify both themes toggle correctly
6. **Accessibility** — Tab through everything, check contrast, test `prefers-reduced-motion`
