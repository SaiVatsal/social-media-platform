/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          violet: '#7c3aed',
          dark: '#0f0728',
          card: '#1a0b36',
        }
      }
    },
  },
  plugins: [],
}
