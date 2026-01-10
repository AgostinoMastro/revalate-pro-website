import type React from 'react'
import { useScrollProgress } from '../hooks/useScrollTrigger'

interface ScrollProgressIndicatorProps {
  position?: 'top' | 'bottom' | 'left' | 'right'
  thickness?: number
  showPercentage?: boolean
  className?: string
}

export const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  position = 'top',
  thickness = 3,
  showPercentage = false,
  className = ''
}) => {
  const scrollProgress = useScrollProgress()

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'bottom-0 left-0 w-full'
      case 'left':
        return 'top-0 left-0 h-full'
      case 'right':
        return 'top-0 right-0 h-full'
      default:
        return 'top-0 left-0 w-full'
    }
  }

  const getProgressStyle = () => {
    if (position === 'left' || position === 'right') {
      return {
        height: `${scrollProgress}%`,
        width: `${thickness}px`
      }
    }
    return {
      width: `${scrollProgress}%`,
      height: `${thickness}px`
    }
  }

  return (
    <>
      {/* Progress bar */}
      <div
        className={`fixed z-50 ${getPositionClasses()} ${className}`}
        style={{ zIndex: 9999 }}
      >
        <div
          className="bg-gradient-to-r from-pastel-blue via-pastel-blue/80 to-pastel-blue transition-all duration-150 ease-out relative"
          style={getProgressStyle()}
        >
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-pastel-blue/40 animate-pastel-glow" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pastel-shimmer" />
        </div>
      </div>

      {/* Percentage indicator */}
      {showPercentage && (
        <div
          className={`fixed z-50 bg-pastel-blue/90 text-air-black text-xs font-bold px-2 py-1 rounded transition-all duration-150 backdrop-blur-sm ${
            position === 'top' ? 'top-4 right-4' :
            position === 'bottom' ? 'bottom-4 right-4' :
            position === 'left' ? 'top-4 left-12' :
            'top-4 right-12'
          }`}
        >
          {Math.round(scrollProgress)}%
        </div>
      )}
    </>
  )
}

export default ScrollProgressIndicator
