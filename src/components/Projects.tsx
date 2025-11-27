"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/content";
import type { SimpleIcon } from "simple-icons";
import {
  siReact,
  siExpo,
  siTypescript,
  siSvg,
} from "simple-icons";

const techIconMap: Record<string, SimpleIcon | undefined> = {
  "React Native": siReact,
  Expo: siExpo,
  TypeScript: siTypescript,
  "SVG Charts": siSvg,
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-32"
    >
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-5xl font-bold text-white md:text-6xl">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              className="glass-card relative overflow-hidden rounded-3xl px-8 py-12"
            >
              <div className="relative space-y-10">
                <div className="space-y-6">
                  <div className="mb-4 text-(--accent-warm) text-2xl">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-lg text-(--text-muted)">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map((item) => {
                        const Icon = techIconMap[item];
                        return (
                          <span
                            key={item}
                            className="project-tag-winter"
                          >
                            {Icon && (
                              <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                              >
                                <path d={Icon.path} />
                              </svg>
                            )}
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-(--accent-cold) font-bold hover:text-white transition-colors flex items-center gap-2"
                    >
                      View Project <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-(--text-muted) hover:text-white transition-colors flex items-center gap-2"
                    >
                      Source Code <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
