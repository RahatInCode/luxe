// app/wishlist/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useWishlistStore } from '@/lib/store/wishlist'
import { WishlistItem } from '@/components/WishlistItem'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types'

export default function WishlistPage() {
  const { items, getCount } = useWishlistStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!mounted || items.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/products/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: items }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch wishlist products')
        }

        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
        setError('Failed to load wishlist items. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [items, mounted])

  // Loading state
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-100 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-light text-gray-900 mb-3">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-black text-black px-8 py-3.5 hover:bg-gray-800 transition-colors duration-200 text-sm tracking-wide"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-7 h-7 text-black" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-black">
              Wishlist
            </h1>
          </div>
          <p className="text-gray-500 font-light">
            {getCount()} {getCount() === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 md:py-32"
          >
            <div className="relative mb-6">
              <Heart className="w-24 h-24 text-gray-200" strokeWidth={1} />
              <Sparkles className="w-8 h-8 text-gray-300 absolute -top-2 -right-2" />
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 text-center max-w-md font-light">
              Start adding items you love to keep track of them and shop later
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-black text-black px-8 py-3.5 hover:bg-gray-800 transition-colors duration-200 text-sm tracking-wide"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Products Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {products.map((product, index) => (
                  <WishlistItem
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-lg font-light text-gray-900 mb-1">
                  Ready to complete your collection?
                </h3>
                <p className="text-sm text-gray-500 font-light">
                  Free shipping on orders over $100
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-black text-black px-8 py-3.5 hover:bg-black hover:text-black transition-all duration-200 text-sm tracking-wide"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}