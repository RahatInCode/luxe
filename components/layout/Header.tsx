// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, User, Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useWishlistStore } from '@/lib/store/wishlist'
import { useUserStore } from '@/lib/store/user' // ✅ ADD THIS
import { cn } from '@/lib/utils/cn'
import SearchModal from './SearchModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { openCart, getItemCount } = useCartStore()
  const wishlistCount = useWishlistStore((state) => state.getCount())
  const { user, isAuthenticated } = useUserStore() // ✅ ADD THIS
  const cartCount = getItemCount()

  // Ensure counts are numbers and handle display
  const cartNumber = typeof cartCount === 'number' ? cartCount : 0
  const wishNumber = typeof wishlistCount === 'number' ? wishlistCount : 0
  
  const displayCart = cartNumber > 99 ? '99+' : String(cartNumber)
  const displayWish = wishNumber > 99 ? '99+' : String(wishNumber)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Sale', href: '/products?filter=sale' },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-4'
            : 'bg-white py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              href="/"
              className="font-display text-2xl md:text-3xl font-bold tracking-wider hover:opacity-80 transition-opacity"
            >
              LUXE
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-textPrimary hover:text-accent transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* ✅ REPLACE THIS SECTION */}
              {isAuthenticated && user ? (
                <Link
                  href="/account"
                  className="relative p-2 hover:bg-secondary rounded-lg transition-colors group hidden md:block"
                  aria-label="Account"
                  title={user.name}
                >
                  {user.avatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-all">
                      <Image 
                        src={user.avatar} 
                        alt={user.name} 
                        width={32} 
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-black text-black rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-accent group-hover:text-black transition-all">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:block p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Login"
                >
                  <User size={20} />
                </Link>
              )}
              {/* ✅ END REPLACE */}

              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishNumber > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-accent text-black text-[10px] font-bold rounded-full shadow-lg">
                    {displayWish}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {cartNumber > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-accent text-black text-[10px] font-bold rounded-full shadow-lg">
                    {displayCart}
                  </span>
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-textPrimary hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* ✅ ADD MOBILE LOGIN/ACCOUNT LINK */}
              <div className="pt-4 border-t border-border mt-4">
                {isAuthenticated && user ? (
                  <Link
                    href="/account"
                    className="flex items-center gap-3 py-2 text-sm font-medium text-textPrimary hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user.avatar ? (
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image 
                          src={user.avatar} 
                          alt={user.name} 
                          width={24} 
                          height={24}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-black text-black rounded-full flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 py-2 text-sm font-medium text-textPrimary hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <div className={cn(isScrolled ? 'h-20' : 'h-24')} />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}