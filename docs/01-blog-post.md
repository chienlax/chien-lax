# Guide: Creating and Publishing a New Blog Post

This guide explains how to create, write, and link new blog posts on your website.

---

## 1. How to Create a New Post File

All blog posts are stored in the `_posts/` directory.

### Step 1: File Naming Rule
Jekyll requires a strict naming convention for posts. The file name must follow this format:
```
_posts/YYYY-MM-DD-title-of-your-post.md
```
* **`YYYY`**: 4-digit year (e.g., `2026`)
* **`MM`**: 2-digit month (e.g., `06`)
* **`DD`**: 2-digit day (e.g., `03`)
* **`title-of-your-post`**: A hyphen-separated title. Keep it lowercase and avoid special characters.

*Example:* `_posts/2026-06-03-my-first-post.md`

---

## 2. YAML Front Matter (The Post Header)

Every post must start with YAML front matter enclosed by triple dashes (`---`). This metadata tells Jekyll how to render the post.

Here is a standard template:
```yaml
---
layout: single
title:  "My Awesome New Blog Post"
date:   2026-06-03 +0700
categories: [blog]
tags: [update, personal]
---
```

### Front Matter Fields Explained:
* **`layout: single`**: Specifies the standard single-column post layout.
* **`title`**: The title displayed at the top of your post. Keep it in quotes.
* **`date`**: Post timestamp. Specifying the timezone offset (e.g. `+0700` for Indochina Time) ensures the publication date aligns correctly.
* **`categories`**: Used to group posts. Commonly set to `[blog]`.
* **`tags`**: List of keywords (e.g., `[update, personal]`). These will display at the bottom of the page.

---

## 3. How Posts Link to the Main Site

### A. Automatic Home Page Listing (Default)
Because your main home page ([index.html](../index.html)) uses the `home` layout, Jekyll **automatically** scans the `_posts/` folder and displays your new post at the top of the home page list as soon as the site builds. You do not need to link it manually there!

### B. Manually Linking in Navigation Bar (Optional)
If you want to add a permanent link to your blog, a page, or an archive on the header menu, you can edit the navigation file:
1. Open [_data/navigation.yml](../_data/navigation.yml)
2. Add a new menu item under `main`:
   ```yaml
   main:
     - title: "About"
       url: /about/
     - title: "Blog"
       url: /
   ```

### C. Linking Between Pages (Cross-Linking)
If you want to link to a post from another markdown page (like `about.md` or a new page), use standard Markdown syntax combined with the Jekyll post url helper:
```markdown
Check out my latest [welcome post]({% post_url 2026-04-15-welcome-to-my-site %})!
```
*Note: Do not include the `.md` extension or the `_posts/` path inside the `post_url` helper.*

---

## 4. Writing Content
Below the front matter, write your post using standard Markdown:

```markdown
Here is the main paragraph of your blog post. You can use standard formatting:

* **Bold text**
* *Italic text*
* `Inline code blocks`

### Subheadings
Use hash symbols for subheadings.

> This is a quote block.
```
