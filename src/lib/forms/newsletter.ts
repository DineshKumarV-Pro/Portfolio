import { features } from "@/lib/config";
import { sanitizeFormText } from "@/lib/security";
import { newsletterFormSchema, type NewsletterFormValues } from "./schemas";

export type NewsletterSubmitResult =
  { ok: true; mode: "stub" | "provider" } | { ok: false; error: string };

/**
 * Newsletter submission — stub until provider is wired.
 * Set VITE_NEWSLETTER_PROVIDER (e.g. buttondown, resend, mailchimp).
 */
export async function submitNewsletter(
  raw: NewsletterFormValues,
  _source: string,
): Promise<NewsletterSubmitResult> {
  if (raw.website) {
    return { ok: false, error: "Submission rejected." };
  }

  const parsed = newsletterFormSchema.safeParse({
    email: sanitizeFormText(raw.email, 200),
    website: raw.website,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  if (!features.newsletterProvider) {
    return { ok: true, mode: "stub" };
  }

  // Future: POST to API route / provider SDK
  // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify(parsed.data) });
  return { ok: true, mode: "provider" };
}
