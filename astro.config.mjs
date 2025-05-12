// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [preact()],
  adapter: vercel({
    edgeMiddleware: true,
  }),
  output: 'server',
  build: {
    serverEntry: 'entry.mjs',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
