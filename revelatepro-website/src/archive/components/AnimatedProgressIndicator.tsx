import type React from 'react'


interface AnimatedProgressIndicatorProps {
  onAIAgentsClick?: () => void
  onRevalateProClick?: () => void
  className?: string
  showConnectingLines?: boolean
}

export const AnimatedProgressIndicator: React.FC<AnimatedProgressIndicatorProps> = ({
  onAIAgentsClick,
  onRevalateProClick,
  className = "",
  showConnectingLines = true
}) => {


  return (
    <div className={`relative py-8 md:py-12 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pastel-blue/5 to-transparent" />

      {/* Static progress indicators for homepage sections */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl md:max-w-4xl mx-auto">
            <div className="text-center">
              <button
                onClick={() => {
                  // Scroll to services section or trigger services navigation
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}

                className="group cursor-pointer"
              >
                <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3" />
                <div className="text-xs text-pastel-blue/80 font-medium">Services</div>
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  // Navigate to AI Agents section
                  onAIAgentsClick?.() || document.getElementById('current-agents')?.scrollIntoView({ behavior: 'smooth' })
                }}

                className="group cursor-pointer"
              >
                <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3" />
                <div className="text-xs text-pastel-blue/80 font-medium">AI Agents</div>
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  // Navigate to Custom Software (Revalate Pro Series)
                  onRevalateProClick?.() || document.getElementById('revalate-pro-series')?.scrollIntoView({ behavior: 'smooth' })
                }}

                className="group cursor-pointer"
              >
                <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3" />
                <div className="text-xs text-pastel-blue/80 font-medium">Custom Software</div>
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  // Scroll to FAQ section
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
                }}

                className="group cursor-pointer"
              >
                <div className="w-3 h-3 bg-pastel-blue rounded-full mx-auto mb-3" />
                <div className="text-xs text-pastel-blue/80 font-medium">FAQs</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static connecting lines for 4 sections */}
      {showConnectingLines && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="hidden md:flex items-center justify-center space-x-6 max-w-4xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/60 to-transparent w-20" />
            <div className="w-2 h-2 bg-pastel-blue rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/60 to-transparent w-20" />
            <div className="w-2 h-2 bg-pastel-blue rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/60 to-transparent w-20" />
            <div className="w-2 h-2 bg-pastel-blue rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/60 to-transparent w-20" />
          </div>
        </div>
      )}
    </div>
  )
}
