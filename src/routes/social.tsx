import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/social",
  label: "Social",
  title: "Find me elsewhere",
  metaTitle: "Social handles — Dinesh Kumar V",
  description:
    "Every verified social and professional profile in one place — so you always land at the real account.",
  eyebrow: "Where to reach me",
  purpose:
    "A single, canonical page that removes the guesswork about which handle is actually mine — useful for both people and search engines.",
  expect: [
    "Verified links to GitHub, LinkedIn, X, and other active platforms",
    "The preferred channel for direct messages",
    "A direct newsletter subscribe link",
    "Signals about how active I am on each platform",
  ],
  status: "Publishing soon",
  direction:
    "The list will stay short and honest — only platforms I actually check. Dormant accounts will be marked or removed rather than left to look active.",
  related: [
    { label: "Links", href: "/links" },
    { label: "Contact", href: "/contact" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "About", href: "/about" },
  ],
};

export const Route = createFileRoute("/social")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
