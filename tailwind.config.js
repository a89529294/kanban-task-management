/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "very-dark-grey": "#20212C",
        "main-purple": "#635FC7",
      },
    },
  },

  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
