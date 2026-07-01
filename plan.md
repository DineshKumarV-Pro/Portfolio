## Phase 2 — Design System 2.0

Architecture, routes, sitemap, SEO, and component APIs stay **exactly** as built in Phase 1. This phase rebuilds only the visual layer and interaction polish across the existing surfaces.

### Direction (locked from your answers)

- **Palette:** Warm off-white light mode, charcoal/near-black dark mode, slate borders, single restrained electric blue accent (`#3B82F6` light / `#4F46E5` dark) reserved for links, focus, and interactive states.
- **Type:** Manrope Variable (display 700/800) · Inter Variable (body 400/500) · JetBrains Mono (technical/metadata only).
- **Density:** Adaptive — editorial spacing on narrative pages (Home hero, About, ALPHA CodeX, Vision, Contact), structured/dense grids on scan-heavy pages (Projects, Skills, Experience, Certifications, Achievements, Resume, Timeline, Blog).
- **Motion:** Subtle & refined (Apple/Stripe register). Honor `prefers-reduced-motion`.

### Workstream

**1. Foundation — `src/styles.css`**

- Replace existing OKLCH brand/purple tokens with the neutral-mono + electric-blue system. New tokens: `--accent-blue`, `--accent-blue-hover`, `--accent-blue-ring`, refined `--surface` / `--elevated` / `--border-subtle` / `--border-strong`.
- Remove `--gradient-aurora` usage from hero/cards (kept only as an optional faint backdrop on Home hero, much subtler).
- Swap font stack: install `@fontsource-variable/manrope`, `@fontsource-variable/inter`, keep `@fontsource-variable/jetbrains-mono`. Retire Instrument Serif + Geist. Update `--font-display`, `--font-sans`, `--font-mono`.
- New responsive type scale (clamp-based): `display-2xl/xl/lg`, `h1–h4`, `body-lg/base/sm`, `mono-sm/xs`. Tighter tracking on display, optical sizing on body.
- New spacing rhythm utilities: `section-tight` / `section` / `section-loose` so adaptive density is one class swap per page.
- Refine `container-page` widths: add `container-prose` (680px) for editorial pages and `container-wide` (1280px) for dense grids; keep existing `container-page` (1200px) as default.

**2. Components — shadcn + custom**

- **Button:** new variants (`primary` solid accent, `secondary` outline, `ghost`, `link`). Refined sizes, focus rings using `--accent-blue-ring`, subtle hover lift only on primary CTAs.
- **Card / surface-card:** flatter, hairline border, hover = border darken + 1px translate (no aurora glow). Separate `card-interactive` variant for clickable cards.
- **Badge / Tag / Skill chip:** mono-typeset, smaller, uppercase tracking, neutral by default with accent variant.
- **Input / Textarea / Select:** consistent 40px height, hairline border, accent focus ring.
- **Navigation (Header):** thinner sticky bar, sharper active indicator, refined mobile sheet typography, command-palette trigger restyled as `⌘K` pill.
- **Footer:** tighter grid, mono labels, refined newsletter input/button pairing.
- **Tabs, Accordion, Dialog, Tooltip, Dropdown, Breadcrumbs, Pagination, Table:** restyle via shadcn variants to match new tokens; no API changes.
- **Empty / loading / skeleton / 404:** unified treatment with mono labels and accent hairlines.

**3. Home page sections (order preserved)**
Re-skin only — no section added or removed. Per-section refinements:

- **Hero:** Manrope display, restrained accent only on availability dot + primary CTA, remove heavy gradient, add subtle grid/noise backdrop.
- **TrustStrip:** thinner marquee, mono labels, fade-edge mask.
- **SelectedWork:** flatter cards, stronger metadata row (year · status · stack in mono), accent arrow on hover only.
- **Capabilities / SkillsGrid:** denser grid, chips redesigned.
- **ExperienceSnapshot:** timeline rail with accent node markers.
- **AlphaCodexBand:** editorial split layout, larger display type, single accent rule.
- **WritingPreview / CredentialsPreview / Testimonials / NowBlock / ContactCTA:** consistent section header pattern (eyebrow mono + display heading + lede), tighter cards, unified CTA.

**4. Scaffolded pages**

- Update `PagePlaceholder`, `SectionHeading`, `Breadcrumbs`, `ContentChecklist`, `Reveal` to the new tokens so all 47 routes inherit the refresh automatically.

**5. Motion**

- Standardize on Framer Motion presets: `fadeUp` (16px, 400ms, easeOut), `fadeIn` (300ms), card hover (1px lift, 200ms). Stagger reveals at 60ms. Wrap in `useReducedMotion` guard.
- Remove any decorative animations that don't carry meaning.

**6. Accessibility & responsive QA pass**

- Verify AA contrast on both themes for text, borders, focus rings.
- Confirm 44px tap targets on mobile, visible focus rings everywhere, single `<main>`, semantic headings unchanged.
- Sweep breakpoints 360 / 768 / 1024 / 1440 / 1920.

### Out of scope (will not change)

- Route files, route paths, route metadata/head(), sitemap, robots, RSS.
- `src/content/*` data shapes.
- Component file paths and exported APIs.
- Backend/build config.

### Deliverable

A single design-system PR-equivalent: updated `src/styles.css`, new font packages, restyled shadcn primitives, restyled home section components, restyled common components. No route changes. Production build verified.

### Validation

- `bun run build` clean.
- Spot-check Home, About, Projects index, a scaffolded page, 404, and Footer across light/dark + mobile/desktop via Playwright screenshots.
- Lighthouse pass (no perf regression vs Phase 1).
