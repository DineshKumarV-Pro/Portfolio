import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Hammer, Rocket, Briefcase, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { timeline, type TimelineEntry } from "@/content/timeline";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/timeline",
  metaTitle: "Timeline — Dinesh Kumar V",
  description:
    "A visual chronological timeline of education, projects, and founder milestones from 2023 to today, plus a clearly marked future roadmap.",
};

export const Route = createFileRoute("/timeline")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: TimelinePage,
});

const ICONS: Record<TimelineEntry["category"], ComponentType<{ className?: string }>> = {
  education: GraduationCap,
  project: Hammer,
  founder: Rocket,
  career: Briefcase,
  future: Sparkles,
};

const LABELS: Record<TimelineEntry["category"], string> = {
  education: "Education",
  project: "Project",
  founder: "Founder",
  career: "Career",
  future: "Future",
};

function TimelinePage() {
  const past = timeline.filter((e) => e.category !== "future");
  const future = timeline.filter((e) => e.category === "future");

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
          <Breadcrumbs items={[{ label: "Timeline" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>Visual timeline</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Milestones, in chronological order.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              Every meaningful step — education, projects, founder milestones, career moves — with a
              clearly marked roadmap of what's next.
            </p>
          </div>
        </Reveal>

        {/* Past + present */}
        <Reveal delay={0.05} className="mt-16">
          <Track entries={past} />
        </Reveal>

        {/* Future */}
        <Reveal delay={0.05} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="Roadmap"
            title="What's next, clearly marked as future."
            description="These are commitments, not predictions — the milestones I'm actively working toward."
          />
          <div className="mt-10">
            <Track entries={future} dimmed />
          </div>
        </Reveal>

        {/* Related */}
        <Reveal delay={0.05} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="Read the story"
            title="Want the narrative behind the dates?"
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "The journey", href: "/journey" },
              { label: "About", href: "/about" },
              { label: "Experience", href: "/experience" },
              { label: "Projects", href: "/projects" },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  to={r.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-surface/40 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {r.label} <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Track({ entries, dimmed = false }: { entries: TimelineEntry[]; dimmed?: boolean }) {
  return (
    <ol className="relative">
      {/* Spine */}
      <div
        aria-hidden
        className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--brand)]/40 via-[var(--border-strong)] to-transparent md:left-[7.5rem]"
      />
      <div className="space-y-7">
        {entries.map((e, i) => {
          const Icon = ICONS[e.category];
          return (
            <li
              key={`${e.year}-${i}`}
              className="relative grid grid-cols-[2.25rem_1fr] gap-4 md:grid-cols-[7.5rem_2.25rem_1fr] md:gap-6"
            >
              <div className="hidden self-start pt-1 text-right md:block">
                <div className="text-mono-label text-[var(--brand)]">{e.year}</div>
              </div>
              <div className="relative">
                <div
                  className={
                    "relative z-10 grid size-9 place-items-center rounded-full border border-[var(--border-strong)] bg-background shadow-[var(--shadow-1)] " +
                    (dimmed ? "opacity-80" : "")
                  }
                >
                  <Icon className="size-4 text-[var(--brand)]" aria-hidden />
                </div>
              </div>
              <div className={"surface-card p-5 md:p-6 " + (dimmed ? "border-dashed" : "")}>
                <div className="flex flex-wrap items-center gap-2 md:hidden">
                  <span className="text-mono-label text-[var(--brand)]">{e.year}</span>
                  <span className="text-mono-meta text-muted-foreground">
                    · {LABELS[e.category]}
                  </span>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <span className="rounded-full border border-[var(--border)] bg-surface/60 px-2 py-0.5 text-mono-meta text-muted-foreground">
                    {LABELS[e.category]}
                  </span>
                  {dimmed ? (
                    <span className="rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-2 py-0.5 text-mono-meta text-[var(--brand)]">
                      Planned
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-h3 text-foreground">{e.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
                {e.href ? (
                  <Link
                    to={e.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--brand)] hover:underline"
                  >
                    Read more <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </div>
    </ol>
  );
}
