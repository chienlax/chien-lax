# Full Chart Examples — HTML + JS

Complete working examples for all chart types. Copy these into your pages alongside the chart CSS from `style.css`.

## Global Tooltip (Required)

Every chart page needs one shared tooltip:

```html
<div class="chart-tooltip" id="globalTooltip">
  <div class="chart-tooltip__header">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
    <span id="tooltipTime">00:00</span>
  </div>
  <div class="chart-tooltip__value" id="tooltipVal">0 ms</div>
</div>
```

## Activity Rings — Complete Example

```html
<div class="chart-card">
  <div class="chart-card__header">
    <span class="chart-card__title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v4"/><path d="M12 18v4"/>
        <path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/>
        <path d="M2 12h4"/><path d="M18 12h4"/>
        <path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/>
      </svg>
      Activity Status
    </span>
    <span class="badge badge--default">Live</span>
  </div>
  <div style="display: flex; justify-content: center; align-items: center; min-block-size: 180px;">
    <svg width="160" height="160" viewBox="0 0 160 160" class="chart-svg">
      <!-- CPU Ring (r=60, circumference=377) -->
      <circle class="ring-track" cx="80" cy="80" r="60" stroke-width="12" fill="none" />
      <circle class="ring-fill" id="ringCpu" cx="80" cy="80" r="60" stroke-width="12" fill="none"
        stroke="var(--ctp-lavender)" stroke-dasharray="377" stroke-dashoffset="135"
        transform="rotate(-90 80 80)" style="cursor: pointer;" />

      <!-- Memory Ring (r=44, circumference=276) -->
      <circle class="ring-track" cx="80" cy="80" r="44" stroke-width="12" fill="none" />
      <circle class="ring-fill" id="ringMem" cx="80" cy="80" r="44" stroke-width="12" fill="none"
        stroke="var(--ctp-mauve)" stroke-dasharray="276" stroke-dashoffset="110"
        transform="rotate(-90 80 80)" style="cursor: pointer;" />

      <!-- Disk Ring (r=28, circumference=176) -->
      <circle class="ring-track" cx="80" cy="80" r="28" stroke-width="12" fill="none" />
      <circle class="ring-fill" id="ringDisk" cx="80" cy="80" r="28" stroke-width="12" fill="none"
        stroke="var(--ctp-sapphire)" stroke-dasharray="176" stroke-dashoffset="35"
        transform="rotate(-90 80 80)" style="cursor: pointer;" />
    </svg>
  </div>
  <div class="cluster" style="justify-content: space-around; font-size: var(--step--1);">
    <span style="color: var(--ctp-lavender); font-weight: 500;">● CPU: 64%</span>
    <span style="color: var(--ctp-mauve); font-weight: 500;">● MEM: 60%</span>
    <span style="color: var(--ctp-sapphire); font-weight: 500;">● DISK: 80%</span>
  </div>
</div>
```

## Donut Chart — Complete Example

