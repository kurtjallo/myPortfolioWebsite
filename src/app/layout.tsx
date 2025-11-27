import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white`}
      >
        <div className="noise-bg fixed inset-0 w-full h-full pointer-events-none" />
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-blue-500/30 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
