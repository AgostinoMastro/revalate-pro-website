import React, { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { StaggeredAnimation as ScrollStaggeredAnimation } from './ScrollTriggeredAnimations'
import { useIsMobile, useIsTouchDevice } from '../hooks/useMediaQuery'
import { AgentDetailPage } from './AgentDetailPage'
import { agentDetailsData } from '../data/agentDetails'
import { useRouter } from '../hooks/useRouter'
import { FileText, Calculator, CreditCard } from 'lucide-react'


const agents = [
  {
    id: 'bid-management',
    title: 'AI Bid Management Agent',
    description: 'Intelligent proposal generation, competitive analysis, and automated documentation.',
    color: 'pastel-blue',
    bgColor: 'bg-white/5',
    borderColor: 'border-pastel-blue/30',
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'estimating',
    title: 'AI Estimating Agent',
    description: 'Accurate cost estimates using machine learning trained on historical construction data.',
    color: 'pastel-blue',
    bgColor: 'bg-white/5',
    borderColor: 'border-pastel-blue/30',
    icon: <Calculator className="w-8 h-8" />
  },
  {
    id: 'expense',
    title: 'AI Expense Agent',
    description: 'Automated receipt processing, expense categorization, and budget monitoring.',
    color: 'pastel-blue',
    bgColor: 'bg-white/5',
    borderColor: 'border-pastel-blue/30',
    icon: <CreditCard className="w-8 h-8" />
  }
]

export const CurrentAgents = ({ onDemoClick, onRevalateProClick }: { onDemoClick?: () => void, onRevalateProClick?: () => void } = {}) => {
  const isMobile = useIsMobile()
  const isTouchDevice = useIsTouchDevice()
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const router = useRouter()

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId)
  }

  // If an agent is selected, show the detail page
  if (selectedAgent && agentDetailsData[selectedAgent as keyof typeof agentDetailsData]) {
    return (
      <AgentDetailPage
        agent={agentDetailsData[selectedAgent as keyof typeof agentDetailsData]}
        onDemoClick={onDemoClick}
        onRevalateProClick={onRevalateProClick}
        onBack={() => setSelectedAgent(null)}
      />
    )
  }

  return (
    <section id="features" className="py-12 md:py-24 relative overflow-hidden">
      {/* Light background with subtle pastel blue accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-pastel-blue/3 via-transparent to-pastel-blue/2" />

      {/* Large background text for section identity - mobile optimized */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[4rem] xs:text-[5rem] sm:text-[6rem] md:text-[12rem] lg:text-[15rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(-5deg)'
          }}
        >
          AGENTS
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header - mobile optimized */}
        <AnimatedSection animation="slideUp" duration={0.8}>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              <span className="text-pastel-blue">AI Agents</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-x11 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
              Powerful AI agents designed specifically for construction professionals,
              available now to transform your workflow. Need something more? We also build
              <span className="text-pastel-blue font-semibold"> custom AI software</span> tailored
              to your unique business requirements.
            </p>
          </div>
        </AnimatedSection>

        {/* Agents grid - mobile optimized */}
        <ScrollStaggeredAnimation
          stagger={150}
          delay={200}
          animation="slideUp"
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 px-2 sm:px-0"
        >
          {agents.map((agent) => {
            const baseClasses = [
              'group',
              'relative',
              'rounded-2xl',
              'border-2',
              agent.borderColor,
              'card-pastel-bg',
              'cursor-pointer',
              'overflow-hidden',
              'flex',
              'flex-col',
              'min-h-[320px]',
              'sm:min-h-[340px]',
              'md:min-h-[360px]',
              'transition-all',
              'duration-500',
              'ease-out',
              'transform',
              'hover-pastel-lift'
            ].join(' ');
            const hoverClasses = !isTouchDevice ? 'hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-pastel-section-glow' : 'active:scale-95';
            const paddingClasses = isMobile ? 'p-3 sm:p-6' : 'p-6 sm:p-8';

            return (
              <div
                key={agent.id}
                onClick={() => handleAgentClick(agent.id)}
                className={[baseClasses, hoverClasses, paddingClasses].join(' ')}
              >
              {/* Animated background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/15 via-pastel-blue/8 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tl from-gray-x11/5 to-transparent" />
              </div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pastel-blue/40 via-transparent to-pastel-blue/40 animate-pulse" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon - mobile optimized */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6
                               group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 ease-out
                               group-hover:shadow-lg bg-pastel-blue/20 text-pastel-blue group-hover:bg-pastel-blue/40">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {agent.icon}
                  </div>
                </div>

                {/* Title - mobile optimized */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-x11 group-hover:text-pastel-blue transition-all duration-500 transform group-hover:translate-x-2 leading-tight">
                  {agent.title}
                </h3>

                {/* Description - mobile optimized */}
                <p className="text-sm sm:text-base text-dark-liver leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-x11 transition-all duration-500 transform group-hover:translate-x-1 flex-grow">
                  {agent.description}
                </p>

                {/* Learn more link - mobile optimized */}
                <div className="flex items-center text-xs sm:text-sm font-semibold text-dark-liver group-hover:text-pastel-blue transition-all duration-500 transform group-hover:translate-x-3 mt-auto">
                  <span className="group-hover:font-bold transition-all duration-300">View details</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-300"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30
                             transition-all duration-700 pointer-events-none"
                   style={{
                     boxShadow: '0 0 60px rgba(148,199,204,0.4), 0 0 100px rgba(148,199,204,0.2)'
                   }}>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-pastel-blue animate-ping" />
                <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-pastel-blue/70 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-pastel-blue/50 animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            );
          })}
        </ScrollStaggeredAnimation>

        {/* Call to action - mobile optimized */}
        <AnimatedSection animation="fadeIn" delay={500} duration={0.8}>
          <div className="text-center mt-12 sm:mt-16 px-4 sm:px-0">
            <button
              onClick={(e) => {
                e.preventDefault()
                router.navigateToAIAgents()
              }}
              style={{
                position: 'relative',
                zIndex: 9999,
                pointerEvents: 'auto',
                touchAction: 'manipulation'
              }}
              className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 bg-pastel-blue text-air-black font-bold text-base sm:text-lg rounded-xl transition-all duration-200 hover:bg-pastel-blue/80 shadow-lg hover:shadow-xl cursor-pointer">
              Pick Your Agent
            </button>
          </div>
        </AnimatedSection>


      </div>
    </section>
  )
}
