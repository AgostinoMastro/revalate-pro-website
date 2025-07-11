import type React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ExpandableSectionProps {
  title: string
  summary: React.ReactNode
  details: React.ReactNode
  defaultExpanded?: boolean
  className?: string
  summaryClassName?: string
  detailsClassName?: string
  mobileOnly?: boolean
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  summary,
  details,
  defaultExpanded = false,
  className = '',
  summaryClassName = '',
  detailsClassName = '',
  mobileOnly = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // If mobileOnly is true, always show expanded on desktop (sm and up)
  const shouldShowExpandable = mobileOnly ? 'sm:block' : ''
  const shouldHideToggle = mobileOnly ? 'sm:hidden' : ''

  return (
    <div className={`${className}`}>
      {/* Always visible summary */}
      <div className={summaryClassName}>
        {summary}
      </div>

      {/* Mobile expandable toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full mt-3 mb-2 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-pastel-blue border border-pastel-blue/30 rounded-lg hover:bg-pastel-blue/10 transition-all duration-200 ${shouldHideToggle}`}
        aria-expanded={isExpanded}
        aria-controls={`expandable-details-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span>{isExpanded ? 'Show Less' : 'Show More Details'}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Expandable details */}
      <div
        id={`expandable-details-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } ${shouldShowExpandable} ${detailsClassName}`}
        style={{
          maxHeight: isExpanded ? '1000px' : '0px' // Fallback for browsers that don't support max-h-screen
        }}
      >
        <div className="pt-2">
          {details}
        </div>
      </div>

      {/* Always visible on desktop when mobileOnly is true */}
      {mobileOnly && (
        <div className="hidden sm:block">
          {details}
        </div>
      )}
    </div>
  )
}

export default ExpandableSection
