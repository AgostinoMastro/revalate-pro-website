import { useState, useEffect } from 'react'

export type PageType = 'home' | 'pricing-landing' | 'industry' | 'roi-calculator' | 'ai-agents' | 'revalate-pro-series' | 'about'
export type IndustryType = 'residential' | 'ici' | null

export const useRouter = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [currentIndustry, setCurrentIndustry] = useState<IndustryType>(null)

  useEffect(() => {
    // Check URL hash to determine initial page
    const hash = window.location.hash.slice(1) // Remove the #

    if (hash === 'pricing-plans') {
      setCurrentPage('pricing-landing')
    } else if (hash === 'roi-calculator') {
      setCurrentPage('roi-calculator')
    } else if (hash === 'ai-agents') {
      setCurrentPage('ai-agents')
    } else if (hash === 'revalate-pro-series') {
      setCurrentPage('revalate-pro-series')
    } else if (hash === 'about') {
      setCurrentPage('about')
    } else if (hash.startsWith('industry/')) {
      const industry = hash.split('/')[1] as IndustryType
      if (['residential', 'ici'].includes(industry || '')) {
        setCurrentPage('industry')
        setCurrentIndustry(industry)
      }
    } else {
      setCurrentPage('home')
      setCurrentIndustry(null)
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1)
      console.log('Hash changed to:', newHash)

      if (newHash === 'pricing-plans') {
        console.log('Setting page to pricing-landing')
        setCurrentPage('pricing-landing')
        setCurrentIndustry(null)
      } else if (newHash === 'roi-calculator') {
        console.log('Setting page to roi-calculator')
        setCurrentPage('roi-calculator')
        setCurrentIndustry(null)
      } else if (newHash === 'ai-agents') {
        console.log('Setting page to ai-agents')
        setCurrentPage('ai-agents')
        setCurrentIndustry(null)
      } else if (newHash === 'revalate-pro-series') {
        console.log('Setting page to revalate-pro-series')
        setCurrentPage('revalate-pro-series')
        setCurrentIndustry(null)
      } else if (newHash === 'about') {
        console.log('Setting page to about')
        setCurrentPage('about')
        setCurrentIndustry(null)
      } else if (newHash.startsWith('industry/')) {
        const industry = newHash.split('/')[1] as IndustryType
        if (['residential', 'ici'].includes(industry || '')) {
          console.log('Setting page to industry:', industry)
          setCurrentPage('industry')
          setCurrentIndustry(industry)
        }
      } else {
        console.log('Setting page to home (empty hash)')
        setCurrentPage('home')
        setCurrentIndustry(null)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page: PageType, industry?: IndustryType) => {
    console.log('navigateTo called with page:', page, 'industry:', industry)
    console.log('Current page before navigation:', currentPage)

    setCurrentPage(page)

    if (page === 'pricing-landing') {
      window.location.hash = 'pricing-plans'
      setCurrentIndustry(null)
    } else if (page === 'roi-calculator') {
      window.location.hash = 'roi-calculator'
      setCurrentIndustry(null)
    } else if (page === 'ai-agents') {
      window.location.hash = 'ai-agents'
      setCurrentIndustry(null)
    } else if (page === 'revalate-pro-series') {
      window.location.hash = 'revalate-pro-series'
      setCurrentIndustry(null)
    } else if (page === 'about') {
      window.location.hash = 'about'
      setCurrentIndustry(null)
    } else if (page === 'industry' && industry) {
      window.location.hash = `industry/${industry}`
      setCurrentIndustry(industry)
    } else {
      console.log('Navigating to home - clearing hash')
      window.location.hash = ''
      setCurrentIndustry(null)
    }

    console.log('New hash set to:', window.location.hash)
    console.log('Page state set to:', page)

    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHome = () => {
    console.log('navigateToHome called')
    navigateTo('home')
  }

  const navigateToPricingLanding = () => navigateTo('pricing-landing')

  const navigateToROICalculator = () => navigateTo('roi-calculator')

  const navigateToAIAgents = () => navigateTo('ai-agents')

  const navigateToRevalateProSeries = () => navigateTo('revalate-pro-series')

  const navigateToAbout = () => navigateTo('about')

  const navigateToIndustry = (industry: IndustryType) => {
    if (industry) {
      navigateTo('industry', industry)
    }
  }

  const navigateToMainPricing = () => {
    setCurrentPage('home')
    setCurrentIndustry(null)
    window.location.hash = 'pricing'
    // Small delay to ensure hash is set before scrolling
    setTimeout(() => {
      const pricingElement = document.getElementById('pricing')
      if (pricingElement) {
        pricingElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return {
    currentPage,
    currentIndustry,
    navigateTo,
    navigateToHome,
    navigateToPricingLanding,
    navigateToROICalculator,
    navigateToAIAgents,
    navigateToRevalateProSeries,
    navigateToAbout,
    navigateToIndustry,
    navigateToMainPricing
  }
}
