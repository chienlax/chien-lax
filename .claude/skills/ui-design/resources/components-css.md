# Full Component CSS

Complete CSS for all interactive components. Copy into your stylesheet after the base tokens.

## Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  font: 500 var(--step--1) / 1 var(--font-sans);
  padding: var(--space-xs) var(--space-m);
  border-radius: var(--radius-m);
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition:
    background var(--duration) var(--ease-spring),
    color var(--duration) var(--ease-spring),
    border-color var(--duration) var(--ease-spring),
    opacity var(--duration) var(--ease-spring),
    transform 150ms var(--ease-spring);
  user-select: none;
  white-space: nowrap;
}

.btn--primary {
  background: var(--ctp-blue);
  color: var(--ctp-base);
  border-color: var(--ctp-blue);
}
.btn--primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ctp-blue) 84%, var(--ctp-crust));
  border-color: color-mix(in srgb, var(--ctp-blue) 84%, var(--ctp-crust));
}
.btn--primary:active:not(:disabled) { transform: scale(0.96); }

.btn--secondary {
  background: var(--surface-card);
  color: var(--text-primary);
  border-color: var(--border);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--separator);
  border-color: var(--ctp-overlay0);
}
.btn--secondary:active:not(:disabled) { transform: scale(0.96); }

.btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  border-color: transparent;
}
.btn--ghost:hover:not(:disabled) {
  background: var(--surface-raised);
  color: var(--text-primary);
}
.btn--ghost:active:not(:disabled) { transform: scale(0.96); }

.btn--danger {
  background: var(--color-danger);
  color: var(--ctp-base);
  border-color: var(--color-danger);
}
.btn--danger:hover:not(:disabled) {
  background: color-mix(in srgb, var(--color-danger) 84%, var(--ctp-crust));
  border-color: color-mix(in srgb, var(--color-danger) 84%, var(--ctp-crust));
}
.btn--danger:active:not(:disabled) { transform: scale(0.96); }

.btn:disabled { opacity: 0.4; cursor: not-allowed; }
```

## Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--step--1);
  font-weight: 500;
  padding: 0.25em 0.75em;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  line-height: 1.4;
}

.badge--default {
  background: var(--surface-card);
  border-color: var(--border);
  color: var(--text-secondary);
}

.badge--accent {
  background: var(--accent-dim);
  border-color: color-mix(in srgb, var(--ctp-blue) 30%, transparent);
  color: var(--accent);
}

.badge--success {
  background: color-mix(in srgb, var(--color-success) 12%, transparent);
  border-color: color-mix(in srgb, var(--color-success) 30%, transparent);
  color: var(--color-success);
}

.badge--warning {
  background: color-mix(in srgb, var(--color-warning) 12%, transparent);
  border-color: color-mix(in srgb, var(--color-warning) 30%, transparent);
  color: var(--color-warning);
}
```

## Callouts

```css
.callout {
  display: flex;
  gap: var(--space-s);
  padding: var(--space-m);
  border-radius: var(--radius-m);
  border: 1px solid;
}

.callout--info {
  background: var(--accent-dim);
  border-color: color-mix(in srgb, var(--ctp-blue) 25%, transparent);
}

.callout--mauve {
  background: color-mix(in srgb, var(--ctp-mauve) 10%, transparent);
  border-color: color-mix(in srgb, var(--ctp-mauve) 25%, transparent);
}

.callout__icon { flex-shrink: 0; color: var(--accent); line-height: 1.6; }
.callout__icon--mauve { color: var(--ctp-mauve); }
.callout__body > * + * { margin-block-start: var(--space-2xs); }
```

## Code Blocks

```css
.code-block {
  border: 1px solid var(--border);
  border-radius: var(--radius-m);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  line-height: 1.7;
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2xs) var(--space-s);
  background: color-mix(in srgb, var(--ctp-mantle) 80%, transparent);
  border-block-end: 1px solid var(--border);
}

.code-block__filename {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--ctp-overlay2);
}

.copy-btn {
  font-family: var(--font-sans);
  font-size: var(--step--1);
  color: var(--text-muted);
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  padding: var(--space-3xs) var(--space-xs);
  cursor: pointer;
  transition: color var(--duration) var(--ease), background var(--duration) var(--ease);
}
.copy-btn:hover { background: var(--surface-raised); color: var(--text-primary); }

.code-block__body {
  background: var(--ctp-mantle);
  overflow-x: auto;
  margin: 0;
  transition: background var(--duration) var(--ease);
}

.code-block__body code {
  display: block;
  padding: var(--space-m);
  background: none;
  border: none;
  color: var(--ctp-text);
  font-size: inherit;
  line-height: inherit;
  border-radius: 0;
}

.code-line { display: block; }

.code-line--focal {
  background: color-mix(in srgb, var(--ctp-blue) 10%, transparent);
  border-inline-start: 2px solid var(--ctp-lavender);
  margin-inline-start: calc(-1 * var(--space-m));
  padding-inline-start: calc(var(--space-m) - 2px);
  margin-inline-end: calc(-1 * var(--space-m));
  padding-inline-end: var(--space-m);
}

.code-line--dim { opacity: 0.35; }
```

