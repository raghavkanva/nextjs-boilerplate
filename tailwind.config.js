/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F7F2",
        surface: "#FFFFFF",
        surfaceRaised: "#DCFCE7",
        line: "#E5E7EB",
        text: "#111827",
        muted: "#4B5563",
        mutedDim: "#6B7280",
        amber: "#16A34A",
        ember: "#15803D",
        onAccent: "#FFFFFF",
        cta: "#FFC400",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
