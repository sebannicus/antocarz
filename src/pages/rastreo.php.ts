import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return Response.redirect('https://sistema.antocarz.cl/rastreo.php', 301);
};
