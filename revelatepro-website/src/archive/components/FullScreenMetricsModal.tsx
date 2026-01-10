import type React from 'react'
import { PortalModal } from './PortalModal'
import { useIsMobile } from '../hooks/useMediaQuery'
import PDFDocumentView from './PDFDocumentView'
import { Smartphone, Lightbulb } from 'lucide-react'

interface FullScreenMetricsModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  demoType?: string
  showPDFDocument?: boolean
}

export const FullScreenMetricsModal: React.FC<FullScreenMetricsModalProps> = ({
  isOpen,
  onClose,
  children,
  title = "Performance Metrics",
  demoType = 'bid-generation',
  showPDFDocument = true
}) => {
  const isMobile = useIsMobile()

  console.log('FullScreenMetricsModal render:', {
    isOpen,
    isMobile,
    viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'SSR',
    demoType,
    showPDFDocument,
    timestamp: new Date().toLocaleTimeString()
  })

  if (!isOpen) return null

  const handleClose = () => {
    console.log('Full-screen modal closed:', {
      isMobile,
      method: 'handleClose',
      timestamp: new Date().toLocaleTimeString()
    })
    onClose()
  }

  return (
    <PortalModal isOpen={isOpen} onClose={handleClose}>
      <div
        className="w-full h-full max-w-none mx-0 bg-black-olive border-2 border-pastel-blue overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(148, 199, 204, 0.08) 0%, rgba(52, 58, 58, 0.95) 50%, rgba(148, 199, 204, 0.05) 100%)',
          boxShadow: '0 25px 50px rgba(148, 199, 204, 0.4)',
          borderRadius: isMobile ? '0' : '24px',
          maxHeight: '100vh',
          maxWidth: '100vw'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-pastel-blue/30 bg-black-olive/95 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-pastel-blue/20 flex items-center justify-center mr-3 border border-pastel-blue/40">
              <svg className="w-5 h-5 text-pastel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-x11">{title}</h2>
              <p className="text-sm text-dark-liver">
                {showPDFDocument ? 'Complete generated document' : 'Full-screen metrics view'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 sm:p-3 rounded-lg hover:bg-white/30 text-white hover:text-white transition-colors duration-200"
            aria-label="Close metrics view"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area with full document scroll */}
        <div className="h-full overflow-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {showPDFDocument ? (
            <div className="p-4 sm:p-6">
              {/* PDF Document View */}
              <PDFDocumentView
                demoType={demoType}
                className="w-full"
              />

              {/* Optional: Include metrics below the document */}
              <div className="mt-8 p-6 bg-black-olive/60 rounded-xl border border-pastel-blue/30">
                <h3 className="text-lg font-bold text-gray-x11 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pastel-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Performance Metrics
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 overflow-auto">
              <div className="space-y-4 sm:space-y-6">
                {children}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 sm:p-6 bg-black-olive/95 backdrop-blur-sm border-t border-pastel-blue/20">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-dark-liver mb-2 flex items-center justify-center gap-2">
              <Smartphone className="w-3 h-3 text-pastel-blue" />
              <span>{showPDFDocument ? 'Swipe or scroll to view complete document' : 'Optimized for mobile viewing'}</span>
            </p>
            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pastel-blue to-pastel-blue/80 text-air-black font-bold rounded-xl hover:from-pastel-blue/90 hover:to-pastel-blue/70 transition-all duration-200 shadow-lg"
            >
              Close Full Screen
            </button>
          </div>
        </div>
      </div>
    </PortalModal>
  )
}

// Full-screen button component to trigger the modal
interface FullScreenButtonProps {
  onClick: () => void
  className?: string
}

