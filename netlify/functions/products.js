const { getStore } = require('@netlify/blobs');
const defaultProducts = require('./_lib/default-products');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const store = getStore('earth-hemp-products');
    const stored = await store.get('products.json', { type: 'json' });
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify(stored || defaultProducts),
    };
  } catch (err) {
    console.error('Failed to read products from Blobs, serving defaults:', err);
    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify(defaultProducts),
    };
  }
};
