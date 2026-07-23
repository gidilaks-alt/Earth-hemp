'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Section-entry transition: a subtle 3D rotateX/perspective tilt that
 * settles flat as the section scrolls into view, used to sell "3D
 * transitions between sections" without a full WebGL scene per section.
 */
export default function Reveal3D({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, rotateX: 18, y: 60 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
