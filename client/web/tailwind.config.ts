import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        creamyPeach: "#FFEED9",
        azureOcean: "#39A7FF",
        sereneSky: "#87C4FF",
        breezyAqua: "#E0F4FF",
      },
      fontFamily: {
        limelight: ["Limelight", "sans"],
        spaceGrotesk: ["Space Grotesk", "sans"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
