import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#9D4EDD',
        accent: '#FFD60A',
        success: '#06FFA5',
        danger: '#FF006E',
        warning: '#FB5607',
        background: {
          primary: '#0A0E27',
          secondary: '#151934',
          tertiary: '#1E2749',
        },
        text: {
          primary: '#F8F9FA',
          secondary: '#ADB5BD',
          tertiary: '#6C757D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-rajdhani)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': {
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
          },
          '100%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        glitch: {
          '0%, 100%': {
            transform: 'translate(0)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
          },
        },
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
      },
    },
  },
  plugins: [],
}

export default config
