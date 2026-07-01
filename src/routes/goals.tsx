import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/goals",
  label: "Goals",
  title: "Goals across horizons",
  metaTitle: "Goals — Dinesh Kumar V",
  description:
    "What I'm working toward this quarter, this year, and over the next three years — across career, craft, and the studio.",
  eyebrow: "Looking ahead",
  purpose:
    "Goals are worth publishing when they invite accountability. This page will show what I'm committed to — clearly enough that progress is easy to measure.",
  expect: [
    "This quarter's focused set of goals",
    "This year's larger commitments across career, craft, and founder work",
    "The three-year horizon guiding trade-offs today",
    "Honest notes on progress, revised as the season changes",
  ],
  status: "Publishing soon",
  direction:
    "The first version will be short and specific. It will be revisited quarterly, with older goals kept in an archive rather than deleted.",
  related: [
    { label: "Now", href: "/now" },
    { label: "Vision", href: "/vision" },
    { label: "Journey", href: "/journey" },
    { label: "About", href: "/about" },
  ],
};

export const Route = createFileRoute("/goals")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
