import type { ComponentType } from "react";
import {
  FolderGit2,
  FileText,
  Archive,
  Github,
  Newspaper,
  BookOpen,
  Tag,
  StickyNote,
  Lightbulb,
  Package,
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  Wrench,
  Layers,
  Clock,
  Target,
  Eye,
  Award,
  Trophy,
  MessageSquareQuote,
  ThumbsUp,
  Image as ImageIcon,
  Rocket,
  Users,
  Mic,
  Handshake,
  Settings2,
  Mail,
  Download,
  Inbox,
  Link2,
  AtSign,
  Bookmark,
  HelpCircle,
  Search,
  Home,
  FileCode2,
  Compass,
} from "lucide-react";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";

export type SearchGroup =
  | "Pages"
  | "Projects"
  | "Case Studies"
  | "Writing"
  | "Profile"
  | "Credibility"
  | "Brand"
  | "Connect"
  | "Skills"
  | "Experience";

export type SearchEntry = {
  id: string;
  title: string;
  description?: string;
  href: string;
  group: SearchGroup;
  icon: ComponentType<{ className?: string }>;
  keywords: string[];
  breadcrumb: string[];
  external?: boolean;
};

const pageEntries: SearchEntry[] = [
  {
    id: "home",
    title: "Home",
    description: "Overview & selected work",
    href: "/",
    group: "Pages",
    icon: Home,
    breadcrumb: ["Home"],
    keywords: ["landing", "start", "intro"],
  },
  {
    id: "projects",
    title: "Projects",
    description: "Selected product & engineering work",
    href: "/projects",
    group: "Projects",
    icon: FolderGit2,
    breadcrumb: ["Work", "Projects"],
    keywords: ["portfolio", "work", "builds", "products"],
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Deep-dive process write-ups",
    href: "/case-studies",
    group: "Case Studies",
    icon: FileText,
    breadcrumb: ["Work", "Case Studies"],
    keywords: ["writeup", "deep dive", "process"],
  },
  {
    id: "archive",
    title: "Archive",
    description: "Everything shipped, chronologically",
    href: "/archive",
    group: "Projects",
    icon: Archive,
    breadcrumb: ["Work", "Archive"],
    keywords: ["history", "backlog"],
  },
  {
    id: "open-source",
    title: "Open Source",
    description: "Public repositories & contributions",
    href: "/open-source",
    group: "Projects",
    icon: Github,
    breadcrumb: ["Work", "Open Source"],
    keywords: ["github", "oss", "contributions"],
  },
  {
    id: "alpha-codex",
    title: "ALPHA CodeX",
    description: "The technology studio I'm founding",
    href: "/alpha-codex",
    group: "Brand",
    icon: Rocket,
    breadcrumb: ["Brand", "ALPHA CodeX"],
    keywords: ["founder", "startup", "studio", "vision", "mission", "ecosystem"],
  },

  {
    id: "blog",
    title: "Blog",
    description: "Essays on building software",
    href: "/blog",
    group: "Writing",
    icon: Newspaper,
    breadcrumb: ["Writing", "Blog"],
    keywords: ["articles", "posts", "essays"],
  },
  {
    id: "categories",
    title: "Categories",
    description: "Browse writing by category",
    href: "/categories",
    group: "Writing",
    icon: BookOpen,
    breadcrumb: ["Writing", "Categories"],
    keywords: [],
  },
  {
    id: "tags",
    title: "Tags",
    description: "Browse writing by tag",
    href: "/tags",
    group: "Writing",
    icon: Tag,
    breadcrumb: ["Writing", "Tags"],
    keywords: [],
  },
  {
    id: "notes",
    title: "Notes",
    description: "Short technical observations",
    href: "/notes",
    group: "Writing",
    icon: StickyNote,
    breadcrumb: ["Writing", "Notes"],
    keywords: ["devlog", "learnings"],
  },
  {
    id: "ideas",
    title: "Ideas",
    description: "Concepts, experiments, drafts",
    href: "/ideas",
    group: "Writing",
    icon: Lightbulb,
    breadcrumb: ["Writing", "Ideas"],
    keywords: ["concepts", "experiments"],
  },
  {
    id: "resources",
    title: "Resources",
    description: "Tools, templates, references",
    href: "/resources",
    group: "Writing",
    icon: Package,
    breadcrumb: ["Writing", "Resources"],
    keywords: ["tools", "stack", "recommendations"],
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Subscribe for occasional dispatches",
    href: "/newsletter",
    group: "Writing",
    icon: Inbox,
    breadcrumb: ["Writing", "Newsletter"],
    keywords: ["subscribe", "email"],
  },

  {
    id: "about",
    title: "About",
    description: "Who I am, in one page",
    href: "/about",
    group: "Profile",
    icon: User,
    breadcrumb: ["About"],
    keywords: ["bio", "story"],
  },
  {
    id: "journey",
    title: "Journey",
    description: "How I got here",
    href: "/journey",
    group: "Profile",
    icon: Sparkles,
    breadcrumb: ["About", "Journey"],
    keywords: ["story", "path"],
  },
  {
    id: "experience",
    title: "Experience",
    description: "Roles, internships, work",
    href: "/experience",
    group: "Profile",
    icon: Briefcase,
    breadcrumb: ["About", "Experience"],
    keywords: ["work", "roles", "career"],
  },
  {
    id: "education",
    title: "Education",
    description: "Academic background",
    href: "/education",
    group: "Profile",
    icon: GraduationCap,
    breadcrumb: ["About", "Education"],
    keywords: ["school", "college", "degree"],
  },
  {
    id: "skills",
    title: "Skills",
    description: "What I work with, honestly",
    href: "/skills",
    group: "Profile",
    icon: Wrench,
    breadcrumb: ["About", "Skills"],
    keywords: ["tech", "stack", "abilities"],
  },
  {
    id: "uses",
    title: "Uses",
    description: "Hardware, software, setup",
    href: "/uses",
    group: "Profile",
    icon: Layers,
    breadcrumb: ["About", "Uses"],
    keywords: ["setup", "gear", "tools"],
  },
  {
    id: "now",
    title: "Now",
    description: "What I'm focused on right now",
    href: "/now",
    group: "Profile",
    icon: Clock,
    breadcrumb: ["About", "Now"],
    keywords: ["current", "focus", "today"],
  },
  {
    id: "goals",
    title: "Goals",
    description: "Short & long-term targets",
    href: "/goals",
    group: "Profile",
    icon: Target,
    breadcrumb: ["About", "Goals"],
    keywords: ["objectives", "plans"],
  },
  {
    id: "vision",
    title: "Vision",
    description: "The 50-year direction",
    href: "/vision",
    group: "Profile",
    icon: Eye,
    breadcrumb: ["About", "Vision"],
    keywords: ["future", "mission"],
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "Milestones by year",
    href: "/timeline",
    group: "Profile",
    icon: Clock,
    breadcrumb: ["About", "Timeline"],
    keywords: ["milestones", "history"],
  },

  {
    id: "certifications",
    title: "Certifications",
    description: "Verified credentials",
    href: "/certifications",
    group: "Credibility",
    icon: Award,
    breadcrumb: ["Credibility", "Certifications"],
    keywords: ["credentials", "certs"],
  },
  {
    id: "achievements",
    title: "Achievements",
    description: "Academic & technical milestones",
    href: "/achievements",
    group: "Credibility",
    icon: Trophy,
    breadcrumb: ["Credibility", "Achievements"],
    keywords: ["milestones", "wins"],
  },
  {
    id: "awards",
    title: "Awards",
    description: "Recognition received",
    href: "/awards",
    group: "Credibility",
    icon: Trophy,
    breadcrumb: ["Credibility", "Awards"],
    keywords: ["recognition"],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "What people say",
    href: "/testimonials",
    group: "Credibility",
    icon: MessageSquareQuote,
    breadcrumb: ["Credibility", "Testimonials"],
    keywords: ["reviews", "quotes"],
  },
  {
    id: "recommendations",
    title: "Recommendations",
    description: "Professional endorsements",
    href: "/recommendations",
    group: "Credibility",
    icon: ThumbsUp,
    breadcrumb: ["Credibility", "Recommendations"],
    keywords: ["endorsements"],
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Visual highlights",
    href: "/gallery",
    group: "Credibility",
    icon: ImageIcon,
    breadcrumb: ["Credibility", "Gallery"],
    keywords: ["photos", "visuals"],
  },

  {
    id: "community",
    title: "Community",
    description: "Where I show up",
    href: "/community",
    group: "Brand",
    icon: Users,
    breadcrumb: ["Brand", "Community"],
    keywords: ["events", "people"],
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "Talks & appearances",
    href: "/speaking",
    group: "Brand",
    icon: Mic,
    breadcrumb: ["Brand", "Speaking"],
    keywords: ["talks"],
  },
  {
    id: "media-kit",
    title: "Media Kit",
    description: "Press, logos, bio",
    href: "/media-kit",
    group: "Brand",
    icon: Package,
    breadcrumb: ["Brand", "Media Kit"],
    keywords: ["press", "assets", "logo"],
  },

  {
    id: "hire-me",
    title: "Hire me",
    description: "Availability & how to work together",
    href: "/hire-me",
    group: "Connect",
    icon: Handshake,
    breadcrumb: ["Connect", "Hire me"],
    keywords: ["work", "hiring", "internship", "job", "freelance"],
  },
  {
    id: "services",
    title: "Services",
    description: "What I offer",
    href: "/services",
    group: "Connect",
    icon: Settings2,
    breadcrumb: ["Connect", "Services"],
    keywords: ["offerings", "packages"],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch",
    href: "/contact",
    group: "Connect",
    icon: Mail,
    breadcrumb: ["Connect", "Contact"],
    keywords: ["email", "reach", "message"],
  },
  {
    id: "resume",
    title: "Resume",
    description: "One-page CV",
    href: "/resume",
    group: "Connect",
    icon: Download,
    breadcrumb: ["Connect", "Resume"],
    keywords: ["cv", "download"],
  },
  {
    id: "links",
    title: "Links",
    description: "Everywhere I am online",
    href: "/links",
    group: "Connect",
    icon: Link2,
    breadcrumb: ["Connect", "Links"],
    keywords: ["socials"],
  },
  {
    id: "social",
    title: "Social",
    description: "Social profiles",
    href: "/social",
    group: "Connect",
    icon: AtSign,
    breadcrumb: ["Connect", "Social"],
    keywords: ["twitter", "linkedin", "github"],
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    description: "Things worth keeping",
    href: "/bookmarks",
    group: "Connect",
    icon: Bookmark,
    breadcrumb: ["Connect", "Bookmarks"],
    keywords: ["saved"],
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Common questions",
    href: "/faq",
    group: "Connect",
    icon: HelpCircle,
    breadcrumb: ["Connect", "FAQ"],
    keywords: ["questions", "help"],
  },
  {
    id: "search",
    title: "Search",
    description: "Search the entire site",
    href: "/search",
    group: "Pages",
    icon: Search,
    breadcrumb: ["Search"],
    keywords: ["find", "lookup"],
  },
];

