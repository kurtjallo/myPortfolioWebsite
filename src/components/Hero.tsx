"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import { socialLinks } from "@/data/content";
import { Link } from "react-scroll";

const headlineSegments = ["Hi, there, my name is", "Kurt."];

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingSpeed = 90;
    const pauseDuration = 800;
    let segmentIndex = 0;
    let charIndex = 0;
    let typedComplete = "";
    let timeoutId: NodeJS.Timeout;

    const typeNext = () => {
      const segment = headlineSegments[segmentIndex];
      if (charIndex < segment.length) {
        const nextText = typedComplete + segment.slice(0, charIndex + 1);
        setDisplayText(nextText);
        charIndex += 1;
        timeoutId = setTimeout(typeNext, typingSpeed);
        return;
      }

      typedComplete += segment;
      if (segmentIndex < headlineSegments.length - 1) {
        typedComplete += "\n";
        setDisplayText(typedComplete);
        segmentIndex += 1;
        charIndex = 0;
        timeoutId = setTimeout(typeNext, pauseDuration);
        return;
      }

      setDisplayText(typedComplete);
      setIsTyping(false);
      setCursorVisible(false);
    };

    timeoutId = setTimeout(typeNext, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isTyping) {
      return;
    }
    const cursorInterval = setInterval(
      () => setCursorVisible((prev) => !prev),
      500,
    );
    return () => clearInterval(cursorInterval);
  }, [isTyping]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10" />
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="app-chip shimmer-bg inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Computer Science student
            </p>
            <p className="app-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              Based in Toronto, Ontario
            </p>
          </div>
          <div className="space-y-2 text-6xl font-bold leading-tight md:text-8xl">
            {(() => {
              const [firstLine = "", secondLine = ""] = displayText.split("\n");
              return (
                <>
                  <div className="text-gray-400">
                    {firstLine}
                    {isTyping && !secondLine && (
                      <span
                        className={`ml-1 inline-block h-12 w-0.5 bg-white align-middle transition-opacity duration-200 ${
                          cursorVisible ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {secondLine}
                    {isTyping && secondLine && (
                      <span
                        className={`ml-1 inline-block h-12 w-0.5 bg-white align-middle transition-opacity duration-200 ${
                          cursorVisible ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </motion.div>

        <div className="mb-6" />

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
              className={`group app-card inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold text-gray-800 transition-all hover:-translate-y-1 dark:text-gray-100`}
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className="h-5 w-5" />
              </span>
              {item.label}
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
            className="cursor-pointer inline-flex flex-col items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Scroll to explore
            <Mouse className="mt-1 h-8 w-8 animate-bounce text-gray-400 dark:text-gray-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
