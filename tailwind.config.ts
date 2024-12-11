import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F8F8",
        text: "#2B2325",
        primary: "#2B2325",
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
