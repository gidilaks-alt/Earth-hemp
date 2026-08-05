import Reveal3D from './Reveal3D';

export default function NewsletterSection() {
  return (
    <section className="bg-sand/40 py-16">
      <div className="mx-auto max-w-xl px-6 text-center">
        <Reveal3D>
          <p className="mb-3 text-xs tracking-[0.3em] text-olive-dark">הצטרפו לרשימת התפוצה</p>
          <h2 className="font-serif text-3xl text-ink">מוצרים חדשים, ישר לתיבה</h2>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <input type="text" name="bot-field" className="hidden" tabIndex={-1} autoComplete="off" />
            <input
              type="email"
              name="email"
              placeholder="האימייל שלכם"
              required
              className="flex-1 rounded-full border border-olive-dark/25 bg-cream px-5 py-3 text-ink placeholder:text-ink/50 focus:border-olive-dark focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-olive-dark px-8 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-olive-dark/90"
            >
              הרשמה
            </button>
          </form>
        </Reveal3D>
      </div>
    </section>
  );
}
