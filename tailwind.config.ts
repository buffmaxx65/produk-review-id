import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FBF8F3",
          50: "#FFFEFB",
          100: "#FBF8F3",
          200: "#F4EFE6",
          300: "#EAE2D2",
        },
        brand: {
          50: "#FBF1EC",
          100: "#F6DED2",
          200: "#EAB9A4",
          300: "#DC8F75",
          400: "#CC6648",
          500: "#C2351A",
          600: "#A02814",
          700: "#7E2010",
          800: "#5C170B",
          900: "#3D0F07",
          950: "#220804",
        },
        ink: {
          50: "#FBF8F3",
          100: "#F4EFE6",
          200: "#E2DACA",
          300: "#C0B7A4",
          400: "#928974",
          500: "#6E6553",
          600: "#4F4A3F",
          700: "#37322B",
          800: "#22201B",
          900: "#0F0E0C",
          950: "#070605",
        },
        accent: {
          DEFAULT: "#C2351A",
          dark: "#7E2010",
          gold: "#E5A33B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        kicker: "0.18em",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "70ch",
          },
        },
      },
      boxShadow: {
        card: "none",
        cardHover: "0 1px 0 0 rgba(15,14,12,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
