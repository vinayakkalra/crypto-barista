/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./frontend/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    /* screens: {
      xs: { max: "640px" },
      // => @media (min-width: 640px) { ... }
    }, */
    extend: {
      // that is animation class
      animation: {
        fade: "fadeIn 1s ease-in-out",
        marquee: "marquee 15s linear infinite",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { backgroundColor: theme("colors.gray.300") },
          "100%": { backgroundColor: theme("colors.transparent") },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-120%)" },
        },
      }),
    },
  },
  plugins: [],
};
