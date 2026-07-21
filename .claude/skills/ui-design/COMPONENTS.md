# Components Reference

## Contents

- Buttons
- Badges
- Callouts
- Code blocks
- Data tables
- Search field
- Segmented switcher
- Tabs
- Toggle switches
- Checkboxes & radios
- Range slider
- Toast notifications
- Glow cards (Linear/Vercel style)

For full CSS code: See [resources/components-css.md](resources/components-css.md)

## Buttons

Four variants, five states each (default, hover, focus-visible, active, disabled).

```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--primary" disabled>Disabled</button>
```

| Variant | Background | Text Color | Border |
|---|---|---|---|
| `btn--primary` | `--ctp-blue` | `--ctp-base` | `--ctp-blue` |
| `btn--secondary` | `--surface-card` | `--text-primary` | `--border` |
| `btn--ghost` | transparent | `--text-secondary` | transparent |
| `btn--danger` | `--color-danger` | `--ctp-base` | `--color-danger` |

Hover darkens via `color-mix(84%, --ctp-crust)`. Active: `scale(0.96)`. Disabled: `opacity: 0.4`.
Transition uses `--ease-spring` for physics-like feedback.

## Badges

```html
<span class="badge badge--default">Default</span>
<span class="badge badge--accent">Accent</span>
<span class="badge badge--success">Success</span>
<span class="badge badge--warning">Warning</span>
```

Pill-shaped (`border-radius: var(--radius-pill)`). Tinted background at 12% opacity with 30% border.

## Callouts

```html
<div class="callout callout--info">
  <span class="callout__icon" aria-hidden="true">💡</span>
  <div class="callout__body">
    <p><strong>Title:</strong> Callout content here.</p>
  </div>
</div>

<div class="callout callout--mauve">
  <span class="callout__icon callout__icon--mauve" aria-hidden="true">✨</span>
  <div class="callout__body">
    <p><strong>Title:</strong> Mauve variant content.</p>
  </div>
</div>
```

Flex layout with `gap: var(--space-s)`. Background uses `--accent-dim` (info) or `color-mix(--ctp-mauve 10%)` (mauve).

## Code Blocks

```html
<div class="code-block">
  <div class="code-block__header">
    <span class="code-block__filename">tokens.css</span>
    <button class="copy-btn" aria-label="Copy code">Copy</button>
  </div>
  <pre class="code-block__body"><code>
<span class="code-line code-line--dim">/* dimmed context */</span>
<span class="code-line code-line--focal">  --accent: var(--ctp-blue); /* highlighted */</span>
<span class="code-line">  --surface: var(--ctp-base); /* normal */</span>
  </code></pre>
</div>
```

- Background: `--ctp-mantle`
- Focal lines: Blue 10% wash + Lavender left border
- Dim lines: `opacity: 0.35`
- Font: `--font-mono` at `--step--1`

## Data Tables

```html
<div style="overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-m)">
  <table class="data-table">
    <thead><tr><th>Token</th><th>Value</th></tr></thead>
    <tbody>
      <tr><td>--step-0</td><td>1.00–1.13 rem</td></tr>
    </tbody>
  </table>
</div>
```

First column: mono font, Mauve color. Borders use `--separator`. Wrapping div provides border-radius.

## Search Field

```html
<div class="search-wrapper">
  <svg class="search-icon" ...><!-- search icon --></svg>
  <input type="search" class="search-input" placeholder="Search…" aria-label="Search">
</div>
```

Pill shape (`--radius-pill`). Focus shows Lavender border + 3px glow ring via `box-shadow`.

## Segmented Switcher

```html
<div class="segmented-control" id="demoSegment">
  <div class="segmented-control__slider" id="segmentSlider"></div>
  <button class="segmented-control__item segmented-control__item--active" data-index="0">Tab A</button>
  <button class="segmented-control__item" data-index="1">Tab B</button>
  <button class="segmented-control__item" data-index="2">Tab C</button>
</div>
```

Sliding pill indicator positioned via JS: `slider.style.transform = translate3d(${btn.offsetLeft}px, 0, 0)`.
Recalculate on window resize. Spring easing on transitions.

## Tabs

```html
<div class="tabs-nav" id="demoTabs">
  <div class="tabs-indicator" id="tabsIndicator"></div>
  <button class="tabs-nav__btn tabs-nav__btn--active" data-tab="tab-overview">Overview</button>
  <button class="tabs-nav__btn" data-tab="tab-features">Features</button>
</div>
<div class="tabs-content tabs-content--active" id="tab-overview">Content A</div>
<div class="tabs-content" id="tab-features">Content B</div>
```

Underline indicator slides with spring easing. Content panes fade in via `tab-fade-in` keyframes.

## Toggle Switches

```html
<label class="switch" aria-label="Toggle setting">
  <input type="checkbox" checked>
  <span class="switch__track"><span class="switch__thumb"></span></span>
  <span>Setting enabled</span>
</label>
```

iOS-style. Track: `--ctp-surface1` → `--ctp-green` when checked. Thumb slides `1.25rem` with spring.

## Checkboxes & Radios

```html
<label class="checkbox-label">
  <input type="checkbox" checked>
  <span class="custom-checkbox__box"></span>
  <span>Option text</span>
</label>

<label class="radio-label">
  <input type="radio" name="group" checked>
  <span class="custom-radio__circle"></span>
  <span>Option A</span>
</label>
```

Checked state: `--accent` background, white checkmark/dot. Focus: Lavender ring.

## Range Slider

```html
<div class="slider-container">
  <input type="range" class="range-slider" id="slider" min="0" max="100" value="45">
</div>
```

JS updates fill gradient: `slider.style.background = linear-gradient(to right, var(--accent) ${pct}%, var(--ctp-surface1) ${pct}%)`.

## Toast Notifications

```html
<div class="toast-container" id="toastContainer"></div>
```

Spawn via JS:

```js
function spawnToast(type, title, msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast__content">
      <svg class="toast__icon toast__icon--${type}" ...>...</svg>
      <div class="toast__body">
        <span class="toast__title">${title}</span>
        <p class="toast__msg">${msg}</p>
      </div>
      <button class="toast__close" aria-label="Close">✕</button>
    </div>
    <div class="toast__progress"></div>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4250);
}
```

Spring entry (`toast-in`), auto-dismiss progress bar (4s), frosted glass backdrop.

## Glow Cards

```html
<div class="glow-grid">
  <div class="glow-card">
    <div class="glow-card__overlay"></div>
    <div class="glow-card__content">
      <span class="glow-card__title">Card Title</span>
      <p class="glow-card__desc">Description text.</p>
    </div>
  </div>
</div>
```

JS tracks cursor position via `--x` and `--y` CSS custom properties. Overlay uses `radial-gradient` + mask composite for border-only glow effect.

```js
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--y', `${e.clientY - rect.top}px`);
});
```
