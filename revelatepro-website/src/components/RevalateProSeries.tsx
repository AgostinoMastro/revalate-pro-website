import type React from 'react'
import { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { Code, Cog, Zap, ArrowRight, Monitor, Target, Clock } from 'lucide-react'

interface RevalateProSeriesProps {
  onDemoClick: () => void
}

// Expanded content interface for service cards
interface ExpandedContent {
  keyPainPoints: string[]
  capabilities: string[]
  benefits: string[]
}

// Enhanced service interface
interface ProService {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  color: string
  expandedContent: ExpandedContent
}

const proServices: ProService[] = [
  {
    id: 'custom-development',
    title: 'Custom Low-Code Software',
    description: 'We build custom software for your construction business using modern low-code tools that make changes easy and affordable.',
    features: [
      'Custom apps built fast',
      'Easy to update and modify',
      'Works with your existing tools',
      'No expensive ongoing maintenance'
    ],
    icon: <Code className="w-8 h-8" />,
    color: 'pastel-blue',
    expandedContent: {
      keyPainPoints: [
        'Off-the-shelf software doesn\'t fit your specific workflows',
        'Expensive custom development takes months',
        'Legacy systems that don\'t integrate',
        'Manual processes eating up productive time'
      ],
      capabilities: [
        'Rapid prototyping and development',
        'Visual workflow builders',
        'API integration with existing systems',
        'User-friendly interfaces for your team'
      ],
      benefits: [
        '10x faster development',
        '70% cost reduction vs traditional custom software',
        'Easy modifications as your business evolves'
      ]
    }
  },
  {
    id: 'system-integration',
    title: 'Connect Your Tools',
    description: 'Stop switching between different apps. We connect all your construction software so information flows automatically.',
    features: [
      'QuickBooks to project management',
      'Automatic data updates',
      'No more double data entry',
      'All your tools work together'
    ],
    icon: <Cog className="w-8 h-8" />,
    color: 'pastel-blue',
    expandedContent: {
      keyPainPoints: [
        'Data silos between different software systems',
        'Manual data entry across multiple platforms',
        'Inconsistent information leading to errors',
        'Time wasted switching between applications'
      ],
      capabilities: [
        'Real-time data synchronization',
        'Automated workflow triggers',
        'Custom API development',
        'Data mapping and transformation'
      ],
      benefits: [
        '80% reduction in manual data entry',
        '95% improvement in data accuracy',
        '5+ hours saved per week per user'
      ]
    }
  },
  {
    id: 'automation-consulting',
    title: 'Automate Repetitive Work',
    description: 'We identify what takes up your time and build systems to handle the boring stuff automatically.',
    features: [
      'Automate invoicing and billing',
      'Automatic progress reports',
      'Schedule and reminder systems',
      'Custom workflow automation'
    ],
    icon: <Zap className="w-8 h-8" />,
    color: 'pastel-blue',
    expandedContent: {
      keyPainPoints: [
        'Repetitive tasks consuming valuable time',
        'Human error in routine processes',
        'Inconsistent execution of standard procedures',
        'Lack of visibility into operational efficiency'
      ],
      capabilities: [
        'Process analysis and optimization',
        'Intelligent automation triggers',
        'Exception handling and alerts',
        'Performance monitoring and reporting'
      ],
      benefits: [
        '60% reduction in administrative time',
        '90% fewer processing errors',
        'ROI achieved within 3 months'
      ]
    }
  }
]

export const RevalateProSeries: React.FC<RevalateProSeriesProps> = ({ onDemoClick }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-air-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/20 to-transparent" />

      {/* Smooth transition edges */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-air-black via-air-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-air-black via-air-black/80 to-transparent" />

      {/* Large background text for section identity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[4rem] xs:text-[5rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(1deg)'
          }}
        >
          PRO
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <AnimatedSection animation="slideUp" duration={0.8}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-pastel-blue">Revalate Pro Series</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-x11 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Need something specific for your business? We build custom software, connect your existing tools,
              and automate the work that slows you down.
            </p>

            {/* Custom software description */}
            <div className="flex items-center justify-center gap-2 text-pastel-blue font-medium px-4">
              <span className="text-sm sm:text-base text-center">Get exactly what your business needs without the complexity or high costs.</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Services grid */}
        <StaggeredAnimation
          staggerDelay={200}
          childAnimation="slideUp"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 items-stretch"
        >
          {proServices.map((service) => {
            const isExpanded = expandedCard === service.id
            const isHovered = hoveredCard === service.id

            return (
              <div
                key={service.id}
                className={`group relative rounded-xl sm:rounded-2xl border-2 border-pastel-blue/30 card-pastel-bg
                           cursor-pointer overflow-hidden flex flex-col
                           transition-all duration-700 ease-out transform
                           ${isExpanded ? 'min-h-[700px] scale-105 shadow-2xl border-pastel-blue/80' : 'h-[480px] hover-pastel-lift hover:scale-105 hover:shadow-2xl hover:-translate-y-2'}
                           p-6 sm:p-8 hover:border-pastel-blue/60`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setExpandedCard(isExpanded ? null : service.id)}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 transition-all duration-700 ${isHovered || isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
                </div>

                {/* Animated border gradient */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered || isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pastel-blue/40 via-transparent to-pastel-blue/40 animate-pulse" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6
                                 transition-all duration-500 ease-out bg-pastel-blue/20 text-pastel-blue
                                 ${isHovered || isExpanded ? 'scale-125 rotate-3 shadow-lg bg-pastel-blue/40' : ''}`}>
                    <div className={`transform transition-transform duration-300 ${isHovered || isExpanded ? 'scale-110' : ''}`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-x11 transition-all duration-500 leading-tight
                                 ${isHovered || isExpanded ? 'text-pastel-blue transform translate-x-2' : ''}`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm sm:text-base text-dark-liver leading-relaxed mb-4 sm:mb-6 transition-all duration-500
                                ${isHovered || isExpanded ? 'text-gray-x11 transform translate-x-1' : ''}`}>
                    {service.description}
                  </p>

                  {/* Basic Features list - only show when not expanded */}
                  {!isExpanded && (
                    <>
                      <ul className="space-y-2 flex-grow">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-xs sm:text-sm text-dark-liver group-hover:text-gray-x11 transition-colors duration-500">
                            <div className="w-1.5 h-1.5 bg-pastel-blue rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {/* Spacer to push click indicator to bottom */}
                      <div className="flex-grow" />
                    </>
                  )}

                  {/* Expanded Content */}
                  <div className={`transition-all duration-700 ease-in-out overflow-hidden
                                  ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-6">
                      {/* Key Pain Points */}
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <h4 className="font-semibold text-red-300 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Current Challenges:
                        </h4>
                        <ul className="space-y-2">
                          {service.expandedContent.keyPainPoints.map((point) => (
                            <li key={point} className="text-gray-300 text-sm flex items-start">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Capabilities */}
                      <div className="p-4 rounded-xl bg-pastel-blue/10 border border-pastel-blue/20">
                        <h4 className="font-semibold text-pastel-blue mb-3 flex items-center">
                          <Monitor className="w-4 h-4 mr-2" />
                          Our Software:
                        </h4>
                        <ul className="space-y-2">
                          {service.expandedContent.capabilities.map((capability) => (
                            <li key={capability} className="text-gray-300 text-sm flex items-start">
                              <div className="w-1.5 h-1.5 bg-pastel-blue rounded-full mr-3 mt-2 flex-shrink-0" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="grid grid-cols-1 gap-3">
                        <h4 className="font-semibold text-neon-green mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Expected Results:
                        </h4>
                        {service.expandedContent.benefits.map((benefit) => (
                          <div key={benefit} className="text-center p-3 rounded-lg bg-neon-green/20 border border-neon-green/30">
                            <div className="text-neon-green font-bold text-sm">
                              {benefit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className={`mt-4 flex justify-center transition-all duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span>Click to learn more</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </StaggeredAnimation>

        {/* Call to action */}
        <AnimatedSection animation="slideUp" delay={600} duration={0.8}>
          <div className="text-center">
            <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-x11 mb-3 sm:mb-4">
                Ready to Stop Wasting Time on Manual Work?
              </h3>
              <p className="text-base sm:text-lg text-dark-liver leading-relaxed">
                We understand construction because we've been there. Let's talk about what's slowing
                you down and how we can fix it with the right tools.
              </p>
            </div>

            <div className="flex justify-center items-center px-4">
              <button
                onClick={onDemoClick}
                className="group w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 bg-pastel-blue text-air-black font-semibold text-base sm:text-lg rounded-xl
                           hover:bg-white transition-all duration-300 transform hover:scale-105
                           flex items-center justify-center gap-2"
              >
                Talk to Us
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
