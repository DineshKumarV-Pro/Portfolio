import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/vision",
  label: "Vision",
  title: "The ten-year picture",
  metaTitle: "Vision — Dinesh Kumar V",
  description:
    "Who I want to become, what I want to build, and the impact I want to create over the next decade — written to be revisited, not framed.",
  eyebrow: "Ten-year picture",
  purpose:
    "A long-horizon reference for the direction of my work and the studio, so short-term decisions have something honest to check against.",
  expect: [
    "A personal mission statement",
    "The long-term vision for ALPHA CodeX",
    "The kind of engineering and founder work I want to be known for",
    "The principles guiding the path — and the ones I refuse to compromise on",
  ],
  status: "Currently being developed",
  direction:
    "The full essay is being written slowly and honestly. A companion to /journey and /now, it will be updated as the horizon sharpens rather than shifts.",
  related: [
    { label: "ALPHA CodeX", href: "/alpha-codex" },
    { label: "Journey", href: "/journey" },
    { label: "Now", href: "/now" },
    { label: "About", href: "/about" },
  ],
};

export const Route = createFileRoute("/vision")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
