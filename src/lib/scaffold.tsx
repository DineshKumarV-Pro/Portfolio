import { Link } from "@tanstack/react-router";
import { ArrowRight, Circle, Compass, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { buildPageHead, jsonLdScript, buildBreadcrumbSchema } from "@/lib/seo";

export type ScaffoldRelated = { label: string; href: string };

export type ScaffoldMeta = {
  path: string;
  parent?: { label: string; href: string };
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  purpose: string;
  expect: string[];
  status: string;
  direction: string;
  related?: ScaffoldRelated[];
};

/** Scaffold route head with full SEO + breadcrumb JSON-LD. */
export function buildScaffoldHead(meta: ScaffoldMeta) {
  const base = buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
    noIndex: meta.status.toLowerCase().includes("development"),
  });

  return () => {
    const head = base();
    const crumbs = meta.parent
      ? [{ name: meta.parent.label, path: meta.parent.href }, { name: meta.label }]
      : [{ name: meta.label, path: meta.path }];

    return {
      ...head,
      scripts: [jsonLdScript(buildBreadcrumbSchema(crumbs))],
    };
  };
}

export function ScaffoldPage({ meta }: { meta: ScaffoldMeta }) {
  const crumbs = meta.parent ? [meta.parent, { label: meta.label }] : [{ label: meta.label }];

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
          <Breadcrumbs items={crumbs} />
        </div>

        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow>
              <Circle className="size-2.5 fill-amber-400 text-amber-400" aria-hidden />
              {meta.eyebrow}
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">{meta.title}</h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              {meta.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-16 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="surface-card p-7 md:p-8">
            <div className="flex items-center gap-2 text-mono-label text-muted-foreground">
              <Compass className="size-3.5" aria-hidden />
              Why this page exists
            </div>
            <p className="mt-5 text-pretty text-[15.5px] leading-relaxed text-foreground/85">
              {meta.purpose}
            </p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <div className="flex items-center gap-2 text-mono-label text-muted-foreground">
              <Sparkles className="size-3.5" aria-hidden />
              What will live here
            </div>
            <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              {meta.expect.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-[var(--brand)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 surface-card p-7 md:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
            <div className="inline-flex h-fit items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface/60 px-3 py-1.5 text-mono-label text-muted-foreground">
              <Circle className="size-2 fill-[var(--brand)] text-[var(--brand)]" aria-hidden />
              {meta.status}
            </div>
            <p className="text-pretty text-[15.5px] leading-relaxed text-foreground/85">
              {meta.direction}
            </p>
          </div>
        </Reveal>

        {meta.related && meta.related.length > 0 ? (
          <Reveal delay={0.15} className="mt-16">
            <SectionHeading
              size="md"
              eyebrow="In the meantime"
              title="Explore what's already published"
              description="Finished surfaces that cover the same ground while this page is being developed."
            />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {meta.related.map((r) => (
                <li key={r.href}>
                  <Link
                    to={r.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-surface/40 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    {r.label}
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <Link to="/hire-me">
                  See how to work with me
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
