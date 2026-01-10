import type React from 'react'
import revalateLogo from '/images/revalate-logo.png'

interface RevalateLogoProps {
  className?: string
  height?: number
}

export const RevalateLogo: React.FC<RevalateLogoProps> = ({
  className = "",
  height = 40
}) => {
  return (
    <div className={`flex items-center ${className}`} style={{ height: `${height}px` }}>
      <img
        src={revalateLogo}
        alt="Revalate AI Studio Logo"
        style={{ height: `${height}px`, width: 'auto' }}
        className="object-contain"
      />
    </div>
  )
}
