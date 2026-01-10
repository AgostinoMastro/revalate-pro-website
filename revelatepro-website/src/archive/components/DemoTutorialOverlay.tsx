import type React from 'react'
import { useState, useEffect } from 'react'
import { PortalModal } from './PortalModal'
import { useIsMobile } from '../hooks/useMediaQuery'
import { Star, Search, Smartphone, FileText, Clipboard, Target } from 'lucide-react'

interface DemoTutorialOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSkip: () => void
}

const TUTORIAL_STORAGE_KEY = 'revalatepro-demo-tutorial-seen'

export const DemoTutorialOverlay: React.FC<DemoTutorialOverlayProps> = ({
  isOpen,
  onClose,
  onSkip
}) => {
  const isMobile = useIsMobile()
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      title: "Welcome to Revalate AI Studio!",
      content: "This guided tour will show you how our AI agents can transform your construction business with automated workflows and intelligent processing.",
      icon: <Star className="w-6 h-6" />,
      action: "Start Tour"
    },
    {
      title: "Explore AI Agents",
      content: `Navigate to different sections to see our AI agents for bidding, estimating, and expense management. ${isMobile ? 'Tap' : 'Click'} "AI Agents" in the menu to see all available agents.`,
      icon: <Search className="w-6 h-6" />,
      action: "Next"
    },
    {
      title: "Try Interactive Features",
      content: `${isMobile ? 'Tap' : 'Click'} "Talk to Us" to get a personalized quote, or use the ROI Calculator to see potential savings for your business.`,
      icon: <Target className="w-6 h-6" />,
      action: "Next"
    },
    {
      title: "Ready to Get Started?",
      content: "You can contact us anytime through the 'Talk to Us' button, explore our pricing plans, or dive into the AI agents section. Let's transform your construction workflows!",
      icon: <Smartphone className="w-6 h-6" />,
      action: "Start Exploring!"
    }
  ]

  const handleNext = () => {
    console.log('Tutorial: Next button clicked', { currentStep, isMobile })
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    console.log('Tutorial: Previous button clicked', { currentStep, isMobile })
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const restoreScrollPosition = () => {
    // Force restore body scroll ability
    document.body.style.overflow = ''
    document.body.style.removeProperty('overflow')

    // Restore scroll position when tutorial closes
    const savedScrollY = document.body.getAttribute('data-tutorial-scroll-y')
    if (savedScrollY) {
      const scrollY = Number.parseInt(savedScrollY, 10)
      setTimeout(() => {
        window.scrollTo({ top: scrollY, behavior: 'smooth' })
      }, 100)
      document.body.removeAttribute('data-tutorial-scroll-y')
    }
  }

  const handleComplete = () => {
    console.log('Tutorial: Completed', { isMobile })
    // Mark tutorial as seen
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')

    // Force enable scroll immediately
    document.body.style.overflow = 'auto'
    document.body.style.removeProperty('overflow')

    restoreScrollPosition()
    onClose()
  }

  const handleSkipTutorial = () => {
    console.log('Tutorial: Skipped', { currentStep, isMobile })
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true')

    // Force enable scroll immediately
    document.body.style.overflow = 'auto'
    document.body.style.removeProperty('overflow')

    restoreScrollPosition()
    onSkip()
  }

  // Reset to first step when opening and ensure proper centering
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position before opening tutorial
      const currentScrollY = window.scrollY

      setCurrentStep(0)

      // Ensure the modal is properly centered by scrolling to top
      setTimeout(() => {
        const modalContainer = document.getElementById('portal-modal-container')
        if (modalContainer) {
          modalContainer.scrollTop = 0
          modalContainer.scrollLeft = 0
        }
        // Also ensure window is at a good position
        if (window.scrollY > 100) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 50)

      // Store scroll position in a data attribute for restoration
      document.body.setAttribute('data-tutorial-scroll-y', currentScrollY.toString())
    } else {
      // Ensure scroll is restored when tutorial closes
      setTimeout(() => {
        document.body.style.overflow = ''
        document.body.style.removeProperty('overflow')
      }, 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentStepData = tutorialSteps[currentStep]
  const isLastStep = currentStep === tutorialSteps.length - 1

  return (
    <PortalModal isOpen={isOpen} onClose={handleSkipTutorial}>
      <div
        className="bg-black-olive border-2 border-pastel-blue rounded-3xl overflow-hidden transition-all duration-300 ease-out"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(148, 199, 204, 0.08) 0%, rgba(52, 58, 58, 0.95) 50%, rgba(148, 199, 204, 0.05) 100%)',
          boxShadow: '0 25px 50px rgba(148, 199, 204, 0.4)',
          width: isMobile ? 'calc(100vw - 40px)' : '100%',
          maxWidth: isMobile ? '400px' : '500px',
          margin: '0 auto',
          position: 'relative',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
          opacity: isOpen ? 1 : 0,
          minHeight: 'auto'
        }}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-pastel-blue/30 text-center">
          <button
            onClick={handleSkipTutorial}
            className={`absolute top-4 right-4 rounded-lg hover:bg-dark-liver/50 text-gray-x11 hover:text-pastel-blue transition-colors duration-200 ${
              isMobile ? 'p-3' : 'p-2'
            }`}
            aria-label="Skip tutorial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {tutorialSteps.map((step, index) => (
              <div
                key={`tutorial-step-${step.action}-${index}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-pastel-blue scale-125'
                    : index < currentStep
                      ? 'bg-pastel-blue/60'
                      : 'bg-dark-liver'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <div className="p-3 bg-pastel-blue/20 rounded-full text-pastel-blue">
              {currentStepData.icon}
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-x11 mb-2">
            {currentStepData.title}
          </h2>
          <p className="text-sm text-dark-liver">
            Step {currentStep + 1} of {tutorialSteps.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <p className="text-gray-x11 leading-relaxed text-base">
              {currentStepData.content}
            </p>
          </div>

          {/* Visual demo preview for step 3 */}
          {currentStep === 2 && (
            <div className="mb-6 p-4 bg-air-black/50 rounded-xl border border-pastel-blue/20">
              <div className="text-center mb-3">
                <div className="text-pastel-blue font-semibold text-sm mb-2">Demo Preview:</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-black-olive/60 rounded-lg text-xs">
                  <span className="text-gray-x11 flex items-center gap-2">
                    <FileText className="w-3 h-3 text-pastel-blue" />
                    RFP Analysis
                  </span>
                  <span className="text-pastel-blue">3.2s</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black-olive/60 rounded-lg text-xs">
                  <span className="text-gray-x11 flex items-center gap-2">
                    <Search className="w-3 h-3 text-pastel-blue" />
                    Competitor Research
                  </span>
                  <span className="text-pastel-blue">4.5s</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black-olive/60 rounded-lg text-xs">
                  <span className="text-gray-x11 flex items-center gap-2">
                    <Clipboard className="w-3 h-3 text-pastel-blue" />
                    Proposal Generation
                  </span>
                  <span className="text-pastel-blue">5.1s</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-xs text-dark-liver">Real AI processing with live results!</div>
              </div>
            </div>
          )}

          {/* Benefits highlight for last step */}
          {isLastStep && (
            <div className="mb-6 grid grid-cols-1 gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                <div className="text-green-400 font-bold text-sm">Save 20+ Hours</div>
                <div className="text-xs text-gray-x11">Per project automation</div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-center">
                <div className="text-blue-400 font-bold text-sm">95%+ Accuracy</div>
                <div className="text-xs text-gray-x11">AI-powered precision</div>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-center">
                <div className="text-purple-400 font-bold text-sm">60% Win Rate</div>
                <div className="text-xs text-gray-x11">Improved bidding success</div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className={`flex-1 border border-dark-liver text-gray-x11 rounded-xl hover:bg-dark-liver/30 transition-all duration-200 font-medium ${
                  isMobile ? 'py-4 px-5 text-base' : 'py-3 px-4 text-sm'
                }`}
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className={`flex-1 bg-gradient-to-r from-pastel-blue to-pastel-blue/80 text-air-black rounded-xl hover:from-pastel-blue/90 hover:to-pastel-blue/70 transition-all duration-200 font-bold shadow-lg ${
                isMobile ? 'py-4 px-5 text-base' : 'py-3 px-4 text-sm'
              }`}
            >
              {currentStepData.action}
            </button>
          </div>

          {/* Skip option */}
          <div className="mt-4 text-center">
            <button
              onClick={handleSkipTutorial}
              className="text-xs text-dark-liver hover:text-gray-x11 transition-colors duration-200"
            >
              Skip tutorial and explore on my own
            </button>
          </div>
        </div>
      </div>
    </PortalModal>
  )
}

// Hook to check if tutorial should be shown
export const useTutorialState = () => {
  const [showTutorial, setShowTutorial] = useState(false)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(TUTORIAL_STORAGE_KEY)
    const hasSeenBefore = seen === 'true'
    setHasSeenTutorial(hasSeenBefore)

    // No auto-trigger - only show when manually requested
    console.log('Tutorial: State initialized', { hasSeenBefore })
  }, [])

  const closeTutorial = () => {
    setShowTutorial(false)
  }

  const skipTutorial = () => {
    setShowTutorial(false)
  }

  // Manual trigger for showing tutorial (called from Tour button)
  const showTutorialManually = () => {
    console.log('Tutorial: Manually triggered from Tour button')
    setShowTutorial(true)
  }

  return {
    showTutorial,
    hasSeenTutorial,
    closeTutorial,
    skipTutorial,
    showTutorialManually
  }
}

// Development helper functions
export const resetTutorialState = () => {
  localStorage.removeItem(TUTORIAL_STORAGE_KEY)
  console.log('Tutorial state reset. Refresh the page to see the tutorial again.')
}

export const triggerTutorialManually = () => {
  // Force show tutorial regardless of localStorage state
  window.dispatchEvent(new CustomEvent('showTutorial'))
  console.log('Tutorial manually triggered. Check for tutorial overlay.')
}

export const checkTutorialState = () => {
  const seen = localStorage.getItem(TUTORIAL_STORAGE_KEY)
  console.log('Tutorial state:', {
    hasSeenTutorial: seen === 'true',
    localStorage: seen,
    isMobile: window.innerWidth <= 768
  })
}
