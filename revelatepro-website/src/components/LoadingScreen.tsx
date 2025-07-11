import type React from 'react'
import { useState, useEffect } from 'react'
import { Loader2, Zap, Clock, CheckCircle } from 'lucide-react'

export type LoadingType = 'spinner' | 'progress' | 'dots' | 'pulse' | 'demo' | 'data-processing'

interface LoadingScreenProps {
  isVisible: boolean
  type?: LoadingType
  progress?: number
  message?: string
  subMessage?: string
  duration?: number
  onComplete?: () => void
  className?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isVisible,
  type = 'spinner',
  progress = 0,
  message = 'Loading...',
  subMessage,
  duration = 3000,
  onComplete,
  className = ''
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(message)

  useEffect(() => {
    if (isVisible && type === 'progress') {
      const startTime = Date.now()
      const targetProgress = progress || 100

      const updateProgress = () => {
        const elapsed = Date.now() - startTime
        const progressValue = Math.min((elapsed / duration) * targetProgress, targetProgress)

        setAnimatedProgress(progressValue)

        if (progressValue < targetProgress) {
          requestAnimationFrame(updateProgress)
        } else if (onComplete) {
          setTimeout(onComplete, 500)
        }
      }

      updateProgress()
    }
  }, [isVisible, progress, duration, type, onComplete])

  if (!isVisible) return null

  const renderLoadingContent = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-pastel-blue animate-loading-spinner" />
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{currentMessage}</div>
              {subMessage && (
                <div className="text-sm text-gray-400 mt-1">{subMessage}</div>
              )}
            </div>
          </div>
        )

      case 'progress':
        return (
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-white mb-2">{currentMessage}</div>
              {subMessage && (
                <div className="text-sm text-gray-400">{subMessage}</div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="w-full h-3 bg-black-olive rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pastel-blue to-pastel-blue/80 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${animatedProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pastel-shimmer" />
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm font-medium text-pastel-blue">
                  {Math.round(animatedProgress)}%
                </span>
              </div>
            </div>
          </div>
        )

      case 'dots':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-pastel-blue rounded-full animate-loading-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{currentMessage}</div>
              {subMessage && (
                <div className="text-sm text-gray-400 mt-1">{subMessage}</div>
              )}
            </div>
          </div>
        )

      case 'pulse':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-pastel-blue/20 rounded-full animate-pastel-pulse" />
              <div className="absolute inset-0 w-16 h-16 bg-pastel-blue/10 rounded-full animate-pastel-breathe" />
              <div className="absolute inset-4 w-8 h-8 bg-pastel-blue rounded-full animate-pastel-glow" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">{currentMessage}</div>
              {subMessage && (
                <div className="text-sm text-gray-400 mt-1">{subMessage}</div>
              )}
            </div>
          </div>
        )

      case 'demo':
        return <DemoLoadingContent message={currentMessage} subMessage={subMessage} />

      case 'data-processing':
        return <DataProcessingLoader message={currentMessage} subMessage={subMessage} />

      default:
        return renderLoadingContent()
    }
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-air-black/95 backdrop-blur-sm animate-pastel-section-fade ${className}`}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 via-transparent to-pastel-blue/3 animate-pastel-background-drift" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pastel-blue/10 rounded-full blur-3xl animate-pastel-breathe" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pastel-blue/8 rounded-full blur-3xl animate-pastel-pulse" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 p-8">
        {renderLoadingContent()}
      </div>
    </div>
  )
}

// Demo-specific loading component
const DemoLoadingContent: React.FC<{ message: string; subMessage?: string }> = ({ message, subMessage }) => {
  const [step, setStep] = useState(0)
  const steps = [
    { icon: <Clock className="w-6 h-6" />, text: 'Initializing AI Agent' },
    { icon: <Zap className="w-6 h-6" />, text: 'Processing Data' },
    { icon: <CheckCircle className="w-6 h-6" />, text: 'Ready' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % steps.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-6 max-w-sm">
      <div className="text-center">
        <div className="text-xl font-bold text-white mb-2">{message}</div>
        {subMessage && (
          <div className="text-sm text-gray-400">{subMessage}</div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {steps.map((stepItem, index) => (
          <div
            key={`step-${stepItem.text.replace(/\s+/g, '-').toLowerCase()}`}
            className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
              index === step
                ? 'bg-pastel-blue/20 text-pastel-blue animate-pastel-glow'
                : index < step
                  ? 'bg-green-400/20 text-green-400'
                  : 'bg-black-olive/40 text-gray-400'
            }`}
          >
            <div className={`transition-all duration-300 ${index === step ? 'animate-loading-spinner' : ''}`}>
              {stepItem.icon}
            </div>
            <span className="text-sm font-medium">{stepItem.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Data processing loader
const DataProcessingLoader: React.FC<{ message: string; subMessage?: string }> = ({ message, subMessage }) => {
  const [dataPoints, setDataPoints] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => prev + Math.floor(Math.random() * 50) + 10)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-6 max-w-lg">
      <div className="text-center">
        <div className="text-xl font-bold text-white mb-2">{message}</div>
        {subMessage && (
          <div className="text-sm text-gray-400">{subMessage}</div>
        )}
      </div>

      {/* Animated data visualization */}
      <div className="w-full space-y-4">
        <div className="grid grid-cols-8 gap-1 h-16">
          {Array.from({ length: 24 }, (_, i) => ({ id: `bar-${i}`, height: Math.random() * 100, delay: i * 0.1 })).map((bar) => (
            <div
              key={bar.id}
              className="bg-pastel-blue/30 rounded-sm animate-loading-pulse"
              style={{
                height: `${bar.height}%`,
                animationDelay: `${bar.delay}s`
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="text-lg font-mono text-pastel-blue">
            {dataPoints.toLocaleString()} data points processed
          </div>
          <div className="text-sm text-gray-400">
            Processing in real-time...
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for managing loading states
export const useLoadingState = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [loadingType, setLoadingType] = useState<LoadingType>('spinner')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Loading...')

  const showLoading = (
    type: LoadingType = 'spinner',
    msg = 'Loading...',
    duration?: number
  ) => {
    setLoadingType(type)
    setMessage(msg)
    setProgress(0)
    setIsLoading(true)

    if (duration) {
      setTimeout(() => {
        setIsLoading(false)
      }, duration)
    }
  }

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress)
    if (newProgress >= 100) {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  return {
    isLoading,
    loadingType,
    progress,
    message,
    showLoading,
    updateProgress,
    hideLoading
  }
}
