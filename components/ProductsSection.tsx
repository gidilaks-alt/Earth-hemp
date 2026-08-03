import { products } from '@/lib/products';
import LiveProductGrid from './LiveProductGrid';
import Reveal3D from './Reveal3D';

export default function ProductsSection() {
  return (
    <section id="products" className="relative bg-cream py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal3D className="text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-olive-dark">הקולקציה</p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">התיקים</h2>
        </Reveal3D>
        <LiveProductGrid initialProducts={products} />
      </div>
    </section>
  );
}
