import type React from 'react'
import { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'focus' | 'click'
  delay?: number
  className?: string
  contentClassName?: string
  disabled?: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  delay = 300,
  className = '',
  contentClassName = '',
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`)

  const showTooltip = () => {
    if (disabled) return

    if (hideTimeout) {
      clearTimeout(hideTimeout)
      setHideTimeout(null)
    }

    if (delay > 0) {
      const timeout = setTimeout(() => {
        setIsVisible(true)
      }, delay)
      setShowTimeout(timeout)
    } else {
      setIsVisible(true)
    }
  }

  const hideTooltip = () => {
    if (showTimeout) {
      clearTimeout(showTimeout)
      setShowTimeout(null)
    }

    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 100)
    setHideTimeout(timeout)
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'focus') {
      showTooltip()
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover' || trigger === 'focus') {
      hideTooltip()
    }
  }

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip()
    }
  }

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip()
    }
  }

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isVisible) {
      setIsVisible(false)
    }
  }

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (trigger === 'click' &&
          triggerRef.current &&
          tooltipRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, trigger])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout)
      if (hideTimeout) clearTimeout(hideTimeout)
    }
  }, [showTimeout, hideTimeout])

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800 border-b-4 border-x-transparent border-x-4 border-t-0'
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800 border-l-4 border-y-transparent border-y-4 border-r-0'
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800 border-r-4 border-y-transparent border-y-4 border-l-0'
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800 border-t-4 border-x-transparent border-x-4 border-b-0'
    }
  }

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className="tooltip-trigger"
        aria-describedby={isVisible ? tooltipId.current : undefined}
        aria-expanded={trigger === 'click' ? isVisible : undefined}
        role={trigger === 'click' ? 'button' : undefined}
        tabIndex={trigger === 'click' ? 0 : undefined}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          id={tooltipId.current}
          role="tooltip"
          className={`
            absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-700 rounded-lg shadow-lg
            transition-all duration-200 pointer-events-none
            ${getPositionClasses()}
            ${contentClassName}
          `}
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
          }}
        >
          {content}

          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 ${getArrowClasses()}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}

// Hook for managing multiple tooltips
export const useTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const showTooltip = (id: string) => {
    setActiveTooltip(id)
  }

  const hideTooltip = () => {
    setActiveTooltip(null)
  }

  const isTooltipActive = (id: string) => {
    return activeTooltip === id
  }

  return {
    showTooltip,
    hideTooltip,
    isTooltipActive,
    activeTooltip
  }
}

export default Tooltip
