import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/awards",
  label: "Awards",
  title: "Awards and recognition",
  metaTitle: "Awards — Dinesh Kumar V",
  description:
    "A record of the honours, rankings, and recognitions earned along the way — kept honest, kept short.",
  eyebrow: "Honours",
  purpose:
    "A single, verifiable place to see external recognition — for recruiters and collaborators who prefer signal over self-description.",
  expect: [
    "Award name and the organisation that issued it",
    "Date received and a short context on the recognition",
    "A link to the announcement or public source where available",
    "Only recognitions that reflect real work — never filler",
  ],
  status: "Early collection",
  direction:
    "This page grows only when a recognition is worth publishing. Rather than list every mention, it will stay a small, credible archive that gains weight over time.",
  related: [
    { label: "Achievements timeline", href: "/achievements" },
    { label: "Certifications", href: "/certifications" },
    { label: "Experience", href: "/experience" },
    { label: "Resume", href: "/resume" },
  ],
};

export const Route = createFileRoute("/awards")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
