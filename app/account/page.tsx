// app/account/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/store/user'
import { motion } from 'framer-motion'
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Settings,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Swal from 'sweetalert2'

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: 'Are you sure you want to sign out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Signed Out',
          text: 'You have been successfully signed out.',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900">My Account</h1>
              <p className="text-gray-600 font-light mt-1">
                Manage your orders and account settings
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Profile */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-black text-black rounded-full flex items-center justify-center text-3xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <a
                  href="#overview"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-black bg-gray-100 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  Overview
                </a>
                <a
                  href="#orders"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Orders
                </a>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                  {user.wishlistCount > 0 && (
                    <span className="ml-auto bg-red-500 text-black text-xs px-2 py-0.5 rounded-full">
                      {user.wishlistCount}
                    </span>
                  )}
                </Link>
                <a
                  href="#addresses"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  Addresses
                </a>
                <a
                  href="#settings"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Stats Cards */}
            <div id="overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {user.orders.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-black text-black rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {user.wishlistCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-500 text-black rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      ${user.orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Orders */}
            <motion.div
              id="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {user.orders.map((order) => (
                  <div key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-semibold text-gray-900">Order {order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${order.total}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      {order.trackingNumber && (
                        <p className="text-xs text-gray-500">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <button className="text-sm font-medium text-black hover:underline">
                  View All Orders →
                </button>
              </div>
            </motion.div>

            {/* Saved Addresses */}
            <motion.div
              id="addresses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                <button className="px-4 py-2 bg-black text-black text-sm rounded-lg hover:bg-gray-800 transition-colors">
                  Add New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors relative"
                  >
                    {address.isDefault && (
                      <span className="absolute top-2 right-2 bg-black text-black text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{address.name}</p>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-sm text-gray-600">{address.country}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="text-xs text-black hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-xs text-red-600 hover:underline">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}