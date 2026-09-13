import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          950: '#01001a',
          900: '#0a031d',
          850: '#130833',
          800: '#1c0d48',
          700: '#281363',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        beige: {
          50: '#FAF9F6',
          100: '#F5F5F0',
          200: '#E8E6DF',
          300: '#D4D0C7',
          400: '#B8B2A5',
          500: '#9C9583',
          600: '#7A7360',
          700: '#5D5646',
          800: '#4A4438',
          900: '#3B362D',
          950: '#1F1C16',
        },
        champagne: {
          50: '#FFFDF5',
          100: '#FEF9E6',
          200: '#FDF0C4',
          300: '#FBE69D',
          400: '#F9D975',
          500: '#F7C94D',
          600: '#D4A832',
          700: '#B08824',
          800: '#8C6B1B',
          900: '#6B5115',
          950: '#382B0B',
        },
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        'white-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #F7C94D 0%, #D4A832 50%, #B08824 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
