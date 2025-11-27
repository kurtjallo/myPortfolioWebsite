"use client";

import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          to="hero"
          smooth={true}
          duration={500}
          offset={-90}
          className="group cursor-pointer select-none text-lg font-semibold text-white"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-bold tracking-[0.1em] text-white shadow-lg transition-all group-hover:-translate-y-0.5 group-hover:shadow-emerald-500/40">
            KJ
          </span>
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 px-2 py-1 text-sm text-gray-300 backdrop-blur">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              smooth={true}
              duration={500}
              offset={-90}
              spy={true}
              activeClass="bg-white/15 text-white"
              className="cursor-pointer rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="contact"
          smooth={true}
          duration={500}
          offset={-90}
          className="hidden cursor-pointer items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-400 md:inline-flex"
        >
          Let&apos;s talk
        </Link>
      </div>
    </motion.header>
  );
}
