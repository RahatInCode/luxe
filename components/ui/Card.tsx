import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export default function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        'border border-border',
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}