import type { Metadata } from 'next';
import { Frank_Ruhl_Libre, Assistant } from 'next/font/google';
import './globals.css';

const heading = Frank_Ruhl_Libre({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Assistant({
  subsets: ['latin', 'hebrew'],
  weight: ['300', '400', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EARTH & HEMP — תיקים ואביזרים מבד המפ',
  description:
    'EARTH & HEMP — תיקים ואביזרים מבד המפ, עבודת יד בנפאל. The Crossbody, The Wallet ו-Desert Edition.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heading.variable} ${body.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
