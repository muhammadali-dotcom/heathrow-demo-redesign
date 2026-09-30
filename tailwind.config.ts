// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Config>{
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg": "var(--color-bg)",
        "bg-alt": "var(--color-bg-alt)",
        "surface": "var(--color-surface)",
        "surface-soft": "var(--color-surface-soft)",
        "line": "var(--color-line)",
        "fg": "var(--color-fg)",
        "fg-soft": "var(--color-fg-soft)",
        "muted": "var(--color-muted)",
        "overlay": "var(--color-overlay)",
        "accent": "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-solid": "var(--color-accent-solid)",
        "accent-solid-fg": "var(--color-accent-solid-fg)",
        "accent-glow": "var(--color-accent-glow)",
        "white": "#FFFFFF",
        "white-soft": "#F5F5F5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
