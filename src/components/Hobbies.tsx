"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/data/content";

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
      <span className="inline-flex h-1 w-6 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
      <span>{title}</span>
    </div>
  );
}

export function Hobbies() {
  return (
    <section
      id="hobbies"
      className="bg-gradient-to-br from-white via-slate-50 to-gray-100 py-32 dark:from-gray-950 dark:via-gray-950/90 dark:to-gray-900"
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-gray-600 dark:text-gray-300"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Hobbies & Interests
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Beyond the screen, I love staying active and exploring new things. When I'm not coding, you can often find me:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-200">
              <li>Playing basketball or working out at the gym.</li>
              <li>Reading up on the latest in AI and tech innovations.</li>
              <li>Exploring new music genres and artists.</li>
              <li>Tinkering with new technologies and frameworks.</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="app-tag rounded-full px-3 py-1 text-sm font-medium"
              >
                {hobby}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
