import { gsap } from 'gsap'

export const fadeIn = (element: HTMLElement, duration: number = 0.6) => {
  return gsap.from(element, {
    opacity: 0,
    duration,
    ease: 'power2.out',
  })
}

export const slideUp = (element: HTMLElement, duration: number = 0.8) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration,
    ease: 'power3.out',
  })
}

export const scaleIn = (element: HTMLElement, duration: number = 0.5) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration,
    ease: 'back.out(1.7)',
  })
}

export const staggerChildren = (
  container: HTMLElement,
  childrenSelector: string,
  stagger: number = 0.1
) => {
  return gsap.from(`${childrenSelector}`, {
    y: 30,
    opacity: 0,
    stagger,
    duration: 0.6,
    ease: 'power2.out',
  })
}

export const magneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

export const parallaxScroll = (
  element: HTMLElement,
  speed: number = 0.5
) => {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
    },
    y: (i, target) => -window.innerHeight * speed,
    ease: 'none',
  })
}