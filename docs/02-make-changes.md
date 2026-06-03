# Guide: Making Common Changes to the Site

This guide covers the most frequent tweaks you may want to make without needing Claude's help.

---

## 1. Site Identity (title, bio, avatar, location)

All of this lives in [`_config.yml`](../_config.yml). You need to restart the local server after changing this file.

```yaml
title: "sleeping, on the go"        # browser tab title and masthead text
description: "Personal website of Quang Chien."

author:
  name: "Quang Chien"
  avatar: "/assets/images/bio-photo.JPG"   # swap the image file in assets/images/
  bio: "wannabe researcher, i am trying my best tho."
  location: "Ha Noi, Viet Nam"
  email: "chienlax.work@gmail.com"
```

Change any of these values, save, and rebuild.

---

## 2. Navigation Bar Links

Edit [`_data/navigation.yml`](../_data/navigation.yml):

```yaml
main:
  - title: "About"
    url: /about/
  - title: "Archive"      # add a new item like this
    url: /categories/
```

Each item needs a `title` (label shown in the nav) and a `url` (relative path). Remove an item by deleting its two lines.

---

## 3. Dark/Light Mode — Changing the Default

**Default on page load is light (Catppuccin Latte).** To flip the default to dark, change one line in `_includes/head/custom.html`:

```html
<!-- Current: dark.css disabled by default (light mode default) -->
<link id="dark-mode-stylesheet" rel="stylesheet" href="..." disabled>

<!-- Change to: remove the `disabled` attribute to default to dark -->
<link id="dark-mode-stylesheet" rel="stylesheet" href="...">
```

The toggle button and `localStorage` persistence still work either way.

To change which skin is used for the **light** theme, change `minimal_mistakes_skin` in `_config.yml` (requires a rebuild):
```yaml
minimal_mistakes_skin: "catppuccin_latte"
```

To change which skin is used for the **dark** theme, change the import in [`assets/css/dark.scss`](../assets/css/dark.scss):
```scss
@import "minimal-mistakes/skins/catppuccin-mocha"; // swap skin name here
```

Available skins in `_sass/minimal-mistakes/skins/`: `catppuccin_latte`, `catppuccin_mocha`, `catppuccin-latte`, `catppuccin-mocha`.

---

## 4. Footer Copyright Text

The footer reads: "© 2026 sleeping, on the go. Powered by Jekyll & Minimal Mistakes."

To change the site name portion, add a `copyright` key to `_config.yml`:
```yaml
copyright: "your custom text here"
```

If that key is absent, it falls back to `site.title`. The footer template lives at [`_includes/footer.html`](../_includes/footer.html) if you need deeper changes.

---

## 5. Content Column Width

The sidebar width (which controls how wide the content area is) is set at the top of both CSS files. Smaller sidebar = wider content.

In [`assets/css/main.scss`](../assets/css/main.scss) and [`assets/css/dark.scss`](../assets/css/dark.scss), find and adjust:
```scss
$right-sidebar-width-narrow: 150px;   // at the "large" breakpoint (~1024px+)
$right-sidebar-width: 200px;           // at the "x-large" breakpoint (~1280px+)
```

Default gem values are 200px and 300px respectively. Lower = more content room.

Further down in the same files there are CSS overrides (using `@include breakpoint(...)`) that control the sidebar-to-content gap and sidebar text wrapping — edit those if the sidebar layout needs more fine-tuning.

---

## 6. Suppressing (or Restoring) Post-Bottom Sections

The following sections are removed via empty local override files. To **restore** one, simply delete the corresponding file — the gem's default will take over.

| Section | File to delete to restore |
|---|---|
| Share buttons | `_includes/social-share.html` |
| Previous / Next | `_includes/post_pagination.html` |
| "You may also enjoy" | `_includes/page__related.html` |

To suppress a section that's currently showing, create the corresponding empty file.

---

## 7. Adding a New Static Page

1. Create a `.md` file in [`_pages/`](../_pages/), e.g. `_pages/now.md`:
   ```yaml
   ---
   layout: single
   title: "now"
   permalink: /now/
   author_profile: true
   ---

   What I'm up to right now...
   ```

2. Add it to the navigation if you want it in the header (see section 2 above):
   ```yaml
   - title: "Now"
     url: /now/
   ```

The `permalink` value is the URL path. Keep it lowercase with a trailing slash.
