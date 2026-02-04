"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Clock, Github, ExternalLink, FileText } from "lucide-react";
import {
  profile,
  about,
  experiences,
  education,
  projects,
  skills,
  languages,
  socialLinks,
} from "@/data/content";

function Header() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Toronto",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options) + " EST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between py-6 text-sm text-neutral-500">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        <span className="uppercase tracking-wide">{profile.location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span className="tabular-nums">{time}</span>
      </div>
    </header>
  );
}

function ProfileSection() {
  return (
    <section className="flex flex-col items-center py-12 text-center">
      <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-2xl">
        <Image
          src="/avatar.jpg"
          alt={profile.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-semibold text-neutral-900">{profile.name}</h1>
      <p className="mt-1 text-lg text-neutral-500">{profile.title}</p>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        <FileText className="h-4 w-4" />
        View Resume
      </a>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-neutral-900">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="my-10 border-neutral-200" />;
}

function AboutSection() {
  return (
    <section>
      <SectionTitle>About</SectionTitle>
      <p className="text-base leading-relaxed text-neutral-600">{about}</p>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section>
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-4">
            {exp.logo ? (
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-600">
                {exp.company.split(" ")[0].substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-900">{exp.title}</h3>
              <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">
                {exp.company} · {exp.period}
              </p>
              {exp.description && (
                <p className="mt-3 text-neutral-600">{exp.description}</p>
              )}
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-neutral-600">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-neutral-400">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section>
      <SectionTitle>Education</SectionTitle>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-neutral-900">{edu.degree}</h3>
            <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">
              {edu.school} · {edu.period}
            </p>
            {edu.description && (
              <p className="mt-3 text-neutral-600">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section>
      <SectionTitle>Projects</SectionTitle>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-neutral-900">
                  {project.title}
                  {project.award && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      {project.award.split("&")[0].trim()}
                    </span>
                  )}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">
                  {project.event} · {project.period}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <Github className="h-4 w-4" />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-600">{project.description}</p>
            <ul className="mt-2 space-y-1 text-sm text-neutral-600">
              {project.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-neutral-400">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const skillCategories = [
  { title: "Languages", skills: ["Python", "JavaScript", "TypeScript", "Java", "SQL"] },
  { title: "Frameworks", skills: ["React", "React Native", "Node.js", "FastAPI", "Express.js"] },
  { title: "Databases", skills: ["MongoDB", "PostgreSQL", "Redis", "REST APIs"] },
  { title: "DevOps", skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git"] },
  { title: "Tools", skills: ["Locust", "Pytest", "Jest", "Postman", "Swagger", "Grafana", "Prometheus", "Sentry", "GitHub Actions"] },
  { title: "Practices", skills: ["Agile/Scrum", "Code Reviews", "TDD", "Load Testing", "System Design"] },
];

function SkillsSection() {
  return (
    <section>
      <SectionTitle>Tech Stack</SectionTitle>
      <div className="space-y-5">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="mb-2 text-sm font-medium text-neutral-500">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="cursor-default rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LanguagesSection() {
  return (
    <section>
      <SectionTitle>Languages</SectionTitle>
      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-neutral-900">{lang.name}</span>
            <span className="text-neutral-500">{lang.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section>
      <SectionTitle>Contact</SectionTitle>
      <div className="space-y-3">
        <a
          href={`mailto:${socialLinks.email}`}
          className="flex items-center justify-between text-neutral-900 transition-colors hover:text-neutral-600"
        >
          <span>Email</span>
          <span className="text-neutral-500">{socialLinks.email}</span>
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-neutral-900 transition-colors hover:text-neutral-600"
        >
          <span>LinkedIn</span>
          <span className="text-neutral-500">/in/kurtjallorina</span>
        </a>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-neutral-900 transition-colors hover:text-neutral-600"
        >
          <span>GitHub</span>
          <span className="text-neutral-500">@kurtjallo</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 text-center text-sm text-neutral-400">
      <p>© {new Date().getFullYear()} Kurt Jallorina. All rights reserved.</p>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6">
        <Header />
        <ProfileSection />
        <main>
          <AboutSection />
          <Divider />
          <ExperienceSection />
          <Divider />
          <EducationSection />
          <Divider />
          <ProjectsSection />
          <Divider />
          <SkillsSection />
          <Divider />
          <LanguagesSection />
          <Divider />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
