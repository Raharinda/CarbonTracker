/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ── Light ──────────────────────────────────────────────────────────
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#D2D2D2",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#D2D2D2",
          overlay: "#B3B3B3",
        },
        foreground: {
          DEFAULT: "#1C1C1C",
          secondary: "#686868",
          muted: "#8E8E8E",
          disabled: "#B3B3B3",
          inverse: "#FFFFFF",
        },
        brand: {
          DEFAULT: "#25CE7F",
          hover: "#1FAC6A",
          subtle: "#D3F5E5",
          muted: "#B6EFD4",
        },
        border: {
          DEFAULT: "#B3B3B3",
          strong: "#8E8E8E",
          brand: "#25CE7F",
        },

        // ── Dark ───────────────────────────────────────────────────────────
        dark: {
          background: {
            DEFAULT: "#1C1C1C",
            secondary: "#171717",
          },
          surface: {
            DEFAULT: "#171717",
            raised: "#424242",
            overlay: "#686868",
          },
          foreground: {
            DEFAULT: "#FFFFFF",
            secondary: "#B3B3B3",
            muted: "#8E8E8E",
            disabled: "#686868",
            inverse: "#1C1C1C",
          },
          brand: {
            DEFAULT: "#25CE7F",
            hover: "#49D694",
            subtle: "#0C452A",
            muted: "#136740",
          },
          border: {
            DEFAULT: "#424242",
            strong: "#686868",
            brand: "#25CE7F",
          },
        },
      },
      fontFamily: {
        sans: ["Manrope-Regular"],
        regular: ["Manrope-Regular"],
        medium: ["Manrope-Medium"],
        semibold: ["Manrope-SemiBold"],
        bold: ["Manrope-Bold"],
        extrabold: ["Manrope-ExtraBold"],
      },
    },
  },
  plugins: [],
};
