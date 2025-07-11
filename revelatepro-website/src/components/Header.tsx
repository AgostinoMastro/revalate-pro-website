import type React from 'react'
import { useState, useEffect } from 'react'
import type { IndustryType } from '../hooks/useRouter'
import { useKeyboardNavigation, useFocusAnnouncement } from '../hooks/useKeyboardNavigation'
import { RevalateLogo } from './RevalateLogo'
import { Lightbulb } from 'lucide-react'

interface HeaderProps {
  onDemoClick: () => void
  onContactClick: () => void
  onPricingPlansClick?: () => void
  onROICalculatorClick?: () => void
  onIndustryNavigate?: (industry: IndustryType) => void
  onAboutClick?: () => void
  onAIAgentsClick?: () => void
  onRevalateProSeriesClick?: () => void
  onStartTour?: () => void
  onHomeClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onDemoClick,
  onContactClick,
  onPricingPlansClick,
  onROICalculatorClick,
  onIndustryNavigate,
  onAboutClick,
  onAIAgentsClick,
  onRevalateProSeriesClick,
  onStartTour,
  onHomeClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false)
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false)

  // Keyboard navigation for mobile menu
  const { containerRef: mobileMenuRef, focusFirst } = useKeyboardNavigation({
    enableTabTrapping: isMenuOpen,
    enableEscapeKey: true,
    onEscape: () => setIsMenuOpen(false)
  })

  // Focus announcement for screen readers
  const { announce } = useFocusAnnouncement()

  // Handle mobile menu toggle with accessibility
  const toggleMobileMenu = () => {
    const newMenuState = !isMenuOpen
    setIsMenuOpen(newMenuState)
    announce(newMenuState ? 'Mobile menu opened' : 'Mobile menu closed')

    if (newMenuState) {
      // Focus first item in mobile menu after opening
      setTimeout(() => focusFirst(), 100)
    }
  }

  // Close dropdowns when clicking outside or on escape
  useEffect(() => {
    const handleClickOutside = () => {
      setIndustriesDropdownOpen(false)
      setFeaturesDropdownOpen(false)
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIndustriesDropdownOpen(false)
        setFeaturesDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface-primary/95 backdrop-blur-md border-b border-border-light">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">

            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()

                // Direct navigation to home - set URL hash and scroll to top
                window.location.hash = ''
                window.scrollTo({ top: 0, behavior: 'smooth' })

                // Also trigger the router navigation for state consistency
                if (onHomeClick) {
                  onHomeClick()
                }
              }}
              className="transition-opacity duration-200 hover:opacity-80 min-w-touch min-h-touch flex items-center justify-center cursor-pointer"
              aria-label="Go to home page"
            >
              <RevalateLogo height={36} className="xs:h-8 sm:h-10" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">

            {/* Features Dropdown */}
            <div className="relative mr-10">
              <button
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center interactive-element min-h-touch px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setFeaturesDropdownOpen(!featuresDropdownOpen)
                  setIndustriesDropdownOpen(false) // Close other dropdown
                  announce(featuresDropdownOpen ? 'Services menu closed' : 'Services menu opened')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setFeaturesDropdownOpen(true)
                  }
                }}
                aria-expanded={featuresDropdownOpen}
                aria-haspopup="true"
                aria-controls="features-dropdown"
              >
                Services
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${featuresDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {featuresDropdownOpen && (
                <div
                  id="features-dropdown"
                  className="absolute top-full left-0 mt-2 w-56 bg-surface-secondary border border-border-light rounded-lg shadow-lg py-2 z-50"
                  role="menu"
                  aria-labelledby="features-dropdown-button"
                >
                  <button
                    onClick={() => {
                      if (onAIAgentsClick) {
                        onAIAgentsClick()
                      } else {
                        document.getElementById('current-agents')?.scrollIntoView({ behavior: 'smooth' })
                      }
                      setFeaturesDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-surface-primary transition-colors duration-200 min-h-touch"
                    role="menuitem"
                  >
                    AI Agents
                  </button>
                  <button
                    onClick={() => {
                      if (onRevalateProSeriesClick) {
                        onRevalateProSeriesClick()
                      } else {
                        document.getElementById('revalate-pro-series')?.scrollIntoView({ behavior: 'smooth' })
                      }
                      setFeaturesDropdownOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-surface-primary transition-colors duration-200 min-h-touch"
                    role="menuitem"
                  >
                    Revalate Pro Series
                  </button>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div className="relative mr-8">
              <button
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center interactive-element min-h-touch px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  setIndustriesDropdownOpen(!industriesDropdownOpen)
                  setFeaturesDropdownOpen(false) // Close other dropdown
                  announce(industriesDropdownOpen ? 'Industries menu closed' : 'Industries menu opened')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setIndustriesDropdownOpen(true)
                  }
                }}
                aria-expanded={industriesDropdownOpen}
                aria-haspopup="true"
                aria-controls="industries-dropdown"
              >
                Industries
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${industriesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {industriesDropdownOpen && (
                <div
                  id="industries-dropdown"
                  className="absolute top-full left-0 mt-2 w-60 bg-surface-secondary border border-border-light rounded-lg shadow-lg py-2 z-50"
                  role="menu"
                  aria-labelledby="industries-dropdown-button"
                >
                  {(['residential', 'ici'] as IndustryType[]).map((industry) => (
                    <button
                      key={industry}
                      onClick={() => {
                        if (onIndustryNavigate) {
                          onIndustryNavigate(industry)
                        }
                        setIndustriesDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-surface-primary transition-colors duration-200 capitalize min-h-touch"
                      role="menuitem"
                    >
                      {industry === 'ici' ? 'ICI Construction' : industry ? industry.charAt(0).toUpperCase() + industry.slice(1) : ''}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ROI Calculator */}
            {onROICalculatorClick && (
              <button
                onClick={onROICalculatorClick}
                className="text-gray-300 hover:text-white transition-colors duration-200 mr-6 min-h-touch px-2"
              >
                ROI Calculator
              </button>
            )}

            {onAboutClick ? (
              <button
                onClick={onAboutClick}
                className="text-gray-300 hover:text-white transition-colors duration-200 min-h-touch px-2"
              >
                About
              </button>
            ) : (
              <button
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-gray-300 hover:text-white transition-colors duration-200 min-h-touch px-2 flex items-center"
              >
                About
              </button>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {onStartTour && (
              <button
                onClick={onStartTour}
                className="px-4 py-2 text-sm border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center space-x-2 min-h-touch"
                aria-label="Start guided tour"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Tour</span>
              </button>
            )}
            <button
              onClick={onDemoClick}
              className="px-6 py-3 bg-pastel-blue text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 white-border-btn min-h-touch"
            >
              Talk to Us
            </button>
          </div>

          {/* Mobile Menu Button - Enhanced touch target */}
          <button
            className="lg:hidden text-white interactive-element focus-visible min-w-touch min-h-touch flex items-center justify-center -mr-2 p-3"
            onClick={toggleMobileMenu}
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Enhanced for mobile-first experience */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden mt-4 py-6 border-t border-dark-border modal-trap-focus"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-2">

              {/* Mobile Features */}
              <div className="space-y-2">
                <div className="text-gray-500 text-sm font-medium px-4 py-2">Services</div>
                <button
                  onClick={() => {
                    if (onAIAgentsClick) {
                      onAIAgentsClick()
                    } else {
                      document.getElementById('current-agents')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left pl-8 pr-4 py-4 text-lg text-gray-300 hover:text-white transition-colors duration-200 interactive-element min-h-touch rounded-lg hover:bg-white/5 mx-2"
                >
                  AI Agents
                </button>
                <button
                  onClick={() => {
                    if (onRevalateProSeriesClick) {
                      onRevalateProSeriesClick()
                    } else {
                      document.getElementById('revalate-pro-series')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left pl-8 pr-4 py-4 text-lg text-gray-300 hover:text-white transition-colors duration-200 interactive-element min-h-touch rounded-lg hover:bg-white/5 mx-2"
                >
                  Revalate Pro Series
                </button>

                {/* Mobile Industries */}
                <div className="border-t border-dark-border/30 mx-4 my-4" />
                <div className="text-gray-500 text-sm font-medium px-4 py-2">Industries</div>
                {(['residential', 'ici'] as IndustryType[]).map((industry) => (
                  <button
                    key={industry}
                    onClick={() => {
                      if (onIndustryNavigate) {
                        onIndustryNavigate(industry)
                      }
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left pl-8 pr-4 py-4 text-lg text-gray-300 hover:text-white transition-colors duration-200 interactive-element min-h-touch rounded-lg hover:bg-white/5 capitalize mx-2"
                  >
                    {industry === 'ici' ? 'ICI Construction' : industry ? industry.charAt(0).toUpperCase() + industry.slice(1) : ''}
                  </button>
                ))}

                {/* Mobile Other Links */}
                <div className="border-t border-dark-border/30 mx-4 my-4" />

                {onROICalculatorClick && (
                  <button
                    onClick={() => {
                      onROICalculatorClick()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left pl-8 pr-4 py-4 text-lg text-gray-300 hover:text-white transition-colors duration-200 interactive-element min-h-touch rounded-lg hover:bg-white/5 mx-2"
                  >
                    ROI Calculator
                  </button>
                )}

                {onAboutClick ? (
                  <button
                    onClick={() => {
                      onAboutClick()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left pl-8 pr-4 py-4 text-lg text-gray-300 hover:text-white transition-colors duration-200 interactive-element min-h-touch rounded-lg hover:bg-white/5 mx-2"
                  >
                    About
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left pl-8 pr-4 py-4 text-lg text-gray-300 hover:text-white transition-colors duration-200 interactive-element min-h-touch rounded-lg hover:bg-white/5 mx-2"
                  >
                    About
                  </button>
                )}

                {/* Mobile CTA Buttons */}
                <div className="border-t border-dark-border/30 mx-4 my-4" />
                <div className="px-4 py-4 space-y-4">
                  {onStartTour && (
                    <button
                      onClick={() => {
                        onStartTour()
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-6 py-4 text-base border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 min-h-touch"
                      aria-label="Start guided tour"
                    >
                      <Lightbulb className="w-5 h-5" />
                      <span>Tour</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      onDemoClick()
                    }}
                    className="w-full px-6 py-4 bg-pastel-blue text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 white-border-btn text-lg min-h-touch"
                  >
                    Talk to Us
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
        </div>
      </header>
    </>
  )
}
