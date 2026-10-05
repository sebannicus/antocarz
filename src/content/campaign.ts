/**
 * campaign.ts — Antocarz
 * Fuente de verdad de las campañas visuales temporales (temas de temporada).
 *
 * Cómo funciona (ver BaseLayout.astro):
 *  - `enabled: false` → no se renderiza nada de la campaña (apagado total).
 *  - `enabled: true`  → el HTML incluye la capa decorativa y un script inline
 *    decide en el navegador si se activa según la fecha, poniendo
 *    `data-campaign="<id>"` en <html>. Todo el CSS de la campaña cuelga de ese
 *    atributo, así que fuera de la ventana de fechas el sitio se ve normal
 *    — también en páginas prerenderizadas en build (ej. /productos).
 *  - `?<previewParam>=1` fuerza la campaña y `?<previewParam>=0` la apaga,
 *    para revisarla fuera de fecha o comparar contra la versión normal.
 */

/** Banner que reemplaza al fijo de ofertas (OfertaFija.astro) durante la campaña. */
export interface CampaignBanner {
  src: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
}

export interface Campaign {
  id: string;
  enabled: boolean;
  /** Inicio y fin en ISO con zona horaria de Chile. `end` es exclusivo. */
  start: string;
  end: string;
  previewParam: string;
  /** Fuerza el modo oscuro mientras la campaña está activa. */
  forceDark: boolean;
  banner?: CampaignBanner;
}

export const HALLOWEEN_2026: Campaign = {
  id: 'halloween',
  enabled: true,
  start: '2026-10-01T00:00:00-03:00',
  end: '2026-11-01T00:00:00-03:00',
  previewParam: 'halloween',
  forceDark: true,
  banner: {
    // Original del cliente: banner_antocarz_halloween.webp (7089px, sin uso directo).
    src: '/slides hero/banner_antocarz_halloween-2560.webp',
    // %20 obligatorio: en srcset un espacio separa la URL del descriptor.
    srcset: '/slides%20hero/banner_antocarz_halloween-1280.webp 1280w, /slides%20hero/banner_antocarz_halloween-2560.webp 2560w',
    sizes: '(min-width: 1248px) 1200px, 100vw',
    width: 2560,
    height: 619,
    alt: 'Ofertas del terror — Promoción especial GPS Rastreador 4G + SIM multioperador internacional + suscripción 6 meses o 1 año, 20% de descuento — Antocarz',
  },
};

export const ACTIVE_CAMPAIGN: Campaign | null = HALLOWEEN_2026.enabled ? HALLOWEEN_2026 : null;

/** Evaluación en servidor — evita el parpadeo en páginas SSR. */
export function isCampaignLive(campaign: Campaign, url: URL, now: Date = new Date()): boolean {
  const forced = url.searchParams.get(campaign.previewParam);
  if (forced === '1') return true;
  if (forced === '0') return false;
  return now >= new Date(campaign.start) && now < new Date(campaign.end);
}
