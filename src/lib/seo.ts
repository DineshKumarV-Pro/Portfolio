import { site } from "@/content/site";
import { absoluteUrl, getSiteUrl } from "@/lib/config";

export type PageMetaInput = {
  /** Document title (browser tab) */
  title: string;
  /** Meta description */
  description: string;
  /** Path-only URL, e.g. `/about` */
  path: string;
  /** Override OG type — defaults to `website` */
  ogType?: "website" | "article" | "profile";
  /** Optional OG image path or absolute URL */
  ogImage?: string;
  /** Article-only */
  publishedTime?: string;
  modifiedTime?: string;
  /** Disable indexing for draft/scaffold pages */
  noIndex?: boolean;
};

export type HeadTag = {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
};
export type HeadLink = { rel: string; href: string; type?: string; sizes?: string };

const DEFAULT_OG_IMAGE = "/og-default.png";

export function resolveOgImage(image?: string): string {
  if (!image) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (image.startsWith("http")) return image;
  return absoluteUrl(image);
}

/** Builds TanStack Router `head()` meta + links for a page. */
export function buildPageHead(input: PageMetaInput) {
  const url = absoluteUrl(input.path);
  const ogImage = resolveOgImage(input.ogImage);
  const ogType = input.ogType ?? "website";

  const meta: HeadTag[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { name: "author", content: site.name },
    { property: "og:site_name", content: site.name },
    { property: "og:type", content: ogType },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:locale", content: "en_IN" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:creator", content: "@DineshKumar_Pro" },
  ];

  if (input.publishedTime) {
    meta.push({ property: "article:published_time", content: input.publishedTime });
  }
  if (input.modifiedTime) {
    meta.push({ property: "article:modified_time", content: input.modifiedTime });
  }
  if (input.noIndex) {
    meta.push({ name: "robots", content: "noindex, follow" });
  }

  const links: HeadLink[] = [{ rel: "canonical", href: url }];

  return () => ({ meta, links });
}

/** Root shell defaults — merged beneath route-specific head. */
export function buildRootHead() {
  const title = `${site.name} — ${site.role}`;
  const url = absoluteUrl("/");
  const ogImage = resolveOgImage();

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0a14" },
      { title },
      { name: "description", content: site.description },
      { name: "author", content: site.name },
      { property: "og:site_name", content: site.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: site.description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: site.description },
      { name: "twitter:image", content: ogImage },
    ] satisfies HeadTag[],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "alternate", href: absoluteUrl("/rss.xml"), type: "application/rss+xml" },
    ] satisfies HeadLink[],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildPersonSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(buildWebSiteSchema()),
      },
    ],
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    email: site.email,
    url: getSiteUrl() || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: site.description,
    url: getSiteUrl() || undefined,
    author: { "@type": "Person", name: site.name },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}

export function buildCreativeWorkSchema(input: {
  name: string;
  description: string;
  path: string;
  dateCreated?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    author: { "@type": "Person", name: site.name },
    dateCreated: input.dateCreated,
    keywords: input.keywords?.join(", "),
  };
}

export function buildArticleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    author: { "@type": "Person", name: site.name },
    publisher: { "@type": "Person", name: site.name },
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime ?? input.publishedTime,
  };
}

export function buildProjectSchema(input: {
  name: string;
  description: string;
  path: string;
  dateCreated?: string;
  keywords?: string[];
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    author: { "@type": "Person", name: site.name },
    dateCreated: input.dateCreated,
    keywords: input.keywords?.join(", "),
    applicationCategory: input.applicationCategory ?? "DeveloperApplication",
    operatingSystem: "Web",
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}
