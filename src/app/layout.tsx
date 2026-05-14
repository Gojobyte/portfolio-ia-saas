import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adoum Salah | Developpeur Full Stack IA / SaaS",
  description:
    "Portfolio d'Adoum Salah - Developpeur Full Stack specialise en Next.js, PostgreSQL, IA et SaaS. Disponible pour stage/alternance.",
  keywords: [
    "developpeur full stack",
    "next.js",
    "react",
    "saas",
    "ia",
    "postgresql",
    "supabase",
    "typescript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
