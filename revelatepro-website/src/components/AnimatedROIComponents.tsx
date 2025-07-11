import type React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { TrendingUp, DollarSign, Clock, Target, BarChart3, Users, CheckCircle } from 'lucide-react'
import { FullScreenMetricsModal, FullScreenButton } from './FullScreenMetricsModal'

// Utility function for number animation with easing
const useAnimatedValue = (
  targetValue: number,
  duration = 2000,
  isActive = true,
  format: 'number' | 'currency' | 'percentage' = 'number'
) => {
  const [currentValue, setCurrentValue] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const animationRef = useRef<number>()

  const formatValue = useCallback((value: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      case 'percentage':
        return `${Math.round(value)}%`
      default:
        return Math.round(value).toLocaleString()
    }
  }, [format])

  useEffect(() => {
    if (!isActive) {
      setCurrentValue(0)
      return
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out cubic)
      const easeOut = 1 - (1 - progress) ** 3
      const newValue = targetValue * easeOut

      setCurrentValue(newValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    startTimeRef.current = null
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetValue, duration, isActive])

  return formatValue(currentValue)
}

// Animated Counter Component
interface AnimatedCounterProps {
  value: number
  title: string
  subtitle?: string
  icon?: React.ReactNode
  format?: 'number' | 'currency' | 'percentage'
  duration?: number
  isActive?: boolean
  color?: 'pastel-blue' | 'success' | 'warning' | 'gradient'
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  title,
  subtitle,
  icon,
  format = 'number',
  duration = 2000,
  isActive = true,
  color = 'pastel-blue',
  className = ''
}) => {
  const animatedValue = useAnimatedValue(value, duration, isActive, format)

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'warning':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'gradient':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue to-green-400'
      default:
        return 'text-pastel-blue bg-pastel-blue/10 border-pastel-blue/30'
    }
  }

  return (
    <div className={`group relative w-full p-4 sm:p-6 rounded-xl border transition-all duration-300 hover-pastel-lift animate-pastel-slide-in ${getColorClasses()} ${className}`}>
      {/* Mobile: Vertical Layout (< sm) */}
      <div className="sm:hidden">
        {/* Mobile Header with Icon and Value */}
        <div className="flex items-center justify-between mb-3">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-current/20 flex items-center justify-center animate-pastel-breathe flex-shrink-0">
              <div className="text-current w-6 h-6">
                {icon}
              </div>
            </div>
          )}
          <div className="text-right">
            <div className="text-2xl font-bold transition-pastel hover-pastel-brightness">
              {animatedValue}
            </div>
          </div>
        </div>

        {/* Mobile Title and Subtitle */}
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-200 transition-pastel leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 transition-pastel leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Desktop: Horizontal Layout (≥ sm) */}
      <div className="hidden sm:flex items-center justify-between w-full">
        {/* Left: Icon */}
        {icon && (
          <div className="w-14 h-14 rounded-xl bg-current/20 flex items-center justify-center animate-pastel-breathe flex-shrink-0">
            <div className="text-current w-7 h-7">
              {icon}
            </div>
          </div>
        )}

        {/* Center: Title and Subtitle */}
        <div className="flex-1 px-4 md:px-6 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-200 transition-pastel leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 transition-pastel leading-relaxed mt-1">{subtitle}</p>
          )}
        </div>

        {/* Right: Value */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold transition-pastel hover-pastel-brightness">
            {animatedValue}
          </div>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent rounded-xl" />
      </div>
    </div>
  )
}

