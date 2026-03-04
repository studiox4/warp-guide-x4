# Warp Setup Guide — Project Status

## Current Phase: DONE

| Phase | Name                                | Status     |
| ----- | ----------------------------------- | ---------- |
| 1     | Project Scaffolding & Design System | `COMPLETE` |
| 2     | Core Components                     | `COMPLETE` |
| 3     | Page Layout & Navigation            | `COMPLETE` |
| 4     | Content — Sections 01–04            | `COMPLETE` |
| 5     | Content — Sections 05–07            | `COMPLETE` |
| 6     | Interactivity & Animations          | `COMPLETE` |
| 7     | Polish, Responsive & Deploy         | `COMPLETE` |

## Acceptance Criteria Tracker

- [x] All 8 sections render with correct content and badges
- [x] Sections expand/collapse on click, chevron rotates
- [x] Checklist items toggle strikethrough on click
- [x] "Mark complete" button updates nav indicator and progress bar
- [x] Code blocks have working copy buttons
- [x] Code blocks have Shiki syntax highlighting with custom design-token theme
- [x] Tip and warning boxes render with correct colors
- [x] Keyboard shortcut table renders `<kbd>` styled keys
- [x] Nav sidebar scrolls to correct section
- [x] Progress bar fills proportionally as sections complete
- [x] Responsive: nav sidebar hidden below 700px
- [x] `npm run build` produces a clean `dist/` with no errors
- [x] Railway deploy succeeds and site is live at provided URL

## Notes

- Fully static site — no SSR, no API, no database
- Vanilla JS for interactivity (no framework)
- Fonts loaded from Google Fonts (not self-hosted)
- State is in-memory only (resets on refresh — intentional)
