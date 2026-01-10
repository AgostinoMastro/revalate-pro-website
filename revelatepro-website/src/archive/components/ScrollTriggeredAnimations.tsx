import React from 'react'
import { useScrollTrigger, useStaggeredScrollTrigger } from '../hooks/useScrollTrigger'

interface ScrollAnimatedElementProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'pastelGlow' | 'pastelSlide'
  delay?: number
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

export const ScrollAnimatedElement: React.FC<ScrollAnimatedElementProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = ''
}) => {
  const { elementRef, animationClass } = useScrollTrigger({
    animation,
    delay,
    threshold,
    triggerOnce
  })

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ${animationClass} ${className}`}
    >
      {children}
    </div>
  )
}

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  stagger?: number
  delay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'pastelGlow'
  threshold?: number
  className?: string
  itemClassName?: string
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  stagger = 100,
  delay = 0,
  animation = 'slideUp',
  threshold = 0.1,
  className = '',
  itemClassName = ''
}) => {
  const { containerRef, getItemClass } = useStaggeredScrollTrigger(
    children.length,
    { stagger, delay, threshold, animation }
  )

  const childArray = React.Children.toArray(children)

  return (
    <div ref={containerRef} className={className}>
      {childArray.map((child, index) => (
        <div
          key={React.isValidElement(child) && child.key ? child.key : `staggered-child-${index}`}
          className={`transition-all duration-700 ${getItemClass(index)} ${itemClassName}`}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

interface PastelBlueRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  intensity?: 'light' | 'medium' | 'strong'
  className?: string
}

export const PastelBlueReveal: React.FC<PastelBlueRevealProps> = ({
  children,
  direction = 'up',
  intensity = 'medium',
  className = ''
}) => {
  const { elementRef, isVisible } = useScrollTrigger({
    animation: 'pastelSlide',
    threshold: 0.2,
    triggerOnce: true
  })

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'light':
        return 'from-pastel-blue/5 to-pastel-blue/10'
      case 'strong':
        return 'from-pastel-blue/15 to-pastel-blue/25'
      default:
        return 'from-pastel-blue/8 to-pastel-blue/15'
    }
  }

  const getDirectionTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'down':
          return 'translate-y-[-30px]'
        case 'left':
          return 'translate-x-[30px]'
        case 'right':
          return 'translate-x-[-30px]'
        default:
          return 'translate-y-[30px]'
      }
    }
    return 'translate-x-0 translate-y-0'
  }

  return (
    <div
      ref={elementRef}
      className={`relative transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${getDirectionTransform()} ${className}`}
    >
      {/* Animated background effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getIntensityClasses()} rounded-lg transition-all duration-1000 ${
          isVisible ? 'opacity-100 animate-pastel-breathe' : 'opacity-0'
        } pointer-events-none`}
      />

      {/* Border glow effect */}
      <div
        className={`absolute inset-0 border border-pastel-blue/30 rounded-lg transition-all duration-1000 ${
          isVisible ? 'opacity-100 animate-pastel-glow' : 'opacity-0'
        } pointer-events-none`}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface CounterAnimationProps {
  targetValue: number
  duration?: number
  format?: 'number' | 'currency' | 'percentage'
  className?: string
  prefix?: string
  suffix?: string
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  targetValue,
  duration = 2000,
  format = 'number',
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const { elementRef, isVisible } = useScrollTrigger({
    threshold: 0.3,
    triggerOnce: true
  })

  const [currentValue, setCurrentValue] = React.useState(0)

  React.useEffect(() => {
    if (isVisible) {
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function
        const easeOut = 1 - (1 - progress) ** 3
        const value = targetValue * easeOut

        setCurrentValue(value)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }, [isVisible, targetValue, duration])

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      case 'percentage':
        return `${Math.round(value)}%`
      default:
        return Math.round(value).toLocaleString()
    }
  }

  return (
    <span
      ref={elementRef}
      className={`inline-block transition-all duration-300 ${
        isVisible ? 'text-pastel-blue animate-pastel-glow' : 'text-gray-400'
      } ${className}`}
    >
      {prefix}{formatValue(currentValue)}{suffix}
    </span>
  )
}

interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = ''
}) => {
  const elementRef = React.useRef<HTMLDivElement>(null)
  const [transform, setTransform] = React.useState('translate3d(0, 0, 0)')

  React.useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const parallax = scrolled * speed

      let translateX = 0
      let translateY = 0

      switch (direction) {
        case 'down':
          translateY = -parallax
          break
        case 'left':
          translateX = parallax
          break
        case 'right':
          translateX = -parallax
          break
        default:
          translateY = parallax
      }

      setTransform(`translate3d(${translateX}px, ${translateY}px, 0)`)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, direction])

  return (
    <div
      ref={elementRef}
      className={`transition-transform duration-75 ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  )
}

// Enhanced card component with scroll animations
interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
  hoverGlow?: boolean
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
  hoverGlow = true
}) => {
  const { elementRef, isVisible } = useScrollTrigger({
    animation: 'slideUp',
    delay,
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <div
      ref={elementRef}
      className={`
        card-pastel-bg rounded-xl p-6 transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${hoverGlow ? 'hover-pastel-glow hover-pastel-lift' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Section wrapper with comprehensive animations
interface AnimatedSectionProps {
  children: React.ReactNode
  sectionId?: string
  backgroundIntensity?: 'none' | 'light' | 'medium' | 'strong'
  className?: string
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  sectionId,
  backgroundIntensity = 'light',
  className = ''
}) => {
  const { elementRef, isVisible } = useScrollTrigger({
    animation: 'pastelSlide',
    threshold: 0.05,
    triggerOnce: false
  })

  const getBackgroundClasses = () => {
    switch (backgroundIntensity) {
      case 'none':
        return ''
      case 'medium':
        return 'bg-gradient-to-br from-pastel-blue/8 to-pastel-blue/4'
      case 'strong':
        return 'bg-gradient-to-br from-pastel-blue/15 to-pastel-blue/8'
      default:
        return 'bg-gradient-to-br from-pastel-blue/4 to-pastel-blue/2'
    }
  }

  return (
    <section
      ref={elementRef}
      id={sectionId}
      className={`
        relative transition-all duration-1000
        ${isVisible ? 'opacity-100' : 'opacity-90'}
        ${getBackgroundClasses()}
        ${className}
      `}
    >
      {/* Animated divider */}
      {isVisible && (
        <div className="section-divider-pastel absolute top-0 left-0 w-full" />
      )}

      {children}

      {/* Bottom divider */}
      {isVisible && (
        <div className="section-divider-pastel absolute bottom-0 left-0 w-full" />
      )}
    </section>
  )
}
