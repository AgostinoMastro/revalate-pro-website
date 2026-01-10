import type React from 'react'
import { useState } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { useParallax } from '../hooks/useParallax'


interface PricingLandingProps {
  onDemoClick: () => void
  onMainPricingClick: () => void
}

const agents = [
  {
    id: 'bid-management',
    name: 'AI Bid Management Agent',
    description: 'Streamline your bidding process with intelligent proposal generation and competitive analysis.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'neon-green',
    tiers: [
      {
        name: 'Starter',
        price: '$99',
        period: 'month',
        description: 'Perfect for small contractors getting started with AI bidding',
        features: [
          'Up to 10 bids per month',
          'Basic proposal templates',
          'Email support',
          'Standard integrations',
          'Basic analytics'
        ],
        cta: 'Talk to Us',
        popular: false
      },
      {
        name: 'Premium',
        price: '$375',
        period: 'month',
        description: 'Ideal for growing construction businesses',
        features: [
          'Unlimited bids',
          'Advanced AI proposal generation',
          'Competitive analysis',
          'Priority support',
          'Advanced analytics',
          'Custom templates',
          'API access'
        ],
        cta: 'Talk to Us',
        popular: true
      },
      {
        name: 'Custom',
        price: 'Contact',
        period: 'us',
        description: 'Tailored software for enterprise construction companies',
        features: [
          'Everything in Premium',
          'Custom AI training',
          'Dedicated account manager',
          'White-label options',
          'Custom integrations',
          'SLA guarantees'
        ],
        cta: 'Contact Sales',
        popular: false
      }
    ]
  },
  {
    id: 'estimating',
    name: 'AI Estimating Agent',
    description: 'Generate accurate cost estimates instantly using machine learning models.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bright-blue',
    tiers: [
      {
        name: 'Starter',
        price: '$149',
        period: 'month',
        description: 'Essential estimating tools for small projects',
        features: [
          'Up to 25 estimates per month',
          'Basic material pricing',
          'Standard templates',
          'Email support',
          'Basic reporting'
        ],
        cta: 'Talk to Us',
        popular: false
      },
      {
        name: 'Premium',
        price: '$375',
        period: 'month',
        description: 'Advanced estimating with AI-powered accuracy',
        features: [
          'Unlimited estimates',
          'Real-time material pricing',
          'AI quantity takeoffs',
          'Risk assessment',
          'Priority support',
          'Advanced reporting',
          'Custom pricing models'
        ],
        cta: 'Talk to Us',
        popular: true
      },
      {
        name: 'Custom',
        price: 'Contact',
        period: 'us',
        description: 'Enterprise estimating software with custom AI models',
        features: [
          'Everything in Premium',
          'Custom AI training',
          'Multi-location support',
          'Dedicated support',
          'Custom integrations',
          'Volume discounts'
        ],
        cta: 'Contact Sales',
        popular: false
      }
    ]
  },
  {
    id: 'expense',
    name: 'AI Expense Agent',
    description: 'Track, categorize, and optimize project expenses with automated processing.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'gradient-green',
    tiers: [
      {
        name: 'Starter',
        price: '$79',
        period: 'month',
        description: 'Basic expense tracking for small teams',
        features: [
          'Up to 500 expenses per month',
          'Receipt scanning (OCR)',
          'Basic categorization',
          'Email support',
          'Standard reporting'
        ],
        cta: 'Talk to Us',
        popular: false
      },
      {
        name: 'Premium',
        price: '$159',
        period: 'month',
        description: 'Advanced expense management with AI automation',
        features: [
          'Unlimited expenses',
          'Advanced AI categorization',
          'Real-time budget tracking',
          'Vendor management',
          'Priority support',
          'Advanced analytics',
          'Mobile app'
        ],
        cta: 'Talk to Us',
        popular: true
      },
      {
        name: 'Custom',
        price: 'Contact',
        period: 'us',
        description: 'Enterprise expense software with custom workflows',
        features: [
          'Everything in Premium',
          'Custom approval workflows',
          'Multi-entity support',
          'Dedicated support',
          'Custom integrations',
          'Compliance tools'
        ],
        cta: 'Contact Sales',
        popular: false
      }
    ]
  }
]

