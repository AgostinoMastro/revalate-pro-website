import { useRef, useCallback } from 'react'

interface SoundEffects {
  playProcessing: () => void
  playSuccess: () => void
  playExtraction: () => void
  playNotification: () => void
  playClick: () => void
  playHover: () => void
  setMuted: (muted: boolean) => void
}

export const useSoundEffects = (): SoundEffects => {
  const isMuted = useRef(false)
  const isSupported = useRef<boolean | null>(null)

  // Check if audio is supported in current environment
  const checkAudioSupport = useCallback(() => {
    if (isSupported.current !== null) return isSupported.current

    try {
      // Check if we're in an iframe or restrictive environment
      if (window.self !== window.top) {
        isSupported.current = false
        return false
      }

      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) {
        isSupported.current = false
        return false
      }

      // Test creating an audio context
      const testContext = new AudioContextClass()
      testContext.close()
      isSupported.current = true
      return true
    } catch (error) {
      isSupported.current = false
      return false
    }
  }, [])

  // Create audio context and generate sounds programmatically
  const createBeep = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (isMuted.current || !checkAudioSupport()) return

    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      const audioContext = new AudioContextClass()

      // Handle suspended audio context (common in modern browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          playSound()
        }).catch(() => {
          // Silently fail
        })
      } else {
        playSound()
      }

      function playSound() {
        try {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
          oscillator.type = type

          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + duration)

          // Clean up
          setTimeout(() => {
            audioContext.close()
          }, (duration * 1000) + 100)
        } catch (error) {
          // Silently fail
        }
      }
    } catch (error) {
      // Silently fail if Web Audio API is not supported
    }
  }, [checkAudioSupport])

  const playProcessing = useCallback(() => {
    // Subtle processing sound - low frequency pulse
    try {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createBeep(200 + i * 50, 0.1, 'sine'), i * 100)
      }
    } catch (error) {
      // Silently fail
    }
  }, [createBeep])

  const playSuccess = useCallback(() => {
    // Success sound - ascending notes
    try {
      createBeep(523, 0.1) // C5
      setTimeout(() => createBeep(659, 0.1), 100) // E5
      setTimeout(() => createBeep(784, 0.15), 200) // G5
    } catch (error) {
      // Silently fail
    }
  }, [createBeep])

  const playExtraction = useCallback(() => {
    // Data extraction sound - quick chirp
    try {
      createBeep(800, 0.05, 'square')
      setTimeout(() => createBeep(1000, 0.05, 'square'), 50)
    } catch (error) {
      // Silently fail
    }
  }, [createBeep])

  const playNotification = useCallback(() => {
    // Notification sound - gentle ping
    try {
      createBeep(660, 0.2, 'sine')
    } catch (error) {
      // Silently fail
    }
  }, [createBeep])

  const playClick = useCallback(() => {
    // Click sound - short pop
    try {
      createBeep(400, 0.05, 'square')
    } catch (error) {
      // Silently fail
    }
  }, [createBeep])

  const playHover = useCallback(() => {
    // Hover sound - gentle click
    try {
      createBeep(300, 0.1, 'square')
    } catch (error) {
      // Silently fail
    }
  }, [createBeep])

  const setMuted = useCallback((muted: boolean) => {
    isMuted.current = muted
  }, [])

  return {
    playProcessing,
    playSuccess,
    playExtraction,
    playNotification,
    playClick,
    playHover,
    setMuted
  }
}
