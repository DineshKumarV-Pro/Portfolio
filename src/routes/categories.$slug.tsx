import { createFileRoute, useParams } from "@tanstack/react-router";
import { ScaffoldPage, type ScaffoldMeta } from "@/lib/scaffold";

export const Route = createFileRoute("/categories/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Category` },
      {
        name: "description",
        content: `Writing, notes, and resources in the ${params.slug} category on Dinesh Kumar V's site.`,
      },
      { property: "og:title", content: `${params.slug} — Category` },
      {
        property: "og:description",
        content: `Writing, notes, and resources in the ${params.slug} category on Dinesh Kumar V's site.`,
      },
      { property: "og:url", content: `/categories/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
  }),
  component: CategoryDetail,
});

function CategoryDetail() {
  const { slug } = useParams({ from: "/categories/$slug" });
  const meta: ScaffoldMeta = {
    path: `/categories/${slug}`,
    parent: { label: "Categories", href: "/categories" },
    label: slug,
    title: `${slug}`,
    metaTitle: `${slug} — Category`,
    description: `A dedicated index of writing, notes, and resources published under the ${slug} category.`,
    eyebrow: "Category",
    purpose:
      "Every category on the site gets its own page so readers arriving with a specific interest land on a focused, filtered index rather than a general feed.",
    expect: [
      "A short introduction to what this category covers",
      "The full list of posts and notes in the category, newest first",
      "Related tags to help refine further",
      "A featured entry when there's a natural starting point",
    ],
    status: "This collection is intentionally empty while new work is being prepared",
    direction:
      "As posts under this category are published, they will appear here automatically. Until then, the main writing surfaces below cover the same ground.",
    related: [
      { label: "Blog", href: "/blog" },
      { label: "Notes", href: "/notes" },
      { label: "Tags", href: "/tags" },
      { label: "Resources", href: "/resources" },
    ],
  };
  return <ScaffoldPage meta={meta} />;
}
