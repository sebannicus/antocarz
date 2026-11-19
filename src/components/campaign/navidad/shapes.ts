/**
 * shapes.ts — Antocarz · Campaña Navidad 2026
 * Ilustraciones SVG propias (inline, sin requests extra).
 * Solo colores planos: los <linearGradient id> se rompen cuando el mismo SVG
 * aparece varias veces y la primera copia está en un contenedor display:none.
 */

export const XMAS = {
  forest: '#0E2A1C',
  pine: '#1F5A3A',
  pineLight: '#2E7A4F',
  pineDark: '#143D27',
  burgundy: '#8E1B33',
  red: '#C8283F',
  gold: '#E2B84B',
  goldLight: '#F6D985',
  cream: '#F7F1E3',
  skin: '#F2B193',
  wood: '#4A2C1A',
} as const;

const C = XMAS;

/** Gnomo nórdico: gorro cónico, nariz grande, barba blanca. viewBox 60×92. */
export function gnomeSvg(hat: string = C.red, coat: string = C.pine): string {
  return `<svg viewBox="0 0 60 92" focusable="false" aria-hidden="true">
  <ellipse cx="21" cy="87" rx="8" ry="4" fill="${C.wood}"/>
  <ellipse cx="39" cy="87" rx="8" ry="4" fill="${C.wood}"/>
  <path d="M12 86 L15 66 Q30 56 45 66 L48 86z" fill="${coat}"/>
  <path d="M11 47 Q30 40 49 47 Q52 70 30 82 Q8 70 11 47z" fill="${C.cream}"/>
  <path d="M18 60 Q24 66 30 62 Q36 66 42 60" fill="none" stroke="#DCD3BF" stroke-width="1.6" stroke-linecap="round"/>
  <path class="xm-gnome__hat" d="M7 49 C14 30 22 10 33 3 C37 14 44 30 53 49z" fill="${hat}"/>
  <path d="M6 47 Q30 38 54 47 L53 53 Q30 45 7 53z" fill="${C.cream}"/>
  <circle cx="33" cy="4" r="4.2" fill="${C.cream}"/>
  <ellipse cx="30" cy="54" rx="6.5" ry="5.8" fill="${C.skin}"/>
  <ellipse cx="28" cy="52" rx="2" ry="1.4" fill="#FFFFFF" opacity=".55"/>
</svg>`;
}

/** Pino con esferas y estrella. viewBox 100×130. Las esferas titilan vía CSS (.xm-tree__lamp). */
export function treeSvg(): string {
  const lamps: Array<[number, number, string]> = [
    [44, 44, C.red], [58, 52, C.gold], [36, 66, C.goldLight], [62, 72, C.red],
    [48, 80, C.cream], [30, 92, C.red], [70, 94, C.goldLight], [52, 100, C.gold],
    [40, 106, C.red], [64, 108, C.cream],
  ];
  return `<svg viewBox="0 0 100 130" focusable="false" aria-hidden="true">
  <rect x="44" y="110" width="12" height="16" rx="2" fill="${C.wood}"/>
  <path d="M50 14 L82 62 H64 L90 96 H70 L96 116 H4 L30 96 H10 L36 62 H18z" fill="${C.pine}"/>
  <path d="M50 14 L64 36 L50 62 L36 62 Z" fill="${C.pineLight}" opacity=".35"/>
  <path d="M30 96 Q50 88 72 96 M22 62 Q48 54 70 62 M18 116 Q50 106 84 114" fill="none" stroke="${C.gold}" stroke-width="1.4" opacity=".7"/>
  ${lamps.map(([x, y, f], i) => `<circle class="xm-tree__lamp" style="--i:${i}" cx="${x}" cy="${y}" r="3.4" fill="${f}"/>`).join('')}
  <path class="xm-tree__star" d="M50 2 l3.5 7.2 7.9 1.1 -5.7 5.6 1.4 7.9 -7.1 -3.8 -7.1 3.8 1.4 -7.9 -5.7 -5.6 7.9 -1.1z" fill="${C.goldLight}"/>
</svg>`;
}

