import { useEffect, useState, RefObject } from 'react'

interface ScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Custom hook to detect when an element enters the viewport
 * Returns true when element is visible
 */
export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
): boolean => {
  const { threshold = 0.1, triggerOnce = false } = options
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, threshold, triggerOnce])

  return isVisible
}

/**
 * Hook to get scroll progress (0-1) of an element
 */
export const useScrollProgress = (ref: RefObject<HTMLElement>): number => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress based on element position
      const start = windowHeight
      const end = -rect.height
      const current = rect.top

      const scrollProgress = 1 - (current - end) / (start - end)
      setProgress(Math.max(0, Math.min(1, scrollProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ref])

  return progress
}

/**
 * Hook to detect scroll direction
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return scrollDirection
}
