'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { products as defaultProducts, type Product } from '@/lib/products';

const TOKEN_KEY = 'earth_hemp_admin_token';
const MAX_BYTES = 5 * 1024 * 1024;

function LoginForm({ onLoggedIn }: { onLoggedIn: (token: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || 'שגיאה');
      localStorage.setItem(TOKEN_KEY, data.token);
      onLoggedIn(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'סיסמה שגויה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-32 max-w-sm px-6 text-center">
      <h1 className="font-serif text-3xl text-ink">כניסת מנהל</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
        className="mt-6 w-full rounded-lg border border-olive-dark/25 px-4 py-3 text-center focus:border-olive-dark focus:outline-none"
        autoFocus
      />
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-full bg-olive-dark px-8 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-olive-dark/90 disabled:opacity-60"
      >
        {loading ? 'בודק…' : 'כניסה'}
      </button>
    </form>
  );
}

function ProductEditor({
  product,
  token,
  onSaved,
}: {
  product: Product;
  token: string;
  onSaved: (updated: Product) => void;
}) {
  const [draft, setDraft] = useState(product);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setError('סוג קובץ לא נתמך (jpeg/png/webp בלבד)');
      return;
    }
    if (f.size > MAX_BYTES) {
      setError('הקובץ גדול מדי (מקסימום 5MB)');
      return;
    }
    setError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const save = async () => {
    setStatus('saving');
    setError(null);
    try {
      let updated = draft;

      if (file) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const uploadRes = await fetch('/.netlify/functions/admin-upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            productId: draft.id,
            imageBase64: base64,
            contentType: file.type,
          }),
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'העלאת התמונה נכשלה');
        updated = { ...updated, image: uploadData.imageUrl };
      }

      onSaved(updated);
      setDraft(updated);
      setStatus('saved');
      setFile(null);
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'שמירה נכשלה');
    }
  };

  return (
    <div className="rounded-2xl border border-olive-dark/10 bg-cream/70 p-6">
      <div className="grid gap-6 md:grid-cols-[160px_1fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-sand/50">
            {preview || draft.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview ?? draft.image ?? ''} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-olive-dark/50">אין תמונה</div>
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
            className="mt-3 w-full text-xs"
          />
        </div>
        <div className="grid gap-3">
          <label className="text-xs text-olive-dark">
            שם
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-olive-dark/25 px-3 py-2 focus:border-olive-dark focus:outline-none"
            />
          </label>
          <label className="text-xs text-olive-dark">
            תיאור
            <textarea
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-lg border border-olive-dark/25 px-3 py-2 focus:border-olive-dark focus:outline-none"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-olive-dark">
              מחיר (₪)
              <input
                type="number"
                min={0}
                value={draft.price}
                onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-olive-dark/25 px-3 py-2 focus:border-olive-dark focus:outline-none"
              />
            </label>
            <label className="text-xs text-olive-dark">
              טקסט חלופי לתמונה (alt)
              <input
                value={draft.alt}
                onChange={(e) => setDraft({ ...draft, alt: e.target.value })}
                className="mt-1 w-full rounded-lg border border-olive-dark/25 px-3 py-2 focus:border-olive-dark focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={save}
              disabled={status === 'saving'}
              className="rounded-full bg-olive-dark px-6 py-2 text-sm text-cream transition-colors hover:bg-olive-dark/90 disabled:opacity-60"
            >
              {status === 'saving' ? 'שומר…' : 'שמור'}
            </button>
            {status === 'saved' && <span className="text-sm text-olive-dark">נשמר ✓</span>}
            {error && <span className="text-sm text-red-700">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [saveAllError, setSaveAllError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    fetch('/.netlify/functions/products')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setProducts(data))
      .catch(() => {});
  }, []);

  const persistAll = async (updatedList: Product[]) => {
    if (!token) return;
    setSaveAllError(null);
    try {
      const res = await fetch('/.netlify/functions/admin-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, products: updatedList }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שמירה נכשלה');
    } catch (err) {
      setSaveAllError(err instanceof Error ? err.message : 'שמירה נכשלה');
    }
  };

  const handleProductSaved = (updated: Product) => {
    const updatedList = products.map((p) => (p.id === updated.id ? updated : p));
    setProducts(updatedList);
    persistAll(updatedList);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-32">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-4xl text-ink">ניהול מוצרים</h1>
          {token && (
            <button onClick={logout} className="text-sm text-olive-dark hover:underline">
              יציאה
            </button>
          )}
        </div>

        {!token ? (
          <LoginForm onLoggedIn={setToken} />
        ) : (
          <div className="mt-8 grid gap-6">
            {saveAllError && <p className="text-sm text-red-700">{saveAllError}</p>}
            {products.map((product) => (
              <ProductEditor key={product.id} product={product} token={token} onSaved={handleProductSaved} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
