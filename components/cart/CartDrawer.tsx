'use client'

import { useEffect } from 'react'
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Swal from 'sweetalert2'
import { cn } from '@/lib/utils/cn'

export default function CartDrawer() {
  const router = useRouter()
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    Swal.fire({
      title: 'Remove item?',
      text: 'Are you sure you want to remove this from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(productId, size, color)
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: 'top-end',
        })
      }
    })
  }

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  const subtotal = getTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
            <ShoppingBag size={24} />
            Shopping Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-gray-900"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-textSecondary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Your cart is empty</h3>
              <p className="text-textSecondary mb-6">
                Add some products to get started
              </p>
              <Button onClick={closeCart} className="bg-accent text-white hover:bg-accent/90">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 pb-4 border-b border-border last:border-0 animate-in slide-in-from-right"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeCart}
                    className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="font-medium text-textPrimary hover:text-accent transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-textSecondary mt-1">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                    <p className="font-semibold mt-2 text-gray-900">${item.product.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-2 hover:bg-secondary transition-colors text-gray-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-2 hover:bg-secondary transition-colors text-gray-900"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          handleRemoveItem(
                            item.productId,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-gray-50">
            {/* Pricing */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-textSecondary">Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Shipping</span>
                <span className={cn('font-medium', shipping === 0 ? 'text-success' : 'text-gray-900')}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Tax</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
              {subtotal < 100 && (
                <div className="pt-2 px-3 py-2 bg-accent/10 rounded-lg">
                  <p className="text-xs text-accent font-medium">
                    🎉 Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
              <span className="text-gray-900">Total</span>
              <span className="text-accent">${total.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg" 
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-2 border-gray-300 text-gray-700 hover:border-accent hover:text-accent font-medium" 
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-textSecondary pt-2">
              <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}