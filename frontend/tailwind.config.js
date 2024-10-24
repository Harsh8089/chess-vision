/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'blue-light': "#60a5fa",
        'red-light': "#f87171",
        'blue-dark': "#2563eb",
        'green-light': "#86efac"
      }
    },
  },
  plugins: [],
}