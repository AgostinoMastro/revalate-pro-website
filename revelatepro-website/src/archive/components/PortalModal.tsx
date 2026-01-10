import type React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface PortalModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  children,
  className = ''
}) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  // Create portal container
  useEffect(() => {
    if (isOpen) {
      // Create a dedicated modal container at the body level
      const container = document.createElement('div')
      container.id = 'portal-modal-container'
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2147483647;
        pointer-events: none;
      `

      // Append to body to ensure it's at the top level
      document.body.appendChild(container)
      setModalRoot(container)

      // Store original overflow but don't change it
      const originalOverflow = document.body.style.overflow

      return () => {
        // Always ensure scroll is enabled when modal closes
        document.body.style.overflow = ''
        document.body.style.removeProperty('overflow')
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        setModalRoot(null)
      }
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }, [onClose])

  if (!isOpen || !modalRoot) {
    return null
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 2147483647,
        pointerEvents: 'auto',
        overflow: 'auto',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
      onClick={handleBackdropClick}
      className={className}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 'min(90vw, 500px)',
          maxHeight: '90vh',
          width: '100%',
          overflow: 'visible',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  )
}
