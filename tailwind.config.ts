import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kai: {
          black:      '#050508',
          dark:       '#0d0d12',
          card:       '#111118',
          gold:       '#C9A84C',
          'gold-light': '#E8C97A',
          'gold-muted': '#8B6F2E',
          white:      '#F5F5F0',
          gray:       '#9999AA',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.8s ease-out forwards',
        'slide-up':   'slideUp 0.8s ease-out forwards',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'glow':       'glow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.0)' },
          '50%':      { boxShadow: '0 0 24px 4px rgba(201,168,76,0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
export default config
