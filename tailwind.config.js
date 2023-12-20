/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bento: "#F4F4F2",
        secondary: "#D4E4BC",
        tertiary: "#36558F",
      },
      fontFamily: {
        title: ["Array", "sans-serif"],
        primary: ["Inter Tight", "sans-serif"],
        secondary: ["Supreme", "sans-serif"],
      },
    },
  },
  plugins: [],
};
