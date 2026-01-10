import type React from 'react'
import { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { useParallax } from '../hooks/useParallax'
import {
  User, Wrench, Monitor, Building, Home, Factory, ArrowRight,
  Network, Target, Shield, BarChart3, Users, FileCheck, DollarSign,
  Zap, Clock, TrendingUp
} from 'lucide-react'


interface IndustryLandingProps {
  industry: 'residential' | 'ici'
  onDemoClick: () => void
}

// Expanded content interface for challenge cards
interface ExpandedContent {
  keyPainPoints: string[]
  aiCapabilities: string[]
  roiMetrics: string[]
}

// Enhanced challenge interface
interface Challenge {
  title: string
  description: string
  solution: string
  savings: string
  icon: string
  expandedContent: ExpandedContent
}

// Icon Avatar Component
const IconAvatar: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = "" }) => {
  const iconMap = {
    'business': User,
    'technician': Wrench,
    'developer': Monitor,
    'residential': Home,
    'commercial': Building,
    'industrial': Factory
  }

  const IconComponent = iconMap[iconType as keyof typeof iconMap] || User

  return (
    <div className={`w-12 h-12 rounded-full bg-black-olive border border-pastel-blue/20 flex items-center justify-center ${className}`}>
      <IconComponent className="w-6 h-6 text-pastel-blue" />
    </div>
  )
}

