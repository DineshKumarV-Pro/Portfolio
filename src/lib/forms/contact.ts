import { site } from "@/content/site";
import { sanitizeFormText } from "@/lib/security";
import { contactFormSchema, type ContactFormValues } from "./schemas";

export type ContactSubmitResult =
  | { ok: true; mailtoHref: string }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };

export function validateContactForm(raw: ContactFormValues): ContactSubmitResult {
  if (raw.website) {
    return { ok: false, error: "Submission rejected." };
  }

  const parsed = contactFormSchema.safeParse({
    ...raw,
    name: sanitizeFormText(raw.name, 100),
    email: sanitizeFormText(raw.email, 200),
    company: raw.company ? sanitizeFormText(raw.company, 120) : undefined,
    message: sanitizeFormText(raw.message, 2000),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key as keyof ContactFormValues]) {
        fieldErrors[key as keyof ContactFormValues] = issue.message;
      }
    }
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return { ok: false, error: first, fieldErrors };
  }

  const data = parsed.data;
  const subject = `[${data.inquiry}] ${data.name ? `from ${data.name}` : "Inquiry"}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Inquiry: ${data.inquiry}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { ok: true, mailtoHref };
}
