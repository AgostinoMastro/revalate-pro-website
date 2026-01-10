import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { AnimatedSection } from './AnimatedSection'

interface TourStep {
  id: string
  title: string
  content: string
  target: string
  position: 'top' | 'bottom' | 'left' | 'right'
  action?: string
}

interface GuidedTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  steps: TourStep[]
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ isOpen, onClose, onComplete, steps }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const targetElement = document.querySelector(steps[currentStep]?.target)
    if (targetElement) {
      setHighlightedElement(targetElement)

      // Scroll element into view
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })

      // Position tooltip
      positionTooltip(targetElement)
    }
  }, [currentStep, isOpen, steps])

  useEffect(() => {
    if (!isOpen) {
      setHighlightedElement(null)
      setCurrentStep(0)
    }
  }, [isOpen])

  const positionTooltip = (targetElement: Element) => {
    if (!tooltipRef.current) return

    const targetRect = targetElement.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const step = steps[currentStep]

    let top = 0
    let left = 0

    switch (step.position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - 20
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = targetRect.bottom + 20
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2
        left = targetRect.left - tooltipRect.width - 20
        break
      case 'right':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2
        left = targetRect.right + 20
        break
    }

    // Keep tooltip within viewport bounds
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (left < 20) left = 20
    if (left + tooltipRect.width > viewportWidth - 20) left = viewportWidth - tooltipRect.width - 20
    if (top < 20) top = 20
    if (top + tooltipRect.height > viewportHeight - 20) top = viewportHeight - tooltipRect.height - 20

    tooltipRef.current.style.position = 'fixed'
    tooltipRef.current.style.top = `${top}px`
    tooltipRef.current.style.left = `${left}px`
    tooltipRef.current.style.zIndex = '10000'
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    onClose()
  }

  const completeTour = () => {
    onComplete()
    onClose()
  }

  if (!isOpen || !steps.length) return null

  const currentStepData = steps[currentStep]

  return (
    <>
      {/* Dark overlay with highlight cutout */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Tour tooltip */}
      <div
        ref={tooltipRef}
        className="pointer-events-auto"
      >
        <AnimatedSection animation="scaleIn" duration={0.3}>
          <div className="bg-gradient-to-r from-dark-card to-[#010a14] border border-pastel-blue/30 rounded-2xl p-6 shadow-2xl max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-pastel-blue/20 flex items-center justify-center mr-3">
                  <span className="text-pastel-blue font-bold text-sm">{currentStep + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{currentStepData.title}</h3>
              </div>
              <button
                onClick={skipTour}
                className="text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-white/20 hover:bg-white/30"
                aria-label="Close tour"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {currentStepData.content}
            </p>

            {/* Action hint */}
            {currentStepData.action && (
              <div className="mb-6 p-3 bg-pastel-blue/10 border border-pastel-blue/20 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-pastel-blue mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-pastel-blue text-xs font-medium">{currentStepData.action}</span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>

              <div className="flex items-center space-x-2">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                )}

                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-pastel-blue text-air-black text-sm font-semibold rounded-lg hover:bg-pastel-blue/80 transition-all duration-200"
                >
                  {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next'}
                </button>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentStep ? 'bg-pastel-blue' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}

// Hook for managing guided tour state
export const useGuidedTour = () => {
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    // Check if user has completed the tour before
    const hasCompletedTour = localStorage.getItem('roi-calculator-tour-completed')
    if (!hasCompletedTour) {
      setIsFirstVisit(true)
    }
  }, [])

  const startTour = () => {
    setIsTourOpen(true)
  }

  const closeTour = () => {
    setIsTourOpen(false)
  }

  const completeTour = () => {
    localStorage.setItem('roi-calculator-tour-completed', 'true')
    setIsFirstVisit(false)
    setIsTourOpen(false)
  }

  const resetTour = () => {
    localStorage.removeItem('roi-calculator-tour-completed')
    setIsFirstVisit(true)
  }

  return {
    isTourOpen,
    isFirstVisit,
    startTour,
    closeTour,
    completeTour,
    resetTour
  }
}
