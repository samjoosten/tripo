/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        dynamic: "var(--font-size-dynamic)",
      },
      fontFamily: {
        'gilroy-medium': ["Gilroy-Medium"],
        'gilroy-semi-bold': ["Gilroy-SemiBold"],
        'gilroy-light': ["Gilroy-Light"],
        'gilroy-regular': ["Gilroy-Regular"],
        'architects-daughter': ["ArchitectsDaughter-Regular"],
      },
      colors: {
        primary: {
          800: "#3082FE",
          100: "#B6D0FF",
          50: "#F2F6FF"
        }
      }
    },
  },
  plugins: [],
}

