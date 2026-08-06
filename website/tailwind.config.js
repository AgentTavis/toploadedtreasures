/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A1119',
          900: '#0E1720',
          850: '#13202C',
          800: '#1B2838', // pulled straight from the logo
          700: '#26384A',
          600: '#37516B',
        },
        cream: {
          DEFAULT: '#F4E8C8', // pulled from the logo cream
          dim: '#DCD2B6',
        },
        sand: '#B3A889',
        rust: {
          DEFAULT: '#C0562B', // logo sun, brightened for contrast
          bright: '#DE6A32',
          deep: '#8E3A16',
        },
        gold: {
          DEFAULT: '#E7B44C',
          hi: '#F7D982',
          deep: '#B4832C',
        },
        teal: {
          DEFAULT: '#2E7D74',
          bright: '#3FA595',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-gold': '0 0 45px -10px rgba(231,180,76,0.55)',
        'glow-rust': '0 0 45px -10px rgba(192,86,43,0.55)',
        'card': '0 24px 50px -18px rgba(0,0,0,0.75)',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(60% 60% at 50% 20%, rgba(231,180,76,0.18), transparent 70%)',
        'radial-rust': 'radial-gradient(50% 50% at 50% 50%, rgba(192,86,43,0.28), transparent 70%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        glowpulse: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        glowpulse: 'glowpulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
