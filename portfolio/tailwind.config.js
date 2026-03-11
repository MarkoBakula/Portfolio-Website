/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
    },
  },
}
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}