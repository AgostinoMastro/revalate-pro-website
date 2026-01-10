import type React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

import { Clipboard, BarChart3, Ruler, Package, Settings, Truck, Edit3, RotateCcw, Camera, Zap, Wrench, Thermometer, FileText, CheckCircle } from 'lucide-react'

interface FileUploadSimulationProps {
  isActive: boolean
  onUploadComplete: (file: SimulatedFile) => void
  documentType: 'takeoff' | 'purchase-order' | 'change-order' | 'subcontractor-agreement'
  className?: string
}

interface SimulatedFile {
  name: string
  size: number
  type: string
  preview: string
  icon: string
  uploadProgress: number
  processingStage: 'uploading' | 'scanning' | 'extracting' | 'complete'
  extractedData?: {
    pages: number
    confidence: number
    keyFields: string[]
  }
}

interface DocumentTemplate {
  name: string
  icon: string
  type: string
  size: number
  fields: string[]
}

// Icon mapping for file types and processes
const iconMap = {
  'clipboard': Clipboard,
  'barChart3': BarChart3,
  'ruler': Ruler,
  'package': Package,
  'settings': Settings,
  'truck': Truck,
  'edit3': Edit3,
  'rotateCcw': RotateCcw,
  'camera': Camera,
  'zap': Zap,
  'wrench': Wrench,
  'thermometer': Thermometer,
  'fileText': FileText,
  'checkCircle': CheckCircle
}

// Updated document templates with icon names instead of emojis
const documentTemplates = {
  'takeoff': [
    { name: 'Residential_Takeoff_Phase2.pdf', icon: 'clipboard', type: 'application/pdf', size: 2.4, fields: ['Project Name', 'Quantities', 'Materials', 'Labor'] },
    { name: 'Commercial_Estimate_2024.xlsx', icon: 'barChart3', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 1.8, fields: ['Line Items', 'Costs', 'Markup', 'Totals'] },
    { name: 'Blueprint_Measurements.pdf', icon: 'ruler', type: 'application/pdf', size: 3.2, fields: ['Dimensions', 'Room Count', 'Sq Footage', 'Specifications'] }
  ],
  'purchase-order': [
    { name: 'Lumber_Order_March2024.pdf', icon: 'package', type: 'application/pdf', size: 1.2, fields: ['Vendor', 'Items', 'Quantities', 'Delivery Date'] },
    { name: 'Hardware_Supply_List.csv', icon: 'settings', type: 'text/csv', size: 0.8, fields: ['SKU', 'Description', 'Price', 'Supplier'] },
    { name: 'Equipment_Rental_Order.png', icon: 'truck', type: 'image/png', size: 2.1, fields: ['Equipment Type', 'Rental Period', 'Location', 'Cost'] }
  ],
  'change-order': [
    { name: 'Additional_Work_Request.docx', icon: 'edit3', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 1.5, fields: ['Change Description', 'Cost Impact', 'Timeline', 'Approval'] },
    { name: 'Scope_Modification_Form.pdf', icon: 'rotateCcw', type: 'application/pdf', size: 2.0, fields: ['Original Scope', 'New Scope', 'Justification', 'Customer Approval'] },
    { name: 'Field_Change_Photos.jpg', icon: 'camera', type: 'image/jpeg', size: 3.5, fields: ['Visual Evidence', 'Location', 'Date', 'Conditions'] }
  ],
  'subcontractor-agreement': [
    { name: 'Electrical_Contract_2024.pdf', icon: 'zap', type: 'application/pdf', size: 2.8, fields: ['Scope of Work', 'Payment Terms', 'Timeline', 'Insurance'] },
    { name: 'Plumbing_Service_Agreement.doc', icon: 'wrench', type: 'application/msword', size: 1.9, fields: ['Services', 'Rates', 'Warranty', 'Licensing'] },
    { name: 'HVAC_Subcontractor_Cert.pdf', icon: 'thermometer', type: 'application/pdf', size: 1.1, fields: ['Certifications', 'Insurance', 'Contact Info', 'Specialties'] }
  ]
}

// Icon component for consistent file icons
const FileIcon: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = "w-6 h-6" }) => {
  const IconComponent = iconMap[iconType as keyof typeof iconMap] || FileText
  return <IconComponent className={`text-pastel-blue ${className}`} />
}

