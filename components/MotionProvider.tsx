'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

// PERF: LazyMotion + the `m` component ships ~5 KB instead of ~30 KB for the full `motion` bundle.
// `strict` makes the build fail if anyone accidentally imports the heavy `motion` component.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