// Mobile-optimized counter for full-screen view
export const MobileOptimizedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  title,
  subtitle,
  icon,
  format = 'number',
  duration = 2000,
  isActive = true,
  color = 'pastel-blue',
  className = ''
}) => {
  const animatedValue = useAnimatedValue(value, duration, isActive, format)

  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'warning':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'gradient':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue to-green-400'
      default:
        return 'text-pastel-blue bg-pastel-blue/10 border-pastel-blue/30'
    }
  }

  return (
    <div className={`group relative w-full p-6 rounded-2xl border transition-all duration-300 hover-pastel-lift animate-pastel-slide-in ${getColorClasses()} ${className}`}>
      {/* Mobile Full-Screen Layout */}
      <div className="text-center space-y-4">
        {/* Icon */}
        {icon && (
          <div className="w-16 h-16 rounded-2xl bg-current/20 flex items-center justify-center animate-pastel-breathe mx-auto">
            <div className="text-current w-8 h-8">
              {icon}
            </div>
          </div>
        )}

        {/* Value - Most Prominent */}
        <div className="text-4xl font-bold transition-pastel hover-pastel-brightness">
          {animatedValue}
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-200 transition-pastel leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-base text-gray-500 transition-pastel leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent rounded-2xl" />
      </div>
    </div>
  )
}

// Animated Progress Ring Component
interface AnimatedProgressRingProps {
  percentage: number
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  isActive?: boolean
  color?: string
  className?: string
}

