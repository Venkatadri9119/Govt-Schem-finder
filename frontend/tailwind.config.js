/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        insta: {
          purple: "#833ab4",
          magenta: "#c13584",
          red: "#fd1d1d",
          orange: "#f56040",
          yellow: "#ffdc80",
          blue: "#405de6",
          royal: "#5851db",
          dark: "#0b0c10",
          cardDark: "#12141d",
          light: "#fafafa"
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
