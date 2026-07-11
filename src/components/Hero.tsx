import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import cloudsImg from "@assets/generated_images/storm_sky.jpg";

export function Hero() {
  const { scrollY } = useScroll();
  // Subtle parallax effect: clouds move up slightly slower than the scroll
  const cloudsY = useTransform(scrollY, [0, 1000], [0, 200]);
  // Scroll-linked hero animation: text drifts up and fades as you scroll away
  const contentY = useTransform(scrollY, [0, 600], [0, -120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 600], [1, 0.97]);

  return (
    <section id="home" className="relative min-h-[100dvh] w-full bg-background flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-border">
      
      {/* Background stormy sky with Parallax */}
      <motion.div
        style={{ y: cloudsY }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src={cloudsImg}
          alt="Stormy sky"
          className="w-full h-full object-cover scale-[1.1] opacity-100 dark:opacity-95"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 92%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 92%, transparent 100%)"
          }}
        />
      </motion.div>

      {/* Text-anchored scrim for legibility over the sky (see index.css .hero-scrim) */}
      <div className="hero-scrim absolute inset-0 z-[1] pointer-events-none" />

      <motion.div style={{ y: contentY, opacity: contentOpacity, scale: contentScale }} className="max-w-7xl z-10 relative w-full flex flex-col origin-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="space-y-6 md:space-y-8"
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-foreground/80"
          >
            Building in Toronto
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[14vw] md:text-[11vw] leading-[0.9] font-display font-bold tracking-tight -ml-[0.04em] text-foreground"
          >
            Kurt Jallorina
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4 md:pt-8 flex flex-col items-start gap-4"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-sm bg-background/70 border border-border text-foreground font-mono text-sm md:text-base uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary" />
              <span className="text-primary font-bold tracking-widest">Software Engineer</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-2 rounded-sm bg-background/70 border border-border text-xs md:text-sm font-mono font-medium uppercase tracking-widest text-foreground/80">
                Replit Ambassador
              </span>
              <a
                href="https://www.ideabrowser.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-sm bg-background/70 border border-border hover:border-primary/50 hover:text-primary transition-colors text-xs md:text-sm font-mono font-medium uppercase tracking-widest text-foreground/80 flex items-center gap-1.5 group"
              >
                Ideabrowser Ambassador
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-12 lg:right-24 text-foreground/70 flex items-center gap-3 text-sm font-mono font-medium tracking-widest uppercase z-10 bg-background/70 px-4 py-2 rounded-sm border border-border"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