```html
<div class="chart-card">
  <div class="chart-card__header">
    <span class="chart-card__title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      Disk Allocation
    </span>
    <span class="badge badge--success">Healthy</span>
  </div>
  <div style="position: relative; display: flex; justify-content: center; align-items: center; min-block-size: 180px;">
    <svg width="160" height="160" viewBox="0 0 160 160" class="chart-svg">
      <circle cx="80" cy="80" r="50" fill="none" stroke="var(--ctp-surface0)" stroke-width="10" />
      <!-- System 50%: dashoffset=0 (shows 50% = 157px of 314 circumference) -->
      <circle class="donut-segment" id="donutSystem" cx="80" cy="80" r="50" fill="none"
        stroke="var(--ctp-blue)" stroke-width="10"
        stroke-dasharray="314" stroke-dashoffset="0" transform="rotate(-90 80 80)" />
      <!-- Apps 30%: dashoffset=157 -->
      <circle class="donut-segment" id="donutApps" cx="80" cy="80" r="50" fill="none"
        stroke="var(--ctp-mauve)" stroke-width="10"
        stroke-dasharray="314" stroke-dashoffset="157" transform="rotate(-90 80 80)" />
      <!-- User 15%: dashoffset=251 -->
      <circle class="donut-segment" id="donutUser" cx="80" cy="80" r="50" fill="none"
        stroke="var(--ctp-teal)" stroke-width="10"
        stroke-dasharray="314" stroke-dashoffset="251" transform="rotate(-90 80 80)" />
      <!-- Free 5%: dashoffset=298 -->
      <circle class="donut-segment" id="donutFree" cx="80" cy="80" r="50" fill="none"
        stroke="var(--ctp-green)" stroke-width="10"
        stroke-dasharray="314" stroke-dashoffset="298" transform="rotate(-90 80 80)" />
    </svg>
    <div style="position: absolute; text-align: center; pointer-events: none;">
      <div id="donutCenterTitle" style="font-size: var(--step--1); color: var(--text-muted); font-weight: 500;">Total Used</div>
      <div id="donutCenterVal" style="font-size: var(--step-1); font-weight: 600; color: var(--text-primary);">95%</div>
    </div>
  </div>
  <div class="cluster" style="justify-content: center; gap: var(--space-xs); font-size: 11px;">
    <span style="color: var(--ctp-blue);">■ System (50%)</span>
    <span style="color: var(--ctp-mauve);">■ Apps (30%)</span>
    <span style="color: var(--ctp-teal);">■ User (15%)</span>
    <span style="color: var(--ctp-green);">■ Free (5%)</span>
  </div>
</div>
```

## Line Chart — Complete Example

```html
<div class="chart-card" style="inline-size: 100%;">
  <div class="chart-card__header">
    <span class="chart-card__title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
      </svg>
      API Response Time (Last 12 Hours)
    </span>
    <span class="badge badge--accent">98.4ms avg</span>
  </div>
  <div style="position: relative; inline-size: 100%; min-block-size: 200px;">
    <svg viewBox="0 0 600 200" id="lineChart" class="chart-svg" style="inline-size: 100%; block-size: 200px;">
      <defs>
        <linearGradient id="line-gradient-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.00" />
        </linearGradient>
      </defs>
      <line class="chart-grid-line" x1="50" y1="20" x2="570" y2="20" />
      <line class="chart-grid-line" x1="50" y1="70" x2="570" y2="70" />
      <line class="chart-grid-line" x1="50" y1="120" x2="570" y2="120" />
      <line class="chart-grid-line" x1="50" y1="170" x2="570" y2="170" />
      <text x="20" y="25" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">150ms</text>
      <text x="20" y="75" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">100ms</text>
      <text x="20" y="125" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">50ms</text>
      <text x="20" y="175" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">0ms</text>
      <path class="chart-line-gradient" d="M 50,170 L 50,130 L 97.2,145 L 144.5,100 L 191.8,110 L 239,70 L 286.3,85 L 333.6,50 L 380.9,90 L 428.1,65 L 475.4,55 L 522.7,40 L 570,35 L 570,170 Z" />
      <path class="chart-line" d="M 50,130 L 97.2,145 L 144.5,100 L 191.8,110 L 239,70 L 286.3,85 L 333.6,50 L 380.9,90 L 428.1,65 L 475.4,55 L 522.7,40 L 570,35" />
      <line class="chart-hover-line" id="hoverLine" x1="50" y1="20" x2="50" y2="170" />
      <circle class="chart-marker" id="hoverMarker" cx="50" cy="130" r="5" style="opacity: 0;" />
    </svg>
  </div>
</div>
```

## Bar Chart — Complete Example

