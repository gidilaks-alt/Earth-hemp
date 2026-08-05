'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false });

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-cream">
      <Hero3D />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 text-center md:pt-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-xs tracking-[0.35em] text-olive-dark md:text-sm"
        >
          עבודת יד בנפאל
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif text-4xl tracking-wide text-ink sm:text-5xl md:text-7xl"
        >
          Earth <span className="text-clay">&amp;</span> Hemp
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mx-auto mt-5 max-w-md text-lg text-ink/70 md:text-xl"
        >
          תיקים ואביזרים מבד המפ
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          href="#hemp"
          className="mt-10 inline-block rounded-full border border-olive-dark/40 px-8 py-3 text-sm tracking-wide text-olive-dark transition-colors hover:bg-olive-dark hover:text-cream"
        >
          גלו את הסיפור
        </motion.a>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-ink/25"
        >
          <div className="mx-auto mt-1.5 h-1.5 w-1.5 rounded-full bg-ink/40" />
        </motion.div>
      </div>
    </section>
  );
}
