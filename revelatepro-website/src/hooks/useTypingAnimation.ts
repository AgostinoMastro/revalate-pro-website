import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTypingAnimationProps {
  text: string
  isActive: boolean
  delay?: number
  speed?: number
  onComplete?: () => void
}

export const useTypingAnimation = ({
  text,
  isActive,
  delay = 0,
  speed = 50,
  onComplete
}: UseTypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const onCompleteRef = useRef(onComplete)

  // Update the ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!isActive) {
      setDisplayText('')
      setIsTyping(false)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      intervalRef.current = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
          if (onCompleteRef.current) onCompleteRef.current()
        }
      }, speed)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, isActive, delay, speed]) // Removed onComplete from dependencies

  return {
    displayText,
    isTyping,
    isComplete: displayText === text && !isTyping
  }
}

// Hook for sequential text extraction
export const useSequentialExtraction = (texts: string[], isActive: boolean, delay = 500) => {
  const [extractedTexts, setExtractedTexts] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const textsRef = useRef(texts)

  // Update texts ref when texts change
  useEffect(() => {
    textsRef.current = texts
  }, [texts])

  useEffect(() => {
    if (!isActive) {
      setExtractedTexts([])
      setIsComplete(false)
      return
    }

    setExtractedTexts([])
    setIsComplete(false)

    // Schedule all extractions at once to avoid dependency issues
    const currentTexts = textsRef.current
    currentTexts.forEach((text, index) => {
      setTimeout(() => {
        setExtractedTexts(prev => {
          const newTexts = [...prev, text]
          if (newTexts.length === currentTexts.length) {
            setIsComplete(true)
          }
          return newTexts
        })
      }, index * delay)
    })
  }, [isActive, delay])

  return {
    extractedTexts,
    isComplete,
    currentlyExtracting: extractedTexts.length < texts.length ? texts[extractedTexts.length] : null
  }
}
