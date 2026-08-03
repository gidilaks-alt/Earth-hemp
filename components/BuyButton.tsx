'use client';

import { useState } from 'react';

export default function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok || !data.paymentUrl) {
        throw new Error(data.error || 'שגיאה ביצירת עמוד תשלום');
      }
      window.location.href = data.paymentUrl;
    } catch (e) {
      setError('לא הצלחנו לפתוח את עמוד התשלום. נסו שוב בעוד רגע.');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleBuy}
        disabled={loading}
        className="rounded-full bg-olive-dark px-10 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-olive-dark/90 disabled:opacity-60"
      >
        {loading ? 'מעביר לתשלום…' : 'קנו עכשיו'}
      </button>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
