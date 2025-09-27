// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Anda bisa hapus baris './src/app/...' jika sudah menghapus folder app router
  ],
  theme: {
    extend: {
      colors: {
        'emerald-himp': '#046A38', // Warna hijau emerald utama
        'emerald-light': '#068A48', // Untuk hover
        'emerald-dark': '#024D26',  // Untuk variasi lebih gelap
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Font utama
        serif: ['Merriweather', 'serif'], // Font untuk judul
      },
    },
  },
  plugins: [],
};

export default config;