'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import AnnouncementTicker from './AnnouncementTicker';

const links = [
  { id: 'hemp', label: 'מה זה המפ' },
  { id: 'process', label: 'מהצמח לבד' },
  { id: 'products', label: 'התיקים' },
  { id: 'contact', label: 'צור קשר' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen ? 'bg-cream/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <AnnouncementTicker />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/#hero" onClick={() => setMenuOpen(false)}>
          <Logo variant="mark" />
        </a>
        <ul className="hidden gap-8 text-sm text-ink/80 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a href={`/#${link.id}`} className="transition-colors hover:text-olive-dark">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
          aria-expanded={menuOpen}
          className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-ink transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-cream transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="m-auto flex flex-col items-center gap-2 px-6">
          {links.map((link) => (
            <li key={link.id} className="w-full max-w-xs border-b border-olive-dark/15 text-center">
              <a
                href={`/#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-4 font-serif text-3xl text-ink transition-colors hover:text-olive-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
