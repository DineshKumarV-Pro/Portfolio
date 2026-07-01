import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { skillGroups, type SkillLevel } from "@/content/skills";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/skills",
  metaTitle: "Skills — Dinesh Kumar V",
  description:
    "Frontend, programming languages, backend, databases, AI, tools, deployment, and the human skills that make the technical ones useful — organized by category with honest proficiency levels.",
};

export const Route = createFileRoute("/skills")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: SkillsPage,
});

const LEVEL_TONE: Record<SkillLevel, string> = {
  Advanced: "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
  Intermediate: "border-[var(--border-strong)] bg-surface/70 text-foreground/85",
  Beginner: "border-[var(--border)] bg-surface/40 text-muted-foreground",
};

function SkillsPage() {
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
          <Breadcrumbs items={[{ label: "Skills" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>Skills</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              The capabilities behind the work.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              Grouped by category, with honest proficiency levels. Frontend is where I'm strongest
              today; backend, AI, and full-stack are growing fast through real project work.
            </p>
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center gap-2 text-mono-meta text-muted-foreground">
            <span>Proficiency:</span>
            {(["Advanced", "Intermediate", "Beginner"] as SkillLevel[]).map((l) => (
              <span key={l} className={`rounded-md border px-2 py-0.5 ${LEVEL_TONE[l]}`}>
                {l}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.label} delay={i === 0 ? 0 : 0.04}>
              <article className="surface-card flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-h2 text-foreground">{g.label}</h2>
                  <span className="text-mono-meta text-muted-foreground/70">
                    {String(g.items.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                  {g.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {g.items.map((s) => {
                    const name = typeof s === "string" ? s : s.name;
                    const level = typeof s === "string" ? undefined : s.level;
                    const tone = level
                      ? LEVEL_TONE[level]
                      : "border-[var(--border)] bg-surface/60 text-foreground/85";
                    return (
                      <li
                        key={name}
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[13px] transition-colors ${tone}`}
                      >
                        <span>{name}</span>
                        {level ? (
                          <span aria-hidden className="opacity-50">
                            ·
                          </span>
                        ) : null}
                        {level ? <span className="text-mono-meta opacity-80">{level}</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Related */}
        <Reveal delay={0.05} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="See it applied"
            title="Skills mean nothing without evidence."
            description="The projects, experience, and resume below back each claim with shipped work."
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { label: "Projects", href: "/projects" },
              { label: "Experience", href: "/experience" },
              { label: "Resume", href: "/resume" },
              { label: "Now", href: "/now" },
              { label: "Hire me", href: "/hire-me" },
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
