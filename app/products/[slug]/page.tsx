'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Minus, Plus, ChevronDown, Check, Truck, RotateCcw, ShoppingCart, Zap } from 'lucide-react'
import { products, reviews } from '@/lib/data/products'
import { useCartStore } from '@/lib/store/cart'
import { useWishlistStore } from '@/lib/store/wishlist'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import Swal from 'sweetalert2'
import { cn } from '@/lib/utils/cn'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const product = products.find((p) => p.slug === params.slug)
  const productReviews = product ? reviews[product.id] || [] : []

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description')

  const { addItem, openCart } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()

  const addToCartBtnRef = useRef<HTMLButtonElement>(null)
  const buyNowBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '')
      setSelectedSize(product.sizes[0] || '')
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select options',
        text: 'Please select size and color before adding to cart',
        confirmButtonColor: '#6366F1',
      })
      return
    }

    addItem(product, selectedSize, selectedColor, quantity)

    // Animation
    if (addToCartBtnRef.current) {
      gsap.to(addToCartBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      html: `
        <div class="text-center">
          <img src="${product.images[0]}" alt="${product.name}" class="w-20 h-20 object-cover rounded-lg mx-auto mb-3" />
          <p class="font-medium">${product.name}</p>
          <p class="text-sm text-gray-600">${selectedColor} / ${selectedSize} × ${quantity}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'View Cart',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#6366F1',
      cancelButtonColor: '#6B7280',
    }).then((result) => {
      if (result.isConfirmed) {
        openCart()
      }
    })
  }

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      Swal.fire({
        icon: 'warning',
        title: 'Please select options',
        text: 'Please select size and color before proceeding',
        confirmButtonColor: '#6366F1',
      })
      return
    }

    // Add to cart
    addItem(product, selectedSize, selectedColor, quantity)

    // Animation
    if (buyNowBtnRef.current) {
      gsap.to(buyNowBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    // Redirect to checkout
    router.push('/checkout')
  }

  const handleWishlist = () => {
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

  const AccordionSection = ({
    id,
    title,
    children,
  }: {
    id: string
    title: string
    children: React.ReactNode
  }) => (
    <div className="border-b border-border">
      <button
        onClick={() => setActiveAccordion(activeAccordion === id ? null : id)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-accent transition-colors"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown
          size={20}
          className={cn(
            'transition-transform duration-300',
            activeAccordion === id && 'rotate-180'
          )}
        />
      </button>
      {activeAccordion === id && (
        <div className="pb-4 animate-in slide-in-from-top-4">{children}</div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm text-textSecondary">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-accent">
            Products
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-accent">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-textPrimary">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden">
              <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.new && (
                  <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                    NEW
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="bg-error text-white px-4 py-2 rounded-full text-sm font-semibold">
                    SALE
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbs-swiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="lg:pl-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={cn(
                      i < Math.floor(product.rating)
                        ? 'text-warning fill-warning'
                        : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-textSecondary">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-textSecondary line-through">
                    ${product.compareAtPrice}
                  </span>
                  <span className="bg-error/10 text-error px-3 py-1 rounded-full text-sm font-semibold">
                    Save $
                    {(product.compareAtPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-textSecondary mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-gray-900">
                Color: <span className="text-accent">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      'relative w-12 h-12 rounded-full border-2 transition-all',
                      selectedColor === color.name
                        ? 'border-accent scale-110 shadow-lg'
                        : 'border-border hover:scale-105'
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check
                          size={20}
                          className={cn(
                            color.hex === '#FFFFFF' || color.hex === '#F5F5DC'
                              ? 'text-black'
                              : 'text-white'
                          )}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-900">
                  Size: <span className="text-accent">{selectedSize}</span>
                </label>
                <button className="text-sm text-accent hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'px-6 py-3 border-2 rounded-lg font-medium transition-all',
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-border text-textPrimary hover:border-accent'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-semibold mb-3 text-gray-900">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors text-gray-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors text-gray-900"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm text-textSecondary">
                  {product.inStock ? (
                    <span className="text-success font-medium">In Stock</span>
                  ) : (
                    <span className="text-error font-medium">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              {/* Buy Now Button - Primary Action */}
              <Button
                ref={buyNowBtnRef}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                <Zap size={20} className="mr-2" />
                Buy Now
              </Button>

              {/* Add to Cart & Wishlist Row */}
              <div className="flex gap-3">
                <Button
                  ref={addToCartBtnRef}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold transition-all"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlist}
                  className={cn(
                    'border-2 transition-all',
                    inWishlist 
                      ? 'border-error text-error hover:bg-error hover:text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-error hover:text-error'
                  )}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck size={20} className="text-accent flex-shrink-0" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RotateCcw size={20} className="text-accent flex-shrink-0" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Check size={20} className="text-accent flex-shrink-0" />
                <span>Authenticity guaranteed</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-border">
              <AccordionSection id="description" title="Description">
                <p className="text-textSecondary leading-relaxed">
                  {product.fullDescription || product.description}
                </p>
              </AccordionSection>

              <AccordionSection id="shipping" title="Shipping Information">
                <div className="text-textSecondary space-y-2">
                  <p>
                    <strong>Standard Shipping:</strong> 5-7 business days
                  </p>
                  <p>
                    <strong>Express Shipping:</strong> 2-3 business days
                  </p>
                  <p>
                    <strong>Free Shipping:</strong> On orders over $100
                  </p>
                  <p className="text-sm mt-4">
                    All orders are processed within 1-2 business days. Orders
                    are not shipped or delivered on weekends or holidays.
                  </p>
                </div>
              </AccordionSection>

              <AccordionSection id="reviews" title={`Reviews (${productReviews.length})`}>
                <div className="space-y-6">
                  {productReviews.length > 0 ? (
                    productReviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={cn(
                                      i < review.rating
                                        ? 'text-warning fill-warning'
                                        : 'text-gray-300'
                                    )}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="text-xs text-success">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-textSecondary">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-textSecondary">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-textSecondary">No reviews yet</p>
                  )}
                </div>
              </AccordionSection>

              <AccordionSection id="size-guide" title="Size Guide">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Chest (in)</th>
                        <th className="text-left py-2">Waist (in)</th>
                        <th className="text-left py-2">Hips (in)</th>
                      </tr>
                    </thead>
                    <tbody className="text-textSecondary">
                      <tr className="border-b border-border">
                        <td className="py-2">XS</td>
                        <td className="py-2">32-34</td>
                        <td className="py-2">24-26</td>
                        <td className="py-2">34-36</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">S</td>
                        <td className="py-2">34-36</td>
                        <td className="py-2">26-28</td>
                        <td className="py-2">36-38</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">M</td>
                        <td className="py-2">36-38</td>
                        <td className="py-2">28-30</td>
                        <td className="py-2">38-40</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2">L</td>
                        <td className="py-2">38-40</td>
                        <td className="py-2">30-32</td>
                        <td className="py-2">40-42</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">40-42</td>
                        <td className="py-2">32-34</td>
                        <td className="py-2">42-44</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl font-bold mb-8 text-gray-900">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}