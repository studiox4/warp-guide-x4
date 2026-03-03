# Phase 7 — Polish, Responsive & Deploy

## Goal

Final pass on responsive design, visual polish, build verification, and deployment to Railway.

## Tasks

### 7.1 Responsive Design

- Below 700px: hide nav sidebar, switch to single-column layout
- Header H1: scale down font size for mobile (~36px)
- Code blocks: horizontal scroll on overflow, no wrapping
- Ensure touch targets are large enough (checklist items, buttons)
- Test at 375px (iPhone), 768px (tablet), 1200px+ (desktop)

### 7.2 Visual Polish

- Verify all CSS variable usage is consistent
- Check spacing, padding, and margins across sections
- Confirm noise overlay and ambient glow render correctly
- Verify font weights load and display properly
- Check color contrast for accessibility (text on dark backgrounds)

### 7.3 Build Verification

```bash
npm run build
```

- Verify clean build with no errors or warnings
- Check `dist/` output structure
- Test with `npm run preview` locally

### 7.4 Railway Deployment

**Prerequisites:**

```bash
npm install -g @railway/cli
railway login
```

**Add `serve` dependency:**

```bash
npm install serve
```

**Add `railway.json` to project root:**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npx serve dist",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Update `package.json` scripts:**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "start": "serve dist"
  }
}
```

**Deploy:**

```bash
railway init          # Project name: warp-setup-guide
railway variables set NODE_ENV=production
railway up
railway domain        # Get public URL
railway logs          # Verify "Serving!" output
```

### 7.5 Final Acceptance Check

Run through the full acceptance criteria checklist from STATUS.md.

## Definition of Done

- [ ] Site is fully responsive (mobile, tablet, desktop)
- [ ] `npm run build` produces clean output
- [ ] Railway deploy succeeds
- [ ] Site is live at `*.up.railway.app` URL
- [ ] All acceptance criteria from the brief pass
