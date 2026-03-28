/**
 * site.ts
 * Fuente única de verdad para datos globales de Antocarz.
 * Principio Information Expert (GRASP): único módulo que conoce
 * nombre, contacto y metadata del negocio.
 */

export const SITE = {
  name: 'Antocarz',
  tagline: 'Especialistas en Car Audio, Alarmas y Polarizado en La Serena',
  description:
    'Car audio Android con CarPlay, Android Auto y GPS integrado. Alarmas homologadas, polarizado legal certificado e iluminación LED en La Serena. Garantía absoluta. Más de 1.000 trabajos garantizados y +643 certificados de polarizado emitidos.',
  url: 'https://antocarz.cl',

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
      whatsappMsg: 'Hola, quiero cotizar un servicio en la sucursal Lautaro (Lautaro 812, La Serena).',
      whatsappNumber: '56997371969',
    },
    {
      id: 'balmaceda',
      name: 'Sucursal Balmaceda',
      address: 'Balmaceda 2033',
      city: 'La Serena',
      mapsUrl: 'https://maps.google.com/?q=Balmaceda+2033+La+Serena+Chile',
      mapsEmbed: 'https://maps.google.com/maps?q=Balmaceda+2033+La+Serena+Chile&output=embed&hl=es',
      whatsappMsg: 'Hola, quiero cotizar un servicio en la sucursal Balmaceda (Balmaceda 2033, La Serena).',
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
      logo: '/logos/ztaudio.svg',
      image: '/images/products/radio-ztaudio-1.webp',
      images: [
        '/images/products/radio-ztaudio-1.webp',
        '/images/products/radio-ztaudio-2.webp',
        '/images/products/radio-ztaudio-3.webp',
      ],
      tagline: 'Radio Android 9" · CarPlay · Android Auto · GPS',
      description: 'La radio todo en uno que transforma tu vehículo. Pantalla QLED táctil de 9 pulgadas con resolución 1280×720, CarPlay inalámbrico compatible con iOS 18, Android Auto, GPS integrado con mapas globales, WiFi para Spotify, Netflix y YouTube, Bluetooth manos libres y reproducción 4K. Compatible con el 90% de los vehículos del mercado (Toyota, Nissan, Kia, Hyundai, Chevrolet y más). Instalación incluida, garantía absoluta y soporte técnico inmediato.',
      badge: 'Marca propia',
      color: '#C9A227',
      features: [
        'CarPlay inalámbrico y cableado · iOS 18 compatible',
        'Android Auto inalámbrico y cableado integrado',
        'GPS incorporado + mapas globales sin necesidad de celular',
        'WiFi integrado: Spotify, Netflix, YouTube y Waze en ruta',
        'Pantalla QLED 9" táctil multi-touch ultra clara 1280×720',
        'Bluetooth A2DP · Manos libres y streaming de música',
        'Android 13 · 8GB RAM + 128GB · Google Play Store',
        'Reproducción 4K · Radio FM · Cámara de retroceso compatible',
      ],
    },
    {
      id: 'rastreadores',
      name: 'rastreadores.cl',
      logo: '/logos/rastreadores.webp',
      image: '/images/products/rastreador-1.webp',
      images: [
        '/images/products/rastreador-1.webp',
        '/images/products/rastreador-2.webp',
        '/images/products/rastreador-3.webp',
        '/images/products/rastreador-4.webp',
      ],
      tagline: 'Protección Total · GPS · Antiportonazo · Inmovilizador',
      description: 'Sistemas de seguridad vehicular de última generación para autos y motos. Inmovilizador RFID que bloquea el motor cuando tú no estás, protección antiportonazo activada automáticamente, rastreo GPS en tiempo real y tecnología RF 2.4 GHz de largo alcance. Instalación profesional con soporte técnico inmediato y garantía absoluta. Más de 100 clientes han elegido rastreadores.cl para proteger su vehículo en La Serena.',
      badge: 'Marca propia',
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
