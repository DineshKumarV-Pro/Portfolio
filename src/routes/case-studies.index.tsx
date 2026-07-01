import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ProductMockup } from "@/components/work/ProductMockup";
import { StatusPill } from "@/components/work/StatusPill";
import { caseStudyProjects } from "@/content/projects";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case studies — Dinesh Kumar V" },
      {
        name: "description",
        content:
          "Long-form case studies of product, AI, and UI-engineering work — context, decisions, trade-offs, and outcomes.",
      },
      { property: "og:title", content: "Case studies — Dinesh Kumar V" },
      {
        property: "og:description",
        content:
          "Long-form write-ups of the work behind selected projects — the decisions and trade-offs, not the screenshots.",
      },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
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
          <Breadcrumbs items={[{ label: "Case studies" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-5">
            <Eyebrow>Deep dives</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              The decisions behind the work —
              <br className="hidden md:block" /> not just the screenshots.
            </h1>
            <p className="max-w-[62ch] text-lede text-muted-foreground">
              A small set of long-form case studies. Each one walks through the problem I picked,
              the people I built it for, the design and engineering decisions, what broke, what I
              learned, and what I'd carry forward.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:gap-8 lg:grid-cols-2">
          {caseStudyProjects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={Math.min(0.05 * i, 0.2)}>
                <Link
                  to="/case-studies/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/40 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-surface/60 hover:[box-shadow:0_24px_60px_-30px_rgba(0,0,0,0.45)] motion-reduce:hover:translate-y-0"
                >
                  <div className="p-3 pb-0">
                    <ProductMockup p={p} variant="card" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center gap-3 text-mono-label text-muted-foreground">
                      <span className="text-foreground/80">{String(i + 1).padStart(2, "0")}</span>
                      <span>{p.year}</span>
                      <StatusPill status={p.status} />
                    </div>
                    <h2 className="mt-4 text-h1 text-foreground transition-colors group-hover:text-[var(--brand)]">
                      {p.title}
                    </h2>
                    {p.tagline ? (
                      <p className="mt-2 text-[15px] text-muted-foreground">{p.tagline}</p>
                    ) : null}
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((s) => (
                        <li
                          key={s}
                          className="rounded-md border border-[var(--border)] bg-background/40 px-2 py-0.5 text-mono-meta text-muted-foreground"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-mono-label text-muted-foreground">Read case study</span>
                      <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-16">
          <div className="surface-card flex flex-col gap-3 p-6 md:p-7">
            <Eyebrow>More on the way</Eyebrow>
            <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
              I publish a case study only once a project is far enough along that the decisions are
              honest in hindsight. As ZenoKart and the Skill Exchange Platform progress, they'll
              join the list here.
            </p>
            <div className="mt-1">
              <Link to="/projects" className="link-arrow text-sm">
                See all projects <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
