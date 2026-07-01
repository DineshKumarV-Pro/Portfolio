import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Tag,
  Target,
  User,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { PremiumCard } from "@/components/motion/PremiumCard";
import { Button } from "@/components/ui/button";
import { CaseStudyBody } from "@/components/work/CaseStudyBody";
import { ProductMockup } from "@/components/work/ProductMockup";
import { ProjectCard } from "@/components/work/ProjectCard";
import { StatusPill } from "@/components/work/StatusPill";
import { getProject, projects, type Project } from "@/content/projects";
import { buildPageHead, buildProjectSchema, buildBreadcrumbSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.title} — Project` : `${params.slug} — Project`;
    const description = p
      ? `${p.tagline ?? p.summary}`
      : "Project case study: problem, role, decisions, outcomes.";
    const path = `/projects/${params.slug}`;
    const base = buildPageHead({
      title,
      description,
      path,
      ogType: "website",
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
            { name: "Projects", path: "/projects" },
            { name: p.title, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectError,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <section className="container-page section" aria-labelledby="project-not-found">
      <h1 id="project-not-found" className="text-display-lg">
        Project not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        That project doesn&rsquo;t exist.{" "}
        <Link to="/projects" className="link-arrow">
          Back to all projects
        </Link>
      </p>
    </section>
  );
}

function ProjectError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container-page section" role="alert" aria-labelledby="project-error">
      <h1 id="project-error" className="text-display-lg">
        Something went wrong
      </h1>
      <p className="mt-3 text-muted-foreground">
        {import.meta.env.DEV ? error.message : "This project page failed to load."}
      </p>
      <button type="button" onClick={reset} className="link-arrow mt-4 text-sm">
        Retry
      </button>
    </section>
  );
}

function ProjectDetail() {
  const data = Route.useLoaderData() as { project: Project };
  const p = data.project;
  const related: Project[] = (p.related ?? [])
    .map((slug: string) => projects.find((x) => x.slug === slug))
    .filter((x): x is Project => Boolean(x));

  const stageLabel =
    p.status === "shipped" ? "Live" : p.status === "in-progress" ? "Active build" : "Exploration";

  return (
    <section className="relative">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-spotlight"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-dot-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="container-page relative pt-24 pb-24 md:pt-32 md:pb-32">
        {/* Top nav row */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: p.title }]} />
          <Link to="/projects" className="link-arrow text-mono-label">
            <ArrowLeft className="size-3.5" /> All projects
          </Link>
        </div>

        {/* ───────── 1 · Cinematic hero ───────── */}
        <Reveal>
          <header className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{p.category}</Eyebrow>
                <StatusPill status={p.status} />
                <span className="text-mono-label text-muted-foreground">{p.year}</span>
              </div>
              <h1 className="text-display-xl text-balance-tight text-foreground">{p.title}</h1>
              {p.tagline ? (
                <p className="max-w-[58ch] text-lede text-muted-foreground">{p.tagline}</p>
              ) : null}

              <p className="max-w-[60ch] text-pretty text-[15.5px] leading-relaxed text-foreground/85">
                {p.summary}
              </p>

              {/* Inline pills */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[var(--border-strong)] bg-surface/40 px-2.5 py-1 text-mono-meta text-foreground/85"
                  >
                    {s}
                  </span>
                ))}
                {p.stack.length > 6 ? (
                  <span className="self-center text-mono-meta text-muted-foreground/70">
                    +{p.stack.length - 6}
                  </span>
                ) : null}
              </div>

              {/* CTAs */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {p.links?.live ? (
                  <Button asChild variant="primary">
                    <a href={p.links.live} target="_blank" rel="noreferrer">
                      View live <ExternalLink className="size-4" />
                    </a>
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[var(--border-strong)] bg-surface/30 px-3.5 py-1.5 text-mono-label text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-[var(--warning)]" />
                    Live demo coming soon
                  </span>
                )}
                {p.links?.github ? (
                  <Button asChild variant="outline">
                    <a href={p.links.github} target="_blank" rel="noreferrer">
                      <Github className="size-4" /> Source
                    </a>
                  </Button>
                ) : null}
                <a href="#story" className="link-arrow text-sm">
                  Read the story <ArrowDown className="size-4" />
                </a>
              </div>
            </div>

            {/* Product preview */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,var(--brand-soft),transparent_75%)] blur-2xl" />
              <ProductMockup p={p} variant="hero" />
            </div>
          </header>
        </Reveal>

        <ProjectSectionNav />

        {/* ───────── 2 · Quick snapshot ───────── */}
        <Reveal delay={0.06} className="mt-20 md:mt-28">
          <div id="snapshot" className="scroll-mt-28">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Snapshot</Eyebrow>
                <h2 className="mt-2 text-h1 text-foreground">At a glance</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <SnapshotCard icon={<User className="size-4" />} label="Role" value={p.role} />
              <SnapshotCard
                icon={<Calendar className="size-4" />}
                label="Timeline"
                value={p.year}
              />
              <SnapshotCard
                icon={<Sparkles className="size-4" />}
                label="Stage"
                value={stageLabel}
              />
              <SnapshotCard icon={<Tag className="size-4" />} label="Category" value={p.category} />
              <SnapshotCard
                icon={<Layers className="size-4" />}
                label="Stack"
                value={`${p.stack.length} technologies`}
                tags={p.stack}
              />
              <SnapshotCard
                icon={<Target className="size-4" />}
                label="Type"
                value={p.tags.slice(0, 3).join(" · ") || p.category}
              />
              <SnapshotCard
                icon={<Sparkles className="size-4" />}
                label="Status"
                value={
                  p.status === "shipped"
                    ? "Live & in use"
                    : p.status === "in-progress"
                      ? "Active build"
                      : "Concept"
                }
              />
              <SnapshotCard
                icon={<Layers className="size-4" />}
                label="Platform"
                value={inferPlatform(p)}
              />
            </div>
          </div>
        </Reveal>

        {/* ───────── 3 · Product gallery ───────── */}
        <Reveal delay={0.06} className="mt-20 md:mt-28">
          <div id="gallery" className="scroll-mt-28">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Gallery</Eyebrow>
                <h2 className="mt-2 text-h1 text-foreground">A look at the product</h2>
              </div>
              <span className="hidden text-mono-label text-muted-foreground md:inline">
                Screenshots & mockups
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <ProductMockup p={p} variant="hero" device="browser" />
              </div>
              <GalleryPlaceholder label="Feature view" />
              <GalleryPlaceholder label="Mobile screen" />
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              Final product screenshots and motion clips drop in here as the build ships —
              placeholders keep the layout honest in the meantime.
            </p>
          </div>
        </Reveal>

        {/* ───────── 4 · Feature highlights ───────── */}
        {p.caseStudy?.features && p.caseStudy.features.length > 0 ? (
          <Reveal delay={0.06} className="mt-20 md:mt-28">
            <div className="mb-6">
              <Eyebrow>Highlights</Eyebrow>
              <h2 className="mt-2 text-h1 text-foreground">What makes it interesting</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {p.caseStudy.features.map((f, i) => (
                <FeatureCard key={i} index={i + 1} body={f} />
              ))}
            </div>
          </Reveal>
        ) : null}

        {/* ───────── 5 · Product story (case study) ───────── */}
        <div id="story" className="mt-20 md:mt-28 scroll-mt-28">
          {p.caseStudy ? (
            <>
              <Reveal>
                <div>
                  <Eyebrow>The story</Eyebrow>
                  <h2 className="mt-2 text-display-lg text-foreground text-balance-tight">
                    Why this exists, how it was built.
                  </h2>
                </div>
              </Reveal>
              <CaseStudyBody p={p} />
            </>
          ) : (
            <Reveal>
              <div className="surface-card flex flex-col gap-4 p-7 md:p-9">
                <Eyebrow>
                  {p.status === "concept" ? "Concept in development" : "Case study in progress"}
                </Eyebrow>
                <h2 className="text-h1 text-foreground text-balance-tight">
                  The deep-dive write-up is being drafted.
                </h2>
                <p className="max-w-[62ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  I publish a full case study only once a project is far enough along that the
                  decisions are honest in hindsight. The snapshot above is the canonical short
                  version — the long one is coming.
                </p>
                {p.problem ? (
                  <div className="mt-2 grid gap-5 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--border)] bg-surface/40 p-5">
                      <div className="text-mono-label text-[var(--brand)]">Problem</div>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/90">
                        {p.problem}
                      </p>
                    </div>
                    {p.impact ? (
                      <div className="rounded-xl border border-[var(--border)] bg-surface/40 p-5">
                        <div className="text-mono-label text-[var(--brand)]">Role</div>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/90">
                          {p.impact}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Reveal>
          )}
        </div>

        {/* ───────── 6 · Related ───────── */}
        {related.length > 0 ? (
          <Reveal delay={0.06} className="mt-24 md:mt-32">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Keep exploring</Eyebrow>
                <h2 className="mt-2 text-h1 text-foreground">Related work</h2>
              </div>
              <Link to="/projects" className="link-arrow text-sm">
                All projects <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:gap-6 lg:grid-cols-3">
              {related.map((r) => (
                <ProjectCard key={r.slug} p={r} dense />
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ---------- Pieces ---------- */

function ProjectSectionNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ["snapshot", "gallery", "story"];
    const els = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "snapshot", label: "Snapshot" },
    { id: "gallery", label: "Gallery" },
    { id: "story", label: "Story" },
  ];

  return (
    <nav
      aria-label="Project sections"
      className="sticky top-16 z-40 -mx-1 mb-16 mt-10 overflow-x-auto border-y border-[var(--border)] bg-background/80 py-2 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
    >
      <ul className="flex min-w-max items-center gap-1 px-1">
        {navItems.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`relative inline-flex h-9 items-center rounded-md px-3 text-[13px] font-medium transition-colors ${
                active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === s.id ? (
                <span aria-hidden className="absolute inset-0 rounded-md bg-accent/70" />
              ) : null}
              <span className="relative">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SnapshotCard({
  icon,
  label,
  value,
  tags,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tags?: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-surface/40 p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-surface/60 motion-reduce:hover:translate-y-0">
      <div className="flex items-center gap-2 text-[var(--brand)]">
        <span className="inline-flex size-7 items-center justify-center rounded-md bg-[var(--brand-soft)]">
          {icon}
        </span>
        <span className="text-mono-label text-muted-foreground">{label}</span>
      </div>
      <div className="mt-3 text-[14.5px] leading-snug text-foreground">{value}</div>
      {tags && tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((t) => (
            <li
              key={t}
              className="rounded-md border border-[var(--border)] bg-background/40 px-2 py-0.5 text-mono-meta text-muted-foreground"
            >
              {t}
            </li>
          ))}
          {tags.length > 4 ? (
            <li className="self-center text-mono-meta text-muted-foreground/70">
              +{tags.length - 4}
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}

function GalleryPlaceholder({ label }: { label: string }) {
  return (
    <div className="group relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-dashed border-[var(--border-strong)] bg-surface/30 transition-colors hover:border-[var(--brand)]/40 hover:bg-surface/50">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,var(--brand-soft),transparent_75%)] opacity-40" />
      <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
        <ImageIcon className="size-6" aria-hidden />
        <span className="text-mono-label">{label}</span>
        <span className="text-mono-meta text-muted-foreground/70">Asset coming soon</span>
      </div>
    </div>
  );
}

function FeatureCard({ index, body }: { index: number; body: string }) {
  return (
    <PremiumCard className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-surface/40 p-6">
      <div className="absolute right-5 top-5 font-display text-[28px] leading-none text-foreground/15">
        {String(index).padStart(2, "0")}
      </div>
      <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[var(--brand)]">
        <Sparkles className="size-4" />
      </div>
      <p className="mt-5 text-[14.5px] leading-relaxed text-foreground/90">{body}</p>
    </PremiumCard>
  );
}

function inferPlatform(p: Project): string {
  const s = new Set(p.stack.map((x) => x.toLowerCase()));
  const hits: string[] = [];
  if ([...s].some((x) => x.includes("react") || x.includes("tanstack") || x.includes("next"))) {
    hits.push("Web");
  }
  if (
    [...s].some(
      (x) =>
        x.includes("react native") ||
        x.includes("expo") ||
        x.includes("ios") ||
        x.includes("android"),
    )
  ) {
    hits.push("Mobile");
  }
  if (
    [...s].some(
      (x) =>
        x.includes("supabase") || x.includes("postgres") || x.includes("api") || x.includes("ai"),
    )
  ) {
    hits.push("Backend");
  }
  return hits.length > 0 ? hits.join(" · ") : "Web";
}
