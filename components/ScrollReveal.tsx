'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// GSAP ScrollTrigger stagger for elements marked data-reveal inside this wrapper.
// Used on BELOW-THE-FOLD content only, so the hero (LCP) never waits on JavaScript.
export default function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // gsap.context scopes selectors to `root` and lets us revert everything on unmount.
      ctx = gsap.context(() => {
        gsap.from('[data-reveal]', {
          autoAlpha: 0,
          y: 24, // transform + opacity only: GPU-friendly, no layout work
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
