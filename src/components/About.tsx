"use client";

import { motion } from "framer-motion";
import { interestTags } from "@/data/content";

export function About() {
  return (
    <section
      id="about"
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
            About
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Hi, I’m Kurt. I’m a student and an aspiring developer. I am currently
              pursuing a degree in Computer Science at York University. I've been
              working with technology ever since I was a kid, that's when I knew early
              on that I wanted to work in this field. I like solving problems and
              turning ideas into real, working projects.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              When I’m not coding, I'm either working out, playing sports, or
              watching a move/shows and exploring around the city. Basketball is my
              number one, but I keep up with football, baseball, and hockey as well.
              Staying active helps me clear my head, so I usually wrap up the day
              with a workout before crashing with a good movie or TV series.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {interestTags.map((tag) => (
              <span
                key={tag}
                className="app-tag rounded-full px-3 py-1 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