const industryData = {
  residential: {
    title: 'AI for Residential Construction',
    subtitle: 'Build More Homes, Faster and More Profitably',
    hero: 'Transform your residential construction business with AI agents built specifically for home builders, renovators, and custom construction professionals.',
    challenges: [
      {
        title: 'Customized Estimates',
        description: 'Every home is unique, making accurate estimates challenging and time-consuming.',
        solution: 'AI analyzes take-off quantities, price labor & material, and estimates in minutes.',
        savings: 'Save 5+ hours per estimate',
        icon: 'fileCheck',
        expandedContent: {
          keyPainPoints: [
            'Each home design requires unique calculations',
            'Time-intensive manual takeoff processes',
            'Inconsistent pricing across projects',
            'Client trust issues with estimate accuracy'
          ],
          aiCapabilities: [
            'Automated take-off analysis',
            'Automated material & labor calculations',
            'Historical data-driven pricing',
            'Instant estimate generation and updates'
          ],
          roiMetrics: [
            '5+ hours saved per estimate',
            '95% estimate accuracy',
            '10x faster quote delivery'
          ]
        }
      },
      {
        title: 'Vendor Portal & Daily Logs',
        description: 'Streamlined vendor management and comprehensive daily project tracking.',
        solution: 'AI-powered vendor portal with automated daily log generation and insights.',
        savings: 'Reduce admin time by 50%',
        icon: 'users',
        expandedContent: {
          keyPainPoints: [
            'Manual daily log creation and tracking',
            'Scattered vendor communication channels',
            'Incomplete project documentation',
            'Time-consuming vendor onboarding and management'
          ],
          aiCapabilities: [
            'Automated daily log generation from site activity',
            'Centralized vendor portal with real-time updates',
            'Smart vendor performance tracking and ratings',
            'Intelligent document management and search'
          ],
          roiMetrics: [
            '50% reduction in admin time',
            '75% faster vendor onboarding',
            '90% improvement in project document accuracy'
          ]
        }
      },
      {
        title: 'Change Order Management',
        description: 'Homeowner requests and modifications create scope creep and profit erosion.',
        solution: 'AI tracks all changes and automatically updates pricing and schedules.',
        savings: 'Increase profit margins by 25%',
        icon: 'dollarSign',
        expandedContent: {
          keyPainPoints: [
            'Homeowner scope creep eating into profits',
            'Manual change order pricing prone to errors',
            'Time delays from change documentation',
            'Difficulty tracking cumulative impact'
          ],
          aiCapabilities: [
            'Automated change order pricing',
            'Real-time profit margin tracking',
            'Instant schedule impact analysis',
            'Transparent client communication tools'
          ],
          roiMetrics: [
            '25% increase in profit margins',
            '80% faster change order processing',
            '95% reduction in pricing disputes'
          ]
        }
      }
    ],
    useCases: [
      {
        title: 'Custom Home Builder',
        description: 'Build 3-5 custom homes annually',
        before: 'Manual estimates taking 2-3 days each, frequent change order disputes, project delays',
        after: 'Instant estimates, transparent change management, on-time completions',
        results: ['$150K additional annual profit', '30% faster project delivery', '95% client satisfaction']
      },
      {
        title: 'Home Renovation Specialist',
        description: 'Kitchen, bathroom, and whole-home renovations',
        before: 'Unreliable estimates, cost overruns, scheduling conflicts with homeowners',
        after: 'Accurate pricing, real-time progress tracking, satisfied homeowners',
        results: ['40% more projects annually', '20% higher profit margins', '50% fewer disputes']
      }
    ],
    testimonial: {
      quote: "Revalate helped us increase our residential project volume by 60% while maintaining quality. The AI estimating is incredibly accurate.",
      author: "Kristen Bachner",
      company: "Klos Concepts",
      location: "Toronto, On"
    },
    bgColor: 'neon-green',
    gradient: 'from-neon-green/20 to-bright-blue/10'
  },
  ici: {
    title: 'AI for Industrial, Commercial & Institutional Construction',
    subtitle: 'Master Complex Projects from Office Buildings to Critical Infrastructure',
    hero: 'Scale your ICI construction operations with AI agents designed for commercial buildings, industrial facilities, institutional projects, and infrastructure development.',
    challenges: [
      {
        title: 'Complex Multi-Tiered Estimating',
        description: 'Creating accurate estimates for large-scale ICI projects with multiple building systems, specialized trades, and varying material specifications.',
        solution: 'AI analyzes architectural plans, specs, and market data to generate detailed multi-tiered estimates with precise material takeoffs and labor calculations.',
        savings: 'Improve estimate accuracy by 85%',
        icon: 'network',
        expandedContent: {
          keyPainPoints: [
            'Manual takeoffs for complex building systems',
            'Pricing variations across multiple trades',
            'Time-intensive estimate revisions',
            'Inconsistent markup strategies across projects'
          ],
          aiCapabilities: [
            'Automated quantity takeoffs from plans',
            'Real-time material and labor pricing',
            'Multi-trade estimate coordination',
            'Intelligent markup recommendations'
          ],
          roiMetrics: [
            '85% improvement in estimate accuracy',
            '70% faster estimate completion',
            '40% increase in bid win rate'
          ]
        }
      },
      {
        title: 'Competitive Bid Environment',
        description: 'Winning profitable bids against established competitors in the high-stakes ICI market.',
        solution: 'AI analyzes competitor patterns, market trends, and project requirements to optimize bid strategy for maximum win probability.',
        savings: 'Increase win rate by 35%',
        icon: 'target',
        expandedContent: {
          keyPainPoints: [
            'Limited visibility into competitor strategies',
            'Inaccurate pricing leading to lost bids',
            'Time-intensive bid preparation process',
            'Difficulty assessing project profitability'
          ],
          aiCapabilities: [
            'Competitor analysis and pattern recognition',
            'Market-based pricing optimization',
            'Automated bid document generation',
            'Profitability prediction modeling'
          ],
          roiMetrics: [
            '35% increase in win rate',
            '60% faster bid preparation',
            '25% improvement in profit margins'
          ]
        }
      },
      {
        title: 'Vendor & Client Portal Management',
        description: 'Managing secure access, document sharing, and communication with dozens of vendors, subcontractors, and clients across multiple ICI projects.',
        solution: 'AI creates intelligent portals that automatically organize documents, control access permissions, and streamline vendor-client communications.',
        savings: 'Reduce admin overhead by 75%',
        icon: 'shield',
        expandedContent: {
          keyPainPoints: [
            'Manual document sharing and version control',
            'Complex access permission management',
            'Scattered communication across platforms',
            'Time-consuming vendor onboarding processes'
          ],
          aiCapabilities: [
            'Automated document organization and sharing',
            'Intelligent access control and permissions',
            'Centralized communication hub',
            'Streamlined vendor onboarding workflows'
          ],
          roiMetrics: [
            '75% reduction in administrative overhead',
            '90% faster document retrieval',
            '60% improvement in communication efficiency'
          ]
        }
      },
      {
        title: 'Budget Management at Scale',
        description: 'Tracking costs across multiple large projects with varying complexity, timelines, and stakeholder requirements.',
        solution: 'AI provides real-time budget monitoring, predictive cost analysis, and risk assessment across your entire ICI portfolio.',
        savings: 'Prevent 85% of cost overruns',
        icon: 'barChart',
        expandedContent: {
          keyPainPoints: [
            'Difficulty tracking costs across multiple projects',
            'Unpredictable cost overruns',
            'Limited visibility into budget performance',
            'Manual budget reporting processes'
          ],
          aiCapabilities: [
            'Real-time multi-project cost tracking',
            'Predictive cost overrun analysis',
            'Automated budget performance dashboards',
            'Intelligent spending pattern recognition'
          ],
          roiMetrics: [
            '85% reduction in cost overruns',
            '40% faster budget reporting',
            '95% accuracy in cost predictions'
          ]
        }
      }
    ],
    useCases: [
      {
        title: 'Commercial General Contractor',
        description: 'Office buildings, retail centers, and mixed-use developments ($5M-$100M projects)',
        before: 'Bid preparation taking weeks, project delays, thin profit margins, stakeholder coordination challenges',
        after: 'Rapid bid generation, on-schedule delivery, healthy profitability, streamlined stakeholder management',
        results: ['$3M additional annual revenue', '40% faster bid turnaround', '20% higher margins']
      },
      {
        title: 'Industrial Facilities Contractor',
        description: 'Manufacturing plants, warehouses, and distribution centers',
        before: 'Complex technical specifications, long lead times, specialized contractor coordination',
        after: 'AI-optimized technical planning, predictable timelines, automated contractor management',
        results: ['25% faster project delivery', '30% cost reduction', '95% specification compliance']
      },
      {
        title: 'Institutional & Infrastructure Specialist',
        description: 'Schools, hospitals, government buildings, roads, bridges, and utilities',
        before: 'Stringent regulatory requirements, public oversight, multi-stakeholder approval processes',
        after: 'Streamlined compliance, transparent reporting, efficient stakeholder communication',
        results: ['50% faster permitting', '35% resource optimization', '100% regulatory approval rate']
      }
    ],
    testimonial: {
      quote: "Revalate transformed our operations completely. We've won 40% more bids and delivered three major projects ahead of schedule. The AI handles everything from bidding to compliance automatically.",
      author: "Vincent Detillieux",
      company: "Paravel Construction",
      location: "Ottawa, On"
    },
    bgColor: 'bright-blue',
    gradient: 'from-bright-blue/20 to-agent-cyan/10'
  }
}

