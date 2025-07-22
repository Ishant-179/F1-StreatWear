/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // You would choose a font from Google Fonts like 'Playfair Display' or 'Lora'
        // and link it in public/index.html
        display: ['"Playfair Display"', 'serif'], // For headings/brand name
        sans: ['"Roboto Flex"', 'sans-serif'], // For general text
      },
      colors: {
        'f1-red': '#E10600',
        'dark-gray': '#1A1A1A',
        'light-gray': '#F2F2F2',
        'neutral-bg': '#E0E0DB', // A lighter, warm neutral like in the image
      }
    },
  },
  plugins: [],
}