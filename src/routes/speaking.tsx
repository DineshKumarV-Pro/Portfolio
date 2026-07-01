import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/speaking",
  label: "Speaking",
  title: "Talks and workshops",
  metaTitle: "Speaking — Dinesh Kumar V",
  description:
    "Talks, workshops, and guest sessions — past, upcoming, and the topics I'm happy to be invited on.",
  eyebrow: "Talks & workshops",
  purpose:
    "To make it easy for organisers to understand what I speak on, where I've spoken, and how to invite me.",
  expect: [
    "Topics I speak on, with example angles and audiences",
    "Past talks with dates, venues, and recordings where available",
    "Upcoming engagements",
    "A clear inquiry route for organisers",
  ],
  status: "Future publication",
  direction:
    "This page will open once the first talks are behind me. Until then, invitations are still welcome — see the contact page.",
  related: [
    { label: "Media kit", href: "/media-kit" },
    { label: "About", href: "/about" },
    { label: "ALPHA CodeX", href: "/alpha-codex" },
    { label: "Contact", href: "/contact" },
  ],
};

export const Route = createFileRoute("/speaking")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
