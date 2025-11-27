"use client";

import { FormEvent, useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/kurtjallorina6@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-5xl font-bold text-white md:text-6xl">
            Contact
          </h2>
        </div>

        <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="text-center mb-8">
             <h3 className="text-2xl font-bold text-white mb-2">Let&apos;s create something cool.</h3>
             <p className="text-(--text-muted)">I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="_subject" value="New submission from kurtjallorina.me" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--text-muted)">
                Name
              </label>
              <div className="rounded-xl">
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-transparent px-4 py-3 text-white outline-none transition focus:border-(--accent-cold)"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--text-muted)">
                Email
              </label>
              <div className="rounded-xl">
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-transparent px-4 py-3 text-white outline-none transition focus:border-(--accent-cold)"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--text-muted)">
                Project Details
              </label>
              <div className="rounded-xl">
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-(--border-color) bg-transparent px-4 py-3 text-white outline-none transition focus:border-(--accent-cold)"
                  placeholder="What are you working on? Where could I help?"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-warm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
            {submitted && (
              <p className="text-center text-sm font-medium text-(--accent-cold)">
                Thanks for reaching out! I&apos;ll reply soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
