import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Atom,
  BookMarked,
  Brain,
  Code2,
  Compass,
  Layers,
  Package,
  PenTool,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/resources",
  metaTitle: "Resources — Dinesh Kumar V",
  description:
    "A small, opinionated library of tools, docs, books, and references I actually return to — across frontend, AI, product, and learning.",
};

export const Route = createFileRoute("/resources")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: ResourcesPage,
});

type Resource = { name: string; why: string; href?: string };
type Section = {
  title: string;
  blurb: string;
  icon: typeof Code2;
  items: Resource[];
};

const sections: Section[] = [
  {
    title: "Frontend & React",
    blurb: "Foundations and references I keep returning to while shipping UIs.",
    icon: Code2,
    items: [
      { name: "React docs (react.dev)", why: "The single source of truth — read it twice." },
      { name: "TanStack Router & Query", why: "Type-safe routing and the right way to do data." },
      { name: "MDN Web Docs", why: "The browser platform, explained without marketing." },
    ],
  },
  {
    title: "TypeScript",
    blurb: "Resources that change how you think in types, not just how you type.",
    icon: Atom,
    items: [
      { name: "Total TypeScript essentials", why: "Patterns that hold up in real codebases." },
      { name: "TypeScript handbook", why: "Free, official, and consistently underrated." },
    ],
  },
  {
    title: "UI & Product Design",
    blurb: "How things look, feel, and behave — not just how they render.",
    icon: PenTool,
    items: [
      { name: "Refactoring UI", why: "The book that made me take visual hierarchy seriously." },
      {
        name: "Linear, Vercel, Stripe sites",
        why: "Studied as products, not just inspiration boards.",
      },
    ],
  },
  {
    title: "AI & Tooling",
    blurb: "Where I learn how modern AI products are actually built.",
    icon: Brain,
    items: [
      { name: "OpenAI & Anthropic docs", why: "Start at the model layer, not the wrapper." },
      { name: "Latent Space podcast", why: "Honest conversations about applied AI." },
    ],
  },
  {
    title: "Developer Tools",
    blurb: "The small set of tools earning a place in daily work.",
    icon: Wrench,
    items: [
      { name: "VS Code + Vim mode", why: "Familiar, fast, scriptable." },
      { name: "Vite", why: "The dev experience I won't go back from." },
      { name: "GitHub", why: "Code, issues, and the long memory of every project." },
    ],
  },
  {
    title: "Books & Learning",
    blurb: "A short shelf — quality over quantity.",
    icon: BookMarked,
    items: [
      {
        name: "Designing Data-Intensive Applications",
        why: "Systems thinking for product engineers.",
      },
      { name: "The Pragmatic Programmer", why: "Holds up decades later." },
      { name: "Show Your Work — Austin Kleon", why: "Why building in public matters." },
    ],
  },
];

function ResourcesPage() {
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
          <Breadcrumbs items={[{ label: "Writing", href: "/blog" }, { label: "Resources" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-6 max-w-[62ch]">
            <Eyebrow tone="accent">
              <Package className="size-3" aria-hidden /> Curated library
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">The short shelf.</h1>
            <p className="text-lede text-muted-foreground text-balance-pretty">
              A small, opinionated set of tools, docs, books, and references I actually return to.
              No affiliate links, no padded lists — just the things that earned a place in how I
              work.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="surface-card h-full p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div className="grid size-10 place-items-center rounded-md border border-[var(--border-strong)] bg-surface text-[var(--brand)]">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-h3 text-foreground">{s.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                        {s.blurb}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {s.items.map((r) => (
                      <li
                        key={r.name}
                        className="group flex flex-col gap-1 border-t border-[var(--border)] pt-4 first:border-0 first:pt-0"
                      >
                        <span className="text-[15px] font-medium text-foreground">{r.name}</span>
                        <span className="text-[14px] leading-relaxed text-muted-foreground">
                          {r.why}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08} className="mt-20">
          <SectionHeading
            size="md"
            eyebrow={
              <>
                <Layers className="size-3" aria-hidden /> Editorial principle
              </>
            }
            title="Quality over quantity, always."
            description="This library will stay deliberately small. A new entry has to displace an old one — that's the only way it stays useful."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <Link to="/newsletter">
                <Compass className="size-4" /> Subscribe for additions
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">
                Suggest a resource <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
