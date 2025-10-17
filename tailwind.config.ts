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
        primary: '#0A0A0A',
        secondary: '#F5F5F5',
        accent: '#6366F1',
        accentHover: '#4F46E5',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        textPrimary: '#0A0A0A',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        backgroundGray: '#F9FAFB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config