// app/login/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/store/user'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

  const { login, isAuthenticated } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account')
    }
  }, [isAuthenticated, router])

  const testAccounts = [
    {
      email: 'demo@luxe.com',
      password: 'demo123',
      name: 'Alex Morgan',
      description: 'Regular customer with multiple orders',
    },
    {
      email: 'sarah@luxe.com',
      password: 'sarah123',
      name: 'Sarah Johnson',
      description: 'VIP customer with extensive history',
    },
    {
      email: 'john@luxe.com',
      password: 'john123',
      name: 'John Davis',
      description: 'New customer with recent orders',
    },
  ]

  const handleTestAccount = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
    setSelectedAccount(testEmail)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = login(email, password)

    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'Logging you in...',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push('/account')
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try one of the test accounts.',
        confirmButtonColor: '#000000',
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-4xl font-bold tracking-wider mb-4">
              <ShoppingBag className="w-10 h-10" />
              LUXE
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-light">Premium Shopping Experience</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
            Welcome Back to
            <br />
            <span className="font-bold">Your Style Journey</span>
          </h1>

          <p className="text-gray-600 text-lg font-light mb-8">
            Access your personalized dashboard, track orders, manage wishlist, and enjoy exclusive member benefits.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-black text-black rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Order Tracking</h3>
                <p className="text-sm text-gray-600 font-light">
                  Real-time updates on all your orders
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-black text-black rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Saved Preferences</h3>
                <p className="text-sm text-gray-600 font-light">
                  Your wishlist and addresses securely stored
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-black text-black rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Exclusive Offers</h3>
                <p className="text-sm text-gray-600 font-light">
                  Members-only deals and early access
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold tracking-wider mb-2">
              <ShoppingBag className="w-8 h-8" />
              LUXE
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-light text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 font-light">Access your account</p>
          </div>

          {/* Test Accounts Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-5 h-5 bg-blue-500 text-black rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                i
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  Demo Mode - Click to Use Test Account
                </p>
                <p className="text-xs text-blue-700 font-light">
                  No real authentication required. Your privacy is protected.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {testAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleTestAccount(account.email, account.password)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedAccount === account.email
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-blue-200 bg-white hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-600">{account.email}</p>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {account.password}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-light">
                    {account.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="demo@luxe.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="demo123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-black focus:ring-black"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-black hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-black py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login (Mock) */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-black hover:underline">
              Sign up for free
            </Link>
          </p>

          {/* Back to Store */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Store
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}