export const IndustryLanding: React.FC<IndustryLandingProps> = ({ industry, onDemoClick }) => {
  const [selectedUseCase, setSelectedUseCase] = useState(0)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const data = industryData[industry]
  const parallax1 = useParallax({ speed: 0.2, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.3, direction: 'down' })

  const industryLabel = industry === 'residential' ? 'Residential Construction' : 'ICI Construction'

  // Custom icon mapping for challenges
  const getChallengeIcon = (iconType: string) => {
    const iconMap = {
      'network': Network,
      'target': Target,
      'shield': Shield,
      'barChart': BarChart3,
      'fileCheck': FileCheck,
      'users': Users,
      'dollarSign': DollarSign
    }
    return iconMap[iconType as keyof typeof iconMap] || Shield
  }

  // Grid layout logic based on number of challenges
  const getGridColumns = () => {
    const challengeCount = data.challenges.length
    if (challengeCount === 4) {
      return 'grid-cols-1 md:grid-cols-2' // 2x2 for 4 cards
    }
    if (challengeCount === 3) {
      return 'grid-cols-1 md:grid-cols-3' // 1x3 for 3 cards
    }
    return 'grid-cols-1 md:grid-cols-2' // default
  }

  return (
    <div className="min-h-screen bg-air-black">

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/20 to-transparent" />

        {/* Large background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="text-[4rem] sm:text-[6rem] md:text-[12rem] lg:text-[16rem] font-black leading-none select-none tracking-tighter opacity-5"
            style={{
              WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
              color: 'rgba(148, 199, 204, 0.03)'
            }}
          >
            {industry.toUpperCase()}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">


          {/* Hero Content */}
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 px-4">
                <span className="gradient-text">{data.title}</span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-3xl text-gray-x11 mb-4 md:mb-8 max-w-4xl mx-auto px-4">
                {data.subtitle}
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-gray-x11 max-w-4xl mx-auto leading-relaxed px-4">
                {data.hero}
              </p>
            </div>
          </AnimatedSection>

          {/* Benefits */}
          <StaggeredAnimation
            staggerDelay={150}
            childAnimation="slideUp"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
          >
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mx-auto mb-2 md:mb-4">
                <Building className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-x11 mb-1 md:mb-2">Industry Expertise</h3>
              <p className="text-sm md:text-base text-dark-liver">Built specifically for {industry} construction</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mx-auto mb-2 md:mb-4">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-x11 mb-1 md:mb-2">Ready to Deploy</h3>
              <p className="text-sm md:text-base text-dark-liver">Start saving time immediately</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mx-auto mb-2 md:mb-4">
                <Monitor className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-x11 mb-1 md:mb-2">Proven Results</h3>
              <p className="text-sm md:text-base text-dark-liver">Measurable improvements guaranteed</p>
            </div>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Industry-Specific Challenges */}
      <section className="py-12 md:py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 gradient-text px-4">
                {industry === 'ici' ? 'ICI' : industry.charAt(0).toUpperCase() + industry.slice(1)} Construction Challenges
              </h2>
              <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                AI software designed specifically for the unique challenges of {industry === 'ici' ? 'ICI' : industry} construction.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className={`grid ${getGridColumns()} gap-4 md:gap-8 mb-8 md:mb-16 transition-all duration-700 ease-in-out`}
            staggerDelay={150}
            childAnimation="slideUp"
          >
            {data.challenges.map((challenge, index) => {
              const cardId = `${industry}-challenge-${index}`
              const isExpanded = expandedCard === cardId
              const isHovered = hoveredCard === cardId
              const IconComponent = getChallengeIcon(challenge.icon)

              return (
                <div
                  key={cardId}
                  className={`group relative rounded-2xl border-2 border-pastel-blue/30 bg-black-olive/40
                             cursor-pointer overflow-hidden flex flex-col transition-all duration-700 ease-out
                             ${isExpanded ? 'min-h-[600px] md:min-h-[700px] scale-105 shadow-2xl border-pastel-blue/80' : 'min-h-[320px] md:min-h-[450px] hover:scale-105 hover:shadow-2xl hover:-translate-y-2'}
                             p-4 sm:p-6 md:p-8 hover:border-pastel-blue/60`}
                  onMouseEnter={() => setHoveredCard(cardId)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedCard(isExpanded ? null : cardId)}
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
                    {/* Custom Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-3 md:mb-6
                                   transition-all duration-500 ease-out bg-pastel-blue/20 text-pastel-blue
                                   ${isHovered || isExpanded ? 'scale-125 rotate-3 shadow-lg bg-pastel-blue/40' : ''}`}>
                      <div className={`transform transition-transform duration-300 ${isHovered || isExpanded ? 'scale-110' : ''}`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4 text-gray-x11 transition-all duration-500 leading-tight
                                   ${isHovered || isExpanded ? 'text-pastel-blue transform translate-x-2' : ''}`}>
                      {challenge.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs sm:text-sm md:text-base text-dark-liver leading-relaxed mb-3 md:mb-6 transition-all duration-500
                                  ${isHovered || isExpanded ? 'text-gray-x11 transform translate-x-1' : ''} ${isExpanded ? '' : 'flex-grow'}`}>
                      {challenge.description}
                    </p>

                    {/* Expanded Content */}
                    <div className={`transition-all duration-700 ease-in-out overflow-hidden
                                    ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="space-y-6">
                        {/* Key Pain Points */}
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                          <h4 className="font-semibold text-red-300 mb-3 flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            Key Pain Points:
                          </h4>
                          <ul className="space-y-2">
                            {challenge.expandedContent.keyPainPoints.map((point) => (
                              <li key={point} className="text-gray-300 text-sm flex items-start">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* AI Capabilities */}
                        <div className="p-4 rounded-xl bg-pastel-blue/10 border border-pastel-blue/20">
                          <h4 className="font-semibold text-pastel-blue mb-3 flex items-center">
                            <Monitor className="w-4 h-4 mr-2" />
                            AI Capabilities:
                          </h4>
                          <ul className="space-y-2">
                            {challenge.expandedContent.aiCapabilities.map((capability) => (
                              <li key={capability} className="text-gray-300 text-sm flex items-start">
                                <div className="w-1.5 h-1.5 bg-pastel-blue rounded-full mr-3 mt-2 flex-shrink-0" />
                                {capability}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* ROI Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {challenge.expandedContent.roiMetrics.map((metric) => (
                            <div key={metric} className="text-center p-3 rounded-lg bg-pastel-blue/20 border border-pastel-blue/30">
                              <div className="text-pastel-blue font-bold text-sm">
                                {metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Basic AI Solution section (when not expanded) */}
                    <div className={`transition-all duration-500 ${isExpanded ? 'hidden' : 'block'}`}>
                      <div className={`p-4 rounded-xl bg-pastel-blue/10 border border-pastel-blue/20 mb-4
                                     ${isHovered ? 'bg-pastel-blue/20' : ''}`}>
                        <h4 className={`font-semibold text-pastel-blue mb-2 transition-colors duration-300
                                       ${isHovered ? 'text-white' : ''}`}>
                          AI Solution:
                        </h4>
                        <p className={`text-gray-300 text-sm leading-relaxed transition-colors duration-300
                                      ${isHovered ? 'text-white' : ''}`}>
                          {challenge.solution}
                        </p>
                      </div>

                      {/* Savings badge */}
                      <div className={`text-center p-3 rounded-lg bg-pastel-blue/20 transition-all duration-500 mt-auto
                                     ${isHovered ? 'bg-pastel-blue/30' : ''}`}>
                        <div className={`text-pastel-blue font-bold transition-all duration-300
                                       ${isHovered ? 'text-white scale-105' : ''}`}>
                          {challenge.savings}
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse indicator */}
                    <div className={`text-center p-3 mt-4 transition-all duration-300
                                   ${isHovered || isExpanded ? 'opacity-100' : 'opacity-60'}`}>
                      <div className="text-pastel-blue text-sm font-medium flex items-center justify-center">
                        {isExpanded ? (
                          <>
                            <span>Click to collapse</span>
                            <svg className="w-4 h-4 ml-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Click for details</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 bg-pastel-blue/10 blur-xl
                                 ${isHovered || isExpanded ? 'opacity-30' : 'opacity-0'}`} />
                </div>
              )
            })}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 md:py-24 relative bg-gradient-to-b from-transparent via-[#0a1520]/30 to-transparent">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 gradient-text px-4">
                Real {industry === 'ici' ? 'ICI' : industry.charAt(0).toUpperCase() + industry.slice(1)} Success Stories
              </h2>
              <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                See how companies like yours are transforming their {industry === 'ici' ? 'ICI' : industry} construction operations.
              </p>
            </div>
          </AnimatedSection>

          {/* Use Case Selector */}
          <div className="flex justify-center mb-6 md:mb-12">
            <div className="flex flex-col sm:flex-row bg-black-olive/60 backdrop-blur-sm rounded-2xl p-3 border border-pastel-blue/20 w-full max-w-4xl shadow-lg hover:shadow-xl transition-all duration-300">
              {data.useCases.map((useCase, index) => (
                <button
                  key={`${industry}-usecase-${useCase.title.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedUseCase(index)}
                  className={`flex-1 px-4 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 font-bold text-sm sm:text-base mb-2 sm:mb-0 flex items-center justify-center relative overflow-hidden group
                             ${selectedUseCase === index
                               ? 'bg-gradient-to-r from-pastel-blue to-pastel-blue/80 text-air-black shadow-lg scale-105 border-2 border-pastel-blue/50'
                               : 'text-gray-300 hover:text-white hover:bg-pastel-blue/10 border-2 border-transparent hover:border-pastel-blue/30 hover:scale-102'
                             }`}
                >
                  {/* Background glow effect for active tab */}
                  {selectedUseCase === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-pastel-blue/20 to-pastel-blue/10 rounded-xl blur-sm" />
                  )}

                  {/* Icon indicator */}
                  <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                    selectedUseCase === index
                      ? 'bg-air-black'
                      : 'bg-pastel-blue/60 group-hover:bg-pastel-blue'
                  }`} />

                  <span className="relative z-10">{useCase.title}</span>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-pastel-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Selected Use Case */}
          <AnimatedSection key={selectedUseCase} animation="fadeIn" duration={0.6}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 text-white">
                  {data.useCases[selectedUseCase].title}
                </h3>
                <p className="text-lg text-gray-400">
                  {data.useCases[selectedUseCase].description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
                {/* Before */}
                <div className="group relative p-8 rounded-2xl bg-black-olive/40 border-2 border-red-500/30
                               transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                               overflow-hidden hover:border-red-500/60">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 via-red-500/8 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mr-4
                                     group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out
                                     group-hover:shadow-lg group-hover:bg-red-500/40">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-red-400 group-hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-red-300 group-hover:text-red-200 transition-all duration-500 transform group-hover:translate-x-2">
                        Before Revalate Pro
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-1">
                      {data.useCases[selectedUseCase].before}
                    </p>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-red-500/10 blur-xl" />
                </div>

                {/* After */}
                <div className="group relative p-8 rounded-2xl bg-black-olive/40 border-2 border-pastel-blue/30
                               transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                               overflow-hidden hover:border-pastel-blue/60">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-pastel-blue/20 flex items-center justify-center mr-4
                                     group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out
                                     group-hover:shadow-lg group-hover:bg-pastel-blue/40">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-pastel-blue group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-pastel-blue group-hover:text-white transition-all duration-500 transform group-hover:translate-x-2">
                        After Revalate Pro
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-1">
                      {data.useCases[selectedUseCase].after}
                    </p>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-pastel-blue/10 blur-xl" />
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.useCases[selectedUseCase].results.map((result) => (
                  <div
                    key={`${industry}-result-${result.replace(/\s+/g, '-').toLowerCase()}`}
                    className="group relative text-center p-6 rounded-xl bg-black-olive/40 border-2 border-pastel-blue/30
                               cursor-pointer overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                               hover:border-pastel-blue/60"
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
                    </div>

                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${data.bgColor}/40 via-transparent to-${data.bgColor}/40 animate-pulse`} />
                    </div>

                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-pastel-blue mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-500 transform group-hover:translate-y-1">
                        {result.split(' ')[0]}
                      </div>
                      <div className="text-gray-300 text-sm group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-y-1">
                        {result.split(' ').slice(1).join(' ')}
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-${data.bgColor}/10 blur-xl`} />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 md:py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scaleIn" duration={0.8}>
            <div className="group relative max-w-4xl mx-auto text-center p-6 md:p-12 rounded-3xl bg-black-olive/40 border-2 border-pastel-blue/30
                           transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                           overflow-hidden hover:border-pastel-blue/60">
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
              </div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pastel-blue/40 via-transparent to-pastel-blue/40 animate-pulse" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mx-auto mb-4 md:mb-6
                               group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out
                               group-hover:shadow-lg group-hover:bg-pastel-blue/40">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                </div>

                <blockquote className="text-lg sm:text-xl md:text-3xl font-light italic text-gray-300 mb-4 md:mb-8 leading-relaxed group-hover:text-white transition-all duration-500 transform group-hover:translate-y-1">
                  "{data.testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-black-olive border border-pastel-blue/20 flex items-center justify-center mr-4
                                 group-hover:scale-110 group-hover:bg-pastel-blue/20 transition-all duration-500">
                    <User className="w-7 h-7 text-pastel-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white group-hover:text-pastel-blue transition-colors duration-300">{data.testimonial.author}</div>
                    <div className="text-gray-400 group-hover:text-gray-x11 transition-colors duration-300">{data.testimonial.company}</div>
                    <div className="text-gray-500 group-hover:text-gray-400 transition-colors duration-300">{data.testimonial.location}</div>
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-pastel-blue/10 blur-xl" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scaleIn" duration={0.8}>
            <div className="group relative max-w-4xl mx-auto text-center p-6 md:p-12 rounded-3xl bg-black-olive/40 border-2 border-pastel-blue/30
                           transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                           hover:border-pastel-blue/60">
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
              </div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pastel-blue/40 via-transparent to-pastel-blue/40 animate-pulse" />
              </div>

              <div className="relative z-50">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-6 gradient-text group-hover:text-white transition-all duration-500 transform group-hover:translate-y-1">
                  Ready to Transform Your {industry === 'ici' ? 'ICI' : industry.charAt(0).toUpperCase() + industry.slice(1)} Business?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-4 md:mb-8 max-w-2xl mx-auto group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-y-1">
                  Join other {industry === 'ici' ? 'ICI' : industry} construction professionals who are already using AI to win more projects and increase profitability.
                </p>

                <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                  <div className="group/item">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-pastel-blue mb-1 md:mb-2 group-hover:text-white group-hover/item:scale-110 transition-all duration-300">24-Hour</div>
                    <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wide group-hover:text-gray-400 transition-colors duration-300">Delivery</div>
                  </div>
                  <div className="group/item">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-pastel-blue mb-1 md:mb-2 group-hover:text-white group-hover/item:scale-110 transition-all duration-300">24/7</div>
                    <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wide group-hover:text-gray-400 transition-colors duration-300">Support</div>
                  </div>
                  <div className="group/item">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-pastel-blue mb-1 md:mb-2 group-hover:text-white group-hover/item:scale-110 transition-all duration-300">Go</div>
                    <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wide group-hover:text-gray-400 transition-colors duration-300">Custom</div>
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-pastel-blue/10 blur-xl" />
            </div>
          </AnimatedSection>

          {/* Debug button with comprehensive logging */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onDemoClick}
              className="w-full sm:w-auto px-6 py-4 bg-pastel-blue text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 text-lg min-h-[48px] cursor-pointer"
            >
              Talk to Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
