// Creates a PayPlus hosted payment page link and returns it to the client
// for redirect. Price is looked up server-side only — never trust an amount
// sent from the browser.
//
// NOTE: this integration was written from memory of PayPlus's documented
// "PaymentPages/generateLink" REST API (a live docs fetch wasn't reachable
// while building this). Verify the exact field names against your PayPlus
// dashboard's API docs in the sandbox environment before taking real
// payments — the request/response shape below is the well-known pattern,
// but PayPlus may have changed field names since.
//
// Required environment variables (set in Netlify: Site settings → Environment variables):
//   PAYPLUS_API_KEY          - from PayPlus dashboard
//   PAYPLUS_SECRET_KEY       - from PayPlus dashboard
//   PAYPLUS_PAYMENT_PAGE_UID - the "Payment Page" UID configured in PayPlus
//   PAYPLUS_ENV              - "sandbox" (default) or "production"
//   SITE_URL                 - e.g. https://earthnhemp.netlify.app (no trailing slash)

const { getStore } = require('@netlify/blobs');
const defaultProducts = require('./_lib/default-products');

async function getCurrentProducts() {
  try {
    const store = getStore('earth-hemp-products');
    const stored = await store.get('products.json', { type: 'json' });
    return stored || defaultProducts;
  } catch {
    return defaultProducts;
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let productId;
  try {
    ({ productId } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const currentProducts = await getCurrentProducts();
  const product = currentProducts.find((p) => p.id === productId);
  if (!product) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown product' }) };
  }

  const { PAYPLUS_API_KEY, PAYPLUS_SECRET_KEY, PAYPLUS_PAYMENT_PAGE_UID, SITE_URL } = process.env;
  if (!PAYPLUS_API_KEY || !PAYPLUS_SECRET_KEY || !PAYPLUS_PAYMENT_PAGE_UID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Payment gateway is not configured yet (missing PayPlus env vars)' }),
    };
  }

  const isProduction = process.env.PAYPLUS_ENV === 'production';
  const baseUrl = isProduction
    ? 'https://restapi.payplus.co.il/api/v1.0'
    : 'https://restapidev.payplus.co.il/api/v1.0';
  const site = SITE_URL || `https://${event.headers.host}`;

  try {
    const response = await fetch(`${baseUrl}/PaymentPages/generateLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_page_uid: PAYPLUS_PAYMENT_PAGE_UID,
        api_key: PAYPLUS_API_KEY,
        secret_key: PAYPLUS_SECRET_KEY,
        charge_method: 1,
        currency_code: 'ILS',
        amount: product.price,
        items: [{ name: product.name, quantity: 1, price: product.price }],
        refURL_success: `${site}/order-success`,
        refURL_failure: `${site}/order-failed`,
        refURL_cancel: `${site}/order-failed`,
        refURL_callback: `${site}/.netlify/functions/payplus-callback`,
        more_info: productId,
      }),
    });

    const data = await response.json();
    const paymentUrl = data?.data?.payment_page_link;

    if (!response.ok || !paymentUrl) {
      console.error('PayPlus error response:', JSON.stringify(data));
      return { statusCode: 502, body: JSON.stringify({ error: 'Payment gateway rejected the request' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ paymentUrl }) };
  } catch (err) {
    console.error('PayPlus request failed:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Payment gateway request failed' }) };
  }
};
