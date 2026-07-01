import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { StatusPill } from "@/components/work/StatusPill";
import { getProject, caseStudyProjects, type Project } from "@/content/projects";
import { buildPageHead, buildProjectSchema, buildBreadcrumbSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project || !project.caseStudy) throw notFound();
    return { project };
  },
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.title} — Case study` : `${params.slug} — Case study`;
    const description = p ? (p.tagline ?? p.summary) : "Long-form case study.";
    const path = `/case-studies/${params.slug}`;
    const base = buildPageHead({
      title,
      description,
      path,
      ogType: "article",
    })();

    if (!p) return base;

    return {
      ...base,
      scripts: [
        jsonLdScript(
          buildProjectSchema({
            name: p.title,
            description,
            path,
            dateCreated: `${p.year}-01-01`,
            keywords: [...p.stack, ...p.tags],
            applicationCategory: p.category,
          }),
        ),
        jsonLdScript(
          buildBreadcrumbSchema([
            { name: "Case Studies", path: "/case-studies" },
            { name: p.title, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: () => (
    <section className="container-page section">
      <h1 className="text-display-lg">Case study not found</h1>
      <p className="mt-3 text-muted-foreground">
        <Link to="/case-studies" className="link-arrow">
          Back to all case studies
        </Link>
      </p>
    </section>
  ),
  errorComponent: ({ error, reset }) => (
    <section className="container-page section">
      <h1 className="text-display-lg">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{String(error?.message ?? error)}</p>
      <button onClick={reset} className="link-arrow mt-4 text-sm">
        Retry
      </button>
    </section>
  ),
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const data = Route.useLoaderData() as { project: Project };
  const p = data.project;

  const index = caseStudyProjects.findIndex((x) => x.slug === p.slug);
  const next = caseStudyProjects[(index + 1) % caseStudyProjects.length];

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
        <div className="mb-10 flex items-center justify-between gap-4">
          <Breadcrumbs
            items={[{ label: "Case studies", href: "/case-studies" }, { label: p.title }]}
          />
          <Link to="/case-studies" className="link-arrow text-mono-label">
            <ArrowLeft className="size-3.5" /> All
          </Link>
        </div>

        <Reveal>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{p.category}</Eyebrow>
              <StatusPill status={p.status} />
              <span className="text-mono-label text-muted-foreground">{p.year}</span>
            </div>
            <h1 className="text-display-xl text-balance-tight text-foreground">{p.title}</h1>
            {p.tagline ? (
              <p className="max-w-[62ch] text-lede text-muted-foreground">{p.tagline}</p>
            ) : null}
          </div>
        </Reveal>

        <CaseStudyBody p={p} />

        {next && next.slug !== p.slug ? (
          <Reveal delay={0.1} className="mt-20">
            <Link
              to="/case-studies/$slug"
              params={{ slug: next.slug }}
              className="card-interactive group flex items-center justify-between gap-6 p-7 md:p-8"
            >
              <div>
                <div className="text-mono-label text-muted-foreground">Next case study</div>
                <div className="mt-2 text-h1 text-foreground transition-colors group-hover:text-[var(--brand)]">
                  {next.title}
                </div>
                {next.tagline ? (
                  <p className="mt-1 text-[14px] text-muted-foreground">{next.tagline}</p>
                ) : null}
              </div>
              <ArrowUpRight className="size-7 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
