import { useState, useCallback, useEffect } from 'react'

interface UseContactModalReturn {
  isOpen: boolean
  openModal: (tab?: 'demo' | 'contact') => void
  closeModal: () => void
  defaultTab: 'demo' | 'contact'
}

export const useContactModal = (): UseContactModalReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultTab, setDefaultTab] = useState<'demo' | 'contact'>('demo')

  const openModal = useCallback((tab: 'demo' | 'contact' = 'demo') => {
    setDefaultTab(tab)
    setIsOpen(true)

    // Immediate viewport positioning for mobile
    setTimeout(() => {
      // Force scroll to top to ensure modal visibility
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })

      // Additional mobile-specific positioning
      if (window.innerWidth <= 640) {
        // Ensure we're at the absolute top of the viewport
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // Prevent any inadvertent scrolling during modal open
        document.body.style.position = 'fixed'
        document.body.style.top = '0'
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.overflow = 'hidden'
      }
    }, 10) // Very quick timeout to ensure DOM is ready
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)

    // Restore normal scrolling behavior
    if (window.innerWidth <= 640) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
    }
    document.body.style.overflow = ''
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Restore body styles if component unmounts while modal is open
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
    defaultTab
  }
}
