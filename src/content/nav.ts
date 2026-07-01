import type { ComponentType } from "react";
import {
  Briefcase,
  User,
  Sparkles,
  Mail,
  FolderGit2,
  FileText,
  Award,
  Trophy,
  GraduationCap,
  Wrench,
  Layers,
  Newspaper,
  Tag,
  BookOpen,
  Lightbulb,
  StickyNote,
  Image,
  MessageSquareQuote,
  ThumbsUp,
  Rocket,
  Github,
  Users,
  Mic,
  Package,
  Link2,
  AtSign,
  Inbox,
  Bookmark,
  Archive,
  Target,
  Eye,
  Clock,
  HelpCircle,
  Download,
  Handshake,
  Settings2,
  Search,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
};

export type NavGroup = { label: string; items: NavItem[] };

/** Primary header navigation — kept intentionally short for clarity. */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" },
];

/** Mega-menu / full sitemap grouped by intent. */
export const navGroups: NavGroup[] = [
  {
    label: "Work",
    items: [
      {
        label: "Projects",
        href: "/projects",
        icon: FolderGit2,
        description: "Selected product & engineering work",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        icon: FileText,
        description: "Deep-dive process write-ups",
      },
      { label: "Archive", href: "/archive", icon: Archive, description: "Everything I've shipped" },
      {
        label: "Open Source",
        href: "/open-source",
        icon: Github,
        description: "Public repositories & contributions",
      },
    ],
  },
  {
    label: "Writing",
    items: [
      { label: "Blog", href: "/blog", icon: Newspaper, description: "Essays on building software" },
      { label: "Categories", href: "/categories", icon: BookOpen },
      { label: "Tags", href: "/tags", icon: Tag },
      {
        label: "Notes",
        href: "/notes",
        icon: StickyNote,
        description: "Short technical observations",
      },
      {
        label: "Ideas",
        href: "/ideas",
        icon: Lightbulb,
        description: "Concepts, experiments, drafts",
      },
      {
        label: "Resources",
        href: "/resources",
        icon: Package,
        description: "Tools, templates, references",
      },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About me", href: "/about", icon: User },
      { label: "Journey", href: "/journey", icon: Sparkles },
      { label: "Experience", href: "/experience", icon: Briefcase },
      { label: "Education", href: "/education", icon: GraduationCap },
      { label: "Skills", href: "/skills", icon: Wrench },
      { label: "Uses", href: "/uses", icon: Layers },
      { label: "Now", href: "/now", icon: Clock },
      { label: "Goals", href: "/goals", icon: Target },
      { label: "Vision", href: "/vision", icon: Eye },
      { label: "Timeline", href: "/timeline", icon: Clock },
    ],
  },
  {
    label: "Credibility",
    items: [
      { label: "Certifications", href: "/certifications", icon: Award },
      { label: "Achievements", href: "/achievements", icon: Trophy },
      { label: "Awards", href: "/awards", icon: Trophy },
      { label: "Testimonials", href: "/testimonials", icon: MessageSquareQuote },
      { label: "Recommendations", href: "/recommendations", icon: ThumbsUp },
      { label: "Gallery", href: "/gallery", icon: Image },
    ],
  },
  {
    label: "Brand",
    items: [
      {
        label: "ALPHA CodeX",
        href: "/alpha-codex",
        icon: Rocket,
        description: "The product studio I'm founding",
      },
      { label: "Community", href: "/community", icon: Users },
      { label: "Speaking", href: "/speaking", icon: Mic },
      { label: "Media Kit", href: "/media-kit", icon: Package },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "Hire me", href: "/hire-me", icon: Handshake },
      { label: "Services", href: "/services", icon: Settings2 },
      { label: "Contact", href: "/contact", icon: Mail },
      { label: "Resume", href: "/resume", icon: Download },
      { label: "Newsletter", href: "/newsletter", icon: Inbox },
      { label: "Links", href: "/links", icon: Link2 },
      { label: "Social", href: "/social", icon: AtSign },
      { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
      { label: "FAQ", href: "/faq", icon: HelpCircle },
      { label: "Search", href: "/search", icon: Search },
    ],
  },
];

/** Routes published for crawlers (excludes dynamic + utility routes). */
export const indexableRoutes: string[] = [
  "/",
  "/about",
  "/journey",
  "/experience",
  "/education",
  "/skills",
  "/now",
  "/uses",
  "/resume",
  "/hire-me",
  "/services",
  "/contact",
  "/faq",
  "/goals",
  "/vision",
  "/timeline",
  "/projects",
  "/archive",
  "/case-studies",
  "/certifications",
  "/achievements",
  "/awards",
  "/blog",
  "/categories",
  "/tags",
  "/search",
  "/resources",
  "/ideas",
  "/notes",
  "/gallery",
  "/testimonials",
  "/recommendations",
  "/alpha-codex",
  "/open-source",
  "/community",
  "/speaking",
  "/media-kit",
  "/links",
  "/social",
  "/newsletter",
  "/bookmarks",
  "/privacy",
  "/terms",
];

export const footerColumns: NavGroup[] = [
  {
    label: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Now", href: "/now" },
      { label: "Journey", href: "/journey" },
      { label: "Timeline", href: "/timeline" },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Archive", href: "/archive" },
      { label: "Open Source", href: "/open-source" },
      { label: "ALPHA CodeX", href: "/alpha-codex" },
    ],
  },
  {
    label: "Writing",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Notes", href: "/notes" },
      { label: "Ideas", href: "/ideas" },
      { label: "Resources", href: "/resources" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    label: "Profile",
    items: [
      { label: "Experience", href: "/experience" },
      { label: "Education", href: "/education" },
      { label: "Skills", href: "/skills" },
      { label: "Certifications", href: "/certifications" },
      { label: "Achievements", href: "/achievements" },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "Hire me", href: "/hire-me" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "Resume", href: "/resume" },
      { label: "Links", href: "/links" },
    ],
  },
];
