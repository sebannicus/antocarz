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
    name: 'Patricia',
    initials: 'PA',
    text: 'Excelente asesoría, buen trabajo, limpio, cumplió mis expectativas.',
    service: 'Google Maps',
    stars: 5,
  },
  {
    name: 'Dimas',
    initials: 'DI',
    text: 'Excelente trabajo, responsables y excelente instalación.',
    service: 'Google Maps',
    stars: 5,
  },
  {
    name: 'Pascual',
    initials: 'PA',
    text: 'Muy profesional la atención, ambiente muy cordial, precios buenísimos.',
    service: 'Google Maps',
    stars: 4,
  },
  {
    name: 'Cliente Google',
    initials: 'CG',
    text: 'Las tarifas súper convenientes y el taller se ve muy bien organizado.',
    service: 'Google Maps',
    stars: 5,
  },
  {
    name: 'Cliente Google',
    initials: 'CG',
    text: 'Excelente servicio, muy profesionales y 100% recomendables.',
    service: 'Google Maps',
    stars: 5,
  },
  {
    name: 'Cliente Google',
    initials: 'CG',
    text: 'Muy buen servicio y atención, totalmente recomendable 👍',
    service: 'Google Maps',
    stars: 5,
  },
];
