export interface Product {
  id: string
  slug: string
  name: string
  description: string
  fullDescription: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  sizes: string[]
  colors: Array<{ name: string; hex: string }>
  rating: number
  reviewCount: number
  inStock: boolean
  featured?: boolean
  new?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  selectedSize: string
  selectedColor: string
  product: Product
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface ShippingInfo {
  email: string
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
  saveInfo: boolean
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'apple'
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}

export interface FilterState {
  selectedCategories: string[]
  priceRange: [number, number]
  selectedSizes: string[]
  selectedColors: string[]
  sortBy: string
  searchQuery: string
}