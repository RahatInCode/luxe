// lib/store/user.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  date: string
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled'
  total: number
  items: number
  trackingNumber?: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  joinedDate: string
  addresses: Address[]
  orders: Order[]
  wishlistCount: number
}

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

// Mock users database
const mockUsers: Record<string, { password: string; user: User }> = {
  'demo@luxe.com': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@luxe.com',
      name: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      phone: '+1 (555) 123-4567',
      joinedDate: '2023-06-15',
      wishlistCount: 5,
      addresses: [
        {
          id: 'addr1',
          name: 'Home',
          street: '123 Fashion Avenue',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
          isDefault: true,
        },
        {
          id: 'addr2',
          name: 'Office',
          street: '456 Business Blvd',
          city: 'New York',
          state: 'NY',
          zipCode: '10002',
          country: 'United States',
          isDefault: false,
        },
      ],
      orders: [
        {
          id: 'ORD-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 548,
          items: 2,
          trackingNumber: 'LX1234567890',
        },
        {
          id: 'ORD-002',
          date: '2024-01-22',
          status: 'shipped',
          total: 789,
          items: 3,
          trackingNumber: 'LX0987654321',
        },
        {
          id: 'ORD-003',
          date: '2024-01-25',
          status: 'processing',
          total: 299,
          items: 1,
        },
      ],
    },
  },
  'sarah@luxe.com': {
    password: 'sarah123',
    user: {
      id: '2',
      email: 'sarah@luxe.com',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      phone: '+1 (555) 987-6543',
      joinedDate: '2023-08-20',
      wishlistCount: 12,
      addresses: [
        {
          id: 'addr3',
          name: 'Home',
          street: '789 Park Lane',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'United States',
          isDefault: true,
        },
      ],
      orders: [
        {
          id: 'ORD-004',
          date: '2024-01-10',
          status: 'delivered',
          total: 1299,
          items: 4,
          trackingNumber: 'LX1122334455',
        },
        {
          id: 'ORD-005',
          date: '2024-01-20',
          status: 'delivered',
          total: 459,
          items: 1,
          trackingNumber: 'LX5544332211',
        },
      ],
    },
  },
  'john@luxe.com': {
    password: 'john123',
    user: {
      id: '3',
      email: 'john@luxe.com',
      name: 'John Davis',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      phone: '+1 (555) 456-7890',
      joinedDate: '2023-12-01',
      wishlistCount: 3,
      addresses: [
        {
          id: 'addr4',
          name: 'Home',
          street: '321 Oak Street',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'United States',
          isDefault: true,
        },
      ],
      orders: [
        {
          id: 'ORD-006',
          date: '2024-01-18',
          status: 'shipped',
          total: 679,
          items: 2,
          trackingNumber: 'LX9988776655',
        },
      ],
    },
  },
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        const account = mockUsers[email.toLowerCase()]
        
        if (account && account.password === password) {
          set({
            user: account.user,
            isAuthenticated: true,
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...data },
          })
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
)