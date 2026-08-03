const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const productId = event.queryStringParameters?.id;
  if (!productId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'id חסר' }) };
  }

  try {
    const store = getStore('earth-hemp-images');
    const result = await store.getWithMetadata(productId, { type: 'arrayBuffer' });

    if (!result || !result.data) {
      return { statusCode: 404, body: JSON.stringify({ error: 'לא נמצאה תמונה' }) };
    }

    const contentType = result.metadata?.contentType || 'image/jpeg';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      body: Buffer.from(result.data).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('Failed to read image from Blobs:', err);
    return { statusCode: 404, body: JSON.stringify({ error: 'לא נמצאה תמונה' }) };
  }
};
