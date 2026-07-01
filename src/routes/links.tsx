import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/links",
  label: "Links",
  title: "Every important link, in one place",
  metaTitle: "Links — Dinesh Kumar V",
  description:
    "A minimal link hub — the fastest way to reach my work, writing, socials, and current focus from a single URL.",
  eyebrow: "Link in bio",
  purpose:
    "A lightweight surface designed for bios, business cards, and quick shares — one memorable URL that always points to the right place.",
  expect: [
    "The highest-priority CTA at the top (hiring, current focus, or a launch)",
    "Direct links to Projects, Writing, ALPHA CodeX, and Contact",
    "Verified social and professional profiles",
    "Kept intentionally short — no more than fits on one screen",
  ],
  status: "Publishing soon",
  direction:
    "The link set will be pruned to the essentials, matched to the site's design language, and updated whenever the highlighted CTA changes.",
  related: [
    { label: "Social", href: "/social" },
    { label: "Contact", href: "/contact" },
    { label: "Projects", href: "/projects" },
    { label: "Hire me", href: "/hire-me" },
  ],
};

export const Route = createFileRoute("/links")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
