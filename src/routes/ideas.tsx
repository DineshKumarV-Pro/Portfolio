import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Beaker, Compass, Lightbulb, Rocket, Telescope } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/ideas",
  metaTitle: "Ideas — Dinesh Kumar V",
  description:
    "Concepts, product ideas, AI experiments, and future visions — clearly labelled by stage. Where thinking happens before products do.",
};

export const Route = createFileRoute("/ideas")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: IdeasPage,
});

type Stage = "Concept" | "Research" | "Prototype" | "Future Vision";

const stageStyles: Record<Stage, { dot: string; pill: string; icon: typeof Lightbulb }> = {
  Concept: {
    dot: "bg-[var(--brand)]",
    pill: "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
    icon: Lightbulb,
  },
  Research: {
    dot: "bg-[var(--signal)]",
    pill: "border-[var(--signal)]/30 text-[var(--signal)]",
    icon: Telescope,
  },
  Prototype: {
    dot: "bg-[var(--success)]",
    pill: "border-[var(--success)]/30 text-[var(--success)]",
    icon: Beaker,
  },
  "Future Vision": {
    dot: "bg-muted-foreground",
    pill: "border-[var(--border-strong)] text-muted-foreground",
    icon: Rocket,
  },
};

const ideas: { title: string; stage: Stage; pitch: string; tags: string[] }[] = [
  {
    title: "ZentraTask AI",
    stage: "Prototype",
    pitch:
      "An AI productivity OS that turns intent into structured plans, deadlines, and follow-throughs.",
    tags: ["AI", "Productivity", "Founder"],
  },
  {
    title: "A learning operating system for CS students",
    stage: "Concept",
    pitch:
      "Curriculum, projects, and reflection — woven into a single tool so learning compounds visibly week over week.",
    tags: ["EdTech", "Computer Science"],
  },
  {
    title: "Developer tools that respect attention",
    stage: "Research",
    pitch:
      "What would a development environment look like if every interruption had to justify itself?",
    tags: ["DX", "Tools"],
  },
  {
    title: "ALPHA CodeX studio model",
    stage: "Future Vision",
    pitch:
      "A long-term product studio building software, AI, and learning systems from first principles.",
    tags: ["Startup", "Studio"],
  },
];

function IdeasPage() {
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
          <Breadcrumbs items={[{ label: "Writing", href: "/blog" }, { label: "Ideas" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-6 max-w-[62ch]">
            <Eyebrow tone="accent">
              <Lightbulb className="size-3" aria-hidden /> Working drafts
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Ideas before they become products.
            </h1>
            <p className="text-lede text-muted-foreground text-balance-pretty">
              Half-formed concepts, product sketches, AI experiments, and long-horizon visions.
              Everything here is labelled by stage — never confused with finished work.
            </p>
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.06} className="mt-10">
          <ul className="flex flex-wrap items-center gap-2">
            {(Object.keys(stageStyles) as Stage[]).map((s) => (
              <li
                key={s}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-mono-label ${stageStyles[s].pill}`}
              >
                <span className={`size-1.5 rounded-full ${stageStyles[s].dot}`} />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ideas.map((idea, i) => {
            const style = stageStyles[idea.stage];
            const Icon = style.icon;
            return (
              <Reveal key={idea.title} delay={i * 0.06}>
                <div className="card-interactive hover-lift h-full p-6 md:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid size-10 place-items-center rounded-md border border-[var(--border-strong)] bg-surface text-foreground">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-mono-label ${style.pill}`}
                    >
                      <span className={`size-1.5 rounded-full ${style.dot}`} />
                      {idea.stage}
                    </span>
                  </div>
                  <h3 className="mt-5 text-h2 text-foreground">{idea.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {idea.pitch}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {idea.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--border-strong)] bg-surface/60 px-2.5 py-1 text-mono-meta text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-20">
          <div className="surface-card flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-10 place-items-center rounded-md border border-[var(--border-strong)] bg-surface text-[var(--brand)]">
                <Compass className="size-4" aria-hidden />
              </div>
              <div>
                <h3 className="text-h3 text-foreground">Have a question about any of these?</h3>
                <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
                  Ideas get sharper through conversation. If something here resonates, the inbox is
                  open.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/alpha-codex">
                  ALPHA CodeX <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="primary">
                <Link to="/contact">Start a thread</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
