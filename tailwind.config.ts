import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F8F8F8",
          dark: "#1A1A1A"
        },
        text: {
          DEFAULT: "#2B2325",
          dark: "#F8F8F8"
        },
        primary: {
          DEFAULT: "#2B2325",
          dark: "#F8F8F8"
        },
        input: {
          placeholder: {
            DEFAULT: "#6B7280",
            dark: "#2D2527"
          },
          border: {
            DEFAULT: "#E5E7EB",
            dark: "#61585A"
          }
        },
        glow: {
          DEFAULT: "rgba(255,200,180,0.15)",
          dark: "#6B4A4F"
        }
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)"],
        garamond: ["var(--font-eb-garamond)"],
      },
    },
  },
  plugins: [],
};
export default config;
