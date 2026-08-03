'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group rounded-2xl bg-cream/80 p-5 shadow-md ring-1 ring-olive-dark/10"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-sand/50">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 768px) 90vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-5 font-serif text-2xl text-ink">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs tracking-wide text-olive-dark">{product.material}</p>
          <p className="font-serif text-lg text-ink">₪{product.price}</p>
        </div>
      </motion.div>
    </Link>
  );
}
