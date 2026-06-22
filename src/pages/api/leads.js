import { getSheetData } from '../../lib/sheets.js';

export async function GET(context) {
  try {
    const leads = await getSheetData();
    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
