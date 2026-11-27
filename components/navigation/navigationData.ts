export interface NavigationItem {
  id: string;
  index: string;
  label: string;
  href: string;
  description: string;
}

export interface NavigationSocialLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavigationMeta {
  role: string;
  statement: string;
  availability: string;
  location: string;
  email: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    index: '01',
    label: 'Home',
    href: '/',
    description: 'Overview & identity',
  },
  {
    id: 'about',
    index: '02',
    label: 'About',
    href: '#about',
    description: 'Background & philosophy',
  },
  {
    id: 'experience',
    index: '03',
    label: 'Experience',
    href: '#experience',
    description: 'Roles, systems & craft',
  },
  {
    id: 'resume',
    index: '04',
    label: 'Resume',
    href: '#resume',
    description: 'Curriculum vitae & credentials',
  },
  {
    id: 'works',
    index: '05',
    label: 'Works',
    href: '#works',
    description: 'Selected engineering & design',
  },
  {
    id: 'services',
    index: '06',
    label: 'Services',
    href: '#services',
    description: 'Architecture & art direction',
  },
  {
    id: 'insights',
    index: '07',
    label: 'Insights',
    href: '#insights',
    description: 'Notes, essays & research',
  },
  {
    id: 'contact',
    index: '08',
    label: 'Contact',
    href: '#contact',
    description: 'Inquiries & collaboration',
  },
];

export const NAVIGATION_META: NavigationMeta = {
  role: 'Creative Engineer & Designer',
  statement:
    'Designing and engineering cinematic digital systems, expressive interfaces, and spatial web architecture.',
  availability: 'Available for select collaborations',
  location: 'India · IST (UTC+5:30)',
  email: 'hello@dineshkumar.dev',
};

export const NAVIGATION_SOCIALS: NavigationSocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    external: true,
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com',
    external: true,
  },
  {
    label: 'Email',
    href: `mailto:${NAVIGATION_META.email}`,
    external: false,
  },
];
