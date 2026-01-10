import type React from 'react'
import { useState, useEffect, useRef } from 'react'

export type TransitionType = 'slide' | 'fade' | 'scale' | 'dissolve' | 'pastel-flow'

interface PageTransitionProps {
  children: React.ReactNode
  type?: TransitionType
  duration?: number
  isActive?: boolean
  className?: string
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 500,
  isActive = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      setIsExiting(false)
    } else {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
      }, duration)
    }
  }, [isActive, duration])

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all ease-in-out'
    const durationClass = `duration-${duration}`

    if (!isVisible) return `${baseClasses} ${durationClass} opacity-0`

    if (isExiting) {
      switch (type) {
        case 'slide':
          return `${baseClasses} ${durationClass} transform translate-x-full opacity-0`
        case 'scale':
          return `${baseClasses} ${durationClass} transform scale-95 opacity-0`
        case 'dissolve':
          return `${baseClasses} ${durationClass} opacity-0 blur-sm`
        case 'pastel-flow':
          return `${baseClasses} ${durationClass} opacity-0 transform translate-y-4 scale-98`
        default:
          return `${baseClasses} ${durationClass} opacity-0`
      }
    }

    switch (type) {
      case 'slide':
        return `${baseClasses} ${durationClass} animate-page-transition-slide`
      case 'scale':
        return `${baseClasses} ${durationClass} animate-pastel-scale-in`
      case 'dissolve':
        return `${baseClasses} ${durationClass} animate-fadeIn blur-0`
      case 'pastel-flow':
        return `${baseClasses} ${durationClass} animate-pastel-section-fade`
      default:
        return `${baseClasses} ${durationClass} animate-page-transition-fade`
    }
  }

  const getBackgroundEffect = () => {
    if (type === 'pastel-flow') {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/5 via-transparent to-pastel-blue/3 animate-pastel-background-drift pointer-events-none" />
      )
    }
    return null
  }

  if (!isVisible && !isExiting) return null

  return (
    <div
      ref={containerRef}
      className={`relative ${getTransitionClasses()} ${className}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      {getBackgroundEffect()}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Smooth scroll navigation hook
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return { scrollToSection, scrollToTop }
}

// Section transition wrapper
interface SectionTransitionProps {
  children: React.ReactNode
  sectionId: string
  className?: string
  animationType?: TransitionType
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  sectionId,
  className = '',
  animationType = 'fade'
}) => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`${className} transition-all duration-700 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <PageTransition
        type={animationType}
        isActive={isInView}
        duration={700}
      >
        {children}
      </PageTransition>
    </section>
  )
}

// Navigation transition hook
export const usePageNavigation = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateWithTransition = (
    callback: () => void,
    transitionDuration = 300
  ) => {
    console.log('navigateWithTransition called, starting transition')
    setIsTransitioning(true)

    setTimeout(() => {
      console.log('Executing navigation callback')
      callback()

      setTimeout(() => {
        console.log('Ending transition')
        setIsTransitioning(false)
      }, transitionDuration)
    }, transitionDuration)
  }

  return {
    isTransitioning,
    navigateWithTransition
  }
}
