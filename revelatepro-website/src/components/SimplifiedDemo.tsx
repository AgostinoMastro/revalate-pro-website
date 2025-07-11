import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { FileText, Search, Edit3, DollarSign, Ruler, BarChart3, TrendingUp, Clipboard, Target, RotateCcw, Camera, Clock, Settings, Wrench, CheckCircle, Star, MessageSquare, PieChart, FileEdit, Upload, Calculator, BookOpen, CreditCard, ScanLine, FolderOpen, Database, Users, Eye } from 'lucide-react'
import { ROIDashboard } from './AnimatedROIComponents'
import { ExpandableSection } from './ExpandableSection'
import PDFDocumentView from './PDFDocumentView'

interface SimplifiedDemoProps {
  isActive: boolean
  demoType: 'bid-generation' | 'financial-monitoring' | 'estimation' | 'document-processing' | 'project-tracking' | 'safety-compliance' | 'rfp-response' | 'bid-management' | 'estimating' | 'expense'
  onDemoComplete: () => void
  className?: string
}

// Mapping function to convert agent IDs to demo types
const mapAgentIdToDemoType = (agentId: string): SimplifiedDemoProps['demoType'] => {
  const mapping: Record<string, SimplifiedDemoProps['demoType']> = {
    'bid-management': 'bid-generation',
    'estimating': 'estimation',
    'expense': 'financial-monitoring'
  }
  // If it's already a valid demo type, return it, otherwise use mapping
  const validDemoTypes = ['bid-generation', 'financial-monitoring', 'estimation', 'document-processing', 'project-tracking', 'safety-compliance', 'rfp-response']
  if (validDemoTypes.includes(agentId)) {
    return agentId as SimplifiedDemoProps['demoType']
  }
  return mapping[agentId] || 'bid-generation'
}

interface DemoStep {
  title: string
  description: string
  progress: number
  status: 'pending' | 'processing' | 'complete'
  timeSeconds: number
  impact: string
  icon: string
}

interface ROIMetrics {
  timeSaved: string
  costReduction: string
  accuracyImprovement: string
  competitiveEdge: string
}



// Icon mapping for demo steps
const iconMap = {
  'fileText': FileText,
  'search': Search,
  'edit3': Edit3,
  'dollarSign': DollarSign,
  'ruler': Ruler,
  'barChart3': BarChart3,
  'trendingUp': TrendingUp,
  'clipboard': Clipboard,
  'target': Target,
  'rotateCcw': RotateCcw,
  'camera': Camera,
  'clock': Clock,
  'settings': Settings,
  'wrench': Wrench,
  'checkCircle': CheckCircle,
  'messageSquare': MessageSquare,
  'pieChart': PieChart,
  'fileEdit': FileEdit,
  'upload': Upload,
  'calculator': Calculator,
  'bookOpen': BookOpen,
  'creditCard': CreditCard,
  'scanLine': ScanLine,
  'folderOpen': FolderOpen,
  'database': Database,
  'users': Users,
  'eye': Eye
}

// Icon component for consistent step icons
const StepIcon: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = "w-6 h-6" }) => {
  const IconComponent = iconMap[iconType as keyof typeof iconMap] || FileText
  return <IconComponent className={`text-pastel-blue ${className}`} />
}

