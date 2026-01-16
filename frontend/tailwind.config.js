import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f2',
          100: '#ffe8e0',
          200: '#ffd0c2',
          300: '#ffab94',
          400: '#ff7a5a',
          500: '#FF4500',
          600: '#FB5227',
          700: '#d93a00',
          800: '#b33000',
          900: '#8c2600',
        },
        'admin-primary': {
          50: '#f3faf6',
          100: '#e6f6ee',
          200: '#c3ecd7',
          300: '#8fddb7',
          400: '#5dcb97',
          500: '#3bb273',
          600: '#2e8c59',
          700: '#256b45',
          800: '#1b4b31',
          900: '#13341f',
        },
        'admin-navy': {
          800: '#111827',
          900: '#0B1120',
        },
        navy: {
          50: '#e8f0fa',
          100: '#c5d9f2',
          200: '#9ebfe8',
          300: '#6da0dc',
          400: '#4a85cf',
          500: '#2d6bc2',
          600: '#1a4f9c',
          700: '#0f3a76',
          800: '#062750',
          900: '#031a38',
        },
        accent: '#FB5227',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-x': 'gradientX 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 69, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 69, 0, 0.6)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(6, 39, 80, 0.95) 0%, rgba(6, 39, 80, 0.7) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(6, 39, 80, 0.1)',
        'card': '0 4px 6px -1px rgba(6, 39, 80, 0.1), 0 2px 4px -1px rgba(6, 39, 80, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(255, 69, 0, 0.1), 0 10px 10px -5px rgba(255, 69, 0, 0.04)',
        'glow': '0 0 30px rgba(255, 69, 0, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    forms,
  ],
}
