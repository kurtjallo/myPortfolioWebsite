# Kurt Jallorina

My personal website. It's a single page built with Vite, React and TypeScript, styled with plain CSS. The hero's code field and cursor trail are drawn on a canvas, and the Skills section pins an isometric plate stack as you scroll. Neither uses an animation library.

## Getting started

You need Node.js 20.19+ or 22.12+ (what Vite 7 supports).

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173). The page reloads as you edit.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server on port 5173. |
| `npm run build` | Builds the site into `dist/`. |
| `npm run preview` | Serves the built `dist/` locally, to check a build before deploying. |
| `npm run typecheck` | Type-checks the project with `tsc`. The build does not run this, so run it before you push. |

## Where things live

To change any text on the site, edit `src/data.ts`. It holds the about copy, experience, projects, the four skill layers, contact links and section headings.

| Path | Contents |
| --- | --- |
| `src/App.tsx` | The page, in order: `Nav`, `Hero`, `About`, `Experience`, `Projects`, `Stack`, `ContactBand`. |
| `src/components/` | One component per section, each with its own stylesheet. |
| `src/components/hero/scene.ts` | The hero canvas: the code field and the cursor trail. |
| `src/components/Stack.tsx`, `stack/plates.ts` | The scroll-pinned Skills stack and its plate artwork. |
| `src/components/Logo.tsx` | The logo mark, also used in `public/favicon.svg`. |
| `src/hooks/useScramble.ts` | The text decode effect on the Experience roles. |
| `src/lib/` | The light and dark theme switch, reduced-motion and off-screen pausing helpers, and scroll reveals. |
| `src/styles/tokens.css` | Colours for both themes, fonts, and shared type and layout styles. |
| `src/assets/` | The ASCII portrait, one file for each theme. |
| `public/` | Files served as they are: `favicon.svg` and `robots.txt`. |

## Deploy on Vercel

The site deploys on Vercel. `vercel.json` sets the framework to Vite, the build command to `vite build` and the output folder to `dist`.

With the repo connected to Vercel, every push to `main` deploys the live site, and every pull request gets its own preview URL. To deploy by hand instead, run `npx vercel` for a preview or `npx vercel --prod` for production.