export const AnimatedProgressRing: React.FC<AnimatedProgressRingProps> = ({
  percentage,
  title,
  subtitle,
  size = 'md',
  isActive = true,
  color = '#94C7CC',
  className = ''
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return { container: 'w-20 h-20', text: 'text-sm', stroke: 4 }
      case 'lg':
        return { container: 'w-32 h-32', text: 'text-xl', stroke: 6 }
      default:
        return { container: 'w-24 h-24', text: 'text-base', stroke: 5 }
    }
  }

  const sizeConfig = getSizeClasses()
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  useEffect(() => {
    if (!isActive) {
      setAnimatedPercentage(0)
      return
    }

    const startTime = Date.now()
    const duration = 2000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOut = 1 - (1 - progress) ** 3
      setAnimatedPercentage(percentage * easeOut)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [percentage, isActive])

  return (
    <div className={`flex flex-col items-center space-y-3 animate-pastel-slide-in hover-pastel-lift transition-all duration-300 ${className}`}>
      <div className={`relative ${sizeConfig.container}`}>
        {/* Background circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(148, 199, 204, 0.1)"
            strokeWidth={sizeConfig.stroke}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={sizeConfig.stroke}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 drop-shadow-sm"
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-pastel-blue transition-pastel ${sizeConfig.text}`}>
            {Math.round(animatedPercentage)}%
          </span>
        </div>

        {/* Animated glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-20 animate-pastel-pulse"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`
          }}
        />
      </div>

      <div className="text-center">
        <h4 className="text-sm font-semibold text-white transition-pastel">{title}</h4>
        {subtitle && (
          <p className="text-xs text-gray-400 transition-pastel">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

// Animated Bar Chart Component
interface BarChartData {
  label: string
  value: number
  color?: string
  improvement?: string
}

interface AnimatedBarChartProps {
  data: BarChartData[]
  title: string
  isActive?: boolean
  maxValue?: number
  className?: string
}

export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  title,
  isActive = true,
  maxValue,
  className = ''
}) => {
  const [animatedData, setAnimatedData] = useState<number[]>(data.map(() => 0))
  const maxVal = maxValue || Math.max(...data.map(d => d.value))

  useEffect(() => {
    if (!isActive) {
      setAnimatedData(data.map(() => 0))
      return
    }

    const startTime = Date.now()
    const duration = 2000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOut = 1 - (1 - progress) ** 3

      setAnimatedData(data.map(d => d.value * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [data, isActive])

  return (
    <div className={`p-6 bg-black-olive/30 border border-pastel-blue/20 rounded-xl animate-pastel-slide-in hover-pastel-glow transition-all duration-300 ${className}`}>
      <h3 className="text-lg font-bold text-white mb-6 transition-pastel">{title}</h3>

      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (animatedData[index] / maxVal) * 100

          return (
            <div key={`bar-${item.label.replace(/\s+/g, '-').toLowerCase()}`} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300 font-medium transition-pastel">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-pastel-blue transition-pastel">
                    {Math.round(animatedData[index]).toLocaleString()}
                  </span>
                  {item.improvement && (
                    <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full transition-pastel">
                      {item.improvement}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative h-3 bg-dark-liver rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-300 shadow-sm"
                  style={{
                    width: `${percentage}%`,
                    background: item.color || 'linear-gradient(90deg, #94C7CC, #94C7CC80)',
                    boxShadow: `0 0 10px ${item.color || '#94C7CC'}40`
                  }}
                />

                {/* Animated shimmer effect */}
                <div
                  className="absolute left-0 top-0 h-full w-full opacity-30 animate-pastel-shimmer"
                  style={{
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
                    backgroundSize: '200% 100%'
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ROI Dashboard Component
interface ROIDashboardProps {
  isActive?: boolean
  demoType?: string
  className?: string
}

export const ROIDashboard: React.FC<ROIDashboardProps> = ({
  isActive = true,
  demoType = 'default',
  className = ''
}) => {
  const [activeSection, setActiveSection] = useState(0)
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false)

  console.log('ROIDashboard render:', {
    isActive,
    demoType,
    isFullScreenOpen,
    timestamp: new Date().toLocaleTimeString()
  })

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [isActive])

  // Demo-specific metrics
  const getMetrics = () => {
    switch (demoType) {
      case 'bid-management':
      case 'bidding-stress':
        return [
          { value: 180000, title: 'Annual Profit Increase', subtitle: 'Per bid manager', icon: <DollarSign />, format: 'currency' as const },
          { value: 88, title: 'Bid Prep Time Saved', subtitle: 'Faster proposal creation', icon: <Clock />, format: 'percentage' as const },
          { value: 68, title: 'Win Rate Improvement', subtitle: 'More successful bids', icon: <Target />, format: 'percentage' as const },
          { value: 42, title: 'Competitive Advantage', subtitle: 'Above industry average', icon: <TrendingUp />, format: 'percentage' as const }
        ]

      case 'estimating':
      case 'estimation-guesswork':
        return [
          { value: 125000, title: 'Cost Overrun Prevention', subtitle: 'Per project annually', icon: <DollarSign />, format: 'currency' as const },
          { value: 85, title: 'Estimate Speed Increase', subtitle: 'Faster turnaround', icon: <Clock />, format: 'percentage' as const },
          { value: 96, title: 'Accuracy Improvement', subtitle: 'Precise calculations', icon: <Target />, format: 'percentage' as const },
          { value: 75, title: 'Error Reduction', subtitle: 'Fewer costly mistakes', icon: <CheckCircle />, format: 'percentage' as const }
        ]

      case 'expense':
      case 'financial-chaos':
        return [
          { value: 95000, title: 'Administrative Savings', subtitle: 'Per finance manager', icon: <DollarSign />, format: 'currency' as const },
          { value: 93, title: 'Processing Speed Increase', subtitle: 'Faster expense handling', icon: <Clock />, format: 'percentage' as const },
          { value: 99, title: 'Data Accuracy', subtitle: 'OCR precision rate', icon: <Target />, format: 'percentage' as const },
          { value: 82, title: 'Budget Overrun Prevention', subtitle: 'Early warning system', icon: <CheckCircle />, format: 'percentage' as const }
        ]

      default:
        return [
          { value: 150000, title: 'Average Annual Savings', subtitle: 'Per team member', icon: <DollarSign />, format: 'currency' as const },
          { value: 85, title: 'Time Reduction', subtitle: 'Administrative tasks', icon: <Clock />, format: 'percentage' as const },
          { value: 97, title: 'Accuracy Improvement', subtitle: 'Process precision', icon: <Target />, format: 'percentage' as const },
          { value: 65, title: 'Productivity Increase', subtitle: 'Overall efficiency', icon: <TrendingUp />, format: 'percentage' as const }
        ]
    }
  }

  const metrics = getMetrics()

  const chartData = [
    { label: 'Efficiency', value: 95, improvement: '+300%', color: 'linear-gradient(90deg, #94C7CC, #6FB8C0)' },
    { label: 'Accuracy', value: 97, improvement: '+25%', color: 'linear-gradient(90deg, #22C55E, #16A34A)' },
    { label: 'Cost Savings', value: 85, improvement: '+150%', color: 'linear-gradient(90deg, #F59E0B, #D97706)' }
  ]

  return (
    <div className={`space-y-10 ${className}`}>
      {/* Key Metrics Row */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <AnimatedCounter
            key={`metric-${metric.title.replace(/\s+/g, '-').toLowerCase()}`}
            value={metric.value}
            title={metric.title}
            subtitle={metric.subtitle}
            icon={metric.icon}
            format={metric.format}
            isActive={isActive && activeSection >= index}
            color={index % 2 === 0 ? 'pastel-blue' : 'success'}
          />
        ))}
      </div>

      {/* Progress Ring and Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center items-center p-8 bg-black-olive/20 border border-pastel-blue/20 rounded-xl">
          <AnimatedProgressRing
            percentage={97}
            title="Overall Performance"
            subtitle="System Efficiency"
            size="lg"
            isActive={isActive}
          />
        </div>

        <AnimatedBarChart
          title="Performance Metrics"
          data={chartData}
          isActive={isActive}
        />
      </div>

      {/* Summary Stats */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-pastel-blue/10 to-pastel-blue/5 border border-pastel-blue/30 rounded-xl animate-pastel-slide-in">
        <h3 className="text-lg font-bold text-white mb-6 transition-pastel">ROI Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-pastel-blue transition-pastel hover-pastel-brightness break-words">
              {isActive ? '18 months' : '0 months'}
            </div>
            <div className="text-sm text-gray-400">Payback Period</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-green-400 transition-pastel hover-pastel-brightness break-words">
              {isActive ? '340%' : '0%'}
            </div>
            <div className="text-sm text-gray-400">3-Year ROI</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-yellow-400 transition-pastel hover-pastel-brightness break-words">
              {isActive ? '$2.1M' : '$0'}
            </div>
            <div className="text-sm text-gray-400">Total Value Created</div>
          </div>
        </div>
      </div>

      {/* Full Screen Button for Mobile */}
      <div className="mt-6 text-center">
        <FullScreenButton onClick={() => {
          console.log('MOBILE TEST: Opening full-screen metrics modal', {
            demoType,
            viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
            timestamp: new Date().toLocaleTimeString()
          })
          setIsFullScreenOpen(true)
        }} />
      </div>

      {/* Full Screen Modal */}
      <FullScreenMetricsModal
        isOpen={isFullScreenOpen}
        onClose={() => {
          console.log('MOBILE TEST: Closing full-screen metrics modal', {
            demoType,
            timestamp: new Date().toLocaleTimeString()
          })
          setIsFullScreenOpen(false)
        }}
        title="Performance Dashboard"
        demoType={demoType}
        showPDFDocument={true}
      >
        {/* Key Metrics Row */}
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <AnimatedCounter
              key={`fullscreen-metric-${metric.title.replace(/\\s+/g, '-').toLowerCase()}`}
              value={metric.value}
              title={metric.title}
              subtitle={metric.subtitle}
              icon={metric.icon}
              format={metric.format}
              isActive={isActive && activeSection >= index}
              color={index % 2 === 0 ? 'pastel-blue' : 'success'}
            />
          ))}
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center items-center p-8 bg-black-olive/20 border border-pastel-blue/20 rounded-xl">
          <AnimatedProgressRing
            percentage={97}
            title="Overall Performance"
            subtitle="System Efficiency"
            size="lg"
            isActive={isActive}
          />
        </div>

        {/* Charts */}
        <AnimatedBarChart
          title="Performance Metrics"
          data={chartData}
          isActive={isActive}
        />

        {/* Summary Stats */}
        <div className="p-6 bg-gradient-to-br from-pastel-blue/10 to-pastel-blue/5 border border-pastel-blue/30 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">ROI Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-xl font-bold text-pastel-blue break-words">
                {isActive ? '18 months' : '0 months'}
              </div>
              <div className="text-sm text-gray-400">Payback Period</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-400 break-words">
                {isActive ? '340%' : '0%'}
              </div>
              <div className="text-sm text-gray-400">3-Year ROI</div>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-400 break-words">
                {isActive ? '$2.1M' : '$0'}
              </div>
              <div className="text-sm text-gray-400">Total Value Created</div>
            </div>
          </div>
        </div>
      </FullScreenMetricsModal>
    </div>
  )
}
