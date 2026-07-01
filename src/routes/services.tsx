import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Code2,
  FileText,
  Gauge,
  LayoutTemplate,
  Palette,
  Sparkles,
} from "lucide-react";
import type { ComponentType } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/services",
  metaTitle: "Services — Dinesh Kumar V · Frontend & Product Engineering",
  description:
    "Frontend engineering, React product UI, landing pages, design systems, and AI-assisted product work — services Dinesh Kumar V offers to founders and small teams.",
};

export const Route = createFileRoute("/services")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: ServicesPage,
});

type ServiceStatus = "Available" | "Limited" | "Future";

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  status: ServiceStatus;
  overview: string;
  idealFor: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
};

const services: Service[] = [
  {
    icon: Code2,
    title: "Frontend & React Development",
    status: "Available",
    overview:
      "Production-grade React + TypeScript frontends for product surfaces, dashboards, and customer-facing apps.",
    idealFor: "Early-stage startups and product teams that need careful frontend execution.",
    deliverables: [
      "Implemented screens from designs or specs",
      "Typed components and reusable patterns",
      "Accessible interactions and responsive layouts",
      "Production deployment and handoff docs",
    ],
    stack: ["React", "TypeScript", "Tailwind", "Vite", "Next.js"],
    timeline: "2 – 6 weeks per scoped sprint",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Pages & Marketing Sites",
    status: "Available",
    overview:
      "Fast, SEO-friendly marketing sites that convert — built on TanStack Start or Next.js with proper metadata and Lighthouse scores.",
    idealFor: "Founders launching a product or a brand who need a credible first surface.",
    deliverables: [
      "Information architecture and copy refinement",
      "Custom layout — no template look",
      "SEO, OG, and analytics wiring",
      "Deployment to Vercel or similar",
    ],
    stack: ["TanStack Start", "Next.js", "Tailwind", "Framer Motion"],
    timeline: "1 – 3 weeks",
  },
  {
    icon: Boxes,
    title: "Design Systems & Component Libraries",
    status: "Available",
    overview:
      "Tokenized, themeable component libraries with the same primitives I use across my own products.",
    idealFor: "Teams scaling a product with multiple surfaces or designers.",
    deliverables: [
      "Color, typography, and spacing tokens",
      "Accessible base components (Radix-backed)",
      "Storybook or in-repo docs",
      "Theming and dark-mode parity",
    ],
    stack: ["Tailwind v4", "Radix UI", "shadcn patterns", "TypeScript"],
    timeline: "3 – 8 weeks",
  },
  {
    icon: Palette,
    title: "Portfolio & Personal Sites",
    status: "Available",
    overview:
      "Editorial personal sites for engineers, designers, and founders who want a long-term home rather than a template.",
    idealFor: "Operators and builders ready to invest in a public surface that ages well.",
    deliverables: [
      "Custom identity and design direction",
      "Long-form pages (about, work, writing)",
      "SEO, RSS, sitemap, and OG metadata",
      "Hand-off docs and content guide",
    ],
    stack: ["TanStack Start", "Tailwind", "Framer Motion"],
    timeline: "2 – 4 weeks",
  },
  {
    icon: Sparkles,
    title: "Product Prototypes",
    status: "Available",
    overview:
      "Working prototypes for validating product ideas — real interactions, real data, real flows.",
    idealFor: "Founders validating with users or investors before committing to a full build.",
    deliverables: [
      "Click-through prototype with real state",
      "Core data model and persistence",
      "Auth and basic deploy if needed",
      "Walkthrough video and notes",
    ],
    stack: ["React", "Supabase", "AI Gateway"],
    timeline: "2 – 5 weeks",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    status: "Limited",
    overview:
      "Adding LLM-powered features to existing products — structured outputs, RAG, copilots — built on the AI Gateway or your provider of choice.",
    idealFor: "Teams that have a product and want a thoughtful AI surface, not a chat-bot bolt-on.",
    deliverables: [
      "Prompt and tool design",
      "Structured outputs with validation",
      "UX patterns: undoable, explainable, fast",
      "Eval notes and guardrails",
    ],
    stack: ["AI Gateway", "Zod", "React", "Server functions"],
    timeline: "2 – 4 weeks",
  },
  {
    icon: Gauge,
    title: "Performance & Accessibility Audit",
    status: "Available",
    overview:
      "A focused audit on an existing site or app with a written report of findings and prioritized fixes.",
    idealFor: "Teams whose site grew faster than their performance budget.",
    deliverables: [
      "Lighthouse + manual audit",
      "Prioritized issue list with severity",
      "Quick wins implemented inline",
      "Hand-off doc for your team",
    ],
    stack: ["Lighthouse", "axe", "Web Vitals"],
    timeline: "3 – 7 days",
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    status: "Future",
    overview:
      "Engineering and product documentation written with the same care as the product itself — coming as ALPHA CodeX expands.",
    idealFor: "Teams shipping developer tools or APIs that need readable docs.",
    deliverables: [
      "Information architecture",
      "Getting started, concepts, and reference",
      "Examples and runnable snippets",
    ],
    stack: ["Markdown", "MDX", "Custom site"],
    timeline: "Available from late 2026",
  },
];

