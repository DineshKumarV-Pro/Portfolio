import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, NotebookPen, Sparkles } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/notes",
  metaTitle: "Notes — Dinesh Kumar V",
  description:
    "A public engineering notebook — quick observations, lessons learned, and founder reflections. Short, dated, written as the work happens.",
};

export const Route = createFileRoute("/notes")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: NotesPage,
});

type NoteKind = "log" | "discovery" | "reflection";

const upcoming: { kind: NoteKind; teaser: string }[] = [
  {
    kind: "log",
    teaser: "First development log — bringing the personal site online.",
  },
  {
    kind: "discovery",
    teaser: "Small TypeScript patterns that pulled their weight this week.",
  },
  {
    kind: "reflection",
    teaser: "What being a student founder actually feels like, day to day.",
  },
];

const kindMeta: Record<NoteKind, { label: string; tone: string }> = {
  log: { label: "Dev Log", tone: "text-[var(--brand)]" },
  discovery: { label: "Discovery", tone: "text-[var(--signal)]" },
  reflection: { label: "Reflection", tone: "text-muted-foreground" },
};

function NotesPage() {
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
          <Breadcrumbs items={[{ label: "Writing", href: "/blog" }, { label: "Notes" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-6 max-w-[60ch]">
            <Eyebrow tone="accent">
              <NotebookPen className="size-3" aria-hidden /> The Notebook
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              A public engineering notebook.
            </h1>
            <p className="text-lede text-muted-foreground text-balance-pretty">
              Short entries — under two hundred words each. Development logs, small discoveries,
              lessons learned, and founder reflections, written as the work happens rather than
              polished after the fact.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="mt-16 grid gap-10 md:grid-cols-[180px_1fr]">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="text-mono-label text-muted-foreground">2026</div>
              <div className="mt-2 text-h3 text-foreground">Q3 onward</div>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                The notebook opens with the first dev log and grows from there. Newest entries will
                appear at the top.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-3 top-2 bottom-2 w-px bg-[var(--border-strong)]"
            />
            <ul className="space-y-6">
              {upcoming.map((n, i) => {
                const k = kindMeta[n.kind];
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <li className="relative pl-10">
                      <span
                        aria-hidden
                        className="absolute left-2 top-5 size-2 rounded-full bg-[var(--brand)] ring-4 ring-background"
                      />
                      <div className="surface-card hover-lift p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className={`text-mono-label ${k.tone}`}>{k.label}</span>
                          <span className="text-mono-meta text-muted-foreground">Coming soon</span>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-foreground">
                          {n.teaser}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-20">
          <div className="surface-card flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-10 place-items-center rounded-md border border-[var(--border-strong)] bg-surface text-[var(--brand)]">
                <Sparkles className="size-4" aria-hidden />
              </div>
              <div>
                <h3 className="text-h3 text-foreground">Want the long-form versions too?</h3>
                <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
                  Some notes grow into full essays on The Workbench. The newsletter is the easiest
                  way to follow both.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/blog">
                  The Workbench <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="primary">
                <Link to="/newsletter">Subscribe</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
