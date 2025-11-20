"use client";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const navItems = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Hobbies", href: "hobbies" },
  { label: "Contact", href: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-lg transition-all duration-500 ${
        scrolled
          ? "border-gray-200/80 bg-white/80 dark:border-gray-800/80 dark:bg-gray-950/80 shadow-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer text-lg font-semibold tracking-tight text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
        >
          Kurt.dev
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              smooth={true}
              duration={500}
              offset={-50}
              className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          offset={-50}
          className="hidden cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 md:inline-flex"
        >
          Let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}
