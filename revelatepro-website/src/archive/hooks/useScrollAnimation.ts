import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
              if (triggerOnce) {
                setHasTriggered(true)
              }
            }, delay)
          } else {
            setIsVisible(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered])

  return { elementRef, isVisible }
}

// Animation variants for different types of animations
export const slideUpVariants = {
  hidden: {
    opacity: 0,
    transform: 'translateY(50px)'
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)'
  }
}

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    transform: 'translateX(-50px)'
  },
  visible: {
    opacity: 1,
    transform: 'translateX(0px)'
  }
}

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    transform: 'translateX(50px)'
  },
  visible: {
    opacity: 1,
    transform: 'translateX(0px)'
  }
}

export const fadeInVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.8)'
  },
  visible: {
    opacity: 1,
    transform: 'scale(1)'
  }
}

export const staggerChildrenVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
