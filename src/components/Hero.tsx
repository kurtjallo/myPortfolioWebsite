"use client";

import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import { socialLinks } from "@/data/content";
import { Link } from "react-scroll";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32"
    >
      {/* Background handled by global body styles */}
      
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="text-(--accent-cold) font-semibold mb-4 text-lg">
            Welcome to my digital space
          </p>
          
          <h1 className="text-6xl font-bold leading-tight md:text-8xl mb-6">
            Hi there, <br />
            my name is <span className="bg-linear-to-r from-(--text-main) to-(--accent-cold) bg-clip-text text-transparent">
              Kurt.
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <p className="project-tag-winter inline-flex items-center gap-2">
              Computer Science student
            </p>
            <p className="project-tag-winter inline-flex items-center gap-2">
              Based in Toronto, Ontario
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              offset={-90}
              className="btn-warm cursor-pointer"
            >
              View My Work
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-90}
              className="btn-cold-outline cursor-pointer"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group glass-card p-4 flex items-center gap-3 hover:border-(--accent-cold) transition-all"
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${item.gradient} text-white transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-(--text-muted) group-hover:text-white transition-colors">
                {item.label}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center gap-4 text-base text-gray-500 dark:text-gray-400"
        >
          <Link
            to="about"
            smooth={true}
            duration={500}
            offset={-90}
            className="cursor-pointer inline-flex flex-col items-center text-sm font-medium text-(--text-muted) transition-colors hover:text-white"
          >
            Scroll to explore
            <Mouse className="mt-1 h-8 w-8 animate-bounce text-(--accent-cold)" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
