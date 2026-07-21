# Full CSS Token Definitions

Complete copy-paste CSS for bootstrapping a new project. Includes all custom properties, dark mode remapping, and the CSS reset.

## Root Tokens (Latte Light Default)

```css
:root {
  /* Neutral layers — Catppuccin Latte */
  --ctp-base:     #eff1f5;
  --ctp-mantle:   #e6e9ef;
  --ctp-crust:    #dce0e8;
  --ctp-surface0: #ccd0da;
  --ctp-surface1: #bcc0cc;
  --ctp-surface2: #acb0be;
  --ctp-overlay0: #9ca0b0;
  --ctp-overlay1: #8c8fa1;
  --ctp-overlay2: #7c7f93;
  --ctp-subtext0: #6c6f85;
  --ctp-subtext1: #5c5f77;
  --ctp-text:     #4c4f69;

  /* Accent colors */
  --ctp-lavender:  #7287fd;
  --ctp-blue:      #1e66f5;
  --ctp-sapphire:  #209fb5;
  --ctp-sky:       #04a5e5;
  --ctp-teal:      #179299;
  --ctp-green:     #40a02b;
  --ctp-yellow:    #df8e1d;
  --ctp-peach:     #fe640b;
  --ctp-maroon:    #e64553;
  --ctp-red:       #d20f39;
  --ctp-mauve:     #8839ef;
  --ctp-pink:      #ea76cb;
  --ctp-flamingo:  #dd7878;
  --ctp-rosewater: #dc8a78;

  /* Fluid type scale */
  --step--1: clamp(0.83rem, 0.78rem + 0.24vw, 0.94rem);
  --step-0:  clamp(1.00rem, 0.95rem + 0.28vw, 1.13rem);
  --step-1:  clamp(1.20rem, 1.14rem + 0.34vw, 1.41rem);
  --step-2:  clamp(1.44rem, 1.36rem + 0.41vw, 1.76rem);
  --step-3:  clamp(1.73rem, 1.63rem + 0.49vw, 2.20rem);
  --step-4:  clamp(2.07rem, 1.95rem + 0.59vw, 2.75rem);

  /* Fluid space scale */
  --space-3xs: clamp(0.25rem, 0.23rem + 0.07vw, 0.31rem);
  --space-2xs: clamp(0.50rem, 0.47rem + 0.14vw, 0.63rem);
  --space-xs:  clamp(0.75rem, 0.70rem + 0.21vw, 0.94rem);
  --space-s:   clamp(1.00rem, 0.95rem + 0.28vw, 1.25rem);
  --space-m:   clamp(1.50rem, 1.42rem + 0.43vw, 1.88rem);
  --space-l:   clamp(2.00rem, 1.89rem + 0.57vw, 2.50rem);
  --space-xl:  clamp(3.00rem, 2.84rem + 0.85vw, 3.75rem);
  --space-2xl: clamp(4.00rem, 3.79rem + 1.14vw, 5.00rem);

  /* Semantic tokens */
  --surface:        var(--ctp-base);
  --surface-raised: var(--ctp-surface0);
  --surface-card:   var(--ctp-surface0);
  --text-primary:   var(--ctp-text);
  --text-secondary: var(--ctp-subtext1);
  --text-muted:     var(--ctp-overlay1);
  --separator:      var(--ctp-surface1);
  --border:         var(--ctp-surface1);

  --accent:       var(--ctp-blue);
  --accent-focus: var(--ctp-lavender);
  --accent-dim:   color-mix(in srgb, var(--ctp-blue) 14%, transparent);
  --accent-light: color-mix(in srgb, var(--ctp-blue)  8%, var(--ctp-base));

  --color-success: var(--ctp-green);
  --color-warning: var(--ctp-yellow);
  --color-danger:  var(--ctp-red);
  --color-info:    var(--ctp-teal);

  /* Typography */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  --measure:   65ch;

  /* Radii */
  --radius-s:    4px;
  --radius-m:    8px;
  --radius-l:    12px;
  --radius-pill: 999px;

  /* Animation */
  --ease:        cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration:    250ms;
}
```

