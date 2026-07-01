import { z } from "zod";
import { FORM_LIMITS } from "@/lib/constants";

export const inquiryTypes = [
  "Recruiter",
  "Hiring manager",
  "Freelance project",
  "Collaboration",
  "Speaking / community",
  "General",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const contactFormSchema = z.object({
  inquiry: z.enum(inquiryTypes),
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(FORM_LIMITS.name, `Name must be ${FORM_LIMITS.name} characters or fewer.`),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(FORM_LIMITS.email, `Email must be ${FORM_LIMITS.email} characters or fewer.`)
    .email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(FORM_LIMITS.company, `Company must be ${FORM_LIMITS.company} characters or fewer.`)
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(FORM_LIMITS.message, `Message must be ${FORM_LIMITS.message} characters or fewer.`),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(200, "Email must be 200 characters or fewer.")
    .email("Please enter a valid email address."),
  website: z.string().max(0).optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
