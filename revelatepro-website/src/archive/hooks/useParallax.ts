import { useEffect, useRef, useState } from 'react'
import { useIsMobile, usePrefersReducedMotion } from './useMediaQuery'

interface UseParallaxOptions {
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const {
    speed = 0.5,
    direction = 'up',
    offset = 0
  } = options

  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  // Disable parallax on mobile or if user prefers reduced motion
  const shouldDisableParallax = isMobile || prefersReducedMotion

  useEffect(() => {
    if (shouldDisableParallax) {
      setTransform('')
      return
    }

    const handleScroll = () => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const adjustedSpeed = isMobile ? speed * 0.3 : speed // Reduce parallax intensity on mobile
      const rate = scrolled * -adjustedSpeed

      // Only apply parallax when element is in viewport
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (isInViewport) {
        let transformValue = ''

        switch (direction) {
          case 'up':
            transformValue = `translateY(${rate + offset}px)`
            break
          case 'down':
            transformValue = `translateY(${-rate + offset}px)`
            break
          case 'left':
            transformValue = `translateX(${rate + offset}px)`
            break
          case 'right':
            transformValue = `translateX(${-rate + offset}px)`
            break
        }

        setTransform(transformValue)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [speed, direction, offset, shouldDisableParallax, isMobile])

  return { elementRef, transform }
}

// Mouse parallax for interactive elements
export const useMouseParallax = (intensity = 0.1) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()

      // Check if mouse is over the element
      const isOverElement =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (isOverElement) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * intensity
        const deltaY = (e.clientY - centerY) * intensity

        setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0)`)
      } else {
        setTransform('translate3d(0, 0, 0)')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [intensity])

  return { elementRef, transform }
}
