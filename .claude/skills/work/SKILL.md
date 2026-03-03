---
name: work
description: Pick up the next piece of work on the Warp Setup Guide and dispatch agents or start building
disable-model-invocation: true
---

# /work — Pick Up Work

You are a work dispatcher for the Warp Setup Guide — a static Astro site with 7 build phases. Your job is to figure out what's ready to build, present options, and either spin up agents or start building directly.

## Step 1: Read Project State

Read these files to understand current progress:

1. `docs/STATUS.md` — the master tracker. Parse the phase table and acceptance criteria.
2. Check `git status` and `git log --oneline -10` for recent work.
3. Skim the current phase doc at `docs/phase-{N}-*.md` (where N is the current phase number from STATUS.md).

## Step 2: Determine What's Available

Phases must be completed in order (1 → 2 → 3 → 4 → 5 → 6 → 7).

Check each phase's status in STATUS.md:

- `NOT STARTED` — available if all prior phases are `COMPLETE`
- `IN PROGRESS` — resume this work
- `COMPLETE` — skip, move to next

Also identify standalone tasks that can happen anytime:

- Fix bugs or issues found in completed phases
- Improve accessibility on existing components
- Optimize CSS or JS in completed work
- Add responsive improvements

## Step 3: Present the Menu

Use `AskUserQuestion` to present options. Group by category:

**NEXT PHASE** — the next phase in sequence that's ready to start
**IN PROGRESS** — resume partially completed phase work
**STANDALONE** — improvements to completed work

For each item show:

- Phase number and name
- Brief description of what gets built
- Key tasks from the phase doc

## Step 4: Dispatch Based on Selection

### For Phase Work

This is a static Astro site — most work is frontend-only. Dispatch based on complexity:

**Simple phase (scaffolding, config, content):**
Work directly — no need for agent teams. Read the phase doc, follow the tasks sequentially.

**Complex phase (multiple components, interactivity):**
Create an agent team:

```
Spawn a frontend teammate using the frontend agent — they build Astro components, CSS, and vanilla JS.
Spawn a reviewer teammate using the reviewer agent — they review work for accessibility, CSS quality, and JS correctness.
The frontend agent builds, the reviewer checks the work.
```

**Phase breakdown:**

- Phase 1 (Scaffolding) → Work directly
- Phase 2 (Components) → Agent team (frontend builds, reviewer checks)
- Phase 3 (Layout) → Work directly or agent team
- Phase 4 (Content 01-04) → Work directly (content population)
- Phase 5 (Content 05-07) → Work directly (content population)
- Phase 6 (Interactivity) → Agent team (complex JS behavior)
- Phase 7 (Polish & Deploy) → Work directly

### For Standalone Tasks

Work directly — these are typically small fixes or improvements.

## Step 5: Update STATUS.md on Completion

After phase work finishes:

1. Read `docs/STATUS.md`
2. Update the phase status: `NOT STARTED` → `IN PROGRESS` or `IN PROGRESS` → `COMPLETE`
3. Check off completed acceptance criteria items
4. Write the updated file

## Step 6: Verify Build

After any significant work, run:

```bash
npm run build
```

Ensure clean output with no errors before marking phase complete.

## Important Rules

- Phases are sequential — don't skip ahead
- This is a static site: no backend, no database, no SSR
- All JS is vanilla — never add React, Vue, or any framework
- All styling uses CSS custom properties from `global.css`
- Read the relevant phase doc before starting work — it has detailed task breakdowns
- Run `npm run build` to verify after completing a phase
