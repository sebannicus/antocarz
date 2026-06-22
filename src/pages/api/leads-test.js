export async function GET(context) {
  // Datos fake para testing
  const testLeads = [
    {
      numero: '56996425227',
      nombre: 'Cliente Test 1',
      sucursal: 'Lautaro',
      ultimoMensaje: new Date().toISOString(),
      ultimaAccion: 'consulta',
      conversacion: [
        {
          timestamp: new Date(Date.now() - 600000).toISOString(),
          mensaje: 'Hola, me interesa un polarizado',
          respuesta: 'Claro, ¿qué tipo de polarizado?',
          accion: 'info',
        },
        {
          timestamp: new Date(Date.now() - 300000).toISOString(),
          mensaje: 'Nanocarbón 20%',
          respuesta: 'Excelente, ¿qué vehículo tienes?',
          accion: 'info',
        },
        {
          timestamp: new Date(Date.now() - 100000).toISOString(),
          mensaje: 'Toyota Corolla 2020',
          respuesta: 'Te pasamos con el equipo para agendar, ¿te llama alguien ahora?',
          accion: 'handoff',
        },
      ],
    },
    {
      numero: '56931258163',
      nombre: 'Cliente Test 2',
      sucursal: 'Balmaceda',
      ultimoMensaje: new Date().toISOString(),
      ultimaAccion: 'láminas',
      conversacion: [
        {
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          mensaje: 'Quiero láminas de seguridad',
          respuesta: 'Perfecto, ¿tu vehículo tiene láminas previas?',
          accion: 'info',
        },
        {
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          mensaje: 'No, es nuevo',
          respuesta: 'Ideal, te paso con el equipo para cotizar',
          accion: 'handoff',
        },
      ],
    },
  ];

  return new Response(JSON.stringify(testLeads), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=0',
    },
  });
}
