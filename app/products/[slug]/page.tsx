import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import LiveProductDetail from '@/components/LiveProductDetail';
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
        <LiveProductDetail initialProduct={product} />
      </main>
    </>
  );
}
