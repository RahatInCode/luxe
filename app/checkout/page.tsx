'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import Button from '@/components/ui/Button'
import Swal from 'sweetalert2'
import { Lock, ShoppingBag, Check, CreditCard, Apple } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ShippingInfo {
  email: string
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentInfo {
  method: 'card' | 'paypal' | 'apple'
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: '',
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products before checking out</p>
          <Button onClick={() => router.push('/products')} className="bg-accent text-white">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  // Validation
  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    
    if (!shippingInfo.email.includes('@')) newErrors.email = 'Valid email required'
    if (shippingInfo.fullName.length < 2) newErrors.fullName = 'Full name required'
    if (shippingInfo.phone.length < 10) newErrors.phone = 'Valid phone required'
    if (shippingInfo.addressLine1.length < 5) newErrors.addressLine1 = 'Address required'
    if (shippingInfo.city.length < 2) newErrors.city = 'City required'
    if (shippingInfo.state.length < 2) newErrors.state = 'State required'
    if (shippingInfo.zipCode.length < 5) newErrors.zipCode = 'Zip code required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePayment = () => {
    if (paymentInfo.method !== 'card') return true
    
    const newErrors: Record<string, string> = {}
    
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.replace(/\s/g, '').length < 15) {
      newErrors.cardNumber = 'Valid card number required'
    }
    if (!paymentInfo.cardHolder || paymentInfo.cardHolder.length < 3) {
      newErrors.cardHolder = 'Cardholder name required'
    }
    if (!paymentInfo.expiryDate || paymentInfo.expiryDate.length < 5) {
      newErrors.expiryDate = 'Expiry date required'
    }
    if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) {
      newErrors.cvv = 'CVV required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateShipping()) {
      setCurrentStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePayment()) {
      setCurrentStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
    await new Promise((resolve) => setTimeout(resolve, 2500))

    await Swal.fire({
      icon: 'success',
      title: 'Order Placed Successfully!',
      text: 'Thank you for your purchase',
      confirmButtonColor: '#6366F1',
      timer: 2000,
    })

    clearCart()
    router.push('/order-success')
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  // Progress Steps Component
  const ProgressSteps = () => {
    const steps = [
      { number: 1, name: 'Shipping' },
      { number: 2, name: 'Payment' },
      { number: 3, name: 'Review' },
    ]

    return (
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                    currentStep > step.number
                      ? 'bg-success text-white'
                      : currentStep === step.number
                      ? 'bg-accent text-white scale-110'
                      : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {currentStep > step.number ? <Check size={24} /> : step.number}
                </div>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium',
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 relative">
                  <div className="absolute inset-0 bg-gray-200" />
                  <div
                    className={cn(
                      'absolute inset-0 bg-accent transition-all duration-500',
                      currentStep > step.number ? 'w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Secure Checkout
          </h1>
          <p className="text-gray-600">Complete your purchase in just a few steps</p>
        </div>

        <ProgressSteps />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200">
              
              {/* STEP 1: SHIPPING */}
              {currentStep === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Address Line 1</label>
                    <input
                      type="text"
                      value={shippingInfo.addressLine1}
                      onChange={(e) => setShippingInfo({...shippingInfo, addressLine1: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="123 Main St"
                    />
                    {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={shippingInfo.addressLine2}
                      onChange={(e) => setShippingInfo({...shippingInfo, addressLine2: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Apt, Suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="New York"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="NY"
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Zip Code</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="10001"
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Country</label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-accent text-white">
                    Continue to Payment
                  </Button>
                </form>
              )}

              {/* STEP 2: PAYMENT */}
              {currentStep === 2 && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentInfo({...paymentInfo, method: 'card'})}
                      className={cn(
                        'p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all',
                        paymentInfo.method === 'card' ? 'border-accent bg-accent/5' : 'border-gray-300'
                      )}
                    >
                      <CreditCard size={20} />
                      <span className="font-medium">Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentInfo({...paymentInfo, method: 'paypal'})}
                      className={cn(
                        'p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all',
                        paymentInfo.method === 'paypal' ? 'border-accent bg-accent/5' : 'border-gray-300'
                      )}
                    >
                      <span className="font-bold text-blue-600">PayPal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentInfo({...paymentInfo, method: 'apple'})}
                      className={cn(
                        'p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all',
                        paymentInfo.method === 'apple' ? 'border-accent bg-accent/5' : 'border-gray-300'
                      )}
                    >
                      <Apple size={20} />
                      <span className="font-medium">Apple Pay</span>
                    </button>
                  </div>

                  {paymentInfo.method === 'card' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: formatCardNumber(e.target.value)})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={paymentInfo.cardHolder}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardHolder: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="John Doe"
                        />
                        {errors.cardHolder && <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: formatExpiryDate(e.target.value)})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">CVV</label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentInfo.method === 'paypal' && (
                    <div className="py-8 text-center">
                      <p className="text-gray-600 mb-4">You will be redirected to PayPal</p>
                      <div className="inline-block bg-blue-500 text-white font-bold py-3 px-8 rounded-lg">
                        PayPal Checkout
                      </div>
                    </div>
                  )}

                  {paymentInfo.method === 'apple' && (
                    <div className="py-8 text-center">
                      <p className="text-gray-600 mb-4">Click below to pay with Apple Pay</p>
                      <div className=" bg-black text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2">
                        <Apple size={20} />
                        Pay with Apple Pay
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" size="lg" onClick={() => setCurrentStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-accent text-white">
                      Continue to Review
                    </Button>
                  </div>
                </form>
              )}

              {/* STEP 3: REVIEW */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>

                  {/* Shipping Info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-900">Shipping Information</h3>
                      <button onClick={() => setCurrentStep(1)} className="text-sm text-accent hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="font-medium text-gray-900">{shippingInfo.fullName}</p>
                      <p className="text-gray-600">{shippingInfo.email}</p>
                      <p className="text-gray-600">{shippingInfo.phone}</p>
                      <p className="text-gray-600 mt-2">{shippingInfo.addressLine1}</p>
                      <p className="text-gray-600">
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-gray-900">Payment Method</h3>
                      <button onClick={() => setCurrentStep(2)} className="text-sm text-accent hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      {paymentInfo.method === 'card' && (
                        <p className="text-gray-900">Card ending in {paymentInfo.cardNumber?.slice(-4)}</p>
                      )}
                      {paymentInfo.method === 'paypal' && <p className="text-gray-900">PayPal</p>}
                      {paymentInfo.method === 'apple' && <p className="text-gray-900">Apple Pay</p>}
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-accent focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <Link href="/terms" className="text-accent hover:underline">Terms & Conditions</Link>
                    </span>
                  </label>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" onClick={() => setCurrentStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      size="lg"
                      onClick={handlePlaceOrder}
                      isLoading={isProcessing}
                      className="flex-1 bg-accent text-white"
                      disabled={!acceptedTerms}
                    >
                      {!isProcessing && <Lock size={18} className="mr-2" />}
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Order Summary</h3>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-600">{item.selectedColor} / {item.selectedSize}</p>
                      <p className="text-sm font-semibold text-gray-900">${item.product.price} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'text-gray-900'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <Lock size={16} className="text-green-600" />
                  <span className="font-medium">Secure SSL encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}