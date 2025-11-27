"use client";

import { motion } from "framer-motion";
import { interestTags } from "@/data/content";
import { MapPin } from "lucide-react";

const hobbyColors: { [key: string]: string } = {
  Basketball: "hover:bg-orange-500/20",
  Chess: "hover:bg-white/20",
  Coding: "hover:bg-blue-500/20",
};

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
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl mb-12">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              <p>
                Hi, I&apos;m Kurt. I&apos;m a student and an aspiring developer. I am
                currently pursuing a degree in Computer Science at York
                University. I&apos;ve been working with technology ever since I was a
                kid, that&apos;s when I knew early on that I wanted to work in this
                field. I like solving problems and turning ideas into real,
                working projects.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m either working out, playing sports, or
                watching a move/shows and exploring around the city. Basketball
                is my number one, but I keep up with football, baseball, and
                hockey as well. Staying active helps me clear my head, so I
                usually wrap up the day with a workout before crashing with a good
                movie or TV series.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                {interestTags.map((tag) => (
                  <motion.span
                    key={tag}
                    className={`bg-white/5 rounded-full px-3 py-1 text-sm font-medium cursor-pointer ${
                      hobbyColors[tag] || "hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="aspect-video rounded-lg bg-gray-800/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto text-white/20" />
                    <p className="text-white/40 mt-2">Toronto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
