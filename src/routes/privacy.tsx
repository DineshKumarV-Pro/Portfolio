import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta, buildScaffoldHead } from "@/lib/scaffold";

const meta: ScaffoldMeta = {
  path: "/privacy",
  label: "Privacy",
  title: "Privacy policy",
  metaTitle: "Privacy policy — Dinesh Kumar V",
  description:
    "How this site handles your data — analytics, cookies, and newsletter information — written in plain language.",
  eyebrow: "Legal",
  purpose:
    "To be transparent about the small amount of data this site collects, how it's used, and how to reach me with any request.",
  expect: [
    "The analytics provider in use and what it records",
    "How cookies are used, and how to opt out",
    "How newsletter and contact-form data is handled",
    "Contact route for privacy requests and the last-updated date",
  ],
  status: "Publishing before the site is publicly launched",
  direction:
    "The final policy will be short, accurate, and versioned. It publishes alongside the analytics and newsletter stack being finalised.",
  related: [
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
    { label: "Newsletter", href: "/newsletter" },
  ],
};

export const Route = createFileRoute("/privacy")({
  head: buildScaffoldHead(meta),
  component: () => <ScaffoldPage meta={meta} />,
});
