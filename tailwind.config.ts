import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    { pattern: /^text-(red|orange|amber|yellow|green|blue|sky|purple|pink|rose|teal|violet|slate|gray)-(400|500|600)$/ },
    { pattern: /^bg-(red|orange|amber|yellow|green|blue|sky|purple|pink|rose|teal|violet|slate|gray)-(50|100)$/ },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        ink: {
          50:  '#f8f8f7',
          100: '#f0efee',
          200: '#e4e2df',
          300: '#b8b4ae',
          400: '#8a8680',
          500: '#6b6760',
          600: '#524f4a',
          700: '#3d3b37',
          800: '#2d2b27',
          900: '#1a1917',
        },
      },
      fontFamily: {
        sans: ['var(--font-display)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
