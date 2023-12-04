const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ejs}",
    "./public/**/*.js",
    "../account_service/src/views/**/*.ejs",
    "../inventory_service/src/views/**/*.ejs",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      width: {
        88: "22rem",
        112: "28rem",
      },
      inset: {
        unset: "unset",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    ({ addVariant }) => {
      addVariant("popover-open", "&:popover-open");
      addVariant("popover-backdrop", "&::backdrop"); // Might not need this
    },
  ],
};
