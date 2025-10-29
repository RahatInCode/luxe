// app/api/products/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/data/products'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ids } = body

    // Validate input
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: 'Invalid request: ids must be an array' },
        { status: 400 }
      )
    }

    // Filter products by wishlist IDs
    const wishlistProducts = products.filter((product) =>
      ids.includes(product.id)
    )

    // Return products with all their properties
    return NextResponse.json(wishlistProducts, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Wishlist API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist products' },
      { status: 500 }
    )
  }
}

// Optional: Add GET endpoint for debugging
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method with { ids: string[] } to fetch wishlist products',
    example: { ids: ['1', '2', '3'] },
  })
}