// frontend/tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0A2E5D',     // Azul oscuro
        secondary: '#FF6F31',   // Naranja vibrante
        success: '#2ca854',
        danger: '#d95f0e'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
};