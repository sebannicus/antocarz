/**
 * patch-runtime.mjs
 * Reemplaza nodejs18.x → nodejs20.x en el output de Vercel.
 * Necesario porque @astrojs/vercel@7 hace fallback a 18 en Node 20+.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const base = '.vercel/output/functions';

function patchDir(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); }
  catch { return; }

  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      patchDir(full);
    } else if (e.name === '.vc-config.json') {
      const raw = readFileSync(full, 'utf8');
      if (raw.includes('nodejs18.x')) {
        writeFileSync(full, raw.replace(/nodejs18\.x/g, 'nodejs20.x'));
        console.log(`patched: ${full}`);
      }
    }
  }
}

patchDir(base);
