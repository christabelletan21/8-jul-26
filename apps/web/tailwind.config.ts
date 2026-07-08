import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
      },
      keyframes: {
        "balloon-rise": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(-115vh) rotate(6deg)", opacity: "0" },
        },
      },
      animation: {
        "balloon-rise": "balloon-rise 4s ease-in forwards",
      },
    },
  },
  plugins: [],
};

export default config;
