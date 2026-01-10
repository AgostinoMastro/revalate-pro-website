import type React from 'react'
import { useState, useCallback } from 'react'

interface SavedResult {
  id: string
  demoType: string
  companyName?: string
  contactEmail: string
  savedAt: string
  summary: {
    avgImprovement: number
    metricsImproved: number
    totalImpact: string
  }
  beforeAfterData: Array<{
    metric: string
    before: number
    after: number
    improvement: string
    unit: string
  }>
  leadSource: 'demo_save'
  followUpPreferences: {
    receiveUpdates: boolean
    interestedInTrial: boolean
    preferredContactMethod: 'email' | 'phone' | 'either'
    timeframe: 'immediate' | '1-3_months' | '3-6_months' | '6-12_months' | 'exploring'
  }
}

interface SaveResultsModalProps {
  isOpen: boolean
  onClose: () => void
  demoType: string
  demoData: {
    summary: {
      avgImprovement: number
      metricsImproved: number
      totalImpact: string
    }
    beforeAfterData: Array<{
      metric: string
      before: number
      after: number
      improvement: string
      unit: string
    }>
  }
}

interface SaveResultsButtonProps {
  demoType: string
  demoData: {
    summary: {
      avgImprovement: number
      metricsImproved: number
      totalImpact: string
    }
    beforeAfterData: Array<{
      metric: string
      before: number
      after: number
      improvement: string
      unit: string
    }>
  }
}

