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
        ink: "#102033",
        mist: "#eef4f7",
        sand: "#f6efe6",
        brand: {
          50: "#eef7f7",
          100: "#d7ecec",
          200: "#afd8d8",
          300: "#84c1c3",
          400: "#58a9ad",
          500: "#2f8d93",
          600: "#216f74",
          700: "#19585d",
          800: "#153f43",
          900: "#0f2b2e"
        },
        accent: {
          50: "#fff6eb",
          100: "#ffe8c7",
          200: "#ffd08d",
          300: "#ffb454",
          400: "#f79a24",
          500: "#d97a06",
          600: "#ac5d04",
          700: "#814404",
          800: "#5c3005",
          900: "#3b1e03"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"]
      },
      boxShadow: {
        panel: "0 24px 60px rgba(16, 32, 51, 0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(255,255,255,0.45), transparent 26%), linear-gradient(135deg, rgba(47,141,147,0.16), rgba(255,180,84,0.12))"
      }
    }
  },
  plugins: []
};

export default config;
