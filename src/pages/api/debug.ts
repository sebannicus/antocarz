import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const PHP_API_URL = process.env.PHP_API_URL ?? '';
  const PHP_API_SECRET = process.env.PHP_API_SECRET ?? '';

  const info: Record<string, any> = {
    PHP_API_URL: PHP_API_URL || '(vacío)',
    PHP_API_SECRET: PHP_API_SECRET ? '(definido)' : '(vacío)',
    node_env: process.env.NODE_ENV,
  };

  // Intentar fetch al PHP
  if (PHP_API_URL && PHP_API_SECRET) {
    try {
      const url = `${PHP_API_URL}?key=${PHP_API_SECRET}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      info.fetch_status = res.status;
      if (res.ok) {
        const data: any[] = await res.json();
        info.fetch_result = `OK — ${data.length} productos`;
      } else {
        info.fetch_result = `ERROR HTTP ${res.status}`;
      }
    } catch (e: any) {
      info.fetch_error = e?.message ?? String(e);
    }
  } else {
    info.fetch_result = 'SKIP — env vars vacías';
  }

  return new Response(JSON.stringify(info, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