const SaveResultsModal: React.FC<SaveResultsModalProps> = ({ isOpen, onClose, demoType, demoData }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savedId, setSavedId] = useState('')

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    title: ''
  })

  const [preferences, setPreferences] = useState({
    receiveUpdates: true,
    interestedInTrial: false,
    preferredContactMethod: 'email' as 'email' | 'phone' | 'either',
    timeframe: 'exploring' as 'immediate' | '1-3_months' | '3-6_months' | '6-12_months' | 'exploring'
  })

  const handleSaveResults = useCallback(async () => {
    setIsSaving(true)

    // Simulate API call to save results and capture lead
    await new Promise(resolve => setTimeout(resolve, 2000))

    const savedResult: SavedResult = {
      id: `saved_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      demoType,
      companyName: contactData.company,
      contactEmail: contactData.email,
      savedAt: new Date().toISOString(),
      summary: demoData.summary,
      beforeAfterData: demoData.beforeAfterData,
      leadSource: 'demo_save',
      followUpPreferences: preferences
    }

    // Log the captured lead (in real app, send to CRM/lead management system)
    console.log('Lead captured from demo save:', {
      leadData: savedResult,
      contactInfo: contactData,
      preferences,
      source: 'demo_save_feature'
    })

    setSavedId(savedResult.id)
    setSaved(true)
    setIsSaving(false)

    // Track conversion event
    trackDemoSaveConversion(savedResult)
  }, [contactData, preferences, demoType, demoData])

  const trackDemoSaveConversion = (savedResult: SavedResult) => {
    // Analytics tracking for conversion
    console.log('Demo save conversion tracked:', {
      eventType: 'demo_save_conversion',
      demoType: savedResult.demoType,
      leadId: savedResult.id,
      companyName: savedResult.companyName,
      interestedInTrial: savedResult.followUpPreferences.interestedInTrial,
      timeframe: savedResult.followUpPreferences.timeframe,
      timestamp: savedResult.savedAt
    })
  }

  const resetModal = () => {
    setCurrentStep(1)
    setSaved(false)
    setSavedId('')
    setContactData({
      name: '',
      email: '',
      company: '',
      phone: '',
      title: ''
    })
    setPreferences({
      receiveUpdates: true,
      interestedInTrial: false,
      preferredContactMethod: 'email',
      timeframe: 'exploring'
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!isOpen) return null

  const getDemoTitle = () => {
    const titles = {
      'spreadsheet-chaos': 'Document Processing',
      'bidding-stress': 'Bid Generation',
      'estimation-guesswork': 'AI Estimating',
      'financial-chaos': 'Financial Monitoring'
    }
    return titles[demoType as keyof typeof titles] || 'AI Demo'
  }

  if (saved) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Results Saved Successfully!</h3>
            <p className="text-gray-400 mb-4">
              Your {getDemoTitle()} demo results have been saved to your account.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <div className="text-green-400 text-sm font-medium mb-1">Saved Result ID</div>
              <div className="text-white font-mono text-sm">{savedId}</div>
            </div>

            <div className="text-left space-y-3 mb-6">
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Demo results saved to your account
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Welcome email sent to {contactData.email}
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Follow-up scheduled based on your preferences
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  // Simulate opening saved results
                  alert('Opening your saved results dashboard...')
                }}
                className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Saved Results
              </button>
              <button
                onClick={handleClose}
                className="w-full px-4 py-2 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Save Your Demo Results</h3>
          <p className="text-gray-400">
            Keep your {getDemoTitle()} transformation insights for future reference
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              currentStep >= 1 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 rounded-full ${
              currentStep >= 2 ? 'bg-purple-500' : 'bg-gray-700'
            }`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              currentStep >= 2 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactData.company}
                  onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="ABC Construction"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={contactData.title}
                  onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="Project Manager"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!contactData.name || !contactData.email || !contactData.company}
                className={`px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg transition-all duration-200 ${
                  (!contactData.name || !contactData.email || !contactData.company)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-purple-600'
                }`}
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow-up Preferences</h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  What's your implementation timeframe?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'immediate', label: 'Ready to start now' },
                    { value: '1-3_months', label: '1-3 months' },
                    { value: '3-6_months', label: '3-6 months' },
                    { value: '6-12_months', label: '6-12 months' },
                    { value: 'exploring', label: 'Just exploring' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences({ ...preferences, timeframe: option.value as 'immediate' | '1-3_months' | '3-6_months' | '6-12_months' | 'exploring' })}
                      className={`p-3 rounded-lg text-left transition-all duration-200 ${
                        preferences.timeframe === option.value
                          ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                          : 'bg-gray-800 border border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Preferred contact method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'email', label: 'Email' },
                    { value: 'phone', label: 'Phone' },
                    { value: 'either', label: 'Either' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPreferences({ ...preferences, preferredContactMethod: option.value as 'email' | 'phone' | 'either' })}
                      className={`p-3 rounded-lg text-center transition-all duration-200 ${
                        preferences.preferredContactMethod === option.value
                          ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                          : 'bg-gray-800 border border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.receiveUpdates}
                    onChange={(e) => setPreferences({ ...preferences, receiveUpdates: e.target.checked })}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-300">Send me product updates and construction industry insights</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.interestedInTrial}
                    onChange={(e) => setPreferences({ ...preferences, interestedInTrial: e.target.checked })}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-300">I'm interested in a free trial</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleSaveResults}
                disabled={isSaving}
                className={`px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg transition-all duration-200 ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'
                }`}
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving Results...
                  </div>
                ) : (
                  'Save My Results'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-white hover:text-gray-300 transition-colors bg-white/10 hover:bg-white/20 rounded-lg border border-white/30"
          >
            Cancel
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your information is secure and will only be used to provide you with relevant updates about RevalatePro.
            <br />
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

export const SaveResultsButton: React.FC<SaveResultsButtonProps> = ({
  demoType,
  demoData
}) => {
  const [showSaveModal, setShowSaveModal] = useState(false)

  return (
    <>
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => setShowSaveModal(true)}
          className="flex items-center justify-center text-sm font-semibold border-2 border-white text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white hover:text-black white-border-btn whitespace-nowrap"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Results
        </button>
      </div>

      <SaveResultsModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        demoType={demoType}
        demoData={demoData}
      />
    </>
  )
}

// Utility function to prepare save data from demo results
export const prepareSaveData = (
  demoType: string,
  beforeAfterData: Array<{
    label: string
    before: number
    after: number
    unit: string
    improvement: string
  }>
) => {
  const summary = {
    avgImprovement: Math.round(
      beforeAfterData.reduce((acc, item) => acc + (((item.after - item.before) / item.before) * 100), 0) / beforeAfterData.length
    ),
    metricsImproved: beforeAfterData.filter(item => item.after > item.before).length,
    totalImpact: beforeAfterData.reduce((acc, item) => acc + Math.abs(item.after - item.before), 0).toLocaleString()
  }

  return {
    summary,
    beforeAfterData: beforeAfterData.map(item => ({
      metric: item.label,
      before: item.before,
      after: item.after,
      improvement: item.improvement,
      unit: item.unit
    }))
  }
}

export default SaveResultsButton
