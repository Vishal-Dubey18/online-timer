module.exports = {
  content: [
    "./online-timer/src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.3)'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
