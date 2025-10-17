import { create } from 'zustand'
import { FilterState } from '@/types'

interface FilterStore extends FilterState {
  view: 'grid' | 'list'
  setSelectedCategories: (categories: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setSelectedSizes: (sizes: string[]) => void
  setSelectedColors: (colors: string[]) => void
  setSortBy: (sortBy: string) => void
  setSearchQuery: (query: string) => void
  setView: (view: 'grid' | 'list') => void
  clearFilters: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategories: [],
  priceRange: [0, 1000],
  selectedSizes: [],
  selectedColors: [],
  sortBy: 'featured',
  searchQuery: '',
  view: 'grid',

  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSelectedSizes: (sizes) => set({ selectedSizes: sizes }),
  setSelectedColors: (colors) => set({ selectedColors: colors }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setView: (view) => set({ view }),

  clearFilters: () =>
    set({
      selectedCategories: [],
      priceRange: [0, 1000],
      selectedSizes: [],
      selectedColors: [],
      sortBy: 'featured',
      searchQuery: '',
    }),
}))