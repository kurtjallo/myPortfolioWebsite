import type { SimpleIcon } from 'simple-icons';
import {
  siC, siCss, siDjango, siDocker, siExpress, siFastapi, siGit, siGithubactions, siGnubash, siGrafana, siHtml5,
  siJavascript, siKubernetes, siLangchain, siLaravel, siMongodb, siNextdotjs, siNodedotjs, siNumpy,
  siPandas, siPhp, siPostgresql, siPrometheus, siPython, siRabbitmq, siReact, siRedis, siSentry, siTailwindcss,
  siTypescript, siVercel, siVite, siVitest,
} from 'simple-icons';
import portraitDark from '@/assets/portrait-ascii-dark.txt?raw';
import portraitLight from '@/assets/portrait-ascii-light.txt?raw';

/** A skill with its logo; `icon: null` renders a monogram tile (no logo in simple-icons). */
export type Skill = { name: string; icon: SimpleIcon | null };

/** A role from LinkedIn. `end: null` means current. Only the one-liner describes the work. */
export type Role = {
  company: string;
  role: string;
  type: 'Full-time' | 'Internship' | 'Remote';
  start: string;
  end: string | null;
  location: string;
  oneLiner: string;
};

export type Project = {
  name: string;
  event: string;
  description: string;
  stack: string[];
  link: string;
};

export type LayerId = 'frontend' | 'backend' | 'data' | 'cloud';

/** One plate of the Skills stack: its step text, two callouts on the plate, and its skills. */
export type Layer = {
  id: LayerId;
  name: string;
  title: string;
  line: string;
  callouts: [string, string];
  skills: Skill[];
};

export type Heading = [first: string, muted: string];

export const SITE = {
  name: 'Kurt Jallorina',
  role: 'Software Engineer',
  location: 'Toronto',
  email: 'kurtjallorina6@gmail.com',
};

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export const ABOUT = {
  heading: ["Hey, I'm Kurt.", 'I ship things end to end.'] as Heading,
  intro:
    "I'm a software engineer in Toronto. I build full-stack products end to end, from the API to the interface, and lately a lot of AI tooling. I care about moving fast without breaking production, and I spend my spare time growing Toronto's builder community.",
  whatIDo: [
    'Build and ship full-stack features end to end',
    'Build what customers want and ship it fast',
    'Build AI products that real users rely on',
    'Build tools and AI agents that help me ship faster',
    'Keep production fast and reliable',
  ],
  community: 'Replit Ambassador. Growing the builder community through events and technical content.',
  /** The portrait as ASCII art (190 x 100 cells of JetBrains Mono, cropped at mid-chest); dark-theme art has ink where the photo is bright. */
  portrait: { light: portraitLight, dark: portraitDark, cols: 190, rows: 100 },
};

export const EXPERIENCE_HEADING: Heading = ["Where I've shipped.", 'Most recent first.'];

export const ROLES: Role[] = [
  {
    company: 'tofu',
    role: 'Software Engineer',
    type: 'Full-time',
    start: 'Jul 2026',
    end: null,
    location: 'Toronto, ON · Hybrid',
    oneLiner:
      "Backend systems that help companies catch fake candidates, spot deepfakes in live interviews, and know who they're really hiring.",
  },
  {
    company: 'Nmbr',
    role: 'Software Engineer Intern',
    type: 'Internship',
    start: 'May 2026',
    end: 'Aug 2026',
    location: 'Toronto, ON · Hybrid',
    oneLiner: 'Embedded payroll for Canada, built into the vertical SaaS platforms businesses already use.',
  },
  {
    company: 'HAVN Inc.',
    role: 'Software Engineer',
    type: 'Remote',
    start: 'Dec 2025',
    end: 'May 2026',
    location: 'Delaware, US · Remote',
    oneLiner: 'A privacy-first social networking platform.',
  },
];

export const PROJECTS_HEADING: Heading = ['Selected projects.', 'Built and shipped.'];

