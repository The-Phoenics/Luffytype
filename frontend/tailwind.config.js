/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#222222",
      },
      fontFamily: {
        'NerdFont': [ "ProtoNerdFontMono" ]
      }
    },
  },
  plugins: [],
}