"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
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

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-(--text-muted) hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      tag.includes("Winner")
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                        : "border-white/10 bg-white/5 text-(--text-muted)"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {project.title}
              </h1>
              
              <p className="text-lg text-(--text-muted) leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.techStack.map((item) => {
                  const Icon = techIconMap[item];
                  return (
                    <span key={item} className="project-tag-winter">
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

              <div className="flex flex-wrap gap-4 pt-4">
                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-warm flex items-center gap-2"
                  >
                    View Live Demo <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
                >
                  Source Code <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="border-t border-[rgba(255,255,255,0.1)] pt-8 space-y-12">
              
              {/* Features & Role Grid */}
              {(project.features.length > 0 || (project.role && project.role.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {project.features.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-(--accent-cold)">✦</span> Key Features
                      </h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-(--text-muted)">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent-cold)" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.role && project.role.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-(--accent-warm)">✦</span> My Role
                      </h3>
                      <ul className="space-y-3">
                        {project.role.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-(--text-muted)">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent-warm)" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Outcome */}
              {project.outcome && project.outcome.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Outcome</h3>
                  <ul className="space-y-3">
                    {project.outcome.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-(--text-muted)">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong class="text-white">$1</strong>'
                            ),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learnings */}
              {project.learnings.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">What I Learned</h3>
                  <div className="space-y-4 text-(--text-muted) leading-relaxed">
                    {project.learnings.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
