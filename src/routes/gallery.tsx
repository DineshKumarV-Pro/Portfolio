import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery",
  metaTitle: "Gallery — Dinesh Kumar V",
  description:
    "Moments from behind the work — events, collaborations, workspace, and the occasional milestone worth remembering.",
  eyebrow: "Visual archive",
  purpose:
    "A quiet, human counterweight to the rest of the site — a place to show the environments and moments that make the work possible.",
  expect: [
    "Event, hackathon, and meetup photos with dates and context",
    "Workspace and behind-the-scenes shots",
    "Team and collaboration moments",
    "Credits where photos are not my own",
  ],
  status: "Curating the first set",
  direction:
    "The first collection publishes once there is enough signal to warrant a page — not a stream, but a small archive worth returning to.",
  related: [
    { label: "Journey", href: "/journey" },
    { label: "Achievements", href: "/achievements" },
    { label: "About", href: "/about" },
    { label: "Now", href: "/now" },
  ],
};

export const Route = createFileRoute("/gallery")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
