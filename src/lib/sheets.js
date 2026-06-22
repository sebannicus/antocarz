import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SHEET_ID = '1pNggz5LiklBNdYGA-gHvWserMoqTWBc0TPA7HiZaQ0E';

export async function getSheetData() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_PRIVATE_KEY || '';

  if (!email || !key) {
    throw new Error(
      `Missing credentials: email=${!!email}, key=${!!key}`
    );
  }

  // Fix escapes: convert \n strings to actual newlines
  key = key.includes('\\n') ? key.replace(/\\n/g, '\n') : key;

  console.log('[sheets.js] Initializing Google Sheets auth...');

  const serviceAccountAuth = new JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  console.log('[sheets.js] Creating GoogleSpreadsheet instance...');
  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);

  console.log('[sheets.js] Loading sheet info...');
  await doc.loadInfo();

  console.log('[sheets.js] Getting first sheet...');
  const sheet = doc.sheetsByIndex[0];

  if (!sheet) {
    throw new Error('No sheets found in spreadsheet');
  }

  console.log('[sheets.js] Fetching rows...');
  const rows = await sheet.getRows();
  console.log('[sheets.js] Fetched rows:', rows?.length);

  const leads = rows.map(row => ({
    timestamp: row.get('Timestamp') || '',
    numero: row.get('Número') || '',
    nombre: row.get('Nombre') || '',
    mensaje: row.get('Mensaje') || '',
    respuesta: row.get('Respuesta') || '',
    accion: row.get('Acción') || '',
    sucursal: row.get('Sucursal') || '',
  }));

  // Agrupar por número (teléfono)
  const grouped = {};
  leads.forEach(lead => {
    if (!lead.numero) return;
    if (!grouped[lead.numero]) {
      grouped[lead.numero] = {
        numero: lead.numero,
        nombre: lead.nombre || 'Sin nombre',
        sucursal: lead.sucursal || 'No especificada',
        ultimoMensaje: lead.timestamp,
        ultimaAccion: lead.accion,
        conversacion: [],
      };
    }
    if (lead.mensaje || lead.respuesta) {
      grouped[lead.numero].conversacion.push({
        timestamp: lead.timestamp,
        mensaje: lead.mensaje,
        respuesta: lead.respuesta,
        accion: lead.accion,
      });
    }
    grouped[lead.numero].ultimoMensaje = lead.timestamp;
    grouped[lead.numero].ultimaAccion = lead.accion;
  });

  console.log('[sheets.js] Returning leads:', Object.keys(grouped).length);
  return Object.values(grouped);
}
