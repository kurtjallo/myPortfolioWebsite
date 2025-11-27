"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";
import type { SkillCategory } from "@/data/content";
import type { SimpleIcon } from "simple-icons";
import {
  siTypescript,
  siJavascript,
  siPython,
  siHtml5,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siFramer,
  siNodedotjs,
  siExpress,
  siPostgresql,
  siSupabase,
  siGithub,
  siDocker,
  siFigma,
  siVercel,
} from "simple-icons";

const iconMap: Record<string, SimpleIcon | undefined> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  "HTML/CSS": siHtml5,
  "Next.js": siNextdotjs,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  "Framer Motion": siFramer,
  "Node.js": siNodedotjs,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  "Git & GitHub": siGithub,
  Docker: siDocker,
  Figma: siFigma,
  Vercel: siVercel,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="skills-section relative isolate overflow-hidden py-28"
    >
      <div className="skills-pattern absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 space-y-3 text-center">
          <h2 className="text-5xl font-bold text-white md:text-6xl">
            Skills
          </h2>
          <p className="text-lg text-white/80">
            Organized into the stacks I reach for most often.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skill: SkillCategory, index) => {
            const CategoryIcon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="app-card group relative overflow-hidden rounded-3xl p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(120% 120% at 20% 20%, ${skill.accent}1f, transparent 40%), radial-gradient(120% 120% at 80% 0%, ${skill.accent}15, transparent 35%)`,
                  }}
                />
                <div className="relative mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-inner"
                      style={{
                        background: `${skill.accent}26`,
                        boxShadow: `0 10px 30px ${skill.accent}30`,
                      }}
                    >
                      <CategoryIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {skill.watermark ?? "Core tools I use every week"}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-400">
                    {skill.items.length} tools
                  </span>
                </div>
                <div className="relative flex flex-wrap gap-3">
                  {skill.items.map((item) => {
                    const TechIcon = iconMap[item];
                    return (
                      <span
                        key={item}
                        className="app-chip flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white"
                      >
                        {TechIcon && (
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white/70"
                            fill="currentColor"
                          >
                            <path d={TechIcon.path} />
                          </svg>
                        )}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
