import type React from 'react'
import { useState } from 'react'
import { AnimatedSection } from './AnimatedSection'
import { useParallax } from '../hooks/useParallax'
import { Quote, X } from 'lucide-react'
import kanDoLogo from '/images/kan-do-contracting-logo.jpeg'
import velocityBuildersLogo from '/images/velocity-builders-logo.png'

interface ClientTestimonial {
  logo: string
  companyName: string
  testimonial: string
  author: string
  title: string
  project: string
  savings: string
}

const clients: ClientTestimonial[] = [
  {
    logo: 'https://ext.same-assets.com/4263160406/3606874002.png',
    companyName: 'RBT Electric',
    testimonial: "These guys go above and beyond what we ask, reducing our 8 daily spreadsheets into 1 easy app.",
    author: 'Ryan Tittsworth',
    title: 'Project Director',
    project: 'Commercial Development',
    savings: '60% faster estimates'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/3030614577.png',
    companyName: 'Bayview Glass & Mirror',
    testimonial: "The task management AI has saved us countless hours. It automatically categorizes notes and tracks project updates through videos and photos. Our operating costs have reduced by 25%.",
    author: 'Sarah Rodriguez',
    title: 'Operations Manager',
    project: 'Residential Development',
    savings: '25% better margins'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/1162847766.png',
    companyName: 'Essential Soil Solutions',
    testimonial: "Nick & Aug are amazing. The best part of working with Revalate is I come up with a crazy idea and they make it a reality.",
    author: 'Matthew Cinelli',
    title: 'Owner',
    project: 'Soil & Aggregate Facility',
    savings: '45% reduction in document processing time'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/2732175690.png',
    companyName: 'Surrey Construction',
    testimonial: "The AI integration with our existing tools was seamless. QuickBooks, Google, everything syncs perfectly. It's like having an accountant built into our contruction software.",
    author: 'Anthony Cinelli',
    title: 'CEO',
    project: 'Mixed-Use Development',
    savings: '80% automation'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/2957825065.png',
    companyName: '360 Mechanical Group',
    testimonial: "Custom service ticketing and invoicing workflows built specifically for our specialty work. The AI understands our unique processes better than some of our senior staff.",
    author: 'Dean Muir',
    title: 'Chief Estimator',
    project: 'HVAC',
    savings: '3x faster invoicing'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/1095303915.png',
    companyName: 'New City Electric',
    testimonial: "Revalate has transformed how we manage getting out an estimate. The AI compiles the info coming from many sources, cross-references pricing and prepares my quotes before I even open the app.",
    author: 'Paul Lorefice',
    title: 'Project Manager',
    project: 'Residential & Commercial',
    savings: '80% of estimating work'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/560742562.jpeg',
    companyName: 'Semetre',
    testimonial: "The ROI was seen within 3 months. Being able to get rid of the spreadsheets that have taken me hours to fill out is game changing.",
    author: 'Mondo Marshall',
    title: 'President',
    project: 'Commercial Projects',
    savings: '30% more projects'
  },
  {
    logo: kanDoLogo,
    companyName: 'Kan-Do Contracting',
    testimonial: "This is awesome - with this in play I can grow my company. The best part? My kids are so happy they finally get time with their dad again!",
    author: 'Johnathan Swanton',
    title: 'Owner',
    project: 'Residential & Commercial Renovations',
    savings: 'Work-life balance restored'
  },
  {
    logo: velocityBuildersLogo,
    companyName: 'Barranco',
    testimonial: "Finally, my business feels under control. Everything’s in one place, and we turn jobs around faster than ever with AI!",
    author: 'Matthew Barranco',
    title: 'CEO',
    project: 'Commercial Projects',
    savings: '7x faster quoting'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/2406643610.png',
    companyName: 'Paravel Construction',
    testimonial: "The visibility on job costing help us avoid costly mistakes. We can see potential issues weeks in advance and take corrective action.",
    author: 'Vincent Detillieux',
    title: 'CEO',
    project: 'Commercial Contractor',
    savings: '85% cost prevention'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/725793201.png',
    companyName: 'LandPlay Developers',
    testimonial: "Revalate's AI has made us more competitive than ever. We're delivering projects faster, with better quality, and higher profits.",
    author: 'Manny Chehil',
    title: 'Owner',
    project: 'Multi-Family Housing',
    savings: '40% higher profits'
  },
  {
    logo: 'https://ext.same-assets.com/4263160406/2000198685.png',
    companyName: 'Nexus Construction Group',
    testimonial: "The learning curve was zero. The AI adapted to our workflows immediately and started providing value from day one. Best investment we've made.",
    author: 'Maria Santos',
    title: 'CFO',
    project: 'Retail Development',
    savings: 'Immediate ROI'
  }
]

