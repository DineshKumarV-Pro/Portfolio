# Dinesh Kumar V — Portfolio

Production-grade personal portfolio built with TanStack Start, React 19, TypeScript, and Tailwind CSS 4.

## Stack

| Layer      | Technology                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------- |
| Framework  | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) |
| UI         | React 19, shadcn/ui, Radix UI, Motion                                                         |
| Styling    | Tailwind CSS 4, design tokens in `src/styles.css`                                             |
| Validation | Zod                                                                                           |
| Deploy     | Nitro (Cloudflare default via Lovable config)                                                 |

## Quick start

```bash
npm install
cp .env.example .env.local   # set VITE_SITE_URL before production deploy
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command             | Purpose                       |
| ------------------- | ----------------------------- |
| `npm run dev`       | Development server            |
| `npm run build`     | Production build → `.output/` |
| `npm run preview`   | Preview production build      |
| `npm run typecheck` | TypeScript strict check       |
| `npm run lint`      | ESLint                        |
| `npm run format`    | Prettier                      |

## Project structure

```
src/
├── content/          # Static data (site, nav, projects, posts)
├── components/
│   ├── common/       # Breadcrumbs, Reveal, ErrorState
│   ├── forms/        # NewsletterForm
│   ├── home/         # Homepage sections
│   ├── layout/       # Header, Footer, ScrollProgress
│   ├── motion/       # Page transitions, cursor, cards
│   ├── search/       # Command palette
│   ├── ui/           # shadcn primitives
│   └── work/         # Project cards, case study body
├── hooks/            # Touch, scroll, magnetic, pointer
├── lib/
│   ├── config.ts     # Env + absoluteUrl
│   ├── seo.ts        # Meta tags, JSON-LD builders
│   ├── analytics.ts  # Analytics architecture (disabled by default)
│   ├── security.ts   # CSP/header reference, input sanitization
│   ├── forms/        # Zod schemas + submitters
│   └── scaffold.tsx  # Placeholder page template
└── routes/           # File-based routes (TanStack Router)
```

## Content system

- **Site identity:** `src/content/site.ts`
- **Navigation / sitemap:** `src/content/nav.ts` → `indexableRoutes`
- **Projects:** `src/content/projects.ts`
- **Posts:** `src/content/posts.ts` (populate for blog RSS items)

Scaffold pages use `ScaffoldPage` + `buildScaffoldHead()` from `src/lib/scaffold.tsx`.

## SEO

- Per-page meta via `buildPageHead()` in `src/lib/seo.ts`
- JSON-LD: Person, WebSite, Breadcrumb, Project, Article, FAQ
- `/sitemap.xml` — static + dynamic project/case-study/blog URLs
- `/rss.xml` — blog posts + featured projects
- Set **`VITE_SITE_URL`** for absolute canonical, OG, and sitemap URLs

## Forms

| Form       | Behavior                                     |
| ---------- | -------------------------------------------- |
| Contact    | Zod validation → `mailto:` (no backend yet)  |
| Newsletter | Stub until `VITE_NEWSLETTER_PROVIDER` is set |

Honeypot fields protect against basic bot spam. Wire API routes in `src/lib/forms/newsletter.ts` when ready.

## Analytics

Disabled by default. Architecture in `src/lib/analytics.ts`:

1. Set `VITE_ANALYTICS_ENABLED=true`
2. Register a provider in root bootstrap (GA4, Plausible, PostHog, etc.)

Events: page views, contact submit, newsletter, resume download, project clicks.

## Security

Reference headers in `public/_headers` and `src/lib/security.ts`. Apply CSP at the CDN/reverse-proxy layer before enabling strict policies.

## Motion

Shared tokens in `src/lib/motion.ts`. All animations respect `prefers-reduced-motion`. Custom cursor is desktop-only.

## Deployment

```bash
npm run build
npx vite preview          # local preview
npx nitro deploy --prebuilt   # Cloudflare (default)
```

Ensure `VITE_SITE_URL` matches your production domain.

## Environment variables

See `.env.example`.

## Production-Grade Optimizations

A suite of technical optimizations has been implemented to elevate the website to launch-ready status:

1. **Performance & Main-Thread Execution:**
   - **Lazy Route Loading:** The `CommandPalette` component is lazily loaded using `React.lazy()` and `Suspense`, shaving off ~25KB of bundle size from the initial route paint.
   - **Zero React Scroll Jank:** High-frequency scroll indicators (such as `ScrollProgress`) were refactored from React state hooks to pure declarative Motion/CSS drivers.
   - **GPU-Accelerated CSS Animations:** The floating background orbs in `BackgroundSystem` were migrated from Framer Motion JavaScript loops to hardware-accelerated CSS animations (`translate3d`), keeping main-thread execution clear.
   - **Loading Skeletons:** Implemented a global pending state UI `PageLoading.tsx` registered in the router.

2. **Accessibility (a11y) & UX Polish:**
   - **Global Focus Ring Design:** Removed hostile `:focus-visible { outline: none; }` and replaced it with visible, keyboard-friendly offset focus outlines.
   - **Motion Controls:** Added `@media (prefers-reduced-motion: reduce)` rules globally to instantly halt parallax, custom mouse cursors, marquee flows, and scroll-behaviors.
   - **Nav landmark signals:** Integrated `aria-current="page"` into header navigation links.
   - **Form Accessibility:** Added `aria-invalid` and `aria-describedby` links to validation messages for screen readers in the contact form.

3. **SEO & Structured Data:**
   - Unified route metadata under a central builder `buildPageHead()` for absolute URL canonicalization and OG card validation.
   - Integrated full Schema.org structured JSON-LD data:
     - `ProfilePage` schema for the About page.
     - `Article` + `Breadcrumb` schemas for article detail pages.
     - `FAQPage` schema for inline FAQ sections.
   - Absolute URLs mapped to sitemap engines and a custom default OG image placeholder (`og-default.png`) placed in root assets.

4. **Resiliency & Analytics:**
   - **Offline State Engine:** Added an offline detection system rendering local toast warnings on connection drops.
   - **Click Tracking:** Configured analytics triggers for PDF downloads, outbound social anchors, and form submittals.
   - **Magic Number Consolidation:** Extracted validation limits, scroll offsets, and constants into `src/lib/constants.ts` and `src/lib/motion.ts`.

## Roadmap

- [ ] OG image generation (`/og-default.png` + dynamic routes)
- [ ] Newsletter provider integration
- [ ] Contact API route (Resend / Formspree)
- [ ] MDX or CMS for blog posts
- [ ] E2E accessibility tests

## License

Private — © Dinesh Kumar V
