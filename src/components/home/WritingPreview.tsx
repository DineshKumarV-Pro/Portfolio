import { Link } from "@tanstack/react-router";
import { ArrowUpRight, PenLine } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { recentPosts } from "@/content/posts";

export function WritingPreview() {
  return (
    <section className="container-page section">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="Writing"
            title="Notes from the workbench."
            description="Essays on building software, product decisions, and the long path of a young founder — written while the work is still fresh."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Link to="/blog" className="link-arrow text-sm">
            All writing
            <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      {recentPosts.length === 0 ? (
        <Reveal delay={0.1}>
          <div className="surface-card hover-lift mt-14 grid place-items-center gap-4 p-12 text-center md:p-16">
            <div className="grid size-12 place-items-center rounded-full border border-[var(--border-strong)] bg-surface text-muted-foreground">
              <PenLine className="size-5" />
            </div>
            <h3 className="text-h2 text-foreground">The first essays are on the way.</h3>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Long-form pieces on frontend craft, product engineering, and the founder path —
              published as they&rsquo;re written, not on a schedule.
            </p>
            <Link to="/newsletter" className="link-arrow mt-2 text-sm">
              Subscribe for the first one <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-14 grid gap-5 md:grid-cols-3">
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
      )}
    </section>
  );
}
