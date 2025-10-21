'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreditCard, Apple } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { PaymentInfo } from '@/types'
import { cn } from '@/lib/utils/cn'

const paymentSchema = z.object({
  method: z.enum(['card', 'paypal', 'apple']),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
})

interface PaymentFormProps {
  onSubmit: (data: PaymentInfo) => void
  onBack: () => void
}

export default function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PaymentInfo>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: 'card',
    },
  })

  const handlePaymentMethodChange = (method: 'card' | 'paypal' | 'apple') => {
    setPaymentMethod(method)
    setValue('method', method)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

        {/* Payment Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('card')}
            className={cn(
              'p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all',
              paymentMethod === 'card'
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            )}
          >
            <CreditCard size={20} />
            <span className="font-medium">Credit Card</span>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange('paypal')}
            className={cn(
              'p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all',
              paymentMethod === 'paypal'
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            )}
          >
            <span className="font-bold text-[#003087]">Pay</span>
            <span className="font-bold text-[#009CDE]">Pal</span>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange('apple')}
            className={cn(
              'p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-all',
              paymentMethod === 'apple'
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50'
            )}
          >
            <Apple size={20} />
            <span className="font-medium">Apple Pay</span>
          </button>
        </div>

        {/* Card Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber?.message}
              {...register('cardNumber')}
              onChange={(e) => {
                e.target.value = formatCardNumber(e.target.value)
              }}
              maxLength={19}
            />

            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              error={errors.cardHolder?.message}
              {...register('cardHolder')}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                error={errors.expiryDate?.message}
                {...register('expiryDate')}
                onChange={(e) => {
                  e.target.value = formatExpiryDate(e.target.value)
                }}
                maxLength={5}
              />

              <Input
                label="CVV"
                placeholder="123"
                error={errors.cvv?.message}
                {...register('cvv')}
                maxLength={3}
              />
            </div>

            {/* Security Badges */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-textSecondary">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <span>Secure SSL Encrypted</span>
              </div>
            </div>
          </div>
        )}

        {/* PayPal */}
        {paymentMethod === 'paypal' && (
          <div className="py-8 text-center animate-in fade-in slide-in-from-top-4">
            <p className="text-textSecondary mb-4">
              You will be redirected to PayPal to complete your purchase
            </p>
            <div className="inline-block bg-[#FFC439] text-[#003087] font-bold py-3 px-8 rounded-lg">
              PayPal Checkout
            </div>
          </div>
        )}

        {/* Apple Pay */}
        {paymentMethod === 'apple' && (
          <div className="py-8 text-center animate-in fade-in slide-in-from-top-4">
            <p className="text-textSecondary mb-4">
              Click below to pay with Apple Pay
            </p>
            <div className=" bg-black text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2">
              <Apple size={20} />
              Pay with Apple Pay
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" size="lg" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" size="lg" className="flex-1">
          Continue to Review
        </Button>
      </div>
    </form>
  )
}