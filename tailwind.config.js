/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        secondary: "#2c5aa0",
        accent: "#00b894",
        surface: "#ffffff",
        background: "#f8fafc",
        success: "#00b894",
        warning: "#fdcb6e",
        error: "#e84393",
        info: "#74b9ff"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}