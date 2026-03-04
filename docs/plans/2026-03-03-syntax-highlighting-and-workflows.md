# Syntax Highlighting + TypeScript Developer Workflows — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Shiki syntax highlighting to all code blocks and add a new Section 08 covering TypeScript/GitHub/Claude Code developer workflows with Warp-specific callouts.

**Architecture:** Modify `CodeBlock.astro` to use Astro's built-in `<Code />` component with a custom Shiki theme that maps to our design tokens. Add Section 08 to `index.astro` with 6 workflow subsections. Update progress tracking from 7 to 8 sections.

**Tech Stack:** Astro 5.x, Shiki (built-in), vanilla JS, CSS custom properties

---

### Task 1: Create Custom Shiki Theme

**Files:**

- Create: `src/themes/warp-guide-theme.ts`

**Step 1: Create the theme file**

```typescript
// src/themes/warp-guide-theme.ts
export const warpGuideTheme = {
  name: "warp-guide",
  type: "dark" as const,
  fg: "#e4e4e7",
  bg: "transparent",
  settings: [
    {
      settings: {
        foreground: "#e4e4e7",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#71717a",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#7c3aed",
      },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: {
        foreground: "#22c55e",
      },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: {
        foreground: "#00e5ff",
      },
    },
    {
      scope: ["constant.numeric", "constant.language"],
      settings: {
        foreground: "#f59e0b",
      },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: {
        foreground: "#00e5ff",
      },
    },
    {
      scope: ["variable", "variable.parameter", "variable.other"],
      settings: {
        foreground: "#e4e4e7",
      },
    },
    {
      scope: [
        "keyword.operator",
        "punctuation",
        "punctuation.separator",
        "punctuation.terminator",
      ],
      settings: {
        foreground: "#71717a",
      },
    },
    {
      scope: ["constant.other.placeholder", "variable.other.enummember"],
      settings: {
        foreground: "#f59e0b",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name"],
      settings: {
        foreground: "#ef4444",
      },
    },
    {
      scope: ["variable.other.property", "meta.object-literal.key"],
      settings: {
        foreground: "#00e5ff",
      },
    },
    {
      scope: ["source.shell", "support.function.builtin"],
      settings: {
        foreground: "#00e5ff",
      },
    },
  ],
};
```

**Step 2: Verify file exists**

Run: `ls src/themes/warp-guide-theme.ts`
Expected: File listed

**Step 3: Commit**

```bash
git add src/themes/warp-guide-theme.ts
git commit -m "feat: add custom Shiki theme for code block highlighting"
```

---

### Task 2: Update CodeBlock Component for Shiki

**Files:**

- Modify: `src/components/CodeBlock.astro`

**Step 1: Rewrite CodeBlock.astro to use Astro's Code component**

