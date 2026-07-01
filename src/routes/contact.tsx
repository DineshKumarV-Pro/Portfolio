import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow, SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/content/site";
import { buildPageHead, buildFaqSchema, jsonLdScript } from "@/lib/seo";
import { inquiryTypes, type InquiryType, type ContactFormValues } from "@/lib/forms/schemas";
import { validateContactForm } from "@/lib/forms/contact";
import { trackEvent } from "@/lib/analytics";
import { FORM_LIMITS } from "@/lib/constants";

const meta = {
  path: "/contact",
  metaTitle: "Contact — Dinesh Kumar V",
  description:
    "Get in touch with Dinesh Kumar V — frontend developer, product builder, and founder of ALPHA CodeX. Email, social, or send a structured message via the form.",
};

const faqs = [
  {
    q: "How quickly do you reply?",
    a: "Within 24–48 hours on weekdays. Recruiter and client messages get priority.",
  },
  {
    q: "What timezone do you work in?",
    a: "India Standard Time (UTC+5:30). I'm comfortable overlapping a few hours with US and EU teams.",
  },
  {
    q: "Do you accept cold pitches?",
    a: 'Yes, if they\'re specific. Vague "interested in your work" notes without context tend to get a one-line reply.',
  },
  {
    q: "How is my information handled?",
    a: "Form submissions go directly to my inbox. I don't store, share, or use them for marketing.",
  },
];

export const Route = createFileRoute("/contact")({
  head: () => {
    const base = buildPageHead({
      title: meta.metaTitle,
      description: meta.description,
      path: meta.path,
    })();
    return {
      ...base,
      scripts: [jsonLdScript(buildFaqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))))],
    };
  },
  component: ContactPage,
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    best: "Best for serious inquiries and detailed briefs.",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/dineshkumarvpro",
    href: site.social.linkedin,
    best: "Best for recruiter outreach and professional context.",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "DineshKumarV-Pro",
    href: site.social.github,
    best: "Best for open-source and code-level conversations.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
    best: "For urgent recruiter or client matters only.",
  },
];

