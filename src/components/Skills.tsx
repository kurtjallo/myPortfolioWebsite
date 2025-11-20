"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

export function Skills() {
  return (
    <section
      id="skills"
      className="bg-gradient-to-br from-white via-slate-50 to-white py-32 dark:from-gray-950 dark:via-gray-950/60 dark:to-gray-900"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Skills
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="app-card rounded-2xl p-6 transition-shadow"
            >
              <span
                className={`inline-flex rounded-xl bg-gradient-to-br ${skill.gradient} p-3 text-white shadow-lg`}
              >
                <skill.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {skill.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
