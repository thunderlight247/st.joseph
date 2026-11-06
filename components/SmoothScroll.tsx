'use client';

import { useEffect, type ReactNode } from 'react';

type LenisInstance = InstanceType<typeof import('lenis').default>;

// Lenis smooth scrolling, driven by GSAP's ticker (which runs on requestAnimationFrame)
// so Lenis and ScrollTrigger always update in the same frame.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who ask the OS for less motion. Native scrolling stays untouched.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let lenis: LenisInstance | undefined;
    let tick: ((time: number) => void) | undefined;
    let removeTicker: (() => void) | undefined;

    (async () => {
      // PERF: loaded after hydration via dynamic import, so Lenis + GSAP (~45 KB gzip)
      // never block first paint on a slow connection.
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);

      tick = (time: number) => lenis?.raf(time * 1000); // gsap time is in seconds
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => tick && gsap.ticker.remove(tick);
    })();

    return () => {
      cancelled = true;
      removeTicker?.();
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