const projectEntries: SearchEntry[] = projects.map((p) => ({
  id: `project:${p.slug}`,
  title: p.title,
  description: p.tagline ?? p.summary,
  href: `/projects/${p.slug}`,
  group: p.caseStudy ? "Case Studies" : "Projects",
  icon: p.caseStudy ? FileText : FolderGit2,
  breadcrumb: [p.caseStudy ? "Case Studies" : "Projects", p.title],
  keywords: [p.category, p.status, p.year, ...(p.tags ?? []), ...(p.stack ?? []), p.role],
}));

const caseStudyEntries: SearchEntry[] = projects
  .filter((p) => p.caseStudy)
  .map((p) => ({
    id: `case:${p.slug}`,
    title: `${p.title} — Case study`,
    description: "Full deep-dive write-up",
    href: `/case-studies/${p.slug}`,
    group: "Case Studies",
    icon: FileCode2,
    breadcrumb: ["Case Studies", p.title],
    keywords: [p.category, ...(p.tags ?? []), ...(p.stack ?? [])],
  }));

const postEntries: SearchEntry[] = posts
  .filter((p) => !p.placeholder)
  .map((p) => ({
    id: `post:${p.slug}`,
    title: p.title,
    description: p.excerpt,
    href: `/blog/${p.slug}`,
    group: "Writing",
    icon: Newspaper,
    breadcrumb: ["Writing", "Blog", p.title],
    keywords: [p.category, ...(p.tags ?? [])],
  }));

