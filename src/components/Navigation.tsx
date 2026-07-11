import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);

    const elements = SECTIONS.map((s) => document.getElementById(s.id));
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = "home";
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = elements[i];
        if (el && el.offsetTop <= scrollPosition) current = SECTIONS[i].id;
      }
      setActiveSection(current);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Vertical Navigation */}
      <motion.nav 
        initial={{ opacity: 0, x: 20, y: "-50%" }}
        animate={{ opacity: 1, x: 0, y: "-50%" }}
        transition={{ duration: 0.8 }}
        className="fixed right-6 md:right-8 top-1/2 z-50 hidden md:flex flex-col gap-6 items-center"
      >
        <div className="flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <div key={section.id} className="relative group flex items-center justify-end">
              <span className="absolute right-8 px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest whitespace-nowrap bg-secondary border border-border transition-all duration-200 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                {section.label}
              </span>
              <button
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`h-[2px] rounded-none transition-all duration-200 ${
                  activeSection === section.id
                    ? "w-6 bg-primary"
                    : "w-3 bg-foreground/25 hover:bg-primary/60"
                }`}
                aria-label={`Scroll to ${section.label}`}
              />
            </div>
          ))}
        </div>
        
        <div className="w-px h-12 bg-border" />
        
        <button
          className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center text-foreground hover:border-primary/50 transition-colors"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-primary" />
          ) : (
            <Moon className="w-4 h-4 text-primary" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Theme Toggle */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-6 right-6 z-50 md:hidden"
      >
        <button
          className="w-10 h-10 rounded-sm bg-secondary border border-border flex items-center justify-center text-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-primary" />
          ) : (
            <Moon className="w-4 h-4 text-primary" />
          )}
        </button>
      </motion.div>
    </>
  );
}
