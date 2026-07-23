'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Depth-layered parallax field behind a section: three translucent shapes
 * moving at different scroll-linked speeds/scales/rotations to read as a
 * 3D scene without needing WebGL for every section.
 */
export default function ParallaxBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const yBack = useTransform(scrollYProgress, [0, 1], ['-8%', '18%']);
  const yMid = useTransform(scrollYProgress, [0, 1], ['-14%', '10%']);
  const yFront = useTransform(scrollYProgress, [0, 1], ['-20%', '4%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 6]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: yBack }}
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-clay/20 blur-3xl"
      />
      <motion.div
        style={{ y: yMid, rotate }}
        className="absolute -left-16 top-1/3 h-56 w-56 rounded-full bg-olive/20 blur-2xl"
      />
      <motion.div
        style={{ y: yFront }}
        className="absolute right-1/4 bottom-0 h-40 w-40 rounded-full bg-sand/30 blur-2xl"
      />
    </div>
  );
}
