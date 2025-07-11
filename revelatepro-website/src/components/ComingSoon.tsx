import type React from 'react'
import { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useRecaptcha } from '../hooks/useRecaptcha'

const comingSoonAgents = [
  {
    id: 'materials',
    title: 'AI Materials Agent',
    description: 'Optimize material sourcing, inventory management, and delivery scheduling with intelligent procurement algorithms.',
    color: 'pastel-blue',
    bgColor: 'bg-black-olive/50',
    borderColor: 'border-pastel-blue/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 'dailylog',
    title: 'AI DailyLog Agent',
    description: 'Automatically capture and organize daily project activities, progress reports, and site conditions.',
    color: 'pastel-blue',
    bgColor: 'bg-black-olive/50',
    borderColor: 'border-pastel-blue/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0V6a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2v1" />
      </svg>
    )
  },
  {
    id: 'notes',
    title: 'AI Notes Agent',
    description: 'Transform voice recordings and meeting notes into structured project documentation with AI-powered transcription.',
    color: 'pastel-blue',
    bgColor: 'bg-black-olive/50',
    borderColor: 'border-pastel-blue/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    id: 'task',
    title: 'AI Task Agent',
    description: 'Intelligent task management and workflow automation to keep projects on schedule and teams coordinated.',
    color: 'pastel-blue',
    bgColor: 'bg-black-olive/50',
    borderColor: 'border-pastel-blue/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    id: 'equipment',
    title: 'AI Equipment Agent',
    description: 'Keep inventory, track equipment use, monitor costs, and optimize equipment allocation across projects.',
    color: 'pastel-blue',
    bgColor: 'bg-black-olive/50',
    borderColor: 'border-pastel-blue/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: 'safety',
    title: 'AI Safety Agent',
    description: 'Monitor safety compliance, track incidents, and ensure jobsite safety protocols are followed.',
    color: 'pastel-blue',
    bgColor: 'bg-black-olive/50',
    borderColor: 'border-pastel-blue/30',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
]

