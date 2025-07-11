import type React from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { ArrowRight, Zap, Clock, TrendingUp, User, Wrench, Monitor, FileText, Calculator, CreditCard } from 'lucide-react'

import { ComingSoon } from './ComingSoon'

interface AIAgentsLandingProps {
  onDemoClick: () => void
}

// AI Agents focused testimonials
const aiTestimonials = [
  {
    id: 5,
    name: 'Paul Lorefice',
    role: 'Owner',
    company: 'New City Electric',
    location: 'New York',
    avatar: 'electrical',
    quote: "AI has helped me get quotes out I usually left for the end of the day faster than I ever could.",
    metrics: {
      label: 'Quote Speed',
      value: '10x',
      color: 'pastel-blue'
    },
    projectType: 'Electrical Contracting'
  },
  {
    id: 2,
    name: 'Ryan Tittsworth',
    role: 'Owner',
    company: 'RBT Electric',
    location: 'Ontario, CA',
    avatar: 'technician',
    quote: "These guys go above and beyond what we ask, reducing our 8 daily spreadsheets into 1 easy app.",
    metrics: {
      label: 'Efficiency Gain',
      value: '8:1',
      color: 'pastel-blue'
    },
    projectType: 'Electrical Construction'
  },
  {
    id: 3,
    name: 'Mondo Marshall',
    role: 'Project Manager',
    company: 'Semetra',
    location: 'Toronto, ON',
    avatar: 'developer',
    quote: "Being able to get rid of the spreadsheets that have taken me hours to fill out is game changing.",
    metrics: {
      label: 'Time Savings',
      value: 'Hours',
      color: 'pastel-blue'
    },
    projectType: 'Infrastructure Projects'
  },
  {
    id: 7,
    name: 'Dean Muir',
    role: 'Owner',
    company: '360 Mechanical Group',
    location: 'Alberta, CA',
    avatar: 'technician',
    quote: "The AI tool they built me helped reduce mundane tasks. Something that took 30 minutes, now takes 5. Its nuts, thanks guys!",
    metrics: {
      label: 'Task Reduction',
      value: '6x Faster',
      color: 'pastel-blue'
    },
    projectType: 'Mechanical Services'
  }
]

// Icon mapping for professional avatars
const iconMap = {
  'business': User,
  'technician': Wrench,
  'developer': Monitor,
  'electrical': Zap
}

// Icon Avatar Component
const IconAvatar: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = "" }) => {
  const IconComponent = iconMap[iconType as keyof typeof iconMap] || User

  return (
    <div className={`w-12 h-12 rounded-full bg-black-olive border border-pastel-blue/20 flex items-center justify-center ${className}`}>
      <IconComponent className="w-6 h-6 text-pastel-blue" />
    </div>
  )
}

const agents = [
  {
    id: 'bid-management',
    title: 'AI Bid Management Agent',
    description: 'Streamline your bidding process with intelligent proposal generation, price analysis, and automated documentation.',
    features: [
      'Monitor Vendor Replies',
      'Automate catogorization & price analysis',
      'Professional proposal generation',
      'Win probability calculations'
    ],
    metrics: {
      'Time Saved': '20+ hours per bid',
      'Win Rate': '+60% increase',
      'Accuracy': '95% proposal accuracy'
    },
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'estimating',
    title: 'AI Estimating Agent',
    description: 'Generate accurate cost estimates instantly using machine learning models trained on historical construction data.',
    features: [
      'Upload quantity takeoffs',
      'Real-time material pricing',
      'Labor cost calculations',
      'Automate proposal generation'
    ],
    metrics: {
      'Accuracy': '95%+ estimates',
      'Time Saved': '15+ hours per estimate',
      'Cost Reduction': '25% fewer overruns'
    },
    icon: <Calculator className="w-8 h-8" />
  },
  {
    id: 'expense',
    title: 'AI Expense Agent',
    description: 'Track, categorize, and optimize project expenses with automated receipt processing and budget monitoring.',
    features: [
      'Automated receipt scanning',
      'Smart expense categorization',
      'Real-time budget tracking',
      'Financial reporting & accounting integrations'
    ],
    metrics: {
      'Processing Speed': '10x faster',
      'Accuracy': '99% categorization',
      'Time Saved': '15+ hours per week'
    },
    icon: <CreditCard className="w-8 h-8" />
  }
]

const benefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Ready to Use',
    description: 'Deploy withing 24 hours, benefit immediately'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Save Hours Daily',
    description: 'Automate repetitive tasks and focus on what matters'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Proven Results',
    description: 'Measurable improvements in efficiency and accuracy'
  }
]

