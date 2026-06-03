---
name: project-dark-mode
description: How the client-side dark/light mode toggle works (dual CSS + localStorage, no Jekyll rebuild needed)
metadata:
  type: project
---

Two full compiled stylesheets exist:
- `assets/css/main.css` — Catppuccin Latte (light)
- `assets/css/dark.css` — Catppuccin Mocha (dark); also adds `.page__title` and `.page__content` font-size rules not present in main.css

**Toggle mechanism:**
1. `_includes/head/custom.html` links `dark.css` with `id="dark-mode-stylesheet"` and `disabled` attribute. An inline `<script>` immediately removes `disabled` if `localStorage.theme === 'dark'` — this prevents FOUC.
2. `_includes/masthead.html` has `<button id="theme-toggle">` with `<i id="theme-icon" class="fas fa-moon">`. An inline `<script>` at the end of the file toggles `darkSheet.disabled`, swaps the icon between `fa-moon` / `fa-sun`, and writes `localStorage.theme`.
3. Since `dark.css` loads after `main.css` in the DOM, when enabled it wins the full cascade.

**Why:** `_config.yml`'s `minimal_mistakes_skin` is compile-time only; changing it requires a Jekyll rebuild. The dual-stylesheet approach works entirely client-side.

**How to apply:** To add a third theme or change the dark skin, add another compiled SCSS entry under `assets/css/` and update the `href` in `head/custom.html` and the toggle logic in `masthead.html`.
