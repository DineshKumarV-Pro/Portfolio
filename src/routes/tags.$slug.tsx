import { createFileRoute, useParams } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta } from "@/lib/scaffold";

export const Route = createFileRoute("/tags/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Tag` },
      {
        name: "description",
        content: `Writing, notes, and resources tagged ${params.slug} on Dinesh Kumar V's site.`,
      },
      { property: "og:title", content: `${params.slug} — Tag` },
      {
        property: "og:description",
        content: `Writing, notes, and resources tagged ${params.slug} on Dinesh Kumar V's site.`,
      },
      { property: "og:url", content: `/tags/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/tags/${params.slug}` }],
  }),
  component: TagDetail,
});

function TagDetail() {
  const { slug } = useParams({ from: "/tags/$slug" });
  const meta: ScaffoldMeta = {
    path: `/tags/${slug}`,
    parent: { label: "Tags", href: "/tags" },
    label: slug,
    title: `#${slug}`,
    metaTitle: `${slug} — Tag`,
    description: `A dedicated index for every post, note, and resource tagged ${slug}.`,
    eyebrow: "Tag",
    purpose:
      "Tag pages give readers a fine-grained way to explore a specific technology or idea across every writing surface on the site.",
    expect: [
      "A short line on what this tag represents",
      "All posts and notes carrying this tag, newest first",
      "Related tags for adjacent topics",
      "Links into the categories that most often use this tag",
    ],
    status: "This collection is intentionally empty while new work is being prepared",
    direction:
      "As writing tagged with this term is published, it will appear here automatically. The tag taxonomy is kept small on purpose.",
    related: [
      { label: "Tags", href: "/tags" },
      { label: "Categories", href: "/categories" },
      { label: "Blog", href: "/blog" },
      { label: "Notes", href: "/notes" },
    ],
  };
  return <ScaffoldPage meta={meta} />;
}
