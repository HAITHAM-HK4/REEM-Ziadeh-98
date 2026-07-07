/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: { DEFAULT: '#0f0f10', soft: '#1a1a1c', card: '#222224' },
        paper: { DEFAULT: '#f5f2ed', soft: '#ebe6de', dark: '#ddd6cb' },
        stone: { DEFAULT: '#1a1816', muted: '#5c5650', light: '#3d3832' },
        milk: { DEFAULT: '#eceae6', muted: '#a8a29e', dim: '#78716c' },
        copper: { DEFAULT: '#d4622a', light: '#e8935a', dark: '#b45309', glow: '#f97316' },
        teal: { DEFAULT: '#14b8a6', light: '#5eead4' },
      },
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.06) translate(-1%, -0.5%)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -1%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 98, 42, 0)' },
          '50%': { boxShadow: '0 0 30px 2px rgba(212, 98, 42, 0.15)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sideBeamLeft: {
          '0%, 100%': { opacity: '0.3', transform: 'translateX(0) scaleX(0.6)' },
          '50%': { opacity: '1', transform: 'translateX(12px) scaleX(1)' },
        },
        sideBeamRight: {
          '0%, 100%': { opacity: '0.3', transform: 'translateX(0) scaleX(0.6)' },
          '50%': { opacity: '1', transform: 'translateX(-12px) scaleX(1)' },
        },
        sidePulse: {
          '0%, 100%': { opacity: '0.4', height: '40%' },
          '50%': { opacity: '1', height: '85%' },
        },
        energyFlow: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease both',
        slideIn: 'slideIn 0.6s ease both',
        kenBurns: 'kenBurns 22s ease-in-out infinite alternate',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        floatY: 'floatY 5s ease-in-out infinite',
        sideBeamLeft: 'sideBeamLeft 3s ease-in-out infinite',
        sideBeamRight: 'sideBeamRight 3s ease-in-out infinite',
        sidePulse: 'sidePulse 2.5s ease-in-out infinite',
        energyFlow: 'energyFlow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
