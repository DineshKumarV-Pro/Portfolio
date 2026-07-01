import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { StatusPill } from "@/components/work/StatusPill";
import { projects, type Project } from "@/content/projects";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/archive")({
  head: buildPageHead({
    title: "Project archive — Dinesh Kumar V",
    description:
      "Every project I've shipped — current work, older builds, learning projects, and experiments — grouped by year.",
    path: "/archive",
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const groups = new Map<number, Project[]>();
  for (const p of [...projects].sort((a, b) => b.yearSort - a.yearSort)) {
    const arr = groups.get(p.yearSort) ?? [];
    arr.push(p);
    groups.set(p.yearSort, arr);
  }
  const years = Array.from(groups.keys()).sort((a, b) => b - a);

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
          <Breadcrumbs items={[{ label: "Archive" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-5">
            <Eyebrow>Searchable index</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Everything I've built — by year.
            </h1>
            <p className="max-w-[62ch] text-lede text-muted-foreground">
              A complete record of the projects I've shipped, including the early learning builds
              and small experiments that don't earn a spot on the front page. Each one is here
              because it taught me something I still use.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {years.map((year) => (
            <Reveal key={year}>
              <div className="grid gap-6 md:grid-cols-[160px_1fr] md:gap-10">
                <div>
                  <div className="text-mono-label text-muted-foreground">Year</div>
                  <div className="mt-1 font-display text-[44px] leading-none tracking-tight text-foreground">
                    {year}
                  </div>
                  <div className="mt-3 text-mono-meta text-muted-foreground">
                    {groups.get(year)?.length}{" "}
                    {groups.get(year)?.length === 1 ? "project" : "projects"}
                  </div>
                </div>

                <ul className="flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {groups.get(year)!.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: p.slug }}
                        className="group grid gap-4 py-5 md:grid-cols-[1.4fr_1fr_auto] md:items-center md:gap-8"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-h2 text-foreground transition-colors group-hover:text-[var(--brand)]">
                              {p.title}
                            </h3>
                            <StatusPill status={p.status} />
                            {p.archived ? (
                              <span className="rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-mono-label text-muted-foreground">
                                Archived
                              </span>
                            ) : null}
                          </div>
                          {p.tagline ? (
                            <p className="mt-1.5 text-[14px] text-muted-foreground">{p.tagline}</p>
                          ) : (
                            <p className="mt-1.5 line-clamp-2 text-[14px] text-muted-foreground">
                              {p.summary}
                            </p>
                          )}
                        </div>
                        <ul className="flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 4).map((s) => (
                            <li
                              key={s}
                              className="rounded-md border border-[var(--border)] bg-surface/50 px-2 py-0.5 text-mono-meta text-muted-foreground"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                        <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
