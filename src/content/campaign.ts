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
  /** <meta name="theme-color"> mientras la campaña está activa. */
  themeColor?: string;
  banner?: CampaignBanner;
}

export const HALLOWEEN_2026: Campaign = {
  id: 'halloween',
  enabled: false, // terminó el 1-nov-2026
  start: '2026-10-01T00:00:00-03:00',
  end: '2026-11-01T00:00:00-03:00',
  previewParam: 'halloween',
  forceDark: true,
  themeColor: '#0B0814',
  banner: {
    // Pieza del cliente v2 (banner_antocarz_halloween_v2.png, 7090px) → versiones optimizadas.
    src: '/slides hero/banner_antocarz_halloween_v2-2560.webp',
    // %20 obligatorio: en srcset un espacio separa la URL del descriptor.
    srcset: '/slides%20hero/banner_antocarz_halloween_v2-1280.webp 1280w, /slides%20hero/banner_antocarz_halloween_v2-2560.webp 2560w',
    sizes: '(min-width: 1248px) 1200px, 100vw',
    width: 2560,
    height: 620,
    alt: 'Ofertas del terror — Revisa las ofertas disponibles en Antocarz',
  },
};

export const NAVIDAD_2026: Campaign = {
  id: 'navidad',
  enabled: true,
  // Del viernes 20-nov al domingo 28-dic inclusive (diciembre en Chile = UTC-3).
  start: '2026-11-20T00:00:00-03:00',
  end: '2026-12-29T00:00:00-03:00',
  previewParam: 'navidad',
  forceDark: true,
  themeColor: '#0A1D14',
  // Sin banner propio: sigue el banner fijo del mes hasta que el cliente mande la pieza navideña.
};

/** Momento objetivo del contador regresivo de la campaña de Navidad. */
export const CHRISTMAS_AT = '2026-12-25T00:00:00-03:00';

/** Campaña habilitada (solo una a la vez; la primera de la lista gana). */
export const ACTIVE_CAMPAIGN: Campaign | null =
  [NAVIDAD_2026, HALLOWEEN_2026].find((c) => c.enabled) ?? null;

/** Evaluación en servidor — evita el parpadeo en páginas SSR. */
export function isCampaignLive(campaign: Campaign, url: URL, now: Date = new Date()): boolean {
  const forced = url.searchParams.get(campaign.previewParam);
  if (forced === '1') return true;
  if (forced === '0') return false;
  return now >= new Date(campaign.start) && now < new Date(campaign.end);
}
