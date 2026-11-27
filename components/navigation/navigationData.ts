export interface NavigationItem {
  id: string;
  index: string;
  label: string;
  href: string;
}

export interface NavigationSocialLink {
  id: 'github' | 'linkedin' | 'x' | 'email';
  label: string;
  href: string;
  external?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', index: '01', label: 'Home', href: '/' },
  { id: 'about', index: '02', label: 'About', href: '#about' },
  { id: 'experience', index: '03', label: 'Experience', href: '#experience' },
  { id: 'resume', index: '04', label: 'Resume', href: '#resume' },
  { id: 'works', index: '05', label: 'Works', href: '#works' },
  { id: 'services', index: '06', label: 'Services', href: '#services' },
  { id: 'insights', index: '07', label: 'Insights', href: '#insights' },
  { id: 'contact', index: '08', label: 'Contact', href: '#contact' },
];

export const NAVIGATION_SOCIALS: NavigationSocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    external: true,
  },
  {
    id: 'x',
    label: 'X / Twitter',
    href: 'https://x.com',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:hello@dineshkumar.dev',
    external: false,
  },
];
