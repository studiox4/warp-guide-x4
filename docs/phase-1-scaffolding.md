# Phase 1 — Project Scaffolding & Design System

## Goal

Set up the Astro project, file structure, global styles, fonts, and the Base layout. At the end of this phase we should have a running `npm run dev` with an empty page that has the correct dark theme, fonts, noise overlay, and ambient glow.

## Tasks

### 1.1 Create Astro Project

```bash
npm create astro@latest warp-setup-guide -- --template minimal --install --no-git
```

Then move contents into this repo root (since we already have a git repo).

### 1.2 Configure `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
export default defineConfig({
  output: "static",
  build: { assets: "_assets" },
});
```

### 1.3 Create Directory Structure

```
src/
├── pages/index.astro
├── components/   (empty, populated in Phase 2)
├── layouts/Base.astro
└── styles/global.css
public/
└── favicon.svg
```

### 1.4 Implement `global.css`

All CSS custom properties (design tokens):

- `--bg`, `--surface`, `--surface2`, `--border`
- `--accent` (cyan), `--accent2` (purple), `--accent3` (amber)
- `--text`, `--muted`, `--green`, `--red`

Reset styles, box-sizing, smooth scroll behavior.

### 1.5 Implement `Base.astro` Layout

- Google Fonts `<link>` for **Syne** (400/600/800) and **JetBrains Mono** (300/400/500/700)
- Import `global.css`
- `<slot />` for page content
- `body::before` — noise texture overlay (inline SVG feTurbulence, 4% opacity)
- `body::after` — cyan radial gradient ambient glow at top

### 1.6 Stub `index.astro`

Minimal page using `Base.astro` layout with a placeholder heading to verify everything renders.

## Definition of Done

- [ ] `npm run dev` starts without errors
- [ ] Page loads with dark `#0a0b0e` background
- [ ] Syne and JetBrains Mono fonts load correctly
- [ ] Noise overlay visible at 4% opacity
- [ ] Cyan ambient glow visible at top of page
- [ ] `npm run build` succeeds with clean output
