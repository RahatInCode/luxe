// components/product/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cart'
import { useWishlistStore } from '@/lib/store/wishlist'
import Swal from 'sweetalert2'
import { cn } from '@/lib/utils/cn'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!product.sizes.length || !product.colors.length) {
      return
    }

    addItem(product, product.sizes[0], product.colors[0].name, 1)
    
    Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      text: product.name,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: 'top-end',
      showClass: {
        popup: 'animate-in slide-in-from-right'
      }
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleItem(product.id)
    
    Swal.fire({
      icon: inWishlist ? 'info' : 'success',
      title: inWishlist ? 'Removed from wishlist' : 'Added to wishlist!',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: 'top-end',
    })
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover object-center transition-all duration-500",
              isHovered && product.images[1] ? "opacity-0 scale-110" : "opacity-100 scale-100"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              className={cn(
                "object-cover object-center transition-all duration-500",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.new && (
              <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="bg-error text-white px-3 py-1 rounded-full text-xs font-semibold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300",
                inWishlist && "bg-error text-white"
              )}
              aria-label="Add to wishlist"
            >
              <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 bg-primary text-white py-3 rounded-lg font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-primary/90"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-textSecondary uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-textPrimary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating) ? "text-warning fill-current" : "text-gray-300"
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-textSecondary ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-lg font-bold text-textPrimary">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-sm text-textSecondary line-through">
                  ${product.compareAtPrice}
                </span>
                <span className="text-xs font-semibold text-error">
                  Save ${(product.compareAtPrice - product.price).toFixed(0)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}