# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static Astro site — a single-page interactive guide for setting up the Warp terminal on macOS. 7 collapsible sections with progress tracking, copy-able code blocks, and checklists. No backend, no SSR, no database. Deploys to Railway as a static site served via `serve`.

## Commands

```bash
npm run dev       # Start Astro dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm start         # Serve dist/ (used by Railway)
```

## Architecture

- **Framework:** Astro with `output: 'static'`
- **Interactivity:** Vanilla JS only — no React/Vue/etc. All state is in-memory (intentionally resets on refresh)
- **Styling:** CSS custom properties defined in `src/styles/global.css`, no CSS framework
- **Fonts:** Google Fonts loaded via `<link>` — Syne (headings) and JetBrains Mono (body/code). Not self-hosted.

### Key files

- `src/layouts/Base.astro` — HTML shell with fonts, global CSS, noise overlay (`body::before` with inline SVG feTurbulence), and cyan ambient glow (`body::after`)
- `src/pages/index.astro` — Single page: header with progress bar, two-column grid (sticky nav sidebar + stacked sections)
- `src/components/Section.astro` — Collapsible card. Props: `num`, `title`, `badge` (essential|power|workflow|advanced), `id`
- `src/components/CodeBlock.astro` — `<pre><code>` with 2px cyan left border and copy button
- `src/components/Checklist.astro` — Interactive checklist with custom checkboxes

### Design system

CSS variables in `global.css`: `--bg: #0a0b0e`, `--surface`, `--surface2`, `--border`, `--accent` (cyan #00e5ff), `--accent2` (purple), `--accent3` (amber), `--text`, `--muted`, `--green`, `--red`.

Badge color mapping: `essential` → red, `power` → purple, `workflow` → cyan, `advanced` → amber.

### Layout

Two-column grid: `200px 1fr` with 48px gap. Nav sidebar is sticky, hidden below 700px. Sections use staggered fadeIn animation (50ms delay increments).

## Build & Deploy

Railway deployment uses Nixpacks. Config in `railway.json`. Static files served via `npx serve dist`.

## Claude Code Setup

### Agents (`.claude/agents/`)

- **frontend.md** — Astro/CSS/vanilla JS developer. Builds components, pages, styles, and interactivity.
- **reviewer.md** — Read-only code reviewer. Checks accessibility, CSS quality, JS correctness, and Astro best practices.

### Skills (`.claude/skills/`)

- `/work` — Work dispatcher. Reads `docs/STATUS.md`, presents available phases and tasks, dispatches agent teams or works directly based on complexity.
- `/llmstxt-update` — Scans `package.json` dependencies, discovers and downloads llms.txt reference docs to `docs/llms-txt/`, updates CLAUDE.md and agent files.

### Hooks (`.claude/settings.json`)

- **PreToolUse (Edit|Write)** — Blocks editing `.env` files and `package-lock.json`
- **PostToolUse (Edit|Write)** — Auto-formats changed files with Prettier

### Plugins

Enabled plugins: superpowers, frontend-design, feature-dev, code-review, code-simplifier, commit-commands, ralph-loop, playwright, typescript-lsp, claude-code-setup, plugin-dev, github.

## Project Phases

See `docs/STATUS.md` for current progress and `docs/phase-{1-7}-*.md` for detailed phase plans.
