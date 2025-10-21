'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ShippingInfo } from '@/types'

// Schema that matches your ShippingInfo interface exactly
const shippingSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(), 
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code required'),
  country: z.string().min(2, 'Country is required'),
  saveInfo: z.boolean(), 
})

interface ShippingFormProps {
  onSubmit: (data: ShippingInfo) => void
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: 'United States',
      saveInfo: false, // This ensures saveInfo is always boolean
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <Input
            label="Address Line 1"
            placeholder="123 Main St"
            error={errors.addressLine1?.message}
            {...register('addressLine1')}
          />

          <Input
            label="Address Line 2 (Optional)"
            placeholder="Apt, Suite, etc."
            error={errors.addressLine2?.message}
            {...register('addressLine2')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="New York"
              error={errors.city?.message}
              {...register('city')}
            />

            <Input
              label="State/Province"
              placeholder="NY"
              error={errors.state?.message}
              {...register('state')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Zip Code"
              placeholder="10001"
              error={errors.zipCode?.message}
              {...register('zipCode')}
            />

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">
                Country
              </label>
              <select
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                {...register('country')}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-border text-accent focus:ring-2 focus:ring-accent cursor-pointer"
              {...register('saveInfo')}
            />
            <span className="ml-3 text-sm text-textPrimary">
              Save this information for next time
            </span>
          </label>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Continue to Payment
      </Button>
    </form>
  )
}