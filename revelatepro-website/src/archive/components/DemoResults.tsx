import type React from 'react'
import { useEffect, useState } from 'react'
import { TrendingUp, Calculator, CreditCard } from 'lucide-react'

// Animated components for enhanced demo experience
interface AnimatedCounterProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 1500, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutCubic = 1 - (1 - progress) ** 3
      setCount(Math.floor(target * easeOutCubic))

      if (progress >= 1) {
        clearInterval(timer)
        setCount(target)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{prefix}{count}{suffix}</span>
}

interface AnimatedIconProps {
  icon: React.ReactNode
  delay: number
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon, delay }) => {
  return (
    <div
      className="w-16 h-16 bg-gradient-to-br from-pastel-blue to-pastel-blue rounded-full flex items-center justify-center mx-auto mb-2 opacity-0 animate-bounceIn"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="animate-pulse">
        {icon}
      </div>
    </div>
  )
}

interface AnimatedMetricCardProps {
  value: string
  label: string
  color: string
  delay: number
  index: number
}

const AnimatedMetricCard: React.FC<AnimatedMetricCardProps> = ({ value, label, color, delay, index }) => {
  const numericValue = Number.parseFloat(value.replace(/[$,%M]/g, ''))
  const isNumeric = !Number.isNaN(numericValue)

  return (
    <div
      className="bg-pastel-blue/5 border border-pastel-blue/20 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg opacity-0 animate-fadeInUp"
      style={{
        animationDelay: `${delay + (index * 200)}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="text-2xl font-bold text-pastel-blue mb-1">
        {isNumeric ? (
          <AnimatedCounter
            target={numericValue}
            prefix={value.includes('$') ? '$' : ''}
            suffix={value.includes('%') ? '%' : value.includes(' pages') ? ' pages' : value.includes(' sec') ? ' sec' : value.includes(' hours') ? ' hours' : value.includes('M') ? 'M' : ''}
          />
        ) : (
          value
        )}
      </div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  )
}

interface AnimatedNotificationProps {
  title: string
  description: string
  bgColor: string
  borderColor: string
  textColor: string
  delay: number
}

const AnimatedNotification: React.FC<AnimatedNotificationProps> = ({
  title,
  description,
  bgColor,
  borderColor,
  textColor,
  delay
}) => {
  return (
    <div
      className={`${bgColor} ${borderColor} border rounded-xl p-4 opacity-0 animate-slideInLeft`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <h5 className={`font-semibold ${textColor} mb-1`}>{title}</h5>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  )
}

// Agent-specific result components with their unique tasks and metrics
const BidManagementResult: React.FC = () => (
  <div className="space-y-4">
    {/* Hero Result Card - Bid Management Agent specific */}
    <div className="bg-gradient-to-br from-pastel-blue/10 to-pastel-blue/5 border border-pastel-blue/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      <div className="text-center">
        <AnimatedIcon
          icon={<TrendingUp className="w-8 h-8 text-white" />}
          delay={300}
        />
        <h4
          className="text-xl font-bold text-white mb-2 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          Proposal Generated & Optimized
        </h4>
        <p
          className="text-pastel-blue text-sm opacity-0 animate-fadeInUp"
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          Monitored vendor replies, analyzed pricing patterns, and optimized for maximum win probability
        </p>
      </div>

      {/* Key Metrics based on actual demo tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <AnimatedMetricCard
          value="18 hours"
          label="Time Saved"
          color="pastel-blue"
          delay={1000}
          index={0}
        />
        <AnimatedMetricCard
          value="15 pages"
          label="Proposal Created"
          color="pastel-blue"
          delay={1000}
          index={1}
        />
        <AnimatedMetricCard
          value="12"
          label="Vendors Analyzed"
          color="pastel-blue"
          delay={1000}
          index={2}
        />
      </div>
    </div>

    {/* Task completion notification */}
    <AnimatedNotification
      title="All Tasks Complete"
      description="✓ Vendor replies monitored ✓ Pricing categorized ✓ Proposal generated ✓ Pricing optimized"
      bgColor="bg-pastel-blue/10"
      borderColor="border-pastel-blue/30"
      textColor="text-pastel-blue"
      delay={1800}
    />
  </div>
)

const EstimatingAgentResult: React.FC = () => (
  <div className="space-y-4">
    {/* Hero Result Card - Estimating Agent specific */}
    <div className="bg-gradient-to-br from-pastel-blue/10 to-pastel-blue/5 border border-pastel-blue/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      <div className="text-center">
        <AnimatedIcon
          icon={<Calculator className="w-8 h-8 text-white" />}
          delay={300}
        />
        <h4
          className="text-xl font-bold text-white mb-2 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          Estimate Generated from Take-off
        </h4>
        <p
          className="text-pastel-blue text-sm opacity-0 animate-fadeInUp"
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          Processed take-off data, analyzed 847 line items, and applied current price book rates
        </p>
      </div>

      {/* Key Metrics based on actual demo tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <AnimatedMetricCard
          value="$2.4M"
          label="Total Estimate"
          color="pastel-blue"
          delay={1000}
          index={0}
        />
        <AnimatedMetricCard
          value="847"
          label="Line Items"
          color="pastel-blue"
          delay={1000}
          index={1}
        />
        <AnimatedMetricCard
          value="9.1 sec"
          label="Total Time"
          color="pastel-blue"
          delay={1000}
          index={2}
        />
      </div>
    </div>

    {/* Task completion notification */}
    <AnimatedNotification
      title="Estimating Process Complete"
      description="✓ Take-off uploaded ✓ Cost data analyzed ✓ Price book applied ✓ Estimate generated"
      bgColor="bg-pastel-blue/10"
      borderColor="border-pastel-blue/30"
      textColor="text-pastel-blue"
      delay={1800}
    />
  </div>
)

const ExpenseAgentResult: React.FC = () => (
  <div className="space-y-4">
    {/* Hero Result Card - Expense Agent specific */}
    <div className="bg-gradient-to-br from-pastel-blue/10 to-pastel-blue/5 border border-pastel-blue/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      <div className="text-center">
        <AnimatedIcon
          icon={<CreditCard className="w-8 h-8 text-white" />}
          delay={300}
        />
        <h4
          className="text-xl font-bold text-white mb-2 opacity-0 animate-fadeInUp"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          Expense Processed & Categorized
        </h4>
        <p
          className="text-pastel-blue text-sm opacity-0 animate-fadeInUp"
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          OCR extracted receipt data, categorized by project, and synced to QuickBooks instantly
        </p>
      </div>

      {/* Key Metrics based on actual demo tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <AnimatedMetricCard
          value="$2,847"
          label="Receipt Amount"
          color="pastel-blue"
          delay={1000}
          index={0}
        />
        <AnimatedMetricCard
          value="1.7 sec"
          label="Processing Time"
          color="pastel-blue"
          delay={1000}
          index={1}
        />
        <AnimatedMetricCard
          value="100%"
          label="Auto-categorized"
          color="pastel-blue"
          delay={1000}
          index={2}
        />
      </div>
    </div>

    {/* Task completion notification */}
    <AnimatedNotification
      title="Expense Workflow Complete"
      description="✓ Vendor expenses monitored ✓ OCR data extracted ✓ Project allocated ✓ QuickBooks updated"
      bgColor="bg-pastel-blue/10"
      borderColor="border-pastel-blue/30"
      textColor="text-pastel-blue"
      delay={1800}
    />
  </div>
)

// Demo type to result component mapping
const demoResultMap: Record<string, React.FC> = {
  'bid-management': BidManagementResult,
  'estimating': EstimatingAgentResult,
  'expense': ExpenseAgentResult,
  // Support the demo types as well for consistency
  'bid-generation': BidManagementResult,
  'estimation': EstimatingAgentResult,
  'financial-monitoring': ExpenseAgentResult,
}

interface DemoResultsProps {
  demoType: string
  isVisible?: boolean
}

export const DemoResults: React.FC<DemoResultsProps> = ({ demoType, isVisible = true }) => {
  const ResultComponent = demoResultMap[demoType]

  if (!ResultComponent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Demo results not available for this type.</p>
      </div>
    )
  }

  if (!isVisible) {
    return null
  }

  return <ResultComponent />
}

export default DemoResults
