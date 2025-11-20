"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/content";

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
      <span className="inline-flex h-1 w-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
      <span>{title}</span>
    </div>
  );
}

export function Projects() {
  const featured = projects[0];
  if (!featured) return null;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-slate-100 py-32 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/40" />
        <div className="absolute right-10 bottom-10 h-52 w-52 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-900/30" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Spotlighting SoberYou, the mobile build where my love for thoughtful tech,
            mindfulness, and problem solving all come together.
          </p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="app-card relative overflow-hidden rounded-3xl px-8 py-12"
        >
          <div
            className={`absolute -top-32 right-0 h-72 w-72 rounded-full bg-gradient-to-br ${featured.accent} opacity-40 blur-3xl`}
          />
          <div className="relative space-y-10">
            <div className="space-y-6">
              <span className="app-chip inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                Featured build
              </span>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {featured.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {featured.techStack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={featured.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:from-emerald-400 dark:to-cyan-400 dark:text-gray-900"
                >
                  <ExternalLink className="h-5 w-5" />
                  View live
                </a>
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-gray-200/70 px-6 py-3 text-base font-semibold text-gray-800 transition hover:-translate-y-0.5 hover:bg-white dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-100 dark:hover:bg-gray-900/80"
                >
                  <Github className="h-5 w-5" />
                  Source
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <section className="rounded-3xl border border-gray-100/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/60">
                <SectionHeading title="Key features" />
                <ul className="mt-4 grid gap-3 text-base leading-relaxed text-gray-700 dark:text-gray-200 sm:grid-cols-2">
                  {featured.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-2xl border border-gray-200/60 bg-white/70 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300/70 dark:border-gray-800/70 dark:bg-gray-900/60"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border border-gray-100/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/60">
                <SectionHeading title="What I learned" />
                <ul className="mt-4 space-y-3 text-base leading-relaxed text-gray-700 dark:text-gray-200">
                  {featured.learnings.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
