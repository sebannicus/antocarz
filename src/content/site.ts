/**
 * site.ts
 * Fuente única de verdad para datos globales de Antocarz.
 * Principio Information Expert (GRASP): único módulo que conoce
 * nombre, contacto y metadata del negocio.
 */

export const SITE = {
  name: 'Antocarz',
  tagline: 'Expertos en Seguridad Automotriz, Polarizado y Car Audio en La Serena',
  description:
    'Seguridad automotriz en La Serena: polarizado nanocarbón certificado, láminas anti-impactos, cortacorriente eléctrico, rastreadores GPS antirrobo y car audio Android con CarPlay. +10.000 instalaciones y +10.000 certificados emitidos. Garantía absoluta.',
  url: 'https://www.antocarz.cl',

  phone: '+56 9 9737 1969',
  whatsapp: '56982890047',
  email: 'ventas@antocarz.cl',

  location: {
    address: 'Lautaro 812',
    city: 'La Serena',
    region: 'IV Región de Coquimbo',
    country: 'CL',
    mapsUrl: 'https://maps.google.com/?q=Lautaro+812+La+Serena+Chile',
  },

  branches: [
    {
      id: 'lautaro',
      name: 'Sucursal Lautaro',
      address: 'Lautaro 812',
      city: 'La Serena',
      mapsUrl: 'https://maps.google.com/?q=Lautaro+812+La+Serena+Chile',
      mapsEmbed: 'https://maps.google.com/maps?q=Antocarz+Lautaro+812+La+Serena+Chile&output=embed&hl=es',
      whatsappMsg: 'Hola Antocarz 👋 Vi su página web y quiero cotizar un servicio. ¿Me pueden ayudar?',
      whatsappNumber: '56982890047',
    },
    {
      id: 'balmaceda',
      name: 'Sucursal Balmaceda',
      address: 'Balmaceda 2033',
      city: 'La Serena',
      mapsUrl: 'https://maps.google.com/?q=Balmaceda+2033+La+Serena+Chile',
      mapsEmbed: 'https://maps.google.com/maps?q=Balmaceda+2033+La+Serena+Chile&output=embed&hl=es',
      whatsappMsg: 'Hola Antocarz 👋 Vi su página web y quiero cotizar un servicio. ¿Me pueden ayudar?',
      whatsappNumber: '56982890047',
    },
  ],

  hours: {
    weekdays: 'Lun–Vie: 09:30–18:00',
    saturday: 'Sáb: 09:30–14:00',
    sunday: 'Dom: Cerrado',
  },

  social: {
    instagram: 'https://instagram.com/antocarzlaserena',
    facebook: 'https://facebook.com/antocarz',
  },

  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Productos', href: '/productos' },
    { label: 'Polarizado', href: '#polarizado' },
    { label: 'Preguntas', href: '#faq' },
    { label: 'Cómo llegar', href: '#map-heading' },
    { label: 'Contacto', href: '#contacto' },
  ],

  partnerBrands: [
    {
      id: 'ztaudio',
      name: 'ZTAudio',
      logo: '/logos/ztaudio.webp',
      image: '/images/products/radio-ztaudio-1.webp',
      images: [
        '/images/products/radio-ztaudio-1.webp',
        '/images/products/radio-ztaudio-2.webp',
        '/images/products/radio-ztaudio-3.webp',
      ],
      tagline: 'Radio Android 7", 9" y 10" · CarPlay · Android Auto · GPS',
      description: 'La radio Android propia de Antocarz. Compatible con el 90% de los vehículos del mercado, con biseles disponibles para la mayoría de modelos. Instalación profesional y garantía absoluta incluidas.',
      badge: 'Marca propia',
      color: '#C9A227',
      features: [
        'CarPlay inalámbrico y cableado · iOS 18 compatible',
        'Android Auto inalámbrico y cableado integrado',
        'GPS incorporado + mapas globales sin necesidad de celular',
        'WiFi integrado: Spotify, Netflix, YouTube y Waze en ruta',
        'Pantalla QLED 9" táctil multi-touch ultra clara 1280×720',
        'Bluetooth integrado · manos libres y streaming de música',
        'Android 13 · 4GB RAM · 64GB almacenamiento · Google Play Store',
        'Reproducción 4K · Radio FM · Cámara de retroceso (opcional, compatible)',
        'Gran stock de biseles para la mayoría de modelos del mercado',
      ],
    },
    {
      id: 'rastreadores',
      name: 'Rastreadores.cl',
      url: 'https://www.rastreadores.cl',
      logo: '/logos/rastreadores.webp',
      image: '/images/products/rastreador-1.webp',
      images: [
        '/images/products/rastreador-1.webp',
        '/images/products/rastreador-2.webp',
        '/images/products/rastreador-3.webp',
        '/images/products/rastreador-4.webp',
      ],
      tagline: 'GPS 4G · Plataforma Web y Móvil · Rastreo Mundial 24/7',
      description: 'Distribuidor oficial en La Serena. Rastreo GPS 4G en tiempo real con plataforma web y app móvil. Instalación profesional y soporte técnico directo con Antocarz.',
      badge: 'Distribuidor oficial',
      color: '#2ECC71',
      features: [
        'Rastreo GPS 4G en tiempo real — app móvil y plataforma web',
        'Cobertura mundial 24/7 · historial de movimientos y reportes',
        'Geocercas · alertas de seguridad · alertas de velocidad',
        'Cortacorriente a voluntad desde la app',
        'Soporte técnico directo con Antocarz en La Serena',
      ],
    },
  ],
} as const;
