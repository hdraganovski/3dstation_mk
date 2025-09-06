import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Add your domain here
  site: 'https://3dstation.shop',
  integrations: [ sitemap()]
});