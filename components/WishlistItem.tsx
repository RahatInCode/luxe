// components/WishlistItem.tsx
'use client'

import { motion } from 'framer-motion'
import { X, ShoppingCart, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlistStore } from '@/lib/store/wishlist'
import { useCartStore } from '@/lib/store/cart'
import { useState } from 'react'
import { Product } from '@/types'
import Swal from 'sweetalert2'
import { cn } from '@/lib/utils/cn'

interface WishlistItemProps {
  product: Product
  index: number
}

export function WishlistItem({ product, index }: WishlistItemProps) {
  const { removeItem } = useWishlistStore()
  const { addItem } = useCartStore()
  const [isRemoving, setIsRemoving] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      removeItem(product.id)
      Swal.fire({
        icon: 'info',
        title: 'Removed from wishlist',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
      })
    }, 200)
  }

  const handleAddToCart = () => {
    if (!product.sizes.length || !product.colors.length) {
      Swal.fire({
        icon: 'warning',
        title: 'Product options unavailable',
        text: 'This product cannot be added to cart at the moment',
        confirmButtonColor: '#6366F1',
      })
      return
    }

    // Add with default size and color
    addItem(product, product.sizes[0], product.colors[0].name, 1)

    Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      html: `
        <div class="text-center">
          <img src="${product.images[0]}" alt="${product.name}" class="w-20 h-20 object-cover rounded-lg mx-auto mb-3" />
          <p class="font-medium">${product.name}</p>
          <p class="text-sm text-gray-600">${product.colors[0].name} / ${product.sizes[0]}</p>
        </div>
      `,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: 'top-end',
    })
  }

  // Get first available image
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        y: 0,
        scale: isRemoving ? 0.95 : 1,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white"
    >
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black hover:text-black shadow-sm"
        aria-label="Remove from wishlist"
      >
        <X className="w-4 h-4" strokeWidth={1.5} />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4">
          {mainImage && !imageError ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => {
                console.error('Failed to load image:', mainImage)
                setImageError(true)
              }}
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <p className="text-xs text-gray-400">No Image</p>
              </div>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-sm font-light tracking-wide text-gray-600">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-1.5 tracking-wide uppercase font-light">
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`} className="group/link">
            <h3 className="text-base font-light text-gray-900 mb-2 group-hover/link:text-gray-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-light text-black">
              ${product.price.toFixed(2)}
            </p>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "flex-1 py-2.5 px-4 text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2",
              product.inStock
                ? "bg-black text-black hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 border border-gray-200 hover:border-black transition-colors duration-200 flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}