# Design System — Monochrome × Aurora

> **Core Principle:** Monochrome is the foundation (~90%). Aurora is the visual signature (~10%).

This document defines the foundational design system for the portfolio. It establishes the visual tokens, typography, layout grid, surface system, motion choreography, reusable components, and accessibility standards.

---

## 01. Art Direction & Design Philosophy

The portfolio balances cinematic visual storytelling, editorial typography, experimental compositions, and technical precision.

- **Monochromatic Foundation:** Deep void backgrounds, restrained grayscale surfaces, crisp off-white typography, and subtle hairline borders carry ~90% of the visual weight.
- **Aurora Signature:** Inspired by a luminous gradient ring in a dark void, lighting transitions organically between electric violet, lavender, and ice cyan. Aurora is used intentionally for atmospheric depth, selective typography emphasis, and interactive highlights—never as a default fill on every element.
- **Restraint Over Decoration:** Avoid generic SaaS templates, excessive glassmorphism, constant particle loops, or neon borders. Every visual accent must earn its place.

---

## 02. Colour System

### Foundation Palette (Monochrome)

| Token | Hex / Value | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- |
| `--color-void` | `#080808` | `bg-void` | Primary canvas background |
| `--color-surface` | `#111111` | `bg-surface` | Secondary containers, subtle panels |
| `--color-elevated` | `#1C1C1C` | `bg-elevated` | Hover states, elevated interactive surfaces |
| `--color-text-primary` | `#F5F5F5` | `text-primary` | Headings, primary copy, high-contrast labels |
| `--color-text-secondary` | `#A1A1A1` | `text-secondary` | Supporting copy, captions, metadata |
| `--color-border` | `#333333` | `border-border` | Standard structural borders |
| `--color-border-subtle` | `rgba(245, 245, 245, 0.08)` | `border-border-subtle` | Hairline dividers, restrained outlines |
| `--color-border-strong` | `rgba(245, 245, 245, 0.22)` | `border-border-strong` | Active / hover border emphasis |

### Aurora Accent Palette

| Token | Hex / Value | Tailwind Utility | Usage |
| :--- | :--- | :--- | :--- |
| `--color-aurora-violet` | `#8B5CF6` | `text-aurora-violet` | Primary aurora anchor |
| `--color-aurora-lavender` | `#A78BFA` | `text-aurora-lavender` | Soft transition & focus indicators |
| `--color-aurora-cyan` | `#67D9FF` | `text-aurora-cyan` | Luminous highlight edge (part of aurora, not a standalone UI colour) |
| `--color-aurora-deep` | `#6D28D9` | `bg-aurora-deep` | Deep shadow base & text selection |
| `--color-aurora-glow-violet` | `rgba(139, 92, 246, 0.16)` | — | Soft atmospheric bloom |
| `--color-aurora-glow-lavender` | `rgba(167, 139, 250, 0.14)` | — | Mid-tone ambient diffusion |
| `--color-aurora-glow-cyan` | `rgba(103, 217, 255, 0.12)` | — | Outer atmospheric edge |

### Gradient Conventions

Defined in `app/globals.css`:

- `--gradient-aurora`: Full violet → lavender → cyan directional transition (`135deg`).
- `--gradient-aurora-subtle`: Low-opacity atmospheric wash for selective highlights.
- `--gradient-aurora-radial`: Soft radial bloom for hero/ambient lighting layers (`.aurora-ambient`).
- `--gradient-aurora-line`: Fading horizontal hairline for `Divider variant="aurora"` (`.aurora-hairline`).
- `--gradient-aurora-text`: Editorial gradient clip for selective display emphasis (`.aurora-text`).

---

## 03. Typography

Loaded via `next/font/google` in `app/layout.tsx` with `display: 'swap'`:

| Role | Family | CSS Variable | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | Outfit | `--font-outfit` | `font-display` | Hero headlines, section headings, editorial statements |
| **Body** | Inter | `--font-inter` | `font-sans` | Paragraphs, descriptions, navigation, UI labels |
| **Technical** | JetBrains Mono | `--font-jetbrains-mono` | `font-mono` | Section indices, metadata, tags, technical details |

### Fluid Type Scale (`clamp()`)

