# Data Visualization Reference

## Contents

- Charting guidelines (Apple HIG)
- Activity rings (concentric circles)
- Donut chart (segmented)
- Line chart (interactive)
- Bar chart (grouped)
- Heatmap (CSS Grid)
- Shared tooltip system
- Accessibility fallback tables

For full SVG/JS examples: See [resources/charts-examples.md](resources/charts-examples.md)

## Charting Guidelines

Per Apple HIG:

- **Never rely on color alone** to differentiate series — pair with distinct shapes, patterns, or labels
- **Deference** — clean backdrop, dashed gridlines (`stroke-dasharray: 4 4; opacity: 0.5`)
- **Legibility** — axis labels use `--text-muted`, `--font-sans`, `font-size: 10`
- **Dark mode** — all chart colors use `--ctp-*` variables, auto-adapt

## Chart Card Container

Every chart lives inside a `.chart-card`:

```html
<div class="chart-card">
  <div class="chart-card__header">
    <span class="chart-card__title">
      <svg ...><!-- icon --></svg>
      Chart Title
    </span>
    <span class="badge badge--accent">Metric</span>
  </div>
  <!-- SVG chart content -->
  <!-- Legend -->
</div>
```

Grid layout: `.chart-grid` uses `repeat(auto-fit, minmax(18rem, 1fr))`.

## Activity Rings

Concentric `<circle>` elements with `stroke-dashoffset` to control fill:

```html
<svg width="160" height="160" viewBox="0 0 160 160" class="chart-svg">
  <!-- Track (background) -->
  <circle class="ring-track" cx="80" cy="80" r="60" stroke-width="12" fill="none" />
  <!-- Fill (colored arc) -->
  <circle class="ring-fill" cx="80" cy="80" r="60" stroke-width="12" fill="none"
    stroke="var(--ctp-lavender)"
    stroke-dasharray="377"
    stroke-dashoffset="135"
    transform="rotate(-90 80 80)" />
</svg>
```

### Calculating fill

```
circumference = 2 × π × radius
dashoffset = circumference × (1 - percentage / 100)
```

Example: 64% fill on r=60 → circumference=377, offset=377×0.36≈135

### Color assignments

| Ring | Radius | Color | Metric |
|---|---|---|---|
| Outer | 60 | `--ctp-lavender` | CPU |
| Middle | 44 | `--ctp-mauve` | Memory |
| Inner | 28 | `--ctp-sapphire` | Disk |

Ring tracks use `--ctp-surface0`. Fill transition: `stroke-dashoffset 800ms var(--ease-spring)`.

## Donut Chart

Segmented circle using multiple `<circle>` elements with different `stroke-dashoffset`:

```html
<svg width="160" height="160" viewBox="0 0 160 160" class="chart-svg">
  <circle cx="80" cy="80" r="50" fill="none" stroke="var(--ctp-surface0)" stroke-width="10" />
  <circle class="donut-segment" cx="80" cy="80" r="50" fill="none"
    stroke="var(--ctp-blue)" stroke-width="10"
    stroke-dasharray="314" stroke-dashoffset="0"
    transform="rotate(-90 80 80)" />
  <!-- Additional segments with increasing dashoffset -->
</svg>
```

Center text overlay (absolute positioned):

```html
<div style="position: absolute; text-align: center; pointer-events: none;">
  <div id="donutCenterTitle">Total Used</div>
  <div id="donutCenterVal">95%</div>
</div>
```

Hover updates center text via JS. Segments grow stroke-width on hover (`stroke-width: 14`).

## Line Chart

SVG with gradient fill area, line path, and interactive hover tracking:

```html
<svg viewBox="0 0 600 200" id="lineChart" class="chart-svg">
  <defs>
    <linearGradient id="line-gradient-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25" />
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.00" />
    </linearGradient>
  </defs>

  <!-- Gridlines -->
  <line class="chart-grid-line" x1="50" y1="20" x2="570" y2="20" />

  <!-- Gradient area (closed path) -->
  <path class="chart-line-gradient" d="M 50,170 L 50,130 ... L 570,170 Z" />

  <!-- Line (open path) -->
  <path class="chart-line" d="M 50,130 L 97,145 ..." />

  <!-- Hover tracker -->
  <line class="chart-hover-line" id="hoverLine" x1="50" y1="20" x2="50" y2="170" />
  <circle class="chart-marker" id="hoverMarker" cx="50" cy="130" r="5" />
</svg>
```

### Interactive tracking (JS)

Define data points array, then snap to nearest on mousemove:

```js
const points = [
  { x: 50, y: 130, time: '12:00', val: '80 ms' },
  // ... more points
];

lineChart.addEventListener('mousemove', (e) => {
  const mouseX = ((e.clientX - rect.left) / rect.width) * 600;
  // Find closest point, update hoverLine, hoverMarker, tooltip
});
```

## Bar Chart

Grouped `<rect>` elements with data attributes for tooltips:

```html
<rect class="chart-bar" x="90" y="80" width="16" height="90" rx="4"
  fill="var(--ctp-blue)" data-label="Jan (Read)" data-val="6.4k" />
<rect class="chart-bar" x="110" y="120" width="16" height="50" rx="4"
  fill="var(--ctp-peach)" data-label="Jan (Write)" data-val="3.2k" />
```

Bars have `rx="4"` for rounded corners. Hover: `opacity: 0.85`.

## Heatmap

CSS Grid with intensity-stepped cells:

```html
<div class="heatmap" id="heatmapGrid">
  <div class="heatmap-cell heatmap-cell--1" data-label="Day 1" data-val="25%"></div>
  <div class="heatmap-cell heatmap-cell--4" data-label="Day 5" data-val="94%"></div>
</div>
```

```css
.heatmap { display: grid; grid-template-columns: repeat(24, 1fr); gap: 3px; }
.heatmap-cell { aspect-ratio: 1; border-radius: 2px; cursor: pointer; }
.heatmap-cell--1 { background: color-mix(in srgb, var(--accent) 25%, var(--ctp-surface0)); }
.heatmap-cell--2 { background: color-mix(in srgb, var(--accent) 50%, var(--ctp-surface0)); }
.heatmap-cell--3 { background: color-mix(in srgb, var(--accent) 75%, var(--ctp-surface0)); }
.heatmap-cell--4 { background: var(--accent); }
```

Hover: `transform: scale(1.25)`.

## Shared Tooltip

One global tooltip used by all charts:

```html
<div class="chart-tooltip" id="globalTooltip">
  <div class="chart-tooltip__header">
    <svg ...><!-- clock icon --></svg>
    <span id="tooltipTime">00:00</span>
  </div>
  <div class="chart-tooltip__value" id="tooltipVal">0 ms</div>
</div>
```

Frosted glass: `backdrop-filter: blur(12px)`. Follows cursor via `e.pageX/pageY`. Toggle `opacity: 0/1`.

## Accessibility Fallback

Provide screen-reader-only data tables for every chart:

```html
<div class="sr-only">
  <h3>Chart Data</h3>
  <table>
    <caption>Descriptive caption</caption>
    <thead><tr><th>Label</th><th>Value</th></tr></thead>
    <tbody>
      <tr><td>CPU</td><td>64%</td></tr>
    </tbody>
  </table>
</div>
```

Use `.sr-only` utility class (visually hidden, screen-reader accessible).
