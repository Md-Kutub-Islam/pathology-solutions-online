/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#5E8C61", // Add your custom color
        "custom-light": "#F4EDEB",
        "custom-light-green": "#899D8A",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
