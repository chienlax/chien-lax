# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal blog/website for Quang Chien, built with Jekyll and the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme. Deployed automatically to GitHub Pages at `https://chienlax.github.io/chien-lax/` on push to `main`.

## Common commands

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

The site is served at `http://localhost:4000/chien-lax/` by default.

## Git

When I ask you to commit and push changes to the remote, NEVER add a "Co-authored-by" line to the commit message.

## Architecture

- `_config.yml` — site-wide settings, active skin (`minimal_mistakes_skin`), plugins, author profile
- `_posts/` — blog posts, named `YYYY-MM-DD-title.md` with YAML front matter (`layout`, `title`, `date`, `categories`, `tags`)
- `_pages/` — static pages (e.g. `about.md`); added to navigation via `_data/navigation.yml`
- `_sass/minimal-mistakes/skins/` — custom Catppuccin theme skins (`_catppuccin-latte.scss`, `_catppuccin-mocha.scss`); active skin is set in `_config.yml` under `minimal_mistakes_skin`
- `_includes/` — Liquid template overrides for the theme (see below)
- `assets/images/` — static images

## Active `_includes/` overrides

Local files shadow the gem's versions. Current overrides and their purpose:

| File | Purpose |
|---|---|
| `masthead.html` | Adds dark/light mode toggle button |
| `head/custom.html` | Loads `dark.css` disabled; enables via `localStorage` to prevent FOUC |
| `category-list.html` | Renders categories as non-clickable `<span>` (same as tags) |
| `social-share.html` | Empty — removes share buttons |
| `post_pagination.html` | Empty — removes Previous/Next nav |
| `page__related.html` | Empty — removes "YOU MAY ALSO ENJOY" block |
| `footer.html` | Removes link from copyright site-title |

Local layout overrides in `_layouts/`:

| File | Purpose |
|---|---|
| `single.html` | Removes self-linking `<a>` from the post page h1 title |

To restore a suppressed section, delete the corresponding empty file.

## Dark/light mode

Two full compiled stylesheets: `assets/css/main.css` (Catppuccin Latte, light) and `assets/css/dark.css` (Catppuccin Mocha, dark). `head/custom.html` loads `dark.css` as `disabled` and enables it immediately from `localStorage` to avoid flash. The toggle button in `masthead.html` flips the stylesheet and saves the preference. No Jekyll rebuild needed to switch themes.

## Sass deprecation warnings

`_config.yml` already silences known Sass deprecations (`sass.silence_deprecations`). If new warnings appear from Minimal Mistakes gem updates, add the deprecation key there rather than editing gem source files.
