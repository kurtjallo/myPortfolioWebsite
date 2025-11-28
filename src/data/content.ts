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
  slug: string;
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
  role?: string[];
  outcome?: string[];
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
  watermark?: string;
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
    slug: "tenant-shield",
    title: "TenantShield – Hackathon Winner (CSHub Hacks 2025)",
    description:
      "TenantShield is an AI-powered housing-rights platform that helps tenants identify unsafe living conditions and understand their legal rights. Many renters face issues like mold, leaks, pests, and unsafe wiring, but don’t know what landlords are responsible for fixing. The platform solves this by using Google Gemini Vision to scan images for hazards and generates clear, location-based rights and next steps.",
    tags: ["Hackathon Winner", "AI", "Full Stack"],
    github: "https://github.com/kurtjallo",
    demo: "#",
    accent: "from-blue-500 to-indigo-600",
    iconText: "TS",
    logo: "",
    techStack: [
      "React",
      "Node.js",
      "Vercel",
      "Gemini Vision",
      "Google Maps",
      "TailwindCSS",
    ],
    features: [
      "AI image analysis to detect mold, leaks, pests, and fire hazards",
      "Real-time legal rights explanation tailored to the user’s location",
      "Integration with Google Maps + Places to find nearby legal clinics",
      "Clean, modern UI built with React + TailwindCSS",
      "Serverless backend deployed on Vercel",
      "Fully built in under 24 hours during CSHub Hacks 2025",
    ],
    role: [
      "Full-stack development (frontend, backend, deployment)",
      "Implemented Gemini Vision image scanning",
      "Integrated Google Maps + Places geolocation logic",
      "Designed UI/UX using TailwindCSS + Figma",
      "Configured serverless API routes and environment keys on Vercel",
      "Collaborated closely with team, managing Git branching and rapid development",
    ],
    outcome: [
      "Won 1st Place at CSHub Hacks 2025",
      "Recognized for innovation, clarity, real-world usefulness, and technical execution.",
    ],
    learnings: [
      "Building a fully functional AI-powered app in under 24 hours taught me the importance of rapid decision-making and prioritizing core features. I learned how to effectively integrate the Gemini Vision API for real-world problem solving and managed complex state across a serverless architecture.",
    ],
  },
  {
    slug: "cooksy",
    title: "Cooksy – Smart Food Management & Recipe Generator",
    description:
      "Cooksy is a smart food management and recipe generation app designed to help users reduce food waste and make cooking easier. Many people struggle with keeping track of what they have at home and end up wasting food because they don’t know what to cook. Cooksy solves this by letting users add ingredients manually or upload a photo to detect ingredients automatically, then generating personalized recipes based on what they already have.",
    tags: ["AI", "Full Stack"],
    github: "https://github.com/kurtjallo",
    demo: "#",
    accent: "from-orange-500 to-red-500",
    iconText: "CK",
    logo: "",
    techStack: [
      "React",
      "TailwindCSS",
      "Motoko",
      "AI Image Detection",
    ],
    features: [
      "Ingredient input through text or image upload",
      "AI-powered ingredient detection from photos",
      "Intelligent recipe generation based on available ingredients",
      "Detailed cooking instructions, prep time, and difficulty ratings",
      "Save favorite recipes and revisit past ingredient lists through the History tab",
      "Useful food storage and safety tips to help reduce waste",
      "Clean, centered demo-friendly UI built with React + TailwindCSS",
    ],
    role: [
      "Implemented photo-based ingredient detection",
      "Built the recipe generation logic and formatting",
      "Designed and developed the full UI using React + TailwindCSS",
      "Created the ingredient history and favorites system",
      "Integrated with the Internet Computer backend using Motoko",
      "Optimized the UX for smooth demos and fast iteration",
    ],
    outcome: [
      "Delivered a polished, fully functional smart recipe assistant",
      "Helped users reduce food waste by turning ingredients into actionable recipes",
      "Learned how to connect React frontends with Internet Computer canisters and how to optimize AI-driven UX flows",
    ],
    learnings: [
      "Learned how to connect React frontends with Internet Computer canisters and how to optimize AI-driven UX flows.",
    ],
  },
  {
    slug: "sober-you",
    title: "SoberYou – A Sobriety & Habit Recovery Tracker",
    description:
      "SoberYou is a mobile app that helps people replace bad habits with mindful routines. It tracks sobriety down to the second, celebrates milestones, and surrounds the experience with a calming glassmorphism UI inspired by nature and renewal.",
    tags: ["Full Stack"],
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
    accent: "#38bdf8",
    watermark: "TypeScript",
    items: ["TypeScript", "JavaScript", "Python", "HTML/CSS"],
  },
  {
    title: "Front-end",
    icon: Sparkles,
    gradient: "from-green-500 to-emerald-500",
    accent: "#34d399",
    watermark: "React / Next",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Back-end",
    icon: Rocket,
    gradient: "from-orange-500 to-red-500",
    accent: "#fb923c",
    watermark: "API",
    items: ["Node.js", "Express", "PostgreSQL", "Supabase"],
  },
  {
    title: "Tools",
    icon: Layers,
    gradient: "from-purple-500 to-pink-500",
    accent: "#a855f7",
    watermark: "Ops",
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
