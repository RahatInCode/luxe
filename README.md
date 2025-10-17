# LUXE - Premium Ecommerce Website

A modern, high-performance ecommerce website built with Next.js 15, featuring smooth animations, premium UI/UX, and complete shopping functionality.

![LUXE](https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 Design & UI
- **Premium Design**: Luxury-focused aesthetic with custom typography (Inter + Playfair Display)
- **Smooth Animations**: GSAP-powered scroll animations and micro-interactions
- **Responsive**: Mobile-first design, perfect on all devices
- **Modern UI Components**: Custom-built, accessible components

### 🛍️ Ecommerce Features
- **Product Catalog**: Browse 20+ premium products across multiple categories
- **Advanced Filtering**: Filter by category, price, size, color, and more
- **Product Details**: High-quality images, zoom functionality, reviews
- **Shopping Cart**: Real-time cart updates with slide-out drawer
- **Wishlist**: Save favorite items for later
- **Checkout Flow**: Multi-step checkout with validation
- **Order Confirmation**: Beautiful success page with order details

### ⚡ Performance
- **Next.js 15**: Latest App Router with server components
- **Image Optimization**: Next.js Image component with Sharp
- **State Management**: Zustand for efficient global state
- **Code Splitting**: Automatic route-based splitting
- **SEO Optimized**: Proper metadata and semantic HTML

### 🎭 Animations
- **GSAP**: Smooth scroll-triggered animations
- **Framer Motion**: Page transitions and layout animations
- **Micro-interactions**: Hover effects, magnetic buttons
- **Loading States**: Skeleton screens and spinners
- **Confetti**: Celebration animation on order success

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/luxe.git
cd luxe
Install dependencies
Bash

npm install
# or
yarn install
Run the development server
Bash

npm run dev
# or
yarn dev
Open your browser
Navigate to http://localhost:3000
📁 Project Structure
text

luxe/
├── app/
│   ├── (root)/
│   │   ├── page.tsx              # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx          # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Product detail
│   │   ├── checkout/
│   │   │   └── page.tsx          # Checkout flow
│   │   └── success/
│   │       └── page.tsx          # Order confirmation
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── layout/                   # Header, Footer, Nav
│   ├── product/                  # Product-related components
│   ├── cart/                     # Shopping cart
│   └── checkout/                 # Checkout components
├── lib/
│   ├── store/                    # Zustand stores
│   ├── data/                     # Mock data
│   └── utils/                    # Utility functions
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript definitions
└── public/                       # Static assets
🛠️ Tech Stack
Framework: Next.js 15 (App Router)
Language: TypeScript
Styling: Tailwind CSS
Animations: GSAP, Framer Motion
State Management: Zustand
Forms: React Hook Form + Zod
Icons: Lucide React
Alerts: SweetAlert2
Carousels: Swiper
Image Optimization: Sharp
📦 Key Dependencies
JSON

{
  "next": "15.0.0",
  "react": "^18.2.0",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.4.1",
  "gsap": "^3.12.5",
  "framer-motion": "^11.0.3",
  "zustand": "^4.5.0",
  "react-hook-form": "^7.49.3",
  "zod": "^3.22.4",
  "sweetalert2": "^11.10.5",
  "swiper": "^11.0.6",
  "lucide-react": "^0.323.0"
}
🎯 Usage Examples
Adding a Product to Cart
TypeScript

import { useCartStore } from '@/lib/store/cart'

const { addItem } = useCartStore()

addItem(product, selectedSize, selectedColor, quantity)
Filtering Products
TypeScript

import { useFilterStore } from '@/lib/store/filter'

const { setSelectedCategories, setPriceRange } = useFilterStore()

setSelectedCategories(['Men\'s'])
setPriceRange([0, 500])
Using Animations
TypeScript

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const elementRef = useScrollAnimation({
  y: 60,
  opacity: 0,
  duration: 0.8
})

return <div ref={elementRef}>Animated Content</div>
🎨 Customization
Colors
Edit tailwind.config.ts to customize the color palette:

TypeScript

colors: {
  primary: '#0A0A0A',
  accent: '#6366F1',
  // Add your colors
}
Fonts
Update fonts in app/layout.tsx:

TypeScript

import { YourFont } from 'next/font/google'

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
})
Products
Add or modify products in lib/data/products.ts:

TypeScript

export const products: Product[] = [
  {
    id: '1',
    slug: 'your-product',
    name: 'Your Product',
    // ... product details
  }
]
📱 Responsive Breakpoints
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px - 1280px
Large Desktop: > 1280px
🔧 Build & Deployment
Build for Production
Bash

npm run build
npm run start
Deploy to Vercel
Bash

vercel
Environment Variables
Create a .env.local file:

env

NEXT_PUBLIC_APP_NAME=LUXE
NEXT_PUBLIC_APP_URL=https://yourdomain.com
📈 Performance Optimization
✅ Image optimization with Next.js Image
✅ Lazy loading for below-the-fold content
✅ Code splitting per route
✅ Debounced search and filters
✅ Optimized animations with GPU acceleration
✅ Persistent cart with localStorage
🎭 Animation Features
Scroll Animations: Products fade in as you scroll
Page Transitions: Smooth transitions between pages
Magnetic Buttons: Buttons follow cursor on hover
Product Hover: Images scale and overlay appears
Cart Drawer: Slides in from right with backdrop
Confetti: Celebration on order success
Loading States: Skeleton screens while loading
🛡️ Form Validation
All forms use Zod schema validation:

TypeScript

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  // ... more fields
})
🎁 Easter Eggs
Click the logo 5 times for a surprise
Konami code (↑↑↓↓←→←→BA) for special animation
Hidden discount code in footer
📝 License
MIT License - feel free to use this project for your portfolio or client work

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📧 Contact
For questions or support, reach out at: your.email@example.com

🙏 Acknowledgments
Images from Unsplash
Icons from Lucide
Fonts from Google Fonts
Built with ❤️ using Next.js 15