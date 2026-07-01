import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/faq",
  label: "FAQ",
  title: "Frequently asked questions",
  metaTitle: "FAQ — Dinesh Kumar V",
  description:
    "Short, direct answers to the questions recruiters, clients, and collaborators ask most often.",
  eyebrow: "Common questions",
  purpose:
    "A single page that removes friction from first conversations — availability, working style, services, and how to get in touch, all in one place.",
  expect: [
    "A one-line self-introduction and current focus",
    "Availability for roles, freelance, and collaborations",
    "How to work with me and what to expect from the process",
    "A short explanation of ALPHA CodeX and the long-term direction",
  ],
  status: "Consolidating from other pages",
  direction:
    "Answers are being distilled from Hire Me, Services, Now, and Contact so this page becomes a fast, honest reference — not a duplicate.",
  related: [
    { label: "Hire me", href: "/hire-me" },
    { label: "Services", href: "/services" },
    { label: "Now", href: "/now" },
    { label: "Contact", href: "/contact" },
  ],
};

export const Route = createFileRoute("/faq")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
