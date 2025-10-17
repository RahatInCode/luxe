import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LUXE - Premium Fashion & Lifestyle',
  description: 'Discover curated luxury fashion and lifestyle products',
  keywords: 'luxury fashion, premium clothing, designer brands, high-end fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-textPrimary">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}