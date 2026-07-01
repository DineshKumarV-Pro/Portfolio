import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    label: "Mission",
    body: "Close the gap between human potential and real-world achievement — through an execution-focused technology ecosystem.",
  },
  {
    label: "Vision",
    body: "A globally respected studio building products that help people learn, build, and create lasting impact through technology.",
  },
  {
    label: "Stage",
    body: "Year one. Platform, brand, and founding products are being designed and engineered in the open.",
  },
];

export function AlphaCodexBand() {
  return (
    <section className="container-page py-12 md:py-20">
      <Reveal>
        <div className="surface-raised relative overflow-hidden p-8 md:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-spotlight-strong" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:linear-gradient(120deg,black,transparent_70%)]"
          />
          <div className="relative grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-2.5 py-1 text-mono-label text-[var(--brand)]">
                The studio · founder-led
              </div>
              <h2 className="mt-7 max-w-2xl text-display-xl text-balance-tight text-foreground">
                ALPHA CodeX — a long-term home for the products I want to build.
              </h2>
              <p className="mt-5 max-w-xl text-lede text-balance-pretty text-muted-foreground">
                Developer tools, learning systems, and AI-assisted products — connected into one
                ecosystem. Designed and engineered as a multi-year practice, not a one-off launch.
              </p>
              <div className="mt-8 hidden h-px w-12 bg-[var(--brand)] md:block" />
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Button asChild variant="primary" size="lg" className="hover-lift">
                <Link to="/alpha-codex">
                  Explore the studio <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-lift">
                <Link to="/vision">Read the vision</Link>
              </Button>
            </div>
          </div>

          <dl className="relative mt-12 grid gap-6 border-t border-border pt-10 md:mt-16 md:grid-cols-3 md:gap-10">
            {pillars.map((p) => (
              <div key={p.label}>
                <dt className="text-mono-label text-[var(--brand)]">{p.label}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-foreground/90">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
