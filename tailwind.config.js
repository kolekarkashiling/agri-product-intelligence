/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#eefbfa',
          100: '#d3f5f1',
          200: '#a8ebe3',
          300: '#72dbd0',
          400: '#3dc2b7',
          500: '#1ba69b',
          600: '#12867e',
          700: '#106b66',
          800: '#115653',
          900: '#114744',
          950: '#052928',
        },
        earth: {
          50: '#fdf5f0',
          100: '#fbe6d9',
          200: '#f6c9ab',
          300: '#efa374',
          400: '#e67a45',
          500: '#d85f2a',
          600: '#bb4720',
          700: '#97381c',
          800: '#7a301c',
          900: '#66291b',
        }
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '2xs': '0 1px 1px 0 rgba(0, 0, 0, 0.03)',
        'glow': '0 0 25px -5px rgba(27, 166, 155, 0.35)',
        'glow-lg': '0 0 45px -10px rgba(27, 166, 155, 0.45)',
        'glow-emerald': '0 0 30px -8px rgba(16, 185, 129, 0.5)',
        'card-hover': '0 14px 30px -10px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'card-glow': '0 0 0 1px rgba(27,166,155,0.25), 0 8px 32px -8px rgba(27,166,155,0.3)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'scale-in-fast': 'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradientX 4s ease infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'particle-rise': 'particleRise 6s ease-in infinite',
        'orbit': 'orbit 12s linear infinite',
        'orbit-reverse': 'orbit 18s linear infinite reverse',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'scanline': 'scanline 3s linear infinite',
        'counter-up': 'counterUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'wiggle': 'wiggle 0.6s ease-in-out',
        'reveal': 'reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'grow-width': 'growWidth 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(27,166,155,0.2), 0 0 30px rgba(27,166,155,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(27,166,155,0.5), 0 0 60px rgba(27,166,155,0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
        particleRise: {
          '0%': { transform: 'translateY(100%) scale(0)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-200%) scale(1)', opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '75%': { borderRadius: '60% 40% 30% 60% / 30% 40% 70% 50%' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        counterUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        growWidth: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(162,80%,20%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,70%,15%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(174,80%,15%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(155,60%,10%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(162,70%,12%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(200,60%,15%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(150,70%,10%,1) 0px, transparent 50%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
      }
    },
  },
  plugins: [],
}
