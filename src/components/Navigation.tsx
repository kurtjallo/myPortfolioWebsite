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
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let current = "home";
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
              <span className={`absolute right-6 px-2.5 py-1 rounded text-xs font-sans tracking-wide whitespace-nowrap bg-background/80 backdrop-blur-md border border-border transition-all duration-300 pointer-events-none shadow-sm
                ${activeSection === section.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}
              `}>
                {section.label}
              </span>
              <button
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSection === section.id 
                    ? "bg-primary scale-125 shadow-[0_0_8px_hsl(var(--primary))]" 
                    : "bg-foreground/20 hover:bg-primary/60"
                }`}
                aria-label={`Scroll to ${section.label}`}
              />
            </div>
          ))}
        </div>
        
        <div className="w-px h-12 bg-border" />
        
        <button
          className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-all shadow-sm"
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
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground shadow-sm"
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
