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
    'Seguridad automotriz en La Serena: polarizado nanocarbón legal certificado, láminas de seguridad anti-impactos, rastreadores GPS antirrobo y car audio Android con CarPlay. +10.000 instalaciones y +10.000 certificados de polarizado emitidos. Garantía absoluta.',
  url: 'https://www.antocarz.cl',

  phone: '+56 9 3125 8163',
  whatsapp: '56931258163',
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
      whatsappMsg: 'Hola Antocarz sucursal Lautaro 👋 Los vi en su página web y me interesa obtener más información sobre sus servicios. ¿Me pueden ayudar?',
      whatsappNumber: '56997371969',
    },
    {
      id: 'balmaceda',
      name: 'Sucursal Balmaceda',
      address: 'Balmaceda 2033',
      city: 'La Serena',
      mapsUrl: 'https://maps.google.com/?q=Balmaceda+2033+La+Serena+Chile',
      mapsEmbed: 'https://maps.google.com/maps?q=Balmaceda+2033+La+Serena+Chile&output=embed&hl=es',
      whatsappMsg: 'Hola Antocarz sucursal Balmaceda 👋 Los vi en su página web y me interesa obtener más información sobre sus servicios. ¿Me pueden ayudar?',
      whatsappNumber: '56931258163',
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
      tagline: 'Radio Android 9" · CarPlay · Android Auto · GPS',
      description: 'La radio todo en uno que transforma tu vehículo. Pantalla QLED táctil de 9 pulgadas con resolución 1280×720, CarPlay inalámbrico compatible con iOS 18, Android Auto, GPS integrado con mapas globales, WiFi para Spotify, Netflix y YouTube, Bluetooth y reproducción 4K. Compatible con el 90% de los vehículos del mercado (Toyota, Nissan, Kia, Hyundai, Chevrolet y más). Gran variedad de biseles (carcasas) para cada modelo. Instalación incluida, garantía absoluta y soporte técnico inmediato.',
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
      url: 'https://www.rastradores.cl',
      logo: '/logos/rastreadores.webp',
      image: '/images/products/rastreador-1.webp',
      images: [
        '/images/products/rastreador-1.webp',
        '/images/products/rastreador-2.webp',
        '/images/products/rastreador-3.webp',
        '/images/products/rastreador-4.webp',
      ],
      tagline: 'Protección Total · GPS · Antiportonazo · Inmovilizador',
      description: 'Distribuidor oficial de Rastreadores.cl en La Serena. Sistemas de seguridad vehicular de última generación para autos y motos: inmovilizador RFID que bloquea el motor cuando tú no estás, protección antiportonazo activada automáticamente y rastreo GPS en tiempo real. Instalación profesional con garantía absoluta y soporte técnico inmediato.',
      badge: 'Distribuidor oficial',
      color: '#2ECC71',
      features: [
        'Inmovilizador RFID: tu auto no arranca sin ti',
        'Bloqueo automático al alejarte más de 2 metros',
        'Antiportonazo inteligente: protección en semáforos',
        'Rastreo GPS en tiempo real desde tu celular',
        'RF 2.4 GHz bidireccional · Compatible autos y motos',
      ],
    },
  ],
} as const;
