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
              Hello, I&apos;m Kurt. I&apos;m a student and aspiring developer obsessed with
              simple design and solving problems through code. I enjoy translating fuzzy
              ideas into approachable interfaces and resilient systems that teammates can
              trust.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Outside of tech, I&apos;m a huge sports fan—basketball is my first love, but
              football, baseball, and hockey are always in the mix. Staying active matters
              to me, whether that&apos;s a gym session or time on the court. When I wrap the
              day with a good workout, you can usually find me unwinding with a new show or
              movie recommendation.
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
