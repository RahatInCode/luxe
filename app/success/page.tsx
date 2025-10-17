'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'

export default function SuccessPage() {
  const router = useRouter()
  const checkmarkRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Generate mock order number
  const orderNumber = `LUXE-${Math.random().toString(36).substring(2, 11).toUpperCase()}`
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  useEffect(() => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    // ✅ Properly typed interval (browser-safe)
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    // ✅ GSAP Animations
    const ctx = gsap.context(() => {
      // Checkmark animation
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }
      )

      // Floating animation
      gsap.to(checkmarkRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      // Content stagger
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          ease: 'power3.out',
        })
      }
    })

    return () => {
      clearInterval(interval)
      ctx.revert()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-white to-accent/5 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Checkmark Icon */}
        <div ref={checkmarkRef} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-success rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle size={80} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-20" />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="text-center space-y-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-textPrimary mb-3">
              Order Confirmed!
            </h1>
            <p className="text-xl text-textSecondary">
              Thank you for your purchase! 🎉
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-left">
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-textSecondary mb-1">Order Number</p>
              <p className="text-2xl font-bold font-mono text-accent">{orderNumber}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-accent" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Confirmation Email Sent</p>
                  <p className="text-sm text-textSecondary">
                    Weve sent a confirmation email with your order details and tracking information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package size={24} className="text-success" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Estimated Delivery</p>
                  <p className="text-sm text-textSecondary">
                    Your order will arrive by{' '}
                    <span className="font-medium text-textPrimary">{estimatedDelivery}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Preview */}
          <div className="bg-backgroundGray rounded-2xl p-6 text-left">
            <h3 className="font-semibold mb-3">Whats Next?</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>You will receive an email confirmation shortly with your order details.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>We will send you tracking information once your order ships.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Your order will be carefully packaged and shipped within 1–2 business days.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/products" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => alert(`Tracking order ${orderNumber}`)}
            >
              Track Order
            </Button>
          </div>

          {/* Support Link */}
          <p className="text-sm text-textSecondary pt-4">
            Need help?{' '}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
