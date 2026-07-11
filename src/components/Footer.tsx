import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, Calendar, ArrowUpRight } from "lucide-react";
import cloudsImg from "@assets/generated_images/painterly_clouds_blue.png";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax: clouds move slightly as you reach the bottom
  const cloudsY = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer id="contact" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background text-foreground relative overflow-hidden flex flex-col justify-end transition-colors duration-500">
      
      {/* Background Cloud Artwork (flipped and masked from top) with Parallax */}
      <motion.div 
        style={{ y: cloudsY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen scale-y-[-1]"
      >
        <img
          src={cloudsImg}
          alt="Painterly clouds"
          className="w-full h-full object-cover"
          style={{ 
            WebkitMaskImage: "linear-gradient(to top, black 40%, transparent 100%)",
            maskImage: "linear-gradient(to top, black 40%, transparent 100%)" 
          }}
        />
      </motion.div>

      {/* Background abstract indigo glow mirroring the hero */}
      <div className="absolute -bottom-[60%] left-1/2 -translate-x-1/2 w-[150vw] md:w-[120vw] h-[80vh] bg-primary rounded-[100%] blur-[120px] md:blur-[180px] pointer-events-none opacity-20 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500" />
      <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 w-[80vw] md:w-[60vw] h-[50vh] bg-primary rounded-[100%] blur-[100px] md:blur-[120px] pointer-events-none opacity-30 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16"
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
            <div className="flex flex-wrap gap-8 md:gap-12">
              <a 
                href="mailto:kurtjallorina6@gmail.com"
                aria-label="Email"
                className="flex items-center text-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/kurtjallo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg font-mono text-foreground/70 hover:text-foreground transition-colors group"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </a>
              <a 
                href="https://www.linkedin.com/in/kurtjallorina/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg font-mono text-foreground/70 hover:text-foreground transition-colors group"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </a>
              <a 
                href="https://luma.com/user/kurtjallo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg font-mono text-foreground/70 hover:text-foreground transition-colors group"
              >
                <Calendar className="w-5 h-5" />
                <span>Events</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-32 pt-8 border-t border-border text-foreground/60 font-mono text-xs md:text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p>© {new Date().getFullYear()} Kurt Jallorina. All rights reserved.</p>
          <p className="flex items-center gap-3">
            Built in Toronto <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
