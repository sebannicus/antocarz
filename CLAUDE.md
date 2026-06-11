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

## Incidente bot + cambio temporal web 2026-06-11 (desplegado ✅ a producción)
- **Causa raíz:** Sebastián cambió la clave de su cuenta Meta → invalidó el Access Token permanente del bot → Make desactivó el escenario con error `Failed to verify connection 'Gautama Bot' [400]`.
- **Token nuevo generado** (System User, caducidad Nunca, permisos `whatsapp_business_messaging` + `whatsapp_business_management`). Verificado ✅ vivo (quality GREEN) contra `graph.facebook.com/v21.0/1004533332754398`.
- **Conexión Make:** la vieja `Gautama Bot` fue **eliminada**. Pendiente crear `Antocarz Bot` y asignarla a TODOS los módulos WhatsApp (escenario principal `Watch Events [1]`, `sendMessage [24]/[63]`, template `[69]` + escenario 24h `[4]`).
- **Cambio temporal web (commit `47b3242`, deploy prod):** todos los CTAs WhatsApp redirigidos de `56931258163` → **`56997371969`** (Lautaro directo) para no perder leads mientras se repara el bot. Archivos: `site.ts` (phone/whatsapp/2× whatsappNumber), `Services.astro`, `productos.astro`, `productos/[id].astro`.
- **⚠️ REVERTIR cuando el bot vuelva** — Sebastián definirá si la web vuelve al bot (`56982890047`) o queda en Jonathan (`56931258163`).
- **⚠️ Discrepancia detectada:** ANTES de este cambio la web ya apuntaba a `56931258163` (Jonathan), NO al bot `56982890047` como decía esta doc. Verificar la verdad al revertir.
- **Pendiente operativo:** avisar a Jonathan que el bot estuvo caído ~00:05→07:51 — revisar mensajes sin responder.

## Cambios web 2026-05-06 (en rama dev — pendiente aprobación cliente → `vercel deploy --prod`)
- FAQ: doble acordeón — "Ver preguntas frecuentes" colapsa toda la sección; cada pregunta colapsa su respuesta
- Testimonios: reducidos de 6 a 2 (Jan Contuliano + Esteban Tapia), grid 2 columnas
- Footer: muestra ambas sucursales (Lautaro 812 + Balmaceda 2033) con link a Google Maps
- OwnBrands: descripciones ZTAudio y Rastreadores acortadas — eliminada redundancia con bullets
- ServiceCard: eliminado párrafo de descripción — tarjetas muestran solo título + bullets
- Google Sheets bot: columnas Acción (F) y Sucursal (G) agregadas en módulos 67 y 68 de Make
- Looker Studio: dashboard creado con scorecards, gráfico por día, tabla leads, filtros fecha/sucursal
  URL dashboard: pendiente compartir con Jonathan

## Cambios web 2026-05-05 (desplegados ✅)
- Todos los CTAs WhatsApp apuntan al bot: `SITE.whatsapp = '56982890047'`
- Modal de selección de sucursal eliminado de BaseLayout + CtaFinal simplificado
- 11 FAQs nuevas del PPT "cuidados y políticas" añadidas a `faq.ts`
- Nav header: link "Preguntas" → `#faq` añadido en `site.ts`
- Sección FAQ: `id="faq"` (antes era `id="contacto"`)
- **Fix crítico**: `Faq.astro` (era `FAQ.astro` en git — falla case-sensitivity en Linux/Vercel)

## Datos del cliente
- ⚠️ **Web EN PRODUCCIÓN apunta a 56997371969 (temporal, desde 2026-06-11)** — ver sección incidente arriba. Revertir al reparar el bot.
- WhatsApp bot (único número web cuando opera): 56982890047
- WhatsApp Lautaro (derivaciones directas / número web temporal actual): 56997371969
- WhatsApp Lautaro (derivaciones directas): 56997371969
- WhatsApp Balmaceda / Jonathan: 56931258163
- Horario: Lun–Vie 09:30–18:00, Sáb 09:30–14:00
- Sucursales: Lautaro 812 y Balmaceda 2033, La Serena

---

## Bot WhatsApp IA — Piloto Gautama Digital

Servicio productizado de asistente IA para WhatsApp. Piloto construido en Gautama Digital, siguiente cliente: Antocarz (plan Pro con agenda por sucursal).

