/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error-container": "#93000a",
        "tertiary": "#695c50",
        "surface-container-highest": "#ffdbce",
        "on-tertiary-container": "#3c3127",
        "surface-tint": "#7e5700",
        "error-container": "#ffdad6",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#f8bc51",
        "surface-container-low": "#fff1ec",
        "on-primary-container": "#462f00",
        "secondary-fixed": "#ffdbd0",
        "on-surface": "#2a170f",
        "on-tertiary-fixed": "#231a11",
        "on-primary-fixed": "#281900",
        "on-primary-fixed-variant": "#5f4100",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#c8922a",
        "on-tertiary-fixed-variant": "#504539",
        "surface-bright": "#fff8f6",
        "inverse-surface": "#422b22",
        "surface-variant": "#ffdbce",
        "tertiary-fixed-dim": "#d4c4b5",
        "surface-dim": "#f8d2c4",
        "on-secondary-fixed": "#390c00",
        "on-secondary-container": "#681d00",
        "error": "#ba1a1a",
        "on-surface-variant": "#504536",
        "inverse-on-surface": "#ffede7",
        "surface-container": "#ffe9e2",
        "secondary-fixed-dim": "#ffb59d",
        "secondary": "#a63b10",
        "on-secondary": "#ffffff",
        "outline": "#827564",
        "surface-container-high": "#ffe2d8",
        "primary-fixed": "#ffdeab",
        "outline-variant": "#d4c4b0",
        "on-error": "#ffffff",
        "surface": "#FDF6EC",
        "on-background": "#2a170f",
        "background": "#FDF6EC",
        "tertiary-container": "#a8998b",
        "on-primary": "#ffffff",
        "on-secondary-fixed-variant": "#832600",
        "tertiary-fixed": "#f1e0d0",
        "secondary-container": "#fd7a4c",
        "primary": "#7e5700",
        "primary-fixed-dim": "#f8bc51"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Space Grotesk", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
