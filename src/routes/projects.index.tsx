import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import {
  liveProjects,
  projectCategories,
  type ProjectCategory,
  type Project,
} from "@/content/projects";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/")({
  head: buildPageHead({
    title: "Projects — Dinesh Kumar V",
    description:
      "A focused portfolio of product, AI, and UI-engineering work — built end-to-end as a frontend and product engineer.",
    path: "/projects",
  }),
  component: ProjectsPage,
});

type StatusFilter = "all" | Project["status"];

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return liveProjects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const hay = [p.title, p.tagline, p.summary, p.role, p.category, ...p.stack, ...p.tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, status, category]);

  const counts = useMemo(() => {
    return {
      total: liveProjects.length,
      shipped: liveProjects.filter((p) => p.status === "shipped").length,
      inProgress: liveProjects.filter((p) => p.status === "in-progress").length,
      concepts: liveProjects.filter((p) => p.status === "concept").length,
    };
  }, []);

  const clear = () => {
    setQuery("");
    setStatus("all");
    setCategory("all");
  };

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
          <Breadcrumbs items={[{ label: "Projects" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-5">
            <Eyebrow>Selected work</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Projects built end-to-end —
              <br className="hidden md:block" /> from problem to shipped.
            </h1>
            <p className="max-w-[62ch] text-lede text-muted-foreground">
              A focused slice of the products, AI experiments, and UI-engineering work I'm building
              right now. Each project is a case study — the problem I picked, the decisions I made,
              and the role I played — not a screenshot gallery.
            </p>
            <dl className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 text-mono-label text-muted-foreground">
              <div className="flex items-center gap-2">
                <dt>Total</dt>
                <dd className="text-foreground">{counts.total}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>Shipped</dt>
                <dd className="text-foreground">{counts.shipped}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>In progress</dt>
                <dd className="text-foreground">{counts.inProgress}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt>Concepts</dt>
                <dd className="text-foreground">{counts.concepts}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* Controls */}
        <Reveal delay={0.06} className="mt-12">
          <div className="surface-card flex flex-col gap-5 p-4 md:p-5">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, stacks, or tags…"
                aria-label="Search projects"
                className="w-full rounded-md border border-[var(--border)] bg-background/60 py-2.5 pl-9 pr-9 text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:[box-shadow:var(--shadow-ring)]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" aria-hidden />
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <FilterRow
                label="Status"
                value={status}
                onChange={(v) => setStatus(v as StatusFilter)}
                options={[
                  { value: "all", label: "All" },
                  { value: "shipped", label: "Shipped" },
                  { value: "in-progress", label: "In progress" },
                  { value: "concept", label: "Concept" },
                ]}
              />
              <FilterRow
                label="Category"
                value={category}
                onChange={(v) => setCategory(v as "all" | ProjectCategory)}
                options={[
                  { value: "all", label: "All" },
                  ...projectCategories.map((c) => ({ value: c, label: c })),
                ]}
              />
            </div>
          </div>
        </Reveal>

        {/* Results */}
        <div className="mt-12">
          {filtered.length === 0 ? (
            <div className="surface-card flex flex-col items-start gap-3 p-8 md:p-10">
              <Eyebrow>No matches</Eyebrow>
              <p className="text-pretty text-[15px] text-muted-foreground">
                Nothing matches that combination yet. Try clearing filters or searching for a stack
                you know.
              </p>
              <button onClick={clear} className="link-arrow text-sm">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:gap-6 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} delay={Math.min(0.04 * i, 0.24)}>
                  <ProjectCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Cross-links */}
        <Reveal delay={0.1} className="mt-20">
          <SectionHeading size="md" eyebrow="Keep exploring" title="Where the work continues" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {[
              { to: "/case-studies", label: "In-depth case studies" },
              { to: "/archive", label: "Project archive" },
              { to: "/experience", label: "Professional experience" },
              { to: "/skills", label: "Skills & stack" },
              { to: "/hire-me", label: "Hire me" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-surface/40 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-mono-label text-muted-foreground pr-1">{label}</span>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={
              "rounded-full border px-3 py-1 text-[12.5px] transition-colors " +
              (active
                ? "border-foreground/60 bg-foreground text-background"
                : "border-[var(--border-strong)] bg-surface/40 text-muted-foreground hover:border-foreground/40 hover:text-foreground")
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
