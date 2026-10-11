# Kurt Jallorina — Personal Site

Personal portfolio site built with Vite, React, and TypeScript, styled with plain CSS. The hero canvas (ripple trail and code band) and the pinned Skills stack use no animation libraries.

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

- `src/data.ts` — all site content: about, experience, projects, the four skill layers, contact (edit here to update the site)
- `src/App.tsx` — the page: `Nav`, `Hero`, `About`, `Experience`, `Projects`, `Stack`, `ContactBand`
- `src/components/` — one component per section, each with its own stylesheet
  - `hero/scene.ts` — the canvas scene behind the hero (ripple trail and code band)
  - `Stack.tsx` + `stack/plates.ts` — the pinned, scroll-driven isometric plate stack in Skills
- `src/hooks/useScramble.ts` — the text decode effect on Experience hover
- `src/lib/` — theme (light/dark on `<html data-theme>`), motion helpers (reduced motion, off-screen pausing, canvas DPR), scroll reveals
- `src/styles/tokens.css` — colour tokens for light and dark, fonts, and shared type and layout utilities
- `src/assets/` — the ASCII portrait (light and dark art)
- `public/` — static assets served as-is (favicon, robots.txt)

## Deploy on Vercel

Configured via `vercel.json` (framework: `vite`, output: `dist`). Push to the connected repo and Vercel builds and deploys automatically.
