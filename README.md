# Kurt Jallorina — Personal Site

Personal portfolio site built with Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run typecheck` — run TypeScript type checking

## Where things live

- `src/pages/Home.tsx` — the main page, composed of section components
- `src/components/` — page sections (`Hero`, `About`, `Experience`, `Projects`, `Footer`, `Navigation`) and `ui/` (shadcn primitives)
- `src/data.ts` — experience, projects, and skills content (edit here to update the site)
- `src/index.css` — Tailwind theme, fonts, and color tokens (light/dark)
- `attached_assets/` — images imported via the `@assets` alias
- `public/` — static assets served as-is (favicon, resume, robots.txt)

## Deploy on Vercel

Configured via `vercel.json` (framework: `vite`, output: `dist`, SPA rewrites). Push to the connected repo and Vercel builds and deploys automatically.
