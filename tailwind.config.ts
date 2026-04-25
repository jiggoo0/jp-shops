import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#002D62", // Deep Navy (Trust & Stability)
          foreground: "#FFFFFF",
          light: "#003B80",
          dark: "#001F45",
        },
        secondary: {
          DEFAULT: "#C5A059", // Gold (Success & Premium)
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8B0000", // Dark Red (Alert/Action)
          foreground: "#FFFFFF",
        },
        slate: {
          950: "#020617",
          900: "#0F172A",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "IBM Plex Sans Thai", "sans-serif"],
        body: ["var(--font-body)", "Sarabun", "sans-serif"],
        sans: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};
export default config;