// Demo data for different AI agent types
const getDemoSteps = (demoType: SimplifiedDemoProps['demoType']): DemoStep[] => {
  // Convert agent ID to demo type if needed
  const actualDemoType = mapAgentIdToDemoType(demoType)

  switch (actualDemoType) {
    case 'bid-generation':
      return [
        {
          title: 'Monitor Vendor Replies',
          description: 'AI tracking vendor responses and availability...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Saves 4-6 hours of manual review',
          icon: 'messageSquare'
        },
        {
          title: 'Categorize & Analyze Pricing',
          description: 'AI analyzing pricing patterns and cost structures...',
          progress: 0,
          status: 'pending',
          timeSeconds: 4,
          impact: 'Uncovers $50K+ pricing opportunities',
          icon: 'pieChart'
        },
        {
          title: 'Generate Proposal',
          description: 'Creating personalized 18-page winning proposal...',
          progress: 0,
          status: 'pending',
          timeSeconds: 5,
          impact: 'Increases win rate by 60%+',
          icon: 'fileEdit'
        },
        {
          title: 'Optimize Pricing',
          description: 'AI calculating optimal bid for 78% win probability...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Maximizes profit while staying competitive',
          icon: 'dollarSign'
        }
      ]

    case 'rfp-response':
      return [
        {
          title: 'Document Review',
          description: 'AI analyzing 47-page RFP requirements and specifications...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Saves 4-6 hours of manual review',
          icon: 'eye'
        },
        {
          title: 'Competitor Intelligence',
          description: 'Researching 12 competitors, pricing strategies...',
          progress: 0,
          status: 'pending',
          timeSeconds: 4,
          impact: 'Uncovers $50K+ pricing opportunities',
          icon: 'search'
        },
        {
          title: 'Proposal Generation',
          description: 'Creating personalized 18-page winning proposal...',
          progress: 0,
          status: 'pending',
          timeSeconds: 5,
          impact: 'Increases win rate by 60%+',
          icon: 'fileEdit'
        },
        {
          title: 'Pricing Optimization',
          description: 'AI calculating optimal bid for 78% win probability...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Maximizes profit while staying competitive',
          icon: 'dollarSign'
        }
      ]

    case 'estimation':
      return [
        {
          title: 'Upload Take-off',
          description: 'AI processing digital take-off data and specifications...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Saves 4-6 hours of manual plan review',
          icon: 'upload'
        },
        {
          title: 'Cost Data Analysis',
          description: 'Analyzing cost data for 847 line items...',
          progress: 0,
          status: 'pending',
          timeSeconds: 4,
          impact: 'Eliminates 95% of measurement errors',
          icon: 'calculator'
        },
        {
          title: 'Price Book Pricing',
          description: 'Applying price book rates and labor costs...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Uses current price book data for accuracy',
          icon: 'bookOpen'
        },
        {
          title: 'Generate Estimate',
          description: 'Generating complete $2.4M project estimate...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: '95%+ accuracy with detailed breakdowns',
          icon: 'clipboard'
        }
      ]

    case 'financial-monitoring':
      return [
        {
          title: 'Monitor Vendor Expenses',
          description: 'AI tracking vendor expenses and receipts...',
          progress: 0,
          status: 'pending',
          timeSeconds: 1,
          impact: 'Eliminates manual data entry errors',
          icon: 'creditCard'
        },
        {
          title: 'OCR Data Extraction',
          description: 'AI extracting data from expense receipts...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Saves 15+ minutes per receipt',
          icon: 'scanLine'
        },
        {
          title: 'Project Allocation & Categorization',
          description: 'Auto-categorizing and assigning to project budgets...',
          progress: 0,
          status: 'pending',
          timeSeconds: 1,
          impact: 'Prevents budget overruns before they happen',
          icon: 'folderOpen'
        },
        {
          title: 'Update Accounting Software',
          description: 'Syncing with QuickBooks and updating records...',
          progress: 0,
          status: 'pending',
          timeSeconds: 1,
          impact: 'Provides instant financial visibility',
          icon: 'database'
        }
      ]

    case 'document-processing':
      return [
        {
          title: 'Document Scan',
          description: 'AI scanning 24-page contract for key terms...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Identifies critical clauses in seconds',
          icon: 'scanLine'
        },
        {
          title: 'Data Extraction',
          description: 'Extracting dates, amounts, and obligations...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Reduces contract review time by 80%',
          icon: 'eye'
        },
        {
          title: 'Risk Analysis',
          description: 'Analyzing contract risks and red flags...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Prevents costly legal oversights',
          icon: 'search'
        },
        {
          title: 'Summary Generation',
          description: 'Creating executive summary and action items...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Delivers key insights instantly',
          icon: 'clipboard'
        }
      ]

    case 'project-tracking':
      return [
        {
          title: 'Progress Scan',
          description: 'Analyzing site photos and progress reports...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Real-time project visibility',
          icon: 'camera'
        },
        {
          title: 'Schedule Analysis',
          description: 'Comparing actual vs planned progress...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Predicts delays before they happen',
          icon: 'clock'
        },
        {
          title: 'Resource Optimization',
          description: 'Recommending crew and equipment adjustments...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Optimizes productivity by 25%',
          icon: 'users'
        },
        {
          title: 'Report Generation',
          description: 'Creating stakeholder progress updates...',
          progress: 0,
          status: 'pending',
          timeSeconds: 1,
          impact: 'Automated client communications',
          icon: 'barChart3'
        }
      ]

    case 'safety-compliance':
      return [
        {
          title: 'Safety Inspection',
          description: 'AI analyzing site safety conditions from photos...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Identifies 95% of safety hazards',
          icon: 'eye'
        },
        {
          title: 'Compliance Check',
          description: 'Verifying OSHA and local safety regulations...',
          progress: 0,
          status: 'pending',
          timeSeconds: 3,
          impact: 'Prevents $100K+ in fines',
          icon: 'checkCircle'
        },
        {
          title: 'Risk Assessment',
          description: 'Calculating safety risk scores and priorities...',
          progress: 0,
          status: 'pending',
          timeSeconds: 2,
          impact: 'Reduces incidents by 70%',
          icon: 'barChart3'
        },
        {
          title: 'Action Plan',
          description: 'Generating corrective action recommendations...',
          progress: 0,
          status: 'pending',
          timeSeconds: 1,
          impact: 'Creates immediate safety improvements',
          icon: 'clipboard'
        }
      ]

    default:
      return getDemoSteps('bid-generation')
  }
}

