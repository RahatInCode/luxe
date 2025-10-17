'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation<T extends HTMLElement>(
  animationOptions: gsap.TweenVars = {},
  scrollTriggerOptions: ScrollTrigger.Vars = {}
) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          ...scrollTriggerOptions,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        ...animationOptions,
      })
    })

    return () => ctx.revert()
  }, [])

  return elementRef
}