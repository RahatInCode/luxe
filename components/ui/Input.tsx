'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-textPrimary mb-2">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-4 py-3 border border-border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'transition-all duration-300',
            'placeholder:text-textSecondary',
            error && 'border-error focus:ring-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input