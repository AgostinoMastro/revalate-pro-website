/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      fontFamily: {
        'sans': ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        '90rem': '90rem',
      },
      colors: {
        // Panel Design System
        background: '#0B0D11',
        'card-bg': '#151921',
        'footer-bg': '#080a0e',
        
        // Primary accent
        primary: {
          DEFAULT: '#A6D1F1',
          hover: '#FFFFFF',
          subtle: 'rgba(166, 209, 241, 0.1)',
          'subtle-text': 'rgba(166, 209, 241, 0.2)',
        },
        
        // Text colors
        'text-white': '#FFFFFF',
        'text-foreground': '#e9eef5',
        'text-muted': '#94a3b8',
        'text-muted-dark': '#64748b',
        
        // Borders
        border: '#1e293b',
        'border-subtle': 'rgba(30, 41, 59, 0.5)',
        
        // Slate palette for additional use
        slate: {
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      lineHeight: {
        'tight': '1.05',
        'relaxed': '1.625',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
