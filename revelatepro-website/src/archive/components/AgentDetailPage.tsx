import type React from 'react'
import { useState, lazy, Suspense, memo, useMemo, useCallback } from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { useParallax } from '../hooks/useParallax'
import { ErrorBoundary } from './ErrorBoundary'
import { CheckCircle, Link } from 'lucide-react'

// Brand logo mapping function
const getBrandLogo = (brandName: string) => {
  const brandLogos: { [key: string]: string } = {
    'Sage': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/sage.svg',
    'Xero': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/xero.svg',
    'Microsoft': 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
    'Google': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/google.svg',
    'Quickbooks': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/quickbooks.svg',
    'Bluebeam': '/images/bluebeam-logo.png',
    'Open AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/openai.svg',
    'Gemini AI': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googlegemini.svg',
    'Make': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/make.svg',
    'Glide': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/glide.svg',
    'DropBox': 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/dropbox.svg'
  }

  return brandLogos[brandName] || null
}

// Lazy load heavy components for better performance
const FileUploadSimulation = lazy(() => import('./FileUploadSimulation'))
const SimplifiedDemo = lazy(() => import('./SimplifiedDemo'))
const DemoResults = lazy(() => import('./DemoResults'))

// Enhanced loading fallback component
const ComponentLoader: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
  <ErrorBoundary
    fallback={
      <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-center">
        <div className="w-10 h-10 mx-auto mb-3 text-yellow-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
          </svg>
        </div>
        <p className="text-yellow-300 font-medium text-sm">Demo temporarily unavailable</p>
        <p className="text-gray-400 text-xs mt-1">Please refresh the page or try again later</p>
      </div>
    }
  >
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading interactive demo...</p>
          <div className="w-20 bg-gray-700 rounded-full h-1 mx-auto mt-2">
            <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  </ErrorBoundary>
))

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

interface Benefit {
  metric: string
  description: string
  color: string
}

interface UseCase {
  title: string
  description: string
  before: string
  after: string
}

interface DemoStep {
  action: string
  time: string
  result: string
}

interface AgentDemo {
  title: string
  steps: DemoStep[]
  type: 'bid-management' | 'estimating' | 'expense'
}

interface AgentDetailProps {
  agent: {
    id: string
    name: string
    tagline: string
    description: string
    longDescription: string
    color: string
    bgColor: string
    borderColor: string
    price: string
    period: string
    savings: string
    gradientBg?: boolean
    icon: React.ReactNode
    features: Feature[]
    benefits: Benefit[]
    useCases: UseCase[]
    integrations: string[]
    testimonial: {
      quote: string
      author: string
      company: string
      role: string
    }
  }
  onDemoClick?: () => void
  onRevalateProClick?: () => void
  onBack?: () => void
}

// Map agent IDs to demo problem IDs for consistency
const agentToDemoMapping = {
  'bid-management': 'bidding-stress',
  'estimating': 'estimation-guesswork',
  'expense': 'financial-chaos'
}

// Agent-specific demo configurations
const agentDemos: Record<string, AgentDemo> = {
  'bid-management': {
    title: 'AI Bid Generation Live Demo',
    type: 'bid-management',
    steps: [
      { action: 'Monitor Vendor Replies', time: '1.0s', result: 'Vendor responses tracked' },
      { action: 'Categorize & Analyze Pricing', time: '2.5s', result: 'Pricing patterns analyzed' },
      { action: 'Generate Proposal', time: '3.2s', result: '15-page proposal created' },
      { action: 'Optimize Pricing', time: '1.8s', result: 'Win probability: 73%' }
    ]
  },
  'estimating': {
    title: 'AI Estimating Live Demo',
    type: 'estimating',
    steps: [
      { action: 'Upload Take-off', time: '2.0s', result: 'Take-off data processed' },
      { action: 'Cost Data Analysis', time: '4.5s', result: '847 line items analyzed' },
      { action: 'Price Book Pricing', time: '1.3s', result: 'Price book rates applied' },
      { action: 'Generate Estimate', time: '0.8s', result: '$2.4M total estimate' }
    ]
  },
  'expense': {
    title: 'AI Expense Processing Live Demo',
    type: 'expense',
    steps: [
      { action: 'Monitor Vendor Expenses', time: '0.3s', result: 'Vendor expenses tracked' },
      { action: 'OCR Data Extraction', time: '0.9s', result: 'Data extracted from receipts' },
      { action: 'Project Allocation & Categorization', time: '0.5s', result: 'Expenses categorized & allocated' },
      { action: 'Update Accounting Software', time: '0.2s', result: 'QuickBooks updated instantly' }
    ]
  }
}

