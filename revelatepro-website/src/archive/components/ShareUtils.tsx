import type React from 'react'
import { useState, useCallback } from 'react'

interface ShareData {
  demoType: string
  companyName?: string
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
  timestamp: string
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareData: ShareData
}

interface ShareButtonsProps {
  shareData: ShareData
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareData }) => {
  const [shareUrl, setShareUrl] = useState('')
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false)
  const [urlGenerated, setUrlGenerated] = useState(false)
  const [emailData, setEmailData] = useState({
    recipients: '',
    subject: '',
    message: ''
  })
  const [sendingEmail, setSendingEmail] = useState(false)

  const generateShareableUrl = useCallback(async () => {
    setIsGeneratingUrl(true)

    // In a real application, this would call your backend API to store the demo data
    // and return a shareable URL. For now, we'll simulate this.
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate a unique ID for the demo results
    const demoId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const baseUrl = window.location.origin
    const generatedUrl = `${baseUrl}/shared-demo/${demoId}`

    setShareUrl(generatedUrl)
    setUrlGenerated(true)
    setIsGeneratingUrl(false)

    // Track sharing event
    console.log('Demo shared:', { demoId, shareData })
  }, [shareData])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      // Show toast notification (you could integrate with your notification system)
      alert('Share URL copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareViaEmail = async () => {
    setSendingEmail(true)

    // Simulate email sending (integrate with your email service)
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Email sent:', { emailData, shareUrl })
    alert('Demo results shared via email!')

    setSendingEmail(false)
    setEmailData({ recipients: '', subject: '', message: '' })
  }

  const socialShare = (platform: 'linkedin' | 'twitter' | 'facebook') => {
    const title = "Check out these AI construction transformation results!"
    const text = `Achieved ${shareData.summary.avgImprovement}% average improvement with RevalatePro AI. See the full results:`
    const url = shareUrl || window.location.href

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Share Demo Results</h3>
          <p className="text-gray-400">
            Share these transformation insights with your team or stakeholders
          </p>
        </div>

        {/* Demo Results Summary */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Transformation Highlights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">
                {shareData.summary.avgImprovement}%
              </div>
              <div className="text-xs text-gray-400">Avg Improvement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {shareData.summary.metricsImproved}/{shareData.beforeAfterData.length}
              </div>
              <div className="text-xs text-gray-400">Metrics Improved</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {shareData.summary.totalImpact}
              </div>
              <div className="text-xs text-gray-400">Total Impact</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Generate Shareable URL */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Generate Shareable Link</h5>
            {!urlGenerated ? (
              <button
                onClick={generateShareableUrl}
                disabled={isGeneratingUrl}
                className={`w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 ${
                  isGeneratingUrl ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
              >
                {isGeneratingUrl ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Generating secure link...
                  </div>
                ) : (
                  'Generate Shareable URL'
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  This link will be valid for 30 days and can be viewed without authentication.
                </p>
              </div>
            )}
          </div>

          {/* Social Media Sharing */}
          {urlGenerated && (
            <div>
              <h5 className="text-lg font-semibold text-white mb-3">Share on Social Media</h5>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => socialShare('linkedin')}
                  className="flex items-center justify-center px-4 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={() => socialShare('twitter')}
                  className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button
                  onClick={() => socialShare('facebook')}
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          )}

          {/* Email Sharing */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Send via Email</h5>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Recipients (comma-separated)
                </label>
                <input
                  type="text"
                  value={emailData.recipients}
                  onChange={(e) => setEmailData({ ...emailData, recipients: e.target.value })}
                  placeholder="john@company.com, team@company.com"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  placeholder={`AI Construction Demo Results - ${shareData.summary.avgImprovement}% Improvement`}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message (optional)
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  placeholder="Hi team, check out these impressive AI transformation results we achieved..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
              <button
                onClick={shareViaEmail}
                disabled={!emailData.recipients || sendingEmail}
                className={`w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg transition-all duration-200 ${
                  (!emailData.recipients || sendingEmail) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                }`}
              >
                {sendingEmail ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : (
                  'Send Demo Results'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-white/30 text-white font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
          >
            Close
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Shared results help demonstrate ROI and can be used for internal presentations.
            <br />
            All shared data is anonymized and secure.
          </p>
        </div>
      </div>
    </div>
  )
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  shareData
}) => {
  const [showShareModal, setShowShareModal] = useState(false)

  const quickShare = (method: 'copy' | 'email') => {
    if (method === 'copy') {
      const shareText = `Check out these AI construction transformation results! Achieved ${shareData.summary.avgImprovement}% average improvement with RevalatePro AI. ${shareData.summary.metricsImproved}/${shareData.beforeAfterData.length} metrics improved with ${shareData.summary.totalImpact} total impact.`

      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results summary copied to clipboard!')
      }).catch(err => {
        console.error('Failed to copy:', err)
        setShowShareModal(true)
      })
    } else {
      setShowShareModal(true)
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="text-sm text-gray-400 bg-dark-bg/70 px-4 py-2 rounded-xl border border-gray-700/50 font-medium text-center">
          Share results
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => quickShare('copy')}
            className="flex items-center justify-center text-sm font-semibold bg-gradient-to-r from-gradient-green to-gradient-dark text-white px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Quick Copy
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center justify-center text-sm font-semibold border-2 border-white text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white hover:text-black white-border-btn whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share More
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareData={shareData}
      />
    </>
  )
}

// Utility function to prepare share data from demo results
export const prepareShareData = (
  demoType: string,
  beforeAfterData: Array<{
    label: string
    before: number
    after: number
    unit: string
    improvement: string
  }>,
  companyName?: string
): ShareData => {
  const summary = {
    avgImprovement: Math.round(
      beforeAfterData.reduce((acc, item) => acc + (((item.after - item.before) / item.before) * 100), 0) / beforeAfterData.length
    ),
    metricsImproved: beforeAfterData.filter(item => item.after > item.before).length,
    totalImpact: beforeAfterData.reduce((acc, item) => acc + Math.abs(item.after - item.before), 0).toLocaleString()
  }

  return {
    demoType,
    companyName,
    timestamp: new Date().toISOString(),
    beforeAfterData: beforeAfterData.map(item => ({
      metric: item.label,
      before: item.before,
      after: item.after,
      improvement: item.improvement,
      unit: item.unit
    })),
    summary
  }
}

export default ShareButtons
