/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4k": "2560px",
    },
    extend: {
      colors: {},

      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        "Josefin Sans": ["Josefin Sans"],
        Poppins: ["Poppins"],
      },
    },
  },
  plugins: [require("daisyui")],
};
