import ParallaxBackdrop from './ParallaxBackdrop';
import Reveal3D from './Reveal3D';

export default function AboutHempSection() {
  return (
    <section id="hemp" className="relative overflow-hidden bg-cream py-28">
      <ParallaxBackdrop />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal3D>
          <p className="mb-3 text-xs tracking-[0.3em] text-olive-dark">הצמח שמאחורי הבד</p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">מה זה המפ</h2>
        </Reveal3D>
        <Reveal3D delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-loose text-ink/75">
            המפ הוא אחד הצמחים העתיקים והברי-קיימא בעולם. סיבי הגבעול שלו נטווים לבד עמיד,
            נושם וטבעי לחלוטין — ללא צביעה כימית וללא תהליכים מלאכותיים. זהו בד שמתחזק עם
            הזמן, נעים למגע, ומספר סיפור של אדמה, שמש ומים בכל תפר.
          </p>
        </Reveal3D>
      </div>
    </section>
  );
}
