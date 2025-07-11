# AI Expense Agent Landing Page Deployment

## Quick Deployment Guide

### 1. Automatic Deployment (Recommended)
The AI expense agent landing page is automatically deployed via GitHub Actions when you push changes to the `ai-expense-agent/` folder.

**Live URL**: https://agostinomastro.github.io/revalate-pro-website/ai-expense-agent/

### 2. Manual Development Setup

```bash
# Navigate to the AI expense agent landing page directory
cd ai-expense-agent

# Install dependencies
bun install

# Start development server
bun dev

# Access at: http://localhost:5173
```

### 3. Build for Production

```bash
# Build the landing page
bun run build

# Preview the production build
bun run preview
```

### 4. Deployment Process

1. **Make Changes**: Edit files in the `ai-expense-agent/` folder
2. **Commit**: `git add . && git commit -m "Update AI expense agent landing page"`
3. **Push**: `git push origin main`
4. **Auto-Deploy**: GitHub Actions will automatically build and deploy

### 5. Accessing the Landing Page

- **Main Site**: https://agostinomastro.github.io/revalate-pro-website/
- **AI Expense Agent**: https://agostinomastro.github.io/revalate-pro-website/ai-expense-agent/

### 6. Analytics & Tracking

The beta landing page includes:
- Google Tag Manager (GTM-MH74C6T)
- Microsoft Clarity (rcu704i2vc)
- Google reCAPTCHA Enterprise protection

### 7. Form Submissions

Registration forms submit to:
- **Webhook**: https://hook.us1.make.com/dnedawg5lqriv7v8pxx7vfc7pzl3yi3a
- **Metadata**: Includes `betaSignup: true` and `signupSource: "Beta Landing Page"`

### 8. Security Features

- reCAPTCHA Enterprise verification on all form submissions
- HTTPS-only deployment
- Form validation and sanitization
- Spam protection

### 9. Troubleshooting

If the deployment fails:
1. Check GitHub Actions logs in the repository
2. Ensure all dependencies are correctly specified in `package.json`
3. Verify the Vite configuration is correct
4. Check that all imports are valid

### 10. Updating Content

To update the countdown timer:
- Edit the `launchDate` variable in `BetaExpenseAgentLanding.tsx`

To update the promotion:
- Modify the "First 100 get 3 months free" text in the component

To update the phone mockup:
- Edit the demo features in the phone screen section
