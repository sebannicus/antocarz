const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7w_kc0uuCoSgP1v7VTDstr2b7WUDQRw7X0AGgojRs5uLm4M23uharx5eSiQugOv_m2g/exec';

export async function GET(context) {
  try {
    console.log('[leads] Proxying to Google Apps Script...');

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'Accept': 'application/json' },
    });

    console.log('[leads] Apps Script status:', response.status);

    const text = await response.text();
    console.log('[leads] Response preview:', text.substring(0, 200));

    let leads;
    try {
      leads = JSON.parse(text);
    } catch (e) {
      throw new Error(`Invalid JSON from Apps Script: ${text.substring(0, 300)}`);
    }

    if (!Array.isArray(leads)) {
      throw new Error(`Expected array, got: ${typeof leads} — ${JSON.stringify(leads).substring(0, 200)}`);
    }

    console.log('[leads] Got leads:', leads.length);

    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=30',
      },
    });
  } catch (error) {
    console.error('[leads] Error:', error?.message);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
