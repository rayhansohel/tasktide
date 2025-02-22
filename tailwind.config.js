/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'poppins': ["Poppins", "serif"],
      'antonio': ["Antonio", "serif"],
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#000000",
          secondary: "#d1d5db",
          accent: "#9002F1",
          neutral: "#FF0055",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7Eb",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316",
          error: "#f43f5e",
        },
        dark: {
          primary: "#FFFFFF",
          secondary: "#1f2937",
          accent: "#9002F1",
          neutral: "#FF0055",
          "base-100": "#010409",
          "base-200": "#0D1117",
          "base-300": "#151B23",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316",
          error: "#f43f5e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
