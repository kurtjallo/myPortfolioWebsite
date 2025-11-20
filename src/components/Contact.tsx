"use client";

import { FormEvent, useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-gray-50 via-white to-slate-100 py-32 dark:from-gray-950 dark:via-gray-900/60 dark:to-gray-950"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl">
            Contact
          </h2>
        </div>

        <div className="app-card rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Start the conversation
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Share what you&apos;re hiring for, the problem you need solved, or the student
            community you&apos;re building. I read every note quickly (usually after coding,
            hoops, or a chess puzzle) and reply just as fast.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                placeholder="name@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Project Details
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                placeholder="What are you working on? Where could I help?"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-lg font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-cyan-700"
            >
              Send message
            </button>
            {submitted && (
              <p className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Thanks for reaching out! I&apos;ll reply soon.
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
