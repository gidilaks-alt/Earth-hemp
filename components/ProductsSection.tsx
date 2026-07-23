import { products } from '@/lib/products';
import ProductCard from './ProductCard';
import Reveal3D from './Reveal3D';

export default function ProductsSection() {
  return (
    <section id="products" className="relative bg-cream py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal3D className="text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-olive-dark">הקולקציה</p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">התיקים</h2>
        </Reveal3D>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal3D key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}
