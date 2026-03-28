import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  return Response.redirect(new URL('/productos', request.url), 301);
};
