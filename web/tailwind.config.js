module.exports = {
  content: [
    './lib/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['new-spirit', 'sans-serif'],
      },
      spacing: {
        header: '4rem',
      },
      animation: {
        'breathe-1': 'breathe-1 12s ease-in-out infinite',
        'breathe-2': 'breathe-2 16s ease-in-out infinite',
        'breathe-3': 'breathe-3 20s ease-in-out infinite',
      },
      keyframes: {
        'breathe-1': {
          '0%, 100%': {transform: 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1.1)'},
          '33%': {transform: 'translate3d(20px, 40px, 0px) rotate(6deg) scale(0.9)'},
          '66%': {transform: 'translate3d(-40px, 20px, 0px) rotate(12deg) scale(1)'},
        },
        'breathe-2': {
          '0%, 100%': {transform: 'translate3d(-40px, 40px, 0px) rotate(12deg) scale(1.1)'},
          '33%': {transform: 'translate3d(0px, 0px, 0px) rotate(0deg) scale(0.8)'},
          '66%': {transform: 'translate3d(-20px, 20px, 0px) rotate(6deg) scale(1)'},
        },
        'breathe-3': {
          '0%, 100%': {transform: 'translate3d(-30px, -30px, 0px) rotate(56deg) scaleX(1)'},
          '33%': {transform: 'translate3d(0px, 0px, 0px) rotate(0deg) scaleX(1.2)'},
          '66%': {transform: 'translate3d(-20px, 20px, 0px) rotate(62deg) scaleX(0.8)'},
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
