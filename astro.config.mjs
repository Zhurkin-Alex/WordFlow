// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node'; // 👈 Меняем адаптер

export default defineConfig({
  integrations: [preact()],
  adapter: node({ mode: 'standalone' }), // 👈 Используем Node адаптер
  output: 'server',
  build: {
    serverEntry: 'entry.mjs',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
