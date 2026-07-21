# Full Layout & Shell CSS

Complete CSS for the page shell, navigation, breadcrumbs, TOC, sections, and layout primitives.

## Every Layout Primitives

```css
.stack > * + * { margin-block-start: var(--stack-gap, var(--space-m)); }
.stack--s  { --stack-gap: var(--space-s); }
.stack--l  { --stack-gap: var(--space-l); }
.stack--xl { --stack-gap: var(--space-xl); }

.cluster { display: flex; flex-wrap: wrap; gap: var(--space-s); align-items: center; }

.sidebar { display: flex; flex-wrap: wrap; gap: var(--space-l); }
.sidebar > :first-child { flex-basis: 18.5rem; flex-grow: 1; }
.sidebar > :last-child  { flex-basis: 0; flex-grow: 999; min-inline-size: 50%; }
```

## Three-Column Docs Shell

```css
.docs {
  display: grid;
  grid-template-columns: minmax(0, 18.5rem) minmax(0, 1fr) minmax(0, 14rem);
  gap: var(--space-xl);
  align-items: start;
  padding: var(--space-l) var(--space-m);
  max-inline-size: 90rem;
  margin-inline: auto;
}

.docs__main { min-inline-size: 0; }
```

## Navigation Sidebar (Frosted Glass)

```css
.docs__nav {
  position: sticky;
  top: var(--space-m);
  align-self: start;
  background: color-mix(in srgb, var(--ctp-mantle) 88%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: var(--radius-l);
  padding: var(--space-xs);
  max-block-size: calc(100dvh - var(--space-l) * 2);
  overflow-y: auto;
  transition: background var(--duration) var(--ease), border-color var(--duration) var(--ease);
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: 600;
  font-size: var(--step-0);
  padding: var(--space-xs);
  margin-block-end: var(--space-2xs);
  color: var(--text-primary);
  text-decoration: none;
}

.nav__logo { color: var(--ctp-mauve); font-size: var(--step-1); }

.nav__section-label {
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: var(--space-xs) var(--space-xs) var(--space-3xs);
  margin-block-start: var(--space-xs);
  display: block;
}

.nav__link {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  padding: var(--space-2xs) var(--space-xs);
  border-radius: var(--radius-s);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--step--1);
  font-weight: 400;
  transition: background var(--duration) var(--ease), color var(--duration) var(--ease);
}

.nav__link:hover {
  background: var(--surface-raised);
  color: var(--text-primary);
}

.nav__link[aria-current="page"] {
  background: var(--accent-dim);
  color: var(--accent);
  font-weight: 500;
  border-inline-start: 2px solid var(--ctp-lavender);
  padding-inline-start: calc(var(--space-xs) - 2px);
}
```

## Table of Contents (Right Sidebar)

```css
.docs__toc {
  position: sticky;
  top: var(--space-m);
  align-self: start;
  font-size: var(--step--1);
}

.toc__label {
  font-weight: 600;
  font-size: var(--step--1);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-block-end: var(--space-xs);
}

.toc__list { list-style: none; padding: 0; }
.toc__list > * + * { margin-block-start: 2px; }

.toc__link {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-3xs) var(--space-2xs);
  border-radius: var(--radius-s);
  border-inline-start: 2px solid transparent;
  transition: color var(--duration) var(--ease), border-color var(--duration) var(--ease);
}
.toc__link:hover { color: var(--text-primary); }

.toc__link--active {
  color: var(--accent);
  border-inline-start-color: var(--ctp-lavender);
  font-weight: 500;
}
```

## Breadcrumbs

```css
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  font-size: var(--step--1);
  color: var(--text-muted);
  margin-block-end: var(--space-m);
}

.breadcrumb__sep { opacity: 0.4; }

.breadcrumb__link {
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--duration) var(--ease);
}
.breadcrumb__link:hover { color: var(--text-secondary); }
.breadcrumb__current { color: var(--text-secondary); }
```

## Page Header

```css
.page-header { margin-block-end: var(--space-xl); }
.page-header h1 { margin-block-end: var(--space-s); }
.page-header__meta {
  color: var(--text-secondary);
  max-inline-size: 60ch;
  margin-block-end: var(--space-m);
}
```

## Sections

```css
.section {
  padding-block: var(--space-xl);
  border-block-start: 1px solid var(--separator);
}

.section:first-child {
  border-block-start: none;
  padding-block-start: 0;
}

.section__header { margin-block-end: var(--space-l); }
.section__title  { margin-block-end: var(--space-xs); }

.section__desc {
  color: var(--text-secondary);
  max-inline-size: var(--measure);
}
```

## Theme Toggle

```css
.theme-toggle {
  position: fixed;
  inset-block-start: var(--space-m);
  inset-inline-end: var(--space-m);
  z-index: 100;
  inline-size: 2.5rem;
  block-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  color: var(--text-primary);
  box-shadow: 0 2px 8px hsl(0 0% 0% / 0.1);
  transition: background var(--duration) var(--ease), border-color var(--duration) var(--ease);
}
.theme-toggle:hover { background: var(--separator); }

.icon-sun, .icon-moon { display: none; }
[data-theme="light"]  .icon-sun  { display: block; }
[data-theme="dark"]   .icon-moon { display: block; }
[data-theme="auto"]   .icon-sun  { display: block; }

@media (prefers-color-scheme: dark) {
  [data-theme="auto"] .icon-sun  { display: none; }
  [data-theme="auto"] .icon-moon { display: block; }
}

.theme-toggle::after {
  content: '';
  position: absolute;
  inset-block-end: 3px; inset-inline-end: 3px;
  inline-size: 6px; block-size: 6px;
  border-radius: 50%;
  background: var(--ctp-mauve);
}
```

## Skip Link

```css
.skip-link {
  position: fixed;
  inset-block-start: var(--space-s);
  inset-inline-start: var(--space-s);
  z-index: 9999;
  padding: var(--space-xs) var(--space-m);
  background: var(--ctp-blue);
  color: var(--ctp-base);
  border-radius: var(--radius-m);
  font-weight: 500;
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform var(--duration) var(--ease);
}
.skip-link:focus {
  transform: translateY(0);
  outline: 2px solid var(--ctp-lavender);
  outline-offset: 2px;
}
```

## Responsive Collapse

```css
@media (max-width: 60rem) {
  .docs {
    grid-template-columns: 1fr;
    padding: var(--space-m) var(--space-s);
    gap: var(--space-l);
  }
  .docs__nav {
    position: relative;
    top: 0;
    max-block-size: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3xs);
    align-items: center;
    padding: var(--space-xs);
  }
  .nav__section-label { display: none; }
  .nav__brand { margin-block-end: 0; padding: var(--space-2xs) var(--space-xs); }
  .docs__toc { display: none; }
}
```
