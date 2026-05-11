/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "primary": "#E84CA3",
        "on-primary": "#FFFFFF",
        "primary-container": "#FAD6EC",
        "on-primary-container": "#3A1A2E",
        "primary-fixed": "#FCE4F0",
        "primary-fixed-dim": "#F0B8D4",
        "on-primary-fixed": "#3A1A2E",
        "on-primary-fixed-variant": "#5C2A4A",
        "inverse-primary": "#F0B8D4",
        "surface-tint": "#E84CA3",
        "secondary": "#E67E22",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#FDE3C8",
        "on-secondary-container": "#3A2210",
        "secondary-fixed": "#FEF0E0",
        "secondary-fixed-dim": "#F5D0B0",
        "on-secondary-fixed": "#3A2210",
        "on-secondary-fixed-variant": "#7A4210",
        "tertiary": "#2C003E",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#E8D0F0",
        "on-tertiary-container": "#1C0028",
        "tertiary-fixed": "#E8D0F0",
        "tertiary-fixed-dim": "#D0A8E0",
        "on-tertiary-fixed": "#1C0028",
        "on-tertiary-fixed-variant": "#4A1060",
        "background": "#FBE8C9",
        "on-background": "#1B1B1B",
        "surface": "#FBE8C9",
        "on-surface": "#1B1B1B",
        "surface-container-lowest": "#FDF5EA",
        "surface-container-low": "#F8E4C4",
        "surface-container": "#F5DFBE",
        "surface-container-high": "#F0D8B6",
        "surface-container-highest": "#EBD0AC",
        "surface-bright": "#FDF5EA",
        "surface-dim": "#E8CCAA",
        "surface-variant": "#EBD0AC",
        "on-surface-variant": "#5A4A38",
        "inverse-surface": "#2C003E",
        "inverse-on-surface": "#FBE8C9",
        "surface-dark": "#2C003E",
        "surface-container-lowest-dark": "#1A0025",
        "surface-container-low-dark": "#32084A",
        "surface-container-dark": "#3A1054",
        "surface-container-high-dark": "#441A60",
        "surface-container-highest-dark": "#4E246C",
        "error": "#BA1A1A",
        "on-error": "#FFFFFF",
        "error-container": "#FFDAD6",
        "on-error-container": "#410002",
        "outline": "#8C7A68",
        "outline-variant": "#D0C0B0",
        "highlight": "#FF5FA2",
        "whatsapp": "#25D366",
        "white": "#FFFFFF"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      "spacing": {
        "margin-mobile": "16px",
        "stack-lg": "32px",
        "stack-md": "16px",
        "gutter": "24px",
        "stack-sm": "8px",
        "unit": "4px",
        "container-max": "1280px",
        "margin-desktop": "48px"
      },
      "fontFamily": {
        "headline-md": ["Readex Pro", "sans-serif"],
        "label-caps": ["Lexend", "sans-serif"],
        "display-lg": ["Readex Pro", "sans-serif"],
        "body-sm": ["Lexend", "sans-serif"],
        "body-base": ["Lexend", "sans-serif"]
      },
      "fontSize": {
        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
        "label-caps": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "display-lg": ["clamp(32px, 5vw, 48px)", { "lineHeight": "1.2", "fontWeight": "700" }],
        "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "body-base": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
      },
      "transitionDuration": {
        "160": "160ms"
      },
      "transitionTimingFunction": {
        "ease-out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
        "ease-in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)"
      },
      "keyframes": {
        "fade-up": {
          "from": { "opacity": "0", "transform": "translateY(12px)" },
          "to": { "opacity": "1", "transform": "translateY(0)" }
        },
        "fade-in": {
          "from": { "opacity": "0" },
          "to": { "opacity": "1" }
        }
      },
      "animation": {
        "fade-up": "fade-up 400ms cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in": "fade-in 300ms cubic-bezier(0.23, 1, 0.32, 1) forwards"
      }
    },
  },
  plugins: [],
}
