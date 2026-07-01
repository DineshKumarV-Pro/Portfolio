import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { footerColumns } from "@/content/nav";
import { site } from "@/content/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Home">
              <span className="grid size-9 place-items-center rounded-md bg-foreground text-background font-mono text-[11px] font-bold tracking-tighter">
                {site.initials}
              </span>
              <span className="text-[17px] font-medium tracking-[-0.01em] text-foreground">
                {site.name}
                <span className="text-[var(--brand)]">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-pretty text-[15px] leading-relaxed text-muted-foreground">
              {site.tagline} Built and maintained from {site.location}.
            </p>
            <p className="mt-3 max-w-sm text-pretty text-[13px] italic text-muted-foreground/80">
              &ldquo;{site.motto}&rdquo;
            </p>

            <label htmlFor="footer-email" className="text-mono-label text-muted-foreground">
              The quiet newsletter
            </label>
            <NewsletterForm source="footer" inputId="footer-email" compact className="mt-9" />
            <p className="mt-2.5 text-mono-meta text-muted-foreground">
              Long-form essays, project notes, and quarterly updates. No spam, ever.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <SocialLink href={site.social.github} icon={Github} label="GitHub" />
              <SocialLink href={site.social.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={site.social.x} icon={Twitter} label="X / Twitter" />
              <SocialLink href={`mailto:${site.email}`} icon={Mail} label="Email" />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.label}>
                <div className="mb-4 text-mono-label text-muted-foreground">{col.label}</div>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="text-[14px] text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-mono-meta text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.role.split(" · ")[0]} · Open for 2026.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <Link to="/rss.xml" className="hover:text-foreground">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Github;
  label: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      onClick={() => trackEvent({ name: "social_click", platform: label, url: href })}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-md border border-[var(--border-strong)] text-muted-foreground transition-colors hover:border-[var(--brand)]/40 hover:text-[var(--brand)]"
    >
      <Icon className="size-4" />
    </a>
  );
}
