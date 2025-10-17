'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useWishlistStore } from '@/lib/store/wishlist'
import { cn } from '@/lib/utils/cn'
import SearchModal from './SearchModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const { openCart, getItemCount } = useCartStore()
  const wishlistCount = useWishlistStore((state) => state.getCount())
  const cartCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

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
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl font-bold tracking-wider hover:opacity-80 transition-opacity"
            >
              LUXE
            </Link>

            {/* Desktop Navigation */}
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

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                className="hidden md:block p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
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
            </nav>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div className={cn(isScrolled ? 'h-20' : 'h-24')} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}