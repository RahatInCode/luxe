'use client'

import { useState } from 'react'
import { SlidersHorizontal, Grid3x3, List } from 'lucide-react'
import { useFilterStore } from '@/lib/store/filter'
import { cn } from '@/lib/utils/cn'

interface ProductToolbarProps {
  totalProducts: number
  onFilterClick: () => void
}

export default function ProductToolbar({ totalProducts, onFilterClick }: ProductToolbarProps) {
  const { sortBy, setSortBy, view, setView } = useFilterStore()

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Best Rating' },
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {/* Results Count */}
      <div className="flex items-center gap-4">
        <button
          onClick={onFilterClick}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
        <p className="text-sm text-textSecondary">
          Showing <span className="font-semibold text-textPrimary">{totalProducts}</span> products
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* View Toggle */}
        <div className="hidden sm:flex items-center gap-2 border border-border rounded-lg p-1">
          <button
            onClick={() => setView('grid')}
            className={cn(
              'p-2 rounded transition-colors',
              view === 'grid' ? 'bg-accent text-black' : 'text-textSecondary hover:text-accent'
            )}
          >
            <Grid3x3 size={18} />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn(
              'p-2 rounded transition-colors',
              view === 'list' ? 'bg-accent text-black' : 'text-textSecondary hover:text-accent'
            )}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}