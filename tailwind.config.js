/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#14100C",
        surface: "#1F1912",
        surfaceRaised: "#271F16",
        line: "#3A2F22",
        text: "#F5EDE1",
        muted: "#B8A890",
        mutedDim: "#8A7A62",
        amber: "#E8963C",
        ember: "#D9481F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
