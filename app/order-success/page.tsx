import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function OrderSuccessPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-olive-dark">תודה!</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">ההזמנה התקבלה בהצלחה</h1>
        <p className="mt-5 max-w-md text-lg text-ink/70">
          קיבלנו את התשלום שלכם ונשלח לכם עדכון במייל בהקדם. תודה שבחרתם ב-EARTH &amp; HEMP.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full border border-olive-dark/40 px-8 py-3 text-sm tracking-wide text-olive-dark transition-colors hover:bg-olive-dark hover:text-cream"
        >
          חזרה לאתר
        </Link>
      </main>
      <Footer />
    </>
  );
}
