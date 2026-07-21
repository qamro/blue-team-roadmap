/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#050D1A', 50: '#0A1628', 100: '#0D1F38', 200: '#112847' },
        blue:    { DEFAULT: '#1E3A8A', 400: '#3B82F6', 500: '#2563EB', 600: '#1D4ED8' },
        cyan:    { DEFAULT: '#06B6D4', 400: '#22D3EE', 500: '#0EA5E9', glow: '#00D4FF' },
        electric:{ DEFAULT: '#0066FF', bright: '#00A3FF' },
        neon:    { DEFAULT: '#00F5FF', dim: '#00B4D8'  },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'scan':         'scan 3s linear infinite',
        'grid-flow':    'gridFlow 8s linear infinite',
        'particle':     'particle 4s ease-in-out infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glow:     { from: { boxShadow: '0 0 10px #00F5FF33' }, to: { boxShadow: '0 0 30px #00F5FF88, 0 0 60px #00F5FF33' } },
        scan:     { '0%': { top: '0%' }, '100%': { top: '100%' } },
        gridFlow: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(80px)' } },
        particle: { '0%,100%': { opacity: 0, transform: 'translateY(0) scale(0)' }, '50%': { opacity: 1, transform: 'translateY(-40px) scale(1)' } },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid':       'linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}
