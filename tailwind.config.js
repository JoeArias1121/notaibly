/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // light mode button background (blue-600)
          foreground: "#ffffff", // light mode text color (white)
        },
        secondary: {
          DEFAULT: "#f3f4f6", // light mode secondary background (gray-100)
          foreground: "#1f2937", // light mode secondary text (gray-800)
        },
        // dark mode overrides
        "primary-dark": {
          DEFAULT: "#ffffff", // dark mode button background (white)
          foreground: "#000000", // dark mode text color (black)
        },
        "secondary-dark": {
          DEFAULT: "#1f2937", // dark mode secondary background (gray-800)
          foreground: "#f9fafb", // dark mode secondary text (gray-50)
        },
      },
    },
  },
  plugins: [],
};
