'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/product/ProductGrid'
import FilterSidebar from '@/components/product/FilterSidebar'
import ProductToolbar from '@/components/product/ProductToolbar'
import { products } from '@/lib/data/products'
import { useFilterStore } from '@/lib/store/filter'

// Separate component to handle searchParams
function ProductsContent() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const searchParams = useSearchParams()

  const {
    selectedCategories,
    priceRange,
    selectedSizes,
    selectedColors,
    sortBy,
    searchQuery,
  } = useFilterStore()

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      )
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      )
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color.name))
      )
    }

    // Search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // URL params (for category links)
    const categoryParam = searchParams?.get('category')
    if (categoryParam) {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(categoryParam.toLowerCase())
      )
    }

    const filterParam = searchParams?.get('filter')
    if (filterParam === 'new') {
      filtered = filtered.filter((p) => p.new)
    } else if (filterParam === 'sale') {
      filtered = filtered.filter((p) => p.compareAtPrice)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [
    selectedCategories,
    priceRange,
    selectedSizes,
    selectedColors,
    sortBy,
    searchQuery,
    searchParams,
  ])

  // Get page title
  const getPageTitle = () => {
    const filter = searchParams?.get('filter')
    const category = searchParams?.get('category')
    
    if (filter === 'new') return 'New Arrivals'
    if (filter === 'sale') return 'Sale'
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection`
    return 'All Products'
  }

  return (
    <div className="min-h-screen bg-backgroundGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-textSecondary text-lg">
            Discover our curated collection of premium products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ProductToolbar
              totalProducts={filteredProducts.length}
              onFilterClick={() => setIsMobileFilterOpen(true)}
            />

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-textSecondary mb-6">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}

            {/* Pagination - Mock */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button 
                    className="px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Previous
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === 1
                          ? 'bg-accent text-white'
                          : 'border border-border hover:border-accent'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        isMobile={true}
      />
    </div>
  )
}

// Main component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-backgroundGray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-textSecondary">Loading products...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}