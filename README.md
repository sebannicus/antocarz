# Antocarz — Sitio Web Corporativo

Sitio web oficial de **Antocarz** (antocarz.cl), tienda de equipamiento automotriz en La Serena, Chile. Desarrollado por [Gautama Digital](https://gautamadigital.cl).

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 4.16 + TypeScript |
| Rendering | SSR (`output: server`) + páginas estáticas selectivas |
| Deploy | Vercel (serverless) |
| Estilos | CSS custom con design tokens — sin framework |
| Animaciones | GSAP + ScrollTrigger (carga diferida) |
| Analytics | Google Analytics 4 |
| Data | PHP API en cPanel del cliente → fetch client-side |

---

## Arquitectura de datos

El hosting del cliente (cPanel, Chile) bloquea conexiones desde Vercel (US). La solución es una arquitectura híbrida:

```
Usuario (Chile)
    │
    ├─► Vercel CDN ──► HTML estático (instantáneo)
    │
    └─► api.antocarz.cl ──► PHP API ──► MySQL
              (cPanel Chile)
```

- **Vercel** sirve el HTML/CSS/JS — no hace ningún llamado a la DB
- **El browser del usuario** (en Chile) consulta `api.antocarz.cl` directamente
- Los productos cargan client-side con skeletons mientras esperan

### PHP API

Archivo: `php-api/products.php` (no incluido en el repo — subir manualmente al hosting)

```
GET https://api.antocarz.cl/api/products.php?key=antocarz_api_2026
GET https://api.antocarz.cl/api/products.php?key=antocarz_api_2026&id=123
```

- PHP 5.6 compatible (PDO, sin `??`, sin `get_result()`)
- CORS: `Access-Control-Allow-Origin: *`
- Imágenes: `https://api.antocarz.cl/imgprod/{imagen}`

---

## Infraestructura DNS

| Dominio | Destino | Propósito |
|---|---|---|
| `antocarz.cl` | Vercel `216.198.79.1` | Sitio público |
| `www.antocarz.cl` | Vercel CNAME | Alias www |
| `api.antocarz.cl` | cPanel `190.107.177.42` | PHP API + imágenes |
| `sistema.antocarz.cl` | cPanel `190.107.177.42` | ERP interno del cliente |
| `mail.antocarz.cl` | cPanel `190.107.177.42` | Servidor de correo |

---

## Estructura del proyecto

```
antocarz/
├── public/
│   ├── logos/          # Logos de marcas (WebP)
│   ├── images/         # Imágenes del sitio (WebP, optimizadas)
│   ├── slides hero/    # Imágenes del slider hero
│   └── clients/        # Logos de clientes
├── src/
│   ├── components/
│   │   ├── layout/     # Header, Footer
│   │   ├── sections/   # Hero, Services, OwnBrands, ProductsCta, etc.
│   │   └── ui/         # Button, SectionLabel, ServiceCard
│   ├── content/
│   │   ├── site.ts     # Fuente única de verdad — datos del negocio
│   │   ├── services.ts # Servicios y descripciones
│   │   ├── faq.ts      # Preguntas frecuentes
│   │   └── testimonials.ts
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML base, SEO, Schema JSON-LD, GA4
│   ├── lib/
│   │   ├── getProducts.ts    # Lógica de datos (dev local: MySQL directo)
│   │   └── mysql.ts          # Pool de conexiones MySQL
│   ├── pages/
│   │   ├── index.astro
│   │   ├── productos.astro        # Catálogo — client-side fetch
│   │   └── productos/
│   │       └── [id].astro         # Producto individual — client-side fetch
│   ├── styles/
│   │   ├── global.css
│   │   └── animations.css
│   └── utils/
│       └── animations.ts     # GSAP helpers
├── php-api/            # ⚠️ En .gitignore (contiene credenciales DB)
│   └── products.php
└── astro.config.mjs
```

---

## Desarrollo local

### Requisitos

- Node.js 20+
- WAMP/XAMPP con MySQL corriendo
- Base de datos `antocarz` importada localmente

### Setup

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con credenciales locales

# Servidor de desarrollo
npm run dev
```

### Variables de entorno

```env
# Desarrollo local — MySQL directo
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=antocarz

# Producción — PHP API (dejar vacío en local para usar MySQL directo)
PHP_API_URL=
PHP_API_SECRET=

# Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX
```

> En producción (Vercel) solo se usan `PHP_API_URL`, `PHP_API_SECRET` y `PUBLIC_GA_ID`. Las variables DB no se utilizan desde Vercel.

---

## Deploy

```bash
# Deploy a producción
npx vercel --prod
```

El proyecto está conectado a GitHub. Cada push a `main` dispara un deploy automático en Vercel.

### Ramas

| Rama | Propósito |
|---|---|
| `dev` | Desarrollo activo — siempre trabajar aquí |
| `main` | Producción — merge desde dev, deploy automático |

---

## SEO implementado

- Schema `LocalBusiness` / `AutoPartsStore` con JSON-LD
- Schema `FAQPage`
- `AggregateRating` (4.7 estrellas, 223 reseñas)
- Open Graph + Twitter Card
- Geo meta tags (La Serena, -29.9027, -71.2519)
- Keywords locales: car audio La Serena, radio android CarPlay, etc.
- Google Analytics 4

### Pendiente SEO

- [ ] `robots.txt`
- [ ] `@astrojs/sitemap`
- [ ] `og-image.jpg` (1200×630px)
- [ ] Schema `BreadcrumbList` en `/productos`

---

## Performance

- Imágenes comprimidas a WebP (65% calidad, máx 1200px) — 47MB → 4.2MB (−91%)
- Google Fonts carga no-bloqueante (`media="print"` trick)
- `preconnect` + `dns-prefetch` a `api.antocarz.cl`
- LCP image (`BANNER POLARIZADOS.webp`) con `<link rel="preload">` + `fetchpriority="high"`
- GSAP carga diferida (no bloquea render inicial)
- ProductsCta y catálogo: skeletons + fetch client-side (0 bloqueo SSR)

---

## Cliente

**Antocarz** · La Serena, Chile
Sucursales: Lautaro 812 · Balmaceda 2033
WhatsApp: +56 9 3125 8163
Sistema interno: [sistema.antocarz.cl](https://sistema.antocarz.cl)

---

*Desarrollado por [Gautama Digital](https://gautamadigital.cl) · Sebastián Morales*
