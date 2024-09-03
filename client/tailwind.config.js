/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primaryRegular: ['Regular'],
        primaryMedium: ['Medium'],
        primaryBold: ['Bold'],
        boxShadow: {
          'bottom-only': '0 2px 4px 0 rgba(0, 0, 0, 0.1)', // Customize the values as needed
        },
      }
    },
  },
  plugins: [],
}

