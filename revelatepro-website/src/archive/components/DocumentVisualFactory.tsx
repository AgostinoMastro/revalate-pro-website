import type React from 'react'
import { useState, useEffect } from 'react'
import { useTypingAnimation } from '../hooks/useTypingAnimation'
import type { QuoteCustomization } from '../hooks/useQuoteCustomization'
import { Edit3, DollarSign, Mail, Clipboard, FileText, Handshake } from 'lucide-react'

interface DocumentVisualFactoryProps {
  isActive: boolean
  stepIndex: number
  color: string
  customization: QuoteCustomization
}

// Real-time typing animation component
const TypingText: React.FC<{
  text: string
  isActive: boolean
  speed?: number
  delay?: number
  className?: string
}> = ({ text, isActive, speed = 50, delay = 0, className = '' }) => {
  const { displayText, isTyping } = useTypingAnimation({
    text,
    isActive,
    speed,
    delay
  })

  return (
    <span className={`${className} ${isTyping ? 'animate-pulse' : ''}`}>
      {displayText}
      {isTyping && <span className="animate-pulse text-blue-500">|</span>}
    </span>
  )
}

// Takeoff Review Document
const TakeoffDocument: React.FC<DocumentVisualFactoryProps> = ({
  isActive,
  stepIndex,
  color,
  customization
}) => {
  const [processedData, setProcessedData] = useState<string[]>([])

  useEffect(() => {
    if (stepIndex >= 1) {
      const timer = setTimeout(() => {
        setProcessedData(['reviewed', 'generated', 'branded', 'prepared'])
      }, 500)
      return () => clearTimeout(timer)
    }
    setProcessedData([])
  }, [stepIndex])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="relative">
      <div className={`w-full max-w-80 h-[500px] bg-white rounded-xl shadow-2xl transform transition-all duration-500 ${isActive ? 'scale-105' : ''} border border-gray-200 overflow-hidden`}>
        {/* Document Header */}
        <div
          className="text-white p-4 border-b"
          style={{ backgroundColor: customization.primaryColor }}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{customization.companyLogo}</span>
              <div>
                <div className="text-2xl font-bold">QUOTE GENERATOR</div>
                <div className="text-sm opacity-90">Professional Quote Preparation</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">QTE-2024-089</div>
              <div className="text-xs opacity-80">Rev 1.0</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 h-full overflow-y-auto">
          {/* Company Branding */}
          <div className="text-center p-3 rounded-lg border border-gray-200">
            <div className="text-xl font-bold" style={{ color: customization.primaryColor }}>
              <TypingText
                text={customization.companyName}
                isActive={stepIndex >= 1}
                speed={80}
                delay={300}
              />
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
              TAKEOFF DATA REVIEW
            </div>
            <div className={`p-3 rounded-lg transition-all duration-500 relative border ${
              processedData.includes('reviewed')
                ? "border-2 shadow-lg animate-pulse"
                : stepIndex >= 1
                  ? "border"
                  : 'border-gray-200'
            }`}
            style={{
              backgroundColor: processedData.includes('reviewed')
                ? `${customization.primaryColor}30`
                : stepIndex >= 1
                  ? `${customization.primaryColor}20`
                  : '#f9fafb',
              borderColor: processedData.includes('reviewed')
                ? customization.primaryColor
                : stepIndex >= 1
                  ? `${customization.primaryColor}30`
                  : '#e5e7eb'
            }}>
              <div className="text-lg font-bold text-gray-800">
                <TypingText
                  text={customization.projectName}
                  isActive={stepIndex >= 1}
                  speed={60}
                  delay={500}
                />
              </div>
              <div className="text-sm text-gray-600">Single-family homes development</div>
              <div className="text-sm text-gray-600">Phase 2 - Units 25-48 (24 units)</div>
              {processedData.includes('reviewed') && (
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center animate-bounce"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Quote Generation */}
          {stepIndex >= 2 && (
            <div
              className="p-3 rounded-lg border animate-slideInLeft relative"
              style={{
                backgroundColor: `${customization.primaryColor}20`,
                borderColor: `${customization.primaryColor}30`
              }}
            >
              <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                AI Quote Generation
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• Professional quote template applied</div>
                <div>• Terms: <TypingText text={customization.paymentTerms} isActive={stepIndex >= 2} speed={40} /></div>
                <div>• Valid for: <TypingText text={`${customization.validityDays} days`} isActive={stepIndex >= 2} speed={40} delay={200} /></div>
                <div>• Warranty: <TypingText text={customization.warrantyPeriod} isActive={stepIndex >= 2} speed={40} delay={400} /></div>
              </div>
            </div>
          )}

          {/* Pricing Summary */}
          {stepIndex >= 3 && (
            <div
              className="p-3 rounded-lg border animate-fadeIn"
              style={{
                backgroundColor: `${customization.primaryColor}30`,
                borderColor: `${customization.primaryColor}50`
              }}
            >
              <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Pricing Breakdown
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span><TypingText text={formatCurrency(customization.subtotal)} isActive={stepIndex >= 3} speed={30} /></span>
                </div>
                <div className="flex justify-between">
                  <span>Overhead ({customization.overheadPercent}%):</span>
                  <span><TypingText text={formatCurrency(customization.subtotal * customization.overheadPercent / 100)} isActive={stepIndex >= 3} speed={30} delay={200} /></span>
                </div>
                <div className="flex justify-between">
                  <span>Profit ({customization.profitPercent}%):</span>
                  <span><TypingText text={formatCurrency(customization.subtotal * customization.profitPercent / 100)} isActive={stepIndex >= 3} speed={30} delay={400} /></span>
                </div>
                <div className="h-px bg-gray-300 my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span style={{ color: customization.primaryColor }}>
                    <TypingText
                      text={formatCurrency(customization.subtotal * (1 + (customization.overheadPercent + customization.profitPercent) / 100))}
                      isActive={stepIndex >= 3}
                      speed={30}
                      delay={600}
                    />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Email Preparation */}
          {stepIndex >= 4 && (
            <div className="p-4 rounded-lg bg-green-50 border-2 border-green-300 animate-fadeIn">
              <div className="text-center">
                <div className="text-lg font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Ready for Email Delivery
                </div>
                <div className="text-sm text-green-600 mb-2">
                  Quote prepared for customer:
                  <TypingText
                    text={` ${customization.customerName}`}
                    isActive={stepIndex >= 4}
                    speed={40}
                    delay={300}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-green-100 p-2 rounded flex justify-between">
                    <span className="font-semibold">Subject:</span>
                    <span className="text-green-700">Quote Ready - {customization.projectName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Processing overlay */}
      {isActive && stepIndex > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: customization.primaryColor, borderTopColor: 'transparent' }}
          />
        </div>
      )}
    </div>
  )
}

// Purchase Order Document
const PurchaseOrderDocument: React.FC<DocumentVisualFactoryProps> = ({
  isActive,
  stepIndex,
  color,
  customization
}) => {
  return (
    <div className="relative">
      <div className={`w-full max-w-80 h-[500px] bg-white rounded-xl shadow-2xl transform transition-all duration-500 ${isActive ? 'scale-105' : ''} border border-gray-200 overflow-hidden`}>
        <div
          className="text-white p-4 border-b"
          style={{ backgroundColor: customization.primaryColor }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{customization.companyLogo}</span>
              <div>
                <div className="text-2xl font-bold">PURCHASE ORDER</div>
                <div className="text-sm opacity-90">Material Procurement</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">PO-2024-156</div>
              <div className="text-xs opacity-80">Urgent</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 h-full overflow-y-auto">
          <div className="text-center p-3 rounded-lg border border-gray-200">
            <div className="text-xl font-bold" style={{ color: customization.primaryColor }}>
              <TypingText
                text={customization.companyName}
                isActive={stepIndex >= 1}
                speed={80}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
              VENDOR INFORMATION
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-lg font-bold text-gray-800">
                <TypingText
                  text="ABC Building Supply Co."
                  isActive={stepIndex >= 1}
                  speed={60}
                  delay={300}
                />
              </div>
              <div className="text-sm text-gray-600">Industrial Materials Division</div>
              <div className="text-sm text-gray-600">Expected Delivery: 3-5 business days</div>
            </div>
          </div>

          {stepIndex >= 2 && (
            <div className="space-y-2">
              <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
                ORDER ITEMS
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 grid grid-cols-3 gap-2">
                  <div>Item Description</div>
                  <div className="text-center">Qty</div>
                  <div className="text-right">Unit Price</div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="px-3 py-2 text-sm grid grid-cols-3 gap-2">
                    <div>Premium Lumber 2x4x8</div>
                    <div className="text-center">150</div>
                    <div className="text-right">$12.50</div>
                  </div>
                  <div className="px-3 py-2 text-sm grid grid-cols-3 gap-2">
                    <div>Concrete Mix 80lb</div>
                    <div className="text-center">75</div>
                    <div className="text-right">$8.75</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepIndex >= 3 && (
            <div
              className="p-3 rounded-lg border animate-fadeIn"
              style={{
                backgroundColor: `${customization.primaryColor}20`,
                borderColor: `${customization.primaryColor}30`
              }}
            >
              <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Delivery Instructions
              </div>
              <div className="text-sm text-gray-600">
                <div>• Deliver to: <TypingText text={customization.projectName} isActive={stepIndex >= 3} speed={40} /></div>
                <div>• Contact: <TypingText text={customization.customerName} isActive={stepIndex >= 3} speed={40} delay={200} /></div>
                <div>• Payment: <TypingText text={customization.paymentTerms} isActive={stepIndex >= 3} speed={40} delay={400} /></div>
              </div>
            </div>
          )}

          {stepIndex >= 4 && (
            <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-300 animate-fadeIn">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-800 mb-2 flex items-center justify-center gap-2">
                  <Clipboard className="w-5 h-5" />
                  Order Submitted
                </div>
                <div className="text-sm text-blue-600">
                  PO sent to vendor with automated tracking
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Change Order Document
const ChangeOrderDocument: React.FC<DocumentVisualFactoryProps> = ({
  isActive,
  stepIndex,
  color,
  customization
}) => {
  return (
    <div className="relative">
      <div className={`w-full max-w-80 h-[500px] bg-white rounded-xl shadow-2xl transform transition-all duration-500 ${isActive ? 'scale-105' : ''} border border-gray-200 overflow-hidden`}>
        <div
          className="text-white p-4 border-b"
          style={{ backgroundColor: customization.primaryColor }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{customization.companyLogo}</span>
              <div>
                <div className="text-2xl font-bold">CHANGE ORDER</div>
                <div className="text-sm opacity-90">Project Modification</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">CO-2024-023</div>
              <div className="text-xs opacity-80">Pending Approval</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 h-full overflow-y-auto">
          <div className="text-center p-3 rounded-lg border border-gray-200">
            <div className="text-xl font-bold" style={{ color: customization.primaryColor }}>
              <TypingText
                text={customization.companyName}
                isActive={stepIndex >= 1}
                speed={80}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
              CHANGE REQUEST DETAILS
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="text-lg font-bold text-gray-800">
                <TypingText
                  text="Additional Bathroom Installation"
                  isActive={stepIndex >= 1}
                  speed={60}
                  delay={300}
                />
              </div>
              <div className="text-sm text-gray-600">
                Project: <TypingText text={customization.projectName} isActive={stepIndex >= 1} speed={40} delay={600} />
              </div>
              <div className="text-sm text-gray-600">
                Customer: <TypingText text={customization.customerName} isActive={stepIndex >= 1} speed={40} delay={800} />
              </div>
            </div>
          </div>

          {stepIndex >= 2 && (
            <div className="space-y-2">
              <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
                SCOPE CHANGES
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <span><TypingText text="Add master bathroom suite" isActive={stepIndex >= 2} speed={40} /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <span><TypingText text="Install heated floors" isActive={stepIndex >= 2} speed={40} delay={200} /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <span><TypingText text="Upgrade to premium fixtures" isActive={stepIndex >= 2} speed={40} delay={400} /></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepIndex >= 3 && (
            <div
              className="p-3 rounded-lg border animate-fadeIn"
              style={{
                backgroundColor: `${customization.primaryColor}20`,
                borderColor: `${customization.primaryColor}30`
              }}
            >
              <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Cost Impact
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Additional Work:</span>
                  <span className="text-green-600 font-semibold">
                    <TypingText text="+$28,500" isActive={stepIndex >= 3} speed={30} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline Impact:</span>
                  <span className="text-orange-600 font-semibold">
                    <TypingText text="+2 weeks" isActive={stepIndex >= 3} speed={30} delay={200} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {stepIndex >= 4 && (
            <div className="p-4 rounded-lg bg-orange-50 border-2 border-orange-300 animate-fadeIn">
              <div className="text-center">
                <div className="text-lg font-bold text-orange-800 mb-2 flex items-center justify-center gap-2">
                  <Handshake className="w-5 h-5" />
                  Awaiting Approval
                </div>
                <div className="text-sm text-orange-600">
                  Change order sent to customer for review
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Subcontractor Agreement Document
const SubcontractorAgreementDocument: React.FC<DocumentVisualFactoryProps> = ({
  isActive,
  stepIndex,
  color,
  customization
}) => {
  return (
    <div className="relative">
      <div className={`w-full max-w-80 h-[500px] bg-white rounded-xl shadow-2xl transform transition-all duration-500 ${isActive ? 'scale-105' : ''} border border-gray-200 overflow-hidden`}>
        <div
          className="text-white p-4 border-b"
          style={{ backgroundColor: customization.primaryColor }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{customization.companyLogo}</span>
              <div>
                <div className="text-2xl font-bold">SUBCONTRACTOR</div>
                <div className="text-sm opacity-90">Service Agreement</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">SA-2024-089</div>
              <div className="text-xs opacity-80">Draft</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 h-full overflow-y-auto">
          <div className="text-center p-3 rounded-lg border border-gray-200">
            <div className="text-xl font-bold" style={{ color: customization.primaryColor }}>
              <TypingText
                text={customization.companyName}
                isActive={stepIndex >= 1}
                speed={80}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
              SUBCONTRACTOR DETAILS
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-lg font-bold text-gray-800">
                <TypingText
                  text="Premium Electrical Services LLC"
                  isActive={stepIndex >= 1}
                  speed={60}
                  delay={300}
                />
              </div>
              <div className="text-sm text-gray-600">Licensed Electrical Contractor</div>
              <div className="text-sm text-gray-600">License #EC-2024-8847</div>
            </div>
          </div>

          {stepIndex >= 2 && (
            <div className="space-y-2">
              <div className="text-sm font-semibold" style={{ color: customization.primaryColor }}>
                SCOPE OF WORK
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <span><TypingText text="Complete electrical rough-in" isActive={stepIndex >= 2} speed={40} /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <span><TypingText text="Install main electrical panels" isActive={stepIndex >= 2} speed={40} delay={200} /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    <span><TypingText text="Final fixture installation" isActive={stepIndex >= 2} speed={40} delay={400} /></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stepIndex >= 3 && (
            <div
              className="p-3 rounded-lg border animate-fadeIn"
              style={{
                backgroundColor: `${customization.primaryColor}20`,
                borderColor: `${customization.primaryColor}30`
              }}
            >
              <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Contract Terms
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• Project: <TypingText text={customization.projectName} isActive={stepIndex >= 3} speed={40} /></div>
                <div>• Payment: <TypingText text={customization.paymentTerms} isActive={stepIndex >= 3} speed={40} delay={200} /></div>
                <div>• Warranty: <TypingText text={customization.warrantyPeriod} isActive={stepIndex >= 3} speed={40} delay={400} /></div>
                <div>• Insurance: Required, Certificate on file</div>
              </div>
            </div>
          )}

          {stepIndex >= 4 && (
            <div className="p-4 rounded-lg bg-purple-50 border-2 border-purple-300 animate-fadeIn">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
                  <Handshake className="w-5 h-5" />
                  Ready for Execution
                </div>
                <div className="text-sm text-purple-600">
                  Agreement prepared for digital signatures
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Factory Component
export const DocumentVisualFactory: React.FC<DocumentVisualFactoryProps> = (props) => {
  const { customization } = props

  switch (customization.documentType) {
    case 'purchase-order':
      return <PurchaseOrderDocument {...props} />
    case 'change-order':
      return <ChangeOrderDocument {...props} />
    case 'subcontractor-agreement':
      return <SubcontractorAgreementDocument {...props} />
    default:
      return <TakeoffDocument {...props} />
  }
}