## Data Tables

```css
.data-table {
  inline-size: 100%;
  border-collapse: collapse;
  font-size: var(--step--1);
}

.data-table th {
  text-align: start;
  font-weight: 500;
  color: var(--text-muted);
  padding: var(--space-2xs) var(--space-s);
  border-block-end: 1px solid var(--separator);
}

.data-table td {
  padding: var(--space-xs) var(--space-s);
  border-block-end: 1px solid var(--separator);
  color: var(--text-primary);
  vertical-align: middle;
}

.data-table tr:last-child td { border-block-end: none; }
.data-table td:first-child { font-family: var(--font-mono); color: var(--ctp-mauve); }
```

## Search Field

```css
.search-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-inline-size: 28rem;
  inline-size: 100%;
}

.search-icon {
  position: absolute;
  inset-inline-start: var(--space-s);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  inline-size: 100%;
  font: var(--step-0) / 1 var(--font-sans);
  color: var(--text-primary);
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: var(--space-xs) var(--space-m) var(--space-xs) calc(var(--space-m) + 1.25rem);
  transition: border-color var(--duration) var(--ease), box-shadow var(--duration) var(--ease);
  outline: none;
  appearance: none;
}
.search-input::placeholder { color: var(--text-muted); }
.search-input:focus {
  border-color: var(--accent-focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ctp-lavender) 20%, transparent);
}
```

## Segmented Control

```css
.segmented-control {
  position: relative;
  display: inline-flex;
  background: var(--ctp-mantle);
  padding: 2px;
  border-radius: var(--radius-l);
  border: 1px solid var(--border);
  user-select: none;
}

.segmented-control__slider {
  position: absolute;
  block-size: calc(100% - 4px);
  background: var(--surface);
  border-radius: calc(var(--radius-l) - 2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
  transition: transform var(--duration) var(--ease-spring), width var(--duration) var(--ease-spring);
  z-index: 1;
}

.segmented-control__item {
  position: relative;
  z-index: 2;
  font: 500 var(--step--1) / 1 var(--font-sans);
  color: var(--text-secondary);
  background: none;
  border: none;
  padding: var(--space-2xs) var(--space-s);
  border-radius: calc(var(--radius-l) - 2px);
  cursor: pointer;
  transition: color var(--duration) var(--ease);
}
.segmented-control__item:hover { color: var(--text-primary); }
.segmented-control__item--active { color: var(--accent); }
```

## Toggle Switch

```css
.switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: var(--space-2xs);
}

.switch input {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

.switch__track {
  position: relative;
  display: inline-block;
  inline-size: 2.75rem;
  block-size: 1.5rem;
  background: var(--ctp-surface1);
  border-radius: var(--radius-pill);
  transition: background var(--duration) var(--ease-spring);
}

.switch__thumb {
  position: absolute;
  inset-block-start: 2px;
  inset-inline-start: 2px;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform var(--duration) var(--ease-spring);
}

.switch input:checked + .switch__track { background: var(--ctp-green); }
.switch input:checked + .switch__track .switch__thumb { transform: translateX(1.25rem); }
.switch input:focus-visible + .switch__track {
  outline: 2px solid var(--accent-focus);
  outline-offset: 2px;
}
.switch input:disabled + .switch__track { opacity: 0.4; }
```

## Checkboxes & Radios

```css
.checkbox-label, .radio-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  cursor: pointer;
  user-select: none;
  font-size: var(--step--1);
}

.checkbox-label input, .radio-label input {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}

.custom-checkbox__box, .custom-radio__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 18px;
  block-size: 18px;
  border: 1px solid var(--border);
  background: var(--surface-card);
  transition: background var(--duration) var(--ease-spring), border-color var(--duration) var(--ease-spring);
  position: relative;
}

.custom-checkbox__box { border-radius: var(--radius-s); }
.custom-radio__circle { border-radius: 50%; }

.checkbox-label input:checked + .custom-checkbox__box {
  background: var(--accent);
  border-color: var(--accent);
}
.checkbox-label input:checked + .custom-checkbox__box::after {
  content: '';
  position: absolute;
  width: 5px; height: 9px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  top: 2px; left: 5.5px;
}

.radio-label input:checked + .custom-radio__circle {
  background: var(--accent);
  border-color: var(--accent);
}
.radio-label input:checked + .custom-radio__circle::after {
  content: '';
  position: absolute;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ffffff;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-label input:focus-visible + .custom-checkbox__box,
.radio-label input:focus-visible + .custom-radio__circle {
  outline: 2px solid var(--accent-focus);
  outline-offset: 2px;
}
```

