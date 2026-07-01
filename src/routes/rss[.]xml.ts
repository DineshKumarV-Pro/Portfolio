import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { site } from "@/content/site";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/config";
import { escapeXml } from "@/lib/xml";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const siteLink = absoluteUrl("/");

        const blogItems = posts
          .filter((p) => !p.placeholder)
          .map((p) =>
            rssItem({
              title: p.title,
              link: absoluteUrl(`/blog/${p.slug}`),
              description: p.excerpt,
              pubDate: p.publishedAt,
            }),
          );

        const projectItems = projects
          .filter((p) => p.featured && !p.archived)
          .slice(0, 5)
          .map((p) =>
            rssItem({
              title: `${p.title} — Project`,
              link: absoluteUrl(`/projects/${p.slug}`),
              description: p.summary,
              pubDate: `${p.year}-01-01`,
            }),
          );

        const items = [...blogItems, ...projectItems].join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — Writing & Work`)}</title>
    <link>${escapeXml(siteLink)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

function rssItem(input: { title: string; link: string; description: string; pubDate?: string }) {
  const pub = input.pubDate ? new Date(input.pubDate).toUTCString() : new Date().toUTCString();
  return `<item>
  <title>${escapeXml(input.title)}</title>
  <link>${escapeXml(input.link)}</link>
  <guid isPermaLink="true">${escapeXml(input.link)}</guid>
  <description>${escapeXml(input.description)}</description>
  <pubDate>${pub}</pubDate>
</item>`;
}
