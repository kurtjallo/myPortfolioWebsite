import React from "react";
import { motion } from "framer-motion";
import portraitImg from "@assets/kurt_portrait_crop.png";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-card text-foreground relative transition-colors duration-500 border-b border-border overflow-hidden">
      <div className="max-w-6xl relative z-10 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-sm font-sans font-semibold tracking-widest uppercase text-primary mb-12 flex items-center gap-4"
        >
          <span className="w-8 h-px bg-primary opacity-50" />
          About
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="text-xl md:text-3xl lg:text-4xl font-sans tracking-tight leading-[1.4] md:leading-[1.3] text-foreground/90 space-y-8 font-medium flex-1">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              I'm someone who can't sit still when there's something <span className="text-primary font-semibold">worth building</span>. I don't wait for permission or the perfect time—I just start. Whether it's shipping code or organizing an event, I'd rather try and learn than sit on the bench.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-foreground/70"
            >
              A lot of that drive comes from my love for Toronto. This city has introduced me to some of the most curious, generous, and ambitious people I've met. I want to help make it easier for others to find their way into those rooms.
            </motion.p>
          </div>

          {/* Profile Picture */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm lg:w-[360px] xl:w-[400px] shrink-0 aspect-[700/880] rounded-3xl border border-border shadow-sm overflow-hidden"
          >
            <img
              src={portraitImg}
              alt="Kurt Jallorina"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
