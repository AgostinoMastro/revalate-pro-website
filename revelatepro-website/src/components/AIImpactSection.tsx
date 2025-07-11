import type React from 'react'
import { AnimatedSection } from './AnimatedSection'

interface AIImpactSectionProps {
  onAIAgentsClick?: () => void
}

export const AIImpactSection: React.FC<AIImpactSectionProps> = ({ onAIAgentsClick }) => {
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-br from-pastel-blue/40 via-pastel-blue/30 to-pastel-blue/50">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <AnimatedSection animation="fadeIn" duration={1.2}>
          {/* Main content with background "80%" positioned behind */}
          <div className="text-center max-w-5xl mx-auto relative">
            {/* Large background text - "80%" positioned behind the copy */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black leading-none select-none tracking-tighter opacity-40"
                style={{
                  WebkitTextStroke: '3px rgba(255, 255, 255, 0.6)',
                  color: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  top: '50%',
                  left: '50%'
                }}
              >
                80%
              </div>
            </div>

            {/* Main message positioned on top of background "80%" */}
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                AI automation handles over
                <br />
                <span
                  className="font-black"
                  style={{
                    background: 'linear-gradient(135deg, #94C7CC 0%, #B8E6E9 50%, #94C7CC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 2px 20px rgba(148, 199, 204, 0.4)'
                  }}
                >
                  80% of construction work
                </span>
                {' '}every single project.
              </h2>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA button with proper spacing */}
        <AnimatedSection animation="slideUp" delay={300} duration={0.8}>
          <div className="text-center mt-32 mb-4">
            <button
              onClick={() => {
                if (onAIAgentsClick) {
                  onAIAgentsClick()
                } else {
                  // Fallback to scrolling to the features section (current agents)
                  const agentsSection = document.getElementById('features')
                  if (agentsSection) {
                    agentsSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl hover:bg-white/30 hover:border-white/60 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
              </div>
              <span className="text-white font-medium group-hover:text-white transition-colors duration-300">Experience AI Automation</span>
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
