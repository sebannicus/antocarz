# Antocarz — Instrucciones del Proyecto

## Contexto
Sitio web de Antocarz (antocarz.cl), expertos en **seguridad automotriz** en La Serena, Chile.
Cliente de Sebastián / Gautama Digital. **Proyecto en producción desde 2026-03-28.**

## Stack
- Astro 4.16 + TypeScript
- Modo **SSR** con adaptador `@astrojs/vercel/serverless`
- Sin framework CSS — design tokens custom, dark theme, gold accent (#C9A227)
- GSAP para animaciones
- @astrojs/sitemap 3.2.1 (NO actualizar — 3.7.x es incompatible con Astro 4.x)

## Arquitectura de datos (híbrida — cliente-side)
El hosting cPanel bloquea conexiones desde Vercel US. Solución:
- Vercel sirve el HTML (SSR sin DB calls directos)
- El browser del usuario consulta `api.antocarz.cl` directamente
- `api.antocarz.cl` → cPanel (190.107.177.42) → PHP API → MySQL

## Infraestructura DNS
| Subdominio | IP | Propósito |
|---|---|---|
| `antocarz.cl` | `216.198.79.1` | Vercel (sitio Astro) |
| `www.antocarz.cl` | CNAME Vercel | Alias www |
| `api.antocarz.cl` | `190.107.177.42` | PHP API + imágenes (cPanel) |
| `sistema.antocarz.cl` | `190.107.177.42` | ERP interno PHP (cPanel) |
| `mail.antocarz.cl` | `190.107.177.42` | Servidor de correo (cPanel) |

## Fuentes de verdad
- `src/content/site.ts` — datos globales del negocio, marcas propias, sucursales
- `src/content/services.ts` — catálogo de servicios
- `src/content/faq.ts` — preguntas frecuentes (soporta `answer` y `answerHtml`)
- `src/lib/getProducts.ts` — lógica de datos de productos

## Reglas de desarrollo
- Rama activa: `dev` — nunca trabajar directo en `main`
- Aplicar SOLID y GRASP en toda la arquitectura
- Commit en `dev` → push → `vercel --prod` para deploy

## Marcas propias (OwnBrands)
- **ZTAudio**: radio Android propia. Logo `/public/logos/ztaudio.webp`. Specs: 4GB RAM, 64GB, Bluetooth (sin especificar A2DP), cámara de retroceso opcional.
- **Rastreadores.cl**: distribuidor oficial. Link: `https://www.rastradores.cl`. Badge: "Distribuidor oficial".

## Servicios actuales
1. Car Audio (ZTAudio + JBL/Pioneer + biseles)
2. Polarizado Nanocarbón (5%, 20%, 35% — con sello y certificado legal)
3. Láminas de Seguridad (anti-impactos, no requieren certificado)
4. Alarmas y Seguridad (Hawk + Rastreadores.cl)
5. Iluminación LED
6. Cámaras de Retroceso
7. Aire Acondicionado

## Reglas de negocio importantes
- NO se venden certificados de polarizado por separado
- Los certificados se emiten solo con instalación
- +10.000 instalaciones y +10.000 certificados emitidos
- High ticket: polarizado nanocarbón, láminas de seguridad, rastreadores GPS

## Pendiente con el cliente
- Imágenes de productos reales (actualmente se usan placeholders por categoría en `resolveImage()`)
- Confirmar Instagram: `antocarzlaserena` vs `antocarzseguridadautomotriz`
- og-image WhatsApp preview no funciona (pendiente diagnóstico)

## SEO implementado
- robots.txt ✅
- sitemap ✅ (@astrojs/sitemap 3.2.1)
- BreadcrumbList schema en /productos ✅
- og-image.jpg en /public ✅
- Google Search Console verificado ✅
- GA4 implementado ✅

## Datos del cliente
- WhatsApp Lautaro: 56997371969
- WhatsApp Balmaceda: 56931258163
- Horario: Lun–Vie 09:30–18:00, Sáb 09:30–14:00
- Sucursales: Lautaro 812 y Balmaceda 2033, La Serena