```html
<div class="chart-card">
  <div class="chart-card__header">
    <span class="chart-card__title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="15" y="3" width="6" height="18" rx="2"/>
        <rect x="1" y="11" width="6" height="10" rx="2"/>
        <rect x="8" y="7" width="6" height="14" rx="2"/>
      </svg>
      Request Volumes (Read vs Write)
    </span>
    <span class="badge badge--accent">10k requests/m</span>
  </div>
  <div style="position: relative; inline-size: 100%; min-block-size: 200px;">
    <svg viewBox="0 0 600 200" class="chart-svg" style="inline-size: 100%; block-size: 200px;" id="barChart">
      <line class="chart-grid-line" x1="50" y1="20" x2="570" y2="20" />
      <line class="chart-grid-line" x1="50" y1="70" x2="570" y2="70" />
      <line class="chart-grid-line" x1="50" y1="120" x2="570" y2="120" />
      <line class="chart-grid-line" x1="50" y1="170" x2="570" y2="170" />
      <text x="20" y="25" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">10k</text>
      <text x="20" y="75" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">5k</text>
      <text x="20" y="125" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">2k</text>
      <text x="20" y="175" fill="var(--text-muted)" font-size="10" font-family="var(--font-sans)">0</text>
      <!-- Grouped bars per month -->
      <rect class="chart-bar" x="90"  y="80"  width="16" height="90"  rx="4" fill="var(--ctp-blue)" data-label="Jan (Read)"  data-val="6.4k" />
      <rect class="chart-bar" x="110" y="120" width="16" height="50"  rx="4" fill="var(--ctp-peach)" data-label="Jan (Write)" data-val="3.2k" />
      <rect class="chart-bar" x="180" y="60"  width="16" height="110" rx="4" fill="var(--ctp-blue)" data-label="Feb (Read)"  data-val="7.8k" />
      <rect class="chart-bar" x="200" y="100" width="16" height="70"  rx="4" fill="var(--ctp-peach)" data-label="Feb (Write)" data-val="4.5k" />
      <rect class="chart-bar" x="270" y="40"  width="16" height="130" rx="4" fill="var(--ctp-blue)" data-label="Mar (Read)"  data-val="8.9k" />
      <rect class="chart-bar" x="290" y="90"  width="16" height="80"  rx="4" fill="var(--ctp-peach)" data-label="Mar (Write)" data-val="5.1k" />
      <rect class="chart-bar" x="360" y="50"  width="16" height="120" rx="4" fill="var(--ctp-blue)" data-label="Apr (Read)"  data-val="8.1k" />
      <rect class="chart-bar" x="380" y="80"  width="16" height="90"  rx="4" fill="var(--ctp-peach)" data-label="Apr (Write)" data-val="6.0k" />
      <rect class="chart-bar" x="450" y="30"  width="16" height="140" rx="4" fill="var(--ctp-blue)" data-label="May (Read)"  data-val="9.5k" />
      <rect class="chart-bar" x="470" y="70"  width="16" height="100" rx="4" fill="var(--ctp-peach)" data-label="May (Write)" data-val="6.8k" />
    </svg>
  </div>
</div>
```

## Chart Interaction JS

