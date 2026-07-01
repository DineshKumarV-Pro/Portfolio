import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/terms",
  label: "Terms",
  title: "Terms of use",
  metaTitle: "Terms — Dinesh Kumar V",
  description:
    "The terms that apply when you use this website and its content — kept short, plain, and current.",
  eyebrow: "Legal",
  purpose:
    "To make ownership, permitted use, and disclaimers clear, so this site can be shared, cited, and referenced with confidence.",
  expect: [
    "Ownership and copyright notice for site content",
    "Permitted use and attribution guidance",
    "Disclaimer for external links and third-party content",
    "Last-updated date and contact for questions",
  ],
  status: "Publishing before the site is publicly launched",
  direction:
    "The final terms will publish alongside the privacy policy. Any material change will be reflected in the last-updated date.",
  related: [
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ],
};

export const Route = createFileRoute("/terms")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
