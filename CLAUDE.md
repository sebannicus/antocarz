# Antocarz — Instrucciones del Proyecto

## Contexto
Sitio web de Antocarz (antocarz.cl), expertos en **seguridad automotriz** en La Serena, Chile.
Cliente de Sebastián / Gautama Digital. **Proyecto en producción desde 2026-03-28.**

## Archivos estratégicos (.agents/)
- `.agents/analisis_posicionamiento_seguridad_automotriz.html` — análisis completo de posicionamiento, competencia local y digital, matriz de capacidades, 30 ideas de contenido (2026-04-28)
- `.agents/whatsapp-bot/` — todo el bot IA WhatsApp (ver sección Bot más abajo)
- `.agents/product-marketing-context.md` — copy y contexto de marketing
- `.agents/content-ideas.md` / `content-calendar.md` — ideas y calendario de contenido

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

## Analytics — estado (2026-05-05)
- GA4 Property: `properties/530277574`
- GSC vinculada: `https://www.antocarz.cl/` (prefijo URL, flujo 14264770398)
- Dimensiones custom registradas: `wa_source`, `wa_branch`, `item_category`, `item_id`, `item_name`
- Eventos custom activos: `whatsapp_click`, `view_item`, `view_item_list`, `select_item`, `catalog_filter`
- `whatsapp_modal_open` ya no aplica — modal eliminado (2026-05-05)
- **Pendiente manual**: marcar `whatsapp_click` como conversión en GA4 Admin → Eventos

## Tracking WhatsApp (estado 2026-05-05)
- Modal de sucursales **eliminado** — todos los CTAs van directo al bot (+56 9 8289 0047)
- `wa_branch` siempre trackea como `'bot'`
- `getWaSource()` lee `data-wa-source` primero, luego DOM traversal
- Atributos explícitos: Hero (`inicio`), CtaFinal (`contacto`), LocalMap (`sucursales`), Services (`servicios`)

## Cambios web 2026-05-05 (desplegados ✅)
- Todos los CTAs WhatsApp apuntan al bot: `SITE.whatsapp = '56982890047'`
- Modal de selección de sucursal eliminado de BaseLayout + CtaFinal simplificado
- 11 FAQs nuevas del PPT "cuidados y políticas" añadidas a `faq.ts`
- Nav header: link "Preguntas" → `#faq` añadido en `site.ts`
- Sección FAQ: `id="faq"` (antes era `id="contacto"`)
- **Fix crítico**: `Faq.astro` (era `FAQ.astro` en git — falla case-sensitivity en Linux/Vercel)

## Datos del cliente
- WhatsApp bot (único número web): 56982890047
- WhatsApp Lautaro (derivaciones directas): 56997371969
- WhatsApp Balmaceda / Jonathan: 56931258163
- Horario: Lun–Vie 09:30–18:00, Sáb 09:30–14:00
- Sucursales: Lautaro 812 y Balmaceda 2033, La Serena

---

## Bot WhatsApp IA — Piloto Gautama Digital

Servicio productizado de asistente IA para WhatsApp. Piloto construido en Gautama Digital, siguiente cliente: Antocarz (plan Pro con agenda por sucursal).

Documentación completa en `.agents/whatsapp-bot/`:
- `service-plan.md` — tiers, precios, márgenes, escalabilidad
- `system-prompt-antocarz-solo-info.md` — prompt v2.1 DESPLEGADO (solo info + handoff)
- `system-prompt.md` — prompt v2.0 con agendamiento completo (reservado para Plan Pro futuro)
- `setup-guide.md` — guía técnica paso a paso
- `onboarding-form.html` — formulario HTML para nuevos clientes (glassmorphism, 5 pasos)

### Stack técnico
- WhatsApp: Meta Cloud API (oficial — sin riesgo de ban)
- Automatización: Make.com
- IA: OpenAI GPT-4o mini (response_format: json_object)
- Sesiones/historial: Make Data Store
- Logs: Google Sheets

### Credenciales Antocarz (producción)
```
App Meta: "Antocarz wsp" | App ID: 1662952501371459
Chip bot: +56 9 8289 0047
Phone Number ID: 1004533332754398
WABA ID: 1862553081073953
Access Token: PERMANENTE ✅ (generado 2026-04-21)
Encargado derivaciones: Jonathan — WA: 56931258163
Google Sheet logs: https://docs.google.com/spreadsheets/d/1pNggz5LiklBNdYGA-gHvWserMoqTWBc0TPA7HiZaQ0E/
```

### Estado del bot (2026-05-05) — EN PRODUCCIÓN ✅ v2.7 Solo Info + Handoff
- Prompt: `system-prompt-antocarz-solo-info.md` (versión activa: **v2.7**)
- Bot informa, recopila nombre/vehículo/servicio/localidad y deriva a Jonathan
- Jonathan recibe WA con contexto completo del lead (📋 NUEVO LEAD)
- Detección de leads web (`🌐 LLEGÓ DESDE WEB` en handoff_message)
- Historial acumulativo (Data Store append — no overwrite)
- Localidad obligatoria antes de preguntar sucursal
- Formato de respuesta: lista estructurada (OBLIGATORIAMENTE)
- Precios con IVA incluido y "van desde"
- Regla anti-alucinación de precios implementada
- CONTEXTO DINÁMICO: fecha + hora Chile en cada request
- Opera 24/7 — **timezone fix pendiente en Make módulo 32** (ver más abajo)
- Estructura Make: Watch Events [1] → Set Variables [11] → Data Store Get [14] → OpenAI [32] → ParseJSON [16] → Router
  - Rama chat: sendMessage → Google Sheets log → update historial
  - Rama handoff: sendMessage cliente → sendMessage Jonathan → update historial
  - Ramas dormidas (conservadas): agendamiento completo con Google Calendar

### Formato JSON del bot (v2.7)
```json
{ "action": "chat|handoff|escalate", "response": "...", "handoff_message": null, "branch": null }
```
- `handoff`: requiere nombre + vehículo + servicio antes de disparar
- `handoff_message`: incluye `🌐 LLEGÓ DESDE WEB` si cliente llegó via landing

### ⚠️ Pendiente manual — Make módulo 32
Actualizar CONTEXTO DINÁMICO con timezone correcto:
```
Fecha actual: {{formatDate(now; "YYYY-MM-DD (dddd)"; "America/Santiago")}} — Hora Chile: {{formatDate(now; "HH:mm"; "America/Santiago")}}
```
Sin este fix, el bot no detecta correctamente el horario de madrugada en Chile.

### Pendientes bot Antocarz
1. ✅ Google Sheets log en rama chat (módulos 63, 65, 66, 68)
2. ✅ Teléfono del cliente en handoff a Jonathan
3. **Timezone fix** en Make módulo 32 (CONTEXTO DINÁMICO — ver arriba)
4. Cambio nombre WABA: de "Gautama Digital" → "Antocarz" (Meta Business Manager)
5. Foto de perfil del bot: logo 500×500px PNG
6. Chip prepago: convertir a pospago o activar auto-recarga
7. **Botones interactivos Rama B** — sucursal por botones (cuando retomen agenda)
8. **Escenarios 2–4** — recordatorios 24h, resumen diario, post-servicio (cuando retomen agenda)
