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
      { name: "Men's", href: '/products?category=mens' },
      { name: "Women's", href: '/products?category=womens' },
      { name: 'Accessories', href: '/products?category=accessories' },
      { name: 'Sale', href: '/products?filter=sale' },
    ],
    help: [
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'FAQs', href: '/faqs' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-white text-black mt-auto relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-6 text-black">
              LUXE
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-base">
              Curating premium fashion for the modern individual. Experience
              luxury in every stitch.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gray-800 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/50"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-black">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-black">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gray-600 hover:translate-x-1 transition-all inline-block text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-black">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © {currentYear} LUXE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">We accept:</p>
            <div className="flex gap-3">
              {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((payment) => (
                <div
                  key={payment}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors duration-200"
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