import Image from 'next/image';
import ParallaxBackdrop from './ParallaxBackdrop';
import Reveal3D from './Reveal3D';

const workshopPhotos = [
  {
    src: '/assets/workshop-1.jpg',
    alt: 'תופרת בסדנה בנפאל תופרת בד המפ ירוק במכונת תפירה תעשייתית',
  },
  {
    src: '/assets/workshop-2.jpg',
    alt: 'תופרת בסדנה בנפאל תופרת בד המפ ורוד, ערימות גלילי בד ברקע',
  },
  {
    src: '/assets/workshop-3.jpg',
    alt: 'תופר בסדנה בנפאל מודד ותופר בד המפ ירקרק במכונת תפירה',
  },
];

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
        <Reveal3D delay={0.3} className="mt-14">
          <p className="mb-6 text-center text-xs tracking-[0.3em] text-olive-dark">מהסדנה שלנו בנפאל</p>
          <div className="grid gap-4 md:grid-cols-3">
            {workshopPhotos.map((photo) => (
              <div key={photo.src} className="relative aspect-square overflow-hidden rounded-2xl shadow-sm">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}
