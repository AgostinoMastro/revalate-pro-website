import type React from 'react'
import { useState, useEffect, useCallback } from 'react'

interface ROICalculatorProps {
  onDemoClick?: () => void
  isModal?: boolean
}

interface CalculatorInputs {
  companySize: 'startup' | 'small' | 'medium' | 'large'
  monthlyProjects: number
  avgProjectValue: number
  estimatingHours: number
  biddingHours: number
  expenseProcessingHours: number
  hourlyRate: number
  currentWinRate: number
  selectedAgents: string[]
}

interface CalculatorResults {
  currentMonthlyCost: number
  withRevealateMonthlyCost: number
  monthlySavings: number
  annualSavings: number
  timeRecovered: number
  winRateImprovement: number
  additionalRevenue: number
  roiPercentage: number
}

interface AIAgent {
  name: string
  description: string
  monthlyPrice: number
  timeSavingsPercentage: number
  winRateBonus: number
}

const aiAgents: Record<string, AIAgent> = {
  'bid-management': {
    name: 'AI Bid Management Agent',
    description: 'Streamline your bidding process with intelligent proposal generation',
    monthlyPrice: 300,
    timeSavingsPercentage: 0.6,
    winRateBonus: 0.15
  },
  'estimating': {
    name: 'AI Estimating Agent',
    description: 'Generate accurate cost estimates using AI and historical data',
    monthlyPrice: 300,
    timeSavingsPercentage: 0.7,
    winRateBonus: 0.1
  },
  'expense': {
    name: 'AI Expense Agent',
    description: 'Automate expense tracking and budget monitoring',
    monthlyPrice: 300,
    timeSavingsPercentage: 0.8,
    winRateBonus: 0.05
  }
}