export const AIAgentsLanding: React.FC<AIAgentsLandingProps> = ({ onDemoClick }) => {
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
            AI
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">


          {/* Hero Content */}
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 px-4">
                <span className="gradient-text">AI Agents</span>
                <br />
                <span className="text-gray-x11">Ready to Deploy</span>
              </h1>
              <p className="text-base sm:text-lg md:text-2xl text-gray-x11 max-w-4xl mx-auto leading-relaxed px-4">
                Powerful AI agents designed specifically for construction professionals.
                Deploy immediately and start saving hours of manual work today.
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

      {/* Agents Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 px-4">
                <span className="gradient-text">Available AI Agents</span>
              </h2>
              <p className="text-base md:text-xl text-gray-x11 max-w-3xl mx-auto px-4">
                Each agent is trained specifically for construction workflows and ready to integrate with your existing tools.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            staggerDelay={200}
            childAnimation="slideUp"
            className="space-y-20 md:space-y-24"
          >
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Agent Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-xl bg-pastel-blue/20 flex items-center justify-center text-pastel-blue mr-6">
                      {agent.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-x11">{agent.title}</h3>
                  </div>

                  <p className="text-lg text-dark-liver leading-relaxed mb-10">
                    {agent.description}
                  </p>

                  {/* Features */}
                  <div className="mb-10">
                    <h4 className="text-lg font-semibold text-gray-x11 mb-6">Key Features:</h4>
                    <ul className="space-y-3">
                      {agent.features.map((feature) => (
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
                    {Object.entries(agent.metrics).map(([key, value]) => (
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

      {/* Interactive Scroll Transition */}
      <div className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-air-black via-black-olive/30 to-air-black" />

        {/* Animated progress indicators */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-6">
            <AnimatedSection animation="fadeIn" duration={1.5}>
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3 animate-pulse" />
                  <div className="text-xs text-pastel-blue/80 font-medium">Agents</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  <div className="text-xs text-pastel-blue/80 font-medium">Results</div>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3 animate-ping" style={{ animationDelay: '1s' }} />
                  <div className="text-xs text-pastel-blue/80 font-medium">Testimonials</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scrolling tech lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-pastel-blue/30 to-transparent animate-pulse" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-pastel-blue/20 via-transparent to-pastel-blue/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-pastel-blue/20 via-transparent to-pastel-blue/20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* AI Agents Testimonials Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/30 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-6 px-4">
                <span className="gradient-text">What Our Clients Say</span>
              </h2>
              <p className="text-base md:text-xl text-gray-x11 max-w-3xl mx-auto px-4">
                Real results from construction professionals using our AI agents.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
            staggerDelay={150}
            childAnimation="slideUp"
          >
            {aiTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group p-8 rounded-2xl bg-black-olive/40 border border-dark-liver/30
                          hover:border-pastel-blue/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <IconAvatar iconType={testimonial.avatar} />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-x11 group-hover:text-pastel-blue transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-pastel-blue font-medium">{testimonial.role}</p>
                    <p className="text-sm text-dark-liver">{testimonial.company} • {testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pastel-blue">{testimonial.metrics.value}</div>
                    <div className="text-xs text-dark-liver">{testimonial.metrics.label}</div>
                  </div>
                </div>
                <blockquote className="text-gray-x11 italic leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-sm text-dark-liver border-t border-dark-liver/30 pt-4">
                  Project Type: {testimonial.projectType}
                </div>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Interactive Transition to Coming Soon */}
      <div className="relative py-6 md:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-air-black via-black-olive/15 to-air-black" />

        {/* Floating elements with parallax effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/6 left-1/6 w-20 h-20 border-2 border-pastel-blue/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-1/6 right-1/6 w-16 h-16 border border-pastel-blue/15 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-pastel-blue/30 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Centered progress indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedSection animation="scaleIn" duration={1}>
            <div className="flex items-center space-x-4">
              <div className="h-px bg-pastel-blue/40 w-20 animate-pulse" />
              <div className="text-center">
                <div className="w-2 h-2 bg-pastel-blue rounded-full animate-bounce" />
                <div className="text-xs text-pastel-blue/60 mt-2">More Agents</div>
              </div>
              <div className="h-px bg-pastel-blue/40 w-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Coming Soon Agents Section */}
      <div className="py-4 md:py-8">
        <ComingSoon />
      </div>

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
                  Ready to Transform Your Construction Operations?
                </h3>
                <p className="text-base md:text-xl text-dark-liver mb-4 md:mb-8">
                  See how our AI agents can save you hours of manual work every day with a personalized demo.
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
