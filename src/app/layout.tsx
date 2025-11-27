import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SnowCanvas from "@/components/SnowCanvas";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kurt - Product Engineer",
  description:
    "Product-focused software engineer crafting high-polish web experiences with design systems, motion, and thoughtful storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${outfit.className} ${inter.variable} antialiased text-white`}
      >
        <SnowCanvas />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
