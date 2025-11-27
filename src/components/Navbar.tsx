"use client";

import { motion } from "framer-motion";
import { Link } from "react-scroll";

const navItems = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(11,17,32,0.7)] backdrop-blur-xl px-8 py-5 flex justify-between items-center"
    >
      <Link
        to="hero"
        smooth={true}
        duration={500}
        offset={-90}
        className="cursor-pointer text-2xl font-bold text-white"
      >
        Kurt <span className="text-(--accent-cold)">Jallorina</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            smooth={true}
            duration={500}
            offset={-90}
            spy={true}
            activeClass="text-(--accent-warm)"
            className="cursor-pointer text-(--text-muted) text-base hover:text-(--accent-warm) transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      
      {/* Mobile menu placeholder or simplified view if needed */}
    </motion.header>
  );
}