const STATUS_TONE: Record<ServiceStatus, string> = {
  Available: "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
  Limited: "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
  Future: "border-[var(--border-strong)] bg-surface/60 text-muted-foreground",
};

const process = [
  {
    step: "01",
    title: "Discovery",
    body: "Short call or async brief to confirm scope, constraints, and success criteria.",
  },
  {
    step: "02",
    title: "Proposal",
    body: "Written scope with deliverables, timeline, and a fixed or weekly price.",
  },
  {
    step: "03",
    title: "Build",
    body: "Working in short cycles with previews on every change and async written updates.",
  },
  {
    step: "04",
    title: "Hand-off",
    body: "Production deploy, repository access, docs, and a closing walkthrough.",
  },
];

function ServicesPage() {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-spotlight"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container-page relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mb-10">
          <Breadcrumbs items={[{ label: "Services" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>For founders & teams</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Frontend, product, and AI work — engineered for the long run.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              Focused services for founders and small teams who care about how their product feels.
              Each engagement is scoped tightly, priced honestly, and shipped with the same
              standards I hold my own products to.
            </p>
          </div>
        </Reveal>

        {/* Services grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i === 0 ? 0 : 0.03}>
                <article className="surface-card flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="grid size-11 place-items-center rounded-xl border border-[var(--border-strong)] bg-surface/60">
                        <Icon className="size-5 text-[var(--brand)]" aria-hidden />
                      </div>
                      <div>
                        <h2 className="text-h2 text-foreground">{s.title}</h2>
                        <p className="mt-1 text-[14px] text-muted-foreground">{s.timeline}</p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-mono-meta ${STATUS_TONE[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
                    {s.overview}
                  </p>
                  <p className="mt-3 text-[13.5px] text-muted-foreground">
                    <span className="text-mono-label">Ideal for · </span>
                    {s.idealFor}
                  </p>

                  <div className="mt-5">
                    <div className="text-mono-label text-muted-foreground">Deliverables</div>
                    <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-foreground/85">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span
                            aria-hidden
                            className="mt-2 size-1 flex-none rounded-full bg-[var(--brand)]/70"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <div className="text-mono-label text-muted-foreground">Stack</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[var(--brand)]/20 bg-[var(--brand-soft)] px-2 py-0.5 text-[12.5px] text-[var(--brand)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Process */}
        <Reveal delay={0.04} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="How we work together"
            title="A predictable, async-friendly process."
            description="Same shape whether the engagement is one week or three months."
          />
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i === 0 ? 0 : 0.03}>
              <li className="surface-card h-full p-5">
                <div className="text-mono-meta text-[var(--brand)]">{p.step}</div>
                <h3 className="mt-3 text-h3 text-foreground">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* CTA */}
        <Reveal delay={0.05} className="mt-20">
          <div className="surface-card flex flex-wrap items-center justify-between gap-5 p-7 md:p-9">
            <div className="max-w-[52ch]">
              <Eyebrow tone="accent">Have a project in mind?</Eyebrow>
              <h3 className="mt-4 text-h1 text-balance-tight text-foreground">
                Let's scope it together.
              </h3>
              <p className="mt-3 text-[15px] text-muted-foreground">
                Send a short brief and I'll respond with whether it's a fit, a rough timeline, and
                next steps.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  Start a project <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/hire-me">Hiring instead?</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