// Working Interactive Agent Demo Component (Simplified)
const WorkingInteractiveDemo: React.FC<{
  demo: AgentDemo
  color: string
  agentId: string
}> = memo(({ demo, color, agentId }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hasBeenStarted, setHasBeenStarted] = useState(false)

  const startDemo = useCallback(() => {
    setIsPlaying(true)
    setCurrentStep(0)
    setProgress(0)
    setHasBeenStarted(true)

    // Clear any existing timeouts
    const timeouts: NodeJS.Timeout[] = []

    // Process demo steps
    demo.steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index + 1)
        const stepProgress = ((index + 1) / demo.steps.length) * 100
        setProgress(stepProgress)

        if (index === demo.steps.length - 1) {
          const finalTimeout = setTimeout(() => {
            setIsPlaying(false)
          }, 1000)
          timeouts.push(finalTimeout)
        }
      }, (index + 1) * 800)
      timeouts.push(timeout)
    })

    // Return cleanup function
    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout)
      }
    }
  }, [demo])

  const resetDemo = useCallback(() => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setHasBeenStarted(false)
  }, [])

  const stepStatuses = useMemo(() => {
    return demo.steps.map((_, index) => ({
      isCompleted: currentStep > index + 1,
      isActive: currentStep === index + 1,
      isPending: currentStep <= index,
      progress: currentStep > index + 1 ? 100 : currentStep === index + 1 ? progress : 0
    }))
  }, [currentStep, demo.steps, progress])

  return (
    <div className={`p-4 md:p-8 rounded-2xl bg-${color}/5 border border-${color}/20 mb-6 md:mb-10`}>
      {/* Header - Mobile optimized */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
        <h4 className={`text-base md:text-lg font-semibold text-${color} leading-tight`}>{demo.title}</h4>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={startDemo}
            disabled={isPlaying}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-pastel-blue text-white font-bold rounded-xl transition-all duration-300 shadow-lg text-sm md:text-base ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'}`}
          >
            {isPlaying ? 'Running...' : 'Start Demo'}
          </button>
          <button
            onClick={resetDemo}
            className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 white-border-btn text-sm md:text-base"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Progress bar - Mobile optimized */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
          <span>Demo Progress</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 md:h-2">
          <div
            className={`bg-${color} h-1.5 md:h-2 rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Demo Steps - Mobile optimized */}
      <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
        {demo.steps.map((step, index) => {
          const status = stepStatuses[index]

          return (
            <div
              key={`${agentId}-step-${step.action.replace(/\s+/g, '-').toLowerCase()}`}
              className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 rounded-xl transition-all duration-300
                         ${status.isCompleted
                           ? `bg-${color}/20 border border-${color}/30`
                           : status.isActive
                             ? `bg-${color}/10 border border-${color}/20 animate-pulse shadow-lg`
                             : 'bg-gray-800/50 border border-gray-700'
                         }`}
            >
              <div className="flex items-center mb-2 md:mb-0">
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-3 md:mr-4 transition-all duration-300
                             ${status.isCompleted
                               ? `bg-${color} text-black`
                               : status.isActive
                                 ? `bg-${color}/50 text-white animate-pulse`
                                 : 'bg-gray-600 text-gray-300'
                             }`}
                >
                  {status.isCompleted ? (
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-xs md:text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div>
                  <div className="text-white font-medium text-sm md:text-base leading-tight">{step.action}</div>
                  <div className="text-xs md:text-sm text-gray-400">{step.time}</div>
                </div>
              </div>
              {/* Progress indicator for mobile */}
              {(status.isActive || status.isCompleted) && (
                <div className="flex items-center justify-between md:justify-end">
                  <div className="flex items-center gap-2 mr-3">
                    <div className="text-xs text-gray-400">{status.progress}%</div>
                    <div className="w-16 md:w-20 bg-gray-700 rounded-full h-1 md:h-1.5">
                      <div
                        className={`bg-${color} h-1 md:h-1.5 rounded-full transition-all duration-300`}
                        style={{ width: `${status.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    status.isCompleted ? `bg-${color} text-black` : `bg-${color}/50 text-white`
                  }`}>
                    {status.isCompleted ? '✓' : '•'}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Results section - Mobile optimized */}
      {progress === 100 && (
        <div className="mt-6 md:mt-8 p-2 md:p-6 bg-gradient-to-r from-pastel-blue/20 to-gradient-dark/20 border-0 md:border border-pastel-blue/30 rounded-none md:rounded-xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-full bg-pastel-blue/20 border border-pastel-blue/40 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-pastel-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h5 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">
              Demo Complete!
            </h5>
            <p className="text-xs md:text-sm text-gray-300">
              AI processing completed successfully
            </p>
          </div>

          {/* Enhanced Visual Results using DemoResults component */}
          <Suspense fallback={
            <div className="p-6 md:p-8 bg-pastel-blue/10 rounded-lg border border-pastel-blue/20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pastel-blue mx-auto mb-3" />
              <p className="text-pastel-blue font-medium text-sm">Loading results...</p>
            </div>
          }>
            <DemoResults
              demoType={agentId}
              isVisible={true}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
})

WorkingInteractiveDemo.displayName = 'WorkingInteractiveDemo'

// Note: Complex InteractiveAgentDemo has been simplified to WorkingInteractiveDemo
// to eliminate notification system dependencies and potential errors

export const AgentDetailPage: React.FC<AgentDetailProps> = ({ agent, onDemoClick, onRevalateProClick, onBack }) => {
  const parallaxBg = useParallax({ speed: 0.2, direction: 'up' })
  const parallaxOrb1 = useParallax({ speed: 0.3, direction: 'down' })
  const parallaxOrb2 = useParallax({ speed: 0.15, direction: 'up' })

  // Get demo configuration for this agent
  const agentDemo = agentDemos[agent.id]

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background elements with parallax */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-[#0a1520] to-dark-bg" />

        <div
          ref={parallaxBg.elementRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: parallaxBg.transform }}
        >
          <div
            className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-black leading-none select-none tracking-tighter opacity-5"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.03)',
              color: "rgba(196, 255, 0, 0.02)",
              transform: 'translateZ(0) rotate(-3deg)'
            }}
          >
            AI
          </div>
        </div>

        <div
          ref={parallaxOrb1.elementRef}
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-${agent.color}/5 rounded-full blur-3xl`}
          style={{ transform: parallaxOrb1.transform }}
        />
        <div
          ref={parallaxOrb2.elementRef}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bright-blue/5 rounded-full blur-3xl"
          style={{ transform: parallaxOrb2.transform }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          {onBack && (
            <AnimatedSection animation="fadeIn" duration={0.6}>
              <div className="mb-8">
                <button
                  onClick={onBack}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-pastel-blue/10 border border-pastel-blue/30 rounded-full backdrop-blur-sm hover:bg-pastel-blue/20 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-pastel-blue group-hover:translate-x-[-2px] transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-pastel-blue font-medium">Back to AI Agents</span>
                </button>
              </div>
            </AnimatedSection>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Agent Info */}
            <div>
              <AnimatedSection animation="slideLeft" duration={0.8}>
                <div className="flex items-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mr-6 ${agent.bgColor} border ${agent.borderColor}`}>
                    <div className={`text-${agent.color} text-2xl`}>
                      {agent.icon}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {agent.name}
                    </h1>
                    <p className={`text-xl font-semibold text-${agent.color}`}>
                      {agent.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {agent.longDescription}
                </p>

                <div className="flex justify-start">
                  <button
                    onClick={onRevalateProClick}
                    className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-black white-border-btn"
                  >
                    Make it Custom
                  </button>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Pricing Card */}
            <div>
              <AnimatedSection animation="slideRight" delay={200} duration={0.8}>
                <div className={`p-8 rounded-3xl border-2 ${agent.borderColor} ${agent.bgColor}
                               backdrop-blur-sm`}>
                  <div className="text-center mb-6">
                    <div className="text-xs text-gray-500 mb-1">Starting at</div>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-white">{agent.price}</span>
                      <span className="text-lg text-gray-400 ml-1">/{agent.period}</span>
                    </div>
                    <div className={`text-sm font-semibold text-${agent.color}`}>
                      {agent.savings}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {agent.benefits.map((benefit, index) => (
                      <div key={`benefit-${index}-${benefit.description.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center justify-between p-4 rounded-xl bg-black/30">
                        <span className="text-gray-300">{benefit.description}</span>
                        <span className={`text-2xl font-bold text-${benefit.color}`}>
                          {benefit.metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={onDemoClick}
                      className="w-full px-6 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-black white-border-btn transition-all duration-300"
                    >
                      Talk to Us
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                      24-hour setup • Company branded
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      {agentDemo && (
        <section className="py-24 relative bg-gradient-to-b from-transparent via-[#0a1520]/20 to-transparent">
          <div className="container mx-auto px-6">
            <AnimatedSection animation="slideUp" duration={0.8}>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                  See {agent.name} in Action
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Experience the power of AI-driven {agent.name.toLowerCase()} with our interactive demo.
                  Watch as complex tasks are completed in seconds with real-time notifications and insights.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scaleIn" delay={300} duration={0.8}>
              <div className="max-w-4xl mx-auto">
                <WorkingInteractiveDemo
                  demo={agentDemo}
                  color={agent.color}
                  agentId={agent.id}
                />
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {agent.name} comes equipped with advanced capabilities designed specifically for construction professionals.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={120}
            childAnimation="slideUp"
          >
            {agent.features.map((feature, index) => (
              <div
                key={`feature-${index}-${feature.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="p-8 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-gray-600 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-${agent.color}/20 flex items-center justify-center mb-6 text-${agent.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-[#0a1520]/30 to-transparent">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Real-World Applications
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                See how construction professionals use {agent.name} to solve everyday challenges.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="space-y-12"
            staggerDelay={150}
            childAnimation="slideUp"
          >
            {agent.useCases.map((useCase, index) => (
              <div
                key={`usecase-${index}-${useCase.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="max-w-6xl mx-auto p-8 rounded-3xl bg-dark-card/30 border border-dark-border"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Before */}
                      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-red-300">Before</h4>
                        </div>
                        <p className="text-gray-400">{useCase.before}</p>
                      </div>

                      {/* After */}
                      <div className={`p-6 rounded-2xl bg-${agent.color}/10 border border-${agent.color}/30`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-8 h-8 rounded-full bg-${agent.color}/20 flex items-center justify-center mr-3`}>
                            <svg className={`w-4 h-4 text-${agent.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className={`font-bold text-${agent.color}`}>After</h4>
                        </div>
                        <p className="text-gray-400">{useCase.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Seamless Integrations
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {agent.name} works with the tools you already use, ensuring a smooth transition and enhanced productivity.
              </p>
            </div>
          </AnimatedSection>

          <StaggeredAnimation
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            staggerDelay={100}
            childAnimation="fadeIn"
          >
            {agent.integrations.map((integration, index) => {
              const brandLogo = getBrandLogo(integration)
              return (
                <div
                  key={`integration-${index}-${integration.replace(/\s+/g, '-').toLowerCase()}`}
                  className="p-6 rounded-2xl bg-dark-card/30 border border-dark-border hover:border-gray-600 transition-all duration-300 text-center"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center">
                      {brandLogo && integration !== 'Rest API' ? (
                        <img
                          src={brandLogo}
                          alt={`${integration} logo`}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            // Fallback to link icon if image fails to load
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            const linkIcon = parent?.querySelector('.lucide-link') as HTMLElement
                            if (linkIcon) {
                              linkIcon.classList.remove('hidden')
                            }
                          }}
                        />
                      ) : null}
                      <Link className={`w-6 h-6 text-gray-600 ${brandLogo && integration !== 'Rest API' ? 'hidden' : ''}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{integration}</h3>
                </div>
              )
            })}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scaleIn" duration={0.8}>
            <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>

              <blockquote className="text-2xl md:text-3xl font-light italic text-gray-300 mb-8 leading-relaxed">
                "{agent.testimonial.quote}"
              </blockquote>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{agent.testimonial.author}</div>
                  <div className="text-gray-400">{agent.testimonial.role}</div>
                  <div className={`text-${agent.color} font-semibold`}>{agent.testimonial.company}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="scaleIn" duration={0.8}>
            <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Ready to Transform Your Workflow?
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of construction professionals who are already using {agent.name} to save time, reduce costs, and increase accuracy.
              </p>

              <div className="flex justify-center items-center">
                <button
                  onClick={onRevalateProClick}
                  className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-black white-border-btn"
                >
                  Make it Custom
                </button>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                24-hour setup • Company Branded • Cancel anytime
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
