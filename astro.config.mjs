import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://antocarz.cl',
  output: 'server',
  adapter: vercel(),
});
