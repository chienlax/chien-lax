# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal blog/website for Quang Chien, built with Jekyll and a local port of the
`ui-design` skill's design system. Deployed automatically to GitHub Pages at
`https://chienlax.github.io/chien-lax/` on push to `main`.

There is no theme gem. Every layout and stylesheet is in this repository.

## Common commands

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000/chien-lax/
bundle exec jekyll build
```

`Gemfile.lock` is not committed. The CI runner resolves the gems itself, which
is what `ruby/setup-ruby` with `bundler-cache: true` does when it finds no
lockfile. Commit one only if it was generated on Linux: a lockfile written by
the Windows Ruby lists no `x86_64-linux` variants of `ffi`,
`google-protobuf`, or `sass-embedded`, and its `CHECKSUMS` entries come out
empty, either of which fails the build under frozen mode.

## Git

When I ask you to commit and push changes to the remote, NEVER add a "Co-authored-by" line to the commit message.

## Architecture

- `_config.yml` — site settings, kramdown options, `jekyll-sitemap` and `jekyll-feed`
- `_posts/` — blog posts, `YYYY-MM-DD-title.md` with `layout`, `title`, `date`, `categories`, `tags`
- `_pages/` — static pages (`about.md`); linked from `_data/navigation.yml`
- `_layouts/` — the three layouts described below
- `assets/css/`, `assets/js/`, `assets/fonts/` — see "Styling" below
- `assets/images/` — post images. JPEG, quality 85 with no chroma subsampling, at most 1460px wide, which is 2x the 730px reading column. An image renders at the column width, never past it. Convert with `uv run --with pillow python` — the shell has no ImageMagick.

### Layouts

| File | Purpose |
|---|---|
| `default.html` | The frame: head, glass header, progress bar, contents rail, hero, `<main>`, to-top button, toast |
| `single.html` | Wraps `{{ content }}` in `<article class="doc" data-toc-root>`. Used by every post and every page. |
| `home.html` | The index post list, as `.card` links |

### Left rail

The fixed left rail carries the author card (avatar, name, bio, location,
email, GitHub — all from `_config.yml`'s `author` block) on every page, and
below it the contents list when the article has `<h2>` headings.
`default.html` decides that server-side with `show_toc`, which also controls
the header's rail button.

`ui.js` sets `display:none` on the rail inline when it finds no headings, and
an inline style outranks both the kit's 1280px rule and `.toc--drawer`. Two
`!important` rules in `site.css` put it back: one above 1280px, one for the
open drawer. The rail button renders at every width, so the author card is
reachable on a phone.

The header nav also stays in the bar at every width — the kit hides it below
1024px, which is right for a five-item section nav and wrong for one link.

### Hero front matter

`title`, `eyebrow` (falls back to the first category), `dek`, `date`, `tags`.
The date and reading-time chips render only when `date` is set. Reading time
comes from `site.words_per_minute`.

`math: true` loads KaTeX from a CDN for that one page. Without it the page
makes no third-party request at all.

## Styling

Three files, and the split matters:

| File | Rule |
|---|---|
| `assets/css/ui.css` | The `ui-design` kit, copied verbatim from `.claude/skills/ui-design/assets/style.css`. Never edit. |
| `assets/js/ui.js` | Same, from `script.js`, with one deletion: the `initHighlighter()` call in `boot()` is commented out, so selecting text raises no highlighter toolbar. The line is marked `SITE DEVIATION`. |
| `assets/css/site.css` | Every site-specific rule. Edit this one. |

Updating the kit is `cp .claude/skills/ui-design/assets/style.css assets/css/ui.css`
and the same for the script. After copying the script, re-apply the one
deviation above — a plain copy turns the highlighter back on.

`site.css` carries the self-hosted `@font-face` rules, the markdown bridge, the
post-card rules, the footer, and the page gutter. The gutter exists because the
kit gives `main` and `.hero` no horizontal padding below 1280px — it assumes
the 730px column always has slack beside it — so on a phone the only edge space
was the browser's default 8px `body` margin. The bridge exists because kramdown emits bare
`<img>`, `<table>`, and `<pre>`, and the kit styles only `.figure img`,
`.table-wrap table`, and `.code-block pre`. Without it a post image renders at
its natural width and overflows the page.

### Fonts

Inter (400/500/600/700) and Monaspace Neon (400/500) are self-hosted in
`assets/fonts/`. Inter carries the `vietnamese` subset as well as `latin` and
`latin-ext`: most posts are in Vietnamese, and the latin subset has none of the
diacritics.

## Dark and light mode

`ui.css` defines every colour as a channel triplet with a light value and two
dark blocks (`prefers-color-scheme` for an untouched browser, `[data-theme]`
for a reader who used the toggle). An inline script in `default.html` reads
`localStorage['ui-design-theme']` and stamps `data-theme` before first paint,
which is what prevents the flash. The toggle button is `[data-theme-toggle]`,
handled by `ui.js`.

To change a colour, edit the token in `ui.css` section 1 — but that file is
meant to stay verbatim, so prefer re-declaring the token in `site.css`.
