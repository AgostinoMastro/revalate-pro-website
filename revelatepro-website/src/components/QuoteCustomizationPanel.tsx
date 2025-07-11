import type React from 'react'
import { useState } from 'react'
import { useQuoteCustomization, type QuoteCustomization } from '../hooks/useQuoteCustomization'
import { Palette, FileText, DollarSign, Clipboard, Building2, Building, Zap, Hammer, Home } from 'lucide-react'

interface QuoteCustomizationPanelProps {
  onCustomizationChange: (customization: QuoteCustomization) => void
}

export const QuoteCustomizationPanel: React.FC<QuoteCustomizationPanelProps> = ({
  onCustomizationChange
}) => {
  const {
    customization,
    updateCustomization,
    resetToDefaults,
    calculatedValues,
    documentTypeOptions
  } = useQuoteCustomization()

  const [activeTab, setActiveTab] = useState<'branding' | 'terms' | 'pricing' | 'document'>('branding')

  const handleUpdate = (updates: Partial<QuoteCustomization>) => {
    updateCustomization(updates)
    onCustomizationChange({ ...customization, ...updates })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const colorPresets = [
    { name: 'Ocean Blue', primary: '#0AAEFF', secondary: '#1a202c' },
    { name: 'Forest Green', primary: '#10B981', secondary: '#064E3B' },
    { name: 'Sunset Orange', primary: '#F59E0B', secondary: '#92400E' },
    { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#581C87' },
    { name: 'Ruby Red', primary: '#EF4444', secondary: '#7F1D1D' }
  ]

  const tabs = [
    { id: 'branding', label: 'Branding', icon: 'palette' },
    { id: 'terms', label: 'Terms', icon: 'fileText' },
    { id: 'pricing', label: 'Pricing', icon: 'dollarSign' },
    { id: 'document', label: 'Document Type', icon: 'clipboard' }
  ]

  const iconMap = {
    palette: Palette,
    fileText: FileText,
    dollarSign: DollarSign,
    clipboard: Clipboard,
    building2: Building2,
    building: Building,
    zap: Zap,
    hammer: Hammer,
    home: Home
  }

  const logoOptions = [
    { id: 'building2', label: 'Construction', icon: 'building2' },
    { id: 'building', label: 'Commercial', icon: 'building' },
    { id: 'zap', label: 'Electrical', icon: 'zap' },
    { id: 'hammer', label: 'General', icon: 'hammer' },
    { id: 'home', label: 'Residential', icon: 'home' }
  ]

  return (
    <div className="w-full max-w-sm bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">Quote Customization</h3>
        <div className="text-sm text-gray-400">
          Adjust settings to see real-time changes
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 overflow-x-auto">
        <div className="flex space-x-1 mb-4">
          {tabs.map((tab) => {
            const IconComponent = iconMap[tab.icon as keyof typeof iconMap]
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'branding' | 'terms' | 'pricing' | 'document')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-pastel-blue text-air-black font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-80 overflow-y-auto">
        {activeTab === 'branding' && (
          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={customization.companyName}
                onChange={(e) => handleUpdate({ companyName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter company name"
              />
            </div>

            {/* Company Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Icon
              </label>
              <div className="flex space-x-2">
                {logoOptions.map((option) => {
                  const IconComponent = iconMap[option.icon as keyof typeof iconMap]
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleUpdate({ companyLogo: option.id })}
                      className={`w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                        customization.companyLogo === option.id
                          ? 'bg-pastel-blue text-air-black scale-110'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                      title={option.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Color Theme
              </label>
              <div className="space-y-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleUpdate({
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary
                    })}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                      customization.primaryColor === preset.primary
                        ? 'bg-gray-700 ring-2 ring-blue-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex space-x-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-sm text-gray-300">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            {/* Payment Terms */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Terms
              </label>
              <select
                value={customization.paymentTerms}
                onChange={(e) => handleUpdate({ paymentTerms: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Net 15 days">Net 15 days</option>
                <option value="Net 30 days">Net 30 days</option>
                <option value="Net 45 days">Net 45 days</option>
                <option value="Due on receipt">Due on receipt</option>
                <option value="50% upfront, 50% on completion">50% upfront, 50% on completion</option>
              </select>
            </div>

            {/* Validity Period */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quote Valid For (Days)
              </label>
              <input
                type="number"
                value={customization.validityDays}
                onChange={(e) => handleUpdate({ validityDays: Number.parseInt(e.target.value) || 30 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                min="1"
                max="365"
              />
            </div>

            {/* Warranty Period */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Warranty Period
              </label>
              <select
                value={customization.warrantyPeriod}
                onChange={(e) => handleUpdate({ warrantyPeriod: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="5 years">5 years</option>
                <option value="10 years">10 years</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-4">
            {/* Subtotal */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Subtotal
              </label>
              <input
                type="number"
                value={customization.subtotal}
                onChange={(e) => handleUpdate({ subtotal: Number.parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                min="0"
                step="1000"
              />
            </div>

            {/* Overhead Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Overhead ({customization.overheadPercent}%)
              </label>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={customization.overheadPercent}
                onChange={(e) => handleUpdate({ overheadPercent: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-400 mt-1">
                Amount: {formatCurrency(calculatedValues.overheadAmount)}
              </div>
            </div>

            {/* Profit Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profit Margin ({customization.profitPercent}%)
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={customization.profitPercent}
                onChange={(e) => handleUpdate({ profitPercent: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-400 mt-1">
                Amount: {formatCurrency(calculatedValues.profitAmount)}
              </div>
            </div>

            {/* Tax Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tax Rate ({customization.taxPercent}%)
              </label>
              <input
                type="range"
                min="0"
                max="15"
                step="0.25"
                value={customization.taxPercent}
                onChange={(e) => handleUpdate({ taxPercent: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-400 mt-1">
                Amount: {formatCurrency(calculatedValues.taxAmount)}
              </div>
            </div>

            {/* Total */}
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
              <div className="text-lg font-semibold text-white">
                Total: {formatCurrency(calculatedValues.totalAmount)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'document' && (
          <div className="space-y-4">
            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Document Type
              </label>
              <div className="space-y-2">
                {documentTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleUpdate({ documentType: option.value as 'takeoff' | 'purchase-order' | 'change-order' | 'subcontractor-agreement' })}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      customization.documentType === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={customization.customerName}
                onChange={(e) => handleUpdate({ customerName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={customization.projectName}
                onChange={(e) => handleUpdate({ projectName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter project name"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={resetToDefaults}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}
