const ITEMS = ['עבודת יד בנפאל', '100% בד המפ טבעי', 'כל תיק נתפר ביד', 'משלוח לכל הארץ'];

function TickerContent() {
  return (
    <div className="flex shrink-0 items-center gap-3 whitespace-nowrap px-3">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-[0.2em]">{item}</span>
          <span className="h-1 w-1 rounded-full bg-cream/50" />
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementTicker() {
  return (
    <div className="flex h-9 items-center overflow-hidden bg-olive-dark text-cream">
      <div className="flex w-max animate-marquee">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
