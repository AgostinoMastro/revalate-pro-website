# AI Expense Agent Landing Page

This is a standalone landing page for the AI Expense Agent pre-launch campaign. It's designed to be deployed independently from the main Revalate Pro website.

## Features

- **Countdown Timer**: Shows time remaining until launch (1 month from current date)
- **Registration Form**: Collects user information for beta access
- **reCAPTCHA Integration**: Protects against spam registrations
- **Mobile Responsive**: Optimized for all device sizes
- **Consistent Design**: Uses the same design system as the main Revalate Pro site

## Content

- **Headline**: "Beta AI Expense Agent App – Pre-Launch"
- **Subheadline**: "Be among the first to experience automated expense tracking. Available in 1 month."
- **Call-to-Action**: "Register Now — First 100 get 3 months free"
- **Interactive Demo**: Phone mockup showing AI expense agent in action

## Technical Details

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS (inherits from main project)
- **Security**: Google reCAPTCHA Enterprise integration
- **Analytics**: Google Tag Manager and Microsoft Clarity tracking
- **Deployment**: GitHub Pages via GitHub Actions

## Development

### Local Development
```bash
cd beta-expense-agent
bun install
bun dev
```

### Build for Production
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

## Deployment

The landing page is automatically deployed to GitHub Pages when changes are pushed to the `ai-expense-agent/` folder on the main branch.

**Live URL**: https://agostinomastro.github.io/revalate-pro-website/ai-expense-agent/

## Form Submissions

Form submissions are sent to the same webhook as the main site with additional metadata:
- `formType: "Beta AI Expense Agent Signup"`
- `betaSignup: true`
- `signupSource: "Beta Landing Page"`

## Security

- Google reCAPTCHA Enterprise protection
- Form validation and sanitization
- HTTPS-only deployment

## Analytics

The page includes the same tracking as the main site:
- Google Tag Manager (GTM-MH74C6T)
- Microsoft Clarity (rcu704i2vc)

## Design System

The landing page reuses components and styles from the main Revalate Pro website:
- Same color palette (pastel blue, air black, etc.)
- Same typography (Inter font)
- Same component patterns
- Same responsive breakpoints

## Routing & Base URL: 
In the vite.config.ts for ai-expense-agent, check if the base property is set correctly: export default defineConfig({ base: '/ai-expense-agent/', // other config... })
