# Complete Catppuccin Palette — Latte & Mocha

Side-by-side hex values for every palette color in both flavors.

## Neutral Layers

| Name | Latte (Light) | Mocha (Dark) |
|---|---|---|
| Base | `#eff1f5` | `#1e1e2e` |
| Mantle | `#e6e9ef` | `#181825` |
| Crust | `#dce0e8` | `#11111b` |
| Surface 0 | `#ccd0da` | `#313244` |
| Surface 1 | `#bcc0cc` | `#45475a` |
| Surface 2 | `#acb0be` | `#585b70` |
| Overlay 0 | `#9ca0b0` | `#6c7086` |
| Overlay 1 | `#8c8fa1` | `#7f849c` |
| Overlay 2 | `#7c7f93` | `#9399b2` |
| Subtext 0 | `#6c6f85` | `#a6adc8` |
| Subtext 1 | `#5c5f77` | `#bac2de` |
| Text | `#4c4f69` | `#cdd6f4` |

## Accent Colors

| Name | Latte (Light) | Mocha (Dark) |
|---|---|---|
| Lavender | `#7287fd` | `#b4befe` |
| Blue | `#1e66f5` | `#89b4fa` |
| Sapphire | `#209fb5` | `#74c7ec` |
| Sky | `#04a5e5` | `#89dceb` |
| Teal | `#179299` | `#94e2d5` |
| Green | `#40a02b` | `#a6e3a1` |
| Yellow | `#df8e1d` | `#f9e2af` |
| Peach | `#fe640b` | `#fab387` |
| Maroon | `#e64553` | `#eba0ac` |
| Red | `#d20f39` | `#f38ba8` |
| Mauve | `#8839ef` | `#cba6f7` |
| Pink | `#ea76cb` | `#f5c2e7` |
| Flamingo | `#dd7878` | `#f2cdcd` |
| Rosewater | `#dc8a78` | `#f5e0dc` |

## CSS Variable Names

All colors use the `--ctp-` prefix:

```
--ctp-base, --ctp-mantle, --ctp-crust
--ctp-surface0, --ctp-surface1, --ctp-surface2
--ctp-overlay0, --ctp-overlay1, --ctp-overlay2
--ctp-subtext0, --ctp-subtext1, --ctp-text
--ctp-lavender, --ctp-blue, --ctp-sapphire, --ctp-sky
--ctp-teal, --ctp-green, --ctp-yellow, --ctp-peach
--ctp-maroon, --ctp-red, --ctp-mauve, --ctp-pink
--ctp-flamingo, --ctp-rosewater
```

## Dark Mode Architecture

In light mode (default): `:root` declares Latte hex values.

In dark mode: Only the `--ctp-*` values are remapped to Mocha hex values. All semantic tokens (`--surface`, `--text-primary`, `--accent`, etc.) reference `--ctp-*` and auto-resolve — no overrides needed.

Three CSS selectors handle the toggle:

1. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }` — System preference
2. `[data-theme="dark"] { ... }` — Explicit dark mode
3. `[data-theme="light"] { ... }` — Explicit light mode
