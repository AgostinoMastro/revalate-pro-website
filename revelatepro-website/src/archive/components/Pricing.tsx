import React, { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'

const agents = [
  {
    id: 'bid-management',
    name: 'AI Bid Management Agent',
    description: 'Streamline your bidding process with intelligent proposal generation, competitive analysis, and automated documentation.',
    color: 'neon-green',
    bgColor: 'bg-neon-green/10',
    borderColor: 'border-neon-green/30',
    price: '$30',
    period: 'month',
    savings: 'Save 15+ hours weekly',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: [
      'Automated proposal generation',
      'Competitive analysis',
      'Bid tracking & management',
      'Document automation',
      'Win rate optimization',
      'Integration with existing tools'
    ]
  },
  {
    id: 'estimating',
    name: 'AI Estimating Agent',
    description: 'Generate accurate cost estimates instantly using machine learning models trained on historical construction data.',
    color: 'bright-blue',
    bgColor: 'bg-bright-blue/10',
    borderColor: 'border-bright-blue/30',
    price: '$30',
    period: 'month',
    savings: 'Save 20+ hours weekly',
    featured: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Instant cost estimates',
      'Historical data analysis',
      'Material cost optimization',
      'Labor calculation automation',
      'Risk assessment',
      'Custom pricing models'
    ]
  },
  {
    id: 'expense',
    name: 'AI Expense Agent',
    description: 'Track, categorize, and optimize project expenses with automated receipt processing and budget monitoring.',
    color: 'gradient-green',
    bgColor: 'bg-gradient-to-br from-gradient-green/10 to-gradient-dark/10',
    borderColor: 'border-gradient-green/30',
    price: '$30',
    period: 'month',
    savings: 'Save 10+ hours weekly',
    gradientBg: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: [
      'Automated expense tracking',
      'Receipt processing (OCR)',
      'Budget monitoring',
      'Project cost analysis',
      'Tax categorization',
      'Real-time reporting'
    ]
  }
]

