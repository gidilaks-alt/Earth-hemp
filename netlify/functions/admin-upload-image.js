// NOTE: written from memory of the @netlify/blobs API (getStore/set/getWithMetadata) —
// a live docs fetch wasn't reachable while building this. Test an image upload in the
// deployed admin page early; if the Blobs calls need adjusting, this file and
// product-image.js are the only two places that touch the SDK.

const { getStore } = require('@netlify/blobs');
const { verify } = require('./_lib/auth');

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { ADMIN_TOKEN_SECRET } = process.env;
  if (!ADMIN_TOKEN_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Admin is not configured yet' }) };
  }

  let token, productId, imageBase64, contentType;
  try {
    ({ token, productId, imageBase64, contentType } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!verify(token, ADMIN_TOKEN_SECRET)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'לא מחובר או שפג תוקף ההתחברות' }) };
  }

  if (!productId || typeof productId !== 'string') {
    return { statusCode: 400, body: JSON.stringify({ error: 'productId חסר' }) };
  }

  if (!ALLOWED_TYPES.includes(contentType)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'סוג קובץ לא נתמך (jpeg/png/webp בלבד)' }) };
  }

  let buffer;
  try {
    buffer = Buffer.from(imageBase64, 'base64');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'קובץ לא תקין' }) };
  }

  if (buffer.length === 0 || buffer.length > MAX_BYTES) {
    return { statusCode: 400, body: JSON.stringify({ error: 'גודל קובץ לא תקין (מקסימום 5MB)' }) };
  }

  try {
    const store = getStore('earth-hemp-images');
    await store.set(productId, buffer, { metadata: { contentType } });
    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: `/.netlify/functions/product-image?id=${encodeURIComponent(productId)}&v=${Date.now()}` }),
    };
  } catch (err) {
    console.error('Failed to store image in Blobs:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'העלאת התמונה נכשלה' }) };
  }
};
