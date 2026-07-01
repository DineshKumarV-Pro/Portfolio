import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { PremiumCard } from "@/components/motion/PremiumCard";
import { ProductMockup } from "./ProductMockup";
import { StatusPill } from "./StatusPill";

export function ProjectCard({ p, dense = false }: { p: Project; dense?: boolean }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      aria-label={`Open project ${p.title}`}
      data-cursor="pointer"
      className="block h-full focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] rounded-2xl"
    >
      <PremiumCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/40 transition-[border-color,box-shadow,background-color] duration-300 ease-out hover:border-[var(--border-strong)] hover:bg-surface/60 hover:[box-shadow:0_24px_60px_-30px_rgba(0,0,0,0.45)] motion-reduce:transition-none">
        <div className="p-3 pb-0 overflow-hidden">
          <div className="transition-transform duration-500 ease-out group-hover/pcard:scale-[1.02] motion-reduce:transform-none">
            <ProductMockup p={p} variant="card" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-center justify-between text-mono-label text-muted-foreground">
            <span>
              {p.category} · {p.year}
            </span>
            <StatusPill status={p.status} />
          </div>

          <h3 className="mt-4 text-h2 text-foreground transition-colors group-hover/pcard:text-[var(--brand)]">
            {p.title}
          </h3>
          {p.tagline ? (
            <p className="mt-1.5 text-[14px] text-muted-foreground">{p.tagline}</p>
          ) : null}

          {!dense ? (
            <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">
              {p.summary}
            </p>
          ) : null}

          <div className="mt-6 flex flex-1 items-end justify-between gap-4">
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.slice(0, 3).map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-[var(--border)] bg-background/40 px-2 py-0.5 text-mono-meta text-muted-foreground transition-colors group-hover/pcard:border-[var(--border-strong)] group-hover/pcard:text-foreground/85"
                >
                  {s}
                </li>
              ))}
              {p.stack.length > 3 ? (
                <li className="self-center text-mono-meta text-muted-foreground/70">
                  +{p.stack.length - 3}
                </li>
              ) : null}
            </ul>
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-background/40 text-muted-foreground transition-all duration-200 group-hover/pcard:border-[var(--brand)]/60 group-hover/pcard:bg-[var(--brand-soft)] group-hover/pcard:text-[var(--brand)] motion-reduce:transition-none">
              <ArrowUpRight className="size-4 transition-transform group-hover/pcard:-translate-y-0.5 group-hover/pcard:translate-x-0.5 motion-reduce:transform-none" />
            </span>
          </div>
        </div>
      </PremiumCard>
    </Link>
  );
}
