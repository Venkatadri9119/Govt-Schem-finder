/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: "#0b3c5d",
          navy: "#1d2731",
          gold: "#d9b310",
          sky: "#328cc1",
          light: "#f8fafc",
          emerald: "#059669",
          amber: "#d97706",
          rose: "#e11d48"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}
