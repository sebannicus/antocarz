/**
 * /api/instagram — últimas publicaciones de @antocarzlaserena vía Meta Graph API.
 * Reemplaza a Behold.so (plan vencido 2026-08-12). Gratis y sin límite de vistas.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 * - IG_ACCESS_TOKEN  (obligatoria)
 * - IG_USER_ID       (opcional)
 *     · Con IG_USER_ID → Facebook Login: graph.facebook.com/{IG_USER_ID}/media.
 *       Usar token de System User del Business Manager = no caduca. (recomendado)
 *     · Sin IG_USER_ID → Instagram Login: graph.instagram.com/me/media.
 *       Token de larga duración, caduca a los 60 días.
 *
 * Sin token responde { posts: [] } y la sección muestra la grilla de respaldo.
 * La respuesta se cachea 1 h en la CDN de Vercel: ~24 llamadas a Meta por día.
 * Las URLs de imagen de Instagram son firmadas y caducan en días, por eso no se
 * cachea más tiempo.
 */

const GRAPH_VERSION = 'v23.0';
const LIMIT = 12;
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

interface IgMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

const env = (key: string): string | undefined =>
  process.env[key] ?? (import.meta.env as Record<string, string | undefined>)[key];

function json(body: unknown, status: number, cache: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache },
  });
}

export async function GET() {
  const token = env('IG_ACCESS_TOKEN');
  const userId = env('IG_USER_ID');

  if (!token) {
    return json({ posts: [] }, 200, 'public, s-maxage=300');
  }

  const base = userId
    ? `https://graph.facebook.com/${GRAPH_VERSION}/${userId}/media`
    : `https://graph.instagram.com/${GRAPH_VERSION}/me/media`;
  const url = `${base}?fields=${FIELDS}&limit=${LIMIT}&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || !Array.isArray(data?.data)) {
      // Nunca exponer el token: solo el mensaje de error de Meta.
      console.error('[API instagram] Graph error:', data?.error?.message || res.status);
      return json({ posts: [] }, 200, 'public, s-maxage=300');
    }

    const posts = (data.data as IgMedia[])
      .map((m) => ({
        id: m.id,
        // Video → miniatura; imagen y carrusel → media_url (primera imagen del carrusel).
        image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
        permalink: m.permalink,
        caption: (m.caption || '').slice(0, 140),
        isVideo: m.media_type === 'VIDEO',
      }))
      .filter((p) => p.image);

    return json({ posts }, 200, 'public, s-maxage=3600, stale-while-revalidate=86400');
  } catch (error) {
    console.error('[API instagram] Fetch failed:', (error as Error)?.message);
    return json({ posts: [] }, 200, 'public, s-maxage=300');
  }
}