const FileUploadSimulation: React.FC<FileUploadSimulationProps> = ({
  isActive,
  onUploadComplete,
  documentType,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<SimulatedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const dropZoneRef = useRef<HTMLDivElement>(null)

  const getRandomTemplate = () => {
    const templates = documentTemplates[documentType]
    const template = templates[Math.floor(Math.random() * templates.length)]
    return template
  }

  const simulateFileUpload = async (template: DocumentTemplate) => {
    const file: SimulatedFile = {
      name: template.name,
      size: template.size * 1024 * 1024, // Convert MB to bytes
      type: template.type,
      preview: `data:${template.type};base64,simulated`,
      icon: template.icon,
      uploadProgress: 0,
      processingStage: 'uploading',
      extractedData: {
        pages: Math.floor(Math.random() * 10) + 1,
        confidence: 0,
        keyFields: template.fields
      }
    }

    setUploadedFiles([file])
    setIsProcessing(true)


    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setUploadedFiles([{ ...file, uploadProgress: progress }])
    }

    // Scanning stage

    await new Promise(resolve => setTimeout(resolve, 500))
    setUploadedFiles([{
      ...file,
      uploadProgress: 100,
      processingStage: 'scanning',
      extractedData: { ...(file.extractedData || { pages: 0, confidence: 0, keyFields: [] }), confidence: 25 }
    }])

    // Extracting stage

    await new Promise(resolve => setTimeout(resolve, 800))
    setUploadedFiles([{
      ...file,
      uploadProgress: 100,
      processingStage: 'extracting',
      extractedData: { ...(file.extractedData || { pages: 0, confidence: 0, keyFields: [] }), confidence: 75 }
    }])

    // Complete stage
    await new Promise(resolve => setTimeout(resolve, 600))
    const finalFile = {
      ...file,
      uploadProgress: 100,
      processingStage: 'complete' as const,
      extractedData: { ...(file.extractedData || { pages: 0, confidence: 0, keyFields: [] }), confidence: 98 }
    }

    setUploadedFiles([finalFile])

    setIsProcessing(false)
    onUploadComplete(finalFile)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!isProcessing) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    if (!isProcessing && isActive) {
      const template = getRandomTemplate()
      simulateFileUpload(template)
    }
  }

  const handleClick = () => {
    if (!isProcessing && isActive) {
      const template = getRandomTemplate()
      simulateFileUpload(template)
    }
  }

  const resetUpload = useCallback(() => {
    setUploadedFiles([])
    setIsProcessing(false)
    setIsDragOver(false)
  }, [])

  useEffect(() => {
    if (!isActive) {
      resetUpload()
    }
  }, [isActive, resetUpload])

  const getProcessingMessage = (stage: string) => {
    switch (stage) {
      case 'uploading': return 'Uploading document...'
      case 'scanning': return 'Scanning pages for content...'
      case 'extracting': return 'Extracting key information...'
      case 'complete': return 'Processing complete!'
      default: return 'Ready to process'
    }
  }

  const getDocumentTypeLabel = () => {
    switch (documentType) {
      case 'takeoff': return 'Takeoff Documents'
      case 'purchase-order': return 'Purchase Orders'
      case 'change-order': return 'Change Orders'
      case 'subcontractor-agreement': return 'Subcontractor Agreements'
      default: return 'Documents'
    }
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Upload Section Header */}
      <div className="mb-4 md:mb-6 text-center">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Document Upload Simulation</h3>
        <p className="text-sm md:text-base text-gray-400">See how AI processes construction documents in real-time</p>
      </div>

      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onTouchStart={(e) => {
          // Add touch feedback for mobile
          if (isActive && !isProcessing) {
            e.currentTarget.style.transform = 'scale(0.98)'
          }
        }}
        onTouchEnd={(e) => {
          // Reset transform on touch end
          e.currentTarget.style.transform = ''
          if (isActive && !isProcessing) {
            handleClick()
          }
        }}
        className={`
          relative p-6 md:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer min-h-[300px] md:min-h-[400px]
          ${isDragOver && !isProcessing
            ? 'border-blue-400 bg-blue-50 scale-[1.02] shadow-xl'
            : isProcessing
              ? 'border-green-400 bg-green-50 shadow-lg'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 hover:shadow-md active:scale-[0.98]'
          }
          ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}
          touch-manipulation select-none
        `}
      >
        {uploadedFiles.length === 0 ? (
          // Empty state
          <div className="text-center py-4 md:py-8">
            <div className="mb-4 md:mb-8">
              <svg className="w-16 h-16 md:w-24 md:h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg md:text-2xl font-semibold text-gray-700 mb-3 md:mb-4 px-4">
              {isDragOver ? 'Drop files here' : `Upload ${getDocumentTypeLabel()}`}
            </h3>
            <p className="text-sm md:text-lg text-gray-500 mb-6 md:mb-8 max-w-md mx-auto px-4">
              {isDragOver
                ? 'Release to start AI processing'
                : 'Tap here to simulate upload or drag & drop files'
              }
            </p>

            {/* Mobile-optimized file type indicators */}
            <div className="grid grid-cols-2 md:flex md:justify-center gap-3 md:gap-8 text-xs md:text-sm text-gray-400 px-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-pastel-blue" />
                </div>
                <span className="text-center">PDF Documents</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-pastel-blue" />
                </div>
                <span className="text-center">Excel Sheets</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-pastel-blue" />
                </div>
                <span className="text-center">Word Files</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-pastel-blue/10 border border-pastel-blue/20 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-pastel-blue" />
                </div>
                <span className="text-center">Images</span>
              </div>
            </div>

            {/* Mobile-specific CTA button */}
            <div className="mt-6 md:hidden">
              <button className="px-6 py-3 bg-pastel-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Tap to Start Demo
              </button>
            </div>
          </div>
        ) : (
          // File processing state
          <div className="space-y-4 md:space-y-8">
            {uploadedFiles.map((file, index) => (
              <div
                key={`file-${file.name}-${index}`}
                className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 mb-3 md:mb-4 transition-all duration-200 hover:border-gray-400"
              >
                <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FileIcon iconType={file.icon} className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  {/* File Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                      <h4 className="text-base md:text-lg font-semibold text-gray-800 truncate mb-1 md:mb-0">
                        {file.name}
                      </h4>
                      <span className="text-xs md:text-sm text-gray-500 bg-gray-200 px-2 py-1 md:px-3 rounded-full self-start">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {file.processingStage !== 'complete' && (
                      <div className="mb-4 md:mb-6">
                        <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
                          <span className="font-medium">{getProcessingMessage(file.processingStage)}</span>
                          <span className="font-bold">{file.uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 shadow-inner">
                          <div
                            className={`h-2 md:h-3 rounded-full transition-all duration-300 shadow-sm ${
                              file.processingStage === 'uploading'
                                ? 'bg-blue-500'
                                : file.processingStage === 'scanning'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                            }`}
                            style={{ width: `${file.uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Processing Stages */}
                    <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                      {['uploading', 'scanning', 'extracting', 'complete'].map((stage, stageIndex) => {
                        const isCurrentStage = file.processingStage === stage
                        const isCompletedStage = stageIndex < ['uploading', 'scanning', 'extracting', 'complete'].indexOf(file.processingStage)

                        return (
                          <div key={stage} className="text-center">
                            <div
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full mx-auto mb-1 md:mb-2 flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${
                                isCurrentStage
                                  ? 'bg-blue-500 text-white animate-pulse shadow-lg'
                                  : isCompletedStage
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-400'
                              }`}
                            >
                              {isCompletedStage ? (
                                <svg className="w-3 h-3 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                stageIndex + 1
                              )}
                            </div>
                            <div className="text-xs text-gray-500 capitalize font-medium">
                              {stage === 'uploading' ? 'Upload' : stage}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Extracted Data Preview */}
                    {file.extractedData && file.processingStage === 'complete' && (
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 md:p-6 shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                          <h5 className="text-base md:text-lg font-bold text-green-800 mb-2 md:mb-0 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Data Extracted Successfully
                          </h5>
                          <span className="text-xs md:text-sm font-bold text-green-700 bg-green-100 px-2 py-1 md:px-3 rounded-full self-start">
                            {file.extractedData.confidence}% confidence
                          </span>
                        </div>
                        <div className="text-xs md:text-sm text-green-700 mb-3 md:mb-4 flex items-center">
                          <div className="w-6 h-6 rounded bg-green-100 border border-green-200 flex items-center justify-center mr-2">
                            <FileText className="w-4 h-4 text-green-700" />
                          </div>
                          <span className="font-medium">
                            {file.extractedData.pages} page{file.extractedData.pages !== 1 ? 's' : ''} processed
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {file.extractedData.keyFields.map((field) => (
                            <span
                              key={`field-${field.replace(/\s+/g, '-').toLowerCase()}`}
                              className="inline-block px-2 py-1 md:px-3 md:py-2 bg-green-100 text-green-800 text-xs md:text-sm font-medium rounded-md md:rounded-lg border border-green-200"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 pt-4 md:pt-6 border-t-2 border-gray-200">
              <button
                onClick={handleClick}
                disabled={isProcessing}
                className="px-4 py-3 md:px-6 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
              >
                {isProcessing ? 'Processing...' : 'Upload Another Document'}
              </button>
              <button
                onClick={resetUpload}
                className="px-4 py-3 md:px-6 border-2 border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
              >
                Clear All Files
              </button>
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <div className="text-center px-4">
              <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-4 border-blue-500 mx-auto mb-3 md:mb-4" />
              <div className="text-base md:text-lg font-semibold text-gray-700">
                AI Processing Document...
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-2">
                Please wait while we analyze your file
              </div>
            </div>
          </div>
        )}

        {/* Scanning Animation Effect */}
        {isProcessing && uploadedFiles[0]?.processingStage === 'scanning' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-3 md:inset-6 border-2 border-blue-500 rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-0.5 md:h-1 bg-blue-500 animate-scan opacity-75" />
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="mt-4 md:mt-6 text-center px-4">
        <p className="text-xs md:text-sm text-gray-400">
          Simulated upload supports {getDocumentTypeLabel().toLowerCase()}
          {isActive ? ' • Tap above or drag files to see AI in action' : ' • Start demo to enable upload simulation'}
        </p>
      </div>
    </div>
  )
}

export default FileUploadSimulation
