const theme = require('tailwindcss/defaultTheme')
const gray = {
  DEFAULT: '#9FA6B1',
  dark: '#9E9E9E',
  medium: '#E4E7EB',
  light: '#F4F5F7',
  lightest: '#F9FAFB'
}
const black = {
  DEFAULT: '#212121',
  dark: '#212121',
  medium: '#212121',
  light: '#212121',
  lightest: '#212121'
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /tooltip/,
        /popover/,
        /notification/,
      ],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: gray,
        black: black,
        primary: '#6B4812',
        primaryHover: '#382300',
        primaryActive: '#B87100',
        secondary: '#327EB8',
        secondaryHover: '#07406B',
        secondaryActive: '#f3fa00',
        tertiaryActive: gray.lightest,
        backgroundColor: '#382300b3',
        borderColor: '#E9EEf5',
        borderError: '#F78182',
        textColor: '#3B3732',
        textPrimaryColor: '#FFE2B6',
        textSecondaryColor: '#212121',
        textHeaderColor: '#6C7280',
        hintColor: '#C4C4C4',
        textError: '#C51F24',
        inputFocus: '#78ABF7',
        placeholder: gray.DEFAULT,
        successColor: '#3BC38E',
        warningColor: '#F2994A',
        errorColor: '#EB5757'
      },
      borderRadius: {
        DEFAULT: theme.borderRadius.md,
        '0.5xl': '.625rem'
      },
      minWidth: {
        200: '200px',
        400: '400px',
      },
      spacing: {
        7.5: '1.875rem',
        15: '3.75rem',
        17: '4.375rem',
        18: '4.5rem',
        25: '6.25rem',
        27: '6.75rem',
        38: '9.5rem',
        200: '200px',
        355: '355px',
        400: '400px',
        420: '420px',
        860: '860px',
        inherit: 'inherit'
      },
      rotate: {
        '270': '270deg',
      }
    }
  },
  variants: {
    extend: {
      display: ['focus'],
      padding: ['focus'],
      stroke: ['hover']
    }
  },
  plugins: [
    require('tailwindcss-rtl')
  ]
}