export const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  onClick,
  className = ''
}) => {
  const isMobile = useIsMobile()

  console.log('FullScreenButton render:', {
    isMobile,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'SSR',
    shouldShow: isMobile,
    timestamp: new Date().toLocaleTimeString()
  })

  if (!isMobile) {
    console.log('FullScreenButton: Hidden (not mobile)', {
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 'unknown'
    })
    return null // Only show on mobile
  }

  const handleClick = () => {
    console.log('MOBILE METRICS TEST: Full-screen button clicked!', {
      isMobile,
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
      timestamp: new Date().toLocaleTimeString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    })
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-pastel-blue/20 hover:bg-pastel-blue/30 border border-pastel-blue/40 rounded-lg text-pastel-blue hover:text-white transition-all duration-200 text-sm font-medium ${className}`}
      aria-label="View metrics in full screen"
      style={{ minHeight: '44px', minWidth: '120px' }} // Ensure proper touch targets
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
      <span>Full Screen</span>
    </button>
  )
}

// Development helper functions for testing
export const testFullScreenModal = () => {
  console.log('=== MOBILE FULL-SCREEN MODAL TEST ===')
  console.log('Screen dimensions:', {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 768,
    pixelRatio: window.devicePixelRatio
  })
  console.log('Device info:', {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    touchPoints: navigator.maxTouchPoints
  })
  console.log('Viewport meta tag:', document.querySelector('meta[name="viewport"]')?.getAttribute('content'))

  // Test button visibility
  const buttons = document.querySelectorAll('[aria-label="View metrics in full screen"]')
  console.log(`Found ${buttons.length} full-screen buttons`)

  // Test modal containers
  const modalContainer = document.querySelector('#portal-modal-container')
  console.log('Modal container present:', !!modalContainer)

  return {
    isMobile: window.innerWidth <= 768,
    buttonsFound: buttons.length,
    hasModalContainer: !!modalContainer
  }
}

export const forceShowFullScreenButton = () => {
  console.log('Forcing full-screen button visibility for testing')
  const buttons = document.querySelectorAll('[aria-label="View metrics in full screen"]')
  for (const button of buttons) {
    if (button instanceof HTMLElement) {
      button.style.display = 'inline-flex'
      console.log('Button made visible:', button)
    }
  }
}

export const checkModalPositioning = () => {
  const modal = document.querySelector('#portal-modal-container')
  if (modal) {
    const rect = modal.getBoundingClientRect()
    console.log('Modal positioning:', {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      viewportCoverage: {
        width: `${(rect.width / window.innerWidth * 100).toFixed(1)}%`,
        height: `${(rect.height / window.innerHeight * 100).toFixed(1)}%`
      }
    })
  } else {
    console.log('No modal container found')
  }
}

// Comprehensive mobile testing function
export const runMobileMetricsTest = () => {
  console.log('=== MOBILE FULL-SCREEN METRICS TESTING SUITE ===')
  console.log('=================================================')
  console.log('=================================================')

  const results = {
    deviceDetection: false,
    buttonVisibility: false,
    modalFunctionality: false,
    positioning: false,
    accessibility: false
  }

  // Test 1: Device Detection
  console.log('\nTest 1: Device Detection')
  const isMobile = window.innerWidth <= 768
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  console.log('Mobile detected:', isMobile)
  console.log('Touch capability:', hasTouch)
  console.log('Viewport:', `${window.innerWidth}x${window.innerHeight}`)
  results.deviceDetection = isMobile

  // Test 2: Button Visibility
  console.log('\n🔘 Test 2: Full-Screen Button Visibility')
  const buttons = document.querySelectorAll('[aria-label="View metrics in full screen"]')
  console.log(`Found ${buttons.length} full-screen buttons`)
  buttons.forEach((button, index) => {
    const rect = button.getBoundingClientRect()
    const isVisible = rect.width > 0 && rect.height > 0
    console.log(`Button ${index + 1}:`, {
      visible: isVisible,
      size: `${rect.width}x${rect.height}`,
      position: `${rect.left}, ${rect.top}`,
      touchTarget: rect.width >= 44 && rect.height >= 44 ? '✅' : '❌'
    })
  })
  results.buttonVisibility = buttons.length > 0

  // Test 3: Simulate Button Click (if mobile)
  console.log('\nTest 3: Button Interaction Test')
  if (buttons.length > 0 && isMobile) {
    console.log('Simulating button click...')
    const button = buttons[0] as HTMLElement
    button.click()

    // Check if modal appeared
    setTimeout(() => {
      const modalContainer = document.querySelector('#portal-modal-container')
      const modalVisible = modalContainer && window.getComputedStyle(modalContainer).display !== 'none'
      console.log('Modal appeared after click:', !!modalVisible)
      results.modalFunctionality = !!modalVisible

      if (modalVisible) {
        // Test 4: Modal Positioning
        console.log('\n🎨 Test 4: Modal Positioning')
        checkModalPositioning()
        const rect = modalContainer?.getBoundingClientRect()
        if (rect) {
          const coversViewport = rect.width >= window.innerWidth * 0.9 && rect.height >= window.innerHeight * 0.9
          console.log('Covers most of viewport:', coversViewport)
          results.positioning = coversViewport
        }

        // Test 5: Accessibility
        console.log('\n♿ Test 5: Accessibility Features')
        const closeButtons = modalContainer?.querySelectorAll('button')
        console.log(`Found ${closeButtons?.length || 0} close buttons in modal`)

        // Check aria labels
        const hasAriaLabels = closeButtons ? Array.from(closeButtons).some(btn => btn.getAttribute('aria-label')) : false
        console.log('Has aria labels:', hasAriaLabels)

        // Test escape key
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(escapeEvent)
        console.log('Escape key test triggered')

        results.accessibility = hasAriaLabels

        // Close modal after tests
        setTimeout(() => {
          const firstCloseButton = closeButtons?.[0] as HTMLElement
          if (firstCloseButton) firstCloseButton.click()
        }, 1000)
      }
    }, 500)
  } else if (!isMobile) {
    console.log('Skipping interaction test - not mobile viewport')
  } else {
    console.log('No buttons found to test')
  }

  // Summary
  setTimeout(() => {
    console.log('\n===========================================')
    console.log('MOBILE TESTING RESULTS SUMMARY')
    console.log('===========================================')
    console.log('Device Detection:', results.deviceDetection ? '✅ PASS' : '❌ FAIL')
    console.log('Button Visibility:', results.buttonVisibility ? '✅ PASS' : '❌ FAIL')
    console.log('Modal Functionality:', results.modalFunctionality ? '✅ PASS' : '❌ FAIL')
    console.log('Positioning:', results.positioning ? '✅ PASS' : '❌ FAIL')
    console.log('Accessibility:', results.accessibility ? '✅ PASS' : '❌ FAIL')

    const passCount = Object.values(results).filter(Boolean).length
    const totalTests = Object.keys(results).length
    console.log(`\n🎯 Overall Score: ${passCount}/${totalTests} tests passed`)

    if (passCount === totalTests) {
      console.log('ALL TESTS PASSED! Mobile metrics functionality is working perfectly!')
    } else {
      console.log('⚠️  Some tests failed. Check individual test results above.')
    }
  }, 2000)

  return results
}

// Quick mobile simulation for desktop testing
export const simulateMobileViewport = () => {
  console.log('Simulating mobile viewport for testing...')

  // Temporarily resize viewport
  const originalWidth = window.innerWidth
  const originalHeight = window.innerHeight

  // Note: This doesn't actually resize the viewport in production,
  // but logs what would happen
  console.log('Would resize viewport to mobile size (375x667)')
  console.log('Current viewport:', `${originalWidth}x${originalHeight}`)
  console.log('To properly test mobile, use browser dev tools device simulation')

  // Trigger a test run
  runMobileMetricsTest()
}
