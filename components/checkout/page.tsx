'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CheckoutProgress from '@/components/checkout/CheckoutProgress'
import ShippingForm from '@/components/checkout/ShippingForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import Button from '@/components/ui/Button'
import { useCartStore } from '@/lib/store/cart'
import { ShippingInfo, PaymentInfo } from '@/types'
import Swal from 'sweetalert2'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-textSecondary mb-6">
            Add some products before checking out
          </p>
          <Button onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data)
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSubmit = (data: PaymentInfo) => {
    setPaymentInfo(data)
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePlaceOrder = async () => {
    if (!acceptedTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms Required',
        text: 'Please accept the terms and conditions',
        confirmButtonColor: '#6366F1',
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Clear cart and redirect
    clearCart()
    router.push('/success')
  }

  return (
    <div className="min-h-screen bg-backgroundGray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-center mb-2">
          Checkout
        </h1>
        <p className="text-center text-textSecondary mb-12">
          Complete your purchase securely
        </p>

        <CheckoutProgress currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <ShippingForm onSubmit={handleShippingSubmit} />
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Review Your Order</h2>

                  {/* Shipping Info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">
                        Shipping Information
                      </h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-accent hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-backgroundGray rounded-lg p-4 text-sm space-y-1">
                      <p className="font-medium">{shippingInfo?.fullName}</p>
                      <p className="text-textSecondary">
                        {shippingInfo?.email}
                      </p>
                      <p className="text-textSecondary">
                        {shippingInfo?.phone}
                      </p>
                      <p className="text-textSecondary mt-2">
                        {shippingInfo?.addressLine1}
                        {shippingInfo?.addressLine2 &&
                          `, ${shippingInfo.addressLine2}`}
                      </p>
                      <p className="text-textSecondary">
                        {shippingInfo?.city}, {shippingInfo?.state}{' '}
                        {shippingInfo?.zipCode}
                      </p>
                      <p className="text-textSecondary">
                        {shippingInfo?.country}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Payment Method</h3>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-sm text-accent hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="bg-backgroundGray rounded-lg p-4">
                      {paymentInfo?.method === 'card' && (
                        <p className="text-sm">
                          Credit Card ending in{' '}
                          {paymentInfo.cardNumber?.slice(-4)}
                        </p>
                      )}
                      {paymentInfo?.method === 'paypal' && (
                        <p className="text-sm">PayPal</p>
                      )}
                      {paymentInfo?.method === 'apple' && (
                        <p className="text-sm">Apple Pay</p>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Order Items ({items.length})
                    </h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                          className="flex gap-4 pb-4 border-b border-border last:border-0"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-textSecondary">
                              {item.selectedColor} / {item.selectedSize}
                            </p>
                            <p className="text-sm text-textSecondary">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-2 border-border text-accent focus:ring-2 focus:ring-accent cursor-pointer"
                    />
                    <span className="text-sm text-textSecondary">
                      I agree to the{' '}
                      <Link href="/terms" className="text-accent hover:underline">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-accent hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {/* Place Order Button */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={handlePlaceOrder}
                      isLoading={isProcessing}
                      className="flex-1"
                    >
                      <Lock size={18} className="mr-2" />
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-textSecondary">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                      <p className="text-sm font-semibold">
                        ${item.product.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-backgroundGray rounded-lg">
                <div className="flex items-center gap-2 text-sm text-textSecondary">
                  <Lock size={16} className="text-success" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}