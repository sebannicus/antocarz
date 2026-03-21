/**
 * services.ts — Antocarz
 * Catálogo de servicios con imagen representativa por servicio.
 */

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export const SERVICES: Service[] = [
  {
    icon: '🔊',
    title: 'Car Audio',
    description:
      'Radios Android, amplificadores, parlantes y subwoofers de las mejores marcas del mercado. Instalación limpia y profesional con garantía.',
    features: [
      'Radios Android con pantalla táctil',
      'Amplificadores y subwoofers JBL / Pioneer',
      'Parlantes coaxiales y separados',
      'Adaptadores específicos por modelo',
    ],
    image: '/images/services/car-audio.webp',
    badge: 'Más solicitado',
  },
  {
    icon: '🪟',
    title: 'Polarizado Legal',
    description:
      'Polarizado americano de alta calidad con certificado legal incluido. Cumplimos con la Ley de Polarizados vigente en Chile.',
    features: [
      'Certificado legal incluido',
      'Láminas de seguridad americanas',
      'Protección UV total',
      'Garantía de instalación',
    ],
    image: '/images/services/polarizado.webp',
    badge: 'Incluye certificado',
  },
  {
    icon: '🔐',
    title: 'Alarmas y Seguridad',
    description:
      'Sistemas de seguridad homologados para proteger tu vehículo. Alarmas certificadas, GPS y bloqueos de inmovilización.',
    features: [
      'Alarmas homologadas Hawk y BRM',
      'GPS Auto Rastreo',
      'Inmovilizador eléctrico',
      'Bloqueo de arranque',
    ],
    image: '/images/services/alarma.webp',
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
    image: '/images/services/camara.webp',
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