## Range Slider

```css
.slider-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);
  max-inline-size: 20rem;
  inline-size: 100%;
}

.range-slider {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 100%;
  block-size: 6px;
  background: var(--ctp-surface1);
  border-radius: var(--radius-pill);
  outline: none;
  cursor: pointer;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 18px; block-size: 18px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 120ms var(--ease-spring);
}
.range-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
.range-slider::-webkit-slider-thumb:active { transform: scale(0.9); }
.range-slider:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--accent-focus);
  outline-offset: 2px;
}
```

## Toasts

```css
.toast-container {
  position: fixed;
  inset-block-end: var(--space-m);
  inset-inline-end: var(--space-m);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  inline-size: 20rem;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius-l);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transform: translateX(120%);
  animation: toast-in var(--duration) var(--ease-spring) forwards;
}

@keyframes toast-in { to { transform: translateX(0); } }

.toast__content {
  display: flex;
  gap: var(--space-xs);
  padding: var(--space-s);
  align-items: flex-start;
}

.toast__icon { flex-shrink: 0; margin-block-start: 2px; }
.toast__icon--success { color: var(--color-success); }
.toast__icon--info { color: var(--color-info); }
.toast__icon--warning { color: var(--color-warning); }

.toast__body { flex-grow: 1; }
.toast__title { font-weight: 600; font-size: var(--step--1); color: var(--text-primary); }
.toast__msg { font-size: var(--step--1); color: var(--text-secondary); margin-block-start: 2px; }

.toast__close {
  background: none; border: none; color: var(--text-muted); cursor: pointer;
  padding: 4px; border-radius: var(--radius-s);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--duration) var(--ease), color var(--duration) var(--ease);
}
.toast__close:hover { background: var(--surface-raised); color: var(--text-primary); }

.toast__progress {
  block-size: 3px;
  background: var(--accent);
  inline-size: 100%;
  transform-origin: left;
  animation: toast-timer 4000ms linear forwards;
}

@keyframes toast-timer { to { transform: scaleX(0); } }
```

## Glow Cards

```css
.glow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: var(--space-m);
}

.glow-card {
  position: relative;
  border-radius: var(--radius-l);
  border: 1px solid var(--border);
  background: var(--surface-card);
  padding: var(--space-m);
  overflow: hidden;
  transition: border-color var(--duration) var(--ease);
}

.glow-card__overlay {
  position: absolute;
  inset: -1px;
  border-radius: var(--radius-l);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  border: 1px solid transparent;
  background: radial-gradient(
    250px circle at var(--x, 0px) var(--y, 0px),
    color-mix(in srgb, var(--accent) 18%, transparent),
    transparent 80%
  );
  -webkit-mask: linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff);
  mask: linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: opacity var(--duration) var(--ease);
}

.glow-card:hover .glow-card__overlay { opacity: 1; }

.glow-card__content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: var(--space-2xs); }
.glow-card__title { font-weight: 600; color: var(--text-primary); }
.glow-card__desc { font-size: var(--step--1); color: var(--text-secondary); }
```

## Tabs

```css
.tabs-nav {
  position: relative;
  display: flex;
  border-block-end: 1px solid var(--separator);
  padding-block-end: 2px;
  gap: var(--space-m);
  margin-block-end: var(--space-m);
}

.tabs-nav__btn {
  background: none;
  border: none;
  font: 500 var(--step-0) / 1.5 var(--font-sans);
  color: var(--text-secondary);
  padding: var(--space-2xs) 0;
  cursor: pointer;
  transition: color var(--duration) var(--ease);
  position: relative;
}
.tabs-nav__btn:hover { color: var(--text-primary); }
.tabs-nav__btn--active { color: var(--accent); font-weight: 600; }

.tabs-indicator {
  position: absolute;
  block-size: 2px;
  background: var(--accent);
  inset-block-end: -1px;
  inline-size: 0;
  inset-inline-start: 0;
  transition: left var(--duration) var(--ease-spring), width var(--duration) var(--ease-spring);
}

.tabs-content { display: none; }
.tabs-content--active {
  display: block;
  animation: tab-fade-in var(--duration) var(--ease) forwards;
}

@keyframes tab-fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
```