export const PricingLanding: React.FC<PricingLandingProps> = ({ onDemoClick, onMainPricingClick }) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('bid-management')
  const parallax1 = useParallax({ speed: 0.2, direction: 'up' })
  const parallax2 = useParallax({ speed: 0.3, direction: 'down' })

  const selectedAgentData = agents.find(agent => agent.id === selectedAgent)

  return (
    <div className="min-h-screen">

      <section className="py-24 relative overflow-hidden min-h-screen">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 via-[#0a1520]/40 to-dark-bg/0" />

      {/* Smooth transition edges */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-dark-bg via-dark-bg/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />

      {/* Large background text for section identity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[6rem] md:text-[9rem] lg:text-[12rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
            color: 'rgba(10, 174, 255, 0.02)',
            transform: 'translateZ(0) rotate(-1deg)'
          }}
        >
          PLANS
        </div>
      </div>

      {/* Background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={parallax1.elementRef}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-bright-blue/3 rounded-full blur-3xl"
          style={{ transform: parallax1.transform }}
        />
        <div
          ref={parallax2.elementRef}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-green/3 rounded-full blur-3xl"
          style={{ transform: parallax2.transform }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <AnimatedSection animation="slideUp" duration={0.8}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Choose Your</span>
              <br />
              <span className="hero-title-gradient">AI Agent Plan</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Select the perfect tier for each AI agent based on your business needs.
              Scale up anytime as your construction business grows.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={onMainPricingClick}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-black white-border-btn"
              >
                View Summary Pricing
              </button>
              <button
                onClick={onDemoClick}
                className="px-6 py-3 bg-gradient-to-r from-gradient-green to-gradient-dark text-white font-semibold rounded-xl transition-all duration-200 hover:opacity-90 white-border-btn"
              >
                Talk to Us
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Agent selector */}
        <AnimatedSection animation="fadeIn" delay={200} duration={0.8}>
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">Select an AI Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left h-48 flex flex-col
                             ${selectedAgent === agent.id
                               ? `border-${agent.color} bg-${agent.color}/10`
                               : 'border-dark-border bg-dark-card/50 hover:border-gray-600'
                             }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-${agent.color}/20 flex items-center justify-center mb-4 text-${agent.color}`}>
                    {agent.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{agent.name}</h3>
                  <p className="text-sm text-gray-400 flex-grow">{agent.description}</p>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing tiers for selected agent */}
        {selectedAgentData && (
          <AnimatedSection animation="slideUp" delay={300} duration={0.8} key={selectedAgent}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {selectedAgentData.name} Pricing
                </h2>
                <p className="text-lg text-gray-400">
                  Choose the plan that fits your business size and requirements
                </p>
              </div>

              <StaggeredAnimation
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                staggerDelay={150}
                childAnimation="slideUp"
              >
                {selectedAgentData.tiers.map((tier, index) => (
                  <div
                    key={`${selectedAgent}-${tier.name}`}
                    className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 flex flex-col h-[600px]
                               ${tier.popular
                                 ? `border-${selectedAgentData.color} bg-${selectedAgentData.color}/10 ring-2 ring-${selectedAgentData.color}/30`
                                 : 'border-dark-border bg-dark-card/50 hover:border-gray-600'
                               }`}
                  >
                    {/* Popular badge */}
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Tier name */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-white">{tier.name}</h3>
                      <p className="text-gray-400 text-sm">{tier.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-4xl font-bold text-white">{tier.price}</span>
                        {tier.price !== 'Contact' && (
                          <span className="text-gray-400 ml-2">/{tier.period}</span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={`${tier.name}-feature-${featureIndex}`} className="flex items-start">
                          <svg className={`w-5 h-5 text-${selectedAgentData.color} mr-3 mt-0.5 flex-shrink-0`}
                               fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={tier.cta === 'Contact Sales' ? onDemoClick : onDemoClick}
                      className={`w-full px-6 py-3 font-bold text-lg rounded-xl transition-all duration-300
                                ${tier.popular
                                  ? selectedAgentData.id === 'expense'
                                    ? 'bg-gradient-to-r from-gradient-green to-gradient-dark text-white hover:opacity-90'
                                    : `bg-${selectedAgentData.color} text-black hover:opacity-90`
                                  : 'border-2 border-gray-600 text-white hover:border-white hover:bg-white hover:text-black'
                                }`}
                    >
                      {tier.cta}
                    </button>

                    {tier.price !== 'Contact' && (
                      <p className="text-xs text-gray-500 text-center mt-3">
                        14-day free trial • No setup fees • Cancel anytime
                      </p>
                    )}
                  </div>
                ))}
              </StaggeredAnimation>
            </div>
          </AnimatedSection>
        )}

        {/* Comparison table */}
        <AnimatedSection animation="fadeIn" delay={500} duration={0.8}>
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Compare All Plans</h2>
              <p className="text-lg text-gray-400">
                See how our pricing scales with your business needs
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-dark-card/50 rounded-2xl border border-dark-border">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left p-6 text-white font-bold">Agent</th>
                    <th className="text-center p-6 text-white font-bold">Starter</th>
                    <th className="text-center p-6 text-white font-bold">Premium</th>
                    <th className="text-center p-6 text-white font-bold">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent, index) => (
                    <tr key={agent.id} className={index !== agents.length - 1 ? 'border-b border-dark-border' : ''}>
                      <td className="p-6">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg bg-${agent.color}/20 flex items-center justify-center mr-3 text-${agent.color}`}>
                            {agent.icon}
                          </div>
                          <span className="font-semibold text-white">{agent.name}</span>
                        </div>
                      </td>
                      <td className="text-center p-6 text-white font-bold">{agent.tiers[0].price}/{agent.tiers[0].period}</td>
                      <td className="text-center p-6">
                        <div className={`inline-block px-3 py-1 rounded-full bg-${agent.color}/20 text-${agent.color} font-bold`}>
                          {agent.tiers[1].price}/{agent.tiers[1].period}
                        </div>
                      </td>
                      <td className="text-center p-6 text-white font-bold">{agent.tiers[2].price} {agent.tiers[2].period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection animation="scaleIn" delay={600} duration={0.8}>
          <div className="mt-24 max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Transform Your Construction Business?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Start with any agent tier and scale as you grow. All plans include our 14-day free trial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-gradient-green to-gradient-dark text-white font-bold text-lg rounded-xl transition-all duration-200 hover:opacity-90 white-border-btn"
              >
                Talk to Us
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gradient-green mb-2">14-Day</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Free Trial</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-bright-blue mb-2">24/7</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-agent-cyan mb-2">No</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Setup Fees</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
    </div>
  )
}