export const PROJECTS: Project[] = [
  {
    name: 'Clarify',
    event: 'Hackville 2026',
    description:
      'A full-stack document chatbot that helps users navigate legal and tax forms using Retrieval-Augmented Generation and MongoDB Atlas Vector Search, returning answers with 95%+ retrieval accuracy.',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB Atlas Vector Search'],
    link: 'https://github.com/kurtjallo/Clarify-Hackville-2026',
  },
  {
    name: 'Visual Debugger',
    event: 'Open Source',
    description:
      'An open-source VS Code extension that converts developer errors into structured plain-English explanations using Gemini 2.0 Flash, reaching 100+ installs.',
    stack: ['JavaScript', 'TypeScript', 'VS Code Extension API', 'Gemini 2.0 Flash', 'Chart.js'],
    link: 'https://github.com/kurtjallo',
  },
];

export const GITHUB_URL = 'https://github.com/kurtjallo';

export const STACK_HEADING: Heading = ['How I build.', 'From the UI to the cloud.'];
export const STACK_LEAD = 'Four layers I work across, from what people click to where it runs.';

const s = (name: string, icon: SimpleIcon | null): Skill => ({ name, icon });

export const STACK: Layer[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    title: 'Interface',
    line: 'React and Next.js front ends, styled with Tailwind and shipped on Vercel.',
    callouts: ['REACT + NEXT.JS', 'SHIPPED ON VERCEL'],
    skills: [
      s('React', siReact), s('Next.js', siNextdotjs), s('Vite', siVite),
      s('Tailwind CSS', siTailwindcss), s('Vitest', siVitest), s('Vercel', siVercel),
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    title: 'Services',
    line: 'APIs and services in Python and TypeScript, built with Django, FastAPI and Node.',
    callouts: ['PYTHON + DJANGO', 'FASTAPI + NODE'],
    skills: [
      s('Python', siPython), s('TypeScript', siTypescript), s('JavaScript', siJavascript), s('Bash', siGnubash),
      s('HTML', siHtml5), s('CSS', siCss), s('PHP', siPhp), s('Java', null), s('C', siC),
      s('Django', siDjango), s('FastAPI', siFastapi), s('Node.js', siNodedotjs), s('Express', siExpress),
      s('Laravel', siLaravel),
    ],
  },
  {
    id: 'data',
    name: 'Data & AI',
    title: 'Data and models',
    line: 'Postgres, Redis and queues underneath, with LLM features built on top.',
    callouts: ['POSTGRES + REDIS', 'RAG + VECTOR SEARCH'],
    skills: [
      s('PostgreSQL', siPostgresql), s('Redis', siRedis), s('RabbitMQ', siRabbitmq), s('MongoDB', siMongodb),
      s('LangChain', siLangchain), s('pandas', siPandas), s('NumPy', siNumpy),
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & Ops',
    title: 'Delivery and observability',
    line: 'Docker on AWS and CI in GitHub Actions, with Logfire, Grafana, Prometheus and Sentry watching production.',
    callouts: ['DOCKER ON AWS', 'GRAFANA + LOGFIRE'],
    skills: [
      s('AWS', null), s('Docker', siDocker), s('Kubernetes', siKubernetes),
      s('GitHub Actions', siGithubactions), s('Git', siGit),
      s('Logfire', null), s('Grafana', siGrafana), s('Prometheus', siPrometheus), s('Sentry', siSentry),
    ],
  },
];

export const CONTACT = {
  marquee: "Let's build something.",
  body: 'Always open to discussing new opportunities, side projects, or just grabbing a coffee in Toronto.',
  status: 'Open to opportunities · Toronto',
};

export const LINKS = {
  email: { label: 'Email', href: `mailto:${SITE.email}` },
  github: { label: 'GitHub', href: GITHUB_URL },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kurtjallorina/' },
  events: { label: 'Events', href: 'https://luma.com/user/kurtjallo' },
};
