import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/bookmarks",
  label: "Bookmarks",
  title: "Bookmarks worth returning to",
  metaTitle: "Bookmarks — Dinesh Kumar V",
  description:
    "Articles, talks, and tools I keep coming back to — a slow-growing shelf of things that shaped how I build and think.",
  eyebrow: "Reading list",
  purpose:
    "A curated reference for the resources that have genuinely changed how I approach engineering, product, and craft — not a link dump.",
  expect: [
    "Handpicked essays, talks, and tools organised by topic",
    "A short note on each item explaining why it earned a place",
    "Tags for quick filtering across engineering, design, and founder topics",
    "Regular pruning so only the most useful entries remain",
  ],
  status: "Actively curating",
  direction:
    "The shelf is being sorted and annotated. It will publish once the first collections feel genuinely useful rather than merely long.",
  related: [
    { label: "Resources", href: "/resources" },
    { label: "Notes", href: "/notes" },
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "/newsletter" },
  ],
};

export const Route = createFileRoute("/bookmarks")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
