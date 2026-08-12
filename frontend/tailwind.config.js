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
          dark: "#0b1329",
          slate: "#15203b",
          emerald: "#10b981",
          teal: "#14b8a6",
          gold: "#f59e0b",
          amber: "#fbbf24",
          soft: "#f8fafc",
          muted: "#94a3b8"
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
