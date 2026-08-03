export type Product = {
  id: string;
  name: string;
  description: string;
  material: string;
  image: string;
  alt: string;
  /** ILS, whole shekels. PLACEHOLDER — replace with real prices before going live. */
  price: number;
};

export const products: Product[] = [
  {
    id: 'crossbody',
    name: 'The Crossbody',
    description: 'תיק צד קטן, רצועה מתכווננת, סגירה בשרוך.',
    material: 'בד המפ · עבודת יד בנפאל',
    image: '/assets/crossbody.jpg',
    alt: 'תיק צד קטן מבד המפ בגוון קרם טבעי, נלבש צולב על ידי גבר על רקע מפרץ אילת וההרים, עם רצועה מתכווננת וסגירה בשרוך',
    price: 149,
  },
  {
    id: 'wallet',
    name: 'The Wallet',
    description: 'ארנק קומפקטי לכרטיסים, שטרות ומטבעות.',
    material: 'בד המפ · עבודת יד בנפאל',
    image: '/assets/wallet.jpg',
    alt: 'ארנק קומפקטי מבד המפ טבעי עם תאים לכרטיסים, שטרות ומטבעות, על רקע עץ בהיר',
    price: 89,
  },
  {
    id: 'desert-edition',
    name: 'Desert Edition',
    description: 'תיק צד הנלבש על הכתף או צולב.',
    material: 'בד המפ · עבודת יד בנפאל',
    image: '/assets/desert-edition.jpg',
    alt: 'תיק צד בגוון חול מדברי מבד המפ עם תווית "PEACE" ותליון עץ בצורת פטרייה, מונח על שטיח מקרמה על רקע דיונות חול בשעת שקיעה',
    price: 169,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
