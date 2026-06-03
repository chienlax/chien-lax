---
name: project-overrides
description: Which Minimal Mistakes gem includes are locally overridden in _includes/, and the reason for each
metadata:
  type: project
---

Local files in `_includes/` always take precedence over the gem's versions. Current overrides:

| File | Purpose |
|---|---|
| `masthead.html` | Added dark/light mode toggle button; see [[project-dark-mode]] |
| `head/custom.html` | Loads `dark.css` as disabled; enables it via localStorage on page load |
| `category-list.html` | Renders categories as `<span>` (non-clickable) instead of `<a>` links, matching tag behaviour |
| `tag-list.html` | Pre-existing; renders tags as `<span>` (non-clickable) |
| `social-share.html` | Empty — suppresses "SHARE ON" block |
| `post_pagination.html` | Empty — suppresses Previous/Next buttons |
| `page__related.html` | Empty — suppresses "YOU MAY ALSO ENJOY" block |
| `footer.html` | Removed `<a>` wrapper from site title in copyright line (was linking to non-existent root URL) |
| `../_layouts/single.html` | Removed `<a href="page.url">` wrapper from post h1 title (was self-linking on post pages) |

**Why:** The empty overrides are more reliable than `share: false` / `related: false` in `_config.yml` defaults — config-based suppression didn't take effect consistently (possibly caching or build-order issues).

**How to apply:** When the user asks to customise or restore any post-footer element, check this list first. To restore a section, delete the corresponding empty file.
