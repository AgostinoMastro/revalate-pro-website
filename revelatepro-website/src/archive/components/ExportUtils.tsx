import type React from 'react'
import { useState } from 'react'
import jsPDF from 'jspdf'
import Papa from 'papaparse'

interface ExportData {
  demoType: string
  companyName?: string
  contactEmail?: string
  timestamp: string
  beforeAfterData: Array<{
    metric: string
    before: number
    after: number
    improvement: string
    unit: string
  }>
  timelineData?: Array<{
    period: string
    value: number
    description: string
  }>
  summary: {
    avgImprovement: number
    metricsImproved: number
    totalImpact: string
  }
}

interface EmailCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string; company: string }) => void
  exportType: 'pdf' | 'csv'
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onClose, onSubmit, exportType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call for lead capture
    await new Promise(resolve => setTimeout(resolve, 1000))

    onSubmit(formData)
    setIsSubmitting(false)
    onClose()

    // Reset form
    setFormData({ name: '', email: '', company: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Download Demo Results</h3>
          <p className="text-gray-400">
            Get your personalized {exportType.toUpperCase()} report with transformation insights
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="ABC Construction"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-white/30 text-white font-semibold rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                `Download ${exportType.toUpperCase()}`
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By downloading, you agree to receive follow-up communications about RevalatePro.
            <br />
            We respect your privacy and won't spam you.
          </p>
        </div>
      </div>
    </div>
  )
}

interface ExportButtonsProps {
  demoType: string
  exportData: ExportData
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  demoType,
  exportData
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [pendingExportType, setPendingExportType] = useState<'pdf' | 'csv' | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportClick = (type: 'pdf' | 'csv') => {
    setPendingExportType(type)
    setShowEmailModal(true)
  }

  const handleEmailSubmit = async (contactData: { name: string; email: string; company: string }) => {
    if (!pendingExportType) return

    setIsExporting(true)

    // Update export data with contact info
    const enrichedData: ExportData = {
      ...exportData,
      companyName: contactData.company,
      contactEmail: contactData.email
    }

    try {
      if (pendingExportType === 'pdf') {
        await generatePDFReport(enrichedData, contactData)
      } else {
        await generateCSVReport(enrichedData, contactData)
      }

      // Track lead capture event
      trackLeadCapture(contactData, pendingExportType, demoType)

    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }

    setIsExporting(false)
    setPendingExportType(null)
  }