Documentación completa en `.agents/whatsapp-bot/`:
- `service-plan.md` — tiers, precios, márgenes, escalabilidad
- `system-prompt-antocarz-solo-info.md` — prompt **v3.2 LISTO PARA DESPLEGAR** (solo info + handoff)
- `system-prompt.md` — prompt v2.0 con agendamiento completo (reservado para Plan Pro futuro)
- `setup-guide.md` — guía técnica paso a paso
- `onboarding-form.html` — formulario HTML para nuevos clientes (glassmorphism, 5 pasos)

### Stack técnico
- WhatsApp: Meta Cloud API (oficial — sin riesgo de ban)
- Automatización: Make.com
- IA: OpenAI GPT-4o mini (response_format: json_object)
- Sesiones/historial: Make Data Store
- Logs: Google Sheets (renombrar a "Antocarz Bot Conversaciones" y compartir con Jonathan)

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

### Estado del bot (2026-05-17) — EN PRODUCCIÓN ✅ v3.3 en Make y archivo
- Prompt en Make: **v3.3** ✅ desplegado 2026-05-17
- Prompt en archivo: `system-prompt-antocarz-solo-info.md` — **v3.3**
- v3.3 incluye: handoff JSON con campos individuales (`client_name`, `locality`, `vehicle`, `service`) para template Meta
- v3.2 incluye: aviso temporal Balmaceda (ingreso por calle Las Higueras) + todas las mejoras anteriores
- Bot informa, recopila nombre/vehículo/servicio/localidad y deriva al equipo
- Jonathan/Lautaro recibe WA con contexto completo del lead (📋 NUEVO LEAD)
- Detección de leads web (`🌐 LLEGÓ DESDE WEB` en handoff_message)
- Historial acumulativo (Data Store append — no overwrite)
- Opera 24/7
- Estructura Make: Watch Events [1] → Set Variables [11] → Data Store Get [14] → OpenAI [32] → ParseJSON [16] → Router
  - Rama chat: sendMessage [24] → Google Sheets log [67] → update historial [53]
  - Rama handoff: sendMessage cliente [63] → sendMessage sucursal [65] → update historial [66] → Sheets [68]
  - Ramas dormidas (conservadas): agendamiento completo con Google Calendar

### Data Store antocarz_sessions — campos (2026-05-13)
Campos base: `phone`, `history`, `client_name`, `booking_state`, `booking_branch`, `booking_service`, `booking_vehicle`, `booking_duration`, `last_interaction`, `booking_slots_json`, `booking_datatime_pref`
Campos nuevos 2026-05-13: `handoff_done` (Text), `notified_24h` (Text)
- Módulo 53: `last_interaction` → `{{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}` ✅ corregido
- Módulo 66: `handoff_done` → `true` ✅ activo

### ✅ Templates Meta aprobados y desplegados (2026-05-17)
1. **`nuevo_lead_antocarz`** — módulo 69 en escenario principal ✅ en producción
2. **`conversacion_sin_seguimiento`** — escenario 24h independiente ✅ en producción

### Escenario principal — Módulo 69 (Template a Jonathan)
- Reemplaza módulo 65 (texto libre) — ya no hay problema de ventana 24h Meta
- Template: `nuevo_lead_antocarz::es_CL`
- `to`: `{{if(16.branch = "lautaro"; 56997371969; 56931258163)}}`
- `body_0–5`: client_name, locality, vehicle, service, sucursal dirección, link wa.me
- Filter: `{{16.handoff_message}}` ≠ `""`

### Escenario 24h — conversacion_sin_seguimiento
- Schedule: cada 6 horas
- Módulo 1: Data Store Search `antocarz_sessions` — filtros internos: `handoff_done` ≠ `true` + `notified_24h` ≠ `true`
- Módulo 4: Send Template Message a Jonathan (56931258163)
- Módulo 5: Update Record — solo `notified_24h` → `true` (resto SIN MAPEAR — dejar en blanco)
- Filter entre módulos: `{{1.data.last_interaction}}` no vacío + `parseDate(1.data.last_interaction)` < `addHours(now; -24)` con operador `date:less`
- ⚠️ Importante: campos en módulo 5 usan prefijo `1.data.` (ej: `{{1.data.phone}}`, `{{1.data.client_name}}`)
- ⚠️ Fix 2026-05-30: corregidos 4 bugs del blueprint — ver detalle abajo

