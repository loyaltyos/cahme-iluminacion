import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        camhe: {
          red: "#d71920",
          black: "#0b0b0d",
          graphite: "#1f2126",
          steel: "#6b7280",
          light: "#f4f5f7"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(11, 11, 13, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
