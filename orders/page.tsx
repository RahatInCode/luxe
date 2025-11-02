'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Package } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">
            When you place orders, they will appear here
          </p>
          <Button onClick={() => router.push('/products')} className="bg-accent text-black">
            Start Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}