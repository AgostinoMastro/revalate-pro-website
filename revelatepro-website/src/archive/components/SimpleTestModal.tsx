import type React from 'react'
import { useEffect } from 'react'

interface SimpleTestModalProps {
  isOpen: boolean
  onClose: () => void
  demoId: string
}

export const SimpleTestModal: React.FC<SimpleTestModalProps> = ({ isOpen, onClose, demoId }) => {
  console.log('SimpleTestModal render:', { isOpen, demoId })

  useEffect(() => {
    if (isOpen) {
      console.log('SimpleTestModal mounted and open')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) {
    console.log('SimpleTestModal not rendering - isOpen is false')
    return null
  }

  console.log('SimpleTestModal rendering modal content')

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(255, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          console.log('Backdrop clicked, closing modal')
          onClose()
        }
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFF00',
          color: '#000000',
          border: '8px solid #00FF00',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '350px',
          width: '85%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 0 50px rgba(255,255,0,0.8)',
          zIndex: 100001,
          display: 'block'
        }}
      >
        <button
          onClick={() => {
            console.log('Close button clicked')
            onClose()
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            fontSize: '24px',
            fontWeight: 'bold',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          ×
        </button>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'black' }}>
          🎉 MODAL WORKS! 🎉
        </h2>

        <p style={{ marginBottom: '16px', color: 'black', fontSize: '16px' }}>
          Demo ID: <strong>{demoId}</strong>
        </p>

        <p style={{ marginBottom: '24px', color: 'black', fontSize: '14px' }}>
          If you see this bright modal, everything is working!
        </p>

        <button
          onClick={onClose}
          style={{
            padding: '12px 24px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Close Modal
        </button>
      </div>
    </div>
  )
}
