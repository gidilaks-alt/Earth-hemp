'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Reveal3D from './Reveal3D';
import type { Product } from '@/lib/products';

/**
 * Renders the build-time product list immediately (fast paint, works with
 * no JS), then refreshes from the live admin-editable store after mount so
 * edits made in /admin show up without needing a full site rebuild.
 */
export default function LiveProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [items, setItems] = useState(initialProducts);

  useEffect(() => {
    fetch('/.netlify/functions/products')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setItems(data))
      .catch(() => {});
  }, []);

  return (
    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {items.map((product, i) => (
        <Reveal3D key={product.id} delay={i * 0.1}>
          <ProductCard product={product} />
        </Reveal3D>
      ))}
    </div>
  );
}
