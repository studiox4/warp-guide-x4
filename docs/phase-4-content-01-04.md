# Phase 4 — Content: Sections 01–04

## Goal

Populate the first four sections with all their content: intro text, code blocks, checklists, tip boxes, and subheadings. These are the "foundation" sections covering installation, appearance, shell config, and dev toolchain.

## Tasks

### 4.1 Section 01 — Installation & First Launch

**Badge:** essential

Content to add:

- Intro paragraph about getting Warp installed
- "Install via Homebrew" code block (Homebrew install + `brew install --cask warp`)
- "Or direct download" subheading with cyan tip box (warp.dev link)
- "First launch checklist" with 4 items:
  1. Sign in (GitHub auth)
  2. Grant accessibility & full disk access
  3. Set as default terminal
  4. Browse Preferences with ⌘,

### 4.2 Section 02 — Appearance & Themes

**Badge:** power

Content to add:

- Intro paragraph about GPU-accelerated rendering
- "Recommended settings" checklist (5 items: font, theme, compact mode, opacity, prompt)
- "Install a Nerd Font" code block (brew tap + install)
- Cyan tip box about warp.dev/themes gallery

### 4.3 Section 03 — Shell Configuration (Zsh + Oh My Zsh)

**Badge:** essential

Content to add:

- Intro paragraph about Zsh + Oh My Zsh
- "Install Oh My Zsh" code block
- "Essential plugins" code block (git clone + plugins line)
- "Key ~/.zshrc additions" code block (history, aliases, navigation)
- Checklist (4 items: OMZ installed, plugins active, aliases added, source reload)

### 4.4 Section 04 — Core Dev Toolchain

**Badge:** essential

Content to add:

- Intro paragraph about local dev stack
- "Install everything at once" code block (nvm, pyenv, brew CLI tools, gh auth)
- "Level up your ls and cat" code block (eza, bat, fd aliases)
- "Configure Git globally" code block (git config, SSH key)
- Checklist (5 items: Node, Python, gh, SSH key, CLI tools)

## Definition of Done

- [ ] All 4 sections have complete content matching the brief
- [ ] Code blocks render correctly with syntax context
- [ ] Checklists render with correct items
- [ ] Tip boxes display with cyan styling
- [ ] Subheadings create clear visual hierarchy within sections
- [ ] Content reads naturally and matches the brief's tone