#### Bugs corregidos en escenario 24h (2026-05-30)
1. **Módulo 5 borraba todos los campos** — el Update Record mapeaba todos los campos a `""`, borrando `phone`, `history`, etc. Fix: solo `notified_24h: "true"` mapeado, el resto en blanco.
2. **Filtro usaba `-1h` en vez de `-24h`** — `addHours(now; -1)` corregido a `addHours(now; -24)`.
3. **`body_0` sin `ifempty`** — `{{1.data.phone}}` → `{{ifempty(1.data.phone; "Sin número")}}`.
4. **`body_4` sin `ifempty`** — `{{1.data.last_interaction}}` → `{{ifempty(1.data.last_interaction; "Sin fecha")}}`.

#### Regla para Update Record en Make
En Make, campo mapeado a `""` **sobreescribe** el valor existente. Campo **no mapeado** (en blanco en UI) **preserva** el valor. Nunca mapear campos que no se quieren modificar.

### Otros pendientes Make
- **Módulo 67 y 68 (Google Sheets Timestamp)**: cambiar a `{{formatDate(now; "YYYY-MM-DD HH:mm:ss"; "America/Santiago")}}`
- **Router**: corregir doble ejecución — módulos 24/53/67 y 63/65/66/68 corren dos veces
- **Filtro no-texto**: ruta paralela en Router para `type ≠ text` → sendMessage fijo

### Pendiente futuro — App de visualización de leads
- **Arquitectura decidida (2026-05-17):**
  - Capa de datos: Google Sheets hoja "Leads" populada por Make (estado completo del lead)
  - Visualización pasiva: Looker Studio (ya existe dashboard base)
  - Visualización activa: página Astro/HTML con tabla + botón de seguimiento
  - Acción: Make webhook trigger → ejecuta flujo `conversacion_sin_seguimiento` on demand
- **Orden de construcción:** 1) Expandir Sheets con hoja Leads → 2) Webhook Make → 3) Dashboard HTML

### Catálogo extendido (v3.0)
El bot ahora reconoce estas categorías aunque no tenga precios detallados — las redirige a www.antocarz.cl/productos:
- Aire Acondicionado: Carga de A/C, Aceite Compresor, Filtro de Polen
- Car Audio: Conectores de radio por marca/modelo (Toyota, Hyundai, Kia, Nissan, Chevrolet, Honda, Mazda, Suzuki, Ford, VW, Subaru, Jeep, MG, Daewoo, SsangYong), adaptadores Canbus, arnés
- Equipamiento: Lonas marítimas
- Iluminación LED: Festoon, Neblineros, T10, Turbo LED
- Insumos Eléctricos: Ampolletas
- Láminas de Seguridad: por tipo de vehículo
- Mantenimiento
- Polarizado Americano: por tipo de vehículo
- Seguridad: Alzavidrios, Bloqueos de Motor, Cierre Centralizado, Control de Flotas, Sensores de Retroceso Hawk (gris plata, negro, blanco, goma)
- Vinilo

### Detección lead web con código de producto (v3.0)
Mensajes del sitio tienen formato: `"Hola Antocarz sucursal [X] [emoji] Los vi en su página web y me interesa el producto: [nombre] (Cód: [número])"`
- Bot extrae: sucursal + producto + código
- Salta fase de información (cliente ya vio el producto)
- Pide solo 3 datos: nombre, vehículo, localidad (sucursal ya viene en el mensaje)
- Handoff incluye código de producto para Jonathan

### Pendientes bot Antocarz
1. ✅ Google Sheets log en rama chat
2. ✅ Teléfono del cliente en handoff a Jonathan
3. ✅ Timezone fix — incorporado en v3.1, pendiente desplegar en Make módulo 32
4. Cambio nombre WABA: de "Gautama Digital" → "Antocarz" (Meta Business Manager)
5. Foto de perfil del bot: logo 500×500px PNG
6. Chip prepago: convertir a pospago o activar auto-recarga
7. **Botones interactivos Rama B** — sucursal por botones (cuando retomen agenda)
8. **Escenarios 2–4** — recordatorios 24h, resumen diario, post-servicio (cuando retomen agenda)
9. **RAG endpoint** (futuro): PHP search endpoint en `api.antocarz.cl` + módulo HTTP en Make para consultar DB de productos en tiempo real — arquitectura: mensaje usuario → HTTP GET api.antocarz.cl/buscar?q=[query] → JSON productos → inyectar en contexto OpenAI
