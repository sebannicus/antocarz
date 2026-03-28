import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  return Response.redirect(new URL('/#polarizado', request.url), 301);
};
