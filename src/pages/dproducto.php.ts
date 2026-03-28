import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    return Response.redirect(new URL(`/productos/${id}`, url.origin), 301);
  }

  return Response.redirect(new URL('/productos', url.origin), 301);
};
