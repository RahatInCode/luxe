import { cn } from '@/lib/utils/cn'

interface LoadingSkeletonProps {
  className?: string
  count?: number
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gray-200 rounded-lg',
            className
          )}
        />
      ))}
    </>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-border">
      <LoadingSkeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-4 w-2/3" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-6 w-1/3" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}