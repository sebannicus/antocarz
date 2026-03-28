# Antocarz — Instrucciones del Proyecto

## Contexto
Sitio web de Antocarz (antocarz.cl), tienda de equipamiento automotriz en La Serena, Chile.
Cliente de Sebastián / Gautama Digital. Proyecto de entrega real.

## Stack
- Astro 4.16 + TypeScript
- Modo **SSR** con @astrojs/node@8
- mysql2 para conexión a MySQL (WAMP local en dev, cPanel en producción)
- Sin framework CSS — design tokens custom, dark theme, gold accent (#C9A227)
- GSAP para animaciones

## Base de datos
- DB local: WAMP, base `antocarz`, usuario root sin password
- Credenciales en `.env` (gitignored) — ver `.env.example`
- `src/lib/db.ts` — pool de conexiones
- `src/lib/getProducts.ts` — toda la lógica de datos (getProducts, getProductById, getProductsMetadata)
- Precio: `anto_margenes.venta` última entrada por fecha DESC
- SSR: cada request consulta la DB en vivo

## Reglas de desarrollo
- Rama activa: `dev` — nunca trabajar directo en `main`
- Aplicar SOLID y GRASP en toda la arquitectura
- `src/content/site.ts` es la fuente única de verdad para datos globales del negocio
- `src/lib/getProducts.ts` es la fuente única de verdad para datos de productos

## Pendiente para lanzar
- Imágenes de productos: el cliente debe proveer la carpeta de fotos de su servidor PHP
  - Actualmente se usa mapeo por categoría en `resolveImage()` dentro de `getProducts.ts`
  - Una vez disponibles, nombrar por `id_producto` y actualizar `resolveImage()`
- Confirmar Instagram correcto con cliente (`antocarzlaserena` vs `antocarzseguridadautomotriz`)
- Confirmar email `ventas@antocarz.cl`
- Deploy en Vercel con variables de entorno DB apuntando al MySQL del hosting del cliente

## Pendiente SEO
- robots.txt
- @astrojs/sitemap
- og-image.jpg en /public
- Schema BreadcrumbList en /productos

## Datos del cliente (desde anto_conductas)
- WhatsApp: 56931258163
- Horario: Lun–Vie 09:30–18:00, Sáb 09:30–14:00
- Sucursales: Lautaro 812 y Balmaceda 2033, La Serena
