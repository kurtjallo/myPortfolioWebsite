export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-background text-foreground px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-primary">404 — Page not found</p>
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
        Lost in the clouds.
      </h1>
      <p className="text-foreground/70 max-w-md text-lg">
        The page you're looking for doesn't exist or has moved.
      </p>
      <a
        href="/"
        className="px-5 py-2.5 rounded-sm bg-background/70 border border-border font-mono text-sm uppercase tracking-widest text-foreground hover:border-primary/50 hover:text-primary transition-colors"
      >
        Back home
      </a>
    </div>
  );
}