function ContactPage() {
  const [inquiry, setInquiry] = useState<InquiryType>("Recruiter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>(
    {},
  );
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);
    const result = validateContactForm({
      inquiry,
      name,
      email,
      company: company || undefined,
      message,
      website,
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      return;
    }

    window.location.href = result.mailtoHref;
    setSubmitted(true);
    trackEvent({ name: "contact_submit", inquiry });
  }

  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-spotlight"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container-page relative pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="mb-10">
          <Breadcrumbs items={[{ label: "Contact" }]} />
        </div>

        {/* Hero */}
        <Reveal>
          <div className="flex max-w-[64ch] flex-col gap-5">
            <Eyebrow tone="accent">
              <span
                className="inline-block size-1.5 rounded-full bg-[var(--success)]"
                aria-hidden
              />
              Currently open to inquiries
            </Eyebrow>
            <h1 className="text-display-xl text-balance-tight text-foreground">
              Let's start a conversation.
            </h1>
            <p className="text-lede text-balance-pretty text-muted-foreground">
              Reach out for internship opportunities, hiring discussions, freelance projects, or
              genuine collaborations. A short, specific message goes a long way.
            </p>
          </div>
        </Reveal>

        {/* Quick facts */}
        <Reveal delay={0.04} className="mt-12">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: MapPin, label: "Based in", value: site.location },
              { icon: Clock, label: "Timezone", value: "IST · UTC+5:30" },
              { icon: Globe2, label: "Work mode", value: "Remote · Hybrid · On-site (India)" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="surface-card flex items-start gap-3 p-4">
                  <Icon className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                  <div>
                    <div className="text-mono-meta text-muted-foreground">{f.label}</div>
                    <div className="mt-0.5 text-[14.5px] text-foreground">{f.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Form + sidebar */}
        <div className="mt-14 grid gap-8 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="surface-card p-6 md:p-8"
              noValidate
              aria-labelledby="contact-form-heading"
            >
              <Eyebrow>Send a message</Eyebrow>
              <h2 id="contact-form-heading" className="mt-4 text-h1 text-foreground">
                Tell me what you're building.
              </h2>
              <p className="mt-2 text-[14.5px] text-muted-foreground">
                The form opens your email client with a pre-filled message — no data is stored on
                this site.
              </p>

              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="mt-7">
                <Label className="text-mono-label text-muted-foreground">Inquiry type</Label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {inquiryTypes.map((t) => {
                    const active = inquiry === t;
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setInquiry(t)}
                        aria-pressed={active}
                        className={`rounded-full border px-3 py-1 text-[13px] transition-colors focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-ring)] ${
                          active
                            ? "border-[var(--brand)]/40 bg-[var(--brand-soft)] text-[var(--brand)]"
                            : "border-[var(--border-strong)] bg-surface/40 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    maxLength={FORM_LIMITS.name}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    aria-invalid={fieldErrors.name ? true : undefined}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  />
                  {fieldErrors.name ? (
                    <p id="name-error" role="alert" className="text-[12.5px] text-destructive">
                      {fieldErrors.name}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    maxLength={FORM_LIMITS.email}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-invalid={fieldErrors.email ? true : undefined}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  />
                  {fieldErrors.email ? (
                    <p id="email-error" role="alert" className="text-[12.5px] text-destructive">
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Label htmlFor="company">Company / context (optional)</Label>
                <Input
                  id="company"
                  maxLength={FORM_LIMITS.company}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Team, startup, or how you found me"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  maxLength={FORM_LIMITS.message}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's the role, project, or idea? A few sentences is perfect."
                  aria-invalid={fieldErrors.message ? true : undefined}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                />
                {fieldErrors.message ? (
                  <p id="message-error" role="alert" className="text-[12.5px] text-destructive">
                    {fieldErrors.message}
                  </p>
                ) : null}
                <div className="text-right text-mono-meta text-muted-foreground">
                  {message.length} / {FORM_LIMITS.message}
                </div>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-[13.5px] text-destructive"
                >
                  {error}
                </p>
              ) : null}

              {submitted ? (
                <div className="mt-4 flex items-start gap-3 rounded-md border border-[var(--success)]/30 bg-[var(--success)]/10 px-3 py-3 text-[14px] text-[var(--success)]">
                  <Check className="mt-0.5 size-4" aria-hidden />
                  <span>
                    Your email client should have opened with the message prepared. If nothing
                    happened, email me directly at{" "}
                    <a className="underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </span>
                </div>
              ) : null}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={loading}
                >
                  <Send className="size-4" /> Send message
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${site.email}`}>
                    <Mail className="size-4" /> Email directly
                  </a>
                </Button>
              </div>

              <p className="mt-5 flex items-center gap-2 text-mono-meta text-muted-foreground">
                <Shield className="size-3.5" aria-hidden />
                Your details stay between us — no tracking, no list, no resale.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.05}>
            <aside className="flex flex-col gap-6">
              <div className="surface-card p-6">
                <Eyebrow>Direct channels</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {channels
                    .filter((c) => !!c.href)
                    .map((c) => {
                      const Icon = c.icon;
                      return (
                        <li key={c.label}>
                          <a
                            href={c.href}
                            target={
                              c.label === "LinkedIn" || c.label === "GitHub" ? "_blank" : undefined
                            }
                            rel={
                              c.label === "LinkedIn" || c.label === "GitHub"
                                ? "noreferrer"
                                : undefined
                            }
                            className="group flex items-start gap-3 rounded-lg border border-[var(--border)] bg-surface/40 p-3 transition-colors hover:border-foreground/30 hover:bg-surface/70"
                          >
                            <div className="grid size-9 flex-none place-items-center rounded-md border border-[var(--border-strong)] bg-background">
                              <Icon className="size-4 text-[var(--brand)]" aria-hidden />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[14px] text-foreground">{c.label}</div>
                              <div className="mt-0.5 truncate text-[13.5px] text-muted-foreground">
                                {c.value}
                              </div>
                              <div className="mt-1.5 text-[12.5px] text-muted-foreground/80">
                                {c.best}
                              </div>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className="surface-card p-6">
                <Eyebrow tone="accent">Response expectations</Eyebrow>
                <ul className="mt-5 space-y-3 text-[14px] text-foreground/85">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                    Recruiters and hiring teams: same-day to 48h
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                    Clients with a brief: within 48h
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 text-[var(--brand)]" aria-hidden />
                    Collaborations and community: within a week
                  </li>
                </ul>
              </div>

              <div className="surface-card p-6">
                <Eyebrow>Faster paths</Eyebrow>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {[
                    { label: "Hire me", href: "/hire-me" },
                    { label: "Services", href: "/services" },
                    { label: "Resume", href: "/resume" },
                    { label: "Projects", href: "/projects" },
                  ].map((r) => (
                    <li key={r.href}>
                      <Link
                        to={r.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-surface/40 px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                      >
                        {r.label} <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>

        {/* FAQ */}
        <Reveal delay={0.05} className="mt-20">
          <SectionHeading size="md" eyebrow="Before you write" title="Quick answers." />
        </Reveal>
        <Reveal delay={0.05} className="mt-8">
          <div className="surface-card p-2 md:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q-${i}`}>
                  <AccordionTrigger className="px-4 text-left text-[15px] text-foreground">
                    <span className="flex items-center gap-3">
                      <MessageSquare className="size-4 text-[var(--brand)]" aria-hidden />
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