## Dark Mode (Mocha Remapping)

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ctp-base:     #1e1e2e;
    --ctp-mantle:   #181825;
    --ctp-crust:    #11111b;
    --ctp-surface0: #313244;
    --ctp-surface1: #45475a;
    --ctp-surface2: #585b70;
    --ctp-overlay0: #6c7086;
    --ctp-overlay1: #7f849c;
    --ctp-overlay2: #9399b2;
    --ctp-subtext0: #a6adc8;
    --ctp-subtext1: #bac2de;
    --ctp-text:     #cdd6f4;
    --ctp-lavender: #b4befe;
    --ctp-blue:     #89b4fa;
    --ctp-sapphire: #74c7ec;
    --ctp-sky:      #89dceb;
    --ctp-teal:     #94e2d5;
    --ctp-green:    #a6e3a1;
    --ctp-yellow:   #f9e2af;
    --ctp-peach:    #fab387;
    --ctp-maroon:   #eba0ac;
    --ctp-red:      #f38ba8;
    --ctp-mauve:    #cba6f7;
    --ctp-pink:     #f5c2e7;
    --ctp-flamingo: #f2cdcd;
    --ctp-rosewater:#f5e0dc;
  }
}

[data-theme="dark"] {
  --ctp-base:     #1e1e2e;
  --ctp-mantle:   #181825;
  --ctp-crust:    #11111b;
  --ctp-surface0: #313244;
  --ctp-surface1: #45475a;
  --ctp-surface2: #585b70;
  --ctp-overlay0: #6c7086;
  --ctp-overlay1: #7f849c;
  --ctp-overlay2: #9399b2;
  --ctp-subtext0: #a6adc8;
  --ctp-subtext1: #bac2de;
  --ctp-text:     #cdd6f4;
  --ctp-lavender: #b4befe;
  --ctp-blue:     #89b4fa;
  --ctp-sapphire: #74c7ec;
  --ctp-sky:      #89dceb;
  --ctp-teal:     #94e2d5;
  --ctp-green:    #a6e3a1;
  --ctp-yellow:   #f9e2af;
  --ctp-peach:    #fab387;
  --ctp-maroon:   #eba0ac;
  --ctp-red:      #f38ba8;
  --ctp-mauve:    #cba6f7;
  --ctp-pink:     #f5c2e7;
  --ctp-flamingo: #f2cdcd;
  --ctp-rosewater:#f5e0dc;
}

[data-theme="light"] {
  --ctp-base:     #eff1f5;
  --ctp-mantle:   #e6e9ef;
  --ctp-crust:    #dce0e8;
  --ctp-surface0: #ccd0da;
  --ctp-surface1: #bcc0cc;
  --ctp-surface2: #acb0be;
  --ctp-overlay0: #9ca0b0;
  --ctp-overlay1: #8c8fa1;
  --ctp-overlay2: #7c7f93;
  --ctp-subtext0: #6c6f85;
  --ctp-subtext1: #5c5f77;
  --ctp-text:     #4c4f69;
  --ctp-lavender: #7287fd;
  --ctp-blue:     #1e66f5;
  --ctp-sapphire: #209fb5;
  --ctp-sky:      #04a5e5;
  --ctp-teal:     #179299;
  --ctp-green:    #40a02b;
  --ctp-yellow:   #df8e1d;
  --ctp-peach:    #fe640b;
  --ctp-maroon:   #e64553;
  --ctp-red:      #d20f39;
  --ctp-mauve:    #8839ef;
  --ctp-pink:     #ea76cb;
  --ctp-flamingo: #dd7878;
  --ctp-rosewater:#dc8a78;
}
```

## CSS Reset

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }

html {
  color-scheme: light dark;
  font-size: 100%;
  scroll-behavior: smooth;
}

img, video, svg { max-inline-size: 100%; display: block; }
p, h1, h2, h3, h4 { overflow-wrap: break-word; }
ul[role="list"], ol[role="list"] { list-style: none; padding: 0; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Base Typography

```css
body {
  font: var(--step-0) / 1.6 var(--font-sans);
  color: var(--text-primary);
  background: var(--surface);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  min-block-size: 100dvh;
  transition: background var(--duration) var(--ease), color var(--duration) var(--ease);
}

h1 { font-size: var(--step-4); line-height: 1.15; letter-spacing: -0.02em;  font-weight: 600; }
h2 { font-size: var(--step-3); line-height: 1.2;  letter-spacing: -0.015em; font-weight: 600; }
h3 { font-size: var(--step-2); line-height: 1.25; letter-spacing: -0.01em;  font-weight: 600; }
h4 { font-size: var(--step-1); line-height: 1.3;  letter-spacing: -0.005em; font-weight: 500; }

p { max-inline-size: var(--measure); }

a {
  color: var(--accent);
  text-underline-offset: 3px;
  transition: opacity var(--duration) var(--ease);
}
a:hover { opacity: 0.75; }

code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  padding: 0.1em 0.35em;
  color: var(--ctp-mauve);
}

small { font-size: var(--step--1); color: var(--text-secondary); }
hr { border: none; border-block-start: 1px solid var(--separator); }

:focus-visible {
  outline: 2px solid var(--accent-focus);
  outline-offset: 2px;
  border-radius: var(--radius-s);
}

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
```
