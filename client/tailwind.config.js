/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#dce9f0",
        background: "#050A0E",
        primary: "#2f9cdd",
        secondary: "#1e628b",
        accent: "#90c2e0",
      },
    },
  },
  plugins: [],
};
