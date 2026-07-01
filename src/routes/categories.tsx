import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/categories",
  label: "Categories",
  title: "Browse by category",
  metaTitle: "Categories — Dinesh Kumar V",
  description:
    "A topic index for everything published on this site — writing, notes, ideas, and resources grouped by theme.",
  eyebrow: "Topic index",
  purpose:
    "To make the writing surface navigable by intent, so readers can go straight to engineering, product, founder, or craft topics without scrolling.",
  expect: [
    "A clean list of active categories with post counts",
    "A short description of what each category covers",
    "One featured piece per category as an entry point",
    "Cross-links into related notes and resources",
  ],
  status: "Publishing alongside the blog",
  direction:
    "Categories will open up as the writing catalogue grows enough to warrant real navigation. Until then, the blog index remains the source of truth.",
  related: [
    { label: "Blog", href: "/blog" },
    { label: "Notes", href: "/notes" },
    { label: "Ideas", href: "/ideas" },
    { label: "Resources", href: "/resources" },
  ],
};

export const Route = createFileRoute("/categories")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
