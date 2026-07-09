/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FCFBF8",
        surface: "#F5F1E9",
        surfaceRaised: "#EFE8DB",
        line: "#E1D8C7",
        text: "#211C15",
        muted: "#6B6153",
        mutedDim: "#948A78",
        amber: "#C2650A",
        ember: "#C1391A",
        onAccent: "#FCFBF8",
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
