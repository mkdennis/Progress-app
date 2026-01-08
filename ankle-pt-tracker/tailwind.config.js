/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        // Retro game color palette from reference
        retro: {
          dark: '#1a1a2e',      // Deep purple/navy background
          darker: '#0f0f1a',    // Even darker for contrast
          primary: '#7dd3fc',   // Light cyan (progress bars, text)
          secondary: '#3d4a6b', // Dark slate blue (unfilled progress)
          accent: '#e879f9',    // Magenta/pink accent
          success: '#4ade80',   // Green for completion
          danger: '#f87171',    // Red for reset/danger
          muted: '#64748b',     // Muted text
        }
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(125, 211, 252, 0.3)',
        'retro-sm': '2px 2px 0px 0px rgba(125, 211, 252, 0.3)',
        'retro-accent': '4px 4px 0px 0px rgba(232, 121, 249, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
