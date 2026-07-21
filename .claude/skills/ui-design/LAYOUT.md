# Layout & Navigation Reference

## Contents

- Three-column docs grid
- Every Layout primitives (Stack, Cluster, Sidebar)
- Navigation sidebar (frosted glass)
- Breadcrumbs
- Table of contents (sticky)
- Page header and sections
- Responsive rules
- Theme toggle
- Skip link

For full CSS code: See [resources/layout-css.md](resources/layout-css.md)

## Three-Column Docs Grid

The shell used across all pages:

```html
<div class="docs">
  <nav class="docs__nav"><!-- Left sidebar --></nav>
  <main class="docs__main" id="main"><!-- Content --></main>
  <aside class="docs__toc"><!-- Right TOC --></aside>
</div>
```

| Column | Width | Behavior |
|---|---|---|
| Left nav | `minmax(0, 18.5rem)` | Sticky, frosted glass |
| Main content | `minmax(0, 1fr)` | Flexible, fills remaining |
| Right TOC | `minmax(0, 14rem)` | Sticky, small type |

Gap: `--space-xl`. Max width: `90rem`, centered with `margin-inline: auto`.

### Responsive collapse

At `max-width: 60rem`:
- Grid becomes single column
- Nav becomes horizontal flex wrap
- Section labels hidden
- TOC hidden
- Padding reduces to `--space-m` / `--space-s`

## Every Layout Primitives

### Stack

Vertical rhythm — margin only between siblings:

```css
.stack > * + * { margin-block-start: var(--stack-gap, var(--space-m)); }
```

| Class | Gap |
|---|---|
| `.stack` | `--space-m` (default) |
| `.stack--s` | `--space-s` |
| `.stack--l` | `--space-l` |
| `.stack--xl` | `--space-xl` |

### Cluster

Wrapping flex row for badges, tags, button groups:

```css
.cluster { display: flex; flex-wrap: wrap; gap: var(--space-s); align-items: center; }
```

### Sidebar

Two-column layout without media queries:

```css
.sidebar { display: flex; flex-wrap: wrap; gap: var(--space-l); }
.sidebar > :first-child { flex-basis: 18.5rem; flex-grow: 1; }
.sidebar > :last-child  { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }
```

Below the `min-inline-size: 50%` threshold, both columns stack automatically.

## Navigation Sidebar

Frosted glass effect using `backdrop-filter`:

```html
<nav class="docs__nav" aria-label="Documentation navigation">
  <a href="./index.html" class="nav__brand">
    <span class="nav__logo" aria-hidden="true">◆</span>
    Design System
  </a>
  <span class="nav__section-label">Section Name</span>
  <a href="./page.html" class="nav__link">Page Title</a>
  <a href="./current.html" class="nav__link" aria-current="page">Current Page</a>
</nav>
```

| Element | Styling |
|---|---|
| `.docs__nav` | Sticky, `backdrop-filter: blur(16px)`, Mantle 88% bg |
| `.nav__brand` | Font weight 600, `--text-primary` color |
| `.nav__logo` | `--ctp-mauve` color, `--step-1` size |
| `.nav__section-label` | Uppercase, `0.07em` tracking, `--text-muted` |
| `.nav__link` | `--text-secondary`, hover → raised bg |
| `.nav__link[aria-current="page"]` | `--accent-dim` bg, `--accent` text, Lavender left border |

## Breadcrumbs

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#" class="breadcrumb__link">Parent</a>
  <span class="breadcrumb__sep" aria-hidden="true">/</span>
  <span class="breadcrumb__current" aria-current="page">Current</span>
</nav>
```

Font size: `--step--1`. Color: `--text-muted`. Separator: `opacity: 0.4`.

## Table of Contents (Right Sidebar)

```html
<aside class="docs__toc" aria-label="On this page">
  <p class="toc__label">On this page</p>
  <ol class="toc__list" role="list">
    <li><a href="#section-id" class="toc__link">Section Title</a></li>
    <li><a href="#section-id" class="toc__link toc__link--active">Active Section</a></li>
  </ol>
</aside>
```

Sticky, font `--step--1`. Active link: `--accent` color + Lavender left border.

## Page Header

```html
<header class="page-header">
  <div class="cluster" style="margin-block-end: var(--space-s)">
    <span class="badge badge--accent">Tag</span>
    <span class="badge badge--default">Category</span>
  </div>
  <h1>Page Title</h1>
  <p class="page-header__meta">Description text (max 60ch).</p>
</header>
```

## Sections

```html
<section id="section-id" class="section" data-toc>
  <div class="section__header stack--s">
    <h2 class="section__title">Section Title</h2>
    <p class="section__desc">Description (max --measure).</p>
  </div>
  <!-- Section content -->
</section>
```

Sections have `padding-block: --space-xl` and top border of `--separator`. First section has no top border.

## Theme Toggle

```html
<button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
  <svg class="icon-sun" ...><!-- sun icon --></svg>
  <svg class="icon-moon" ...><!-- moon icon --></svg>
</button>
```

Fixed position, top-right. Shows sun/moon based on `data-theme` attribute. Mauve dot indicator.

## Skip Link

```html
<a class="skip-link" href="#main">Skip to content</a>
```

Hidden off-screen by default. Slides in on `:focus`. Blue background, Base text color.

## Demo Utilities

For layout demonstrations:

```html
<div class="demo-canvas"><!-- raised background container -->
  <div class="demo-box">Content</div>
  <div class="demo-box demo-box--tall">Tall box</div>
</div>
```
