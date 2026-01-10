import type React from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'

interface WhyRevalateProProps {
  onDemoClick: () => void
  onROICalculatorClick?: () => void
  isTutorialOpen?: boolean
  onCloseTutorial?: () => void
  onSkipTutorial?: () => void
}

const whyRevalateProFeatures = [
  {
    title: 'Built by Construction Professionals',
    description: 'Unlike generic software, Revalate AI Studio is designed by people who understand construction workflows because we\'ve lived them for 20+ years.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'AI That Actually Understands Construction',
    description: 'Our AI models are trained specifically on construction data, terminology, and workflows - not generic business processes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.621.504-1.125.988-1.754l-.548-.547z" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Seamless Integration with Your Existing Tools',
    description: 'Works with your current software stack - QuickBooks, Xero, Microsoft, Google, Bluebeam, DropBox, and more.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: 'pastel-blue'
  },
  {
    title: 'Results You Can Measure',
    description: 'Track every improvement with detailed analytics - time saved, costs reduced, and profits increased.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'pastel-blue'
  }
]

const WhyRevalatePro: React.FC<WhyRevalateProProps> = ({
  onDemoClick,
  onROICalculatorClick
}) => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-air-black via-black-olive/50 to-air-black">
      {/* Background matching the site's aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-r from-pastel-blue/8 via-pastel-blue/12 to-pastel-blue/8" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pastel-blue/5 to-transparent" />

      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/6 w-64 h-64 bg-pastel-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-pastel-blue/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Why Revalate AI Studio Features */}
        <AnimatedSection animation="slideUp" delay={200} duration={0.8}>
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-pastel-blue">Why Revalate AI Studio?</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-x11 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Built by construction professionals for construction professionals. Experience the difference of AI that truly understands your industry.
              </p>
            </div>

            {/* Features Grid */}
            <StaggeredAnimation
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch"
              staggerDelay={150}
              childAnimation="slideUp"
            >
              {whyRevalateProFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-8 lg:p-10 rounded-2xl bg-air-black/60 backdrop-blur-sm border border-pastel-blue/20
                            hover:border-pastel-blue/40 hover:bg-air-black/80 transition-all duration-300 hover:scale-105
                            min-h-[320px] flex flex-col relative overflow-hidden"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-pastel-blue/20 backdrop-blur-sm flex items-center justify-center mb-8
                                   text-pastel-blue group-hover:bg-pastel-blue/30 group-hover:scale-110 transition-all duration-300 border border-pastel-blue/30">
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-x11 group-hover:text-pastel-blue transition-colors duration-300 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-x11 opacity-80 leading-relaxed group-hover:opacity-100 transition-all duration-300 flex-grow text-lg">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-pastel-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </StaggeredAnimation>

            {/* Call to Action */}
            <div className="text-center mt-16 lg:mt-20">
              <AnimatedSection animation="fadeIn" delay={600}>
                <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-pastel-blue/10 backdrop-blur-sm border border-pastel-blue/20 rounded-2xl">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-x11 mb-2">
                      Ready to transform your construction business?
                    </h3>
                    <p className="text-gray-x11 opacity-80">
                      See how our AI agents can streamline your workflows and boost efficiency.
                    </p>
                  </div>
                  <button
                    onClick={onROICalculatorClick}
                    className="px-8 py-4 bg-pastel-blue text-air-black font-bold text-lg rounded-xl
                              hover:bg-pastel-blue/90 transition-all duration-300 hover:scale-105
                              shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    Get Your ROI Today
                  </button>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default WhyRevalatePro
