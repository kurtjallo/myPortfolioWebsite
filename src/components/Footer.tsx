const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-(--border-color) bg-[rgba(11,17,32,0.7)] py-8 text-center text-sm text-(--text-muted)">
      <p>
        Thanks for stopping by — Kurt &copy; {year}. Built this with Next.js, Tailwind, and
        a steady loop of coffee, pickup hoops, and late-night shows.
      </p>
    </footer>
  );
}
