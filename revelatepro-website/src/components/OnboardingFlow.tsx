import type React from 'react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatedSection } from './AnimatedSection'

import { Rocket, Lightbulb, FileText, Clipboard, Building2, Target } from 'lucide-react'

interface OnboardingFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: 'click' | 'hover' | 'scroll'
  content: React.ReactNode
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to RevalatePro!',
    description: 'Let\'s take a quick tour to show you how AI can transform your construction business.',
    position: 'center',
    content: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-pastel-blue to-black-olive rounded-xl flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Ready to see the future of construction?</h3>
        <p className="text-gray-400">This interactive tour will show you how our AI agents can save you time and increase profits.</p>
        <div className="flex items-center justify-center space-x-4 mt-6">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5 minutes
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'hero-section',
    title: 'Meet RevalatePro',
    description: 'This is your command center - where AI meets construction expertise.',
    target: '.hero-section',
    position: 'bottom',
    content: (
      <div className="space-y-3">
        <p className="text-gray-300">RevalatePro combines cutting-edge AI with deep construction industry knowledge.</p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 rounded-lg bg-neon-green/10">
            <div className="text-neon-green font-bold text-lg">85%</div>
            <div className="text-xs text-gray-500">Time Saved</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bright-blue/10">
            <div className="text-bright-blue font-bold text-lg">40%</div>
            <div className="text-xs text-gray-500">More Bids Won</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-agent-cyan/10">
            <div className="text-agent-cyan font-bold text-lg">25%</div>
            <div className="text-xs text-gray-500">Higher Margins</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ai-agents',
    title: 'Your AI Agent Team',
    description: 'Meet the AI agents that will revolutionize your workflow.',
    target: '.current-agents-section',
    position: 'top',
    action: 'scroll',
    content: (
      <div className="space-y-3">
        <p className="text-gray-300">Each agent specializes in a specific area of construction management:</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-neon-green" />
            <span className="text-sm text-gray-300"><strong>Bid Agent:</strong> Wins more profitable projects</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-bright-blue" />
            <span className="text-sm text-gray-300"><strong>Estimating Agent:</strong> Creates accurate estimates instantly</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-neon-yellow" />
            <span className="text-sm text-gray-300"><strong>Expense Agent:</strong> Tracks every dollar automatically</span>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-300 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <strong>Pro Tip:</strong> Click on any agent card to see how it works in detail!
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'interactive-demo',
    title: 'See AI in Action',
    description: 'This is where the magic happens - watch AI process real construction documents.',
    target: '.why-revalate-pro-section',
    position: 'top',
    action: 'scroll',
    content: (
      <div className="space-y-3">
        <p className="text-gray-300">These interactive demos show exactly how AI processes your documents:</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-pastel-blue" />
            </div>
            <span className="text-sm text-gray-300">Upload invoices → AI extracts all data instantly</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
              <Clipboard className="w-4 h-4 text-pastel-blue" />
            </div>
            <span className="text-sm text-gray-300">Submit RFPs → AI generates winning proposals</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-pastel-blue" />
            </div>
            <span className="text-sm text-gray-300">Upload plans → AI calculates precise estimates</span>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-300 flex items-center gap-2">
            <Target className="w-4 h-4" />
            <strong>Try it:</strong> Click "Start Demo" on any section to see AI processing in real-time!
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'roi-calculator',
    title: 'Calculate Your Savings',
    description: 'See exactly how much time and money RevalatePro can save your business.',
    target: '.roi-calculator-link',
    position: 'bottom',
    action: 'click',
    content: (
      <div className="space-y-3">
        <p className="text-gray-300">Get personalized ROI projections based on your company size and current processes.</p>
        <div className="bg-gradient-to-r from-neon-green/20 to-bright-blue/20 p-4 rounded-lg border border-neon-green/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green mb-2">Average Results:</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-bold text-white">15+ hours</div>
                <div className="text-gray-400">saved per week</div>
              </div>
              <div>
                <div className="font-bold text-white">$150K+</div>
                <div className="text-gray-400">annual savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'get-started',
    title: 'Ready to Transform Your Business?',
    description: 'Take the next step and see RevalatePro in action with a personalized demo.',
    position: 'center',
    content: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-pastel-blue to-black-olive rounded-xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">You're all set!</h3>
        <p className="text-gray-400">You now know how RevalatePro can revolutionize your construction business with AI.</p>
        <div className="space-y-3 mt-6">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-gradient-green to-gradient-dark text-white font-bold rounded-xl transition-all duration-200 hover:opacity-90">
            Book a Personalized Demo
          </button>
          <button className="w-full px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-200">
            Talk to Us
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">No credit card required • 14-day free trial • Setup in minutes</p>
      </div>
    )
  }
]

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setCurrentStep(0)

    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const currentStepData = onboardingSteps[currentStep]

  const nextStep = () => {

    if (currentStep < onboardingSteps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStepData.id])
      setCurrentStep(prev => prev + 1)

      // Auto-scroll to target element if specified
      const nextStepData = onboardingSteps[currentStep + 1]
      if (nextStepData?.target) {
        setTimeout(() => {
          const element = document.querySelector(nextStepData.target as string)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 300)
      }
    } else {

      onComplete()
      onClose()
    }
  }

  const prevStep = () => {

    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const skipTour = () => {

    onClose()
  }

  if (!isVisible) return null

  const getTooltipPosition = () => {
    if (!currentStepData.target || currentStepData.position === 'center') {
      return 'fixed inset-0 flex items-center justify-center'
    }

    // For positioned tooltips, we'll use a simple approach
    // In a real implementation, you'd calculate exact positions based on target element
    return 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with highlight */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm">
        {currentStepData.target && currentStepData.position !== 'center' && (
          <div className="absolute inset-0">
            {/* Spotlight effect for target element */}
            <div
              className="absolute bg-white/10 rounded-xl border-2 border-neon-green/50 shadow-lg animate-pulse"
              style={{
                // In a real implementation, calculate these based on target element position
                top: '20%',
                left: '10%',
                right: '10%',
                height: '300px'
              }}
            />
          </div>
        )}
      </div>

      {/* Onboarding Card */}
      <div className={getTooltipPosition()}>
        <AnimatedSection animation="scaleIn" duration={0.5}>
          <div className="bg-dark-card border border-dark-border rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-dark-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-neon-green to-bright-blue rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">R</span>
                  </div>
                  <span className="text-lg font-bold gradient-text">Onboarding</span>
                </div>
                <button
                  onClick={skipTour}
                  className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full bg-white/20 hover:bg-white/30"
                  aria-label="Skip tour"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-400">Step {currentStep + 1} of {onboardingSteps.length}</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-neon-green to-bright-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{currentStepData.title}</h3>
              <p className="text-gray-400 text-sm">{currentStepData.description}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {currentStepData.content}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-dark-border bg-dark-bg/50">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>

                <div className="flex space-x-2">
                  {onboardingSteps.map((step, index) => (
                    <div
                      key={`step-indicator-${step.id}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-neon-green scale-125'
                          : index < currentStep
                            ? 'bg-bright-blue'
                            : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-gradient-green to-gradient-dark text-white font-semibold rounded-lg transition-all duration-200 hover:opacity-90"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Talk to Us' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>


    </div>
  )
}
