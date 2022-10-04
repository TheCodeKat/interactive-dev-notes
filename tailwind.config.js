const plugin = require('tailwindcss/plugin')


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'rosewhite': '#fffdfd',
        'froly': '#ef7c7a',
        'fair-pink': '#FFEFEB',
        'blush': '#FDC4BB',
      },
      fontFamily: {
        'choco': ['Choco Chici'],
        'source-code-pro': ['Source Code Pro'] 
      }
    }
    
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl'), fontWeight: theme('fontWeight.black') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.bold') },
      })
    }),
    require('@tailwindcss/typography')
  ]
}
