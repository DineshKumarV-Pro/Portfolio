import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/media-kit",
  label: "Media kit",
  title: "Media kit",
  metaTitle: "Media kit — Dinesh Kumar V",
  description:
    "Bio, headshots, and brand assets for press, collaborations, and speaking — ready to use, cleanly organised.",
  eyebrow: "Press assets",
  purpose:
    "To make it easy for organisers, journalists, and partners to represent me and ALPHA CodeX accurately, without needing to ask.",
  expect: [
    "Short, medium, and long-form bios ready to copy",
    "High-resolution headshots and logo files",
    "Topics I speak and write on, with example angles",
    "A direct contact for media and speaking inquiries",
  ],
  status: "Assembling the first release",
  direction:
    "The initial kit will publish once bios, imagery, and ALPHA CodeX brand assets are aligned. It will be versioned so external references stay accurate.",
  related: [
    { label: "About", href: "/about" },
    { label: "Speaking", href: "/speaking" },
    { label: "ALPHA CodeX", href: "/alpha-codex" },
    { label: "Contact", href: "/contact" },
  ],
};

export const Route = createFileRoute("/media-kit")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
