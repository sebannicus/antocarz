const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7w_kc0uuCoSgP1v7VTDstr2b7WUDQRw7X0AGgojRs5uLm4M23uharx5eSiQugOv_m2g/exec';

export async function GET(context) {
  try {
    console.log('[leads] Fetching from Google Apps Script...');

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Apps Script error ${response.status}: ${errorText}`);
    }

    const leads = await response.json();
    console.log('[leads] Got leads:', leads?.length);

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
