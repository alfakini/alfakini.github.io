## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project conventions

- Use Bun and Biome. Do not add Prettier.
- Run `bun run format`, `bun run lint`, `bun run check`, and `bun run build` before finishing changes.
- Essays live in `content/essays` and use the `essays` Content Layer collection in `src/content.config.ts`.
- Use `published_at` as the frontmatter date field. The schema defaults `tags` to `[]` and `status` to `draft`.
- Portuguese is the default language. Flat files are Portuguese-only; translated variants use `post/pt.md` and `post/en.md` (or `.mdx`).
- Portuguese routes are `/essays/slug/`; English routes are `/en/essays/slug/`.
- Use the helpers in `src/lib/essays.ts` for publication filtering, paths, sorting, translations, and tags. Production drafts must never reach routes, lists, RSS, or metadata.
- Keep article typography scoped under `.prose`; listing and navigation typography must remain independent.
- Keep fonts, CSS, and scripts local. Preserve the notices in `src/assets/fonts` when changing vendored assets.
- Avoid client directives. Use local runtime JavaScript only when it is needed for front-end behavior. Footnote markup and syntax highlighting are build-time transformations.
