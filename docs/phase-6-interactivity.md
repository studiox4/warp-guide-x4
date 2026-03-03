# Phase 6 — Interactivity & Animations

## Goal

Wire up all interactive behavior with vanilla JavaScript. The site should feel responsive and polished — sections collapse/expand, checklists toggle, progress tracks, code copies, and the nav stays in sync.

## Tasks

### 6.1 Section Toggle (Expand/Collapse)

- Clicking a section header toggles its body visibility
- Chevron rotates 90° when open (CSS transition)
- Only the clicked section opens (accordion behavior optional — brief doesn't mandate it)

### 6.2 Checklist Item Toggle

- Clicking a checklist item toggles `.checked` class
- Checked state: strikethrough text + muted color
- Custom checkbox indicator updates visually

### 6.3 Mark Complete Button

- Each section has a "Mark complete" button at the bottom
- Click toggles the section's done state
- Default state: ghost button, muted text
- Done state: green border, green bg tint, "✓ Completed" text
- Updates the nav sidebar indicator for that section
- Triggers progress bar recalculation

### 6.4 Progress Bar

- `updateProgress()` counts how many sections are marked done
- Fills the gradient bar proportionally (0% to 100%)
- Updates label text: "X / 7 complete"

### 6.5 Nav Sidebar Interaction

- Clicking a nav item:
  - Smooth scrolls to the corresponding section
  - Opens that section (if closed)
  - Updates the active nav item highlight
- Nav checkbox indicators turn green when section is marked complete

### 6.6 Copy Code Button

- Each code block's copy button copies the `<pre>` text to clipboard
- Uses `navigator.clipboard.writeText()`
- Button text changes to "Copied!" for 1.5 seconds, then reverts

### 6.7 IntersectionObserver for Active Nav

- Observe all section elements
- As user scrolls, update the active nav item to reflect which section is in view
- Threshold: pick something reasonable (e.g., 0.3)

### 6.8 FadeIn Stagger Animation

- Each section has a staggered entrance animation on page load
- `translateY(8px) → 0`, `opacity: 0 → 1`
- 50ms delay increment per section (section 1 = 0ms, section 2 = 50ms, etc.)
- Use CSS `@keyframes` + `animation-delay` applied via inline style or data attribute

## State Management

```js
const state = { done: new Array(7).fill(false) };
```

- All state is in-memory (no localStorage)
- Progress resets on page refresh — intentional per brief

## Definition of Done

- [ ] Sections expand/collapse with chevron rotation
- [ ] Checklist items toggle strikethrough on click
- [ ] Mark complete updates button, nav indicator, and progress bar
- [ ] Progress bar fills correctly from 0/7 to 7/7
- [ ] Nav items scroll to correct section and update active state
- [ ] Code copy button works and shows "Copied!" feedback
- [ ] IntersectionObserver keeps nav in sync during scroll
- [ ] FadeIn animations stagger correctly on load
