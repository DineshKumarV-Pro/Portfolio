import type { Metadata } from 'next';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import { DisableContextMenu } from '@/components/DisableContextMenu';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'DK — Cinematic Brand & Engineering',
  description:
    'Personal portfolio of Dinesh Kumar — Monochrome × Aurora design system, editorial engineering, and interactive web experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased bg-void text-primary`}
    >
      <body className="min-h-full flex flex-col bg-void text-primary font-sans">
        <DisableContextMenu />
        {children}
      </body>
    </html>
  );
}