| Token | Clamp Formula | Range |
| :--- | :--- | :--- |
| `--text-display-xl` | `clamp(2.75rem, 6vw + 1rem, 5.5rem)` | 44px – 88px |
| `--text-display-lg` | `clamp(2.25rem, 4.5vw + 0.75rem, 4.25rem)` | 36px – 68px |
| `--text-display-md` | `clamp(1.75rem, 3vw + 0.5rem, 3rem)` | 28px – 48px |
| `--text-heading-lg` | `clamp(1.5rem, 2vw + 0.5rem, 2.25rem)` | 24px – 36px |
| `--text-heading-md` | `clamp(1.25rem, 1.25vw + 0.5rem, 1.625rem)` | 20px – 26px |
| `--text-heading-sm` | `clamp(1.0625rem, 0.75vw + 0.5rem, 1.25rem)` | 17px – 20px |
| `--text-body-lg` | `clamp(1.0625rem, 0.4vw + 0.875rem, 1.25rem)` | 17px – 20px |
| `--text-body-md` | `clamp(0.9375rem, 0.25vw + 0.85rem, 1.0625rem)` | 15px – 17px |
| `--text-body-sm` | `clamp(0.8125rem, 0.15vw + 0.78rem, 0.875rem)` | 13px – 14px |
| `--text-mono-sm` | `clamp(0.75rem, 0.1vw + 0.72rem, 0.8125rem)` | 12px – 13px |
| `--text-mono-xs` | `0.75rem` | 12px (minimum) |

---

## 04. Spacing System

4px-based spacing scale defined as CSS custom properties:

- `--space-1`: `4px` (`0.25rem`)
- `--space-2`: `8px` (`0.5rem`)
- `--space-3`: `12px` (`0.75rem`)
- `--space-4`: `16px` (`1rem`)
- `--space-6`: `24px` (`1.5rem`)
- `--space-8`: `32px` (`2rem`)
- `--space-12`: `48px` (`3rem`)
- `--space-16`: `64px` (`4rem`)
- `--space-24`: `96px` (`6rem`)
- `--space-32`: `128px` (`8rem`)

Section vertical rhythm tokens:

- `--space-section-sm`: `clamp(3rem, 6vw, 4.5rem)`
- `--space-section-md`: `clamp(4.5rem, 9vw, 7.5rem)`
- `--space-section-lg`: `clamp(6rem, 12vw, 10rem)`

---

## 05. Layout & Grid System

The `.editorial-grid` utility adapts across three breakpoints with fluid gutters (`--grid-gutter: clamp(1rem, 2.5vw, 2rem)`):

- **Mobile (`< 640px`):** 4-column grid, mobile-first stacking, touch-friendly interactive targets (`min-h-[44px]`).
- **Tablet (`>= 640px`):** 8-column grid, adaptive composition.
- **Desktop (`>= 1024px`):** 12-column grid, asymmetric editorial compositions, generous whitespace.

Container max-widths:

- `narrow`: `52rem` (`832px`)
- `default`: `75rem` (`1200px`)
- `wide`: `90rem` (`1440px`)
- `full`: `none`

---

## 06. Surface System

- **Void (`#080808`):** Default page canvas.
- **Surface (`#111111`):** Subtle elevation for structured regions.
- **Elevated (`#1C1C1C`):** Interactive hover states and high-priority panels.
- **Borders:** Prefer `1px` grayscale hairlines (`--color-border-subtle` / `--color-border`).
- **Grain:** `.surface-grain` applies a subtle fractal noise texture (`opacity: 0.035`) only where atmospheric depth is needed.
- **Shadows:** Minimal (`--shadow-surface`), with `--shadow-aurora-subtle` reserved for intentional focal moments.

---

## 07. Motion System

Defined in `app/globals.css` and `lib/motion.ts`:

### Durations

| Tier | CSS Token | GSAP (`lib/motion.ts`) | Usage |
| :--- | :--- | :--- | :--- |
| Micro interaction | `--duration-micro` (`180ms`) | `MOTION_DURATION.micro` (`0.18s`) | Hover, focus, active states |
| UI transition | `--duration-ui` (`300ms`) | `MOTION_DURATION.ui` (`0.3s`) | Menus, drawers, state changes |
| Reveal | `--duration-reveal` (`650ms`) | `MOTION_DURATION.reveal` (`0.65s`) | Content & scroll entrances |
| Dramatic sequence | `--duration-dramatic` (`1000ms`) | `MOTION_DURATION.dramatic` (`1.0s`) | Hero & intro choreography |

