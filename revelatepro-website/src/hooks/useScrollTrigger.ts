import { useEffect, useRef, useState } from 'react'

export interface ScrollTriggerOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  stagger?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'pastelGlow' | 'pastelSlide'
}

export const useScrollTrigger = (options: ScrollTriggerOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
    animation = 'fadeIn'
  } = options

  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggered || !triggerOnce) {
            setTimeout(() => {
              setIsVisible(true)
              setHasTriggered(true)
            }, delay)
          }
        } else if (!triggerOnce) {
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

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'

    switch (animation) {
      case 'slideUp':
        return 'animate-pastel-slide-in opacity-100'
      case 'slideLeft':
        return 'animate-pastel-slide-left opacity-100'
      case 'slideRight':
        return 'animate-pastel-slide-right opacity-100'
      case 'scaleIn':
        return 'animate-pastel-scale-in opacity-100'
      case 'pastelGlow':
        return 'animate-pastel-glow opacity-100'
      case 'pastelSlide':
        return 'animate-pastel-section-fade opacity-100'
      default:
        return 'animate-fadeIn opacity-100'
    }
  }

  return {
    elementRef,
    isVisible,
    animationClass: getAnimationClass(),
    hasTriggered
  }
}

export const useStaggeredScrollTrigger = (
  itemCount: number,
  options: ScrollTriggerOptions & { stagger?: number } = {}
) => {
  const { stagger = 100, ...restOptions } = options
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animations
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev]
                newState[i] = true
                return newState
              })
            }, i * stagger + (restOptions.delay || 0))
          }
        }
      },
      {
        threshold: restOptions.threshold || 0.1,
        rootMargin: restOptions.rootMargin || '0px 0px -50px 0px'
      }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [itemCount, stagger, restOptions.threshold, restOptions.rootMargin, restOptions.delay])

  return {
    containerRef,
    visibleItems,
    getItemClass: (index: number) => {
      return visibleItems[index] ? 'animate-pastel-slide-in opacity-100' : 'opacity-0 translate-y-4'
    }
  }
}

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}
