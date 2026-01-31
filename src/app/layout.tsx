import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kurt Jallorina - Software Developer",
  description:
    "Software Developer passionate about building full-stack applications that solve real problems. Experience with React, Python, AWS, and cloud technologies.",
  keywords: [
    "Software Developer",
    "Full Stack Developer",
    "React",
    "TypeScript",
    "Python",
    "AWS",
    "Toronto",
  ],
  authors: [{ name: "Kurt Jallorina" }],
  openGraph: {
    title: "Kurt Jallorina - Software Developer",
    description:
      "Software Developer passionate about building full-stack applications that solve real problems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurt Jallorina - Software Developer",
    description:
      "Software Developer passionate about building full-stack applications that solve real problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
