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

## Languages and routes

The site uses Astro's built-in i18n routing with Brazilian Portuguese (`pt-BR`) as the default language. Portuguese routes have no locale prefix; English routes use `/en`. Route slugs are shared between languages:

```text
/                         Portuguese home
/essays/my-post/          Portuguese essay
/tags/                    Portuguese tags
/projects/                Portuguese projects
/en/                      English home
/en/essays/my-post/       English essay
/en/tags/                 English tags
/en/projects/             English projects
/rss.xml                  Global feed, preferring English essays
```

The language switcher preserves the current route and nested path. Translated UI strings live in `src/i18n/translations`; the English dictionary is typed against the Portuguese source dictionary, so missing translation keys fail type checking. Use `src/i18n/routes.ts` for internal links instead of constructing locale-prefixed URLs manually.

## Create a post

Posts live under `content/essays` and are loaded through Astro's Content Layer API.

A Portuguese-only post can be a flat file. Its frontmatter must include `locale: pt-BR` and a route `slug`:

```text
content/essays/my-post.md
```

It is published at `/essays/my-post/`.

For translations, group language files under a shared directory. Use the same `slug` in both files:

```text
content/essays/my-post/pt-BR.md
content/essays/my-post/en.md
```

The Portuguese version is published at `/essays/my-post/`; English is published at `/en/essays/my-post/`. English essays must use a grouped `en.md` or `en.mdx` file. Both route trees always expose the slug: when a translation is missing, the available content is used as a fallback. The global header switch preserves the current route. Files can use either `.md` or `.mdx`.

Tags are stable, untranslated strings and therefore must use the same values in both variants. For example, use `filosofia` in both files rather than creating a translated tag slug.

Do not create both `my-post.md` and `my-post/pt-BR.md`; they resolve to the same route and the build will reject the collision. The build also rejects duplicate locale variants and mismatched translation tag sets.

## Frontmatter reference

```yaml
---
title: 'Required title'
description: 'Required summary used by lists and metadata.'
published_at: '2026-07-12'
updated_at: '2026-07-20' # optional
tags: ['Astro', 'web'] # optional, defaults to []
gallery: [] # optional, not rendered by the essay page
links: [] # optional, not rendered by the essay page
status: published # optional, defaults to draft
hero_image: './cover.png' # optional
locale: pt-BR # required: pt-BR or en
slug: my-post # required and shared by translations
---
```

Production builds exclude drafts from routes, lists, tags, RSS, sitemap data, language links, and metadata. The single global RSS feed uses English content when a published English translation exists and otherwise uses Portuguese. Development includes drafts for previewing, but drafts are never emitted to the feed.

Use `published_at` for the publication date. `status` accepts `draft` or `published`.

## Create a project

Projects live under `content/projects` and are displayed newest-first by `start_at`. The page alternates entries between the left and right sides of a central timeline on desktop and uses a single column on mobile.

A Portuguese-only project is a flat file:

```text
content/projects/my-project.md
```

Translated projects use a shared directory:

```text
content/projects/my-project/pt.md
content/projects/my-project/en.md
```

The English projects page falls back to the Portuguese variant when an English translation is unavailable. Project bodies are stored as Markdown and render on the project detail page.

Project frontmatter must include:

```yaml
---
title: 'Project title'
description: 'Short description shown in the timeline.'
tags: ['software'] # optional, defaults to []
start_at: '2025-03'
end_at: '2026-01' # use null for ongoing projects
gallery: # optional, relative to the entry
  - './lead.png'
  - './detail.png'
links:
  - label: GitHub
    href: https://github.com/example/project
---
```

The first entry in `gallery` leads the project timeline entry and is used for the social preview. The remaining entries render as thumbnails in the timeline.

Each link requires a non-empty label and an absolute `http` or `https` URL.

## Images and figures

Frontmatter image paths are relative to the content file. A grouped project therefore usually uses:

```yaml
gallery:
  - './lead.png'
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
