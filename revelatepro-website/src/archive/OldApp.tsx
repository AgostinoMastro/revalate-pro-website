import type React from 'react'
import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { SolutionsIntroSection } from './components/SolutionsIntroSection'
import { AIImpactSection } from './components/AIImpactSection'
import { CurrentAgents } from './components/CurrentAgents'
import WhyRevalatePro from './components/WhyRevalatePro'
import { useTutorialState, DemoTutorialOverlay } from './components/DemoTutorialOverlay'
import { TrustedByIndustryLeaders } from './components/TrustedByIndustryLeaders'
import { FAQ } from './components/FAQ'
import { AboutPage } from './components/AboutPage'
import { AIAgentsLanding } from './components/AIAgentsLanding'
import { RevalateProSeriesLanding } from './components/RevalateProSeriesLanding'

import { RevalateProSeries } from './components/RevalateProSeries'
import { PricingLanding } from './components/PricingLanding'
import { IndustryLanding } from './components/IndustryLanding'
import ROICalculator from './components/ROICalculator'
import { OnboardingFlow } from './components/OnboardingFlow'
import { ContactModal } from './components/ContactModal'
import { useContactModal } from './hooks/useContactModal'
import { useRouter, type IndustryType } from './hooks/useRouter'
import { useOrientationFix } from './hooks/useMediaQuery'

import ScrollProgressIndicator from './components/ScrollProgressIndicator'
import { PageTransition, usePageNavigation } from './components/PageTransition'

