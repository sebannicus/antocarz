const MAKE_API_TOKEN = process.env.MAKE_API_TOKEN;
const DATA_STORE_ID = '93687'; // antocarz_sessions
const MAKE_API_BASE = 'https://api.make.com/v2';

export async function GET(context) {
  try {
    if (!MAKE_API_TOKEN) {
      throw new Error('Missing MAKE_API_TOKEN env var');
    }

    console.log('[leads-make] Fetching records from Make Data Store...');

    const url = `${MAKE_API_BASE}/data-stores/${DATA_STORE_ID}/records`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAKE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Make API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('[leads-make] Got records:', data?.records?.length);

    const records = data.records || [];

    // Procesar y agrupar por teléfono
    const grouped = {};

    records.forEach(record => {
      const phone = record.phone;
      if (!phone) return;

      if (!grouped[phone]) {
        grouped[phone] = {
          numero: phone,
          nombre: record.client_name || 'Sin nombre',
          sucursal: record.booking_branch || 'No especificada',
          ultimoMensaje: record.last_interaction || new Date().toISOString(),
          ultimaAccion: record.booking_state || '-',
          conversacion: [],
        };
      }

      // Parsear el historial si existe
      const history = record.history || '';
      if (history) {
        const lines = history.split('\n');
        let currentMessage = '';
        let currentResponse = '';
        let isUser = false;

        lines.forEach(line => {
          if (line.startsWith('Usuario:')) {
            if (currentResponse) {
              grouped[phone].conversacion.push({
                timestamp: record.last_interaction || new Date().toISOString(),
                mensaje: currentMessage,
                respuesta: currentResponse,
                accion: record.booking_state || '-',
              });
              currentResponse = '';
            }
            currentMessage = line.replace('Usuario:', '').trim();
            isUser = true;
          } else if (line.startsWith('Asistente:')) {
            currentResponse = line.replace('Asistente:', '').trim();
            isUser = false;
          } else if (line.trim() && isUser) {
            currentMessage += ' ' + line.trim();
          } else if (line.trim() && !isUser) {
            currentResponse += ' ' + line.trim();
          }
        });

        // Último par si existe
        if (currentMessage || currentResponse) {
          grouped[phone].conversacion.push({
            timestamp: record.last_interaction || new Date().toISOString(),
            mensaje: currentMessage,
            respuesta: currentResponse,
            accion: record.booking_state || '-',
          });
        }
      }

      grouped[phone].ultimoMensaje = record.last_interaction || new Date().toISOString();
      grouped[phone].ultimaAccion = record.booking_state || '-';
    });

    const leads = Object.values(grouped);
    console.log('[leads-make] Returning leads:', leads.length);

    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=30',
      },
    });
  } catch (error) {
    console.error('[leads-make] Error:', error?.message);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
