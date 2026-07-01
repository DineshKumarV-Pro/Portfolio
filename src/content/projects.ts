export type ProjectCategory = "Product" | "AI" | "Web App" | "Platform" | "Learning" | "Experiment";

export type CaseStudySection = {
  heading: string;
  body: string;
  list?: string[];
};

export type CaseStudy = {
  overview: string;
  problem: string;
  objective: string;
  role: string;
  users: string;
  planning?: string;
  designDecisions?: CaseStudySection[];
  architecture?: string;
  features: string[];
  challenges: CaseStudySection[];
  performance?: string[];
  accessibility?: string[];
  testing?: string;
  lessons: string[];
  futureWork?: string[];
  outcome: string;
  reflection?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline?: string;
  summary: string;
  problem?: string;
  impact?: string;
  role: string;
  year: string;
  yearSort: number;
  stack: string[];
  category: ProjectCategory;
  tags: string[];
  status: "shipped" | "in-progress" | "concept";
  featured?: boolean;
  archived?: boolean;
  links?: { live?: string; github?: string };
  related?: string[];
  caseStudy?: CaseStudy;
  placeholder?: boolean;
};

/**
 * Real, in-flight projects. Metrics are intentionally absent until verified;
 * impact statements describe scope and intent only.
 */
export const projects: Project[] = [
  {
    slug: "alpha-codex",
    title: "ALPHA CodeX",
    tagline: "An execution-focused technology ecosystem",
    summary:
      "A long-term studio connecting learning, building, verification, and opportunities into a single ecosystem for technology talent.",
    problem:
      "Learners collect courses and certificates but rarely cross the bridge into shipped work, real visibility, and opportunity.",
    impact:
      "Designing the platform, brand, and engineering roadmap as founder — turning the studio into a multi-year product surface.",
    role: "Founder · Designer · Engineer",
    year: "2024 — Present",
    yearSort: 2024,
    stack: ["TanStack Start", "TypeScript", "Tailwind", "Supabase", "AI"],
    category: "Platform",
    tags: ["founder", "platform", "education", "long-term"],
    status: "in-progress",
    featured: true,
    related: ["zentratask-ai", "skill-exchange-platform"],
    caseStudy: {
      overview:
        "ALPHA CodeX is a personal studio and long-term product surface — a single home for the things I build, the systems I publish, and the people I want to work with. It is intentionally founder-led and quality-first, not a content site.",
      problem:
        "Most developer-education platforms reward consumption: watch lessons, collect certificates, never ship. The result is a generation of capable learners with thin public proof of work. Recruiters and clients can't tell signal from noise.",
      objective:
        "Build an ecosystem where learning, building, verification, and opportunity sit next to each other — so progress is visible by default and every artifact compounds the next.",
      role: "Founder, designer, and sole engineer. I own product direction, brand, design system, frontend architecture, content, and shipping cadence.",
      users:
        "Self-taught engineers and CS students who want a credible public surface, and the recruiters, founders, and collaborators who evaluate them.",
      planning:
        "Started as a single portfolio. Reframed into a studio once I realized the same surface needed to host writing, projects, experiments, a public roadmap, and a hiring-ready presentation — without forcing a redesign every quarter.",
      designDecisions: [
        {
          heading: "Editorial, not template",
          body: "Neutral monochrome with a restrained electric-blue accent, Manrope + Inter, generous whitespace. The system trusts content to do the work and removes generic SaaS gradients.",
        },
        {
          heading: "Information architecture before pixels",
          body: "Designed ~50 routes up front — projects, case studies, journey, now, uses, recruiter pages — so the visual layer never has to compensate for a missing structural one.",
        },
        {
          heading: "One motion language",
          body: "Subtle fades and lifts via Framer Motion. Reduced-motion respected at the primitive level so accessibility is the default, not a setting.",
        },
      ],
      architecture:
        "TanStack Start (SSR) on Vite, file-based routing, TypeScript-strict, Tailwind v4 with OKLCH theme tokens, Framer Motion for orchestrated reveals, content authored as typed TypeScript modules so every page has a stable typed source of truth.",
      features: [
        "Hybrid design system with semantic tokens for light/dark parity",
        "Sticky header with mega-menu and scroll progress",
        "Editorial homepage with selected work, capabilities, and credentials",
        "Long-form identity surface: About, Journey, Timeline, Now",
        "Recruiter-focused entry points: Hire Me, Resume, Skills",
        "Typed content modules for projects, posts, experience, and skills",
      ],
      challenges: [
        {
          heading: "Scope without sprawl",
          body: "~50 routes is easy to scaffold and impossible to maintain. Solved by collapsing every non-essential route to a typed scaffold with a content checklist, so the visual layer never lies about completeness.",
        },
        {
          heading: "Founder story without ego",
          body: "Personal sites slip into either pure ego or pure resume. The voice is tuned to talk about decisions and trade-offs, not adjectives.",
        },
      ],
      performance: [
        "Server-rendered routes for fast first paint and crawler-friendly HTML",
        "Static, typed content modules — no client-side data fetching for marketing surfaces",
        "Motion isolated to small primitives; reduced-motion short-circuits at the component level",
      ],
      accessibility: [
        "WCAG AA contrast in both themes",
        "Keyboard-reachable navigation and focus rings on every interactive element",
        "Semantic landmarks, single H1 per route, descriptive link text",
      ],
      testing:
        "TypeScript strict mode + production build as the primary regression net. Visual checks across light and dark themes after every system-level change.",
      lessons: [
        "Information architecture is the product. Pixels are negotiation, structure is contract.",
        "Founder-led personal brands age better when written like a studio, not a CV.",
        "Restraint is faster than novelty. The site got better when I removed gradients, not added them.",
      ],
      futureWork: [
        "Public roadmap with shipped/in-progress/queued",
        "Long-form essays and engineering notes under /blog",
        "First external case study with a paying client",
      ],
      outcome:
        "A scalable, production-ready home for everything I build — engineered to grow with me for years without a redesign.",
      reflection:
        "ALPHA CodeX taught me to design for the version of myself I want to be in three years, not the one I am today.",
    },
  },
  {
    slug: "zentratask-ai",
    title: "ZentraTask AI",
    tagline: "AI-assisted productivity for consistent execution",
    summary:
      "A task platform that uses AI to interpret priorities, plan the week, and nudge users back toward meaningful progress.",
    problem:
      "Most task apps capture todos but never help people choose what to do next or stay consistent over time.",
    impact:
      "Defining the product, designing the planning loop, and building the React + AI gateway prototype end-to-end.",
    role: "Founder · Product · Frontend",
    year: "2025",
    yearSort: 2025,
    stack: ["React", "TypeScript", "Tailwind", "AI Gateway", "Supabase"],
    category: "AI",
    tags: ["ai", "productivity", "founder"],
    status: "in-progress",
    featured: true,
    related: ["alpha-codex", "skill-exchange-platform"],
    caseStudy: {
      overview:
        "ZentraTask AI is a task and planning app that treats execution — not capture — as the hard problem. It uses an AI layer to interpret intent, surface the right next action, and keep the user inside a weekly rhythm.",
      problem:
        "Existing tools assume the bottleneck is writing down tasks. The real bottleneck is choosing what to do next under uncertainty, and staying consistent across weeks when motivation dips.",
      objective:
        "Ship a focused planning loop: capture loosely, let AI structure and prioritize, commit to a week, review honestly.",
      role: "Founder and sole maker. I own the product thesis, UX, frontend implementation, and the AI prompt and tool design.",
      users:
        "Builders, students, and solo operators who already use task apps and still feel behind on the work that matters.",
      designDecisions: [
        {
          heading: "Plan, then act",
          body: "The primary surface is the week, not an infinite inbox. Capture is fast, but the app pulls you back to a planning view that has a beginning and an end.",
        },
        {
          heading: "AI as collaborator, not oracle",
          body: "Every AI suggestion is editable, dismissible, and explainable in one tap. The app proposes; the user decides.",
        },
      ],
      architecture:
        "React + TypeScript frontend, Supabase for auth and persistence, AI Gateway for completion and structured-output calls. Server functions handle privileged AI calls; the client only sees prompts and results it owns.",
      features: [
        "Natural-language capture that converts to structured tasks",
        "Weekly planning view with priority and energy hints",
        "AI-generated daily focus from the open backlog",
        "Honest weekly review with carry-over and reasons",
      ],
      challenges: [
        {
          heading: "Trust in AI suggestions",
          body: "Bad AI plans are worse than no plan. Built strong defaults, made every suggestion editable inline, and kept the user's manual ordering as the ground truth.",
        },
        {
          heading: "Latency vs. quality",
          body: "Planning-quality responses are slow. Split the UX into instant local actions and progressively-enhanced AI passes so the app never feels like a loading spinner.",
        },
      ],
      accessibility: [
        "Full keyboard flows for capture, schedule, and review",
        "Reduced-motion respected across transitions",
      ],
      lessons: [
        "AI features earn trust by being undoable, not by being smart.",
        "Productivity tools live or die on the second week, not the first session.",
      ],
      futureWork: [
        "Recurring rituals and weekly retrospectives",
        "Calendar-aware planning",
        "Shared plans for accountability pairs",
      ],
      outcome:
        "Working prototype with the core planning loop in place. Real-user testing begins as the studio expands.",
    },
  },
  {
    slug: "weatherly-wave",
    title: "Weatherly Wave",
    tagline: "Real-time weather, clean responsive UI",
    summary:
      "A modern weather application with a focused interface, live API data, and a responsive experience across devices.",
    problem:
      "Most weather apps overload the screen and bury the one number a user opened the app to see.",
    impact:
      "Shipped a fast, accessible single-purpose interface with API integration and mobile-first layout.",
    role: "Designer & Frontend Engineer",
    year: "2024",
    yearSort: 2024,
    stack: ["React", "JavaScript", "CSS", "Weather API"],
    category: "Web App",
    tags: ["ui", "api", "frontend"],
    status: "shipped",
    featured: true,
    related: ["zenokart"],
    caseStudy: {
      overview:
        "Weatherly Wave is a single-purpose weather app built to answer one question quickly — what's it like outside, here, right now — and then offer optional depth without crowding the answer.",
      problem:
        "Weather apps fight for screen real estate with ads, hourly grids, radar tiles, and lifestyle indices. The number people opened the app for ends up below the fold.",
      objective:
        "Lead with the temperature and condition. Hide hourly, daily, and detail views behind progressive disclosure. Make it pleasant on a phone.",
      role: "Solo designer and frontend engineer. Designed the interface, integrated the weather API, and shipped the responsive build.",
      users:
        "Anyone who just wants the current weather without scrolling past three ad units to find it.",
      designDecisions: [
        {
          heading: "One screen, one answer",
          body: "Temperature and condition are the entire above-the-fold story. Everything else is a tap away.",
        },
        {
          heading: "Mobile-first layout",
          body: "Designed and developed at the smallest breakpoint first, then scaled up. Desktop is a side effect, not the starting point.",
        },
      ],
      architecture:
        "React frontend with a thin API client around a public weather provider. Geolocation with explicit permission and a typed fallback search.",
      features: [
        "Auto-detected location with permission gating",
        "Search any city worldwide",
        "Current conditions, hourly, and multi-day forecast",
        "Responsive layout from 320px upward",
      ],
      challenges: [
        {
          heading: "API quirks and rate limits",
          body: "Free weather APIs throttle aggressively. Added client-side caching keyed to coordinates and a graceful empty state for missed quota.",
        },
      ],
      performance: ["Minimal JS payload", "Cached responses to avoid repeat hits"],
      accessibility: [
        "Sufficient contrast on all weather backgrounds",
        "Semantic landmarks and screen-reader-friendly labels",
      ],
      lessons: [
        "Single-purpose apps are won at the first screen.",
        "Permissions UX is product UX — opt-ins should explain why before they ask.",
      ],
      outcome:
        "Shipped a focused weather app with a clean interface and live API data — the project that taught me to defend whitespace.",
    },
  },
  {
    slug: "zenokart",
    title: "ZenoKart",
    tagline: "A clean, modern e-commerce platform",
    summary:
      "An e-commerce experience focused on a calm interface, fast browsing, and a straightforward path from product to checkout.",
    problem:
      "Small storefronts inherit bloated templates and shoppers leave before they reach checkout.",
    impact:
      "Designing the storefront and building the product, cart, and checkout flows as a single-developer project.",
    role: "Designer & Full-stack",
    year: "2025",
    yearSort: 2025,
    stack: ["React", "TypeScript", "Tailwind", "PostgreSQL"],
    category: "Web App",
    tags: ["ecommerce", "full-stack"],
    status: "in-progress",
    featured: false,
    related: ["weatherly-wave"],
  },
  {
    slug: "skill-exchange-platform",
    title: "Skill Exchange Platform",
    tagline: "Peer-to-peer learning by trading skills",
    summary:
      "A community platform where people teach what they know and learn what they need, without locking access behind paywalls.",
    problem:
      "Learners with valuable skills can't easily find partners to trade knowledge with, and paid courses aren't always the answer.",
    impact: "Designing the exchange model and matching flow as a community-first product.",
    role: "Founder · Product · Frontend",
    year: "2025",
    yearSort: 2025,
    stack: ["React", "TypeScript", "Supabase"],
    category: "Platform",
    tags: ["community", "education", "founder"],
    status: "concept",
    featured: false,
    related: ["alpha-codex", "zentratask-ai"],
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1",
    tagline: "First public personal site",
    summary:
      "The first version of my personal portfolio — single-page, hand-built, and the project that proved I could ship something public end-to-end.",
    role: "Designer & Frontend",
    year: "2023",
    yearSort: 2023,
    stack: ["HTML", "CSS", "JavaScript"],
    category: "Learning",
    tags: ["portfolio", "fundamentals"],
    status: "shipped",
    archived: true,
  },
  {
    slug: "ui-explorations",
    title: "UI explorations",
    tagline: "Small interface studies",
    summary:
      "A running set of small front-end studies — components, layouts, and interactions built to sharpen craft without pretending to be products.",
    role: "Designer & Frontend",
    year: "2023 — Present",
    yearSort: 2023,
    stack: ["React", "Tailwind", "CSS"],
    category: "Experiment",
    tags: ["ui", "craft"],
    status: "in-progress",
    archived: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const liveProjects = projects.filter((p) => !p.archived);
export const archivedProjects = projects.filter((p) => p.archived);
export const caseStudyProjects = projects.filter((p) => p.caseStudy);

export const projectCategories: ProjectCategory[] = [
  "Product",
  "AI",
  "Web App",
  "Platform",
  "Learning",
  "Experiment",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
