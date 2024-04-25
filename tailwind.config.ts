import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "rgb(var(--red-color))",
        orange: "rgb(var(--orange-color))",
        yellow: "rgb(var(--yellow-color))",
        green: "rgb(var(--green-color))",
        mint: "rgb(var(--mint-color))",
        cyan: "rgb(var(--cyan-color))",
        blue: "rgb(var(--blue-color))",
        purple: "rgb(var(--purple-color))",
        pink: "rgb(var(--pink-color))",

        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        tertiary: "rgb(var(--tertiary))",
        destructive: "rgb(var(--destructive))",

        muted: "rgb(var(--muted))",
        accent: "rgb(var(--accent))",
        background: {
          DEFAULT: "rgb(var(--background))",
          100: "rgb(var(--ds-background-100))",
        },

        border: "rgb(var(--border))",
        ring: "rgb(var(--ring))",

        themed: {
          border: "var(--themed-border)",
          "border-hover": "var(--themed-border-hover)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
