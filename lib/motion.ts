/**
 * Monochrome x Aurora — Motion System Constants
 *
 * Durations (seconds for GSAP, milliseconds for CSS):
 * - micro:    150–200ms  (hover states, focus, toggles)
 * - ui:       250–350ms  (menus, drawers, interactive transitions)
 * - reveal:   500–800ms  (content entrances, scroll reveals)
 * - dramatic: 800–1200ms (hero choreography, cinematic sequences)
 */

export const MOTION_DURATION = {
  micro: 0.18,
  ui: 0.3,
  reveal: 0.65,
  dramatic: 1.0,
} as const;

export const MOTION_EASE = {
  /** Decisive, editorial deceleration */
  outExpo: 'power3.out',
  /** Smooth, cinematic symmetrical curve */
  inOutEditorial: 'power3.inOut',
  /** Crisp micro-interaction curve */
  micro: 'power2.out',
} as const;

export const MOTION_DISTANCE = {
  subtle: 16,
  default: 24,
  dramatic: 40,
} as const;

/**
 * Checks if the user has requested reduced motion at the OS/browser level.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
