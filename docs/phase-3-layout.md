# Phase 3 — Page Layout & Navigation

## Goal

Build the page-level layout: header with progress bar, two-column grid with sticky sidebar nav, and the main content area. Sections will be empty shells at this point — content comes in Phases 4–5.

## Tasks

### 3.1 Header

- Top label: `// Terminal Setup · 2026` — cyan, monospace, 11px, uppercase, letter-spacing
- H1: `Configure **Warp** Like a Pro` — Syne 800, ~64px, "Warp" in `var(--accent)`
- Subtitle: muted, 13px body text
- Progress bar below:
  - 2px track (surface2 bg)
  - Gradient fill: cyan → purple (`var(--accent)` → `var(--accent2)`)
  - Label: "X / 7 complete" — small, muted text

### 3.2 Two-Column Grid

```css
display: grid;
grid-template-columns: 200px 1fr;
gap: 48px;
```

- Left column: sidebar nav (sticky)
- Right column: main content (stacked sections)

### 3.3 Nav Sidebar

- 7 nav items, one per section
- Each item shows:
  - Small square checkbox indicator (default: border only; complete: green fill + checkmark)
  - Section name text
  - Active state: `var(--accent)` text color
- Sticky positioning (`position: sticky; top: 24px`)
- Clicking a nav item scrolls to corresponding section (JS wired in Phase 6)
- Hidden on screens < 700px

### 3.4 Stub Section Slots

- Place 7 Section component instances in the main content area
- Use correct `num`, `title`, `badge`, `id` props for each
- Leave content slots empty (filled in Phases 4–5)

**Section data:**
| # | Title | Badge | ID |
|---|-------|-------|----|
| 01 | Installation & First Launch | essential | installation |
| 02 | Appearance & Themes | power | appearance |
| 03 | Shell Configuration (Zsh + Oh My Zsh) | essential | shell |
| 04 | Core Dev Toolchain | essential | toolchain |
| 05 | Claude Code Integration | workflow | claude |
| 06 | Warp-Specific Shortcuts & Features | power | shortcuts |
| 07 | Power Workflows & Final Setup | advanced | workflows |

## Definition of Done

- [ ] Header renders with label, H1, subtitle, and progress bar
- [ ] Two-column grid layout works at desktop widths
- [ ] Nav sidebar is sticky and lists all 7 sections
- [ ] Nav hides below 700px viewport
- [ ] All 7 section shells render with correct titles and badges
- [ ] Page scrolls smoothly through section stubs
