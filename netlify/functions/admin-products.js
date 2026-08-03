const { getStore } = require('@netlify/blobs');
const { verify } = require('./_lib/auth');

function isValidProduct(p) {
  return (
    p &&
    typeof p.id === 'string' &&
    p.id.trim().length > 0 &&
    typeof p.name === 'string' &&
    typeof p.description === 'string' &&
    typeof p.material === 'string' &&
    typeof p.alt === 'string' &&
    (p.image === null || typeof p.image === 'string') &&
    typeof p.price === 'number' &&
    Number.isFinite(p.price) &&
    p.price >= 0
  );
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { ADMIN_TOKEN_SECRET } = process.env;
  if (!ADMIN_TOKEN_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Admin is not configured yet' }) };
  }

  let token, products;
  try {
    ({ token, products } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!verify(token, ADMIN_TOKEN_SECRET)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'לא מחובר או שפג תוקף ההתחברות' }) };
  }

  if (!Array.isArray(products) || products.length === 0 || !products.every(isValidProduct)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'נתוני מוצרים לא תקינים' }) };
  }

  try {
    const store = getStore('earth-hemp-products');
    await store.setJSON('products.json', products);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Failed to save products to Blobs:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'שמירה נכשלה' }) };
  }
};
