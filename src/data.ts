export const EXPERIENCE = [
  {
    company: "Tofu (HireTofu)",
    role: "Software Engineer",
    period: "Jun 2026 - Present",
    description: [
      "Improved Django API performance by profiling high-traffic endpoints and removing N+1 queries.",
      "Redesigned automation APIs into grouped Django REST Framework responses for faster React rendering.",
      "Built an end-to-end QA harness for a deepfake interview pipeline with retry-safe scan handling."
    ]
  },
  {
    company: "Nmbr",
    role: "Software Engineer Intern",
    period: "May 2026 - Present",
    description: [
      "Built and tested features for an embedded Canadian payroll API covering tax forms and compliance.",
      "Replaced older browser tests with Playwright tests for improved coverage and reliability."
    ]
  },
  {
    company: "Keyfill",
    role: "Software Engineer",
    period: "Apr 2026 - Present",
    description: [
      "Co-founded an AI document automation startup, shipping a React Native/TypeScript mobile app.",
      "Built real-time speech extraction and validation flows comparing AI-filled fields."
    ]
  },
  {
    company: "HAVN Inc.",
    role: "Software Engineer",
    period: "Dec 2025 - Present",
    description: [
      "Designed and implemented 40+ REST API endpoints in Python (FastAPI) with Redis caching.",
      "Reduced API response times by 60% and shipped React Native features across iOS and Android.",
      "Maintained 99.9% uptime with automated testing, Docker, AWS EC2, and Sentry."
    ]
  }
];

export const PROJECTS = [
  {
    name: "Clarify",
    event: "Hackville 2026",
    description: "A full-stack document chatbot that helps users navigate legal and tax forms using Retrieval-Augmented Generation and MongoDB Atlas Vector Search, returning answers with 95%+ retrieval accuracy.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB Atlas Vector Search"],
    link: "https://github.com/kurtjallo/Clarify-Hackville-2026"
  },
  {
    name: "Visual Debugger",
    event: "Open Source",
    description: "An open-source VS Code extension that converts developer errors into structured plain-English explanations using Gemini 2.0 Flash, reaching 100+ installs.",
    stack: ["JavaScript", "TypeScript", "VS Code Extension API", "Gemini 2.0 Flash", "Chart.js"],
    link: "https://github.com/kurtjallo/Clarify-Hackville-2026"
  }
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "PHP", "Java", "SQL", "HTML", "CSS", "Bash"]
  },
  {
    category: "Backend",
    items: ["Django", "Django REST Framework", "Laravel", "FastAPI", "Node.js", "Express.js", "PostgreSQL", "Redis", "Elasticsearch"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS"]
  },
  {
    category: "Testing & Tools",
    items: ["Playwright", "GitHub Actions", "Docker", "AWS", "Kubernetes", "Git", "Sentry"]
  },
  {
    category: "AI / ML",
    items: ["OpenAI SDK", "Gemini API", "RAG", "tool calling", "MongoDB Atlas Vector Search"]
  }
];
