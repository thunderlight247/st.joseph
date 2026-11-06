import { Fragment } from 'react';

// React Bits-style "BlurText" headline (word-by-word blur-in).
// Server component + CSS keyframes (see globals.css): visible in the first HTML paint, no JS needed.
// Swap in the original from reactbits.dev if you want its spring options; this version is
// deliberately dependency-free for the LCP element.
export default function BlurText({
  text,
  as: Tag = 'h1',
  id,
  className,
  stepMs = 70,
}: {
  text: string;
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
  stepMs?: number;
}) {
  const words = text.split(' ');
  return (
    // aria-label keeps the heading readable as one sentence for screen readers
    <Tag id={id} aria-label={text} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden="true" className="blur-in" style={{ animationDelay: `${i * stepMs}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
