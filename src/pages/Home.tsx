import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-foreground">
      <div className="noise-bg" />
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}