/** Caja de regalo con cinta y moño. viewBox 60×60. */
export function giftSvg(box: string, ribbon: string): string {
  return `<svg viewBox="0 0 60 60" focusable="false" aria-hidden="true">
  <rect x="6" y="24" width="48" height="34" rx="3" fill="${box}"/>
  <rect x="2" y="16" width="56" height="12" rx="3" fill="${box}"/>
  <rect x="2" y="25" width="56" height="3" fill="#000" opacity=".18"/>
  <rect x="26" y="16" width="8" height="42" fill="${ribbon}"/>
  <path d="M30 16 C18 2 6 10 16 16 Z M30 16 C42 2 54 10 44 16 Z" fill="${ribbon}"/>
  <circle cx="30" cy="15" r="4" fill="${ribbon}"/>
</svg>`;
}

/** Esfera navideña pequeña (viñeta de sección). viewBox 20×24. */
export function ornamentSvg(fill: string = C.red): string {
  return `<svg viewBox="0 0 20 24" focusable="false" aria-hidden="true">
  <path d="M10 0 v4" stroke="${C.gold}" stroke-width="1.4"/>
  <rect x="6.5" y="3.5" width="7" height="4" rx="1" fill="${C.gold}"/>
  <circle cx="10" cy="15" r="8.5" fill="${fill}"/>
  <path d="M2.5 13.5 Q10 17 17.5 13.5" fill="none" stroke="${C.goldLight}" stroke-width="1.2" opacity=".8"/>
  <ellipse cx="7" cy="11.5" rx="2.2" ry="1.4" fill="#fff" opacity=".45"/>
</svg>`;
}

/** Reno en vuelo (mirando a la derecha). Coordenadas locales 0..64 × 0..40. */
function reindeer(x: number, y: number, leadNose: boolean): string {
  return `<g transform="translate(${x} ${y})" class="xm-sleigh__deer">
    <path d="M47 7 l-3 -7 M47 7 l3 -7 M45 3 l-4 -1 M51 3 l4 -1" stroke="${C.goldLight}" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <path d="M14 24 l-9 7 M19 26 l-4 10 M36 25 l6 8 M40 23 l10 4" stroke="${C.gold}" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <ellipse cx="27" cy="20" rx="16" ry="7" fill="${C.gold}"/>
    <path d="M38 18 L44 7 L51 9 L44 22z" fill="${C.gold}"/>
    <ellipse cx="51" cy="10" rx="7" ry="4.2" fill="${C.gold}"/>
    <path d="M11 17 l-6 -3" stroke="${C.gold}" stroke-width="3" stroke-linecap="round"/>
    ${leadNose ? `<circle class="xm-sleigh__nose" cx="58" cy="11" r="2.8" fill="#FF3B4E"/>` : ''}
  </g>`;
}

/** Trineo de Papá Noel tirado por dos renos. viewBox 230×62. */
export const SLEIGH_SVG = `<svg viewBox="0 0 230 62" focusable="false" aria-hidden="true">
  <path d="M58 32 L98 30 M58 32 L162 28" stroke="${C.goldLight}" stroke-width="1" opacity=".7" fill="none"/>
  ${reindeer(92, 12, false)}
  ${reindeer(158, 6, true)}
  <g>
    <circle cx="36" cy="10" r="9" fill="${C.wood}"/>
    <rect x="31" y="3" width="7" height="6" rx="1.5" fill="${C.red}"/>
    <rect x="40" y="6" width="6" height="5" rx="1.5" fill="${C.pineLight}"/>
    <ellipse cx="22" cy="18" rx="8" ry="9" fill="${C.red}"/>
    <circle cx="22" cy="8" r="5" fill="${C.skin}"/>
    <path d="M17 9 Q22 18 27 9 Q24 14 22 14 Q20 14 17 9z" fill="${C.cream}"/>
    <path d="M16 6 Q22 -6 30 4 L27 5 Q22 2 18 7z" fill="${C.red}"/>
    <circle cx="31" cy="4" r="2" fill="${C.cream}"/>
    <path d="M6 16 H52 Q58 16 58 24 L56 34 H12 Q4 32 6 16z" fill="${C.burgundy}"/>
    <path d="M6 16 H52" stroke="${C.gold}" stroke-width="2"/>
    <path d="M2 40 Q6 46 16 46 H54 Q62 46 64 38" fill="none" stroke="${C.gold}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M18 34 v12 M48 34 v12" stroke="${C.gold}" stroke-width="2"/>
  </g>
</svg>`;
