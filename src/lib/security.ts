/**
 * Security architecture — headers and CSP templates for deployment.
 * Apply via Cloudflare _headers, Nitro routeRules, or reverse proxy.
 *
 * No runtime enforcement here — configuration reference only.
 */

export const securityHeaders = {
  /** Strict baseline for production */
  production: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-site",
  },
  /** CSP — adjust nonce/hash strategy when adding inline scripts */
  contentSecurityPolicy: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
  ].join("; "),
} as const;

/** Sanitize user input before mailto or future API submission. */
export function sanitizeFormText(value: string, maxLength: number): string {
  return value
    .trim()
    .slice(0, maxLength)
    .replace(/\p{Cc}/gu, "");
}

/** Validate external URLs before rendering user-supplied links. */
export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