  const generatePDFReport = async (data: ExportData, contactData: { name: string; email: string; company: string }) => {
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    // Header with branding
    pdf.setFillColor(10, 21, 52)
    pdf.rect(0, 0, pageWidth, 40, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('RevalatePro', 20, 25)

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text('AI Construction Management Demo Results', 20, 35)

    // Company info
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`Demo Results for ${contactData.company}`, 20, 60)

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Prepared for: ${contactData.name}`, 20, 75)
    pdf.text(`Email: ${contactData.email}`, 20, 85)
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 95)

    // Demo type
    const demoTitles = {
      'spreadsheet-chaos': 'Document Processing Demo',
      'bidding-stress': 'Bid Generation Demo',
      'estimation-guesswork': 'AI Estimating Demo',
      'financial-chaos': 'Financial Monitoring Demo'
    }

    pdf.text(`Demo Type: ${demoTitles[data.demoType as keyof typeof demoTitles] || 'AI Demo'}`, 20, 105)

    // Executive Summary
    let yPos = 125
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Executive Summary', 20, yPos)
    yPos += 15

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`• Average Improvement: ${data.summary.avgImprovement}%`, 30, yPos)
    yPos += 10
    pdf.text(`• Metrics Improved: ${data.summary.metricsImproved} out of ${data.beforeAfterData.length}`, 30, yPos)
    yPos += 10
    pdf.text(`• Total Impact: ${data.summary.totalImpact}`, 30, yPos)
    yPos += 20

    // Before/After Comparison Table
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Before vs After Comparison', 20, yPos)
    yPos += 15

    // Table headers
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Metric', 20, yPos)
    pdf.text('Before', 80, yPos)
    pdf.text('After', 120, yPos)
    pdf.text('Improvement', 160, yPos)
    yPos += 5

    // Table line
    pdf.line(20, yPos, 190, yPos)
    yPos += 10

    // Table data
    pdf.setFont('helvetica', 'normal')
    for (const row of data.beforeAfterData) {
      if (yPos > pageHeight - 30) {
        pdf.addPage()
        yPos = 30
      }

      pdf.text(row.metric, 20, yPos)
      pdf.text(`${row.before}${row.unit}`, 80, yPos)
      pdf.text(`${row.after}${row.unit}`, 120, yPos)
      pdf.text(row.improvement, 160, yPos)
      yPos += 10
    }

    // Next Steps
    yPos += 10
    if (yPos > pageHeight - 80) {
      pdf.addPage()
      yPos = 30
    }

    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Next Steps', 20, yPos)
    yPos += 15

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    const nextSteps = [
      '1. Schedule a personalized demo with your data',
      '2. Start a free 14-day trial',
      '3. Speak with our implementation team',
      '4. Get a custom ROI analysis for your company'
    ]

    for (const step of nextSteps) {
      pdf.text(step, 30, yPos)
      yPos += 10
    }

    // Contact information
    yPos += 10
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Ready to Transform Your Construction Business?', 20, yPos)
    yPos += 15

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Contact us:', 20, yPos)
    yPos += 10
    pdf.text('• Email: demo@revalatepro.com', 30, yPos)
    yPos += 10
    pdf.text('• Phone: 1-800-REVALATE', 30, yPos)
    yPos += 10
    pdf.text('• Website: www.revalatepro.com', 30, yPos)

    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(128, 128, 128)
    pdf.text('© 2024 RevalatePro. All rights reserved.', 20, pageHeight - 10)

    // Save the PDF
    const filename = `RevalatePro-Demo-Results-${contactData.company.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
  }

  const generateCSVReport = async (data: ExportData, contactData: { name: string; email: string; company: string }) => {
    const csvData = [
      // Header information
      ['RevalatePro Demo Results'],
      ['Company', contactData.company],
      ['Contact', contactData.name],
      ['Email', contactData.email],
      ['Date', new Date().toISOString()],
      ['Demo Type', data.demoType],
      [''],

      // Summary
      ['Executive Summary'],
      ['Average Improvement (%)', data.summary.avgImprovement],
      ['Metrics Improved', `${data.summary.metricsImproved}/${data.beforeAfterData.length}`],
      ['Total Impact', data.summary.totalImpact],
      [''],

      // Before/After Data
      ['Before vs After Comparison'],
      ['Metric', 'Before', 'After', 'Unit', 'Improvement', 'Change (%)'],
      ...data.beforeAfterData.map(row => [
        row.metric,
        row.before,
        row.after,
        row.unit,
        row.improvement,
        Math.round(((row.after - row.before) / row.before) * 100)
      ])
    ]

    if (data.timelineData && data.timelineData.length > 0) {
      csvData.push(
        [''],
        ['Timeline Data'],
        ['Period', 'Value', 'Description'],
        ...data.timelineData.map(row => [row.period, row.value, row.description])
      )
    }

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `RevalatePro-Demo-Data-${contactData.company.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const trackLeadCapture = (contactData: { name: string; email: string; company: string }, exportType: string, demoType: string) => {
    // In a real application, this would send data to your analytics/CRM
    console.log('Lead captured:', {
      name: contactData.name,
      email: contactData.email,
      company: contactData.company,
      exportType,
      demoType,
      timestamp: new Date().toISOString(),
      source: 'demo-export'
    })

    // You could send this to your CRM, analytics platform, or lead management system
    // Example: sendToHubSpot(contactData), sendToSalesforce(contactData), etc.
  }

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="text-sm text-gray-400 bg-dark-bg/70 px-4 py-2 rounded-xl border border-gray-700/50 font-medium text-center">
          Real-time results
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleExportClick('pdf')}
            disabled={isExporting}
            className="flex items-center justify-center text-sm font-semibold bg-gradient-to-r from-gradient-green to-gradient-dark text-white px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
          <button
            onClick={() => handleExportClick('csv')}
            disabled={isExporting}
            className="flex items-center justify-center text-sm font-semibold border-2 border-white text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white hover:text-black white-border-btn disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a4 4 0 01-4-4V5a4 4 0 714-4h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a4 4 0 01-4 4z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false)
          setPendingExportType(null)
        }}
        onSubmit={handleEmailSubmit}
        exportType={pendingExportType || 'pdf'}
      />
    </>
  )
}

// Utility function to prepare export data from demo results
export const prepareExportData = (
  demoType: string,
  beforeAfterData: Array<{
    label: string
    before: number
    after: number
    unit: string
    improvement: string
  }>,
  timelineData?: Array<{
    time: string
    beforeValue: number
    afterValue: number
    label: string
  }>
): ExportData => {
  const summary = {
    avgImprovement: Math.round(
      beforeAfterData.reduce((acc, item) => acc + (((item.after - item.before) / item.before) * 100), 0) / beforeAfterData.length
    ),
    metricsImproved: beforeAfterData.filter(item => item.after > item.before).length,
    totalImpact: beforeAfterData.reduce((acc, item) => acc + Math.abs(item.after - item.before), 0).toLocaleString()
  }

  return {
    demoType,
    timestamp: new Date().toISOString(),
    beforeAfterData: beforeAfterData.map(item => ({
      metric: item.label,
      before: item.before,
      after: item.after,
      improvement: item.improvement,
      unit: item.unit
    })),
    timelineData: timelineData?.map(item => ({
      period: item.time,
      value: item.afterValue,
      description: item.label
    })),
    summary
  }
}

export default ExportButtons
