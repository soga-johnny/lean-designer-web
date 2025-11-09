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
        // Legacy colors (for backward compatibility)
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
        },
        
        // Lean Designer Color System
        'ld-accent': {
          50: '#FAF5F0',
          100: '#EFE2D6',
          200: '#DEC1A9',
          400: '#BF8058',
          700: '#863F37',
          800: '#6F3431',
          900: '#5C2D2B',
          950: '#331515',
        },
        'ld-blue': {
          100: '#DFEEFA',
          600: '#4582D5',
        },
        'ld-green': {
          100: '#DCF7D0',
          600: '#37951B',
        },
        'ld-grey': {
          50: '#F6F6F5',
          100: '#E7E7E6',
          200: '#D2D1CF',
          300: '#B2B1AE',
          400: '#8B8985',
          700: '#51514D',
          800: '#474743',
          900: '#3E3E3B',
          950: '#262624',
        },
        'ld-primary': {
          50: '#F4F3F2',
          100: '#E1DEDB',
          900: '#251E1F',
        },
        'ld-red': {
          100: '#FBE9E8',
          600: '#C43A4A',
        },
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