The component needs to change from using a `<slot />` to accepting a `code` prop (required by Astro's `<Code />`). The copy button and wrapper stay the same.

```astro
---
import { Code } from "astro:components";
import { warpGuideTheme } from "../themes/warp-guide-theme";

interface Props {
  lang?: string;
  code: string;
}

const { lang = "plaintext", code } = Astro.props;
---

<div class="code-block">
  {lang && <span class="code-lang">{lang}</span>}
  <button class="code-copy-btn" data-copy-btn aria-label="Copy code">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" stroke-width="1.2" />
    </svg>
    <span class="copy-label">Copy</span>
  </button>
  <Code code={code} lang={lang} theme={warpGuideTheme} />
</div>
```

Keep all existing `.code-block` CSS but add overrides so Shiki's generated `<pre>` inherits our styles:

```css
/* Add to existing styles */
.code-block :global(pre) {
  margin: 0;
  padding: 32px 16px 16px;
  overflow-x: auto;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.6;
  background: transparent !important;
}

.code-block :global(code) {
  font-family: inherit;
  font-size: inherit;
}
```

Remove the old `pre` and `code` styles that are no longer scoped.

**Step 2: Verify the component file is valid**

Run: `cat src/components/CodeBlock.astro | head -5`
Expected: Shows `import { Code }` line

---

### Task 3: Update All CodeBlock Usages in index.astro

**Files:**

- Modify: `src/pages/index.astro`

**Step 1: Change all CodeBlock usages from slot-based to prop-based**

Every instance of:

```astro
<CodeBlock lang="bash">content here</CodeBlock>
```

Must become:

```astro
<CodeBlock lang="bash" code="content here" />
```

And every instance of:

```astro
<CodeBlock lang="bash">{`multi
line
content`}</CodeBlock>
```

Must become:

```astro
<CodeBlock lang="bash" code={`multi
line
content`} />
```

There are approximately 15 CodeBlock usages across all 7 sections. Update every single one.

**Key language mappings:**

- Shell commands → `lang="bash"`
- CLAUDE.md example → `lang="markdown"`
- Zsh config → `lang="bash"`

**Step 2: Build to verify**

Run: `npm run build`
Expected: Clean build with no errors

**Step 3: Commit**

```bash
git add src/components/CodeBlock.astro src/pages/index.astro
git commit -m "feat: add Shiki syntax highlighting to all code blocks"
```

---

### Task 4: Add Section 08 — TypeScript Developer Workflows

**Files:**

- Modify: `src/pages/index.astro`

**Step 1: Add section 08 to the sections array (line ~16)**

```typescript
{ num: "08", title: "TypeScript Developer Workflows", badge: "advanced" as const, id: "ts-workflows" },
```

**Step 2: Add the section HTML after the Section 07 closing `</div>` (before `</main>`)**

```astro
<!-- ═══════════════════════════════════════════ -->
<!-- Section 08 — TypeScript Developer Workflows -->
<!-- ═══════════════════════════════════════════ -->
<div class="section-wrapper" style="animation-delay: 350ms">
  <Section num="08" title="TypeScript Developer Workflows" badge="advanced" id="ts-workflows">
    <p>
      Combine Warp's unique features with TypeScript, GitHub CLI, and Claude Code
      to build a developer workflow that's faster than anything you've used before.
    </p>

    <h3>Scaffold a TypeScript project</h3>
    <p>Bootstrap a new project and push it to GitHub in under a minute:</p>
    <CodeBlock lang="bash" code={`# Create a new project (pick your framework)
npm create astro@latest my-app -- --template minimal --typescript strict
cd my-app

# Initialize Git and push to GitHub
git init && git add -A && git commit -m "init: scaffold project"
gh repo create my-app --public --source=. --push`} />

    <p>Set up strict TypeScript from the start:</p>
    <CodeBlock lang="json" code={`{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}`} />

    <TipBox>
      <p>
        <strong>Warp Blocks:</strong> Each command's output is a separate block — copy the
        scaffolding summary directly from the block without selecting text.
      </p>
    </TipBox>

    <h3>Feature branch workflow</h3>
    <p>A clean branch workflow using GitHub CLI — never leave the terminal:</p>
    <CodeBlock lang="bash" code={`# Create and switch to a feature branch
git checkout -b feat/add-auth-middleware

# ... make your changes ...

# Stage, commit, and open a PR in one flow
git add -A
git commit -m "feat: add JWT auth middleware"
gh pr create --fill

# Check CI status
gh pr checks

# Once CI passes, merge
gh pr merge --squash --delete-branch`} />

    <TipBox>
      <p>
        <strong>Warp Blocks:</strong> Each git command's output is independently
        copyable and shareable — send a specific block to your reviewer instead of a screenshot.
      </p>
    </TipBox>

    <h3>Claude Code development loop</h3>
    <p>
      The real power: use Claude Code as a pair programmer inside Warp. This is the
      workflow loop that replaces context-switching to a browser-based AI:
    </p>
    <CodeBlock lang="bash" code={`# Step 1 — Ask Claude to implement a feature
claude 'add rate limiting middleware to the Express API routes'

# Step 2 — Review what Claude changed
git diff

# Step 3 — Ask Claude to write tests
claude 'write tests for the rate limiting middleware using vitest'

# Step 4 — Run the tests
npm test

# Step 5 — If tests fail, let Claude fix them
claude 'fix the failing tests'

# Step 6 — Commit when green
git add -A && git commit -m "feat: add rate limiting with tests"`} />

    <TipBox>
      <p>
        <strong>Collapse blocks:</strong> Click any completed Claude Code block header to
        collapse it. This keeps your terminal clean while you iterate through the loop.
      </p>
    </TipBox>

    <h3>Multi-pane TypeScript workflow</h3>
    <p>
      Use Warp's split panes to run your full development environment simultaneously.
      This is where Warp's GPU-accelerated rendering really shines — no lag across panes.
    </p>
    <CodeBlock lang="bash" code={`# Pane 1 (main) — your working terminal
# Already open

# Pane 2 — split right for TypeScript watch mode
# Press Cmd+D, then run:
npx tsc --watch --noEmit

# Pane 3 — split down from Pane 2 for test watch
# Press Cmd+Shift+D, then run:
npx vitest --watch

# Pane 4 — split down from Pane 1 for dev server
# Press Cmd+Shift+D, then run:
npm run dev`} />

    <TipBox>
      <p>
        <strong>Warp Drive:</strong> Save this pane layout as a Warp Drive workflow
        (<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>W</kbd>) to launch your entire dev
        environment in one click.
      </p>
    </TipBox>

    <h3>Debug TypeScript errors with Warp AI</h3>
    <p>
      When TypeScript throws a cryptic error, use Warp AI to decode it instantly.
      No more copy-pasting errors into a search engine.
    </p>
    <CodeBlock lang="bash" code={`# Hit Ctrl+Space and type naturally:
# "what does TS2345 mean and how do I fix it"

# Or ask Claude Code for a deeper fix:
claude 'the TypeScript compiler is throwing TS2345 on src/middleware.ts:42 — fix it'

# Share the error block with your team:
# Click the block → Cmd+Shift+S → share link generated`} />

    <TipBox>
      <p>
        <strong>Error hints:</strong> Click the lightbulb icon on any failed command
        block — Warp AI explains the error and suggests a fix in-line.
      </p>
    </TipBox>

    <h3>Ship it: PR → CI → merge</h3>
    <p>The full shipping flow from feature branch to merged PR:</p>
    <CodeBlock lang="bash" code={`# Create PR with a structured description
gh pr create --title "feat: add rate limiting" --body "## Changes
- Added rate limiting middleware (100 req/min per IP)
- Added Redis-backed token bucket
- Added tests for rate limit scenarios

## Testing
- \`npm test\` — all passing
- Manual test: \`curl -v localhost:3000/api/health\`"

# Watch CI in a split pane (Cmd+D)
gh run watch

# Once CI is green, merge and clean up
gh pr merge --squash --delete-branch
git checkout main && git pull`} />

    <h3>Workflows checklist</h3>
    <Checklist items={[
      "Scaffold a TS project with strict: true and push to GitHub",
      "Create a feature branch and open a PR with gh pr create",
      "Use Claude Code to implement a feature and write tests",
      "Run tsc --watch and vitest --watch in split panes (Cmd+D)",
      "Use Warp AI (Ctrl+Space) to decode a TypeScript error",
      "Ship a PR: gh pr create → gh run watch → gh pr merge"
    ]} />
  </Section>
</div>
```

**Step 3: Build to verify**

Run: `npm run build`
Expected: Clean build

---

### Task 5: Update Progress Tracking for 8 Sections

**Files:**

- Modify: `src/pages/index.astro` (script section at bottom)

**Step 1: Update the sectionIds array**

Change:

```typescript
const sectionIds = [
  "installation",
  "appearance",
  "shell",
  "toolchain",
  "claude",
  "shortcuts",
  "workflows",
];
```

To:

```typescript
const sectionIds = [
  "installation",
  "appearance",
  "shell",
  "toolchain",
  "claude",
  "shortcuts",
  "workflows",
  "ts-workflows",
];
```

**Step 2: Update the done array size**

Change:

```typescript
const done = new Array(7).fill(false);
```

To:

```typescript
const done = new Array(8).fill(false);
```

**Step 3: Update the progress label denominator**

Change (in `updateProgress` function):

```typescript
const pct = Math.round((count / 7) * 100);
if (progressFill) progressFill.style.width = `${pct}%`;
if (progressLabel) progressLabel.textContent = `${count} / 7 complete`;
```

To:

```typescript
const pct = Math.round((count / 8) * 100);
if (progressFill) progressFill.style.width = `${pct}%`;
if (progressLabel) progressLabel.textContent = `${count} / 8 complete`;
```

Also update the initial label in the HTML:

```html
<span class="progress-label" id="progress-label">0 / 8 complete</span>
```

**Step 4: Build and verify**

Run: `npm run build`
Expected: Clean build, progress bar shows "0 / 8 complete"

**Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Section 08 TypeScript Developer Workflows + update progress to 8 sections"
```

---

### Task 6: Visual QA and Final Build

**Step 1: Run dev server**

Run: `npm run dev`
Expected: Dev server starts on localhost:4321

**Step 2: Verify in browser**

Check:

- [ ] All 7 existing code blocks have syntax highlighting (colors visible)
- [ ] Bash code shows purple keywords, green strings, cyan functions
- [ ] Markdown code block in Section 05 is highlighted
- [ ] JSON tsconfig block in Section 08 is highlighted
- [ ] Copy buttons still work on all code blocks
- [ ] Section 08 appears in nav sidebar
- [ ] Section 08 expands/collapses correctly
- [ ] Section 08 "Mark complete" updates progress bar to show "/ 8"
- [ ] Split pane shortcuts render with `<kbd>` styling
- [ ] All TipBoxes in Section 08 render correctly

**Step 3: Production build**

Run: `npm run build && npm run preview`
Expected: Clean build, preview works at localhost:4321

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete syntax highlighting and Section 08 workflows"
```
