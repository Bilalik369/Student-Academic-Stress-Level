/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette - Calming teal/cyan tones
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Secondary palette - Soft purple/violet
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Accent - Warm coral for highlights
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Dark mode backgrounds
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Glass effect colors
        glass: {
          light: 'rgba(255, 255, 255, 0.25)',
          dark: 'rgba(15, 23, 42, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Gradient backgrounds
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-calm': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
        'gradient-mesh': `
          radial-gradient(at 40% 20%, hsla(180, 100%, 74%, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(269, 100%, 77%, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(240, 100%, 70%, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 0.2) 0px, transparent 50%)
        `,
        'gradient-dark-mesh': `
          radial-gradient(at 40% 20%, hsla(180, 100%, 34%, 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsla(189, 100%, 26%, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsla(355, 100%, 43%, 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsla(340, 100%, 36%, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(269, 100%, 37%, 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 100%, hsla(240, 100%, 30%, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 0%, hsla(343, 100%, 36%, 0.1) 0px, transparent 50%)
        `,
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(20, 184, 166, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

