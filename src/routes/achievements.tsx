import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  GitBranch,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { ComponentType } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/achievements",
  metaTitle: "Achievements — Dinesh Kumar V",
  description:
    "Academic, technical, project, and community milestones across Dinesh Kumar V's journey as a frontend developer, product builder, and founder of ALPHA CodeX.",
};

export const Route = createFileRoute("/achievements")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: AchievementsPage,
});

type Category = "Academic" | "Technical" | "Project" | "Community" | "Personal";

type Achievement = {
  title: string;
  year: string;
  yearSort: number;
  category: Category;
  context: string;
};

const CATEGORY_ICON: Record<Category, ComponentType<{ className?: string }>> = {
  Academic: GraduationCap,
  Technical: Code2,
  Project: Sparkles,
  Community: GitBranch,
  Personal: Trophy,
};

const achievements: Achievement[] = [
  {
    title: "Founded ALPHA CodeX",
    year: "2024",
    yearSort: 2024,
    category: "Project",
    context:
      "Committed to a multi-year personal studio — defining mission, brand, design system, and engineering roadmap as the sole founder.",
  },
  {
    title: "Shipped Weatherly Wave",
    year: "2024",
    yearSort: 2024.1,
    category: "Project",
    context:
      "Designed and built a focused, responsive weather app integrating live API data — the project that taught me to defend whitespace.",
  },
  {
    title: "100% attendance across Class X, XI, XII",
    year: "2023 – 2025",
    yearSort: 2023,
    category: "Academic",
    context:
      "Three consecutive years of perfect attendance at Vailankanni Matriculation Higher Secondary School.",
  },
  {
    title: "Represented Alpha College at Chess Zonals",
    year: "2025",
    yearSort: 2025.2,
    category: "Personal",
    context:
      "Selected to represent Alpha College of Engineering at the Anna University Chess Zonals.",
  },
  {
    title: "100% attendance · Semester 1 & 2",
    year: "2025 – 2026",
    yearSort: 2025.3,
    category: "Academic",
    context:
      "Maintained perfect attendance across the first year of B.E. Computer Science and Engineering while shipping personal projects in parallel.",
  },
  {
    title: "ZentraTask AI prototype",
    year: "2025",
    yearSort: 2025.4,
    category: "Technical",
    context:
      "Built a working AI-assisted planning prototype using React, TypeScript, Supabase, and the AI Gateway — owned end-to-end.",
  },
  {
    title: "Public engineering presence",
    year: "2025",
    yearSort: 2025.5,
    category: "Community",
    context:
      "Started publishing on Medium and Dev.to, and contributing on LeetCode, HackerRank, and CodeChef under a single public handle.",
  },
  {
    title: "Launched personal site v2",
    year: "2026",
    yearSort: 2026.1,
    category: "Project",
    context:
      "Re-architected the personal site into a long-term studio surface — typed content, SSR routes, design system, and recruiter-ready pages.",
  },
];

const futureGoals = [
  {
    icon: BookOpen,
    title: "Publish 12 long-form essays",
    body: "One per month across engineering, product, and founder thinking.",
  },
  {
    icon: Code2,
    title: "Land a high-quality internship",
    body: "Join a team where I can ship product alongside engineers I learn from daily.",
  },
  {
    icon: Sparkles,
    title: "Open-source one reusable system",
    body: "Extract a small, well-documented library from ALPHA CodeX and publish it.",
  },
  {
    icon: Award,
    title: "Ship ALPHA CodeX v1 publicly",
    body: "First external builders onboarded; first verified outcomes in the wild.",
  },
];

const CATEGORY_TONE: Record<Category, string> = {
  Academic: "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
  Technical: "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
  Project: "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
  Community: "border-[var(--border-strong)] bg-surface/60 text-foreground/85",
  Personal: "border-[var(--signal)]/30 bg-[var(--signal)]/10 text-[var(--signal)]",
};

function AchievementsPage() {
  const sorted = [...achievements].sort((a, b) => b.yearSort - a.yearSort);

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
          <Breadcrumbs items={[{ label: "Achievements" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>
              <Trophy className="size-3" aria-hidden /> Wins and milestones
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Honest milestones across the journey so far.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              A grounded record of academic, technical, project, and community milestones. No
              inflated metrics — just the work and moments that earned a line on this page.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--brand)]/40 via-[var(--border-strong)] to-transparent md:left-[18px]"
          />
          <ol className="space-y-6">
            {sorted.map((a, i) => {
              const Icon = CATEGORY_ICON[a.category];
              return (
                <li key={a.title} className="relative pl-12 md:pl-16">
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 grid size-8 place-items-center rounded-full border border-[var(--border-strong)] bg-background shadow-[0_0_0_4px_var(--background)] md:size-10"
                  >
                    <Icon className="size-4 text-[var(--brand)]" />
                  </span>
                  <Reveal delay={i === 0 ? 0 : 0.03}>
                    <article className="surface-card p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-h3 text-foreground">{a.title}</h2>
                        <span className="text-mono-meta text-muted-foreground">{a.year}</span>
                      </div>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                        {a.context}
                      </p>
                      <div className="mt-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-mono-meta ${CATEGORY_TONE[a.category]}`}
                        >
                          {a.category}
                        </span>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Future goals */}
        <Reveal delay={0.05} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow="The next ones I'm chasing"
            title="Goals on the table right now."
            description="Stated publicly so they stay accountable."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {futureGoals.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i === 0 ? 0 : 0.03}>
                <article className="surface-card flex h-full items-start gap-4 p-6">
                  <div className="grid size-10 flex-none place-items-center rounded-lg border border-[var(--border-strong)] bg-surface/60">
                    <Icon className="size-4 text-[var(--brand)]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-h3 text-foreground">{g.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {g.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Related */}
        <Reveal delay={0.05} className="mt-20">
          <ul className="flex flex-wrap gap-2">
            {[
              { label: "Projects", href: "/projects" },
              { label: "Experience", href: "/experience" },
              { label: "Timeline", href: "/timeline" },
              { label: "Resume", href: "/resume" },
              { label: "Now", href: "/now" },
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
