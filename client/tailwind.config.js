/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#4ade80',
        strokeSoft200: "#E2E4E9",
        blue50: "#241457",
        blue100: "#11092C",
        blue25: "#311e70",
        // Add other custom colors here if needed
      },
    },
  },
  plugins: [],
}
