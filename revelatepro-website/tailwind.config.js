/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    // Demo metrics colors
    'bg-pastel-blue/5',
    'bg-pastel-blue/10',
    'border-pastel-blue/20',
    'border-pastel-blue/30',
    'text-pastel-blue',
    'animate-fadeInUp',
    'animate-slideInLeft',
    'animate-bounceIn',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',    // Mobile-first: smaller padding
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        'xs': '375px',      // iPhone SE and small phones
        'xstall': '390px',  // iPhone 12/13/14 series
        'smtall': '430px',  // iPhone Pro Max series
        // Default breakpoints continue: sm (640px), md (768px), etc.
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        // Mobile-first typography scaling
        'xs': ['0.75rem', { lineHeight: '1.2rem' }],     // 12px, more compact mobile line height
        'sm': ['0.875rem', { lineHeight: '1.375rem' }], // 14px, optimized for mobile reading
        'base': ['1rem', { lineHeight: '1.625rem' }],   // 16px, increased line height for mobile
        'lg': ['1.125rem', { lineHeight: '1.875rem' }], // 18px, better mobile readability
        'xl': ['1.25rem', { lineHeight: '2rem' }],      // 20px, mobile-friendly headers
        '2xl': ['1.5rem', { lineHeight: '2.25rem' }],   // 24px, mobile section headers
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],  // 30px, mobile-optimized large text
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],  // 36px, mobile hero text
        '5xl': ['2.5rem', { lineHeight: '3rem' }],      // 40px, mobile hero titles (smaller)
        '6xl': ['3rem', { lineHeight: '3.5rem' }],      // 48px, large mobile headers
        '7xl': ['3.5rem', { lineHeight: '4rem' }],      // 56px, tablet+ hero text
        '8xl': ['4.5rem', { lineHeight: '5rem' }],      // 72px, desktop hero text
        '9xl': ['6rem', { lineHeight: '6.5rem' }],      // 96px, desktop large displays
      },
      spacing: {
        // Enhanced mobile-friendly spacing
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
        '54': '13.5rem',  // 216px
        '58': '14.5rem',  // 232px
        '62': '15.5rem',  // 248px
        '66': '16.5rem',  // 264px
        '70': '17.5rem',  // 280px
        '74': '18.5rem',  // 296px
        '78': '19.5rem',  // 312px
        '82': '20.5rem',  // 328px
        '86': '21.5rem',  // 344px
        '90': '22.5rem',  // 360px
        '94': '23.5rem',  // 376px
        '98': '24.5rem',  // 392px
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom RevalatePro colors - Alpha Studio refined palette
        'pastel-blue': '#94C7CC',     // PANTONE 5445 C
        'black-olive': '#343A3A',     // PANTONE 447 C
        'air-black': '#111111',       // PANTONE BLACK 6 C
        'dark-liver': '#4D4D4D',      // PANTONE 7540 C
        'gray-x11': '#B7BABB',        // PANTONE COOL GRAY 4 C
        'gradient-green': '#22C55E',  // Green for AI agent theming
        'gradient-dark': '#16A34A',   // Dark green variant

        // Semantic colors for dark theme
        'brand-primary': '#94C7CC',   // Pastel Blue for buttons and accents
        'brand-secondary': '#343A3A', // Black Olive for secondary elements
        'text-primary': '#B7BABB',    // Light gray for primary text
        'text-secondary': '#4D4D4D',  // Dark liver for secondary text
        'text-muted': '#343A3A',      // Black olive for muted text
        'surface-primary': '#111111', // Air Black background
        'surface-secondary': '#343A3A', // Black Olive for cards
        'surface-dark': '#111111',    // Air Black for dark surfaces
        'border-light': '#4D4D4D',    // Dark liver for borders
        'border-dark': '#343A3A',     // Black olive for dark borders
      },
      // Mobile-optimized touch targets
      minHeight: {
        'touch': '44px',    // iOS minimum touch target
        'touch-lg': '48px', // Android recommended
      },
      minWidth: {
        'touch': '44px',    // iOS minimum touch target
        'touch-lg': '48px', // Android recommended
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Mobile-optimized animations (reduced motion for battery life)
        "mobile-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "mobile-slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fadeInUp": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slideInLeft": {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "bounceIn": {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
          "70%": {
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "mobile-fade-in": "mobile-fade-in 0.3s ease-out",
        "mobile-slide-up": "mobile-slide-up 0.4s ease-out",
        "fadeInUp": "fadeInUp 0.6s ease-out",
        "slideInLeft": "slideInLeft 0.5s ease-out",
        "bounceIn": "bounceIn 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
