import type React from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { ArrowRight, ArrowDown, Zap, Cog, Settings, Cpu } from 'lucide-react'
import { useParallax } from '../hooks/useParallax'


interface SolutionsIntroSectionProps {
  onDemoClick: () => void
  onAIAgentsClick?: () => void
  onRevalateProClick?: () => void
}

export const SolutionsIntroSection: React.FC<SolutionsIntroSectionProps> = ({
  onDemoClick,
  onAIAgentsClick,
  onRevalateProClick
}) => {
  // Parallax effects for different background layers
  const parallax1 = useParallax({ speed: 0.1, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.15, direction: 'down' })



  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Light background with subtle pastel blue accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-pastel-blue/3 via-transparent to-pastel-blue/2" />

      {/* Large background text for section identity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[4rem] xs:text-[5rem] sm:text-[6rem] md:text-[12rem] lg:text-[15rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(-5deg)'
          }}
        >
          SOFTWARE
        </div>
      </div>

      {/* Enhanced parallax background elements with more animations */}
      <div
        ref={parallax1.elementRef}
        className="absolute inset-0 opacity-20"
        style={{ transform: parallax1.transform }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-pastel-blue/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-pastel-blue/15 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/6 right-1/6 w-16 h-16 border border-pastel-blue/10 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>

      <div
        ref={parallax2.elementRef}
        className="absolute inset-0 opacity-10"
        style={{ transform: parallax2.transform }}
      >
        <div className="absolute top-1/6 right-1/6 w-16 h-16 border border-pastel-blue/10 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/6 left-1/6 w-20 h-20 border border-pastel-blue/12 rounded-xl rotate-12 animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/8 w-12 h-12 border border-pastel-blue/8 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '4s' }} />
      </div>

      {/* Animated tech lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-pastel-blue/30 to-transparent animate-pulse" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-pastel-blue/20 via-transparent to-pastel-blue/20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-pastel-blue/20 via-transparent to-pastel-blue/20 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main content layout */}
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection animation="fadeIn" duration={1.2}>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-pastel-blue">Custom-Made AI Agents</span>
              <br />
              <span className="text-pastel-blue">&</span> <span className="text-pastel-blue">Construction Software</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-x11 max-w-4xl mx-auto leading-relaxed">
              Choose from our library of construction-specific AI agents or get custom software built for your unique workflows.
              Both paths lead to the same goal: <span className="text-pastel-blue font-semibold">automated efficiency and increased profits</span>.
            </p>
          </div>

          {/* Side-by-Side Software with enhanced animations */}
          <StaggeredAnimation
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16"
            staggerDelay={200}
            childAnimation="slideUp"
          >
            {/* AI Agents Solution with enhanced animations */}
            <div className="group relative">
              <div className="relative p-8 md:p-10 rounded-2xl border-2 border-pastel-blue/30 card-pastel-bg cursor-pointer overflow-hidden flex flex-col min-h-[400px] transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
                </div>

                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pastel-blue/40 via-transparent to-pastel-blue/40 animate-pulse" />
                </div>

                {/* Enhanced glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
                     style={{
                       boxShadow: '0 0 60px rgba(148,199,204,0.4), 0 0 100px rgba(148,199,204,0.2)'
                     }}>
                </div>

                {/* Enhanced floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-pastel-blue animate-ping" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-pastel-blue/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-pastel-blue/50 animate-bounce" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-pastel-blue/60 animate-ping" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute bottom-1/3 right-6 w-1.5 h-1.5 rounded-full bg-pastel-blue/40 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Solution Type Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue group-hover:bg-pastel-blue/40 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-x11 group-hover:text-pastel-blue transition-all duration-500 transform group-hover:translate-x-2">
                        AI Agents
                      </h3>
                      <p className="text-sm text-pastel-blue font-medium">Ready to Deploy</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-dark-liver leading-relaxed mb-8 group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-1 flex-grow">
                    Pre-built AI agents trained specifically for construction tasks. Deploy immediately with zero setup time and start automating your most time-consuming processes today.
                  </p>

                  {/* Enhanced Key Features with animations */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 group cursor-pointer" >
                      <div className="w-2 h-2 bg-pastel-blue rounded-full flex-shrink-0 animate-pulse" />
                      <span className="text-dark-liver text-sm md:text-base group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-2">Bid preparation & proposal generation</span>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer" >
                      <div className="w-2 h-2 bg-pastel-blue rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <span className="text-dark-liver text-sm md:text-base group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-2">Cost estimation & quantity takeoffs</span>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer" >
                      <div className="w-2 h-2 bg-pastel-blue rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '1s' }} />
                      <span className="text-dark-liver text-sm md:text-base group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-2">Expense tracking & financial reporting</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-3 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20">
                      <div className="text-lg font-bold text-pastel-blue">Within 24 Hours</div>
                      <div className="text-xs text-gray-x11">Setup Time</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20">
                      <div className="text-lg font-bold text-pastel-blue">80%+</div>
                      <div className="text-xs text-gray-x11">Time Saved</div>
                    </div>
                  </div>

                  {/* Enhanced Learn More Button */}
                  <div className="pt-4 border-t border-pastel-blue/20 mt-auto">
                    <button
                      onClick={() => {
                        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                      }}

                      className="flex items-center justify-between w-full text-pastel-blue group-hover:text-gray-x11 transition-all duration-500 hover:translate-y-1 p-2 rounded-lg hover:bg-pastel-blue/5"
                    >
                      <span className="font-medium group-hover:font-bold transition-all duration-300">Explore AI Agents</span>
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-1 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Revalate Pro Series Solution with enhanced animations */}
            <div className="group relative">
              <div className="relative p-8 md:p-10 rounded-2xl border-2 border-pastel-blue/30 card-pastel-bg cursor-pointer overflow-hidden flex flex-col min-h-[400px] transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
                </div>

                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pastel-blue/40 via-transparent to-pastel-blue/40 animate-pulse" />
                </div>

                {/* Enhanced glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none"
                     style={{
                       boxShadow: '0 0 60px rgba(148,199,204,0.4), 0 0 100px rgba(148,199,204,0.2)'
                     }}>
                </div>

                {/* Enhanced floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-pastel-blue animate-ping" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-pastel-blue/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-pastel-blue/50 animate-bounce" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-pastel-blue/60 animate-ping" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute bottom-1/3 right-6 w-1.5 h-1.5 rounded-full bg-pastel-blue/40 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Solution Type Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue group-hover:bg-pastel-blue/40 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out">
                      <Cog className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-x11 group-hover:text-pastel-blue transition-all duration-500 transform group-hover:translate-x-2">
                        Revalate Pro Series
                      </h3>
                      <p className="text-sm text-pastel-blue font-medium">Custom Built</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-dark-liver leading-relaxed mb-8 group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-1 flex-grow">
                    Custom low-code software built specifically for your unique construction workflows. Perfect for complex processes that need tailored automation.
                  </p>

                  {/* Enhanced Key Features with animations */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 group cursor-pointer" >
                      <div className="w-2 h-2 bg-pastel-blue rounded-full flex-shrink-0 animate-pulse" />
                      <span className="text-dark-liver text-sm md:text-base group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-2">Custom workflow automation</span>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer" >
                      <div className="w-2 h-2 bg-pastel-blue rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <span className="text-dark-liver text-sm md:text-base group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-2">System integrations & data sync</span>
                    </div>
                    <div className="flex items-center gap-3 group cursor-pointer" >
                      <div className="w-2 h-2 bg-pastel-blue rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '1s' }} />
                      <span className="text-dark-liver text-sm md:text-base group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-2">Ongoing support & maintenance</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-3 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20">
                      <div className="text-lg font-bold text-pastel-blue">2-4 Weeks</div>
                      <div className="text-xs text-gray-x11">Development</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20">
                      <div className="text-lg font-bold text-pastel-blue">100%</div>
                      <div className="text-xs text-gray-x11">Custom Fit</div>
                    </div>
                  </div>

                  {/* Enhanced Learn More Button */}
                  <div className="pt-4 border-t border-pastel-blue/20 mt-auto">
                    <button
                      onClick={() => {

                        document.getElementById('revalate-pro-series')?.scrollIntoView({ behavior: 'smooth' })
                      }}

                      className="flex items-center justify-between w-full text-pastel-blue group-hover:text-gray-x11 transition-all duration-500 hover:translate-y-1 p-2 rounded-lg hover:bg-pastel-blue/5"
                    >
                      <span className="font-medium group-hover:font-bold transition-all duration-300">Explore Pro Series</span>
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-1 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </StaggeredAnimation>

          {/* Decision Help Section */}
          <div className="text-center mt-12 sm:mt-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-pastel-blue animate-spin" style={{ animationDuration: '8s' }} />
              <h3 className="text-xl md:text-2xl font-bold text-gray-x11">Not Sure Which Solution Fits?</h3>
              <Cpu className="w-6 h-6 text-pastel-blue animate-pulse" />
            </div>

            <button
              onClick={() => {

                onDemoClick()
              }}

              className="relative px-8 py-4 bg-pastel-blue text-air-black rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <span>Talk to Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

        </AnimatedSection>
      </div>
    </section>
  )
}
