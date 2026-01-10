import { useCallback, useEffect, useState } from 'react'

// Extend the Window interface to include grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
    }
  }
}

const RECAPTCHA_SITE_KEY = '6LeaKz4rAAAAACkkEsjhWhtdfqVYBxz0AQe825B5'

interface UseRecaptchaReturn {
  executeRecaptcha: (action: string) => Promise<string>
  isRecaptchaReady: boolean
  recaptchaError: string | null
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha && window.grecaptcha.enterprise) {
      window.grecaptcha.enterprise.ready(() => {
        setIsRecaptchaReady(true)
        setRecaptchaError(null)
      })
      return
    }

    // Wait for reCAPTCHA to load
    const checkRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        window.grecaptcha.enterprise.ready(() => {
          setIsRecaptchaReady(true)
          setRecaptchaError(null)
        })
      } else {
        // Retry after 100ms if not loaded yet
        setTimeout(checkRecaptcha, 100)
      }
    }

    const timeoutId = setTimeout(() => {
      if (!isRecaptchaReady) {
        setRecaptchaError('reCAPTCHA failed to load. Please refresh the page and try again.')
      }
    }, 10000) // 10 second timeout

    checkRecaptcha()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isRecaptchaReady])

  const executeRecaptcha = useCallback(async (action: string): Promise<string> => {
    try {
      setRecaptchaError(null)

      if (!window.grecaptcha || !window.grecaptcha.enterprise) {
        throw new Error('reCAPTCHA not loaded')
      }

      if (!isRecaptchaReady) {
        throw new Error('reCAPTCHA not ready')
      }

      console.log(`🔒 Executing reCAPTCHA for action: ${action}`)

      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
        action: action
      })

      if (!token) {
        throw new Error('reCAPTCHA token generation failed')
      }

      console.log('✅ reCAPTCHA token generated successfully')
      return token
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'reCAPTCHA execution failed'
      console.error('❌ reCAPTCHA error:', errorMessage)
      setRecaptchaError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [isRecaptchaReady])

  return {
    executeRecaptcha,
    isRecaptchaReady,
    recaptchaError
  }
}
