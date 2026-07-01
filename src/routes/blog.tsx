import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Compass, Mail, PenLine, Search, Sparkles } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { recentPosts } from "@/content/posts";
import { buildPageHead, buildBreadcrumbSchema, jsonLdScript } from "@/lib/seo";

const meta = {
  path: "/blog",
  metaTitle: "Writing — Dinesh Kumar V",
  description:
    "Essays on frontend engineering, product building, AI, and the founder journey behind ALPHA CodeX. A long-running publication, not a content farm.",
};

export const Route = createFileRoute("/blog")({
  head: () => {
    const base = buildPageHead({
      title: meta.metaTitle,
      description: meta.description,
      path: meta.path,
    })();
    return {
      ...base,
      scripts: [jsonLdScript(buildBreadcrumbSchema([{ name: "Writing", path: "/blog" }]))],
    };
  },
  component: BlogIndex,
});

const categories = [
  { label: "Frontend Engineering", count: 0, hint: "React, TypeScript, UI craft" },
  { label: "Product Building", count: 0, hint: "From idea to shipped product" },
  { label: "AI & Tooling", count: 0, hint: "LLMs, developer experience" },
  { label: "Founder Notes", count: 0, hint: "Building ALPHA CodeX in public" },
  { label: "Computer Science", count: 0, hint: "Fundamentals, deep dives" },
  { label: "Career & Craft", count: 0, hint: "Learning, writing, growth" },
];

const topics = [
  "React",
  "TypeScript",
  "Performance",
  "Design Systems",
  "Accessibility",
  "AI Products",
  "DX",
  "Startups",
  "Learning",
];

function BlogIndex() {
  const hasPosts = recentPosts.length > 0;

  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-spotlight"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container-page relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mb-10">
          <Breadcrumbs items={[{ label: "Writing" }]} />
        </div>

        {/* Editorial hero */}
        <Reveal>
          <div className="flex flex-col gap-6 max-w-[64ch]">
            <Eyebrow tone="accent">
              <PenLine className="size-3" aria-hidden /> The Workbench
            </Eyebrow>
            <h1 className="text-display-2xl text-balance-tight text-foreground">
              Notes from building software, in public.
            </h1>
            <p className="text-lede text-muted-foreground text-balance-pretty">
              A long-running publication on frontend engineering, product building, AI, and the slow
              craft of becoming a technology founder. Written while the work is still fresh —
              published when an essay earns its place, not on a schedule.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button asChild variant="primary">
                <Link to="/newsletter">
                  Subscribe <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/notes">Read the notebook</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Search hint */}
        <Reveal delay={0.06} className="mt-12">
          <Link
            to="/search"
            className="surface-card flex items-center justify-between gap-4 px-5 py-4 hover-lift group"
          >
            <span className="flex items-center gap-3 text-sm text-muted-foreground">
              <Search className="size-4" aria-hidden />
              Search essays, notes, ideas, and resources
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        {/* Featured / Latest */}
        <div className="mt-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow={hasPosts ? "Featured" : "Issue No. 01"}
                title={hasPosts ? "Featured essay" : "The first essay is in progress."}
                description={
                  hasPosts
                    ? "The piece I most want a new reader to start with right now."
                    : "Long-form work takes time. The opening essay sets the tone for everything that follows — it's being written, not rushed."
                }
              />
            </Reveal>
            <Reveal delay={0.08}>
              <Link to="/newsletter" className="link-arrow text-sm">
                Get notified first <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          {hasPosts ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {recentPosts.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="card-interactive hover-lift group p-6"
                >
                  <div className="text-mono-label text-muted-foreground">{p.category}</div>
                  <h3 className="mt-4 text-h2 text-foreground">{p.title}</h3>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <Reveal delay={0.1} className="mt-12">
              <div className="surface-raised relative overflow-hidden p-8 md:p-12">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[var(--brand)]/10 blur-3xl"
                />
                <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <div className="text-mono-label text-[var(--brand)]">
                      In progress · Essay 001
                    </div>
                    <h3 className="mt-5 text-display-lg text-foreground text-balance-tight">
                      Why I&rsquo;m writing this site at all.
                    </h3>
                    <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                      A short essay on building in public as a student founder, what the Workbench
                      will and won&rsquo;t cover, and how to read along without the noise of another
                      algorithmic feed.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button asChild variant="primary">
                        <Link to="/newsletter">
                          Notify me when it ships <ArrowUpRight className="size-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost">
                        <Link to="/ideas">See what&rsquo;s being explored</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="surface-card aspect-[4/5] p-5">
                      <div className="text-mono-label text-muted-foreground">Draft · v0.3</div>
                      <div className="mt-6 space-y-2.5">
                        <div className="h-2 w-3/4 rounded bg-muted" />
                        <div className="h-2 w-full rounded bg-muted" />
                        <div className="h-2 w-5/6 rounded bg-muted" />
                        <div className="h-2 w-2/3 rounded bg-muted" />
                        <div className="mt-6 h-2 w-1/2 rounded bg-muted" />
                        <div className="h-2 w-full rounded bg-muted" />
                        <div className="h-2 w-4/5 rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Categories */}
        <div className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Categories"
              title="What I write about."
              description="Six overlapping threads. Every essay will sit clearly inside one of them."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.04}>
                <div className="card-interactive hover-lift p-6 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid size-9 place-items-center rounded-md border border-[var(--border-strong)] bg-surface text-[var(--brand)]">
                      <BookOpen className="size-4" aria-hidden />
                    </div>
                    <span className="text-mono-meta text-muted-foreground">
                      {c.count} {c.count === 1 ? "essay" : "essays"}
                    </span>
                  </div>
                  <h3 className="mt-5 text-h3 text-foreground">{c.label}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{c.hint}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-2 text-mono-label text-muted-foreground">
              <Sparkles className="size-3.5" aria-hidden /> Related topics
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {topics.map((t) => (
                <li key={t}>
                  <span className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-surface/60 px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Newsletter CTA */}
        <Reveal delay={0.1} className="mt-24">
          <div className="surface-card relative overflow-hidden p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <Eyebrow>
                  <Mail className="size-3" aria-hidden /> The Workbench newsletter
                </Eyebrow>
                <h3 className="mt-5 text-h1 text-foreground text-balance-tight">
                  One thoughtful email when an essay ships.
                </h3>
                <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                  No drip campaigns, no spam, no upsells. Just the writing, delivered when it earns
                  its place.
                </p>
              </div>
              <div className="flex md:justify-end">
                <Button asChild variant="primary" size="lg">
                  <Link to="/newsletter">
                    <Compass className="size-4" /> Subscribe
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
