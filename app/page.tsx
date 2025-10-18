'use client'

import { useEffect, useRef, useState } from 'react'
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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set loaded state
    setIsLoaded(true)

    const ctx = gsap.context(() => {
      // Hero animations - using autoAlpha instead of opacity for better control
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      
      heroTimeline
        .fromTo(
          titleRef.current,
          { y: 100, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, clearProps: 'all' }
        )
        .fromTo(
          subtitleRef.current,
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, clearProps: 'all' },
          '-=0.9'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, clearProps: 'all' },
          '-=0.7'
        )

      // Product cards animation - FIXED toggleActions
      gsap.fromTo(
        '.product-card',
        { y: 60, autoAlpha: 0 },
        {
          scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none none', // ✅ No reverse - stays visible
            once: false,
          },
          y: 0,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all', // ✅ Clear props after animation
        }
      )

      // Features animation - FIXED toggleActions
      gsap.fromTo(
        '.feature-card',
        { y: 40, autoAlpha: 0 },
        {
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none none', // ✅ No reverse
            once: false,
          },
          y: 0,
          autoAlpha: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all', // ✅ Clear props after animation
        }
      )
    }, heroRef)

    // Refresh ScrollTrigger after initial render
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(refreshTimer)
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()) // ✅ Proper cleanup
    }
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
    <div ref={heroRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80"
            alt="Hero Background"
            fill
            priority
            className="object-cover brightness-[0.35]"
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40 z-[1]" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1
            ref={titleRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl"
            style={{ opacity: isLoaded ? undefined : 1 }} // ✅ Fallback visibility
          >
            Elevate Your Style
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto drop-shadow-lg leading-relaxed"
            style={{ opacity: isLoaded ? undefined : 1 }} // ✅ Fallback visibility
          >
            Discover curated luxury fashion and timeless pieces crafted for the modern individual
          </p>
          <div 
            ref={ctaRef} 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ opacity: isLoaded ? undefined : 1 }} // ✅ Fallback visibility
          >
            <Link href="/products">
              <Button size="lg" className="group bg-white text-primary hover:bg-white/90 shadow-2xl">
                Shop Collection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/products?filter=new">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-xl backdrop-blur-sm"
              >
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="text-white drop-shadow-lg" size={32} />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-textPrimary">
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
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-display text-3xl font-bold mb-2 transform transition-transform duration-300 group-hover:-translate-y-2 drop-shadow-lg">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="font-medium">Shop Now</span>
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
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-textPrimary">
              Best Sellers
            </h2>
            <p className="text-textSecondary text-lg">
              Our most loved pieces this season
            </p>
          </div>

          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                style={{ opacity: 1 }} // ✅ Ensure visible by default
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products">
              <Button size="lg" variant="outline" className="min-w-[200px] border-2">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80"
            alt="Promotional banner"
            fill
            className="object-cover brightness-[0.3]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
              New Season Sale
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white drop-shadow-lg leading-relaxed">
              Up to 40% off on selected items. Limited time offer.
            </p>
            <Link href="/products?filter=sale">
              <Button 
                size="lg" 
                className="bg-accent text-white hover:bg-accentHover shadow-2xl hover:shadow-accent/50 transform hover:scale-105 transition-all duration-300"
              >
                Shop Sale
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 features-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card text-center p-10 rounded-2xl bg-white border-2 border-border hover:border-accent/30 hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center min-h-[300px]"
                style={{ opacity: 1 }} // ✅ Ensure visible by default
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <feature.icon className="text-accent" size={36} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-textPrimary">{feature.title}</h3>
                <p className="text-textSecondary leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
<section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute inset-0 opacity-[0.04]">
    <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accentHover rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
  </div>
  
  {/* Geometric pattern */}
  <div className="absolute inset-0 opacity-[0.02]">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)`,
      backgroundSize: '40px 40px'
    }} />
  </div>
  
  <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Badge */}
    <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6 border border-accent/20 backdrop-blur-sm">
      <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
      Newsletter
    </div>
    
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
      Stay in the Loop
    </h2>
    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
      Subscribe to get special offers, free giveaways, and exclusive updates delivered straight to your inbox
    </p>

    <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl border border-gray-200/60 hover:shadow-3xl transition-shadow duration-300">
        <input
          type="email"
          placeholder="Enter your email address"
          required
          className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-base text-gray-900 placeholder-gray-400 bg-transparent"
        />
        <Button
          type="submit"
          size="lg"
          className="bg-accent text-black hover:bg-accentHover shadow-lg hover:shadow-xl whitespace-nowrap rounded-xl transform hover:scale-105 transition-all duration-300"
        >
          Subscribe Now
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
        <Shield size={14} className="text-gray-400" />
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>

    {/* Social proof */}
    <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accentHover border-2 border-white" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-white" />
      </div>
      <span className="font-medium text-gray-700">Join 10,000+ subscribers</span>
    </div>
  </div>
</section>
    </div>
  )
}