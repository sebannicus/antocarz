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
    name: 'Jan Contuliano',
    initials: 'JC',
    text: 'Excelente servicio y muy buena disposición para ayudar. En mi caso me estuvieron ayudando con la localización del GPS hasta altas horas de la madrugada para localizar mi camioneta que estuvo a punto de cruzar a bolivia y se logro el objetivo. Sin duda alguna 💯 recomendable.',
    service: 'Recuperación GPS',
    stars: 5,
  },
  {
    name: 'ESTEBAN TAPIA',
    initials: 'ET',
    text: 'TENGO MUY BUENA EXPERIENCIA EN ESE LOCAL FUI A COTIZAR UNA VEZ... SUPER PROFESIONAL LOS QUE ATIENDEN NO LE METIERON PRODUCTOS INNECESARIOS NI LA MULA NI SOBREPRECIOS, LOS PRECIOS FUERON LOS MISMOS, CUESTA ENCONTRAR LUGARES HONESTOS CON EL CLIENTE. LO RECOMIENDO 1000%',
    service: 'Equipamiento',
    stars: 5,
  },
];
