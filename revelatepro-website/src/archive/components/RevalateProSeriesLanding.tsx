import type React from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { ArrowRight, Code, Cog, Zap, Clock, Target, TrendingUp } from 'lucide-react'

interface RevalateProSeriesLandingProps {
  onDemoClick: () => void
}

const services = [
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
    metrics: {
      'Development Time': '2-4 weeks',
      'Cost Savings': '70% vs traditional',
      'Custom Fit': '100%'
    },
    icon: <Code className="w-8 h-8" />
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
    metrics: {
      'Data Entry Reduction': '80%',
      'Accuracy Improvement': '95%',
      'Time Saved': '5+ hours/week'
    },
    icon: <Cog className="w-8 h-8" />
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
    metrics: {
      'Admin Time Reduction': '60%',
      'Error Reduction': '90%',
      'Uptime': '24/7'
    },
    icon: <Zap className="w-8 h-8" />
  }
]

const benefits = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Fast Delivery',
    description: 'Get your solution in weeks, not months'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Perfect Fit',
    description: 'Built specifically for your workflows'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Proven Results',
    description: 'Measurable improvements in efficiency'
  }
]

export const RevalateProSeriesLanding: React.FC<RevalateProSeriesLandingProps> = ({ onDemoClick }) => {
  return (
    <div className="min-h-screen bg-air-black">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
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
            PRO
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Hero Content */}
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 px-4">
                <span className="gradient-text">Revalate Pro Series</span>
                <br />
                <span className="text-gray-x11">Custom Built</span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-x11 max-w-4xl mx-auto leading-relaxed px-4">
                Need something specific for your business? We build custom software, connect your existing tools, and automate the work that slows you down.
              </p>
            </div>
          </AnimatedSection>

          {/* Benefits */}
          <StaggeredAnimation
            staggerDelay={150}
            childAnimation="slideUp"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
          >
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mx-auto mb-2 md:mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-x11 mb-1 md:mb-2">{benefit.title}</h3>
                <p className="text-sm md:text-base text-dark-liver">{benefit.description}</p>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Interactive Scroll Divider */}
      <div className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-air-black via-black-olive/20 to-air-black" />

        {/* Animated divider lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto px-6">
            <AnimatedSection animation="slideUp" duration={1.2}>
              <div className="flex items-center justify-center space-x-8">
                <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/60 to-transparent flex-1 animate-pulse" />
                <div className="w-4 h-4 bg-pastel-blue rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/60 to-transparent flex-1 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Floating geometric elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-pastel-blue/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border border-pastel-blue/15 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-8 h-8 border border-pastel-blue/10 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 px-4">
                <span className="gradient-text">Available Services</span>
              </h2>
              <p className="text-base md:text-xl text-gray-x11 max-w-3xl mx-auto px-4">
                Get exactly what your business needs without the complexity or high costs.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            staggerDelay={200}
            childAnimation="slideUp"
            className="space-y-20 md:space-y-24"
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Service Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mr-6">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-x11">{service.title}</h3>
                  </div>

                  <p className="text-lg text-dark-liver leading-relaxed mb-10">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-10">
                    <h4 className="text-lg font-semibold text-gray-x11 mb-6">Key Features:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-dark-liver">
                          <div className="w-2 h-2 bg-pastel-blue rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={onDemoClick}
                    className="px-6 py-3 bg-pastel-blue text-air-black font-semibold rounded-xl hover:bg-white transition-all duration-300 flex items-center gap-2"
                  >
                    Talk to Us
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Metrics */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="grid grid-cols-1 gap-8">
                    {Object.entries(service.metrics).map(([key, value]) => (
                      <div key={key} className="p-8 rounded-xl bg-black-olive/40 border border-dark-liver/30">
                        <div className="text-3xl font-bold text-pastel-blue mb-3">{value}</div>
                        <div className="text-gray-x11 font-medium">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Final Transition */}
      <div className="relative py-6 md:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-air-black via-black-olive/20 to-air-black" />

        {/* Animated call-to-action preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedSection animation="fadeIn" duration={1.2}>
            <div className="text-center">
              <div className="w-8 h-8 bg-pastel-blue/20 rounded-full mx-auto mb-4 animate-pulse" />
              <div className="text-sm text-pastel-blue/70 font-medium">Ready to get started?</div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scaleIn" duration={0.8}>
            <div className="text-center">
              <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-3xl bg-gradient-to-r from-black-olive/40 to-black-olive/60 border border-dark-liver/30">
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-gray-x11">
                  Ready to Stop Wasting Time on Manual Work?
                </h3>
                <p className="text-base md:text-xl text-dark-liver mb-4 md:mb-8">
                  We understand construction because we've been there. Let's talk about what's slowing you down and how we can fix it with the right tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button
                    onClick={onDemoClick}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-pastel-blue text-air-black font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:bg-white shadow-lg hover:shadow-xl min-h-[48px]"
                  >
                    Talk to Us
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
