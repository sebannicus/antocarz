/**
 * shapes.ts — Antocarz · Campaña Halloween 2026
 * Siluetas SVG compartidas por los componentes de la campaña (fuente única:
 * las usan tanto el markup de Astro como los scripts que inyectan elementos).
 * Sin gradientes con id → se pueden clonar/inyectar N veces sin conflictos.
 */

/** Murciélago, viewBox 0 0 64 30. */
export const BAT_PATH =
  'M32 11c-1.4-2.8-2.9-4-4-4.2.5 1.6.3 3-.6 4.1C24.5 8 18.6 5.2 12.4 6c3 1.6 5 4.2 5.4 7.2-2.6-1.6-6.2-2.1-9.2-1 3.1 1.5 5.1 3.6 6 6.2 2.1-1.5 5-1.5 7.1 0 1.4-2 4-3 6.5-2.6L32 23l3.8-7.2c2.5-.4 5.1.6 6.5 2.6 2.1-1.5 5-1.5 7.1 0 .9-2.6 2.9-4.7 6-6.2-3-1.1-6.6-.6-9.2 1 .4-3 2.4-5.6 5.4-7.2-6.2-.8-12.1 2-15.6 4.9-.9-1.1-1.1-2.5-.6-4.1-1.1.2-2.6 1.4-4 4.2z';

export const BAT_SVG =
  `<svg viewBox="0 0 64 30" aria-hidden="true" focusable="false"><path d="${BAT_PATH}"/></svg>`;

/** Fantasma, viewBox 0 0 48 60. La cola se desvanece con mask-image en CSS. */
export const GHOST_SVG =
  '<svg viewBox="0 0 48 60" aria-hidden="true" focusable="false">' +
  '<path d="M24 2C12 2 4 11 4 23v29c0 2 2 3 3.5 2l3.5-3 4 4 4.5-4 4.5 4 4.5-4 4 4 3.5-3c1.5 1 3.5 0 3.5-2V23C44 11 36 2 24 2z" fill="#ECE8FA" fill-opacity="0.92"/>' +
  '<ellipse cx="17" cy="22" rx="3.2" ry="4.6" fill="#140A1F"/>' +
  '<ellipse cx="31" cy="22" rx="3.2" ry="4.6" fill="#140A1F"/>' +
  '<ellipse cx="24" cy="32" rx="2.6" ry="3.2" fill="#140A1F" opacity=".75"/>' +
  '<ellipse cx="13" cy="29" rx="3" ry="1.6" fill="#FF9E6B" opacity=".35"/>' +
  '<ellipse cx="35" cy="29" rx="3" ry="1.6" fill="#FF9E6B" opacity=".35"/>' +
  '</svg>';

/** Bruja en escoba (silueta, mirando a la derecha), viewBox 0 -4 100 60. */
export const WITCH_SVG =
  '<svg viewBox="0 -4 100 60" aria-hidden="true" focusable="false"><g fill="currentColor">' +
  '<path d="M4 44 96 30l1 3L5 47z"/>' +
  '<path d="M2 38c6 2 10 4 14 6-4 3-9 7-16 10 4-5 5-9 2-16z"/>' +
  '<path d="M58 36c-4-6-2-14 4-17 6-1 10 3 10 9l4 6c-6 2-12 3-18 2z"/>' +
  '<path d="M60 22c-10 0-22 6-30 18 10-6 20-8 28-6z"/>' +
  '<circle cx="67" cy="16" r="4.5"/>' +
  '<path d="M57 13c5-1.5 14-1.5 21 0-7 2.5-15 2.5-21 0z"/>' +
  '<path d="M61 13c1-6-1-11-6-15 7 2 13 7 17 15z"/>' +
  '<path d="M71 28l9 3-1 2-9-2z"/>' +
  '<path d="M62 35l4 9h3l-3-9z"/>' +
  '</g></svg>';

/** Araña colgante, viewBox 0 0 40 40. */
export const SPIDER_SVG =
  '<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g stroke="#2a1d40" stroke-width="2" fill="none" stroke-linecap="round"><path d="M14 18 6 12 3 4M14 21 4 20 1 26M15 24 7 30 6 38M26 18l8-6 3-8M26 21l10-1 3 6M25 24l8 6 1 8"/></g><ellipse cx="20" cy="22" rx="7" ry="8" fill="#140A1F" stroke="#3B1F6B"/><circle cx="20" cy="13" r="4.5" fill="#140A1F" stroke="#3B1F6B"/><circle cx="18.4" cy="12.6" r="1.1" fill="#FF7A1A"/><circle cx="21.6" cy="12.6" r="1.1" fill="#FF7A1A"/></svg>';
