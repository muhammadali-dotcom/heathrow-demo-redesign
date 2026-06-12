// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Config>{
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-main": "#050505",
        "dark-card": "#0B0B0D",
        "dark-soft": "#121214",
        "dark-border": "#262626",
        "red-main": "#cc200e",
        "red-dark": "#A93226",
        "red-soft": "#C95144",
        "red-glow": "rgba(255, 29, 37, 0.35)",
        "white": "#FFFFFF",
        "white-soft": "#F5F5F5",
        "muted": "#A1A1AA",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "24px",
        6: "32px",
        7: "48px",
        8: "64px",
        9: "96px",
        10: "128px",
      },
    },
  },
  plugins: [],
};
