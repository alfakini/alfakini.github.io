# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Alan Fachini's personal website hosted on GitHub Pages at alanfachini.com. It's a static site with dual architecture: a simple homepage and a comprehensive digital business card (vCard).

## Architecture

- **Static GitHub Pages site** with custom domain (alanfachini.com)
- **Tailwind CSS v4.1.13** for styling with CLI-based build process
- **Bun** as the JavaScript runtime and package manager
- **Dual build system**:
  - Root homepage (`index.html`) - minimal welcome page
  - vCard section (`vcard/index.html`) - feature-complete digital business card with direct file download

## Development Commands

Use Bun for all package management and script execution:

```bash
# Install dependencies
bun install

# vCard development (primary active area)
bun run build:vcard     # Build vCard CSS once
bun run watch:vcard     # Watch mode for vCard development

# Main site development (currently unused)
bun run build          # Build main site CSS
bun run watch          # Watch mode for main site
```

## Tailwind CSS Setup

**Dual Build Configuration:**
- **vCard (active)**: `vcard/style/input.css` → `vcard/style/output.css`
- **Main site (unused)**: `src/input.css` → `src/output.css`
- **Version**: Tailwind CSS v4.1.13 with CLI tool (@tailwindcss/cli v4.1.13)

## Important Patterns

### vCard Implementation
The vCard (`vcard/index.html`) is a self-contained, production-ready component featuring:
- **Custom Tailwind components** defined in `@layer components` for reusable patterns
- **Progressive image loading** with CSS-generated initials fallback
- **Direct file download** via `alan-fachini.vcf` file (no JavaScript required)
- **Asset organization** in `vcard/images/` directory (SVG icons, profile photo, header background)
- **Professional contact card** with social links, multiple websites, and address information

### Directory Structure
```
vcard/
├── images/           # All visual assets (SVGs, profile photo, header background)
├── style/           # Tailwind CSS build files
│   ├── input.css    # Source with custom @layer components
│   └── output.css   # Generated CSS (712 lines)
├── index.html       # Self-contained vCard page
└── alan-fachini.vcf # Downloadable contact file
```

### GitHub Pages Configuration
- `CNAME` file contains the custom domain: `alanfachini.com`
- Repository name follows GitHub Pages convention: `alfakini.github.io`

## Runtime Preferences

This project uses **Bun** exclusively:
- Use `bun install` instead of npm/yarn/pnpm
- Use `bun run <script>` instead of npm run
- Use `bun test` for testing
- Bun automatically loads .env files