import { useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Nav } from '@/components/Nav';
import { CommandMenu } from '@/components/CommandMenu';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Stack } from '@/components/Stack';
import { ContactBand } from '@/components/ContactBand';
import { useReveal } from '@/lib/reveal';

export default function App() {
  const main = useRef<HTMLElement>(null);
  useReveal(main);
  return (
    <>
      <Nav />
      <main ref={main}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <ContactBand />
      </main>
      <CommandMenu />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
