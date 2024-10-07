/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#5E8C61", // Add your custom color
        "custom-light": "#F4EDEB",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
