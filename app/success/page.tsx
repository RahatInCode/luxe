'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { CheckCircle2, Package, Truck, Home } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function OrderSuccessPage() {
  const router = useRouter()
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase()

  useEffect(() => {
    // Confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-in zoom-in duration-500">
          {/* Success Icon */}
          <div className="mb-6 animate-in zoom-in duration-700 delay-200">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
              <CheckCircle2 size={64} className="text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-in slide-in-from-bottom duration-500 delay-300">
            Order Placed Successfully! 🎉
          </h1>

          <p className="text-gray-600 text-lg mb-8 animate-in slide-in-from-bottom duration-500 delay-400">
            Thank you for your purchase. We&apos;ve received your order and will process it shortly.
          </p>

          {/* Order Number */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 animate-in slide-in-from-bottom duration-500 delay-500">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-2xl font-bold text-accent font-mono">#{orderNumber}</p>
          </div>

          {/* What's Next */}
          <div className="text-left mb-8 animate-in slide-in-from-bottom duration-500 delay-600">
            <h2 className="font-semibold text-lg mb-4 text-gray-900">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Confirmation</p>
                  <p className="text-sm text-gray-600">You&apos;ll receive an email confirmation shortly</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-600">We&apos;ll notify you when your order ships</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-600">Estimated delivery in 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom duration-500 delay-700">
            <Link href="/products" className="flex-1">
              <Button className="w-full bg-accent hover:bg-accent/90 text-black" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button variant="outline" className="w-full border-2" size="lg">
                View Orders
              </Button>
            </Link>
          </div>

          {/* Support */}
          <p className="text-sm text-gray-500 mt-8">
            Need help?{' '}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}