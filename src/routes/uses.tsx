import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/uses",
  label: "Uses",
  title: "The setup behind the work",
  metaTitle: "Uses — Dinesh Kumar V",
  description:
    "The hardware, software, and workflow I actually rely on to design, build, and ship — kept honest and current.",
  eyebrow: "Workflow",
  purpose:
    "A transparent look at the tools behind the output. Useful for anyone comparing stacks, setting up their own, or just curious about how I work day to day.",
  expect: [
    "Laptop, monitor, and everyday hardware",
    "Editor, terminal, and core development tools",
    "Design, productivity, and AI tools in daily rotation",
    "Browsers, extensions, and hosting stack",
  ],
  status: "Publishing soon",
  direction:
    "The first version will be small and accurate. It will be revisited whenever something in the stack meaningfully changes, not on a schedule.",
  related: [
    { label: "Now", href: "/now" },
    { label: "Skills", href: "/skills" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
};

export const Route = createFileRoute("/uses")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
