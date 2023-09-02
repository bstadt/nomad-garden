/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        serif: ['var(--font-ibm-plex-serif)', 'serif'],
      },
      colors: {
        ////////////////////////////////////////////////////////////////////// DERIVED COLORS

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary), <alpha-value>)', //'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground), <alpha-value>)',
          50: 'hsl(var(--green-50), <alpha-value>)',
          100: 'hsl(var(--green-100), <alpha-value>)',
          200: 'hsl(var(--green-200), <alpha-value>)',
          300: 'hsl(var(--green-300), <alpha-value>)',
          400: 'hsl(var(--green-400), <alpha-value>)',
          500: 'hsl(var(--green-500), <alpha-value>)',
          600: 'hsl(var(--green-600), <alpha-value>)',
          700: 'hsl(var(--green-700), <alpha-value>)',
          800: 'hsl(var(--green-800), <alpha-value>)',
          900: 'hsl(var(--green-900), <alpha-value>)',
          950: 'hsl(var(--green-950), <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary), <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground), <alpha-value>)',
          50: 'hsl(var(--green-50), <alpha-value>)',
          100: 'hsl(var(--green-100), <alpha-value>)',
          200: 'hsl(var(--green-200), <alpha-value>)',
          300: 'hsl(var(--green-300), <alpha-value>)',
          400: 'hsl(var(--green-400), <alpha-value>)',
          500: 'hsl(var(--green-500), <alpha-value>)',
          600: 'hsl(var(--green-600), <alpha-value>)',
          700: 'hsl(var(--green-700), <alpha-value>)',
          800: 'hsl(var(--green-800), <alpha-value>)',
          900: 'hsl(var(--green-900), <alpha-value>)',
          950: 'hsl(var(--green-950), <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive), <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground), <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted), <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground), <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent), <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground), <alpha-value>)',
        },
        neutral: {
          DEFAULT: 'hsl(var(--neutral), <alpha-value>)',
          foreground: 'hsl(var(--neutral-foreground), <alpha-value>)',
        },

        popover: {
          DEFAULT: 'hsl(var(--popover), <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground), <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card), <alpha-value>)',
          foreground: 'hsl(var(--card-foreground), <alpha-value>)',
        },

        ////////////////////////////////////////////////////////////////////// PRIMITIVE COLORS
        black: 'hsl(var(--black), <alpha-value>)',
        white: 'hsl(var(--white), <alpha-value>)',
        blue: {
          50: 'hsl(var(--blue-50), <alpha-value>)',
          100: 'hsl(var(--blue-100), <alpha-value>)',
          200: 'hsl(var(--blue-200), <alpha-value>)',
          300: 'hsl(var(--blue-300), <alpha-value>)',
          400: 'hsl(var(--blue-400), <alpha-value>)',
          500: 'hsl(var(--blue-500), <alpha-value>)',
          600: 'hsl(var(--blue-600), <alpha-value>)',
          700: 'hsl(var(--blue-700), <alpha-value>)',
          800: 'hsl(var(--blue-800), <alpha-value>)',
          900: 'hsl(var(--blue-900), <alpha-value>)',
          950: 'hsl(var(--blue-950), <alpha-value>)',
        },
        yellow: {
          50: 'hsl(var(--yellow-50), <alpha-value>)',
          100: 'hsl(var(--yellow-100), <alpha-value>)',
          200: 'hsl(var(--yellow-200), <alpha-value>)',
          300: 'hsl(var(--yellow-300), <alpha-value>)',
          400: 'hsl(var(--yellow-400), <alpha-value>)',
          500: 'hsl(var(--yellow-500), <alpha-value>)',
          600: 'hsl(var(--yellow-600), <alpha-value>)',
          700: 'hsl(var(--yellow-700), <alpha-value>)',
          800: 'hsl(var(--yellow-800), <alpha-value>)',
          900: 'hsl(var(--yellow-900), <alpha-value>)',
          950: 'hsl(var(--yellow-950), <alpha-value>)',
        },
        gray: {
          50: 'hsl(var(--gray-50), <alpha-value>)',
          100: 'hsl(var(--gray-100), <alpha-value>)',
          200: 'hsl(var(--gray-200), <alpha-value>)',
          300: 'hsl(var(--gray-300), <alpha-value>)',
          400: 'hsl(var(--gray-400), <alpha-value>)',
          500: 'hsl(var(--gray-500), <alpha-value>)',
          600: 'hsl(var(--gray-600), <alpha-value>)',
          700: 'hsl(var(--gray-700), <alpha-value>)',
          800: 'hsl(var(--gray-800), <alpha-value>)',
          900: 'hsl(var(--gray-900), <alpha-value>)',
          950: 'hsl(var(--gray-950), <alpha-value>)',
        },
        red: {
          50: 'hsl(var(--red-50), <alpha-value>)',
          100: 'hsl(var(--red-100), <alpha-value>)',
          200: 'hsl(var(--red-200), <alpha-value>)',
          300: 'hsl(var(--red-300), <alpha-value>)',
          400: 'hsl(var(--red-400), <alpha-value>)',
          500: 'hsl(var(--red-500), <alpha-value>)',
          600: 'hsl(var(--red-600), <alpha-value>)',
          700: 'hsl(var(--red-700), <alpha-value>)',
          800: 'hsl(var(--red-800), <alpha-value>)',
          900: 'hsl(var(--red-900), <alpha-value>)',
          950: 'hsl(var(--red-950), <alpha-value>)',
        },
        green: {
          50: 'hsl(var(--green-50), <alpha-value>)',
          100: 'hsl(var(--green-100), <alpha-value>)',
          200: 'hsl(var(--green-200), <alpha-value>)',
          300: 'hsl(var(--green-300), <alpha-value>)',
          400: 'hsl(var(--green-400), <alpha-value>)',
          500: 'hsl(var(--green-500), <alpha-value>)',
          600: 'hsl(var(--green-600), <alpha-value>)',
          700: 'hsl(var(--green-700), <alpha-value>)',
          800: 'hsl(var(--green-800), <alpha-value>)',
          900: 'hsl(var(--green-900), <alpha-value>)',
          950: 'hsl(var(--green-950), <alpha-value>)',
        },
        purple: {
          50: 'hsl(var(--purple-50), <alpha-value>)',
          100: 'hsl(var(--purple-100), <alpha-value>)',
          200: 'hsl(var(--purple-200), <alpha-value>)',
          300: 'hsl(var(--purple-300), <alpha-value>)',
          400: 'hsl(var(--purple-400), <alpha-value>)',
          500: 'hsl(var(--purple-500), <alpha-value>)',
          600: 'hsl(var(--purple-600), <alpha-value>)',
          700: 'hsl(var(--purple-700), <alpha-value>)',
          800: 'hsl(var(--purple-800), <alpha-value>)',
          900: 'hsl(var(--purple-900), <alpha-value>)',
          950: 'hsl(var(--purple-950), <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md_p1: 'calc(var(--radius-md) + 3px)', // for the container of the md radius when padding is 1
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};