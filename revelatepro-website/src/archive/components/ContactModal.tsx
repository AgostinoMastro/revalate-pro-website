import type React from 'react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatedSection } from './AnimatedSection'
import { useRecaptcha } from '../hooks/useRecaptcha'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'demo' | 'contact'
  buttonPosition?: { x: number; y: number } | null
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  projectType: string
  companySize: string
  currentSoftware: string
  challenges: string
  preferredTime: string
  message: string
  agentInterest: string[]
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  companySize: '',
  currentSoftware: '',
  challenges: '',
  preferredTime: '',
  message: '',
  agentInterest: []
}

const projectTypes = [
  'Residential Construction',
  'Commercial Construction',
  'Infrastructure',
  'Renovation/Remodeling',
  'Industrial',
  'Electrical Contracting',
  'Plumbing',
  'HVAC',
  'General Contracting',
  'Other'
]

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, defaultTab = 'demo', buttonPosition }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'contact'>(defaultTab)

  // reCAPTCHA integration
  const { executeRecaptcha, isRecaptchaReady, recaptchaError } = useRecaptcha()

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab)

      // Prevent background scrolling
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'

      // Ensure modal is visible in viewport immediately
      setTimeout(() => {
        // Scroll to top to ensure modal is visible
        window.scrollTo({ top: 0, behavior: 'instant' })

        // For mobile devices, ensure we're at the top of the viewport
        if (window.innerWidth <= 640) {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }
      }, 50)

      // Cleanup function
      return () => {
        document.body.style.overflow = originalStyle
      }
    }

    // Re-enable background scrolling when modal closes
    if (!isOpen) {
      document.body.style.overflow = ''
    }
  }, [isOpen, defaultTab])

  const totalSteps = 2
  const isLastStep = currentStep === totalSteps

  const validateStep = (step: number): boolean => {
    const stepErrors: Partial<FormData> = {}

    if (step === 1) {
      if (!formData.firstName.trim()) stepErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) stepErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) {
        stepErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        stepErrors.email = 'Please enter a valid email address'
      }
      if (!formData.phone.trim()) stepErrors.phone = 'Phone number is required'
      if (!formData.company.trim()) stepErrors.company = 'Company name is required'
      if (!formData.projectType) stepErrors.projectType = 'Project type is required'
      if (!formData.companySize) stepErrors.companySize = 'Company size is required'
    }

    if (step === 2) {
      if (formData.agentInterest.length === 0) {
        stepErrors.message = 'Please select at least one AI agent'
      }
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const testWebhook = async () => {
    console.log('🧪 Testing webhook connection...')

    const testData = {
      formType: 'Test Submission',
      submissionTime: new Date().toISOString(),
      test: true,
      message: 'This is a test submission to verify webhook connectivity'
    }

    try {
      const webhookURL = 'https://hook.us1.make.com/hmn8g7wg11hy82kzk2ice88y1l8e965k'

      console.log('🚀 Testing POST request to:', webhookURL)
      console.log('📤 Test data:', testData)

      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      })

      console.log('📥 Test response status:', response.status, response.statusText)

      if (response.ok) {
        const responseData = await response.text()
        console.log('✅ Test webhook successful! Response:', responseData)
        alert('✅ Webhook test successful! Check console for details.')
      } else {
        const errorData = await response.text()
        console.error('❌ Test webhook failed:', errorData)
        alert(`❌ Webhook test failed: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Test webhook error:', error)
      alert(`❌ Webhook test error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Execute reCAPTCHA verification
      console.log('🔒 Starting reCAPTCHA verification...')
      let recaptchaToken: string

      try {
        recaptchaToken = await executeRecaptcha('form_submission')
      } catch (recaptchaError) {
        console.error('❌ reCAPTCHA verification failed:', recaptchaError)
        setIsSubmitting(false)
        alert('Security verification failed. Please refresh the page and try again.')
        return
      }

      console.log('✅ reCAPTCHA verification successful')

      // Prepare form data for webhook submission
      const submissionData = {
        formType: 'Talk to Us',
        submissionTime: new Date().toISOString(),
        activeTab: activeTab,
        recaptchaResponse: recaptchaToken,
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        companyInfo: {
          companyName: formData.company,
          projectType: formData.projectType,
          companySize: formData.companySize
        },
        projectDetails: {
          aiAgentsInterest: formData.agentInterest,
          additionalMessage: formData.message,
          currentSoftware: formData.currentSoftware,
          challenges: formData.challenges,
          preferredTime: formData.preferredTime
        },
        allFields: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          companySize: formData.companySize,
          agentInterest: formData.agentInterest,
          message: formData.message,
          currentSoftware: formData.currentSoftware,
          challenges: formData.challenges,
          preferredTime: formData.preferredTime
        }
      }

      // Log the data being sent for debugging
      console.log('📤 Sending form data to webhook:', submissionData)

      // Send to webhook
      const webhookURL = 'https://hook.us1.make.com/dnedawg5lqriv7v8pxx7vfc7pzl3yi3a'

      console.log('🚀 Making POST request to:', webhookURL)

      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      console.log('📥 Response status:', response.status, response.statusText)
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const responseData = await response.text()
        console.log('✅ Webhook response data:', responseData)
        setIsSubmitted(true)
        console.log('✅ Form submitted successfully to webhook')
      } else {
        const errorData = await response.text()
        console.error('❌ Webhook error response:', errorData)
        throw new Error(`Webhook submission failed: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ Form submission error:', error)
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        name: error instanceof Error ? error.name : 'Unknown'
      })

      // Show error to user instead of false success
      alert(`Form submission failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const previousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setErrors({}) // Clear errors when going back
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitted(false)
    setCurrentStep(1)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleTabChange = (tab: 'demo' | 'contact') => {
    setActiveTab(tab)
    setCurrentStep(1) // Reset to step 1 when switching tabs
    setErrors({})
  }

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
      className="sm:items-center sm:justify-center sm:p-4 lg:p-8"
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 33, 35, 0.95)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={handleClose}
      />

      {/* Mobile-Scrollable Modal Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100vw',
          height: 'auto',
          backgroundColor: '#1E2123',
          borderRadius: '0',
          border: 'none',
          boxShadow: '0 25px 50px -12px rgba(137, 205, 241, 0.25)',
          overflow: 'visible',
          zIndex: 1000000000,
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh'
        }}
        className="sm:max-w-2xl sm:min-h-0 sm:max-h-[90vh] sm:my-8 sm:rounded-2xl sm:border sm:border-pastel-blue/20 sm:shadow-2xl lg:max-w-3xl xl:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile-Fixed Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-600 bg-black-olive/95 backdrop-blur-lg">
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">
              Talk to Us
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-1 leading-tight">
              {activeTab === 'demo'
                ? 'Get a custom quote for your project'
                : 'Find our contact information'
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 hover:bg-gray-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pastel-blue touch-manipulation"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile-Fixed Tab Navigation */}
        <div className="flex-shrink-0 flex border-b border-gray-600 bg-black-olive/95 backdrop-blur-lg">
          <button
            onClick={() => handleTabChange('demo')}
            className={`flex-1 py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8 text-center text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-touch touch-manipulation ${
              activeTab === 'demo'
                ? 'text-pastel-blue border-b-2 border-pastel-blue bg-surface-primary'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800 active:bg-gray-800'
            }`}
          >
            Get Quote
          </button>
          <button
            onClick={() => handleTabChange('contact')}
            className={`flex-1 py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8 text-center text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-touch touch-manipulation ${
              activeTab === 'contact'
                ? 'text-pastel-blue border-b-2 border-pastel-blue bg-surface-primary'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800 active:bg-gray-800'
            }`}
          >
            Contact Info
          </button>
        </div>

        {/* Mobile-Scrollable Form Content Container */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
            minHeight: 0
          }}
          className="mobile-scroll-container"
        >
          {/* Mobile-Optimized Form Content */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-surface-primary pb-safe">
            {activeTab === 'demo' ? (
              // Enhanced Desktop Quote Form
              !isSubmitted ? (
                <div className="max-w-4xl mx-auto">
                  {/* Step 1: Desktop-optimized Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4">
                          Tell us about your project
                        </h3>
                        <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                          We'll create a custom quote tailored to your specific construction needs
                        </p>
                      </div>

                      {/* Desktop-optimized Name Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        <div>
                          <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 text-base sm:text-lg touch-manipulation ${
                              errors.firstName ? 'border-red-400' : 'border-gray-600'
                            }`}
                            placeholder="John"
                            autoComplete="given-name"
                          />
                          {errors.firstName && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.firstName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 text-base sm:text-lg touch-manipulation ${
                              errors.lastName ? 'border-red-400' : 'border-gray-600'
                            }`}
                            placeholder="Smith"
                            autoComplete="family-name"
                          />
                          {errors.lastName && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.lastName}</p>}
                        </div>
                      </div>

                      {/* Desktop-optimized Contact Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        <div>
                          <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 text-base sm:text-lg touch-manipulation ${
                              errors.email ? 'border-red-400' : 'border-gray-600'
                            }`}
                            placeholder="john@company.com"
                            autoComplete="email"
                            inputMode="email"
                          />
                          {errors.email && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 text-base sm:text-lg touch-manipulation ${
                              errors.phone ? 'border-red-400' : 'border-gray-600'
                            }`}
                            placeholder="(555) 123-4567"
                            autoComplete="tel"
                            inputMode="tel"
                          />
                          {errors.phone && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Desktop-optimized Company Information */}
                      <div>
                        <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 text-base sm:text-lg touch-manipulation ${
                            errors.company ? 'border-red-400' : 'border-gray-600'
                          }`}
                          placeholder="ABC Construction"
                          autoComplete="organization"
                        />
                        {errors.company && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.company}</p>}
                      </div>

                      {/* Desktop-enhanced Project Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        <div>
                          <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                            Project Type *
                          </label>
                          <div className="relative">
                            <select
                              value={formData.projectType}
                              onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                              className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white text-base sm:text-lg touch-manipulation appearance-none cursor-pointer ${
                                errors.projectType ? 'border-red-400' : 'border-gray-600'
                              }`}
                            >
                              <option value="">Select project type</option>
                              {projectTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          {errors.projectType && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.projectType}</p>}
                        </div>

                        <div>
                          <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                            Company Size *
                          </label>
                          <div className="relative">
                            <select
                              value={formData.companySize}
                              onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
                              className={`w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white text-base sm:text-lg touch-manipulation appearance-none cursor-pointer ${
                                errors.companySize ? 'border-red-400' : 'border-gray-600'
                              }`}
                            >
                              <option value="">Select company size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="200+">200+ employees</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          {errors.companySize && <p className="text-red-400 text-sm sm:text-base mt-2">{errors.companySize}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Desktop-enhanced AI Agents Interest */}
                  {currentStep === 2 && (
                    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4">
                          Which AI agents interest you? *
                        </h3>
                        <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                          Select the AI agents that would benefit your construction projects
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                        {['Estimating Agent', 'Bid Management Agent', 'Expense Tracking Agent', 'Task Agent', 'Daily Log Agent'].map((agent) => (
                          <label key={agent} className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 rounded-xl bg-black-olive/30 border border-gray-700/50 cursor-pointer hover:bg-black-olive/50 transition-colors duration-200 touch-manipulation">
                            <input
                              type="checkbox"
                              checked={formData.agentInterest.includes(agent)}
                              onChange={(e) => {
                                const updatedAgents = e.target.checked
                                  ? [...formData.agentInterest, agent]
                                  : formData.agentInterest.filter(a => a !== agent)
                                setFormData(prev => ({ ...prev, agentInterest: updatedAgents }))
                              }}
                              className="w-5 h-5 sm:w-6 sm:h-6 text-pastel-blue focus:ring-pastel-blue border-gray-500 bg-black-olive rounded touch-manipulation"
                            />
                            <span className="text-gray-300 text-base sm:text-lg flex-1">{agent}</span>
                          </label>
                        ))}
                      </div>

                      {errors.message && <p className="text-red-400 text-sm sm:text-base mt-2 text-center">{errors.message}</p>}

                      {/* Desktop-optimized message textarea */}
                      <div>
                        <label className="block text-sm sm:text-base lg:text-lg font-medium text-gray-300 mb-3">
                          Additional Message (Optional)
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={5}
                          className="w-full px-4 py-4 sm:py-5 lg:py-6 bg-black-olive border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pastel-blue transition-colors duration-200 text-white placeholder-gray-400 text-base sm:text-lg resize-none touch-manipulation"
                          placeholder="Tell us about your specific needs or questions..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Enhanced Desktop Navigation */}
                  <div className="flex justify-between items-center mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-gray-600">
                    <button
                      onClick={previousStep}
                      disabled={currentStep === 1}
                      className={`px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg font-medium rounded-xl transition-colors duration-200 min-h-touch touch-manipulation ${
                        currentStep === 1
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700 active:bg-gray-700'
                      }`}
                    >
                      Previous
                    </button>

                    <div className="flex items-center space-x-4 sm:space-x-6">
                      {[1, 2].map((step) => (
                        <div
                          key={`step-indicator-${step}`}
                          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-200 ${
                            step === currentStep ? 'bg-pastel-blue' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col items-end">
                      {recaptchaError && (
                        <p className="text-red-400 text-sm mb-3 text-center">
                          {recaptchaError}
                        </p>
                      )}
                      <button
                        onClick={nextStep}
                        disabled={isSubmitting || !isRecaptchaReady}
                        className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 bg-pastel-blue text-black font-bold text-base sm:text-lg rounded-xl hover:bg-pastel-blue/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-touch touch-manipulation shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? 'Submitting...' : (!isRecaptchaReady ? 'Loading...' : (isLastStep ? 'Get Quote' : 'Next'))}
                      </button>
                      {!isRecaptchaReady && (
                        <p className="text-gray-400 text-xs mt-2">
                          Loading security verification...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop-optimized Success Message */
                <div className="text-center py-16 sm:py-20 lg:py-24 px-4 max-w-2xl mx-auto">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-pastel-blue/20 rounded-full flex items-center justify-center mx-auto mb-8 mobile-success-icon">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 text-pastel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Thank you!</h3>
                  <p className="text-gray-300 mb-10 text-lg sm:text-xl lg:text-2xl leading-relaxed">We've received your quote request and will contact you within 24 hours with your custom estimate.</p>
                  <button
                    onClick={handleClose}
                    className="px-10 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 bg-pastel-blue text-black font-bold text-lg sm:text-xl rounded-xl hover:bg-pastel-blue/90 transition-all duration-300 min-h-touch touch-manipulation shadow-lg hover:shadow-xl"
                  >
                    Close
                  </button>
                </div>
              )
            ) : (
              // Desktop-optimized Contact Info Tab
              <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4">
                    Get in Touch with Revalate
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                    Ready to transform your construction projects with AI? We're here to help.
                  </p>
                </div>

                {/* Desktop-optimized contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {/* Contact cards with enhanced desktop styling */}
                  <div className="lg:col-span-2 p-6 sm:p-8 bg-black-olive/50 rounded-xl border border-gray-600">
                    <h4 className="text-pastel-blue font-semibold mb-6 flex items-center text-lg sm:text-xl">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Us
                    </h4>
                    <div className="space-y-4">
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">General Inquiries:</span>
                        <a href="mailto:info@revalate.com" className="text-pastel-blue hover:underline touch-manipulation">info@revalate.com</a>
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">Sales:</span>
                        <a href="mailto:sales@revalate.com" className="text-pastel-blue hover:underline touch-manipulation">sales@revalate.com</a>
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">Support:</span>
                        <a href="mailto:support@revalate.com" className="text-pastel-blue hover:underline touch-manipulation">support@revalate.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-6 sm:p-8 bg-black-olive/50 rounded-xl border border-gray-600">
                    <h4 className="text-pastel-blue font-semibold mb-6 flex items-center text-lg sm:text-xl">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Us
                    </h4>
                    <div className="space-y-4">
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">Main:</span>
                        <a href="tel:+15551234567" className="text-pastel-blue hover:underline touch-manipulation">(647) 254-9815</a>
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">Sales:</span>
                        <a href="tel:+15551234568" className="text-pastel-blue hover:underline touch-manipulation">(647) 254-9817</a>
                      </p>
                      <p className="text-gray-300 text-sm sm:text-base">
                        Monday - Friday: 8:00 AM - 5:00 PM EST
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-6 sm:p-8 bg-black-olive/50 rounded-xl border border-gray-600">
                    <h4 className="text-pastel-blue font-semibold mb-6 flex items-center text-lg sm:text-xl">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Visit Our Office
                    </h4>
                    <div className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      <p className="font-medium text-white mb-3">Revalate Headquarters</p>
                      <address className="not-italic">
                        <p>19 Western Battery Drive</p>
                        <p>Toronto, Ontario</p>
                        <p>Canada</p>
                      </address>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-6 sm:p-8 bg-black-olive/50 rounded-xl border border-gray-600">
                    <h4 className="text-pastel-blue font-semibold mb-6 flex items-center text-lg sm:text-xl">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Response Time
                    </h4>
                    <div className="space-y-4">
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">Quote Requests:</span> Within 24 hours
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">General Inquiries:</span> Within 24 hours
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-white font-medium block mb-2">Support Issues:</span> Within 2 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop-optimized Social Links */}
                <div className="text-center p-8 sm:p-10 bg-black-olive/50 rounded-xl border border-gray-600">
                  <h4 className="text-pastel-blue font-semibold mb-6 flex items-center justify-center text-lg sm:text-xl">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Follow Us
                  </h4>
                  <div className="flex justify-center space-x-8 sm:space-x-12">
                    <a
                      href="https://www.linkedin.com/company/revalate-inc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pastel-blue transition-colors py-3 px-6 rounded-lg hover:bg-gray-800 touch-manipulation text-base sm:text-lg"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/revalate.inc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pastel-blue transition-colors py-3 px-6 rounded-lg hover:bg-gray-800 touch-manipulation text-base sm:text-lg"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.youtube.com/@Revalate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pastel-blue transition-colors py-3 px-6 rounded-lg hover:bg-gray-800 touch-manipulation text-base sm:text-lg"
                    >
                      YouTube
                    </a>
                  </div>
                </div>

                {/* Desktop-optimized Quick Contact Button */}
                <div className="text-center pt-8">
                  <button
                    onClick={() => handleTabChange('demo')}
                    className="px-12 sm:px-16 lg:px-20 py-4 sm:py-5 lg:py-6 bg-pastel-blue text-black font-bold text-lg sm:text-xl rounded-xl hover:bg-pastel-blue/90 transition-all duration-300 min-h-touch touch-manipulation shadow-lg hover:shadow-xl"
                  >
                    Get Your Quote Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
