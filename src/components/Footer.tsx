import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import cloudsImg from "@assets/generated_images/storm_sky.jpg";

const LINKS = [
  { icon: Mail, label: "Email", href: "mailto:kurtjallorina6@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/kurtjallo" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kurtjallorina/" },
  { icon: Calendar, label: "Events", href: "https://luma.com/user/kurtjallo" },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax: clouds move slightly as you reach the bottom
  const cloudsY = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer id="contact" ref={containerRef} className="min-h-[92vh] pt-24 md:pt-32 pb-6 px-6 md:px-12 lg:px-24 bg-background text-foreground relative overflow-hidden flex flex-col transition-colors duration-200">
      
      {/* Background stormy sky (fades in at the top to blend with the section above) */}
      <motion.div
        style={{ y: cloudsY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-95 dark:opacity-85"
      >
        <img
          src={cloudsImg}
          alt="Stormy sky"
          className="w-full h-full object-cover"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%)"
          }}
        />
      </motion.div>

      {/* Text-anchored scrim for legibility over the sky (see index.css .footer-scrim) */}
      <div className="footer-scrim absolute inset-0 z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col lg:flex-row justify-between items-start gap-16"
        >
          <div className="space-y-8 max-w-2xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.05]">
              Let's build something <br className="hidden md:block"/>
              <span className="text-primary">together.</span>
            </h2>
            <p className="text-foreground/80 font-normal text-xl md:text-2xl max-w-xl">
              Always open to discussing new opportunities, side projects, or just grabbing a coffee in Toronto.
            </p>
          </div>

          <div className="flex flex-col gap-8 w-full lg:w-auto">
            <div className="flex flex-col gap-1 rounded-sm border border-border bg-background/70 p-2 w-full lg:w-auto lg:min-w-[240px]">
              {LINKS.map(({ icon: Icon, label, href }) => {
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    {...(external || href.startsWith("/") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-base font-mono text-foreground/85 hover:text-foreground hover:bg-secondary/60 transition-colors group"
                  >
                    <Icon className="w-5 h-5 shrink-0 text-primary" />
                    <span className="flex-1">{label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-auto pt-6 border-t border-border/60 text-foreground/70 font-mono text-xs md:text-sm">
          <p className="inline-block rounded-sm bg-background/70 px-2.5 py-1">© {new Date().getFullYear()} Kurt Jallorina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
