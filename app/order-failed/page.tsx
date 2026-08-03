import Link from 'next/link';
import Nav from '@/components/Nav';

export default function OrderFailedPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-olive-dark">משהו השתבש</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">התשלום לא הושלם</h1>
        <p className="mt-5 max-w-md text-lg text-ink/70">
          לא הצלחנו להשלים את החיוב. לא בוצע שום חיוב בכרטיס שלכם. אפשר לנסות שוב, או ליצור איתנו קשר אם הבעיה חוזרת.
        </p>
        <Link
          href="/#products"
          className="mt-10 inline-block rounded-full border border-olive-dark/40 px-8 py-3 text-sm tracking-wide text-olive-dark transition-colors hover:bg-olive-dark hover:text-cream"
        >
          חזרה לקטלוג
        </Link>
      </main>
    </>
  );
}
