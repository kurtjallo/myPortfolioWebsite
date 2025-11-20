import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Hobbies } from "@/components/Hobbies";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200 blur-[120px] dark:bg-blue-900" />
        <div className="absolute right-10 top-40 h-48 w-48 rounded-full bg-pink-200 blur-[120px] dark:bg-pink-900" />
      </div>
      <Navbar />
      <main className="space-y-0">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
