import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Copy,
  Mail,
  PenLine,
  Share2,
  User,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/common/Reveal";
import { PremiumCard } from "@/components/motion/PremiumCard";
import { Eyebrow } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { buildPageHead, buildArticleSchema, buildBreadcrumbSchema, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const title = `${formatSlug(params.slug)} — Writing`;
    const description =
      "An essay from The Workbench — long-form writing on frontend engineering, product building, AI, and the founder journey.";
    const path = `/blog/${params.slug}`;
    const base = buildPageHead({
      title,
      description,
      path,
      ogType: "article",
    })();
    return {
      ...base,
      scripts: [
        jsonLdScript(
          buildArticleSchema({
            title,
            description,
            path,
          }),
        ),
        jsonLdScript(
          buildBreadcrumbSchema([
            { name: "Writing", path: "/blog" },
            { name: title, path },
          ]),
        ),
      ],
    };
  },
  component: ArticlePage,
});

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ArticlePage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const title = formatSlug(slug);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied", { description: url });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <article className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-spotlight"
      />

      <div className="container-page relative pt-24 pb-12 md:pt-32">
        <div className="mb-10">
          <Breadcrumbs items={[{ label: "Writing", href: "/blog" }, { label: title }]} />
        </div>

        {/* Hero */}
        <Reveal>
          <div className="mx-auto max-w-[760px] flex flex-col gap-6">
            <Eyebrow tone="accent">
              <PenLine className="size-3" aria-hidden /> Essay · Draft
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">{title}</h1>
            <p className="text-lede text-muted-foreground text-balance-pretty">
              This essay is being written. The route, metadata, and reading experience are ready —
              the words will follow when the idea is fully formed.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-mono-meta text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <User className="size-3.5" aria-hidden /> Dinesh Kumar V
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" aria-hidden /> ~ Coming soon
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--brand)]" />
                In progress
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Body */}
      <div className="container-prose pb-20">
        <Reveal delay={0.05}>
          <div className="space-y-7 text-[17px] leading-[1.78] text-foreground/90">
            <p className="text-balance-pretty">
              <span className="float-left mr-3 mt-1 font-display text-[3.5rem] leading-none text-[var(--brand)]">
                T
              </span>
              his post hasn&rsquo;t been published yet. When it goes live, this page will host the
              full essay — wrapped in the same reading experience used across every piece on The
              Workbench: generous measure, calm typography, syntax-highlighted code, and a quiet
              reading progress indicator at the top of the window.
            </p>
            <p>
              Everything around the writing is intentionally minimal. No popups, no autoplay, no
              engagement bait. Just the argument, in the order it deserves.
            </p>

            <div className="my-10 border-l-2 border-[var(--brand)] pl-5 italic text-muted-foreground transition-all duration-500 hover:border-[var(--brand-hover)] hover:pl-6">
              &ldquo;Write the post you wish you&rsquo;d found six months ago.&rdquo;
            </div>

            <p>
              If you want to be the first to read it, the newsletter is the most reliable channel.
              Otherwise, this page will fill itself in when the draft is ready.
            </p>
          </div>
        </Reveal>

        {/* Share + Newsletter */}
        <Reveal delay={0.1} className="mt-16">
          <div className="surface-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-7">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Share2 className="size-4" aria-hidden />
              Share this essay when it&rsquo;s live — the link is permanent.
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md border border-[var(--border-strong)] bg-surface px-3 py-1.5 text-mono-meta text-muted-foreground">
                /blog/{slug}
              </span>
              <Button variant="outline" size="sm" onClick={copyLink} className="btn-press">
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied" : "Copy link"}
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/newsletter">
                  <Mail className="size-3.5" /> Subscribe
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Prev / Next / Back */}
        <Reveal delay={0.12} className="mt-10">
          <div className="grid gap-3 md:grid-cols-3">
            <Link
              to="/blog"
              className="block focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] rounded-xl"
            >
              <PremiumCard className="card-interactive hover-lift group h-full p-5">
                <div className="text-mono-label text-muted-foreground">All essays</div>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-foreground">
                  <ArrowLeft className="size-4" /> Back to The Workbench
                </div>
              </PremiumCard>
            </Link>
            <Link
              to="/notes"
              className="block focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] rounded-xl"
            >
              <PremiumCard className="card-interactive hover-lift group h-full p-5">
                <div className="text-mono-label text-muted-foreground">Companion</div>
                <div className="mt-2 inline-flex items-center justify-between gap-2 text-sm text-foreground">
                  Read the notebook <ArrowUpRight className="size-4" />
                </div>
              </PremiumCard>
            </Link>
            <Link
              to="/ideas"
              className="block focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] rounded-xl"
            >
              <PremiumCard className="card-interactive hover-lift group h-full p-5">
                <div className="text-mono-label text-muted-foreground">Next</div>
                <div className="mt-2 inline-flex items-center justify-between gap-2 text-sm text-foreground">
                  Ideas being explored <ArrowRight className="size-4" />
                </div>
              </PremiumCard>
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
