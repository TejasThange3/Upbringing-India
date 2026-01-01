'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Cog, 
  Settings, 
  Wrench, 
  Factory, 
  ArrowRight,
  Package
} from 'lucide-react'

const products = [
  {
    icon: Cog,
    title: 'Vacuum Systems',
    description: 'High-performance vacuum solutions engineered for reliability and efficiency in demanding industrial applications.',
    href: '/products/vacuum-systems',
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
  },
  {
    icon: Settings,
    title: 'Industrial Equipment',
    description: 'Comprehensive range of industrial machinery designed to optimize your manufacturing processes.',
    href: '/products/industrial-equipment',
    color: 'from-primary-500 to-primary-600',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80',
  },
  {
    icon: Wrench,
    title: 'Automation Solutions',
    description: 'Cutting-edge automation technology to streamline operations and enhance productivity.',
    href: '/products/automation',
    color: 'from-purple-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
  {
    icon: Factory,
    title: 'Engineering Services',
    description: 'Expert engineering consultation and custom solutions tailored to your specific requirements.',
    href: '/products/engineering-services',
    color: 'from-green-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80',
  },
  {
    icon: Package,
    title: 'Custom Manufacturing',
    description: 'Bespoke manufacturing services delivering precision-engineered components and systems.',
    href: '/products/custom-manufacturing',
    color: 'from-orange-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80',
  },
]

export default function ProductsSection() {
  return (
    <section className="py-20 bg-industrial-light gpu-accelerated">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-4">
            Our Products & Solutions
          </h2>
          <p className="text-xl text-industrial-gray max-w-2xl mx-auto">
            Comprehensive industrial solutions engineered for excellence and reliability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group"
              >
                <Link 
                  href={product.href}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-primary-200 group-hover:-translate-y-2 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-4 left-4 w-16 h-16 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-industrial-dark mb-3 group-hover:text-primary-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-industrial-gray mb-6 flex-grow">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

