import { indexableRoutes } from "@/content/nav";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";
import { absoluteUrl } from "@/lib/config";

export type SitemapEntry = {
  loc: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
};

/** All URLs for sitemap.xml — static indexable + published dynamic content. */
export function getSitemapEntries(): SitemapEntry[] {
  const staticEntries: SitemapEntry[] = indexableRoutes.map((path) => ({
    loc: absoluteUrl(path),
    changefreq: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : path.startsWith("/projects") || path === "/hire-me" ? 0.8 : 0.6,
  }));

  const projectEntries: SitemapEntry[] = projects
    .filter((p) => !p.archived)
    .map((p) => ({
      loc: absoluteUrl(`/projects/${p.slug}`),
      changefreq: "monthly" as const,
      priority: p.featured ? 0.85 : 0.7,
    }));

  const caseStudyEntries: SitemapEntry[] = projects
    .filter((p) => p.caseStudy && !p.archived)
    .map((p) => ({
      loc: absoluteUrl(`/case-studies/${p.slug}`),
      changefreq: "monthly" as const,
      priority: 0.75,
    }));

  const blogEntries: SitemapEntry[] = posts
    .filter((p) => !p.placeholder)
    .map((p) => ({
      loc: absoluteUrl(`/blog/${p.slug}`),
      changefreq: "yearly" as const,
      priority: 0.65,
    }));

  const seen = new Set<string>();
  return [...staticEntries, ...projectEntries, ...caseStudyEntries, ...blogEntries].filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });
}
