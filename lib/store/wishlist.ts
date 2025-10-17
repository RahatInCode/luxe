import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  items: string[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  getCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        set((state) => ({
          items: state.items.includes(productId)
            ? state.items
            : [...state.items, productId],
        }))
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }))
      },

      toggleItem: (productId) => {
        const isInWishlist = get().isInWishlist(productId)
        if (isInWishlist) {
          get().removeItem(productId)
        } else {
          get().addItem(productId)
        }
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId)
      },

      getCount: () => get().items.length,
    }),
    {
      name: 'wishlist-storage',
    }
  )
)