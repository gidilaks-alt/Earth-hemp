import { LeafMark } from './Logo';

export default function ProductImagePlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-sand/50 text-olive-dark/50">
      <LeafMark size={48} />
      <span className="text-xs tracking-wide">תמונה בקרוב</span>
    </div>
  );
}
