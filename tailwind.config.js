/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Muted, sophisticated Morandian color palette
        primary: {
          light: '#8E9AAF',
          DEFAULT: '#6B7A8F',
          dark: '#4A5568',
        },
        secondary: {
          light: '#CBC0D3',
          DEFAULT: '#9B8AA6',
          dark: '#6B5B7B',
        },
        accent: {
          light: '#EAD7D7',
          DEFAULT: '#D4B2B2',
          dark: '#A67F7F',
        },
        background: {
          light: '#F7F4F4',
          DEFAULT: '#EDE8E8',
          dark: '#2D3748',
        },
      },
    },
  },
  plugins: [],
};