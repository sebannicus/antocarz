import { getSheetData } from '../../lib/sheets.js';

export async function GET(context) {
  try {
    console.log('[API] Starting getSheetData...');
    const leads = await getSheetData();
    console.log('[API] Got leads:', leads?.length);

    if (!Array.isArray(leads)) {
      throw new Error(`Expected array, got ${typeof leads}`);
    }

    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    console.error('[API] Error fetching leads:', error?.message || error);
    console.error('[API] Stack:', error?.stack);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Unknown error',
        stack: error?.stack
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
