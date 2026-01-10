import type React from 'react'
import { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { useParallax } from '../hooks/useParallax'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

import { Testimonials } from './Testimonials'

interface AboutPageProps {
  onDemoClick: () => void
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: ''
}

const leadership = [
  {
    name: 'Nick Bartella',
    role: 'Co-Founder / AI Strategy & Development',
    image: 'https://ext.same-assets.com/4263160406/302710302.jpeg',
    description: 'Leading AI innovation in construction with 15+ years of industry experience.'
  },
  {
    name: 'Agostino Mastroianni',
    role: 'Co-Founder / Lead AI Product Developer',
    image: 'https://ext.same-assets.com/4263160406/3706293306.jpeg',
    description: 'Pioneering machine learning software for construction workflows.'
  }
]

const values = [
  {
    title: 'AI-First Innovation',
    description: 'We leverage cutting-edge AI technology to solve construction\'s most complex challenges.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Construction-Focused',
    description: 'Built by construction professionals for construction professionals.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Intelligent Automation',
    description: 'Our AI agents learn and adapt to your specific workflows and processes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Data-Driven Results',
    description: 'Make informed decisions with real-time analytics and predictive insights.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Reliable Partnership',
    description: 'We collaborate closely with our clients to ensure long-term success.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Continuous Growth',
    description: 'Our AI constantly evolves, helping your business stay ahead of the competition.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: 'pastel-blue'
  }
]

export const AboutPage: React.FC<AboutPageProps> = ({ onDemoClick }) => {
  const parallax1 = useParallax({ speed: 0.2, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.3, direction: 'down' })

  // Contact form state management
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous states
    setFormState({ isSubmitting: true, isSuccess: false, error: null })

    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Please fill in all required fields (First Name, Last Name, Email)'
      })
      return
    }

    if (!validateEmail(formData.email)) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: 'Please enter a valid email address'
      })
      return
    }

    try {
      // Prepare form data for webhook submission
      const webhookData = {
        formType: 'About Page - Send Message',
        submissionTime: new Date().toISOString(),
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        companyInfo: {
          companyName: formData.company
        },
        message: formData.message,
        allFields: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message
        },
        userAgent: navigator.userAgent,
        url: window.location.href
      }

      console.log('📤 Sending contact form data to webhook:', webhookData)

      // Send to webhook
      const webhookURL = 'https://hook.us1.make.com/dnedawg5lqriv7v8pxx7vfc7pzl3yi3a'

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
        setFormData(initialFormData)

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
      console.error('❌ Contact form submission error:', error)
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Something went wrong. Please try again or contact us directly.'
      })
    }
  }

  return (
    <div className="min-h-screen text-text-primary bg-surface-primary">
      <section className="py-24 relative overflow-hidden bg-air-black">
        {/* Enhanced background gradient with Air Black theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/30 to-transparent" />

        {/* Smooth transition edges */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-air-black via-air-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-air-black via-air-black/80 to-transparent" />

        {/* Large background text for section identity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="text-[6rem] md:text-[9rem] lg:text-[12rem] font-black leading-none select-none tracking-tighter opacity-5"
            style={{
              WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
              color: 'rgba(148, 199, 204, 0.03)',
              transform: 'translateZ(0) rotate(-2deg)'
            }}
          >
            ABOUT
          </div>
        </div>

        {/* Background elements with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={parallax1.elementRef}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pastel-blue/5 rounded-full blur-3xl"
            style={{ transform: parallax1.transform }}
          />
          <div
            ref={parallax2.elementRef}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-black-olive/20 rounded-full blur-3xl"
            style={{ transform: parallax2.transform }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">


          {/* Hero Section */}
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-24">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="gradient-text">For Builders,</span>
                <br />
                <span className="gradient-text">by Builders</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-x11 max-w-4xl mx-auto leading-relaxed">
                Revalate AI Studio was founded by construction professionals who understand the daily challenges
                of managing projects, controlling costs, and staying competitive in today's market.
                Beyond our AI agents, we also
                <span className="text-pastel-blue font-semibold"> develop custom software applications </span>
                 tailored specifically to your unique construction workflows.
              </p>
            </div>
          </AnimatedSection>

          {/* Leadership Team */}
          <AnimatedSection animation="slideUp" delay={200} duration={0.8}>
            <div className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                <span className="gradient-text">Meet Our Founders</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {leadership.map((person, index) => (
                  <div
                    key={person.name}
                    className="group text-center p-8 rounded-3xl bg-black-olive/40 border border-dark-liver/30
                              hover:border-pastel-blue/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pastel-blue/30 group-hover:border-pastel-blue transition-colors duration-300">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-x11 group-hover:text-pastel-blue transition-colors duration-300">
                      {person.name}
                    </h3>
                    <p className="text-pastel-blue font-semibold mb-4">{person.role}</p>
                    <p className="text-dark-liver leading-relaxed group-hover:text-gray-x11 transition-colors duration-300">
                      {person.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Mission Statement */}
          <AnimatedSection animation="fadeIn" delay={300} duration={0.8}>
            <div className="mb-24 text-center">
              <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-black-olive/40 to-black-olive/60 border border-dark-liver/30">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  <span className="gradient-text">Our Mission</span>
                </h2>
                <p className="text-xl text-gray-x11 leading-relaxed mb-8">
                  To empower construction professionals with intelligent AI agents that eliminate repetitive tasks,
                  reduce errors, and unlock new levels of efficiency and profitability.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 rounded-xl bg-air-black/50 border border-dark-liver/30">
                    <div className="text-3xl font-bold text-pastel-blue mb-2">1.3M+</div>
                    <div className="text-dark-liver">Tasks Processed</div>
                  </div>
                  <div className="p-6 rounded-xl bg-air-black/50 border border-dark-liver/30">
                    <div className="text-3xl font-bold text-pastel-blue mb-2">40%</div>
                    <div className="text-dark-liver">Average Cost Savings</div>
                  </div>
                  <div className="p-6 rounded-xl bg-air-black/50 border border-dark-liver/30">
                    <div className="text-3xl font-bold text-pastel-blue mb-2">98%</div>
                    <div className="text-dark-liver">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection animation="slideUp" delay={400} duration={0.8}>
            <div className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                <span className="gradient-text">Our Values</span>
              </h2>
              <StaggeredAnimation
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                staggerDelay={100}
                childAnimation="slideUp"
              >
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="group p-8 rounded-2xl bg-black-olive/40 border border-dark-liver/30
                              hover:border-pastel-blue/50 transition-all duration-300 hover:scale-105
                              h-[320px] flex flex-col"
                  >
                    <div className="w-16 h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center mb-6
                                   text-pastel-blue group-hover:bg-pastel-blue/40 group-hover:scale-110 transition-all duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-x11 group-hover:text-pastel-blue transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-dark-liver leading-relaxed group-hover:text-gray-x11 transition-colors duration-300 flex-1">
                      {value.description}
                    </p>
                  </div>
                ))}
              </StaggeredAnimation>
            </div>
          </AnimatedSection>

          {/* Contact Us Section */}
          <AnimatedSection animation="slideUp" delay={500} duration={0.8}>
            <div className="mb-24">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                <span className="gradient-text">Get in Touch</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <div className="bg-black-olive/40 border border-dark-liver/30 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-x11">
                    Ready to Transform Your Workflow?
                  </h3>
                  <p className="text-dark-liver mb-8 leading-relaxed">
                    Get in touch with us to learn how our custom AI software can elevate your construction business.
                    Let's discuss your specific needs and requirements.
                  </p>

                  {/* Success Message */}
                  {formState.isSuccess && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-green-300 font-medium">
                        Thank you! We've received your message and will get back to you within 24 hours.
                      </span>
                    </div>
                  )}

                  {/* Error Message */}
                  {formState.error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-red-300 font-medium text-left">
                        {formState.error}
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-x11 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-air-black/50 border border-dark-liver/50
                                   text-gray-x11 placeholder-dark-liver focus:border-pastel-blue focus:outline-none
                                   transition-colors duration-300 disabled:opacity-50"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-x11 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={formState.isSubmitting}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-air-black/50 border border-dark-liver/50
                                   text-gray-x11 placeholder-dark-liver focus:border-pastel-blue focus:outline-none
                                   transition-colors duration-300 disabled:opacity-50"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-x11 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-air-black/50 border border-dark-liver/50
                                 text-gray-x11 placeholder-dark-liver focus:border-pastel-blue focus:outline-none
                                 transition-colors duration-300 disabled:opacity-50"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-x11 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-air-black/50 border border-dark-liver/50
                                 text-gray-x11 placeholder-dark-liver focus:border-pastel-blue focus:outline-none
                                 transition-colors duration-300 disabled:opacity-50"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-x11 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-air-black/50 border border-dark-liver/50
                                 text-gray-x11 placeholder-dark-liver focus:border-pastel-blue focus:outline-none
                                 transition-colors duration-300 disabled:opacity-50"
                        placeholder="ABC Construction Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-x11 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={formState.isSubmitting}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-air-black/50 border border-dark-liver/50
                                 text-gray-x11 placeholder-dark-liver focus:border-pastel-blue focus:outline-none
                                 transition-colors duration-300 resize-none disabled:opacity-50"
                        placeholder="Tell us about your project and how we can help..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState.isSubmitting || formState.isSuccess}
                      className="w-full px-8 py-4 bg-pastel-blue text-air-black font-bold text-lg rounded-xl
                               transition-all duration-200 hover:bg-pastel-blue/80 shadow-lg hover:shadow-xl
                               disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {formState.isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : formState.isSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Direct Contact Info */}
                <div className="space-y-8">
                  {/* Direct Contact Methods */}
                  <div className="bg-black-olive/40 border border-dark-liver/30 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-x11">
                      Want to Reach Out Directly?
                    </h3>
                    <p className="text-dark-liver mb-8 leading-relaxed">
                      Have questions or ready to take the next step? Email or call us to discuss how we can support your business growth.
                    </p>
                    <div className="space-y-6">
                      <a
                        href="mailto:info@revalate.com"
                        className="flex items-center gap-4 p-4 rounded-xl bg-air-black/50 border border-dark-liver/30
                                 hover:border-pastel-blue/50 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-pastel-blue/20 flex items-center justify-center
                                      text-pastel-blue group-hover:bg-pastel-blue/40 transition-colors duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-x11 group-hover:text-pastel-blue transition-colors duration-300">
                            Send us an email
                          </div>
                          <div className="text-dark-liver">
                            info@revalate.com
                          </div>
                        </div>
                      </a>
                      <a
                        href="tel:(647)254-9814"
                        className="flex items-center gap-4 p-4 rounded-xl bg-air-black/50 border border-dark-liver/30
                                 hover:border-pastel-blue/50 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-pastel-blue/20 flex items-center justify-center
                                      text-pastel-blue group-hover:bg-pastel-blue/40 transition-colors duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-x11 group-hover:text-pastel-blue transition-colors duration-300">
                            Give us a call
                          </div>
                          <div className="text-dark-liver">
                            (647) 254-9814
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Office Locations */}
                  <div className="bg-black-olive/40 border border-dark-liver/30 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-x11">
                      Our Offices
                    </h3>
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-air-black/50 border border-dark-liver/30">
                        <h4 className="font-semibold text-pastel-blue mb-2">
                          Servicing US & Canada
                        </h4>
                        <p className="text-dark-liver text-sm">
                          Proudly providing customized AI software to construction companies across North America.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-air-black/50 border border-dark-liver/30">
                        <h4 className="font-semibold text-pastel-blue mb-2">
                          HQ in Toronto
                        </h4>
                        <p className="text-dark-liver text-sm">
                          Visit our Toronto headquarters to learn how we can support your construction business.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contractor Feedback */}
          <AnimatedSection animation="fadeIn" delay={600} duration={0.8}>
            <div className="mb-24">
              <Testimonials onDemoClick={onDemoClick} />
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection animation="scaleIn" delay={700} duration={0.8}>
            <div className="text-center">
              <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-black-olive/40 to-black-olive/60 border border-dark-liver/30">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-x11">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-xl text-dark-liver mb-8">
                  Experience the power of AI-driven construction management with a personalized demo.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={onDemoClick}
                    className="px-8 py-4 bg-pastel-blue text-air-black font-bold text-lg rounded-xl transition-all duration-200 hover:bg-pastel-blue/80 shadow-lg hover:shadow-xl"
                  >
                    Talk to Us
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
