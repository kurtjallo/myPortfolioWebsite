export type Experience = {
  title: string;
  company: string;
  period: string;
  location?: string;
  description?: string;
  bullets?: string[];
  logo?: string;
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  description?: string;
};

export type Project = {
  title: string;
  event?: string;
  period: string;
  description: string;
  bullets: string[];
  techStack: string[];
  github: string;
  demo?: string;
  award?: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  link?: string;
  description?: string;
};

export const profile = {
  name: "Kurt Jallorina",
  title: "Software Engineer",
  location: "Toronto, Ontario",
  email: "kurtjallorina4@gmail.com",
  phone: "647-222-9838",
  linkedin: "linkedin.com/in/kurtjallorina",
  github: "github.com/kurtjallo",
  website: "kurtjallorina.me",
  avatar: "/avatar.jpg",
};

export const about = `I'm a Software Developer and Founding Engineer at HAVN, passionate about building full-stack applications that solve real problems. With experience in React, Python, and cloud technologies, I create intuitive user experiences backed by robust, scalable systems. I also love hackathons and attend them for fun! I love the adrenaline, thrive in fast-paced environments, and love turning ideas into production-ready software. Outside of coding, I play basketball and stay active.`;

export const experiences: Experience[] = [
  {
    title: "Founding Engineer",
    company: "HAVN Inc.",
    period: "Dec 2025 - Present",
    location: "Toronto, Ontario",
    logo: "/logos/havn.png",
    description: "Architected and deployed full-stack social platform using React Native, Python/FastAPI, and PostgreSQL.",
    bullets: [
      "Designed and implemented 15+ RESTful APIs with JWT authentication, input validation, and comprehensive error handling",
      "Deployed production infrastructure on AWS (EC2, S3, RDS), achieving 99.9% uptime and sub-200ms response times",
      "Implemented CI/CD pipelines using GitHub Actions for automated testing, building, and deployment workflows",
      "Optimized database queries and implemented Redis caching, reducing API latency by 60%",
      "Led technical decisions as founding engineer, establishing coding standards and development practices",
      "Integrated OpenAI APIs for intelligent features, implementing LLM-powered workflows and automation",
    ],
  },
  {
    title: "Technical Associate (Executive)",
    company: "AWS Cloud Club at YU",
    period: "Dec 2025 - Present",
    location: "Toronto, Ontario",
    logo: "/logos/aws-cloud-club.jpeg",
    description: "Lead hands-on workshops and technical sessions to teach club members AWS services and cloud best practices.",
    bullets: [
      "Develop and guide collaborative projects that give students practical experience with cloud technologies",
      "Mentor students on AWS certifications and career development in cloud computing",
    ],
  },
  {
    title: "ITAD Production Associate",
    company: "Quantum Lifecycle Partners",
    period: "May 2024 - Present",
    location: "Brampton, Ontario",
    logo: "/logos/quantum.jpeg",
    description: "Applied analytical and problem-solving skills in fast-paced environment with cross-functional teams.",
    bullets: [
      "Diagnose and repair laptops, desktops, and mobile devices, ensuring they meet performance standards",
      "Demonstrated strong communication and collaboration abilities across technical and non-technical stakeholders",
    ],
  },
  {
    title: "Pro Shop Associate",
    company: "Parkshore Golf Club",
    period: "Mar 2024 - Nov 2024",
    location: "Brampton, Ontario",
    description: "Delivered high-quality customer service in a fast-paced, team-oriented environment.",
    bullets: [
      "Handled check-ins, bookings, and payments while maintaining a welcoming and professional atmosphere",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Honours BA in Computer Science",
    school: "York University",
    period: "Sep 2024 - Apr 2028",
    description: "Coursework: Data Structures, Algorithms, Databases, Software Engineering. Active member of AWS Cloud Club York U as Technical Associate (Executive).",
  },
];

export const projects: Project[] = [
  {
    title: "TenantShield",
    event: "CSHub Hacks 2025",
    period: "Jan 2025",
    award: "1st Place Winner & Best Use of Gemini AI",
    description: "AI-powered tenant rights assistant that helps renters identify housing violations and take action.",
    bullets: [
      "Led team to 1st place out of 20+ teams, winning $400 prize and Best Use of Gemini AI award",
      "Built full-stack application with React frontend and Node.js/Express backend in 12 hours",
      "Integrated Google Gemini API for multimodal AI analysis, achieving 85% accuracy on classification tasks",
      "Designed intuitive UX for complex legal information, prioritizing user empathy and accessibility",
    ],
    techStack: ["React", "Node.js", "Express", "Google Gemini API", "Tailwind CSS", "Vercel"],
    github: "https://github.com/kurtjallo/TenantShield",
    demo: "https://tenant-shield-mocha.vercel.app",
  },
  {
    title: "Clarify",
    event: "Hackville 2026",
    period: "Jan 2026",
    description: "Document-aware RAG application helping Canadians understand complex government and legal forms in plain language.",
    bullets: [
      "Built functional RAG system in under 24 hours with vector search using MongoDB Atlas",
      "Implemented document upload, parsing, and semantic search for accurate, grounded responses",
      "Designed accessibility-first UI reducing cognitive load for users navigating complex forms",
      "Created highlight-to-explain feature for inline document clarification",
    ],
    techStack: ["Next.js", "TypeScript", "MongoDB Atlas", "RAG", "Tailwind CSS", "Zustand"],
    github: "https://github.com/kurtjallo/Clarify-Hackville-2026",
    demo: "https://form-bridge-hackville-2026.vercel.app",
  },
  {
    title: "Savour",
    event: "ConUHacks 2026",
    period: "Jan 2026",
    description: "Grocery price comparison web app for Canadian shoppers to compare prices across 5 major stores.",
    bullets: [
      "Built price comparison engine across No Frills, FreshCo, Walmart, Loblaws, and Metro",
      "Implemented price history charts and smart basket optimization algorithms",
      "Created AI recipe generator based on basket items to reduce food waste",
      "Designed responsive UI with real-time savings calculations",
    ],
    techStack: ["React", "TypeScript", "Python", "FastAPI", "MongoDB Atlas", "Tailwind CSS"],
    github: "https://github.com/kurtjallo/savour-conuhacks-2026",
    demo: "https://www.savourapp.tech",
  },
];

export const certifications: Certification[] = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "In Progress",
    description: "Foundational understanding of AWS Cloud concepts, services, and terminology.",
  },
];

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
  frontend: ["React", "React Native", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
  tools: ["AWS", "Docker", "Git", "GitHub Actions", "CI/CD", "Vercel"],
  practices: ["Agile/Scrum", "Code Reviews", "Testing", "System Design"],
};

export const languages = [
  { name: "English", level: "Native" },
  { name: "Tagalog", level: "Conversational" },
];

export const socialLinks = {
  email: "kurtjallorina4@gmail.com",
  linkedin: "https://www.linkedin.com/in/kurtjallorina",
  github: "https://github.com/kurtjallo",
  website: "https://kurtjallorina.me",
};
