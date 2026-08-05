import { LeafMark } from './Logo';

const links = [
  { href: '/#hemp', label: 'מה זה המפ' },
  { href: '/#process', label: 'מהצמח לבד' },
  { href: '/#products', label: 'התיקים' },
  { href: '/#contact', label: 'צור קשר' },
];

export default function Footer() {
  return (
    <footer className="bg-olive-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3 md:items-center">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <LeafMark size={26} />
          <span className="font-serif text-lg tracking-widest">
            EARTH <span className="text-clay">&amp;</span> HEMP
          </span>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-cream/80 md:justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-clay">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-center text-xs tracking-wide text-cream/50 md:text-left">
          © {new Date().getFullYear()} EARTH &amp; HEMP — עבודת יד בנפאל
        </p>
      </div>
    </footer>
  );
}
