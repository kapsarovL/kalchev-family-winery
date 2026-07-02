import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair-display)"],
        inter: ["var(--font-inter)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        wineRed: {
          "100": "hsl(353, 42%, 32%)",
          "200": "hsl(353, 42%, 22%)",
          "300": "hsl(353, 42%, 12%)",
          DEFAULT: "hsl(var(--wineRed))",
          foreground: "hsl(var(--wineRed-foreground))",
        },
        cream: {
          "100": "hsl(37, 58%, 90%)",
          "200": "hsl(37, 58%, 80%)",
          "300": "hsl(37, 58%, 70%)",
          DEFAULT: "hsl(var(--cream))",
          foreground: "hsl(var(--cream-foreground))",
        },
        gold: {
          "100": "hsl(34, 45%, 50%)",
          "200": "hsl(34, 45%, 40%)",
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        deepBrown: {
          "100": "hsl(30, 20%, 10%)",
          "200": "hsl(30, 20%, 20%)",
          "300": "hsl(30, 20%, 30%)",
          DEFAULT: "hsl(var(--deepBrown))",
          foreground: "hsl(var(--deepBrown-foreground))",
        },
        oliveGreen: {
          "100": "hsl(120, 30%, 20%)",
          "200": "hsl(120, 30%, 30%)",
          "300": "hsl(120, 30%, 40%)",
          DEFAULT: "hsl(var(--oliveGreen))",
          foreground: "hsl(var(--oliveGreen-foreground))",
        },
        white: {
          "100": "hsl(0, 0%, 100%)",
          "200": "hsl(0, 0%, 95%)",
          "300": "hsl(0, 0%, 90%)",
          DEFAULT: "hsl(var(--white))",
          foreground: "hsl(var(--white-foreground))",
        },
        black: {
          "100": "hsl(0, 0%, 0%)",
          "200": "hsl(0, 0%, 5%)",
          "300": "hsl(0, 0%, 10%)",
          DEFAULT: "hsl(var(--black))",
          foreground: "hsl(var(--black-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
