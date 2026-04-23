/**
 * services.ts — Antocarz
 * Catálogo de servicios con imagen representativa por servicio.
 * images[]: array para carrusel (si tiene >1 imagen, ServiceCard muestra carrusel táctil).
 */

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  badge?: string;
}

export const SERVICES: Service[] = [
  {
    icon: '🔊',
    title: 'Car Audio',
    description:
      'Radios Android 9" con CarPlay y Android Auto inalámbrico, GPS integrado, WiFi y pantalla QLED. Procesador Quadcore/Octacore de última generación. Amplificadores, parlantes y subwoofers JBL y Pioneer. Instalación profesional con garantía absoluta y soporte técnico inmediato.',
    features: [
      'CarPlay y Android Auto inalámbrico · GPS integrado',
      'Procesador Quadcore/Octacore · Pantalla QLED nítida',
      'WiFi · Bluetooth · Radio FM · Reproducción 4K',
      'Amplificadores y subwoofers JBL / Pioneer',
      'Gran stock de biseles para la mayoría de modelos del mercado',
      'Cámara de retroceso (opcional, compatible con la mayoría de radios)',
    ],
    image: '/images/services/car-audio-1.webp',
    images: [
      '/images/services/car-audio-1.webp',
      '/images/services/car-audio-2.webp',
      '/images/services/car-audio-3.webp',
      '/images/services/car-audio-4.webp',
    ],
    badge: 'Más solicitado',
  },
  {
    icon: '🪟',
    title: 'Polarizado Nanocarbón',
    description:
      'Polarizado Nano Carbono de alto rendimiento en tonalidades 5%, 20% y 35%. Bloquea hasta el 99% de los rayos UV, no se decolora, no se vuelve violeta y no interfiere con señales electrónicas. Cumplimos con la Ley de Polarizados vigente en Chile. Cada instalación incluye sello en relieve y certificado legal.',
    features: [
      'Disponible al 5%, 20% y 35% de transmisión de luz',
      'Bloquea hasta el 99% de los rayos UV y calor solar',
      'No se decolora ni vuelve violeta con el tiempo',
      'No interfiere con señales electrónicas ni GPS',
      'Mejor visibilidad desde el interior del vehículo',
      'Sello en relieve incluido por vidrio (exigencia legal)',
      'Certificado legal de instalación incluido',
    ],
    image: '/images/services/polarizado-1.webp',
    images: [
      '/images/services/polarizado-1.webp',
      '/images/services/polarizado-2.webp',
      '/images/services/polarizado-3.webp',
      '/images/services/polarizado-4.webp',
      '/images/services/polarizado-5.webp',
      '/images/services/polarizado-6.webp',
    ],
    badge: 'Incluye certificado',
  },
  {
    icon: '🛡️',
    title: 'Láminas de Seguridad',
    description:
      'Films de poliéster de alta resistencia grosor 4, 8 y 12 micras, disponibles en tintes 5% al 100%. Refuerzan la estructura del cristal, mantienen los fragmentos unidos ante impactos y protegen a los ocupantes en accidentes. Incluyen Sello y Certificado de instalación para tonos acorde a la ley.',
    features: [
      'Grosor 4, 8 y 12 micras — alta resistencia',
      'Tintes disponibles: 5%, 20%, 35%, 50%, 70% y 100%',
      'Rechazo a los rayos del sol 99%',
      'Mantiene fragmentos de vidrio unidos ante impactos',
      'Protege a los ocupantes en accidentes de tránsito',
      'Incluye Sello y Certificado de instalación (tonos legales)',
    ],
    image: '/images/services/polarizado-2.webp',
    images: [
      '/images/services/polarizado-2.webp',
      '/images/services/polarizado-3.webp',
    ],
    badge: 'Incluye certificado',
  },
  {
    icon: '🔐',
    title: 'Alarmas y Seguridad',
    description:
      'Tres líneas de protección: Alarmas Anticlonación con bloqueo de motor, Inmobilizador Antiasalto por Presencia y GPS Rastreador 4G con app privada ilimitada. Solución completa contra robo, encerronas y portonazos.',
    features: [
      '— Alarma Anticlonación: 2 controles, sirena 6 tonos, sensor de golpe y puertas',
      'Bloqueo de motor · Conexión al cierre centralizado · Las mejores marcas',
      '— Inmobilizador Antiasalto: señal 2.4Ghz, bloqueo automático al alejarte',
      'Diseñado contra encerronas y portonazos — "Tu te alejas… él se detiene"',
      '— GPS Rastreador 4G: app privada ilimitada, reportes automáticos',
      'Exceso de velocidad · Geocerca · Subusuarios · +1.000 clientes suscritos',
    ],
    image: '/images/services/alarma-1.webp',
    images: [
      '/images/services/alarma-1.webp',
      '/images/services/alarma-2.webp',
      '/images/services/alarma-3.webp',
      '/images/services/alarma-4.webp',
    ],
  },
  {
    icon: '💡',
    title: 'Iluminación LED',
    description:
      'Balizas, faros y accesorios LED para mejorar la visibilidad, seguridad y estilo de tu vehículo en ruta y ciudad.',
    features: [
      'Balizas LED estroboscópicas',
      'Faros LED de largo alcance',
      'Luces de posición y DRL',
      'Iluminación interior LED',
    ],
    image: '/images/services/led.webp',
  },
  {
    icon: '📷',
    title: 'Cámaras de Retroceso',
    description:
      'Instalación HD integrada con tu radio Android. Maniobra con confianza y visión completa de lo que tienes atrás.',
    features: [
      'Cámaras 720P full HD',
      'Integración con radio existente',
      'Líneas guía de estacionamiento',
      'Visión nocturna incluida',
    ],
    image: '/images/services/camara-2.webp',
    images: [
      '/images/services/camara-2.webp',
      '/images/services/camara-3.webp',
      '/images/services/camara-1.webp',
    ],
  },
  {
    icon: '❄️',
    title: 'Aire Acondicionado',
    description:
      'Mantención completa, diagnóstico y recarga de gas de tu sistema de climatización automotriz. Viaja cómodo todo el año.',
    features: [
      'Diagnóstico del sistema',
      'Recarga de gas refrigerante',
      'Cambio de filtro de habitáculo',
      'Revisión de compresor',
    ],
    image: '/images/services/aire-acondicionado.webp',
  },
];
