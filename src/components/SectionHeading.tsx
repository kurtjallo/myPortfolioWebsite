import type { ComponentProps } from 'react';
import type { Heading } from '@/data';

/** A section's two-line h2: the lead line, then the muted one. */
export function SectionHeading({ heading: [lead, muted], ...rest }: { heading: Heading } & ComponentProps<'h2'>) {
  return (
    <h2 className="h2" {...rest}>
      {lead}
      <br />
      <span className="mute">{muted}</span>
    </h2>
  );
}
