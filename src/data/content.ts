import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Layers,
  Linkedin,
  Mail,
  Rocket,
  Sparkles,
  Github,
} from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
};

export type ProjectCard = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  accent: string;
  iconText: string;
  logo?: string;
  techStack: string[];
  features: string[];
  learnings: string[];
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  gradient: string;
  items: string[];
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/kurtjallo",
    icon: Github,
    gradient: "from-gray-900 to-gray-600",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kurt-jallorina-4035b92b3/",
    icon: Linkedin,
    gradient: "from-sky-500 to-indigo-500",
  },
  {
    label: "Email",
    href: "mailto:kurtjallorina4@gmail.com",
    icon: Mail,
    gradient: "from-purple-500 to-pink-500",
  },
];

export const aboutHighlights: never[] = [];

export const interestTags = [
  "Basketball",
  "Sunday Night Football",
  "Hockey",
  "Baseball",
  "Coding",
  "Chess",
  "Working out",
];

export const projects: ProjectCard[] = [
  {
    title: "SoberYou – A Sobriety & Habit Recovery Tracker",
    description:
      "SoberYou is a mobile app that helps people replace bad habits with mindful routines. It tracks sobriety down to the second, celebrates milestones, and surrounds the experience with a calming glassmorphism UI inspired by nature and renewal.",
    tags: [],
    github: "https://github.com/kurtjallo/sober-you",
    demo: "https://soberyou.app",
    accent: "from-emerald-500 to-green-600",
    iconText: "SY",
    logo: "/soberyou-logo.svg",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Zustand (planned)",
      "SVG Charts",
    ],
    features: [
      "Real-time sobriety streak tracker (days, hours, minutes, seconds)",
      "Automatic relapse reset paired with mindful prompts",
      "Motivational quotes, empathy nudges, and praise states",
      "Achievement system spanning 1 day to lifetime milestones",
      "Glass-style green gradient interface symbolizing calm and growth",
      "Cross-device testing through Expo Go—no Xcode or Android Studio required",
    ],
    learnings: [
      "Designed and implemented a modern mobile UI with real glass effects.",
      "Structured a scalable Expo project teammates can navigate.",
      "Managed TypeScript path aliases, dependency graphs, and shared components.",
      "Used GitHub effectively for version control and async collaboration.",
    ],
  },
];

export const skills: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    items: ["TypeScript", "JavaScript", "Python", "HTML/CSS"],
  },
  {
    title: "Front-end",
    icon: Sparkles,
    gradient: "from-green-500 to-emerald-500",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Back-end",
    icon: Rocket,
    gradient: "from-orange-500 to-red-500",
    items: ["Node.js", "Express", "PostgreSQL", "Supabase"],
  },
  {
    title: "Tools",
    icon: Layers,
    gradient: "from-purple-500 to-pink-500",
    items: ["Git & GitHub", "Docker", "Figma", "Vercel"],
  },
];

export const hobbies = [
  "Basketball",
  "Sunday Night Football",
  "Hockey",
  "Baseball",
  "Coding",
  "Chess",
  "Working out",
];
