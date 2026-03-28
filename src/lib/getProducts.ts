import type { Product } from '../content/products';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return '$' + price.toLocaleString('es-CL');
}

function slugify(str: string, id: number): string {
  const base = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${base}-${id}`;
}

function rowToProduct(row: any): Product {
  const price = row.precio ? Number(row.precio) : 0;
  const code = row.codigo_antocarz || row.codigo_producto || `ANT-${row.id_producto}`;
  const imagePath = row.imagen && row.imagen.trim() !== ''
    ? `https://antocarz.cl/imgprod/${row.imagen}`
    : '/images/products/radio-ztaudio-1.webp';

  return {
    id: slugify(row.nombre, row.id_producto),
    name: row.nombre,
    brand: row.marca ?? 'Sin marca',
    category: row.categoria ?? 'General',
    subcategory: row.subcategoria ?? '',
    code,
    price,
    priceFormatted: price > 0 ? formatPrice(price) : 'Consultar',
    description: row.descripcion
      ? row.descripcion.replace(/<[^>]*>?/gm, '')
      : 'Sin descripción detallada.',
    image: imagePath,
    features: [],
    compatible: [],
    badge: row.masvendido === 1 || row.masvendido === '1' ? 'Destacado' : undefined,
  };
}

// ── Data source: PHP API (Vercel) o MySQL directo (local) ─────────────────────

const PHP_API_URL  = process.env.PHP_API_URL  ?? import.meta.env.PHP_API_URL  ?? '';
const PHP_API_SECRET = process.env.PHP_API_SECRET ?? import.meta.env.PHP_API_SECRET ?? '';

async function fetchRows(params?: string): Promise<any[]> {
  if (PHP_API_URL && PHP_API_SECRET) {
    // Producción: fetch al PHP en el hosting del cliente
    const url = `${PHP_API_URL}?key=${PHP_API_SECRET}${params ? `&${params}` : ''}`;
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`PHP API error: ${res.status} ${res.statusText}`);
    return res.json();
  }

  // Local dev: MySQL directo
  const { query } = await import('./mysql');
  if (params?.startsWith('id=')) {
    const id = params.split('=')[1];
    return query(`
      SELECT p.id_producto, p.nombre, p.codigo_antocarz, p.codigo_producto, p.stock, p.masvendido,
        m.nombre AS marca,
        (SELECT cat2.nombre FROM anto_productos_categorias pc2 JOIN anto_categorias cat2 ON pc2.id_categoria = cat2.id_categoria WHERE pc2.id_producto = p.id_producto LIMIT 1) AS categoria,
        (SELECT sub2.nombre FROM anto_productos_categoriasub pcs2 JOIN anto_categoriasub sub2 ON pcs2.id_categoriasub = sub2.id_categoriasub WHERE pcs2.id_producto = p.id_producto LIMIT 1) AS subcategoria,
        (SELECT mg2.venta FROM anto_margenes mg2 WHERE mg2.id_producto = p.id_producto ORDER BY mg2.fecha DESC, mg2.hora DESC LIMIT 1) AS precio,
        (SELECT pd2.descripcion FROM anto_productos_descripcion pd2 WHERE pd2.id_producto = p.id_producto LIMIT 1) AS descripcion,
        (SELECT pi.imagen FROM anto_productos_imagenes pi WHERE pi.id_producto = p.id_producto LIMIT 1) AS imagen
      FROM anto_productos p LEFT JOIN anto_marcas m ON p.id_marca = m.id_marca
      WHERE p.id_producto = ?
    `, [id]) as any[];
  }

  return query(`
    SELECT p.id_producto, p.nombre, p.codigo_antocarz, p.codigo_producto, p.stock, p.masvendido,
      m.nombre AS marca,
      (SELECT cat2.nombre FROM anto_productos_categorias pc2 JOIN anto_categorias cat2 ON pc2.id_categoria = cat2.id_categoria WHERE pc2.id_producto = p.id_producto LIMIT 1) AS categoria,
      (SELECT sub2.nombre FROM anto_productos_categoriasub pcs2 JOIN anto_categoriasub sub2 ON pcs2.id_categoriasub = sub2.id_categoriasub WHERE pcs2.id_producto = p.id_producto LIMIT 1) AS subcategoria,
      (SELECT mg2.venta FROM anto_margenes mg2 WHERE mg2.id_producto = p.id_producto ORDER BY mg2.fecha DESC, mg2.hora DESC LIMIT 1) AS precio,
      (SELECT pd2.descripcion FROM anto_productos_descripcion pd2 WHERE pd2.id_producto = p.id_producto LIMIT 1) AS descripcion,
      (SELECT pi.imagen FROM anto_productos_imagenes pi WHERE pi.id_producto = p.id_producto LIMIT 1) AS imagen
    FROM anto_productos p LEFT JOIN anto_marcas m ON p.id_marca = m.id_marca
    WHERE p.oculto = 0 AND p.obsoleto = 0 AND p.stock > 0
    ORDER BY p.masvendido DESC, p.nombre ASC
  `) as any[];
}

// ── API pública ───────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const rows = await fetchRows();
  return rows.map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const numericId = id.split('-').pop();
  if (!numericId || isNaN(Number(numericId))) return null;

  const rows = await fetchRows(`id=${numericId}`);
  if (!rows || !rows.length || !rows[0]) return null;

  const p = rowToProduct(rows[0]);
  p.features  = ['Consulta compatibilidad vía WhatsApp', 'Instalación garantizada en nuestras sucursales', 'Soporte técnico directo'];
  p.compatible = ['Apto para múltiples vehículos, consulta con un técnico.'];
  return p;
}

export async function getProductsMetadata() {
  const products = await getProducts();

  const brandsSet = new Set<string>();
  const categoriesTree: Record<string, string[]> = {};
  let maxPrice = 0;

  for (const p of products) {
    if (p.brand && p.brand !== 'Sin marca') brandsSet.add(p.brand);
    if (p.price > maxPrice) maxPrice = p.price;
    if (p.category) {
      if (!categoriesTree[p.category]) categoriesTree[p.category] = [];
      if (p.subcategory && !categoriesTree[p.category].includes(p.subcategory)) {
        categoriesTree[p.category].push(p.subcategory);
      }
    }
  }

  return {
    products,
    brands: Array.from(brandsSet).sort(),
    categoriesTree,
    categories: Object.keys(categoriesTree).sort(),
    maxPrice: maxPrice > 0 ? maxPrice : 325000,
  };
}
