/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      nerko: "Nerko One",
      finger: "Finger Paint",
    },
    extend: {
      gridTemplateColumns: {
        20: "repeat(20, 1cm)",
      },
      gridTemplateRows: {
        20: "repeat(20, 1cm)",
      },
    },
  },
  plugins: [],
};
