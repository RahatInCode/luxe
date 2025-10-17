'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setIsVisible(isIntersecting)

        if (isIntersecting && freezeOnceVisible) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return { elementRef, isVisible }
}