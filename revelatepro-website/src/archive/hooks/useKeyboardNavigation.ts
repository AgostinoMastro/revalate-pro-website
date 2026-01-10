import { useEffect, useCallback, useRef } from 'react'

export interface KeyboardNavigationOptions {
  enableArrowKeys?: boolean
  enableTabTrapping?: boolean
  enableEscapeKey?: boolean
  onEscape?: () => void
  focusableSelectors?: string[]
}

export const useKeyboardNavigation = (options: KeyboardNavigationOptions = {}) => {
  const {
    enableArrowKeys = true,
    enableTabTrapping = false,
    enableEscapeKey = true,
    onEscape,
    focusableSelectors = [
      'button',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[role="button"]',
      '[role="link"]'
    ]
  } = options

  const containerRef = useRef<HTMLElement>(null)

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return []

    const selector = focusableSelectors.join(', ')
    const elements = containerRef.current.querySelectorAll(selector) as NodeListOf<HTMLElement>

    return Array.from(elements).filter(el => {
      const style = window.getComputedStyle(el)
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !el.hasAttribute('disabled') &&
        el.tabIndex !== -1
      )
    })
  }, [focusableSelectors])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key, target, shiftKey } = event
    const focusableElements = getFocusableElements()

    if (focusableElements.length === 0) return

    const currentIndex = focusableElements.findIndex(el => el === target)

    // Handle Escape key
    if (enableEscapeKey && key === 'Escape') {
      event.preventDefault()
      onEscape?.()
      return
    }

    // Handle Arrow Keys for navigation
    if (enableArrowKeys && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault()

      let nextIndex: number

      switch (key) {
        case 'ArrowDown':
        case 'ArrowRight':
          nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1
          break
        default:
          return
      }

      focusableElements[nextIndex]?.focus()
    }

    // Handle Tab trapping for modals
    if (enableTabTrapping && key === 'Tab') {
      if (focusableElements.length === 1) {
        event.preventDefault()
        return
      }

      if (shiftKey) {
        // Shift + Tab
        if (currentIndex <= 0) {
          event.preventDefault()
          focusableElements[focusableElements.length - 1]?.focus()
        }
      } else {
        // Tab
        if (currentIndex >= focusableElements.length - 1) {
          event.preventDefault()
          focusableElements[0]?.focus()
        }
      }
    }
  }, [enableArrowKeys, enableTabTrapping, enableEscapeKey, onEscape, getFocusableElements])

  const focusFirst = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }, [getFocusableElements])

  const focusLast = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus()
    }
  }, [getFocusableElements])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    containerRef,
    focusFirst,
    focusLast,
    getFocusableElements
  }
}

// Hook for managing focus announcements for screen readers
export const useFocusAnnouncement = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  return { announce }
}

// Hook for keyboard shortcuts
export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, altKey, shiftKey } = event

      // Build shortcut string
      const modifiers = []
      if (ctrlKey || metaKey) modifiers.push('cmd')
      if (altKey) modifiers.push('alt')
      if (shiftKey) modifiers.push('shift')

      const shortcutKey = [...modifiers, key.toLowerCase()].join('+')

      if (shortcuts[shortcutKey]) {
        event.preventDefault()
        shortcuts[shortcutKey]()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [shortcuts])
}

// Hook for managing loading states with screen reader announcements
export const useLoadingAnnouncement = () => {
  const announceLoading = useCallback((isLoading: boolean, message?: string) => {
    const defaultMessage = isLoading ? 'Loading content, please wait.' : 'Content loaded.'
    const announcement = message || defaultMessage

    // Create or update loading announcement element
    let announcer = document.getElementById('loading-announcer')

    if (!announcer) {
      announcer = document.createElement('div')
      announcer.id = 'loading-announcer'
      announcer.setAttribute('aria-live', 'polite')
      announcer.setAttribute('aria-atomic', 'true')
      announcer.className = 'sr-only'
      document.body.appendChild(announcer)
    }

    announcer.textContent = announcement
  }, [])

  return { announceLoading }
}

export default useKeyboardNavigation
