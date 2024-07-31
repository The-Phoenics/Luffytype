/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#001d29",
        textpending: "#819198",
        textcorrect: "#ffd56b",
        texterror: "#ff4747",
      },
      fontFamily: {
        'NerdFont': [ "'ProtoNerdFontMono'" ]
      }
    },
  },
  plugins: [],
}