import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  return Response.redirect(new URL('/verificador', url.origin), 301);
};
