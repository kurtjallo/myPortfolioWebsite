const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-white/40 py-8 text-center text-sm app-text-muted dark:border-gray-800/70 dark:bg-gray-950/40">
      <p>
        Thanks for stopping by — Kurt &copy; {year}. Built this with Next.js, Tailwind, and
        a steady loop of coffee, pickup hoops, and late-night shows.
      </p>
    </footer>
  );
}
