import React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { EXPERIENCE, SKILLS } from "../data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background text-foreground relative overflow-hidden transition-colors duration-200 border-b border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Experience Column */}
        <div className="lg:col-span-8 space-y-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading label="Experience" className="mb-16" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-20"
          >
            {EXPERIENCE.map((job, idx) => (
              <motion.div variants={itemVariants} key={idx} className="group relative">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2 md:gap-4">
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {job.company}
                  </h3>
                  <div className="text-foreground/60 font-mono text-sm uppercase tracking-wider shrink-0">
                    {job.period}
                  </div>
                </div>
                <div className="text-foreground/70 font-sans font-semibold mb-6 text-lg tracking-wide">{job.role}</div>
                <ul className="space-y-4">
                  {job.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-4 text-foreground/80 font-sans font-normal leading-relaxed text-lg md:text-xl">
                      <span className="text-primary text-sm mt-1.5 flex-shrink-0 font-mono">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education & Skills Column */}
        <div className="lg:col-span-4 space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading label="Education" className="mb-12" />
            <div className="space-y-4 bg-secondary/30 p-8 rounded-md border border-border transition-colors duration-200">
              <h3 className="text-2xl font-display font-bold text-foreground">York University</h3>
              <p className="text-foreground/90 font-medium">BA Honours in Computer Science</p>
              <p className="text-foreground/70 font-mono text-sm">Lassonde School of Engineering</p>
              <p className="text-primary font-mono text-sm uppercase tracking-wider mt-4">2024 - 2028</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionHeading label="Skills" className="mb-12" />
            <div className="space-y-10">
              {SKILLS.map((skillGroup, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-mono text-foreground/60 mb-4 uppercase tracking-widest">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-3 py-1.5 bg-card border border-border rounded-sm text-sm font-mono text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
