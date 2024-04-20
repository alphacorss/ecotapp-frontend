import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        primary: {
          50: '#e7eefb',
          75: '#9db8ee',
          100: '#749ae7',
          200: '#386fdc',
          300: '#0f51d5',
          400: '#0b3995',
          500: '#093182',
        },
        accent: {
          50: '#f9fdec',
          75: '#e5f8b2',
          100: '#daf592',
          200: '#cbf063',
          300: '#c0ed43',
          400: '#86a62f',
          500: '#759129 ',
        },
        error: {
          50: '#feeceb',
          75: '#f9b2ad',
          200: '#f6938c',
          300: '#f04438',
          400: '#a83027',
          500: '#922922 ',
        },
        warning: {
          50: '#fef4e6',
          75: '#fcd19a',
          100: '#fabf70',
          200: '#f8a333',
          300: '#f79009',
          400: '#ad6506',
          500: '#975805',
        },
        success: {
          50: '#e7f9f0',
          75: '#9ee1c2',
          100: '#76d5a9',
          200: '#3ac383',
          300: '#12b76a',
          400: '#0d804a',
          500: '#0b7041 ',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in',
        'fade-out': 'fadeOut 0.5s ease-out',
        'collapsible-up': 'slideUp 0.3s ease-out',
        'collapsible-down': 'slideDown 0.3s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', display: 'hidden', width: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
