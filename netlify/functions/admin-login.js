const crypto = require('crypto');
const { sign } = require('./_lib/auth');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { ADMIN_PASSWORD, ADMIN_TOKEN_SECRET } = process.env;
  if (!ADMIN_PASSWORD || !ADMIN_TOKEN_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Admin login is not configured yet' }) };
  }

  let password;
  try {
    ({ password } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const given = Buffer.from(String(password || ''));
  const expected = Buffer.from(ADMIN_PASSWORD);
  const match = given.length === expected.length && crypto.timingSafeEqual(given, expected);

  if (!match) {
    return { statusCode: 401, body: JSON.stringify({ error: 'סיסמה שגויה' }) };
  }

  const token = sign(ADMIN_TOKEN_SECRET);
  return { statusCode: 200, body: JSON.stringify({ token }) };
};
