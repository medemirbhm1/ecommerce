/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#EB6D20",
      third: "#EB8426",
      text: "#3E3E3E",
      paragraph: "#292929",
      subtext: "#9A9A9A",
      success: "#6DB95A",
      error: "#6DB95A",
      warning: "#D89614",
      url: "#177DDC",
      thickblack: "#040404",
      middleblack: "#0B0B0B",
      softblack: "#1B1B1B",
      light: "#D6D6D6",
      medium: "#5F5F5F",
      regular: "#303030",
      border: "#E9E9E9",
      disabled: "#FFFFFF",
      background: "#FDFDFD",
      softbackground: "#FFF9F3",
      graybackground: "#F5F6F8",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
