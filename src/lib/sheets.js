import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SHEET_ID = '1pNggz5LiklBNdYGA-gHvWserMoqTWBc0TPA7HiZaQ0E';

export async function getSheetData() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

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

  return Object.values(grouped);
}
