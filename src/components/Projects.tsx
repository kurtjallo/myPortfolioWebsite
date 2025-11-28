"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/content";
import type { SimpleIcon } from "simple-icons";
import {
  siReact,
  siExpo,
  siTypescript,
  siSvg,
  siNodedotjs,
  siVercel,
  siGooglemaps,
  siTailwindcss,
  siGoogle,
  siInternetcomputer,
} from "simple-icons";

const techIconMap: Record<string, SimpleIcon | undefined> = {
  "React Native": siReact,
  React: siReact,
  Expo: siExpo,
  TypeScript: siTypescript,
  "SVG Charts": siSvg,
  "Node.js": siNodedotjs,
  Vercel: siVercel,
  "Google Maps": siGooglemaps,
  TailwindCSS: siTailwindcss,
  "Gemini Vision": siGoogle,
  "Internet Computer": siInternetcomputer,
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-32"
    >
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-5xl font-bold text-white md:text-6xl">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => {
            // Combine features and role for the preview, take top 3
            const previewBullets = [
              ...(project.features || []),
              ...(project.role || []),
            ].slice(0, 3);

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card relative overflow-hidden rounded-2xl p-8 hover:bg-white/5 transition-colors"
              >
                <div className="flex flex-col gap-6">
                  {/* Header: Badges + Title */}
                  <div className="space-y-4">
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                              tag.includes("Winner") || tag.includes("AI") || tag.includes("Full Stack")
                                ? "border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                : "border-white/10 bg-white/5 text-(--text-muted)"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-(--text-muted) line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((item) => {
                      const Icon = techIconMap[item];
                      return (
                        <span
                          key={item}
                          className="flex items-center gap-1.5 rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs text-(--text-muted)"
                        >
                          {Icon && (
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
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

                  {/* Preview Bullets */}
                  {previewBullets.length > 0 && (
                    <ul className="space-y-2">
                      {previewBullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-(--text-muted)"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-(--accent-cold)" />
                          <span className="line-clamp-1">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-(--accent-cold) font-medium hover:text-white transition-colors flex items-center gap-2 text-sm"
                    >
                      View full case study <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-(--text-muted) hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      GitHub <Github className="h-3 w-3" />
                    </a>
                    {project.demo && project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-(--text-muted) hover:text-white transition-colors text-sm flex items-center gap-2"
                      >
                        Live Demo <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
