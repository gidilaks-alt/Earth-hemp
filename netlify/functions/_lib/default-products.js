// Mirrors lib/products.ts. Used as the seed/fallback before any admin edits
// exist in Blob storage. Keep in sync manually if you change lib/products.ts.
module.exports = [
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
  {
    id: 'tobacco-case',
    name: 'קייס טבק',
    description: 'קייס מבד המפ לאחסון נוח, עם סגירה בטוחה.',
    material: 'בד המפ · עבודת יד בנפאל',
    image: null,
    alt: 'קייס טבק מבד המפ',
    price: 79,
  },
  {
    id: 'hat',
    name: 'כובע',
    description: 'כובע מבד המפ טבעי, נוח ומאוורר.',
    material: 'בד המפ · עבודת יד בנפאל',
    image: null,
    alt: 'כובע מבד המפ',
    price: 99,
  },
];