export const TrustedByIndustryLeaders: React.FC = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<ClientTestimonial | null>(null)

  // Parallax effects for background elements
  const parallax1 = useParallax({ speed: 0.3, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.2, direction: 'down' })
  const parallax3 = useParallax({ speed: 0.1, direction: 'up' })

  // Create unique logo items with proper keys
  const logoItems = clients.map((client, index) => ({
    ...client,
    id: `logo-${index}-${Date.now()}`
  }))

  // Triple the logos for smooth infinite scroll
  const duplicatedLogos = [...logoItems, ...logoItems, ...logoItems]

  const handleLogoClick = (client: ClientTestimonial, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedTestimonial(client)
  }

  const closeTestimonial = () => {
    setSelectedTestimonial(null)
  }

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-air-black">
      {/* Enhanced background gradient with Air Black theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/30 to-transparent" />

      {/* Smooth transition edges */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-air-black via-air-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-air-black via-air-black/80 to-transparent" />

      {/* Mobile-optimized background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(-2deg)'
          }}
        >
          TRUSTED
        </div>
      </div>

      {/* Enhanced parallax background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pastel-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-black-olive/20 rounded-full blur-3xl" />
      </div>

      {/* Parallax moving elements */}
      <div
        ref={parallax1.elementRef}
        className="absolute inset-0 opacity-20"
        style={{ transform: parallax1.transform }}
      >
        <div className="absolute top-1/4 left-1/6 w-32 h-32 border border-pastel-blue/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border border-pastel-blue/15 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <div
        ref={parallax2.elementRef}
        className="absolute inset-0 opacity-15"
        style={{ transform: parallax2.transform }}
      >
        <div className="absolute top-1/2 left-1/8 w-16 h-16 border border-pastel-blue/10 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/6 right-1/8 w-20 h-20 border border-pastel-blue/12 rounded-xl rotate-12 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div
        ref={parallax3.elementRef}
        className="absolute inset-0 opacity-10"
        style={{ transform: parallax3.transform }}
      >
        <div className="absolute top-1/6 right-1/3 w-12 h-12 border border-pastel-blue/8 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-14 h-14 border border-pastel-blue/6 rounded-full animate-pulse" style={{ animationDelay: '5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection animation="fadeIn" delay={600} duration={0.8}>
          <div className="text-center">
            {/* Mobile-optimized section header */}
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12">
              <span className="text-pastel-blue">Trusted by Industry Leaders</span>
            </h2>

            {/* Subtitle with instruction */}
            <p className="text-lg sm:text-xl text-gray-x11 mb-12 sm:mb-16 max-w-3xl mx-auto">
              Join hundreds of construction companies already transforming their workflows with AI.
              <span className="block mt-2 text-sm text-pastel-blue">Click any logo to read their success story</span>
            </p>

            {/* Moving logo carousel - single row infinite scroll */}
            <div className="relative overflow-hidden py-8">
              {/* Single row - moving left to right */}
              <div className="flex whitespace-nowrap animate-scroll-right" style={{ paddingTop: '2rem', paddingBottom: '2rem', pointerEvents: 'auto' }}>
                {duplicatedLogos.map((item) => (
                  <div
                    key={item.id}
                    className="inline-block mx-8 sm:mx-10 group cursor-pointer logo-clickable"
                    style={{ padding: '1rem' }}
                  >
                    <div
                      className="flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 p-4 rounded-xl
                                bg-black-olive/30 border border-dark-liver/20 hover:border-pastel-blue/40
                                hover:bg-black-olive/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2
                                relative overflow-visible cursor-pointer"
                      onClick={(event) => handleLogoClick(item, event)}
                    >
                      {/* Animated glow effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                    bg-gradient-to-r from-pastel-blue/20 via-transparent to-pastel-blue/20 blur-lg -z-10
                                    scale-125" />

                      {/* Click indicator */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-pastel-blue rounded-full flex items-center justify-center
                                    opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                        <Quote className="w-3 h-3 text-air-black" />
                      </div>

                      <img
                        src={item.logo}
                        alt={`${item.companyName} logo`}
                        className="max-w-full max-h-full filter grayscale group-hover:grayscale-0
                                  transition-all duration-500 group-hover:scale-105 object-contain"
                      />

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                    translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform
                                    group-hover:duration-700 pointer-events-none rounded-xl" />
                    </div>

                    {/* Company name tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                                  opacity-0 group-hover:opacity-100 transition-all duration-300
                                  bg-black-olive/90 text-pastel-blue text-xs font-medium px-3 py-1 rounded-lg
                                  border border-pastel-blue/30 whitespace-nowrap">
                      {item.companyName}
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient overlays to create fade effect */}
              <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-air-black to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-air-black to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4 flex items-center justify-center"
          onClick={closeTestimonial}
        >
          <div
            className="bg-black-olive border-2 border-pastel-blue/50 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto
                       shadow-2xl transform transition-all duration-300 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-pastel-blue/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-black-olive/50 border border-pastel-blue/30 p-2 flex items-center justify-center">
                    <img
                      src={selectedTestimonial.logo}
                      alt={`${selectedTestimonial.companyName} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-x11">{selectedTestimonial.companyName}</h3>
                    <p className="text-sm text-pastel-blue">{selectedTestimonial.project}</p>
                  </div>
                </div>
                <button
                  onClick={closeTestimonial}
                  className="w-10 h-10 rounded-full bg-dark-liver/30 hover:bg-dark-liver/50 border border-dark-liver/50
                           flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <X className="w-5 h-5 text-gray-x11" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Quote */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-pastel-blue mb-4" />
                <blockquote className="text-lg text-gray-x11 leading-relaxed italic">
                  "{selectedTestimonial.testimonial}"
                </blockquote>
              </div>

              {/* Author & Results */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <div className="text-lg font-semibold text-pastel-blue">{selectedTestimonial.author}</div>
                  <div className="text-sm text-dark-liver">{selectedTestimonial.title}</div>
                  <div className="text-sm text-dark-liver">{selectedTestimonial.companyName}</div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="bg-neon-green/20 border border-neon-green/40 rounded-full px-4 py-2">
                    <span className="text-neon-green font-semibold text-sm">{selectedTestimonial.savings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom scrolling animations */}
      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        .logo-clickable {
          pointer-events: auto !important;
          cursor: pointer !important;
          position: relative;
          z-index: 20;
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-in {
          animation: animate-in 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
