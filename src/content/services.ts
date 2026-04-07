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
      'Radios Android 9" con CarPlay inalámbrico, Android Auto, GPS integrado, WiFi y pantalla QLED. Amplificadores, parlantes y subwoofers JBL y Pioneer. Instalación profesional con garantía absoluta y soporte técnico inmediato.',
    features: [
      'Radios Android: CarPlay, Android Auto y GPS integrado',
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
      'Polarizado de nanocarbón de alta calidad en tonalidades al 5%, 20% y 35%. Cumplimos con la Ley de Polarizados vigente en Chile. Cada instalación incluye su sello en relieve y certificado legal.',
    features: [
      'Disponible al 5%, 20% y 35% de transmisión de luz',
      'Sello en relieve incluido por vidrio (exigencia legal)',
      'Certificado legal de instalación incluido',
      'Protección UV y reducción de calor solar',
      'Garantía de instalación',
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
      'Films anti-impactos para vidrios, línea diseñada exclusivamente para automóviles. Protegen ante golpes, fragmentan el vidrio de forma segura y disuaden el robo. No requieren certificado de instalación.',
    features: [
      'Films anti-impactos de alta resistencia',
      'Fragmentación controlada ante golpes',
      'Línea exclusiva para automóviles',
      'Incoloras: no afectan visibilidad ni estética',
      'No requieren certificado legal',
    ],
    image: '/images/services/polarizado-2.webp',
    images: [
      '/images/services/polarizado-2.webp',
      '/images/services/polarizado-3.webp',
    ],
    badge: 'Anti-impactos',
  },
  {
    icon: '🔐',
    title: 'Alarmas y Seguridad',
    description:
      'Sistemas de alarma homologados con tecnología antiportonazo, inmovilizador RFID y rastreo GPS. Soporte técnico inmediato post-instalación. Más de 100 clientes han protegido su vehículo con nuestros sistemas en La Serena.',
    features: [
      'Alarmas homologadas Hawk certificadas',
      'Inmovilizador RFID antirrobo inteligente',
      'Antiportonazo · GPS rastreo en tiempo real',
      'Bloqueo de arranque + soporte técnico inmediato',
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
