/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        pink: "#FF2D95",
        purple: "#7B2FF7",
        violet: "#8A4DFF",
        yellow: "#F4C430",
        offwhite: "#F7F5F8",
        muted: "#AAA6AE",
      },
      fontFamily: {
        display: ['"Arial Black"', '"Arial Bold"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
