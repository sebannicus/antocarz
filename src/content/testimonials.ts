/**
 * testimonials.ts
 * Reseñas reales de Google My Business — Antocarz La Serena.
 * Textos verificados vía Google Maps.
 * TODO: actualizar nombres cuando el cliente provea la lista completa.
 */

export interface Testimonial {
  name: string;
  initials: string;
  text: string;
  service: string;
  stars: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Paulina Barraza Araya',
    initials: 'PB',
    text: 'Llevé a que le instalarán a mi auto ia dashcam y quedó super bien la instalación. Profesionales, me enseñaron a usar la cámara y la instalación y cables no se nota en el auto. Muy buen trabajo. Los recomiendo 100%. Además instalan GPS...',
    service: 'Dashcam & GPS',
    stars: 5,
  },
  {
    name: 'ESTEBAN TAPIA',
    initials: 'ET',
    text: 'TENGO MUY BUENA EXPERIENCIA EN ESE LOCAL FUI A COTIZAR UNA VEZ... SUPER PROFESIONAL LOS QUE ATIENDEN NO LE METIERON PRODUCTOS INNECESARIOS NI LA MULA NI SOBREPRECIOS, LOS PRECIOS FUERON LOS MISMOS, CUESTA ENCONTRAR LUGARES HONESTOS CON EL CLIENTE. LO RECOMIENDO 1000%',
    service: 'Equipamiento',
    stars: 5,
  },
  {
    name: 'Pedro Felipe Garcés Ibarra',
    initials: 'PG',
    text: 'Excelente. Polarizaron con láminas de seguridad mis joyas… una ya lleva 2 años con las mismas y la camio hace poco le pusieron GPS + Cortacorriente que funciona estupendo, además de tinte 35%. Atención 10/10 como siempre. A la segura...',
    service: 'Láminas & GPS',
    stars: 5,
  },
  {
    name: 'Jan Contuliano',
    initials: 'JC',
    text: 'Excelente servicio y muy buena disposición para ayudar. En mi caso me estuvieron ayudando con la localización del GPS hasta altas horas de la madrugada para localizar mi camioneta que estuvo a punto de cruzar a bolivia y se logro el objetivo. Sin duda alguna 💯 recomendable.',
    service: 'Recuperación GPS',
    stars: 5,
  },
  {
    name: 'Boris fuentes rivera',
    initials: 'BF',
    text: 'Hola buenas lleve mi auto para instalar GPS radio y cámara retroceso los técnico que realizaron el trabajo muy buenos el servicio de principio a fin muy bueno desde el trato las explicaciones dadas los recomiendo 100% todo de calidad gracias',
    service: 'Car Audio & GPS',
    stars: 5,
  },
  {
    name: 'Luis Pallauta Pasten',
    initials: 'LP',
    text: 'Excelente atención y precios justos. Instalación de varios extras a camioneta, además respondieron a una falla en conexión de forma gratuita.',
    service: 'Instalaciones extras',
    stars: 5,
  },
];