const companySizePresets = {
  startup: {
    label: '1-5 employees',
    monthlyProjects: 2,
    avgProjectValue: 25000,
    estimatingHours: 8,
    biddingHours: 12,
    expenseProcessingHours: 6,
    hourlyRate: 60,
    currentWinRate: 15,
    selectedAgents: ['estimating']
  },
  small: {
    label: '6-20 employees',
    monthlyProjects: 4,
    avgProjectValue: 75000,
    estimatingHours: 16,
    biddingHours: 20,
    expenseProcessingHours: 12,
    hourlyRate: 75,
    currentWinRate: 25,
    selectedAgents: ['estimating', 'expense']
  },
  medium: {
    label: '21-100 employees',
    monthlyProjects: 8,
    avgProjectValue: 200000,
    estimatingHours: 24,
    biddingHours: 32,
    expenseProcessingHours: 20,
    hourlyRate: 85,
    currentWinRate: 35,
    selectedAgents: ['estimating', 'bid-management']
  },
  large: {
    label: '100+ employees',
    monthlyProjects: 15,
    avgProjectValue: 500000,
    estimatingHours: 40,
    biddingHours: 50,
    expenseProcessingHours: 35,
    hourlyRate: 100,
    currentWinRate: 45,
    selectedAgents: ['estimating', 'bid-management', 'expense']
  }
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ onDemoClick, isModal = false }) => {
  const [activeTab, setActiveTab] = useState<'simple' | 'advanced'>('simple')
  const [inputs, setInputs] = useState<CalculatorInputs>({
    companySize: 'medium',
    ...companySizePresets.medium
  })

  const calculateResults = useCallback((inputs: CalculatorInputs): CalculatorResults => {
    const totalAgentCost = inputs.selectedAgents.reduce((sum, agentId) =>
      sum + aiAgents[agentId].monthlyPrice, 0)

    const totalTimeSaved = inputs.selectedAgents.reduce((sum, agentId) => {
      const agent = aiAgents[agentId]
      if (agentId === 'estimating') return sum + (inputs.estimatingHours * agent.timeSavingsPercentage)
      if (agentId === 'bid-management') return sum + (inputs.biddingHours * agent.timeSavingsPercentage)
      if (agentId === 'expense') return sum + (inputs.expenseProcessingHours * agent.timeSavingsPercentage)
      return sum
    }, 0)

    const monthlyCostSavings = totalTimeSaved * inputs.hourlyRate * inputs.monthlyProjects

    const winRateBonus = inputs.selectedAgents.reduce((sum, agentId) =>
      sum + aiAgents[agentId].winRateBonus, 0)

    const newWinRate = Math.min(inputs.currentWinRate + (winRateBonus * 100), 85)
    const additionalWins = (newWinRate - inputs.currentWinRate) / 100 * inputs.monthlyProjects
    const additionalRevenue = additionalWins * inputs.avgProjectValue * 0.1 // 10% margin

    const totalMonthlySavings = monthlyCostSavings + additionalRevenue - totalAgentCost
    const annualSavings = totalMonthlySavings * 12
    const roiPercentage = totalAgentCost > 0 ? (totalMonthlySavings / totalAgentCost) * 100 : 0

    return {
      currentMonthlyCost: inputs.monthlyProjects * (inputs.estimatingHours + inputs.biddingHours + inputs.expenseProcessingHours) * inputs.hourlyRate,
      withRevealateMonthlyCost: inputs.monthlyProjects * (inputs.estimatingHours + inputs.biddingHours + inputs.expenseProcessingHours) * inputs.hourlyRate * (1 - totalTimeSaved / (inputs.estimatingHours + inputs.biddingHours + inputs.expenseProcessingHours)) + totalAgentCost,
      monthlySavings: totalMonthlySavings,
      annualSavings,
      timeRecovered: totalTimeSaved * inputs.monthlyProjects,
      winRateImprovement: newWinRate - inputs.currentWinRate,
      additionalRevenue,
      roiPercentage
    }
  }, [])

  const [results, setResults] = useState<CalculatorResults>(() => calculateResults(inputs))

  useEffect(() => {
    setResults(calculateResults(inputs))
  }, [inputs, calculateResults])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(num)
  }

  const handleCompanySizeChange = (size: CalculatorInputs['companySize']) => {
    const preset = companySizePresets[size]
    setInputs({
      companySize: size,
      ...preset
    })
  }

  const toggleAgent = (agentId: string) => {
    setInputs(prev => ({
      ...prev,
      selectedAgents: prev.selectedAgents.includes(agentId)
        ? prev.selectedAgents.filter(id => id !== agentId)
        : [...prev.selectedAgents, agentId]
    }))
  }

  return (
    <div className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            <span className="gradient-text">Calculate Your ROI</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            See exactly how much time and money RevalatePro can save your construction business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Company Size Selection */}
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Company Size</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(companySizePresets).map(([size, preset]) => (
                  <button
                    key={size}
                    onClick={() => handleCompanySizeChange(size as CalculatorInputs['companySize'])}
                    className={`p-4 sm:p-6 rounded-xl text-left transition-all duration-300 border-2 min-h-touch ${
                      inputs.companySize === size
                        ? 'border-pastel-blue bg-pastel-blue/10 shadow-lg'
                        : 'border-gray-600/30 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-700/30'
                    }`}
                  >
                    <div className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{preset.label}</div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Avg project: {formatCurrency(preset.avgProjectValue)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Selection */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('simple')}
                className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 text-center font-semibold transition-all duration-200 min-h-touch text-sm sm:text-base ${
                  activeTab === 'simple'
                    ? 'text-pastel-blue border-b-2 border-pastel-blue bg-pastel-blue/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Quick Estimate
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`flex-1 px-4 sm:px-6 py-4 sm:py-5 text-center font-semibold transition-all duration-200 min-h-touch text-sm sm:text-base ${
                  activeTab === 'advanced'
                    ? 'text-pastel-blue border-b-2 border-pastel-blue bg-pastel-blue/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Custom Settings
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'simple' ? (
              <div className="space-y-6 sm:space-y-8">
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick ROI Estimate</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                        <div className="text-xs sm:text-sm text-gray-400 mb-1">Monthly Projects</div>
                        <div className="text-xl sm:text-2xl font-bold text-white">{inputs.monthlyProjects}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                        <div className="text-xs sm:text-sm text-gray-400 mb-1">Avg Project Value</div>
                        <div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(inputs.avgProjectValue)}</div>
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setActiveTab('advanced')}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors min-h-touch px-4 py-2"
                      >
                        Want to customize? Use Custom Settings →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {/* Business Volume Settings */}
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Business Volume</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Monthly Projects: {inputs.monthlyProjects}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={inputs.monthlyProjects}
                        onChange={(e) => setInputs(prev => ({ ...prev, monthlyProjects: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>20</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Avg Project Value: {formatCurrency(inputs.avgProjectValue)}
                      </label>
                      <input
                        type="range"
                        min="25000"
                        max="5000000"
                        step="25000"
                        value={inputs.avgProjectValue}
                        onChange={(e) => setInputs(prev => ({ ...prev, avgProjectValue: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$25K</span>
                        <span>$5M</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Investment Settings */}
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Time Investment per Project</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Estimating Hours: {inputs.estimatingHours}
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="80"
                        value={inputs.estimatingHours}
                        onChange={(e) => setInputs(prev => ({ ...prev, estimatingHours: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>2h</span>
                        <span>80h</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bidding Hours: {inputs.biddingHours}
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="100"
                        value={inputs.biddingHours}
                        onChange={(e) => setInputs(prev => ({ ...prev, biddingHours: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>2h</span>
                        <span>100h</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expense Processing Hours: {inputs.expenseProcessingHours}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="60"
                        value={inputs.expenseProcessingHours}
                        onChange={(e) => setInputs(prev => ({ ...prev, expenseProcessingHours: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1h</span>
                        <span>60h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Settings */}
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Financial Parameters</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Hourly Rate: {formatCurrency(inputs.hourlyRate)}
                      </label>
                      <input
                        type="range"
                        min="25"
                        max="200"
                        step="5"
                        value={inputs.hourlyRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$25</span>
                        <span>$200</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Win Rate: {inputs.currentWinRate}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={inputs.currentWinRate}
                        onChange={(e) => setInputs(prev => ({ ...prev, currentWinRate: Number(e.target.value) }))}
                        className="w-full pastel-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>10%</span>
                        <span>80%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Agent Selection */}
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Select AI Agents</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(aiAgents).map(([agentId, agent]) => (
                      <div
                        key={agentId}
                        onClick={() => toggleAgent(agentId)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          inputs.selectedAgents.includes(agentId)
                            ? 'border-pastel-blue bg-pastel-blue/10'
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{agent.name}</h4>
                            <p className="text-sm text-gray-400 mb-2">{agent.description}</p>
                            <div className="text-sm text-pastel-blue font-medium">
                              ${agent.monthlyPrice}/month
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 ${
                            inputs.selectedAgents.includes(agentId)
                              ? 'border-pastel-blue bg-pastel-blue'
                              : 'border-gray-400'
                          }`}>
                            {inputs.selectedAgents.includes(agentId) && (
                              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="sticky top-4">
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 shadow-xl">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center">
                  Your ROI Results
                </h3>

                {/* ROI percentage */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-green-400 mb-2">
                    {formatNumber(results.roiPercentage)}%
                  </div>
                  <div className="text-sm sm:text-base text-gray-300">Monthly ROI</div>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{formatCurrency(results.monthlySavings)}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Monthly Savings</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">{formatCurrency(results.annualSavings)}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Annual Savings</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 text-center sm:col-span-2">
                    <div className="text-lg sm:text-xl font-bold text-white">{formatNumber(results.timeRecovered)} hours/month</div>
                    <div className="text-xs sm:text-sm text-gray-400">Time Recovered</div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3 sm:space-y-4">
                  {onDemoClick && (
                    <button
                      onClick={onDemoClick}
                      className="w-full px-6 py-4 bg-gradient-to-r from-pastel-blue to-pastel-blue/90 text-black-olive font-bold text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-pastel-blue/50 min-h-touch shadow-lg"
                    >
                      Get Started - Talk to Us
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ROICalculator
