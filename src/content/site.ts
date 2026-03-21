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

  hours: {
    weekdays: 'Lun–Vie: 09:30–18:00',
    saturday: 'Sáb: 09:30–14:00',
    sunday: 'Dom: Cerrado',
  },

  social: {
    instagram: 'https://instagram.com/antocarz',
    facebook: 'https://facebook.com/antocarz',
  },

  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Productos', href: '/productos' },
    { label: 'Polarizado', href: '#polarizado' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const;
