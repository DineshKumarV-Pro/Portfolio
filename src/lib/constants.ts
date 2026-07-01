/** Global configuration, validation limits, and UI thresholds. */

export const SCROLL_THRESHOLD = 8;

export const FORM_LIMITS = {
  name: 100,
  email: 200,
  company: 120,
  message: 2000,
} as const;

export const DEFAULT_OG_IMAGE = "/og-default.png";
