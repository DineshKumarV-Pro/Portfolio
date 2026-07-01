import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/tags",
  label: "Tags",
  title: "Browse by tag",
  metaTitle: "Tags — Dinesh Kumar V",
  description:
    "A finer-grained way to explore the writing — every post, note, and resource organised by the specific technologies and ideas it touches.",
  eyebrow: "Tag index",
  purpose:
    "Tags exist for readers who arrive with a specific interest — React, TypeScript, AI, systems thinking — and want the shortest path to the writing that covers it.",
  expect: [
    "A complete list of tags used across the site",
    "Post and note counts per tag",
    "Filtered indexes at /tags/<slug> for each tag",
    "Cross-links into related categories and resources",
  ],
  status: "Publishing alongside the blog",
  direction:
    "The tag taxonomy stays intentionally small. New tags are added only when there are at least a few pieces of writing behind them.",
  related: [
    { label: "Blog", href: "/blog" },
    { label: "Categories", href: "/categories" },
    { label: "Notes", href: "/notes" },
    { label: "Resources", href: "/resources" },
  ],
};

export const Route = createFileRoute("/tags")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
