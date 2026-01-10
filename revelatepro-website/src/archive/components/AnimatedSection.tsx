import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn'
  delay?: number
  duration?: number
  threshold?: number
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.1
}) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  const { elementRef, isVisible } = useScrollAnimation({
    threshold: isMobile ? 0.02 : threshold, // Much lower threshold for mobile
    delay: prefersReducedMotion ? 0 : (isMobile ? Math.max(delay / 3, 50) : delay), // Much faster on mobile with minimum
    triggerOnce: true
  })

  const getAnimationStyles = () => {
    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'none'
      }
    }

    const adjustedDuration = isMobile ? duration * 0.7 : duration // Faster on mobile

    // Organic easing variations based on animation type
    const getEasing = () => {
      switch (animation) {
        case 'slideUp':
          return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Gentle ease
        case 'slideLeft':
        case 'slideRight':
          return 'cubic-bezier(0.34, 1.16, 0.64, 1)' // Subtle bounce
        case 'fadeIn':
          return 'cubic-bezier(0.4, 0.0, 0.2, 1)' // Smooth
        case 'scaleIn':
          return 'cubic-bezier(0.23, 1, 0.32, 1)' // Natural
        default:
          return 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }

    const baseStyles = {
      transition: `all ${adjustedDuration}s ${getEasing()} ${delay}ms`
    }

    // Reduce animation distance on mobile for better performance
    const slideDistance = isMobile ? 15 : 50

    switch (animation) {
      case 'slideUp':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0px)' : `translateY(${slideDistance}px)`
        }
      case 'slideLeft':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0px)' : `translateX(-${slideDistance}px)`
        }
      case 'slideRight':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0px)' : `translateX(${slideDistance}px)`
        }
      case 'fadeIn':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0
        }
      case 'scaleIn':
        return {
          ...baseStyles,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)'
        }
      default:
        return baseStyles
    }
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  )
}

// Staggered children animation component
interface StaggeredAnimationProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  childAnimation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn'
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = '',
  staggerDelay = 100,
  childAnimation = 'slideUp'
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  })

  const childrenArray = React.Children.toArray(children)

  return (
    <div ref={elementRef} className={className}>
      {childrenArray.map((child, index) => {
        // Generate a more stable key from the child content if possible
        const childKey = React.isValidElement(child) && child.key
          ? child.key
          : `stagger-${Math.random().toString(36).substr(2, 9)}-${index}`

        return (
          <AnimatedSection
            key={childKey}
            animation={childAnimation}
            delay={isVisible ? index * staggerDelay : 0}
            duration={0.6}
          >
            {child}
          </AnimatedSection>
        )
      })}
    </div>
  )
}
