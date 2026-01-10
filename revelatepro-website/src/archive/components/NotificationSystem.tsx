import type React from 'react'
import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { Rocket, Target, Star, CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'info' | 'warning' | 'error' | 'demo' | 'progress'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  icon?: string | React.ReactElement
  progress?: number
  autoClose?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (notification: Omit<Notification, 'id'>) => string
  removeNotification: (id: string) => void
  clearAll: () => void
  showDemoProgress: (title: string, message: string, progress: number) => string
  showDemoSuccess: (title: string, message: string, action?: Notification['action']) => string
  showDemoAlert: (title: string, message: string, type?: 'info' | 'warning') => string
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Toast Notification Component
const ToastNotification: React.FC<{
  notification: Notification
  onRemove: (id: string) => void
}> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (notification.autoClose !== false && notification.duration !== 0) {
      const timer = setTimeout(() => {
        handleRemove()
      }, notification.duration || 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.duration, notification.autoClose])

  const handleRemove = useCallback(() => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(notification.id)
    }, 300)
  }, [notification.id, onRemove])

  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-500/50 bg-green-500/10 text-green-300'
      case 'error':
        return 'border-red-500/50 bg-red-500/10 text-red-300'
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300'
      case 'demo':
        return 'border-blue-500/50 bg-blue-500/10 text-blue-300'
      case 'progress':
        return 'border-purple-500/50 bg-purple-500/10 text-purple-300'
      default:
        return 'border-gray-500/50 bg-gray-500/10 text-gray-300'
    }
  }

  const getIcon = () => {
    if (notification.icon) return notification.icon

    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      case 'demo':
        return <Rocket className="w-5 h-5" />
      case 'progress':
        return <Target className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  return (
    <div
      className={`
        relative max-w-sm w-full bg-gray-800/95 backdrop-blur-sm border rounded-xl p-4 shadow-lg transform transition-all duration-300 ease-out
        ${isVisible && !isRemoving ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${getTypeStyles()}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Progress Bar for Progress Type */}
      {notification.type === 'progress' && notification.progress !== undefined && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 rounded-t-xl overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${notification.progress}%` }}
          />
        </div>
      )}

      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="p-2 bg-gray-700/50 rounded-lg text-current">
            {getIcon()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {notification.message}
              </p>

              {/* Progress Text for Progress Type */}
              {notification.type === 'progress' && notification.progress !== undefined && (
                <div className="mt-2 text-xs text-purple-400 font-medium">
                  {Math.round(notification.progress)}% complete
                </div>
              )}

              {/* Action Button */}
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className={`
                    mt-3 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95
                    ${notification.type === 'success' ? 'bg-green-500 hover:bg-green-600' :
                      notification.type === 'demo' ? 'bg-blue-500 hover:bg-blue-600' :
                      notification.type === 'progress' ? 'bg-purple-500 hover:bg-purple-600' :
                      'bg-gray-600 hover:bg-gray-700'
                    } text-white
                  `}
                >
                  {notification.action.label}
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={handleRemove}
              className="ml-2 text-white hover:text-gray-300 transition-colors duration-200 flex-shrink-0 p-1 rounded-full bg-white/20 hover:bg-white/30"
              aria-label="Close notification"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Border Effect for Demo Notifications */}
      {notification.type === 'demo' && (
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500/20 animate-pulse pointer-events-none" />
      )}
    </div>
  )
}

// Floating Alert Component
const FloatingAlert: React.FC<{
  notification: Notification
  onRemove: (id: string) => void
}> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (notification.autoClose !== false) {
      const timer = setTimeout(() => {
        onRemove(notification.id)
      }, notification.duration || 4000)
      return () => clearTimeout(timer)
    }
  }, [notification.duration, notification.autoClose, notification.id, onRemove])

  return (
    <div
      className={`
        fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}
      `}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl shadow-2xl border border-white/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">{notification.title}</h3>
            <p className="text-blue-100 text-sm">{notification.message}</p>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            className="text-white hover:text-gray-300 transition-colors p-1 rounded-full bg-white/20 hover:bg-white/30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Notification Provider Component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [alerts, setAlerts] = useState<Notification[]>([])

  const showNotification = useCallback((notificationData: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const notification = { ...notificationData, id }

    if (notificationData.type === 'info' && notificationData.title.toLowerCase().includes('alert')) {
      setAlerts(prev => [...prev, notification])
    } else {
      setNotifications(prev => [...prev, notification])
    }

    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    setAlerts(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    setAlerts([])
  }, [])

  const showDemoProgress = useCallback((title: string, message: string, progress: number) => {
    return showNotification({
      type: 'progress',
      title,
      message,
      progress,
      duration: 0,
      autoClose: false
    })
  }, [showNotification])

  const showDemoSuccess = useCallback((title: string, message: string, action?: Notification['action']) => {
    return showNotification({
      type: 'demo',
      title,
      message,
      action,
      duration: action ? 8000 : 5000,
      icon: <Star className="w-5 h-5" />
    })
  }, [showNotification])

  const showDemoAlert = useCallback((title: string, message: string, type: 'info' | 'warning' = 'info') => {
    return showNotification({
      type,
      title: `Alert: ${title}`,
      message,
      duration: 6000
    })
  }, [showNotification])

  const contextValue: NotificationContextType = {
    notifications,
    showNotification,
    removeNotification,
    clearAll,
    showDemoProgress,
    showDemoSuccess,
    showDemoAlert
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}

      {/* Toast Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
        {notifications.map(notification => (
          <div key={notification.id} className="pointer-events-auto">
            <ToastNotification
              notification={notification}
              onRemove={removeNotification}
            />
          </div>
        ))}
      </div>

      {/* Floating Alerts Container */}
      {alerts.map(alert => (
        <FloatingAlert
          key={alert.id}
          notification={alert}
          onRemove={removeNotification}
        />
      ))}
    </NotificationContext.Provider>
  )
}

// Demo-specific notification hooks
export const useDemoNotifications = () => {
  const { showDemoProgress, showDemoSuccess, showDemoAlert, removeNotification } = useNotifications()

  const notifyDemoStart = useCallback((demoType: string) => {
    return showDemoAlert(
      'Demo Started',
      `Watch AI process your ${demoType} in real-time`,
      'info'
    )
  }, [showDemoAlert])

  const notifyDemoStep = useCallback((stepName: string, progress: number) => {
    return showDemoProgress(
      'AI Processing',
      `Currently: ${stepName}`,
      progress
    )
  }, [showDemoProgress])

  const notifyDemoComplete = useCallback((demoType: string, resultSummary: string) => {
    return showDemoSuccess(
      'Demo Complete!',
      `${demoType} processed successfully. ${resultSummary}`,
      {
        label: 'Book Free Demo',
        onClick: () => {
          // This would open a demo booking modal
          console.log('Opening demo booking...')
        }
      }
    )
  }, [showDemoSuccess])

  const notifyDemoInsight = useCallback((title: string, insight: string) => {
    return showDemoAlert(title, insight, 'info')
  }, [showDemoAlert])

  return {
    notifyDemoStart,
    notifyDemoStep,
    notifyDemoComplete,
    notifyDemoInsight,
    removeNotification
  }
}

export default NotificationProvider
