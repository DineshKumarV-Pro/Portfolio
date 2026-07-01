import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, Inbox, Lock, Mail, Sparkles } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { buildPageHead } from "@/lib/seo";

const meta = {
  path: "/newsletter",
  metaTitle: "Newsletter — Dinesh Kumar V",
  description:
    "The Workbench newsletter — one thoughtful email when a new essay ships. Frontend, product, AI, and the founder journey behind ALPHA CodeX.",
};

export const Route = createFileRoute("/newsletter")({
  head: buildPageHead({
    title: meta.metaTitle,
    description: meta.description,
    path: meta.path,
  }),
  component: NewsletterPage,
});

const promises = [
  "One email per essay — sent only when something is actually published.",
  "Long-form thinking, not link round-ups or growth-hack threads.",
  "Frontend, product, AI, and the founder journey behind ALPHA CodeX.",
  "One-click unsubscribe, anytime. Your address stays private.",
];

const topics = [
  "Frontend engineering",
  "TypeScript & React",
  "Product building",
  "AI products",
  "Developer experience",
  "Founder notes",
];

function NewsletterPage() {
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
          <Breadcrumbs items={[{ label: "Writing", href: "/blog" }, { label: "Newsletter" }]} />
        </div>

        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          {/* Left: editorial */}
          <Reveal>
            <div className="flex flex-col gap-6 max-w-[58ch]">
              <Eyebrow tone="accent">
                <Inbox className="size-3" aria-hidden /> The Workbench
              </Eyebrow>
              <h1 className="text-display-xl text-balance-tight text-foreground">
                One thoughtful email when an essay ships.
              </h1>
              <p className="text-lede text-muted-foreground text-balance-pretty">
                The Workbench is a slow-publish newsletter. No daily digest, no auto-drip sequence,
                no upsells. When a new long-form piece goes live on the site, it goes out — and only
                then.
              </p>

              <ul className="mt-2 space-y-3">
                {promises.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/90"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[var(--brand)]"
                      aria-hidden
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right: subscribe card */}
          <Reveal delay={0.08}>
            <div className="surface-raised relative overflow-hidden p-7 md:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-[var(--brand)]/15 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-md border border-[var(--border-strong)] bg-surface text-[var(--brand)]">
                    <Mail className="size-4" aria-hidden />
                  </div>
                  <div>
                    <div className="text-mono-label text-muted-foreground">Subscribe</div>
                    <div className="text-h3 text-foreground">Join The Workbench</div>
                  </div>
                </div>

                <div className="relative mt-6 flex flex-col gap-3">
                  <NewsletterForm source="newsletter-page" inputId="newsletter-page-email" />
                  <p className="mt-2 inline-flex items-center gap-2 text-mono-meta text-muted-foreground">
                    <Lock className="size-3.5" aria-hidden />
                    Your address stays private. Unsubscribe anytime.
                  </p>
                  <p className="text-mono-meta text-muted-foreground">
                    Provider integration is stubbed — wire{" "}
                    <code className="rounded bg-surface px-1 py-0.5 font-mono text-[11px]">
                      VITE_NEWSLETTER_PROVIDER
                    </code>{" "}
                    when ready.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Topics */}
        <div className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow={
                <>
                  <Sparkles className="size-3" aria-hidden /> Topics
                </>
              }
              title="What you&rsquo;ll actually read about."
              description="A small set of overlapping interests. If two or three of these line up with how you work, you&rsquo;ll find a home here."
            />
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {topics.map((t, i) => (
              <Reveal key={t} delay={i * 0.04}>
                <li className="card-interactive hover-lift p-5">
                  <div className="text-[15px] font-medium text-foreground">{t}</div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Philosophy */}
        <Reveal delay={0.08} className="mt-20">
          <div className="surface-card p-7 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="text-mono-label text-muted-foreground">Publishing philosophy</div>
                <h3 className="mt-3 text-h2 text-foreground text-balance-tight">
                  Write less. Mean more.
                </h3>
              </div>
              <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  The Workbench will never optimise for frequency. Each essay is meant to age well —
                  the kind of post I&rsquo;d want to find six months later when I&rsquo;m stuck on
                  the same problem.
                </p>
                <p>
                  If that means a quiet inbox for a few weeks at a time, that&rsquo;s the trade. The
                  aim is a small, attentive audience that reads everything, not a large one that
                  reads nothing.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/blog">
                  Browse the publication <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/ideas">See what&rsquo;s being explored</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
