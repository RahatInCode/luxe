import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void
  removeItem: (productId: string, selectedSize: string, selectedColor: string) => void
  updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.productId === product.id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                quantity,
                selectedSize,
                selectedColor,
                product,
              },
            ],
          }
        })
      },

      removeItem: (productId, selectedSize, selectedColor) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
              )
          ),
        }))
      },

      updateQuantity: (productId, selectedSize, selectedColor, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize, selectedColor)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)