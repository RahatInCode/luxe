'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { products } from '@/lib/data/products'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(products.slice(0, 5))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered.slice(0, 8))
    } else {
      setResults(products.slice(0, 5))
    }
  }, [query])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-3xl mx-auto mt-20 px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b border-border p-4">
            <Search className="text-textSecondary" size={24} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 ml-4 text-lg outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[500px] overflow-y-auto p-4">
            {query && results.length === 0 ? (
              <p className="text-center py-8 text-textSecondary">
                No products found for `{query}`
              </p>
            ) : (
              <>
                <p className="text-sm text-textSecondary mb-4">
                  {query ? `${results.length} results` : 'Trending searches'}
                </p>
                <div className="space-y-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-textSecondary truncate">
                          {product.category}
                        </p>
                      </div>
                      <p className="font-semibold">${product.price}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}