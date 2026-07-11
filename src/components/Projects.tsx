import React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-card text-foreground transition-colors duration-200 relative border-b border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading label="Projects" className="mb-16" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {PROJECTS.map((project, idx) => (
            <motion.a 
              variants={cardVariants}
              key={idx} 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block p-8 md:p-12 rounded-md bg-secondary/30 hover:bg-secondary/60 transition-colors duration-200 border border-border hover:border-primary/50 relative overflow-hidden"
            >
              {/* Subtle hover wash inside card */}
              <div className="absolute -inset-px bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md pointer-events-none" />
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-primary font-mono uppercase tracking-wider">
                    {project.event}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-sm bg-background flex items-center justify-center border border-border text-foreground/60 group-hover:text-primary-foreground group-hover:bg-primary group-hover:border-primary transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              
              <p className="text-foreground/80 mb-10 font-sans font-normal leading-relaxed text-lg relative z-10">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.stack.map((tech, tIdx) => (
                  <span 
                    key={tIdx}
                    className="text-xs font-mono px-3 py-1.5 bg-background border border-border rounded-sm text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
