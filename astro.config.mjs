import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://antocarz.cl',
  output: 'server',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/dproducto') && !page.includes('.php'),
    }),
  ],
});
