import type React from 'react'
import { AnimatedSection } from './AnimatedSection'
import heroImage from '/new-hero-revalate.jpg'


interface HeroProps {
  onDemoClick: () => void
  onAIAgentsClick?: () => void
  onRevalateProClick?: () => void
}

// Optimized Hero Image Component for Mobile and Desktop Performance
const OptimizedHeroImage: React.FC = () => {
  return (
    <>
      {/* Responsive Hero Image optimized for all screen sizes */}
      <img
        src={heroImage}
        alt="Revalate AI Studio - Construction site with AI banner showcasing modern building development"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full
                   object-cover
                   object-center
                   sm:object-[center_35%]
                   md:object-[center_center]
                   lg:object-center
                   transition-transform duration-700 ease-out"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'auto'
        }}
        onLoad={(e) => {
          // Remove will-change after load for better performance
          const img = e.target as HTMLImageElement;
          img.style.willChange = 'auto';
        }}
        onError={(e) => {
          // Fallback if image fails to load
          const img = e.target as HTMLImageElement;
          console.error('Hero image failed to load, attempting reload');
          // Force reload without cache
          const timestamp = Date.now();
          img.src = `${heroImage}?t=${timestamp}`;
        }}
      />

      {/* Mobile overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 sm:hidden" />
    </>
  )
}

export const Hero: React.FC<HeroProps> = ({ onDemoClick, onAIAgentsClick, onRevalateProClick }) => {
  return (
    <section id="home" className="relative aspect-video sm:min-h-screen overflow-hidden">
      <OptimizedHeroImage />

      {/* Mobile-optimized scroll indicator - enhanced for mobile */}
      <div className="absolute bottom-4 sm:bottom-8 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-30">
        <AnimatedSection animation="slideUp" delay={800} duration={1}>
          <button
            onClick={() => {
              const nextSection = document.querySelector('.solutions-intro-section')
              nextSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-pastel-blue/90 backdrop-blur-sm rounded-full hover:bg-pastel-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 focus:ring-4 focus:ring-pastel-blue/50 min-w-touch min-h-touch"
            aria-label="Scroll to next section"
          >
            <svg
              className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 text-black-olive opacity-80 hover:opacity-100 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </AnimatedSection>
      </div>
    </section>
  )
}
