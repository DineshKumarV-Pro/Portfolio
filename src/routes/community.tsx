import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/community",
  label: "Community",
  title: "Community and contribution",
  metaTitle: "Community — Dinesh Kumar V",
  description:
    "Where I show up beyond the code — the communities I contribute to, the people I learn with, and the work I do to help others build.",
  eyebrow: "Where I show up",
  purpose:
    "Engineering rarely happens alone. This page will document the communities, mentors, and peers that shape the way I work — and how I try to give back.",
  expect: [
    "Communities I actively participate in and what I contribute there",
    "Mentorship, teaching, and knowledge-sharing work",
    "Events, hackathons, and meetups worth mentioning",
    "Ways to collaborate or invite me in",
  ],
  status: "Building in public",
  direction:
    "Content lands here as involvement deepens. The intent is a small, honest record of contribution rather than a long list of memberships.",
  related: [
    { label: "ALPHA CodeX", href: "/alpha-codex" },
    { label: "Speaking", href: "/speaking" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export const Route = createFileRoute("/community")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
