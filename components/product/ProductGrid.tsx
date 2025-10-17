'use client'

import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { Product } from '@/types'
import { useFilterStore } from '@/lib/store/filter'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const view = useFilterStore((state) => state.view)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={
        view === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 product-grid'
          : 'flex flex-col gap-6'
      }
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            layout
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}