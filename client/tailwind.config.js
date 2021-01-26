module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-grey": {
          A: "#333333", // normal
          B: "#36454f", // light grey
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
