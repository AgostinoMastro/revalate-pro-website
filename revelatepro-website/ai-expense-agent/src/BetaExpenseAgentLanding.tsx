import React, { useState, useEffect } from 'react'
import { useCountdown } from './hooks/useCountdown'
import { useRecaptcha } from './hooks/useRecaptcha'
import { CheckCircle, AlertCircle, Loader, Clock, Users, Star, ArrowRight } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

const BetaExpenseAgentLanding: React.FC = () => {
  // Set launch date to 1 month from now
  const launchDate = new Date()
  launchDate.setMonth(launchDate.getMonth() + 1)

  const { days, hours, minutes, seconds } = useCountdown(launchDate)
  const { executeRecaptcha, isRecaptchaReady, recaptchaError } = useRecaptcha()

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: ''
  })

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  const [demoProgress, setDemoProgress] = useState(0)

  // Demo animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoProgress(prev => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ isSubmitting: true, isSuccess: false, error: null })

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setFormState({ isSubmitting: false, isSuccess: false, error: 'Please fill in all required fields' })
      return
    }

    if (!validateEmail(formData.email)) {
      setFormState({ isSubmitting: false, isSuccess: false, error: 'Please enter a valid email address' })
      return
    }

    try {
      // Execute reCAPTCHA verification
      console.log('🔒 Starting reCAPTCHA verification for AI expense agent signup...')
      let recaptchaToken: string

      try {
        recaptchaToken = await executeRecaptcha('ai_expense_agent_signup')
      } catch (recaptchaError) {
        console.error('❌ reCAPTCHA verification failed:', recaptchaError)
        setFormState({ isSubmitting: false, isSuccess: false, error: 'Security verification failed. Please refresh the page and try again.' })
        return
      }

      console.log('✅ reCAPTCHA verification successful for AI expense agent signup')

      // Prepare form data for webhook submission
      const webhookData = {
        formType: 'AI Expense Agent Signup',
        submissionTime: new Date().toISOString(),
        recaptchaResponse: recaptchaToken,
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company
        },
        aiExpenseAgentSignup: true,
        signupSource: 'AI Expense Agent Landing Page',
        url: window.location.href,
        userAgent: navigator.userAgent
      }

      console.log('📤 Sending AI expense agent signup data to webhook:', webhookData)

      // Send to webhook (using the same webhook as the main site)
      const webhookURL = 'https://hook.us1.make.com/dnedawg5lqriv7v8pxx7vfc7pzl3yi3a'

      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      })

      if (response.ok) {
        setFormState({ isSubmitting: false, isSuccess: true, error: null })
        setFormData({ firstName: '', lastName: '', email: '', company: '', phone: '' })
        console.log('✅ AI expense agent signup submitted successfully')
      } else {
        throw new Error(`Webhook submission failed: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ AI expense agent signup submission error:', error)
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Something went wrong. Please try again.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-surface-primary text-text-primary">
      {/* Header with Logo */}
      <header className="py-6 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <img
              src="../images/revalate-logo.png"
              alt="Revalate AI Studio Logo"
              className="h-8 sm:h-10"
            />
            <a
              href="../"
              className="text-pastel-blue hover:text-pastel-blue/80 transition-colors duration-200 text-sm font-medium"
            >
              ← Back to Main Site
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 hero-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            {/* Join Waitlist Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pastel-blue/20 border border-pastel-blue/30 mb-6">
              <Star className="w-4 h-4 text-pastel-blue mr-2" />
              <span className="text-pastel-blue font-medium text-sm">JOIN OUR WAITLIST</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-x11">AI Expense Agent App</span>
              <br />
              <span className="text-pastel-blue">– Pre-Launch</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-gray-x11 opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Be among the first to experience automated expense tracking.
              <br className="hidden sm:block" />
              Available in 1 month.
            </p>

            {/* Countdown Timer */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-pastel-blue mb-6 flex items-center justify-center">
                <Clock className="w-5 h-5 mr-2" />
                Time Until Launch
              </h3>
              <div className="countdown-grid">
                <div className="countdown-item">
                  <span className="countdown-number">{days.toString().padStart(2, '0')}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{hours.toString().padStart(2, '0')}</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{minutes.toString().padStart(2, '0')}</span>
                  <span className="countdown-label">Minutes</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-number">{seconds.toString().padStart(2, '0')}</span>
                  <span className="countdown-label">Seconds</span>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-pastel-blue/10 border border-pastel-blue/20 rounded-2xl p-6 sm:p-8 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pastel-blue mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-x11">
                  First 100 to sign up get
                </span>
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pastel-blue mb-2">
                3 months FREE!
              </div>
              <p className="text-gray-x11 opacity-80">
                (up to $900 in usage on us)
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Phone Mockup */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* "This AI does your Expense Tracking for you" callout */}
                <div className="absolute -top-4 -left-8 bg-air-black border border-pastel-blue/30 rounded-xl p-4 max-w-xs hidden lg:block">
                  <p className="text-gray-x11 text-sm">
                    This AI does your <br />
                    <span className="bg-pastel-blue/20 px-2 py-1 rounded text-pastel-blue font-semibold">
                      Expense Tracking
                    </span>
                    <br />
                    for you
                  </p>
                  <div className="absolute top-1/2 -right-6 w-0 h-0 border-l-6 border-l-pastel-blue/30 border-t-6 border-t-transparent border-b-6 border-b-transparent"></div>
                </div>

                {/* Phone Mockup */}
                <div className="phone-mockup">
                  <div className="phone-screen">
                    {/* Phone Status Bar */}
                    <div className="flex justify-between items-center text-white text-xs mb-4 px-2">
                      <span>8:01</span>
                      <div className="flex items-center space-x-1">
                        <span>📶</span>
                        <span>📱</span>
                        <span>🔋</span>
                        <span>89</span>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="text-white">
                      <h2 className="text-xl font-bold mb-4 text-center">
                        See AI Expense Agent in Action
                      </h2>

                      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                        Experience the power of AI-driven expense agent with our interactive demo.
                        Watch as complex tasks are completed in seconds with real-time notifications and insights.
                      </p>

                      {/* Demo Section */}
                      <div className="demo-progress">
                        <h3 className="text-pastel-blue font-semibold mb-3">
                          AI Expense Processing Live Demo
                        </h3>

                        <div className="flex space-x-2 mb-4">
                          <button className="bg-pastel-blue text-black px-4 py-2 rounded-lg text-sm font-medium">
                            Start Demo
                          </button>
                          <button className="border border-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                            Reset
                          </button>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Demo Progress</span>
                            <span>{demoProgress}% complete</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${demoProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Feature List */}
                        <div className="space-y-2">
                          <div className="feature-item">
                            <div className="feature-number">1</div>
                            <div>
                              <div className="text-white text-sm font-medium">Monitor Vendor Expenses</div>
                              <div className="text-gray-400 text-xs">0.3s</div>
                            </div>
                          </div>

                          <div className="feature-item">
                            <div className="feature-number">2</div>
                            <div>
                              <div className="text-white text-sm font-medium">OCR Data Extraction</div>
                              <div className="text-gray-400 text-xs">0.9s</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-air-black/60 backdrop-blur-sm border border-pastel-blue/20 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-x11 mb-2 text-center">
                  Register Now
                </h2>
                <p className="text-pastel-blue text-center mb-6 font-semibold">
                  First 100 get 3 months free
                </p>

                {/* Success Message */}
                {formState.isSuccess && (
                  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-green-300 font-medium">Registration Successful!</div>
                      <div className="text-green-300/80 text-sm">You're on the waitlist. We'll notify you when the beta is ready!</div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {(formState.error || recaptchaError) && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-red-300 font-medium text-left">
                      {formState.error || recaptchaError}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name *"
                      required
                      disabled={formState.isSubmitting}
                      className="w-full px-4 py-3 bg-black-olive border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 disabled:opacity-50"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name *"
                      required
                      disabled={formState.isSubmitting}
                      className="w-full px-4 py-3 bg-black-olive border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 disabled:opacity-50"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address *"
                    required
                    disabled={formState.isSubmitting}
                    className="w-full px-4 py-3 bg-black-olive border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 disabled:opacity-50"
                  />

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    disabled={formState.isSubmitting}
                    className="w-full px-4 py-3 bg-black-olive border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 disabled:opacity-50"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    disabled={formState.isSubmitting}
                    className="w-full px-4 py-3 bg-black-olive border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={formState.isSubmitting || !isRecaptchaReady || formState.isSuccess}
                    className="w-full px-6 py-4 bg-pastel-blue text-black font-bold text-lg rounded-xl hover:bg-pastel-blue/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    {formState.isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : formState.isSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Registered!</span>
                      </>
                    ) : !isRecaptchaReady ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Join the Waitlist</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {!isRecaptchaReady && (
                    <p className="text-gray-400 text-xs text-center">
                      Loading security verification...
                    </p>
                  )}

                  <p className="text-gray-400 text-xs text-center leading-relaxed">
                    By registering, you agree to receive updates about the Beta AI Expense Agent.
                    You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Revalate AI Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default BetaExpenseAgentLanding
