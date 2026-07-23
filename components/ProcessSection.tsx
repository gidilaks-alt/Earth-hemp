import ParallaxBackdrop from './ParallaxBackdrop';
import Reveal3D from './Reveal3D';

const steps = [
  {
    title: 'גידול',
    text: 'צמחי ההמפ גדלים בשדות טרסות בנפאל, ללא השקיה מלאכותית וללא חומרי הדברה.',
  },
  {
    title: 'טוויה',
    text: 'גבעולי הצמח נטווים ביד לחוטים גסים ועמידים, בשיטות מסורתיות שעוברות מדור לדור.',
  },
  {
    title: 'אריגה ותפירה',
    text: 'החוטים נארגים לבד, ולאחר מכן נתפרים ביד לכל תיק — עבודה איטית ומדויקת.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-sand/40 py-28">
      <ParallaxBackdrop />
      <div className="mx-auto max-w-5xl px-6">
        <Reveal3D className="text-center">
          <p className="mb-3 text-xs tracking-[0.3em] text-olive-dark">התהליך</p>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">מהצמח לבד</h2>
        </Reveal3D>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal3D key={step.title} delay={i * 0.12}>
              <div className="rounded-2xl border border-olive-dark/10 bg-cream/70 p-8 text-center shadow-sm">
                <span className="font-serif text-3xl text-clay">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </div>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}