function App() {
  const contactModal = useContactModal()
  const router = useRouter()
  const { showTutorial, showTutorialManually, closeTutorial, skipTutorial } = useTutorialState()

  // Fix mobile orientation change layout issues
  useOrientationFix()

  const [showOnboarding, setShowOnboarding] = useState(false)

  // Transition states
  const { isTransitioning, navigateWithTransition } = usePageNavigation()

  const handleROICalculatorClick = () => {
    navigateWithTransition(() => {
      router.navigateToROICalculator()
    })
  }

  // Enhanced navigation functions with transitions
  const handleNavigateToDemo = () => {
    console.log('🏠 handleNavigateToDemo called from home page')
    console.log('contactModal.openModal:', contactModal.openModal)
    contactModal.openModal('demo')
  }

  const handleNavigateToPricing = () => {
    navigateWithTransition(() => {
      router.navigateToPricingLanding()
    })
  }

  const handleNavigateToIndustry = (industry: IndustryType) => {
    navigateWithTransition(() => {
      router.navigateToIndustry(industry)
    })
  }

  const handleNavigateToHome = () => {
    // Force refresh home state and clear any routing issues
    window.location.hash = ''
    router.navigateToHome()
    // Ensure scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  // Industry-specific landing pages
  if (router.currentPage === 'industry' && router.currentIndustry) {
    return (
      <div className="min-h-screen text-text-primary bg-surface-primary">
        <Header
          onDemoClick={() => contactModal.openModal('demo')}
          onContactClick={() => contactModal.openModal('contact')}
          onPricingPlansClick={router.navigateToPricingLanding}
          onROICalculatorClick={handleROICalculatorClick}
          onIndustryNavigate={router.navigateToIndustry}
          onAboutClick={router.navigateToAbout}
          onAIAgentsClick={router.navigateToAIAgents}
          onRevalateProSeriesClick={router.navigateToRevalateProSeries}
          onHomeClick={handleNavigateToHome}
        />
        <main id="main-content">
          <IndustryLanding
            industry={router.currentIndustry}
            onDemoClick={() => contactModal.openModal('demo')}
          />
        </main>
        <Footer />
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={contactModal.closeModal}
          defaultTab={contactModal.defaultTab}
        />
      </div>
    )
  }

  // ROI Calculator page
  if (router.currentPage === 'roi-calculator') {
    return (
      <div className="min-h-screen text-text-primary bg-surface-primary">
        <Header
          onDemoClick={() => contactModal.openModal('demo')}
          onContactClick={() => contactModal.openModal('contact')}
          onPricingPlansClick={router.navigateToPricingLanding}
          onROICalculatorClick={handleROICalculatorClick}
          onIndustryNavigate={router.navigateToIndustry}
          onAboutClick={router.navigateToAbout}
          onAIAgentsClick={router.navigateToAIAgents}
          onRevalateProSeriesClick={router.navigateToRevalateProSeries}
          onHomeClick={handleNavigateToHome}
        />
        <main id="main-content">
          <ROICalculator
            onDemoClick={() => contactModal.openModal('demo')}
            isModal={false}
          />
        </main>
        <Footer />
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={contactModal.closeModal}
          defaultTab={contactModal.defaultTab}
        />
      </div>
    )
  }

  // About page
  if (router.currentPage === 'about') {
    return (
      <div className="min-h-screen text-text-primary bg-surface-primary">
        <Header
          onDemoClick={() => contactModal.openModal('demo')}
          onContactClick={() => contactModal.openModal('contact')}
          onPricingPlansClick={router.navigateToPricingLanding}
          onROICalculatorClick={handleROICalculatorClick}
          onIndustryNavigate={router.navigateToIndustry}
          onAboutClick={router.navigateToAbout}
          onAIAgentsClick={router.navigateToAIAgents}
          onRevalateProSeriesClick={router.navigateToRevalateProSeries}
          onHomeClick={handleNavigateToHome}
        />
        <main id="main-content">
          <AboutPage
            onDemoClick={() => {
              console.log('ℹ️ About page demo button clicked')
              console.log('contactModal:', contactModal)
              contactModal.openModal('demo')
            }}
          />
        </main>
        <Footer />
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={contactModal.closeModal}
          defaultTab={contactModal.defaultTab}
        />
      </div>
    )
  }

  // AI Agents page
  if (router.currentPage === 'ai-agents') {
    return (
      <div className="min-h-screen text-text-primary bg-surface-primary">
        <Header
          onDemoClick={() => contactModal.openModal('demo')}
          onContactClick={() => contactModal.openModal('contact')}
          onPricingPlansClick={router.navigateToPricingLanding}
          onROICalculatorClick={handleROICalculatorClick}
          onIndustryNavigate={router.navigateToIndustry}
          onAboutClick={router.navigateToAbout}
          onAIAgentsClick={router.navigateToAIAgents}
          onRevalateProSeriesClick={router.navigateToRevalateProSeries}
          onHomeClick={handleNavigateToHome}
        />
        <main id="main-content">
          <AIAgentsLanding
            onDemoClick={() => {
              console.log('🤖 AI Agents page demo button clicked')
              console.log('contactModal:', contactModal)
              contactModal.openModal('demo')
            }}
          />
        </main>
        <Footer />
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={contactModal.closeModal}
          defaultTab={contactModal.defaultTab}
        />
      </div>
    )
  }

  // Revalate Pro Series page
  if (router.currentPage === 'revalate-pro-series') {
    return (
      <div className="min-h-screen text-text-primary bg-surface-primary">
        <Header
          onDemoClick={() => contactModal.openModal('demo')}
          onContactClick={() => contactModal.openModal('contact')}
          onPricingPlansClick={router.navigateToPricingLanding}
          onROICalculatorClick={handleROICalculatorClick}
          onIndustryNavigate={router.navigateToIndustry}
          onAboutClick={router.navigateToAbout}
          onAIAgentsClick={router.navigateToAIAgents}
          onRevalateProSeriesClick={router.navigateToRevalateProSeries}
          onHomeClick={handleNavigateToHome}
        />
        <main id="main-content">
          <RevalateProSeriesLanding
            onDemoClick={() => {
              console.log('🚀 Revalate Pro Series page demo button clicked')
              console.log('contactModal:', contactModal)
              contactModal.openModal('demo')
            }}
          />
        </main>
        <Footer />
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={contactModal.closeModal}
          defaultTab={contactModal.defaultTab}
        />
      </div>
    )
  }

  // Pricing Landing page
  if (router.currentPage === 'pricing-landing') {
    return (
      <div className="min-h-screen text-text-primary bg-surface-primary">
        <Header
          onDemoClick={() => contactModal.openModal('demo')}
          onContactClick={() => contactModal.openModal('contact')}
          onPricingPlansClick={router.navigateToPricingLanding}
          onROICalculatorClick={handleROICalculatorClick}
          onIndustryNavigate={router.navigateToIndustry}
          onAboutClick={router.navigateToAbout}
          onAIAgentsClick={router.navigateToAIAgents}
          onRevalateProSeriesClick={router.navigateToRevalateProSeries}
          onHomeClick={handleNavigateToHome}
        />
        <main id="main-content">
          <PricingLanding
            onDemoClick={() => {
              console.log('💰 Pricing page demo button clicked')
              console.log('contactModal:', contactModal)
              contactModal.openModal('demo')
            }}
            onMainPricingClick={router.navigateToMainPricing}
          />
        </main>
        <Footer />
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={contactModal.closeModal}
          defaultTab={contactModal.defaultTab}
        />
      </div>
    )
  }

  // Default Home page
  return (
    <div className="min-h-screen text-text-primary bg-surface-primary">
      <Header
        onDemoClick={handleNavigateToDemo}
        onContactClick={() => contactModal.openModal('contact')}
        onPricingPlansClick={handleNavigateToPricing}
        onROICalculatorClick={handleROICalculatorClick}
        onIndustryNavigate={handleNavigateToIndustry}
        onAboutClick={router.navigateToAbout}
        onAIAgentsClick={router.navigateToAIAgents}
        onRevalateProSeriesClick={router.navigateToRevalateProSeries}
        onStartTour={showTutorialManually}
        onHomeClick={handleNavigateToHome}
      />

      <main id="main-content">
        <div className="hero-section">
          <Hero onDemoClick={handleNavigateToDemo} />
        </div>
        <div className="solutions-intro-section">
          <SolutionsIntroSection
            onDemoClick={handleNavigateToDemo}
            onAIAgentsClick={router.navigateToAIAgents}
            onRevalateProClick={router.navigateToRevalateProSeries}
          />
        </div>
        <div className="current-agents-section">
          <CurrentAgents
            onDemoClick={handleNavigateToDemo}
            onRevalateProClick={router.navigateToRevalateProSeries}
          />
        </div>
        <AIImpactSection onAIAgentsClick={router.navigateToAIAgents} />
        <div className="why-revalate-pro-section">
          <WhyRevalatePro
            onDemoClick={handleNavigateToDemo}
            onROICalculatorClick={router.navigateToROICalculator}
          />
        </div>
        <div id="revalate-pro-series" className="revalate-pro-series-section">
          <RevalateProSeries onDemoClick={handleNavigateToDemo} />
        </div>
        <div className="trusted-by-section">
          <TrustedByIndustryLeaders />
        </div>
        <FAQ onDemoClick={handleNavigateToDemo} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={contactModal.closeModal}
        defaultTab={contactModal.defaultTab}
      />

      {/* Global Components */}
      <ScrollProgressIndicator />

      {/* Demo Tutorial */}
      {showTutorial && (
        <DemoTutorialOverlay
          isOpen={showTutorial}
          onClose={closeTutorial}
          onSkip={skipTutorial}
        />
      )}

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={() => setShowOnboarding(false)}
        />
      )}

      {/* Demo Tutorial */}
      {showTutorial && (
        <DemoTutorialOverlay
          isOpen={showTutorial}
          onClose={closeTutorial}
          onSkip={skipTutorial}
        />
      )}
    </div>
  )
}

export default App
