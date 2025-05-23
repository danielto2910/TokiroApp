/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#BFFFC8", // Pastel Green
        secondary: {
          pastelOrange: "#FFD79B",
          accentCoral: "#FF9E9E",
          softCream: "#fff5df",
          white: "#FFFFFF",
          softGray: "#F5F5F5",
          textGreen: "#2D3A22",
          lighterCream: "#fff5df",

        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        bGarden: ["BubbleGarden", "sans-serif"],
        bGardenBold: ["BubbleGardenBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};