```js
document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('globalTooltip');
  const timeText = document.getElementById('tooltipTime');
  const valText = document.getElementById('tooltipVal');

  // ── Donut Segment Hover ─────────────────────────────────────
  const donutCenterTitle = document.getElementById('donutCenterTitle');
  const donutCenterVal = document.getElementById('donutCenterVal');
  const donutSegments = {
    donutSystem: { label: 'System files', val: '50%' },
    donutApps:   { label: 'Applications', val: '30%' },
    donutUser:   { label: 'User Folders', val: '15%' },
    donutFree:   { label: 'Free Space',   val: '5%'  }
  };

  Object.keys(donutSegments).forEach(id => {
    const seg = document.getElementById(id);
    seg?.addEventListener('mouseover', () => {
      donutCenterTitle.textContent = donutSegments[id].label;
      donutCenterVal.textContent = donutSegments[id].val;
    });
    seg?.addEventListener('mouseleave', () => {
      donutCenterTitle.textContent = 'Total Used';
      donutCenterVal.textContent = '95%';
    });
  });

  // ── Activity Rings Hover ────────────────────────────────────
  const rings = {
    ringCpu:  { name: 'CPU Load',      value: '64%' },
    ringMem:  { name: 'Memory Usage',  value: '60%' },
    ringDisk: { name: 'Disk Capacity', value: '80%' }
  };

  Object.keys(rings).forEach(id => {
    const ring = document.getElementById(id);
    ring?.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      timeText.textContent = rings[id].name;
      valText.textContent = rings[id].value;
    });
    ring?.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = e.pageY + 'px';
    });
    ring?.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });

  // ── Line Chart Tracker ──────────────────────────────────────
  const lineChart = document.getElementById('lineChart');
  const hoverLine = document.getElementById('hoverLine');
  const hoverMarker = document.getElementById('hoverMarker');

  const points = [
    { x: 50,  y: 130, time: '12:00', val: '80 ms'  },
    { x: 97,  y: 145, time: '13:00', val: '65 ms'  },
    { x: 144, y: 100, time: '14:00', val: '110 ms' },
    { x: 191, y: 110, time: '15:00', val: '100 ms' },
    { x: 239, y: 70,  time: '16:00', val: '140 ms' },
    { x: 286, y: 85,  time: '17:00', val: '125 ms' },
    { x: 333, y: 50,  time: '18:00', val: '160 ms' },
    { x: 380, y: 90,  time: '19:00', val: '120 ms' },
    { x: 428, y: 65,  time: '20:00', val: '145 ms' },
    { x: 475, y: 55,  time: '21:00', val: '155 ms' },
    { x: 522, y: 40,  time: '22:00', val: '170 ms' },
    { x: 570, y: 35,  time: '00:00', val: '175 ms' }
  ];

  lineChart?.addEventListener('mouseenter', () => {
    hoverLine.style.opacity = '1';
    hoverMarker.style.opacity = '1';
    tooltip.style.opacity = '1';
  });

  lineChart?.addEventListener('mousemove', (e) => {
    const rect = lineChart.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 600;
    let closest = points[0];
    let minDist = Math.abs(mouseX - points[0].x);
    for (let i = 1; i < points.length; i++) {
      const dist = Math.abs(mouseX - points[i].x);
      if (dist < minDist) { minDist = dist; closest = points[i]; }
    }
    hoverLine.setAttribute('x1', closest.x);
    hoverLine.setAttribute('x2', closest.x);
    hoverMarker.setAttribute('cx', closest.x);
    hoverMarker.setAttribute('cy', closest.y);
    timeText.textContent = closest.time;
    valText.textContent = closest.val;
    tooltip.style.left = e.pageX + 'px';
    tooltip.style.top = e.pageY + 'px';
  });

  lineChart?.addEventListener('mouseleave', () => {
    hoverLine.style.opacity = '0';
    hoverMarker.style.opacity = '0';
    tooltip.style.opacity = '0';
  });

  // ── Bar Hover Tooltips ──────────────────────────────────────
  document.querySelectorAll('.chart-bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      timeText.textContent = bar.getAttribute('data-label');
      valText.textContent = bar.getAttribute('data-val');
    });
    bar.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = e.pageY + 'px';
    });
    bar.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });
  });

  // ── Heatmap Cell Tooltips ───────────────────────────────────
  document.querySelectorAll('.heatmap-cell').forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      timeText.textContent = cell.getAttribute('data-label');
      valText.textContent = cell.getAttribute('data-val');
    });
    cell.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = e.pageY + 'px';
    });
    cell.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });
  });
});
```

## Heatmap CSS (Page-Specific)

```css
.heatmap {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 3px;
}
.heatmap-cell {
  aspect-ratio: 1;
  background: var(--ctp-surface0);
  border-radius: 2px;
  transition: background var(--duration) var(--ease), transform 120ms var(--ease-spring);
  cursor: pointer;
}
.heatmap-cell:hover { transform: scale(1.25); z-index: 2; }
.heatmap-cell--1 { background: color-mix(in srgb, var(--accent) 25%, var(--ctp-surface0)); }
.heatmap-cell--2 { background: color-mix(in srgb, var(--accent) 50%, var(--ctp-surface0)); }
.heatmap-cell--3 { background: color-mix(in srgb, var(--accent) 75%, var(--ctp-surface0)); }
.heatmap-cell--4 { background: var(--accent); }
```
