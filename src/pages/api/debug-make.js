const MAKE_API_TOKEN = (process.env.MAKE_API_TOKEN || '')
  .trim()
  .replace(/^﻿/, ''); // Remove BOM
const DATA_STORE_ID = '93687';
const MAKE_API_BASE = 'https://api.make.com/v2';

export async function GET(context) {
  console.log('[debug-make] Token exists:', !!MAKE_API_TOKEN);
  console.log('[debug-make] Token length:', MAKE_API_TOKEN?.length);
  console.log('[debug-make] First char code:', MAKE_API_TOKEN?.charCodeAt(0));

  const url = `${MAKE_API_BASE}/data-stores/${DATA_STORE_ID}/records`;
  console.log('[debug-make] URL:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAKE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('[debug-make] Response status:', response.status);
    console.log('[debug-make] Response ok:', response.ok);

    const text = await response.text();
    console.log('[debug-make] Response body:', text.substring(0, 500));

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { raw: text };
    }

    return new Response(JSON.stringify({
      status: response.status,
      ok: response.ok,
      data: data,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[debug-make] Fetch error:', error?.message);
    return new Response(
      JSON.stringify({
        error: error?.message,
        stack: error?.stack,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
