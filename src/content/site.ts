/**
 * site.ts
 * Fuente única de verdad para datos globales de Antocarz.
 * Principio Information Expert (GRASP): único módulo que conoce
 * nombre, contacto y metadata del negocio.
 */

export const SITE = {
  name: 'Antocarz',
  tagline: 'Especialistas en Equipamiento Automotriz en La Serena',
  description:
    'Car audio, alarmas, polarizado legal, iluminación LED y cámaras de retroceso. Instalación profesional con garantía en La Serena. Marcas JBL y Pioneer.',
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
    },
    {
      id: 'balmaceda',
      name: 'Sucursal Balmaceda',
      address: 'Balmaceda 2033',
      city: 'La Serena',
      mapsUrl: 'https://maps.google.com/?q=Balmaceda+2033+La+Serena+Chile',
      mapsEmbed: 'https://maps.google.com/maps?q=Balmaceda+2033+La+Serena+Chile&output=embed&hl=es',
      whatsappMsg: 'Hola, quiero cotizar un servicio en la sucursal Balmaceda (Balmaceda 2033, La Serena).',
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
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
  ],

  partnerBrands: [
    {
      id: 'ztaudio',
      name: 'ZTAudio',
      logo: '/logos/ztaudio.svg',
      tagline: 'Procesadores Android Premium',
      description: 'Procesadores multimedia de última generación con Android 14, pantalla QLED y compatibilidad con Netflix, YouTube, Spotify, Waze y más. CarPlay y Android Auto inalámbrico.',
      badge: 'Marca propia',
      color: '#C9A227',
      features: [
        'Procesador T133 Quadcore',
        'RAM 4GB / 64GB almacenamiento',
        'Android 14 + QLED',
        'CarPlay & Android Auto inalámbrico',
        'Netflix, YouTube, Spotify, Waze',
      ],
    },
    {
      id: 'rastreadores',
      name: 'rastreadores.cl',
      logo: '/logos/rastreadores.svg',
      tagline: 'Seguridad Vehicular Inteligente',
      description: 'Inmovilizadores, rastreadores GPS y sistemas antirrobo para autos y motos. Tecnología RFID y RF 2.4 GHz para protección total de tu vehículo.',
      badge: 'Marca propia',
      color: '#2ECC71',
      features: [
        'Inmovilizador RFID universal',
        'Bloqueo automático a 2 metros',
        'Antiportonazo inteligente',
        'RF 2.4 GHz bidireccional',
        'Compatible autos y motos',
      ],
    },
  ],
} as const;
