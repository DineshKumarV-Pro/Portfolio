import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Sprout, Eye, GitPullRequest } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/open-source")({
  head: buildPageHead({
    title: "Open source — Dinesh Kumar V",
    description:
      "How I think about open source, what I'm working toward publishing, and where to find my public code as it lands.",
    path: "/open-source",
  }),
  component: OpenSourcePage,
});

function OpenSourcePage() {
  const principles = [
    {
      icon: Sprout,
      title: "Publish when it's useful",
      body: "I'd rather ship one repo that solves a real problem than ten that look impressive. Public code should pay rent on its README.",
    },
    {
      icon: Eye,
      title: "Build in public",
      body: "As ALPHA CodeX matures, the design system primitives, content models, and small utilities behind it will be extracted into their own repositories.",
    },
    {
      icon: GitPullRequest,
      title: "Contribute deliberately",
      body: "PRs I open will be focused: documentation fixes, accessibility improvements, and small features in the React / TypeScript / TanStack ecosystem I rely on daily.",
    },
  ];

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
          <Breadcrumbs items={[{ label: "Open Source" }]} />
        </div>

        <Reveal>
          <div className="flex flex-col gap-5">
            <Eyebrow>Public code</Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              The honest version: I'm building toward it.
            </h1>
            <p className="max-w-[62ch] text-lede text-muted-foreground">
              I don't yet have a curated set of open-source contributions worth featuring here, and
              I'm not going to fabricate one. What I do have is a plan, a working public profile,
              and a growing set of internal tools that will graduate into their own repositories as
              ALPHA CodeX matures.
            </p>
            {site.social?.github ? (
              <div className="mt-2 flex flex-wrap gap-3">
                <Button asChild variant="primary">
                  <a href={site.social.github} target="_blank" rel="noreferrer">
                    <Github className="size-4" /> Follow on GitHub
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/projects">
                    See my projects <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
          <SectionHeading size="md" eyebrow="How I'll approach it" title="Three principles" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="surface-card p-6">
                <Icon className="size-5 text-[var(--brand)]" aria-hidden />
                <h3 className="mt-4 text-h3 text-foreground">{title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-14">
          <div className="surface-card flex flex-col gap-4 p-7 md:p-8">
            <Eyebrow>On the roadmap</Eyebrow>
            <h2 className="text-h1 text-foreground text-balance-tight">
              What's likely to land publicly next.
            </h2>
            <ul className="mt-2 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--brand)]/70"
                />
                <span>
                  A small TanStack Start starter with the content patterns, design tokens, and
                  motion primitives I use across this site.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--brand)]/70"
                />
                <span>
                  Reusable React + Tailwind components extracted from ZenoKart's storefront — empty
                  states, status pills, filter rows.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--brand)]/70"
                />
                <span>
                  Targeted PRs to the libraries I depend on every day — accessibility fixes and
                  documentation first.
                </span>
              </li>
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link to="/now" className="link-arrow text-sm">
                What I'm working on now <ArrowUpRight className="size-4" />
              </Link>
              <Link to="/contact" className="link-arrow text-sm">
                Suggest something to open-source <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
