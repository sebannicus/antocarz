/**
 * download-images.mjs — Antocarz
 * Descarga imágenes reales de autos/mecánica desde Pexels API.
 *
 * USO:
 *   node download-images.mjs TU_API_KEY_PEXELS
 *
 * API KEY GRATIS en: https://www.pexels.com/api/
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.error('❌  Falta la API key de Pexels.');
  console.error('    Uso: node download-images.mjs TU_API_KEY');
  console.error('    API key gratis en: https://www.pexels.com/api/');
  process.exit(1);
}

// ── Imágenes a descargar ───────────────────────────────────────────────────
const IMAGES = [
  // Servicios
  { query: 'car audio stereo',          dest: 'services/car-audio.webp' },
  { query: 'car window tinting',        dest: 'services/polarizado.webp' },
  { query: 'car alarm security',        dest: 'services/alarma.webp' },
  { query: 'led headlight car',         dest: 'services/led.webp' },
  { query: 'car reverse camera',        dest: 'services/camara.webp' },
  { query: 'car mechanic air conditioning', dest: 'services/aire-acondicionado.webp' },

  // Productos — Car Audio
  { query: 'car touch screen radio',    dest: 'products/radio-android-jbl.webp' },
  { query: 'pioneer car stereo screen', dest: 'products/radio-pioneer.webp' },
  { query: 'car speakers coaxial',      dest: 'products/parlantes-jbl.webp' },
  { query: 'car speaker 6x9',          dest: 'products/parlantes-pioneer.webp' },
  { query: 'car subwoofer bass',        dest: 'products/subwoofer-pioneer.webp' },
  { query: 'subwoofer car audio jbl',   dest: 'products/subwoofer-jbl.webp' },

  // Productos — Seguridad
  { query: 'car alarm remote',          dest: 'products/alarma-hawk.webp' },
  { query: 'gps tracker device',        dest: 'products/gps-brm.webp' },
  { query: 'parking sensor car',        dest: 'products/sensores-reversa.webp' },
  { query: 'car central locking',       dest: 'products/cierre-centralizado.webp' },

  // Productos — Polarizado
  { query: 'sedan car tinted windows',  dest: 'products/polarizado-sedan.webp' },
  { query: 'suv dark tinted windows',   dest: 'products/polarizado-suv.webp' },
  { query: 'pickup truck tinted',       dest: 'products/polarizado-camioneta.webp' },

  // Productos — LED
  { query: 'car headlight led bulb',    dest: 'products/turbo-led-h4.webp' },
  { query: 'car fog light led',         dest: 'products/neblineros-h11.webp' },

  // Productos — Aire Acondicionado
  { query: 'car air conditioning service', dest: 'products/carga-ac.webp' },
  { query: 'car cabin air filter',      dest: 'products/filtro-polen.webp' },

  // Productos — Insumos / Equipamiento
  { query: 'car interior led light',    dest: 'products/ampolletas-t10.webp' },
  { query: 'pickup truck tonneau cover', dest: 'products/lona-maritima.webp' },

  // Productos — Láminas
  { query: 'car window safety film',    dest: 'products/lamina-sedan.webp' },
  { query: 'suv window protection film', dest: 'products/lamina-suv.webp' },

  // Productos — Vinilo
  { query: 'matte black car wrap vinyl', dest: 'products/vinilo-wrap.webp' },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function fetchJSON(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return follow(res.headers.location);
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
        file.on('error', reject);
      }).on('error', reject);
    };
    follow(url);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ──────────────────────────────────────────────────────────────────
const PUBLIC = path.join(process.cwd(), 'public', 'images');
ensureDir(path.join(PUBLIC, 'services'));
ensureDir(path.join(PUBLIC, 'products'));

console.log(`\n🚗  Descargando ${IMAGES.length} imágenes de Pexels...\n`);

let ok = 0;
let fail = 0;

for (const item of IMAGES) {
  const destPath = path.join(PUBLIC, item.dest);

  // No re-descargar si ya existe
  if (fs.existsSync(destPath)) {
    console.log(`  ⏭  Ya existe: ${item.dest}`);
    ok++;
    continue;
  }

  try {
    const encoded = encodeURIComponent(item.query);
    const apiUrl  = `https://api.pexels.com/v1/search?query=${encoded}&per_page=1&orientation=landscape`;
    const json    = await fetchJSON(apiUrl, { Authorization: API_KEY });

    if (!json.photos || json.photos.length === 0) {
      console.warn(`  ⚠  Sin resultados para: "${item.query}"`);
      fail++;
      continue;
    }

    const photoUrl = json.photos[0].src.large; // ~940×627
    await downloadFile(photoUrl, destPath);
    console.log(`  ✅  ${item.dest.padEnd(38)} ← "${item.query}"`);
    ok++;

    await sleep(300); // respetar rate limit de Pexels
  } catch (err) {
    console.error(`  ❌  Error en ${item.dest}: ${err.message}`);
    fail++;
  }
}

console.log(`\n✅  Completado: ${ok} descargadas, ${fail} fallidas.`);
console.log('📁  Imágenes guardadas en: public/images/\n');

if (ok > 0) {
  console.log('👉  Próximo paso: ejecuta el build para ver los cambios.');
  console.log('    npm run build  o  npm run dev\n');
}
