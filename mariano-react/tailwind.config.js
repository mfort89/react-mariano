// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto le dice a Tailwind que busque clases en todos tus archivos React
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define la fuente Inter si quieres usarla con Tailwind
      },
    },
  },
  plugins: [],
};
