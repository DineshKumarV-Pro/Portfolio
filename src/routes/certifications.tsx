import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Award, ExternalLink, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/certifications",
  metaTitle: "Certifications — Dinesh Kumar V",
  description:
    "Verified course completions, platform certificates, and credentials supporting Dinesh Kumar V's frontend, AI, and product engineering work — with skills, projects, and verification links.",
};

export const Route = createFileRoute("/certifications")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: CertificationsPage,
});

type CertStatus = "Verified" | "In Progress" | "Planned";

type Certification = {
  title: string;
  issuer: string;
  category: "Frontend" | "Programming" | "AI" | "Product" | "Cloud" | "Foundations";
  year: string;
  yearSort: number;
  status: CertStatus;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
  appliedIn?: string[];
  outcome: string;
};

const certifications: Certification[] = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    category: "Frontend",
    year: "2024",
    yearSort: 2024,
    status: "In Progress",
    skills: ["HTML5", "CSS3", "Flexbox", "Grid", "Accessibility"],
    appliedIn: ["Weatherly Wave", "Portfolio v1"],
    outcome:
      "Built mobile-first layouts and accessible markup that translated directly into shipped projects.",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    category: "Programming",
    year: "2024",
    yearSort: 2024,
    status: "In Progress",
    skills: ["JavaScript", "ES6+", "Algorithms", "Problem Solving"],
    appliedIn: ["DSA practice on LeetCode", "ZentraTask AI"],
    outcome:
      "Sharpened core JavaScript and problem-solving patterns used across every frontend project.",
  },
  {
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    category: "Frontend",
    year: "2025",
    yearSort: 2025,
    status: "Planned",
    skills: ["React", "Hooks", "State management", "Component design"],
    outcome: "Formal validation of the React patterns already used in shipped client work.",
  },
  {
    title: "TypeScript Fundamentals",
    issuer: "Self-directed coursework",
    category: "Programming",
    year: "2025",
    yearSort: 2025,
    status: "In Progress",
    skills: ["TypeScript", "Generics", "Type-safe APIs"],
    appliedIn: ["ALPHA CodeX", "ZentraTask AI"],
    outcome: "Moving every personal and client project to strict TypeScript by default.",
  },
  {
    title: "Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    category: "AI",
    year: "2025",
    yearSort: 2025,
    status: "Planned",
    skills: ["Prompt design", "LLM tooling", "Structured outputs"],
    outcome: "Strengthening the AI layer behind ZentraTask AI and internal automation.",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    category: "Foundations",
    year: "2025",
    yearSort: 2025,
    status: "Planned",
    skills: ["SQL", "Joins", "Window functions"],
    outcome: "Backing the data-modelling work for ALPHA CodeX and ZenoKart.",
  },
];

const STATUS_TONE: Record<CertStatus, string> = {
  Verified: "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
  "In Progress": "border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]",
  Planned: "border-[var(--border-strong)] bg-surface/60 text-muted-foreground",
};

const CATEGORIES = [
  "All",
  "Frontend",
  "Programming",
  "AI",
  "Product",
  "Cloud",
  "Foundations",
] as const;

function CertificationsPage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const list =
      category === "All" ? certifications : certifications.filter((c) => c.category === category);
    return [...list].sort((a, b) => b.yearSort - a.yearSort);
  }, [category]);

  const verifiedCount = certifications.filter((c) => c.status === "Verified").length;
  const inProgress = certifications.filter((c) => c.status === "In Progress").length;
  const planned = certifications.filter((c) => c.status === "Planned").length;

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
          <Breadcrumbs items={[{ label: "Certifications" }]} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>
              <ShieldCheck className="size-3" aria-hidden /> Verified learning
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Credentials backing the work, not replacing it.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              A growing collection of hands-on certifications across frontend engineering,
              programming fundamentals, and AI. Every entry is paired with the projects it was
              applied in — credentials should compound, not collect.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.04} className="mt-10">
          <dl className="grid grid-cols-3 gap-3 sm:max-w-md">
            {[
              { label: "Verified", value: verifiedCount },
              { label: "In progress", value: inProgress },
              { label: "Planned", value: planned },
            ].map((s) => (
              <div key={s.label} className="surface-card p-4">
                <dt className="text-mono-meta text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 text-h2 text-foreground">{String(s.value).padStart(2, "0")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-mono-meta text-muted-foreground">Filter</span>
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1 text-[13px] transition-colors focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] ${
                    active
                      ? "border-[var(--brand)]/40 bg-[var(--brand-soft)] text-[var(--brand)]"
                      : "border-[var(--border-strong)] bg-surface/40 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((c, i) => (
            <Reveal key={c.title} delay={i === 0 ? 0 : 0.03}>
              <article className="surface-card group flex h-full flex-col p-6 transition-colors hover:border-foreground/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid size-10 place-items-center rounded-lg border border-[var(--border-strong)] bg-surface/60">
                      <Award className="size-4 text-[var(--brand)]" aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-h3 text-foreground">{c.title}</h2>
                      <p className="mt-0.5 text-[14px] text-muted-foreground">
                        {c.issuer} · {c.year}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-mono-meta ${STATUS_TONE[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">{c.outcome}</p>

                <div className="mt-5">
                  <div className="text-mono-label text-muted-foreground">Skills</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[var(--border)] bg-surface/60 px-2 py-0.5 text-[12.5px] text-foreground/85"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {c.appliedIn ? (
                  <div className="mt-4">
                    <div className="text-mono-label text-muted-foreground">Applied in</div>
                    <p className="mt-2 text-[13.5px] text-foreground/80">
                      {c.appliedIn.join(" · ")}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-mono-meta text-muted-foreground">
                  <span>{c.credentialId ? `ID · ${c.credentialId}` : "Credential pending"}</span>
                  {c.verifyUrl ? (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground"
                    >
                      Verify <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Reveal className="mt-10">
            <div className="surface-card p-8 text-center text-[14.5px] text-muted-foreground">
              No certifications in this category yet. New entries land here as they're earned.
            </div>
          </Reveal>
        ) : null}

        {/* Philosophy */}
        <Reveal delay={0.05} className="mt-20">
          <div className="surface-card p-7 md:p-9">
            <Eyebrow tone="accent">Philosophy</Eyebrow>
            <h3 className="mt-5 text-h1 text-balance-tight text-foreground">
              Certificates are evidence, not identity.
            </h3>
            <p className="mt-4 max-w-[64ch] text-[15.5px] leading-relaxed text-muted-foreground">
              The strongest credential is shipped work. Certifications add a useful second signal —
              that the fundamentals behind that work are deliberate, tested, and continuing to grow.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "Projects", href: "/projects" },
                { label: "Skills", href: "/skills" },
                { label: "Achievements", href: "/achievements" },
                { label: "Resume", href: "/resume" },
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
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-16">
          <SectionHeading
            size="md"
            eyebrow="See it applied"
            title="Every credential here maps to a project."
            description="Open the work section to see the same skills shipped in production."
          />
        </Reveal>
      </div>
    </section>
  );
}
