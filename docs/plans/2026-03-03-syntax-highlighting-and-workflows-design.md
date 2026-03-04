# Design: Syntax Highlighting + TypeScript Developer Workflows

**Date:** 2026-03-03
**Status:** Approved

## Overview

Two changes to the Warp Setup Guide:

1. Add syntax highlighting to all code blocks using Astro's built-in Shiki integration
2. Add Section 08 — "TypeScript Developer Workflows" covering the full dev lifecycle with Warp-specific callouts

## Part 1: Syntax Highlighting

### Approach

Use Astro's `<Code />` component from `astro:components` inside the existing `CodeBlock.astro` wrapper. This renders highlighted HTML at build time with zero client-side JavaScript.

### Custom Shiki Theme

Create a custom theme that maps to the guide's design system:

| Token                              | Color         | Design Token                |
| ---------------------------------- | ------------- | --------------------------- |
| Keywords (`const`, `if`, `export`) | `#7c3aed`     | `--accent2` (purple)        |
| Strings                            | `#22c55e`     | `--green`                   |
| Comments                           | `#71717a`     | `--muted`                   |
| Functions/methods                  | `#00e5ff`     | `--accent` (cyan)           |
| Numbers                            | `#f59e0b`     | `--accent3` (amber)         |
| Variables/params                   | `#e4e4e7`     | `--text`                    |
| Operators                          | `#71717a`     | `--muted`                   |
| Types/classes                      | `#00e5ff`     | `--accent`                  |
| Punctuation                        | `#71717a`     | `--muted`                   |
| Background                         | `transparent` | Inherits from `.code-block` |

### Files Changed

- `src/components/CodeBlock.astro` — Import `<Code />`, pass `lang` and `theme`, adjust CSS to work with Shiki's output
- `src/themes/warp-guide.json` (new) — Custom Shiki theme definition

### Constraints

- The `<Code />` component requires the `code` prop as a string, not a slot. The CodeBlock component needs to accept a `code` prop instead of using `<slot />`
- All usages in `index.astro` need to change from `<CodeBlock lang="bash">content</CodeBlock>` to `<CodeBlock lang="bash" code="content" />`

## Part 2: Section 08 — TypeScript Developer Workflows

### Metadata

- **Number:** 08
- **Title:** TypeScript Developer Workflows
- **Badge:** `advanced`
- **ID:** `ts-workflows`

### Subsections

#### 1. Scaffold a TypeScript project

Commands for bootstrapping:

- `npm create astro@latest` / `npx create-next-app@latest --ts`
- `gh repo create` with `--public --clone`
- Create CLAUDE.md for the project
- tsconfig strict mode setup

**Warp callout:** "Use Warp's block output to copy the scaffolding summary and paste it into your project notes."

#### 2. Feature branch workflow

Full GitHub CLI flow:

- `git checkout -b feat/feature-name`
- Make changes, stage, commit
- `gh pr create --fill`
- `gh pr checks`
- `gh pr merge --squash`

**Warp callout:** "Warp blocks make each git command's output independently copyable — share a specific block with your reviewer."

#### 3. Claude Code development loop

The core workflow:

```
claude 'implement user authentication middleware'
→ review changes with git diff
claude 'write tests for the auth middleware'
→ npm test
→ iterate
claude 'fix the failing test'
```

**Warp callout:** "Collapse completed Claude Code blocks to keep your terminal clean while iterating."

#### 4. Multi-pane TypeScript workflow

Split pane setup using Warp shortcuts:

- Pane 1: `tsc --watch` (type checking)
- Pane 2: `vitest --watch` (tests)
- Pane 3: `npm run dev` (dev server)

Shortcuts: `Cmd+D` (split right), `Cmd+Shift+D` (split down)

**Warp callout:** "Pin this layout as a Warp Drive workflow to launch your full dev environment in one click."

#### 5. Debug TypeScript errors with Warp AI

- Press `Ctrl+Space` and describe the error in natural language
- Warp AI translates TypeScript error codes into explanations
- Use block sharing to send error context to teammates

**Warp callout:** "Click the error hint icon on any failed command block — Warp AI explains the error and suggests a fix."

#### 6. Ship it: PR → CI → merge

Full shipping flow:

- `gh pr create` with structured body
- `gh run watch` to monitor CI
- `gh pr merge --squash --delete-branch`
- `git pull` on main

**Warp callout:** "Use `gh run watch` in a split pane — Warp's block UI shows each CI step as it completes."

### Checklist

- [ ] Set up a TS project with `strict: true` tsconfig
- [ ] Create a feature branch and open a PR with `gh`
- [ ] Use Claude Code to implement a feature and write tests
- [ ] Run `tsc --watch` and `vitest --watch` in split panes
- [ ] Use Warp AI to decode a TypeScript error
- [ ] Ship a PR with passing CI checks

## Part 3: Structural Changes

### index.astro updates

- Add section 08 to `sections` array
- Update `sectionIds` array (add `"ts-workflows"`)
- Update `done` array size from 7 to 8
- Update progress label from "/ 7" to "/ 8"
- Add section wrapper HTML with animation delay `350ms`

### No changes needed

- `Section.astro`, `Checklist.astro`, `TipBox.astro` — reused as-is
- `global.css` — no new tokens needed
- `Base.astro` — unchanged

## Implementation Order

1. Syntax highlighting first (changes CodeBlock component + all usages)
2. Section 08 content second (adds to index.astro)
3. Update progress bar math
4. Test build, verify all highlighting renders correctly