### Principles & Reduced Motion

- Animate `opacity` and `transform` only to preserve 60fps compositing.
- Global `@media (prefers-reduced-motion: reduce)` collapses CSS durations, and `prefersReducedMotion()` in `lib/motion.ts` disables GSAP entrance offsets.

---

## 08. Foundational Components (`components/ui/`)

All components are exported from `@/components/ui`:

- **`Button`**: Semantic `<button>` or `<a>` (when `href` is passed). Variants: `primary` (high-contrast monochrome), `secondary` (dark surface + border), `ghost`, `aurora` (controlled signature accent). Sizes: `sm`, `md`, `lg`.
- **`Container`**: Responsive width wrapper (`narrow | default | wide | full`) with `as` polymorphism.
- **`Section`**: Semantic `<section>` with configurable vertical rhythm (`none | sm | md | lg`), surface (`void | surface | elevated`), and optional top hairline border.
- **`SectionLabel`**: `JetBrains Mono` uppercase label with optional numeric `index` and `monochrome | aurora` indicator.
- **`Heading`**: `Outfit` display typography with semantic `as` (`h1`–`h4`, `p`, `span`), fluid `size` scale, and optional `aurora` gradient text.
- **`Divider`**: `horizontal` or `vertical` `1px` separator (`default | subtle | aurora`).
- **`Tag`**: Minimal `JetBrains Mono` pill (`default | outline | aurora`, `sm | md`).
- **`Reveal`**: IntersectionObserver + GSAP entrance wrapper (`up | down | none`) that respects `prefers-reduced-motion`.

### Navigation System (`components/navigation/`)

- **`HamburgerButton`**: Custom 3-line asymmetric monochrome trigger (`44px × 44px` touch target) with GSAP-driven transition into an `X` state, `aria-expanded`, `aria-controls`, and `prefers-reduced-motion` support.
- **`FullscreenNavigation`**: Minimal `#080808` widescreen aperture overlay (`z-40`, sitting seamlessly beneath `Header` at `z-50`) implementing Concept B × C ("Kinetic Editorial Aperture"): `26% / 74%` asymmetric split, 4 counter-offset horizontal bands (`01`–`08`), vertical axis aurora pulse tracking, localized hover spotlight halos, 4 social icon channels, GSAP horizontal-slit aperture reveal/close, focus cycling, `Escape` & backdrop closing, focus restoration, and body scroll locking.

---

## 09. Accessibility Conventions

- **Semantic HTML:** Use `<main>`, `<section>`, `<header>`, `<h1>`–`<h4>`, `<button>`, and `<a>` appropriately.
- **Keyboard & Focus:** Global `:focus-visible` ring (`2px solid #A78BFA`, `3px` offset) ensures clear keyboard navigation.
- **Contrast:** Primary text `#F5F5F5` on `#080808` (>18:1) and secondary text `#A1A1A1` on `#080808` (~7.5:1) exceed WCAG AA/AAA contrast requirements.
- **No Colour-Only Meaning:** `SectionLabel` and `Tag` always pair visual indicators with explicit text or indices.
- **Reduced Motion:** Both CSS and GSAP animations honour `prefers-reduced-motion: reduce`.

---

## 10. Usage Guidelines & Anti-Patterns

### Do

- Keep ~90% of any viewport monochromatic.
- Use `Outfit` for editorial statements, `Inter` for readable copy, and `JetBrains Mono` for technical metadata.
- Use generous whitespace (`--space-section-md` / `--space-section-lg`) to let typography and lighting breathe.

### Avoid (Anti-Patterns)

- Applying aurora gradients to every button, card, or heading.
- Using cyan (`#67D9FF`) as a permanent standalone UI colour.
- Wrapping every block of content in a bordered card.
- Using `backdrop-filter` glassmorphism as a default surface style.
- Adding continuous decorative particle loops or glowing neon borders.
