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
- IDs pendientes: `PUBLIC_CLARITY_ID`, `PUBLIC_META_PIXEL_ID` (Jonathan), `PUBLIC_GADS_ID` (Jonathan)

## SEO implementado
- robots.txt ✅
- sitemap ✅ (@astrojs/sitemap 3.2.1)
- BreadcrumbList schema en /productos ✅
- og-image.jpg en /public ✅
- Google Search Console verificado + vinculado a GA4 ✅ (desde 2026-03-28)
- GA4 implementado ✅
- Canonical URL auto-referencial en `/productos/[id]` ✅ (fix 2026-04-14 — antes apuntaba al homepage)
- Meta description dinámica en páginas de producto ✅ (actualizada via JS tras cargar API)

## Analytics — estado (2026-04-14)
- GA4 Property: `properties/530277574`
- GSC vinculada: `https://www.antocarz.cl/` (prefijo URL, flujo 14264770398)
- Dimensiones custom registradas: `wa_source`, `wa_branch`, `item_category`, `item_id`, `item_name`
- Eventos custom activos: `whatsapp_click`, `whatsapp_modal_open`, `view_item`, `view_item_list`, `select_item`, `catalog_filter`
- **Pendiente manual**: marcar `whatsapp_click` como conversión en GA4 Admin → Eventos

## Tracking WhatsApp (fix 2026-04-14)
- `Button.astro` soporta `data-*` via `...rest` spread
- Bypass modal usa `data-wa-branch` (no URL parsing — era el bug original)
- `getWaSource()` lee `data-wa-source` primero, luego DOM traversal
- LocalMap: corregido número WA sucursal Lautaro (usaba `SITE.whatsapp` global en vez de `branch.whatsappNumber`)
- Atributos explícitos: Hero (`inicio`), CtaFinal (`contacto`+branch), LocalMap (`sucursales`+branch), Services (`servicios`)

## Datos del cliente
- WhatsApp Lautaro: 56997371969
- WhatsApp Balmaceda: 56931258163
- Horario: Lun–Vie 09:30–18:00, Sáb 09:30–14:00
- Sucursales: Lautaro 812 y Balmaceda 2033, La Serena

---

## Bot WhatsApp IA — Piloto Gautama Digital

Servicio productizado de asistente IA para WhatsApp. Piloto construido en Gautama Digital, siguiente cliente: Antocarz (plan Pro con agenda por sucursal).

Documentación completa en `.agents/whatsapp-bot/`:
- `service-plan.md` — tiers, precios, márgenes, escalabilidad
- `system-prompt.md` — prompt del bot Anto (Antocarz)
- `setup-guide.md` — guía técnica paso a paso

### Stack técnico
- WhatsApp: Meta Cloud API (oficial — sin riesgo de ban)
- Automatización: Make.com
- IA: OpenAI GPT-4o mini
- Logs: Google Sheets

### Credenciales del piloto (Gautama Digital)
```
App Meta: "Antocarz wsp" | App ID: 1662952501371459
Chip bot: +56 9 8289 0047
Phone Number ID: 1004533332754398
WABA ID: 1862553081073953
Verify Token: gautama2026
Access Token: TEMPORAL — expira ~24hrs desde generación
Google Sheet: https://docs.google.com/spreadsheets/d/1pNggz5LiklBNdYGA-gHvWserMoqTWBc0TPA7HiZaQ0E/
```

### Estado del escenario Make (2026-04-12)
1. WhatsApp Business Cloud — Watch Events (activo 24/7)
2. OpenAI — Generate a completion (GPT-4o mini, system prompt simplificado)
3. WhatsApp Business Cloud — Send a Message
4. Google Sheets — Add a Row (log conversaciones)

Bot funcional y respondiendo en tiempo real.

### Pendientes urgentes
1. **TOKEN PERMANENTE** (URGENTE): El token temporal expira ~24hrs. Generar en business.facebook.com → Configuración del negocio → Usuarios del sistema → Agregar "Make Bot" (Admin) → Generate token con permiso `whatsapp_business_messaging` → actualizar en Make (conexión WhatsApp)
2. **Bug JSON prefix**: Las respuestas llegan con prefijo JSON visual `{...}texto real`. Bot funcional pero antiestético. Investigar extracción de `choices[].message.content` en Make.
3. **System prompt completo**: Cargar `system-prompt.md` completo en el módulo OpenAI de Make (actualmente simplificado)
4. **Memoria de conversación**: Cada mensaje es independiente — el bot olvida el contexto entre turnos
