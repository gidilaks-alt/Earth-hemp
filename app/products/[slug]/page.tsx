import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import BuyButton from '@/components/BuyButton';
import { products, getProduct } from '@/lib/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — EARTH & HEMP`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 pb-28 pt-32">
        <Link href="/#products" className="text-sm text-olive-dark hover:underline">
          ← חזרה לקטלוג
        </Link>
        <div className="mt-8 grid gap-12 md:grid-cols-2 md:items-start">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand/50">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="font-serif text-4xl text-ink md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">{product.description}</p>
            <p className="mt-3 text-sm tracking-wide text-olive-dark">{product.material}</p>
            <p className="mt-8 font-serif text-3xl text-ink">₪{product.price}</p>
            <div className="mt-8">
              <BuyButton productId={product.id} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
