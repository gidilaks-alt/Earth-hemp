'use client';

import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

/**
 * Writes 0→1 scroll progress of the given section id into a ref every
 * frame via scroll listener, read by R3F components in useFrame without
 * triggering React re-renders.
 */
export function useScrollProgress(ref: MutableRefObject<number>, sectionId: string) {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const progress = 1 - Math.min(Math.max(rect.top / viewportH, -1), 1);
      ref.current = progress;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, sectionId]);
}