interface FormData {
  email: string
  interests: string[]
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

export const ComingSoon = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    interests: []
  })

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  // reCAPTCHA integration
  const { executeRecaptcha, isRecaptchaReady, recaptchaError } = useRecaptcha()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInterestToggle = (agentId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(agentId)
        ? prev.interests.filter(id => id !== agentId)
        : [...prev.interests, agentId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous states
    setFormState({ isSubmitting: true, isSuccess: false, error: null })

    // Validate email
    if (!formData.email.trim()) {
      setFormState({ isSubmitting: false, isSuccess: false, error: 'Email address is required' })
      return
    }

    if (!validateEmail(formData.email)) {
      setFormState({ isSubmitting: false, isSuccess: false, error: 'Please enter a valid email address' })
      return
    }

    try {
      // Execute reCAPTCHA verification
      console.log('🔒 Starting reCAPTCHA verification for coming soon form...')
      let recaptchaToken: string

      try {
        recaptchaToken = await executeRecaptcha('coming_soon_signup')
      } catch (recaptchaError) {
        console.error('❌ reCAPTCHA verification failed:', recaptchaError)
        setFormState({ isSubmitting: false, isSuccess: false, error: 'Security verification failed. Please refresh the page and try again.' })
        return
      }

      console.log('✅ reCAPTCHA verification successful for coming soon form')

      // Prepare form data for webhook submission
      const webhookData = {
        formType: 'Coming Soon - Notify Me',
        submissionTime: new Date().toISOString(),
        recaptchaResponse: recaptchaToken,
        email: formData.email,
        interests: formData.interests,
        interestsText: formData.interests.join(', ') || 'All agents',
        selectedAgentsCount: formData.interests.length,
        selectedAgents: formData.interests.map(id => {
          const agent = comingSoonAgents.find(a => a.id === id)
          return agent ? agent.title : id
        }),
        userAgent: navigator.userAgent,
        url: window.location.href
      }

      console.log('📤 Sending coming soon form data to webhook:', webhookData)

      // Send to webhook
      const webhookURL = 'https://hook.us1.make.com/a5prsq4gkos8rx3gdj30ie0bc4nboy4m'

      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      })

      console.log('📥 Webhook response status:', response.status, response.statusText)

      if (response.ok) {
        const responseData = await response.text()
        console.log('✅ Webhook response data:', responseData)

        setFormState({ isSubmitting: false, isSuccess: true, error: null })
        setFormData({ email: '', interests: [] })

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setFormState(prev => ({ ...prev, isSuccess: false }))
        }, 5000)
      } else {
        const errorData = await response.text()
        console.error('❌ Webhook error response:', errorData)
        throw new Error(`Webhook submission failed: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Coming soon form submission error:', error)
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Something went wrong. Please try again or contact us directly.'
      })
    }
  }

  return (
    <section className="py-24 relative overflow-hidden bg-air-black">
      {/* Enhanced background with Air Black gradient blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/30 to-transparent" />

      {/* Smooth transition edges */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-air-black via-air-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-air-black via-air-black/80 to-transparent" />

      {/* Large background text for section identity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[6rem] md:text-[9rem] lg:text-[12rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(-3deg)'
          }}
        >
          FUTURE
        </div>
      </div>

      {/* Background elements with Alpha Studio colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pastel-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-black-olive/20 rounded-full blur-3xl" />
      </div>



      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <AnimatedSection animation="slideUp" duration={0.8}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Coming Soon</span>
            </h2>
            <p className="text-xl text-gray-x11 max-w-3xl mx-auto">
              The next generation of AI agents are in development, designed to revolutionize
              every aspect of construction project management. Can't wait for these features?
              <span className="text-pastel-blue font-semibold"> We can build custom versions </span>
              for your business needs today.
            </p>
          </div>
        </AnimatedSection>

        {/* Coming soon agents grid */}
        <StaggeredAnimation
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={150}
          childAnimation="slideUp"
        >
          {comingSoonAgents.map((agent) => (
            <div
              key={agent.id}
              className={`group relative p-8 rounded-2xl border-2 ${agent.borderColor} ${agent.bgColor}
                         backdrop-blur-sm overflow-hidden flex flex-col h-80 cursor-pointer
                         transition-all duration-500 ease-out transform hover:scale-105
                         ${formData.interests.includes(agent.id) ? 'ring-2 ring-pastel-blue bg-pastel-blue/10' : ''}`}
              onClick={() => handleInterestToggle(agent.id)}
            >
              {/* Selection indicator */}
              {formData.interests.includes(agent.id) && (
                <div className="absolute top-4 left-4 w-6 h-6 bg-pastel-blue rounded-full flex items-center justify-center z-20">
                  <CheckCircle className="w-4 h-4 text-air-black" />
                </div>
              )}

              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
              </div>

              {/* Coming soon badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-pastel-blue/20 border border-pastel-blue/40 rounded-full text-xs font-semibold text-pastel-blue backdrop-blur-sm">
                Coming Soon
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6
                               group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out
                               group-hover:shadow-lg bg-pastel-blue/20 text-pastel-blue group-hover:bg-pastel-blue/40">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {agent.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-x11 group-hover:text-pastel-blue transition-all duration-500 transform group-hover:translate-x-2">
                  {agent.title}
                </h3>

                {/* Description */}
                <p className="text-dark-liver leading-relaxed group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-1 flex-grow">
                  {agent.description}
                </p>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30
                             transition-all duration-700 pointer-events-none"
                   style={{
                     boxShadow: '0 0 60px rgba(148,199,204,0.4), 0 0 100px rgba(148,199,204,0.2)'
                   }}>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-pastel-blue animate-ping" />
                <div className="absolute bottom-6 right-6 w-1 h-1 rounded-full bg-pastel-blue/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 left-8 w-1.5 h-1.5 rounded-full bg-pastel-blue/50 animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          ))}
        </StaggeredAnimation>

        {/* Enhanced notification signup */}
        <AnimatedSection animation="fadeIn" delay={500} duration={0.8}>
          <div className="text-center mt-16 max-w-2xl mx-auto">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-black-olive/40 to-black-olive/60 border border-dark-liver/30">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-x11">
                Be the First to Know
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Get notified when these new AI agents become available.
                {formData.interests.length > 0 && (
                  <span className="block mt-2 text-pastel-blue font-medium">
                    You've selected {formData.interests.length} agent{formData.interests.length !== 1 ? 's' : ''} to follow
                  </span>
                )}
              </p>

              {/* Success Message */}
              {formState.isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-medium">
                    Thank you! We'll notify you when these agents are ready.
                  </span>
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    disabled={formState.isSubmitting}
                    className="flex-1 px-4 py-3 rounded-xl bg-air-black border border-dark-liver/50 text-gray-x11 placeholder-gray-400 focus:outline-none focus:border-pastel-blue transition-colors disabled:opacity-50"
                    required
                  />
                  <button
                    type="submit"
                    disabled={formState.isSubmitting || formState.isSuccess || !isRecaptchaReady}
                    className="px-6 py-3 bg-pastel-blue text-air-black font-bold rounded-xl transition-all duration-200 hover:bg-pastel-blue/80 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {formState.isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : formState.isSuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Subscribed!</span>
                      </>
                    ) : !isRecaptchaReady ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Notify Me</span>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400 mt-3">
                    Click on agent cards above to select specific agents you're interested in, or leave unselected to get notified about all new releases.
                  </p>
                  {!isRecaptchaReady && (
                    <p className="text-xs text-gray-500 mt-2">
                      Loading security verification...
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
