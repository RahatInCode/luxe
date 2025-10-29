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
  saveInfo?: boolean
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'apple'
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}
export interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  description: string
  fullDescription?: string
  images: string[]
  category: string
  colors: { name: string; hex: string }[]
  sizes: string[]
  rating: number
  reviewCount: number
  featured?: boolean 
  inStock: boolean
  new?: boolean
}


export interface CartItem {
  productId: string
  product: Product
  selectedSize: string
  selectedColor: string
  quantity: number
}