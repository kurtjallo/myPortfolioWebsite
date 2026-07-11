// Shared eyebrow heading used by the About / Experience / Projects sections.
export function SectionHeading({ label, className = "" }: { label: string; className?: string }) {
  return (
    <h2 className={`text-sm font-sans font-semibold tracking-widest uppercase text-primary flex items-center gap-4 ${className}`}>
      <span className="w-8 h-px bg-primary opacity-50" />
      {label}
    </h2>
  );
}
