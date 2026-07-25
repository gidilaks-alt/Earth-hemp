'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';

const links = [
  { id: 'hemp', label: 'מה זה המפ' },
  { id: 'process', label: 'מהצמח לבד' },
  { id: 'products', label: 'התיקים' },
  { id: 'contact', label: 'צור קשר' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero">
          <Logo variant="mark" />
        </a>
        <ul className="hidden gap-8 text-sm text-ink/80 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="transition-colors hover:text-olive-dark">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
