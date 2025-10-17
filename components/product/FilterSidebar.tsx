'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { useFilterStore } from '@/lib/store/filter'
import { categories } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'
import Button from '@/components/ui/Button'

interface FilterSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export default function FilterSidebar({ isOpen = true, onClose, isMobile = false }: FilterSidebarProps) {
  const {
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    clearFilters,
  } = useFilterStore()

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sizes: true,
    colors: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Brown', hex: '#8B4513' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Beige', hex: '#F5F5DC' },
  ]

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    } else {
      setSelectedSizes([...selectedSizes, size])
    }
  }

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const FilterSection = ({ title, section, children }: { title: string; section: keyof typeof expandedSections; children: React.ReactNode }) => (
    <div className="border-b border-border pb-6">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full mb-4"
      >
        <h3 className="font-semibold text-textPrimary">{title}</h3>
        <ChevronDown
          size={20}
          className={cn(
            'transition-transform duration-300',
            expandedSections[section] && 'rotate-180'
          )}
        />
      </button>
      {expandedSections[section] && <div>{children}</div>}
    </div>
  )

  const content = (
    <div className={cn('bg-white', isMobile ? 'h-full overflow-y-auto' : 'sticky top-24')}>
      {isMobile && (
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
            <X size={24} />
          </button>
        </div>
      )}

      <div className={cn('space-y-6', isMobile ? 'p-6' : '')}>
        {/* Categories */}
        <FilterSection title="Categories" section="categories">
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category.name} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryToggle(category.name)}
                  className="w-5 h-5 rounded border-2 border-border text-accent focus:ring-2 focus:ring-accent cursor-pointer"
                />
                <span className="ml-3 text-sm text-textPrimary group-hover:text-accent transition-colors">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-accent"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">${priceRange[0]}</span>
              <span className="font-medium">${priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Sizes */}
        <FilterSection title="Sizes" section="sizes">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={cn(
                  'px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300',
                  selectedSizes.includes(size)
                    ? 'border-accent bg-accent text-white'
                    : 'border-border text-textPrimary hover:border-accent'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection title="Colors" section="colors">
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={cn(
                  'w-10 h-10 rounded-full border-2 transition-all duration-300',
                  selectedColors.includes(color.name)
                    ? 'border-accent scale-110 shadow-lg'
                    : 'border-border hover:scale-105'
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </FilterSection>

        {/* Clear Filters */}
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />
            <div className="absolute top-0 left-0 bottom-0 w-full max-w-sm bg-white animate-in slide-in-from-left">
              {content}
            </div>
          </div>
        )}
      </>
    )
  }

  return content
}