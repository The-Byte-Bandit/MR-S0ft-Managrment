/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      "primaryGreen": '#4ade80',
      "strokeSoft200": "#E2E4E9",
    },
    extend: {},
  },
  plugins: [
    
  ],
}
