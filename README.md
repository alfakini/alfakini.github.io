# alanfachini.com

Personal essays built with Astro, Bun, Markdown, and MDX. The site is statically generated, with local client-side scripts only where needed for front-end behavior, and ships without a site-wide stylesheet or bundled fonts.

## Installation

Install [Bun](https://bun.sh/) and then install dependencies:

```sh
bun install
```

The project uses Astro's strict TypeScript configuration for site code. Posts remain ordinary Markdown or MDX.

## Local development

Start Astro in background mode:

```sh
bunx astro dev --background
```

Manage the server with:

```sh
bunx astro dev status
bunx astro dev logs
bunx astro dev stop
```

Quality commands:

```sh
bun run format
bun run format:check
bun run lint
bun run check
bun run build
```

Biome formats and checks the project files. `astro check` validates Astro and content code.

## Create a post

Posts live under `content/essays` and are loaded through Astro's Content Layer API.

A Portuguese-only post can be a flat file:

```text
content/essays/my-post.md
```

It is published at `/essays/my-post/`.

For translations, group language files under a shared directory:

```text
content/essays/my-post/pt.md
content/essays/my-post/en.md
```

The Portuguese version is published at `/essays/my-post/`; English is published at `/en/essays/my-post/`. Available translations automatically appear in the post language switcher and metadata. Files can use either `.md` or `.mdx`.

Do not create both `my-post.md` and `my-post/pt.md`; they resolve to the same route and the build will reject the collision.

## Frontmatter reference

```yaml
---
title: 'Required title'
description: 'Required summary used by lists and metadata.'
published_at: '2026-07-12'
updatedDate: '2026-07-20' # optional
tags: ['Astro', 'web'] # optional, defaults to []
status: published # optional, defaults to draft
heroImage: '../../../src/assets/example.jpg' # optional
lang: pt # optional for flat files; grouped filenames determine language
---
```

Production builds exclude drafts from routes, lists, tags, RSS, sitemap data, language links, and metadata. Development includes drafts for previewing.

Use `published_at` for the publication date. `status` accepts `draft` or `published`.

## Images and figures

Images processed by Astro should live under `src/assets`. Frontmatter paths are relative to the post file. A grouped post therefore usually uses:

```yaml
heroImage: '../../../src/assets/example.jpg'
```

Plain Markdown supports images normally. Use semantic HTML for a caption:

```html
<figure>
  <img src="/images/example.jpg" alt="A useful description" />
  <figcaption>The image caption.</figcaption>
</figure>
```

For optimized imported images, use MDX and import the asset as shown in `content/essays/tipografia-proporcional/pt.mdx`.

## Footnotes and asides

Write standard Markdown footnotes:

```md
Text with a note.[^note]

[^note]: The note content.
```

At build time, footnote definitions become semantic `<aside>` elements in normal document flow.

An explicit editorial aside can use raw semantic HTML:

```html
<aside>A related observation.</aside>
```

In MDX, import the static component:

```mdx
import SideNote from '../../../src/components/SideNote.astro';

<SideNote>A related observation.</SideNote>
```

## MDX

Use `.mdx` when a post needs imported assets, expressions, or Astro components. Components render to static HTML unless a client directive is explicitly added. The site avoids client directives; a small layout script moves footnotes below narrow articles.

Raw semantic HTML, tables, blockquotes, fenced code, inline code, figures, and footnotes are supported. Fenced code is emitted without syntax-highlighting styles.

## Deployment

The production deployment target is GitHub Pages with the custom domain `alanfachini.com`.

```text
Build command: bun run build
Output directory: dist
```

`astro.config.mjs` defines the canonical site URL, and `public/CNAME` is copied to the build output. The GitHub Actions workflow at `.github/workflows/deploy.yml` builds and deploys each push to `main`.

In the repository, go to **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**. After the first workflow succeeds, set `alanfachini.com` as the custom domain and enable **Enforce HTTPS** once GitHub confirms the DNS configuration.
