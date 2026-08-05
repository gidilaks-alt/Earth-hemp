'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import BuyButton from './BuyButton';
import ProductImagePlaceholder from './ProductImagePlaceholder';
import type { Product } from '@/lib/products';

/**
 * Same build-time-first, live-refresh-after-mount pattern as
 * LiveProductGrid, but for a single product's detail view.
 */
export default function LiveProductDetail({ initialProduct }: { initialProduct: Product }) {
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    fetch('/.netlify/functions/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const fresh = Array.isArray(data) && data.find((p) => p.id === initialProduct.id);
        if (fresh) setProduct(fresh);
      })
      .catch(() => {});
  }, [initialProduct.id]);

  return (
    <div className="mt-8 grid gap-12 md:grid-cols-2 md:items-start">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand/50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover"
            priority
          />
        ) : (
          <ProductImagePlaceholder />
        )}
      </div>
      <div>
        <p className="text-xs tracking-[0.3em] text-olive-dark">הקולקציה</p>
        <h1 className="mt-2 font-serif text-4xl text-ink md:text-5xl">{product.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/75">{product.description}</p>
        <p className="mt-3 text-sm tracking-wide text-olive-dark">{product.material}</p>
        <div className="mt-8 border-t border-olive-dark/15 pt-8">
          <p className="font-serif text-3xl text-ink">₪{product.price}</p>
          <div className="mt-6">
            <BuyButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