export const Pricing = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(selectedAgent === agentId ? null : agentId)
  }

  return (
    <section id="pricing" className="py-24 relative overflow-hidden section-pastel-bg animate-pastel-section-fade">
      {/* Enhanced background gradient with pastel blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-blue/3 via-black-olive/40 to-pastel-blue/2" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pastel-blue/5 to-transparent animate-pastel-background-drift" />

      {/* Smooth transition edges with pastel blue */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-air-black via-pastel-blue/4 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-air-black via-pastel-blue/4 to-transparent" />
      <div className="section-divider-pastel absolute top-0 left-0 w-full" />
      <div className="section-divider-pastel absolute bottom-0 left-0 w-full" />

      {/* Large background text for section identity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[7rem] md:text-[10rem] lg:text-[13rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.1)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(-1deg)'
          }}
        >
          PRICING
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bright-blue/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-green/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <AnimatedSection animation="slideUp" duration={0.8}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">AI Agent Pricing</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Choose the AI agents that fit your construction workflow.
              Each agent works independently or together as a complete solution.
            </p>

            {/* Value proposition */}
            <div className="inline-flex items-center bg-dark-card rounded-full px-6 py-3 border border-dark-border">
              <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-gray-300">14-day free trial • No setup fees • Cancel anytime</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Agent pricing cards */}
        <StaggeredAnimation
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
          staggerDelay={150}
          childAnimation="slideUp"
        >
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`group relative cursor-pointer transition-all duration-500 ease-out
                         ${selectedAgent === agent.id ? 'scale-105 z-10' : 'hover:scale-102'}
                         ${agent.featured ? 'lg:scale-105' : ''}`}
              onClick={() => handleAgentClick(agent.id)}
            >
              {/* Main agent card */}
              <div
                className={`relative p-8 rounded-2xl border-2 ${agent.borderColor} ${agent.bgColor}
                           backdrop-blur-sm transition-all duration-300
                           ${selectedAgent === agent.id ? 'ring-2 ring-white/20 shadow-2xl' : ''}
                           ${agent.featured ? 'ring-2 ring-bright-blue/50' : ''}`}
              >
                {/* Featured badge */}
                {agent.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-bright-blue to-agent-cyan text-black px-6 py-2 rounded-full font-bold text-sm">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6
                               transition-all duration-300 group-hover:scale-110
                               ${agent.gradientBg
                                 ? 'bg-gradient-to-br from-gradient-green/20 to-gradient-dark/20 text-gradient-green'
                                 : `bg-${agent.color}/20 text-${agent.color}`
                               }`}>
                  {agent.icon}
                </div>

                {/* Agent name */}
                <h3 className="text-2xl font-bold mb-3 text-white">{agent.name}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6">{agent.description}</p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500 mb-1">Starting at</div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-white">{agent.price}</span>
                      <span className="text-lg text-gray-400 ml-1">/{agent.period}</span>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold text-${agent.color} text-center`}>
                    {agent.savings}
                  </div>
                </div>

                {/* CTA button */}
                <button className={`w-full px-6 py-3 font-bold text-lg rounded-xl transition-all duration-300
                                  ${agent.featured
                                    ? 'bg-gradient-to-r from-bright-blue to-agent-cyan text-black hover:opacity-90'
                                    : `bg-${agent.color} text-black hover:opacity-90`
                                  }`}>
                  Talk to Us
                </button>

                {/* Click indicator */}
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-500">
                    {selectedAgent === agent.id ? 'Click to close details' : 'Click for full details'}
                  </span>
                  <svg className={`w-4 h-4 mx-auto mt-1 text-gray-500 transition-transform duration-300
                                 ${selectedAgent === agent.id ? 'rotate-180' : ''}`}
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expandable details panel */}
              <div className={`overflow-hidden transition-all duration-500 ease-out
                              ${selectedAgent === agent.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className={`p-8 rounded-2xl border-2 ${agent.borderColor} ${agent.bgColor}
                               backdrop-blur-sm`}>
                  <h4 className="text-xl font-bold mb-4 text-white">What's Included:</h4>
                  <ul className="space-y-3 mb-6">
                    {agent.features.map((feature, index) => (
                      <li key={`${agent.id}-feature-${index}`} className="flex items-start">
                        <svg className={`w-5 h-5 text-${agent.color} mr-3 mt-0.5 flex-shrink-0`}
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Additional details */}
                  <div className="border-t border-gray-700 pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 mb-1">Setup Time</div>
                        <div className="text-white font-semibold">&lt; 24 hours</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Support</div>
                        <div className="text-white font-semibold">24/7 Priority</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Integrations</div>
                        <div className="text-white font-semibold">Unlimited</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Training</div>
                        <div className="text-white font-semibold">Included</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StaggeredAnimation>

        {/* Bundle pricing */}
        <AnimatedSection animation="scaleIn" delay={400} duration={0.8}>
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 gradient-text">Complete AI Suite</h3>
              <p className="text-lg text-gray-400 mb-6">
                Get all three AI agents together and save 25% off individual pricing
              </p>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-gray-500 line-through text-xl">$1,125/month</div>
                <div className="text-4xl font-bold text-white">$844/month</div>
                <div className="bg-neon-green text-black px-3 py-1 rounded-full text-sm font-bold">
                  Save $281
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 rounded-xl bg-black/30">
                <div className="text-2xl font-bold text-neon-green mb-1">45+</div>
                <div className="text-gray-400 text-sm">Hours Saved Weekly</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-black/30">
                <div className="text-2xl font-bold text-bright-blue mb-1">360°</div>
                <div className="text-gray-400 text-sm">Complete Coverage</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-black/30">
                <div className="text-2xl font-bold text-agent-cyan mb-1">ROI</div>
                <div className="text-gray-400 text-sm">Within 30 Days</div>
              </div>
            </div>

            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-gradient-green to-gradient-dark text-white font-bold text-lg rounded-xl gradient-border-btn mr-4">
                Start Complete Suite Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-black white-border-btn">
                Schedule Demo
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Pricing Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">Can I use agents individually?</h4>
                <p className="text-gray-400">Yes, each AI agent works independently. You can start with one and add others as needed.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">What's included in the free trial?</h4>
                <p className="text-gray-400">Full access to all features for 14 days. No credit card required to start.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">How quickly can I get started?</h4>
                <p className="text-gray-400">Most agents are ready within 24 hours. Our team handles the setup and integration.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">Do you offer custom pricing?</h4>
                <p className="text-gray-400">Yes, we have enterprise pricing for larger teams and custom integrations.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">What support is included?</h4>
                <p className="text-gray-400">24/7 priority support, training, and onboarding for all plans.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-white">Can I change or cancel anytime?</h4>
                <p className="text-gray-400">Yes, you can upgrade, downgrade, or cancel your subscription at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
