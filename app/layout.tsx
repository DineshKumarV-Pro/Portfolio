import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DK — Cinematic Brand & Engineering",
  description: "Cinematic SVG logo intro and premium brand experience powered by GSAP and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased bg-[#000000] text-white"
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-white selection:bg-white selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
