import { useState, useEffect } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => {
      setMatches(media.matches)
    }

    // Use addEventListener if available, fallback to addListener for older browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      media.addListener(listener)
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        media.removeListener(listener)
      }
    }
  }, [matches, query])

  return matches
}

export const useIsMobile = () => {
  return useMediaQuery('(max-width: 768px)')
}

export const useIsTablet = () => {
  return useMediaQuery('(max-width: 1024px) and (min-width: 769px)')
}

export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1025px)')
}

export const usePrefersReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    checkTouch()
    window.addEventListener('resize', checkTouch)

    return () => {
      window.removeEventListener('resize', checkTouch)
    }
  }, [])

  return isTouch
}

// Hook to handle mobile orientation changes and prevent layout issues
export const useOrientationFix = () => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleOrientationChange = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // Force layout recalculation after orientation change
      timeoutId = setTimeout(() => {
        // Trigger a reflow to fix layout issues
        const body = document.body
        const html = document.documentElement

        // Force width recalculation
        if (window.innerWidth <= 768) {
          body.style.width = '100vw'
          html.style.width = '100vw'

          // Force a reflow
          body.offsetHeight

          // Reset to auto after reflow
          setTimeout(() => {
            body.style.width = ''
            html.style.width = ''
          }, 100)
        }
      }, 200) // Delay to ensure orientation change is complete
    }

    // Listen for orientation change
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])
}
