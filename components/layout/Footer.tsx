import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    about: [
      { name: 'Our Story', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
    shop: [
      { name: 'Men\'s', href: '/products?category=mens' },
      { name: 'Women\'s', href: '/products?category=womens' },
      { name: 'Accessories', href: '/products?category=accessories' },
      { name: 'Sale', href: '/products?filter=sale' },
    ],
    help: [
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-primary text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">LUXE</h3>
            <p className="text-gray-300 mb-6">
              Curating premium fashion for the modern individual. Experience luxury in every stitch.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to get special offers and updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-gray-400 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accentHover text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} LUXE. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p className="text-sm text-gray-400">We accept:</p>
            <div className="flex space-x-3">
              {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((payment) => (
                <div
                  key={payment}
                  className="bg-white/10 px-3 py-1 rounded text-xs font-medium"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}