const skillTerms = Array.from(
  new Set(skillGroups.flatMap((g) => g.items.map((s) => (typeof s === "string" ? s : s.name)))),
);

const skillEntries: SearchEntry[] = skillGroups.map((g) => ({
  id: `skillgroup:${g.label}`,
  title: g.label,
  description: g.description,
  href: "/skills",
  group: "Skills",
  icon: Wrench,
  breadcrumb: ["Skills", g.label],
  keywords: g.items.map((s) => (typeof s === "string" ? s : s.name)),
}));

const experienceEntries: SearchEntry[] = experience.map((e, i) => ({
  id: `exp:${i}`,
  title: `${e.role} · ${e.org}`,
  description: e.summary,
  href: "/experience",
  group: "Experience",
  icon: Briefcase,
  breadcrumb: ["Experience", e.org],
  keywords: [e.type, e.start, e.end, e.org],
}));

export const searchEntries: SearchEntry[] = [
  ...pageEntries,
  ...projectEntries,
  ...caseStudyEntries,
  ...postEntries,
  ...skillEntries,
  ...experienceEntries,
];

export const searchTaxonomy = {
  skillTerms,
  categories: Array.from(new Set(projects.map((p) => p.category))),
  technologies: Array.from(new Set(projects.flatMap((p) => p.stack))),
  years: Array.from(new Set(projects.map((p) => p.year))),
};

/** Very small, dependency-free ranker. */
export function rankEntries(query: string, entries = searchEntries): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries;
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of entries) {
    const title = entry.title.toLowerCase();
    const desc = (entry.description ?? "").toLowerCase();
    const kw = entry.keywords.join(" ").toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (title === t) score += 100;
      else if (title.startsWith(t)) score += 60;
      else if (title.includes(t)) score += 35;
      if (desc.includes(t)) score += 12;
      if (kw.includes(t)) score += 18;
      if (entry.breadcrumb.some((b) => b.toLowerCase().includes(t))) score += 8;
    }
    if (score > 0) scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}

export function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return [{ text, match: false }];
  const parts: { text: string; match: boolean }[] = [];
  const lower = text.toLowerCase();
  const needle = q.toLowerCase();
  let i = 0;
  while (i < text.length) {
    const idx = lower.indexOf(needle, i);
    if (idx === -1) {
      parts.push({ text: text.slice(i), match: false });
      break;
    }
    if (idx > i) parts.push({ text: text.slice(i, idx), match: false });
    parts.push({ text: text.slice(idx, idx + needle.length), match: true });
    i = idx + needle.length;
  }
  return parts;
}

export const compassIcon = Compass;
