import type React from 'react'
import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { useIsMobile } from '../hooks/useMediaQuery'

// Lazy load the demo component
const SimplifiedDemo = lazy(() => import('./SimplifiedDemo'))

interface FullScreenDemoModalProps {
  isOpen: boolean
  onClose: () => void
  demoType: 'bid-generation' | 'estimation' | 'financial-monitoring'
  demoTitle: string
  demoSteps: Array<{
    action: string
    time: string
    result: string
  }>
  metrics: Record<string, string | undefined>
}

export const FullScreenDemoModal: React.FC<FullScreenDemoModalProps> = ({
  isOpen,
  onClose,
  demoType,
  demoTitle,
  demoSteps,
  metrics
}) => {
  const isMobile = useIsMobile()
  const [isClosing, setIsClosing] = useState(false)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // Match animation duration
  }

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('FullScreenDemoModal opened with:', { demoType, demoTitle, isOpen })
    }
  }, [isOpen, demoType, demoTitle])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 300ms ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      {/* Modal Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transform: isClosing ? 'scale(0.95)' : 'scale(1)',
          opacity: isClosing ? 0 : 1,
          transition: 'all 300ms ease'
        }}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pastel-blue/30 bg-black-olive/90 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-pastel-blue/20 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-pastel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">{demoTitle}</h2>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/30 text-white hover:text-gray-300 transition-colors duration-200 bg-white/20"
            aria-label="Close demo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Demo Steps Overview */}
        <div className="p-4 bg-black-olive/60 border-b border-pastel-blue/20">
          <h3 className="text-sm font-semibold text-pastel-blue mb-3">Demo Process:</h3>
          <div className="space-y-2">
            {demoSteps.map((step, index) => (
              <div key={`${step.action}-${index}`} className="flex items-center justify-between text-xs">
                <span className="text-white">{step.action}</span>
                <span className="text-gray-300 mx-2">{step.time}</span>
                <span className="text-pastel-blue">{step.result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="flex-1 p-4 overflow-auto">
          <AnimatedSection animation="fadeIn" duration={0.5}>
            <div className="h-full min-h-[400px] rounded-xl bg-black-olive/60 border border-pastel-blue/20 p-6">
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pastel-blue mb-4" />
                  <p className="text-white">Loading interactive demo...</p>
                </div>
              }>
                <div className="w-full h-full">
                  {/* Test content to verify modal is working */}
                  <div className="mb-4 p-4 bg-pastel-blue/10 rounded-lg border border-pastel-blue/30">
                    <h4 className="text-pastel-blue font-semibold mb-2">🎯 Demo Ready</h4>
                    <p className="text-white text-sm">
                      Interactive {demoType} demo is now loading. This showcases real AI automation in action.
                    </p>
                  </div>

                  <SimplifiedDemo
                    demoType={demoType}
                    isActive={isOpen && !isClosing}
                    onDemoComplete={() => {}}
                    className="text-white w-full h-full"
                  />
                </div>
              </Suspense>
            </div>
          </AnimatedSection>
        </div>

        {/* Metrics Footer */}
        <div className="p-4 bg-black-olive/80 border-t border-pastel-blue/20">
          <h3 className="text-sm font-semibold text-pastel-blue mb-3 text-center">Expected Results:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(metrics)
              .filter(([key, value]) => value !== undefined)
              .map(([key, value]) => (
                <div key={`metric-${key}`} className="text-center p-3 rounded-lg bg-air-black/50 border border-dark-liver/20">
                  <div className="text-lg font-bold text-pastel-blue">{value}</div>
                  <div className="text-xs text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Mobile-specific touch hint */}
        {isMobile && (
          <div className="px-4 pb-2">
            <p className="text-xs text-center text-gray-300">
              💡 Swipe down or tap outside to close
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
