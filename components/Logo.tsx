const LEAFLETS = [
  { angle: -72, length: 92, width: 20 },
  { angle: -48, length: 108, width: 24 },
  { angle: -24, length: 122, width: 27 },
  { angle: 0, length: 132, width: 29 },
  { angle: 24, length: 122, width: 27 },
  { angle: 48, length: 108, width: 24 },
  { angle: 72, length: 92, width: 20 },
];

function Leaflet({ angle, length, width, accent }: { angle: number; length: number; width: number; accent?: boolean }) {
  const half = width / 2;
  return (
    <g transform={`rotate(${angle})`}>
      <path
        d={`M 0,0 Q ${-half},${-length * 0.42} 0,${-length} Q ${half},${-length * 0.42} 0,0 Z`}
        fill="none"
        stroke="#3f4a2c"
        strokeWidth={2.2}
      />
      <line x1={0} y1={0} x2={0} y2={-length} stroke="#3f4a2c" strokeWidth={1} />
      {Array.from({ length: 5 }).map((_, i) => {
        const t = (i + 1) / 6;
        const y = -length * t;
        const w = half * (1 - t) * 0.85;
        return (
          <g key={i} stroke={accent && i % 2 === 0 ? '#b98f4a' : '#3f4a2c'} strokeWidth={0.8}>
            <line x1={0} y1={y} x2={-w} y2={y + length * 0.06} />
            <line x1={0} y1={y} x2={w} y2={y + length * 0.06} />
          </g>
        );
      })}
    </g>
  );
}

export function LeafMark({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.86} viewBox="-140 -145 280 155" role="img" aria-label="סמל עלה המפ">
      {LEAFLETS.map((leaflet, i) => (
        <Leaflet key={leaflet.angle} {...leaflet} accent={i === 2 || i === 4} />
      ))}
      <circle cx={0} cy={0} r={3} fill="#3f4a2c" />
    </svg>
  );
}

export default function Logo({
  variant = 'photo',
  className = '',
}: {
  variant?: 'photo' | 'mark';
  className?: string;
}) {
  if (variant === 'mark') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <LeafMark size={28} />
        <span className="font-serif text-lg tracking-widest text-ink">
          EARTH <span className="text-clay">&amp;</span> HEMP
        </span>
      </div>
    );
  }

  return (
    <img
      src="/assets/logo.jpg"
      alt='לוגו EARTH & HEMP — סמל עלה המפ, "Handcrafted | Organic", "EST. 2026 | ISRAEL"'
      className={className}
    />
  );
}
