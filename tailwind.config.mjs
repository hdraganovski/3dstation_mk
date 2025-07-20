import { defineConfig } from 'tailwindcss';

export default defineConfig({
  darkMode: 'class', // We'll use dark mode only, but Astro/Tailwind expects this
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // slate-900
        surface: '#1e293b',    // slate-800
        primary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8',    // blue-700
          light: '#3b82f6',   // blue-500
        },
        accent: '#2563eb',
        text: '#f1f5f9',      // slate-100
      },
    },
  },
  plugins: [],
}); 