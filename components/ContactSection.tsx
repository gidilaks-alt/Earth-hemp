import Reveal3D from './Reveal3D';

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-olive-dark py-20 text-cream md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal3D>
          <p className="mb-3 text-xs tracking-[0.3em] text-clay">נשמח לשמוע מכם</p>
          <h2 className="font-serif text-4xl md:text-5xl">צור קשר</h2>
        </Reveal3D>
        <Reveal3D delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-cream/80">
            שאלות על המוצרים, הזמנות בסיטונאות או פשוט רוצים לומר שלום —
            נשמח לשמוע מכם.
          </p>
        </Reveal3D>
        <Reveal3D delay={0.2}>
          <form className="mx-auto mt-10 flex max-w-md flex-col gap-4 text-right">
            <input
              type="text"
              placeholder="שם מלא"
              className="rounded-lg border border-cream/25 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/50 focus:border-clay focus:outline-none"
            />
            <input
              type="email"
              placeholder="אימייל"
              className="rounded-lg border border-cream/25 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/50 focus:border-clay focus:outline-none"
            />
            <textarea
              placeholder="הודעה"
              rows={4}
              className="rounded-lg border border-cream/25 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/50 focus:border-clay focus:outline-none"
            />
            <button
              type="submit"
              className="mt-2 rounded-full bg-clay px-8 py-3 text-sm tracking-wide text-ink transition-colors hover:bg-cream"
            >
              שליחה
            </button>
          </form>
        </Reveal3D>
        <p className="mt-14 text-xs tracking-wide text-cream/50">
          © {new Date().getFullYear()} EARTH &amp; HEMP — עבודת יד בנפאל
        </p>
      </div>
    </section>
  );
}
