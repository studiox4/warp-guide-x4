---
name: llmstxt-update
description: "Use when dependencies change or new libraries are added. Scans package.json, discovers llms.txt endpoints, downloads to docs/llms-txt/, and updates CLAUDE.md + agent files."
disable-model-invocation: true
---

# /llmstxt-update — Refresh LLMs.txt Reference Docs

Scan project dependencies, discover llms.txt files, download them, and update all references.

## Workflow

### Step 1 — Scan Dependencies

Read the root `package.json` and extract `dependencies` and `devDependencies`.

Categorize:

| Category  | Examples                  |
| --------- | ------------------------- |
| Framework | astro                     |
| Styling   | (none — uses vanilla CSS) |
| Build     | typescript                |
| Deploy    | serve                     |

### Step 2 — Discover llms.txt Files

For each significant dependency (skip `@types/*`, tiny utils, polyfills):

1. **Check npm registry** for homepage URL:

   ```
   WebFetch https://registry.npmjs.org/{package-name} → extract homepage field
   ```

2. **Try common URL patterns** (use WebFetch to validate each):
   - `{homepage}/llms.txt`
   - `{homepage}/llms-full.txt`
   - `{homepage}/docs/llms-full.txt`
   - `{homepage}/docs/llms.txt`

3. **Cross-reference directories:**
   - `https://llmstxthub.com` — search for the library
   - `https://llmstxt.site` — search for the library

4. **Validate responses:**
   - Must return text content (not HTML, not 404 page)
   - Content should start with `#` or be plain text (not `<!DOCTYPE` or `<html`)
   - Prefer `llms-full.txt` over `llms.txt` when both exist (more complete)

5. **Check existing docs:**
   - Read `docs/llms-txt/` to see what's already downloaded
   - Compare with discovered URLs to identify new, stale, or removed docs

### Step 3 — Download to `docs/llms-txt/`

For each discovered llms.txt:

1. Create `docs/llms-txt/` directory if it doesn't exist
2. Download content via WebFetch
3. Save to `docs/llms-txt/{name}.txt` (use lowercase, hyphenated names)
4. Validate: reject if HTML, check for reasonable size (>100 bytes)

Track results:

- **New:** Files downloaded for first time
- **Updated:** Files that changed since last download
- **Unchanged:** Files that match existing content
- **Failed:** Libraries where no llms.txt could be found

### Step 4 — Update `CLAUDE.md`

Read `CLAUDE.md` and update or add a **Reference Docs** section:

1. List available docs from `docs/llms-txt/`
2. Keep the `| File | Library | Use when... |` format
3. Write a meaningful "Use when..." description for each entry

### Step 5 — Update Agent Files

Read each agent in `.claude/agents/`:

- **frontend.md** — Should reference: astro docs (if available)
- **reviewer.md** — Read-only agent, no reference docs section needed

For each agent with a "Reference Docs" section:

1. Ensure paths point to `docs/llms-txt/`
2. Add entries for newly downloaded docs relevant to that agent's domain
3. Remove entries for docs no longer available

### Step 6 — Report Summary

Print a summary:

```
llms.txt Update Complete
========================

New docs downloaded:
  + astro.txt (245 KB) — https://astro.build/llms-full.txt

Updated docs:
  (none)

Unchanged: 0 files

No llms.txt found for:
  - serve
  (these are typically too small or don't publish llms.txt)

Files updated:
  - CLAUDE.md (Reference Docs section updated)
  - .claude/agents/frontend.md (1 doc added)
```

## Important Notes

- `docs/llms-txt/` is **committed to git** so all sessions have access
- Prefer `llms-full.txt` over `llms.txt` — full versions have more detail
- Skip `@types/*` packages, build tools with no docs, and tiny utility packages
- The npm registry is the authoritative source for homepage URLs
- Rate-limit WebFetch calls — process sequentially, not in parallel
