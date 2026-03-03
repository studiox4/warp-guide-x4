# Phase 2 — Core Components

## Goal

Build the reusable Astro components that all 7 sections will use. No content yet — just the building blocks, styled and ready.

## Tasks

### 2.1 `Section.astro` — Collapsible Card

**Props:** `num: string`, `title: string`, `badge: string`, `id: string`

- Collapsible card with header and body
- Header shows: number + title + badge pill + chevron icon
- Badge types with specific colors:
  - `essential` → red tint bg, red text
  - `power` → purple tint bg, purple text
  - `workflow` → cyan tint bg, cyan text
  - `advanced` → amber tint bg, amber text
- Chevron rotates 90° when section is open
- Body hidden by default, content via `<slot />`
- "Mark complete" ghost button at bottom of each section body
- Surface background (`--surface`), border (`--border`), rounded corners

### 2.2 `CodeBlock.astro` — Code with Copy Button

**Props:** `lang: string` (optional, for display label)

- `<pre><code>` block with slot for content
- 2px cyan left-border accent
- Copy button (top-right corner)
- Shows "Copied!" feedback for 1.5s after click
- Monospace font (JetBrains Mono), dark surface2 background

### 2.3 `Checklist.astro` — Interactive Checklist

- Renders a list of items passed via slot or prop
- Each item has a checkbox indicator
- Click toggles `.checked` class → strikethrough + muted text
- Checkbox uses custom styling (not native browser checkbox)

### 2.4 Tip & Warning Boxes

These can be part of the Section content or standalone styled elements:

- **Tip box** (cyan accent): left border cyan, subtle cyan bg tint, info icon
- **Warning box** (amber accent): left border amber, subtle amber bg tint, warning icon

### 2.5 Keyboard Shortcut Table

- Table rows with description + `<kbd>` key elements
- `<kbd>` styled: surface2 bg, border, rounded, monospace 11px
- Clean table layout, no heavy borders

## Definition of Done

- [ ] Section component expands/collapses (JS wired in Phase 6, but structure ready)
- [ ] CodeBlock renders with cyan left border and copy button placeholder
- [ ] Checklist items render with custom checkboxes
- [ ] Tip and warning boxes display with correct colors
- [ ] `<kbd>` elements styled correctly in shortcut tables
- [ ] All components use design system CSS variables
