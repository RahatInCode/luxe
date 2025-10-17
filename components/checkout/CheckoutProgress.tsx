import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface CheckoutProgressProps {
  currentStep: number
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
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
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                  currentStep > step.number
                    ? 'bg-success text-white'
                    : currentStep === step.number
                    ? 'bg-accent text-white scale-110'
                    : 'bg-secondary text-textSecondary'
                )}
              >
                {currentStep > step.number ? <Check size={24} /> : step.number}
              </div>
              <span
                className={cn(
                  'mt-2 text-sm font-medium',
                  currentStep >= step.number ? 'text-textPrimary' : 'text-textSecondary'
                )}
              >
                {step.name}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 relative">
                <div className="absolute inset-0 bg-secondary" />
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