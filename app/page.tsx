'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Shield, HeadphonesIcon, ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/lib/data/products'
import Swal from 'sweetalert2'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })

      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power4.out',
      })

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power4.out',
      })

      // Product cards animation
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: '.product-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
      })
    })

    return () => ctx.revert()
  }, [])

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6)
  
  const categories = [
    {
      name: "Men's Collection",
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800',
      href: '/products?category=mens',
    },
    {
      name: "Women's Collection",
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
      href: '/products?category=womens',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
      href: '/products?category=accessories',
    },
  ]

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment guaranteed',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Dedicated customer support',
    },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    Swal.fire({
      icon: 'success',
      title: 'Subscribed!',
      text: 'Thank you for subscribing to our newsletter',
      confirmButtonText: 'Great!',
      confirmButtonColor: '#6366F1',
    })
  }

  return (
    <div>
{/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80"
      alt="Hero Background"
      fill
      priority
      className="object-cover brightness-50"
      sizes="100vw"
    />
  </div>
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30 z-[1]" />
  
  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <h1
      ref={titleRef}
      className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
    >
      Elevate Your Style
    </h1>
    <p
      ref={subtitleRef}
      className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
    >
      Discover curated luxury fashion and timeless pieces crafted for the modern individual
    </p>
    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/products">
        <Button size="lg" className="group bg-white text-primary hover:bg-white/90">
          Shop Collection
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </Button>
      </Link>
      <Link href="/products?filter=new">
        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
          New Arrivals
        </Button>
      </Link>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
    <ChevronDown className="text-white" size={32} />
  </div>
</section>

      {/* Featured Categories */}
<section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-16">
    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
      Shop by Category
    </h2>
    <p className="text-textSecondary text-lg">
      Explore our curated collections
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {categories.map((category) => (
      <Link
        key={category.name}
        href={category.href}
        className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="font-display text-3xl font-bold mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">
            {category.name}
          </h3>
          <div className="flex items-center gap-2 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <span>Shop Now</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* Best Sellers */}
<section className="py-20 md:py-28 bg-backgroundGray">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
        Best Sellers
      </h2>
      <p className="text-textSecondary text-lg">
        Our most loved pieces this season
      </p>
    </div>

    <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    <div className="text-center mt-16">
      <Link href="/products">
        <Button size="lg" variant="outline" className="min-w-[200px]">
          View All Products
        </Button>
      </Link>
    </div>
  </div>
</section>

      {/* Promotional Banner */}
<section className="relative py-28 md:py-36 overflow-hidden">
  <div className="absolute inset-0">
    <Image
      src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80"
      alt="Promotional banner"
      fill
      className="object-cover"
      sizes="100vw"
    />
    {/* Darker Overlay for better contrast */}
    <div className="absolute inset-0 bg-black/60" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl">
      <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
        New Season Sale
      </h2>
      <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
        Up to 40% off on selected items. Limited time offer.
      </p>
      <Link href="/products?filter=sale">
        <Button 
          size="lg" 
          className="bg-accent text-white hover:bg-accentHover shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          Shop Sale
        </Button>
      </Link>
    </div>
  </div>
</section>

      {/* Features */}
<section className="py-20 md:py-28 features-section">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-card text-center p-8 rounded-2xl bg-white border border-border hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[280px]"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
            <feature.icon className="text-accent" size={36} />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-textSecondary leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-accent to-accentHover">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-black mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get special offers, free giveaways, and updates
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-accent hover:bg-white/90"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}