const SimplifiedDemo: React.FC<SimplifiedDemoProps> = ({ isActive, demoType, onDemoComplete, className = '' }) => {
  const actualDemoType = mapAgentIdToDemoType(demoType)
  const [steps, setSteps] = useState<DemoStep[]>(() => getDemoSteps(actualDemoType))
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0)
  const [showResults, setShowResults] = useState(false)


  // Real-time progress animation
  const [animatedProgress, setAnimatedProgress] = useState<number[]>(steps.map(() => 0))

  const resetDemo = useCallback(() => {
    setIsRunning(false)
    setCurrentStepIndex(-1)
    setTotalTimeElapsed(0)
    setShowResults(false)
    const resetSteps = getDemoSteps(actualDemoType).map(step => ({ ...step, progress: 0, status: 'pending' as const }))
    setSteps(resetSteps)
    setAnimatedProgress(resetSteps.map(() => 0))
  }, [actualDemoType])

  const startDemo = useCallback(async () => {
    if (!isActive || isRunning) return

    setIsRunning(true)
    setCurrentStepIndex(0)
    setTotalTimeElapsed(0)
    setShowResults(false)



    // Reset steps to initial state without calling resetDemo
    const initialSteps = getDemoSteps(actualDemoType).map(step => ({ ...step, progress: 0, status: 'pending' as const }))
    setSteps(initialSteps)
    setAnimatedProgress(initialSteps.map(() => 0))

    let timeCounter = 0
    const demoSteps = getDemoSteps(actualDemoType)

    // Process each step with real-time animations
    for (let stepIndex = 0; stepIndex < demoSteps.length; stepIndex++) {
      setCurrentStepIndex(stepIndex)

      // Mark step as processing
      setSteps(prev => prev.map((step, index) =>
        index === stepIndex
          ? { ...step, status: 'processing' as const }
          : step
      ))



      // Animate progress for this step with smooth increments
      const stepDuration = demoSteps[stepIndex].timeSeconds * 1000 // Convert to milliseconds
      const progressIncrement = 100 / (stepDuration / 100) // Update every 100ms for better performance

      for (let progress = 0; progress <= 100; progress += progressIncrement) {
        await new Promise(resolve => setTimeout(resolve, 100)) // Reduced from 50ms to 100ms
        timeCounter += 0.1 // Adjusted for new timing
        setTotalTimeElapsed(timeCounter)

        const actualProgress = Math.min(progress, 100)

        setSteps(prev => prev.map((step, index) =>
          index === stepIndex
            ? { ...step, progress: actualProgress }
            : step
        ))

        // Update animated progress for visual effects
        setAnimatedProgress(prev => prev.map((value, index) =>
          index === stepIndex ? actualProgress : value
        ))
      }

      // Mark step as complete
      setSteps(prev => prev.map((step, index) =>
        index === stepIndex
          ? { ...step, status: 'complete' as const, progress: 100 }
          : step
      ))


      await new Promise(resolve => setTimeout(resolve, 300))
    }

    setIsRunning(false)
    setShowResults(true)

    onDemoComplete()
  }, [isActive, isRunning, actualDemoType, onDemoComplete])

  // Update steps when demoType changes
  useEffect(() => {
    const newSteps = getDemoSteps(actualDemoType)
    setSteps(newSteps)
    setAnimatedProgress(newSteps.map(() => 0))
    resetDemo()
  }, [actualDemoType, resetDemo])

  useEffect(() => {
    if (!isActive) {
      resetDemo()
    }
  }, [isActive, resetDemo])

  // Auto-start demo when component becomes active
  useEffect(() => {
    if (isActive && !isRunning && !showResults) {
      // Small delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        console.log('Auto-starting demo:', { actualDemoType, isActive, isRunning, showResults })
        startDemo()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isActive, isRunning, showResults, startDemo, actualDemoType])

  // Additional auto-start trigger for mobile modal usage
  useEffect(() => {
    if (isActive && currentStepIndex === -1 && !isRunning) {
      console.log('Triggering demo start from mobile modal')
      const timer = setTimeout(startDemo, 500)
      return () => clearTimeout(timer)
    }
  }, [isActive, currentStepIndex, isRunning, startDemo])

  const getDemoTitle = () => {
    const titleMap = {
      'bid-generation': 'AI Bid Generation Demo',
      'estimation': 'AI Estimating Demo',
      'financial-monitoring': 'AI Expense Processing Live Demo',
      'document-processing': 'Document Processing Demo',
      'project-tracking': 'Project Tracking Demo',
      'safety-compliance': 'Safety Compliance Demo',
      'rfp-response': 'RFP Response Demo',
      // Agent ID fallbacks
      'bid-management': 'AI Bid Generation Demo',
      'estimating': 'AI Estimating Demo',
      'expense': 'AI Expense Processing Live Demo'
    }
    return titleMap[actualDemoType as keyof typeof titleMap] || 'AI Demo'
  }

  const getDemoDescription = () => {
    const descMap = {
      'bid-generation': 'Watch AI create winning proposals in seconds',
      'estimation': 'See AI generate precise estimates instantly',
      'financial-monitoring': 'Experience real-time expense processing',
      'document-processing': 'See AI extract and analyze contract data',
      'project-tracking': 'Monitor project progress with AI insights',
      'safety-compliance': 'Ensure site safety with AI monitoring',
      'rfp-response': 'Review and respond to RFPs efficiently',
      // Agent ID fallbacks
      'bid-management': 'Watch AI create winning proposals in seconds',
      'estimating': 'See AI generate precise estimates instantly',
      'expense': 'Experience real-time expense processing'
    }
    return descMap[actualDemoType as keyof typeof descMap] || 'See AI in action'
  }

  const getROIMetrics = (): ROIMetrics => {
    const roiMap = {
      'bid-generation': {
        timeSaved: '18+ hours/bid',
        costReduction: '$50K+ pricing',
        accuracyImprovement: '60% win rate',
        competitiveEdge: '48x faster'
      },
      'estimation': {
        timeSaved: '20+ hours/estimate',
        costReduction: '80% fewer overruns',
        accuracyImprovement: '95%+ accuracy',
        competitiveEdge: '100x faster'
      },
      'financial-monitoring': {
        timeSaved: '15+ hours/week',
        costReduction: '25% fewer overruns',
        accuracyImprovement: '99% accuracy',
        competitiveEdge: 'Real-time data'
      },
      'document-processing': {
        timeSaved: '12+ hours/contract',
        costReduction: '90% faster review',
        accuracyImprovement: '98% accuracy',
        competitiveEdge: 'Risk detection'
      },
      'project-tracking': {
        timeSaved: '10+ hours/week',
        costReduction: '20% efficiency',
        accuracyImprovement: '95% prediction',
        competitiveEdge: 'Proactive alerts'
      },
      'safety-compliance': {
        timeSaved: '8+ hours/inspection',
        costReduction: '$100K+ fine prevention',
        accuracyImprovement: '95% hazard detection',
        competitiveEdge: '70% fewer incidents'
      },
      'rfp-response': {
        timeSaved: '10+ hours/rfp',
        costReduction: '20% fewer overruns',
        accuracyImprovement: '95%+ accuracy',
        competitiveEdge: '100x faster'
      },
      // Agent ID fallbacks
      'bid-management': {
        timeSaved: '18+ hours/bid',
        costReduction: '$50K+ pricing',
        accuracyImprovement: '60% win rate',
        competitiveEdge: '48x faster'
      },
      'estimating': {
        timeSaved: '20+ hours/estimate',
        costReduction: '80% fewer overruns',
        accuracyImprovement: '95%+ accuracy',
        competitiveEdge: '100x faster'
      },
      'expense': {
        timeSaved: '15+ hours/week',
        costReduction: '25% fewer overruns',
        accuracyImprovement: '99% accuracy',
        competitiveEdge: 'Real-time data'
      }
    }
    return roiMap[actualDemoType as keyof typeof roiMap] || roiMap['bid-generation']
  }

  const isComplete = steps.every(step => step.status === 'complete')

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Mobile-optimized header with sound toggle */}
      <div className="mb-3 md:mb-6">
        <div className="flex flex-col space-y-2 mb-3 md:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-2 sm:mb-0">
              <h3 className="text-base md:text-xl font-bold text-white leading-tight">{getDemoTitle()}</h3>
              <p className="text-xs md:text-base text-gray-400 leading-snug">{getDemoDescription()}</p>
            </div>


          </div>
        </div>

        {/* Progress overview bar - More compact on mobile */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Overall Progress</span>
            <span className="font-medium text-pastel-blue">{isRunning ? `${Math.round((currentStepIndex + 1) / steps.length * 100)}%` : isComplete ? '100%' : '0%'}</span>
          </div>
          <div className="w-full bg-dark-liver rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-pastel-blue to-pastel-blue/60 h-1.5 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{
                width: `${isRunning ? ((currentStepIndex + 1) / steps.length * 100) : isComplete ? 100 : 0}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Demo Interface - Mobile Optimized */}
      <div className="p-3 md:p-6 bg-black-olive rounded-xl border border-dark-liver relative">
        {/* Demo Ready Indicator - More compact */}
        {!isRunning && !showResults && (
          <div className="mb-3 p-3 bg-pastel-blue/10 rounded-lg border border-pastel-blue/30 text-center">
            <div className="text-pastel-blue font-semibold mb-1 flex items-center justify-center gap-2 text-sm">
              <Target className="w-3 h-3" />
              <span>Demo Ready</span>
            </div>
            <p className="text-gray-x11 text-xs leading-snug">
              Interactive {actualDemoType.replace('-', ' ')} demo will start automatically
            </p>
          </div>
        )}

        {/* Live Timer - Mobile positioned and sized */}
        {isRunning && (
          <div className="absolute top-1 right-1 md:top-4 md:right-4 flex items-center text-white font-mono text-xs bg-pastel-blue/20 border border-pastel-blue/40 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg animate-pastel-slide-in hover-pastel-glow">
            <div className="w-1.5 h-1.5 bg-pastel-blue rounded-full mr-1 animate-pastel-glow shadow-sm" />
            <span className="text-pastel-blue font-bold transition-pastel-fast">{Math.floor(totalTimeElapsed)}s</span>
          </div>
        )}

        {/* Progress Steps - Mobile Optimized with better spacing */}
        <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
          {steps.map((step, index) => (
            <div
              key={`${demoType}-${step.title}-${index}`}
              className={`p-2 md:p-4 rounded-lg border transition-all duration-300 hover-pastel-lift ${
                step.status === 'processing'
                  ? 'border-pastel-blue bg-pastel-blue/20 shadow-lg shadow-pastel-blue/20 transform scale-102 animate-pastel-pulse'
                  : step.status === 'complete'
                    ? 'border-pastel-blue bg-pastel-blue/10 shadow-md animate-pastel-slide-in'
                    : 'border-dark-liver bg-black-olive/50 hover-pastel-scale'
              }`}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-start">
                  {/* Step Icon - Responsive sizing */}
                  <div className={`text-lg md:text-2xl mr-2 md:mr-4 mt-1 ${
                    step.status === 'processing' ? 'animate-bounce' : ''
                  }`}>
                    <StepIcon iconType={step.icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col">
                      <div className="flex items-center flex-wrap gap-1">
                        <h4 className="font-semibold text-white text-sm md:text-base leading-tight">
                          {step.title}
                        </h4>
                        {step.status === 'processing' && (
                          <span className="inline-flex text-xs bg-pastel-blue/30 border border-pastel-blue/50 text-pastel-blue font-semibold px-1.5 py-0.5 rounded-full animate-pastel-breathe shadow-sm transition-pastel">
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 mt-1 leading-snug">{step.description}</p>
                      {step.status === 'complete' && (
                        <p className="text-xs md:text-sm text-pastel-blue mt-1 font-medium flex items-center gap-1 bg-pastel-blue/10 px-2 py-1 rounded border border-pastel-blue/20">
                          <Target className="w-3 h-3 flex-shrink-0" />
                          <span className="leading-tight">{step.impact}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress indicator - Mobile friendly */}
                {(step.status === 'processing' || step.status === 'complete') && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-400">{Math.round(step.progress)}%</div>
                      <div className="w-12 md:w-16 bg-dark-liver rounded-full h-1 md:h-1.5">
                        <div
                          className={`h-1 md:h-1.5 rounded-full transition-all duration-200 shadow-sm ${
                            step.status === 'complete'
                              ? 'bg-gradient-to-r from-pastel-blue to-pastel-blue/80'
                              : step.status === 'processing'
                                ? 'animate-pastel-progress'
                                : 'bg-pastel-blue transition-pastel'
                          }`}
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm hover-pastel-scale ${
                      step.status === 'processing'
                        ? 'bg-pastel-blue text-air-black animate-pastel-breathe shadow-pastel-blue/30'
                        : step.status === 'complete'
                          ? 'bg-gradient-to-r from-pastel-blue to-pastel-blue/80 text-white shadow-pastel-blue/20 animate-pastel-slide-in'
                          : 'bg-dark-liver text-gray-300 transition-pastel'
                    }`}>
                      {step.status === 'complete' ? (
                        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Results Section with Practical Visuals */}
        {isComplete && showResults && (
          <div className="mb-4 md:mb-6 p-3 md:p-6 bg-gradient-to-r from-pastel-blue/20 to-pastel-blue/10 border-2 border-pastel-blue/50 rounded-xl shadow-lg animate-pastel-slide-in hover-pastel-glow">
            <div className="text-center mb-3 md:mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-full bg-pastel-blue/20 border border-pastel-blue/40 flex items-center justify-center shadow-lg animate-pastel-breathe hover-pastel-lift">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-pastel-blue transition-pastel hover-pastel-brightness" />
              </div>
              <h4 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 transition-pastel">Demo Complete!</h4>
              <p className="text-xs md:text-base text-gray-300 transition-pastel">AI processing completed successfully</p>
            </div>

            {/* PDF Document Preview - Mobile Optimized */}
            <div className="mb-4 md:mb-6">
              <h5 className="text-white font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-pastel-blue" />
                Generated Document Preview
              </h5>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <PDFDocumentView
                  demoType={actualDemoType}
                  className="max-h-64 md:max-h-96 overflow-auto"
                />
              </div>
              <div className="mt-2 md:mt-3 text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1 md:gap-2">
                  <FileText className="w-3 h-3 text-pastel-blue" />
                  <span>Complete document • Scroll to view content</span>
                </p>
              </div>
            </div>

            {/* Practical Visual Results - Different for each demo type */}
            {actualDemoType === 'bid-generation' && (
              <div className="mb-4 md:mb-6 space-y-2 md:space-y-4">
                <div className="bg-black-olive/40 rounded-lg p-3 md:p-4 border border-dark-liver">
                  <h5 className="text-white font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-pastel-blue" />
                    Key Proposal Highlights
                  </h5>
                  {/* Mobile-optimized full-width preview */}
                  <div className="bg-white rounded p-3 md:p-4 text-black">
                    <div className="text-center mb-3 md:mb-4">
                      <div className="text-2xl md:text-3xl font-bold text-pastel-blue mb-1">$2,847,500</div>
                      <div className="text-sm md:text-base text-gray-600 font-medium">Win Probability: 78%</div>
                    </div>
                    {/* Full-width metrics layout for mobile */}
                    <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Timeline:</span>
                        <span className="text-gray-900">16 weeks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Scope:</span>
                        <span className="text-gray-900">25,000 sq ft</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Client:</span>
                        <span className="text-gray-900">Metro Properties</span>
                      </div>
                      <div className="flex justify-between py-2 md:py-0">
                        <span className="font-semibold text-gray-700">Margin:</span>
                        <span className="text-gray-900">18% profit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {actualDemoType === 'estimation' && (
              <div className="mb-4 md:mb-6 space-y-2 md:space-y-4">
                <div className="bg-black-olive/40 rounded-lg p-3 md:p-4 border border-dark-liver">
                  <h5 className="text-white font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                    <Clipboard className="w-4 h-4 md:w-5 md:h-5 text-pastel-blue" />
                    Key Estimate Highlights
                  </h5>
                  {/* Mobile-optimized full-width preview */}
                  <div className="bg-white rounded p-3 md:p-4 text-black">
                    <div className="text-center mb-3 md:mb-4">
                      <div className="text-2xl md:text-3xl font-bold text-pastel-blue mb-1">$1,247,850</div>
                      <div className="text-sm md:text-base text-gray-600 font-medium">$389.95/sq ft • 95%+ accuracy</div>
                    </div>
                    {/* Full-width metrics layout for mobile */}
                    <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Property:</span>
                        <span className="text-gray-900">3,200 sq ft</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Timeline:</span>
                        <span className="text-gray-900">8 months</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Style:</span>
                        <span className="text-gray-900">Contemporary</span>
                      </div>
                      <div className="flex justify-between py-2 md:py-0">
                        <span className="font-semibold text-gray-700">Accuracy:</span>
                        <span className="text-gray-900">95%+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {demoType === 'financial-monitoring' && (
              <div className="mb-4 md:mb-6 space-y-2 md:space-y-4">
                <div className="bg-black-olive/40 rounded-lg p-3 md:p-4 border border-dark-liver">
                  <h5 className="text-white font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                    <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-pastel-blue" />
                    Key Expense Highlights
                  </h5>
                  {/* Mobile-optimized full-width preview */}
                  <div className="bg-white rounded p-3 md:p-4 text-black">
                    <div className="text-center mb-3 md:mb-4">
                      <div className="text-2xl md:text-3xl font-bold text-pastel-blue mb-1">$2,847.32</div>
                      <div className="text-sm md:text-base text-gray-600 font-medium">Processed in 1.2 seconds • 99% accuracy</div>
                    </div>
                    {/* Full-width metrics layout for mobile */}
                    <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Vendor:</span>
                        <span className="text-gray-900">Home Depot</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Category:</span>
                        <span className="text-gray-900">Electrical</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Project:</span>
                        <span className="text-gray-900">#4821</span>
                      </div>
                      <div className="flex justify-between py-2 md:py-0">
                        <span className="font-semibold text-gray-700">Status:</span>
                        <span className="text-gray-900">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(demoType === 'document-processing' || demoType === 'project-tracking' || demoType === 'safety-compliance') && (
              <div className="mb-4 md:mb-6 space-y-2 md:space-y-4">
                <div className="bg-black-olive/40 rounded-lg p-3 md:p-4 border border-dark-liver">
                  <h5 className="text-white font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-pastel-blue" />
                    {actualDemoType === 'document-processing' && 'Key Analysis Highlights'}
                    {actualDemoType === 'project-tracking' && 'Key Progress Highlights'}
                    {actualDemoType === 'safety-compliance' && 'Key Safety Highlights'}
                  </h5>
                  {/* Mobile-optimized full-width preview */}
                  <div className="bg-white rounded p-3 md:p-4 text-black">
                    <div className="text-center mb-3 md:mb-4">
                      {actualDemoType === 'document-processing' && (
                        <>
                          <div className="text-2xl md:text-3xl font-bold text-pastel-blue mb-1">$67,500</div>
                          <div className="text-sm md:text-base text-gray-600 font-medium">24 pages analyzed • 3 issues found</div>
                        </>
                      )}
                      {actualDemoType === 'project-tracking' && (
                        <>
                          <div className="text-2xl md:text-3xl font-bold text-pastel-blue mb-1">73% Complete</div>
                          <div className="text-sm md:text-base text-gray-600 font-medium">On budget • 2 days behind</div>
                        </>
                      )}
                      {actualDemoType === 'safety-compliance' && (
                        <>
                          <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">HIGH RISK</div>
                          <div className="text-sm md:text-base text-gray-600 font-medium">3 critical issues • 75% PPE compliance</div>
                        </>
                      )}
                    </div>
                    {/* Full-width metrics layout for mobile */}
                    <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                      {actualDemoType === 'document-processing' && (
                        <>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Document:</span>
                            <span className="text-gray-900">Contract</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Value:</span>
                            <span className="text-gray-900">$67,500</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Risk Level:</span>
                            <span className="text-gray-900">Medium</span>
                          </div>
                          <div className="flex justify-between py-2 md:py-0">
                            <span className="font-semibold text-gray-700">Duration:</span>
                            <span className="text-gray-900">6 weeks</span>
                          </div>
                        </>
                      )}
                      {actualDemoType === 'project-tracking' && (
                        <>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Progress:</span>
                            <span className="text-gray-900">73%</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Budget:</span>
                            <span className="text-gray-900">Under</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Quality:</span>
                            <span className="text-gray-900">98%</span>
                          </div>
                          <div className="flex justify-between py-2 md:py-0">
                            <span className="font-semibold text-gray-700">Workers:</span>
                            <span className="text-gray-900">12</span>
                          </div>
                        </>
                      )}
                      {actualDemoType === 'safety-compliance' && (
                        <>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Risk Score:</span>
                            <span className="text-gray-900">8.2/10</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">PPE Rate:</span>
                            <span className="text-gray-900">75%</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                            <span className="font-semibold text-gray-700">Critical:</span>
                            <span className="text-gray-900">3 issues</span>
                          </div>
                          <div className="flex justify-between py-2 md:py-0">
                            <span className="font-semibold text-gray-700">Workers:</span>
                            <span className="text-gray-900">12</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {actualDemoType === 'rfp-response' && (
              <div className="mb-4 md:mb-6 space-y-2 md:space-y-4">
                <div className="bg-black-olive/40 rounded-lg p-3 md:p-4 border border-dark-liver">
                  <h5 className="text-white font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-pastel-blue" />
                    Key RFP Highlights
                  </h5>
                  {/* Mobile-optimized full-width preview */}
                  <div className="bg-white rounded p-3 md:p-4 text-black">
                    <div className="text-center mb-3 md:mb-4">
                      <div className="text-2xl md:text-3xl font-bold text-pastel-blue mb-1">$2,847,500</div>
                      <div className="text-sm md:text-base text-gray-600 font-medium">Win Probability: 78%</div>
                    </div>
                    {/* Full-width metrics layout for mobile */}
                    <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Timeline:</span>
                        <span className="text-gray-900">16 weeks</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Scope:</span>
                        <span className="text-gray-900">25,000 sq ft</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 md:border-0 md:py-0">
                        <span className="font-semibold text-gray-700">Client:</span>
                        <span className="text-gray-900">Metro Properties</span>
                      </div>
                      <div className="flex justify-between py-2 md:py-0">
                        <span className="font-semibold text-gray-700">Margin:</span>
                        <span className="text-gray-900">18% profit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Animated ROI Dashboard */}
            <ROIDashboard
              isActive={isComplete && showResults}
              demoType={actualDemoType}
              className="mb-4 md:mb-6"
            />

            {/* CTA Section - Mobile optimized */}
            <div className="text-center border-t border-pastel-blue/20 pt-3 md:pt-6">
              <p className="text-pastel-blue font-medium text-sm md:text-base mb-2 md:mb-4 leading-relaxed">
                Ready to transform your {actualDemoType.replace('-', ' ')}?
              </p>
              <button className="inline-block min-h-[44px] md:min-h-[48px] px-6 md:px-8 py-3 bg-gradient-to-r from-pastel-blue to-pastel-blue/80 text-air-black font-bold rounded-lg hover:from-pastel-blue/90 hover:to-pastel-blue/70 transition-all duration-200 text-sm md:text-base shadow-lg hover:shadow-pastel-blue/20">
                Talk to Us →
              </button>
            </div>
          </div>
        )}

        {/* Control Buttons - Mobile Optimized with better spacing */}
        <div className="flex flex-col gap-2 md:gap-3">
          <button
            onClick={startDemo}
            disabled={isRunning || !isActive}
            className="w-full min-h-[48px] md:min-h-[52px] px-4 md:px-6 py-3 md:py-4 bg-pastel-blue text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-sm md:text-base"
          >
            {isRunning ? (
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="loading-pastel-dots">AI Processing</span>
              </span>
            ) : showResults ? (
              `Watch ${getDemoTitle().split(' ')[1]} Demo Again`
            ) : (
              `Watch ${getDemoTitle().split(' ')[1]} Demo`
            )}
          </button>
          <button
            onClick={resetDemo}
            disabled={isRunning}
            className="w-full min-h-[44px] md:min-h-[48px] px-4 md:px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-black disabled:opacity-50 transition-all duration-300 white-border-btn text-sm md:text-base"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Demo Info - Mobile Optimized */}
      <div className="mt-3 md:mt-4 text-center">
        <p className="text-xs text-gray-500 mb-1 md:mb-2">
          Simulated AI processing based on real customer results
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4 text-xs text-gray-600">
          <span>• No installation required</span>
          <span>• 14-day free trial</span>
          <span>• Setup in under 24 hours</span>
        </div>
      </div>
    </div>
  )
}

export default SimplifiedDemo
