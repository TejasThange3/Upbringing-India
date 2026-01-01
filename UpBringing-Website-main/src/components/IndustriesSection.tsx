'use client'

import { motion } from 'framer-motion'
import { 
  Factory, 
  Car, 
  Package, 
  Pill, 
  Printer, 
  Cpu 
} from 'lucide-react'

const industries = [
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Comprehensive solutions for manufacturing excellence',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&q=80',
  },
  {
    icon: Car,
    name: 'Automotive',
    description: 'Precision components for automotive industry',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
  },
  {
    icon: Package,
    name: 'Packaging',
    description: 'Advanced packaging solutions and systems',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
  },
  {
    icon: Pill,
    name: 'Pharmaceuticals',
    description: 'Clean and precise solutions for pharma',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80',
  },
  {
    icon: Printer,
    name: 'Printing',
    description: 'Specialized equipment for printing industry',
    image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=400&q=80',
  },
  {
    icon: Cpu,
    name: 'Industrial Automation',
    description: 'Smart automation for modern facilities',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  },
]

export default function IndustriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-industrial-gray max-w-2xl mx-auto">
            Delivering specialized solutions across diverse industrial sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="group"
              >
                <div className="bg-industrial-light rounded-xl overflow-hidden hover:bg-primary-50 transition-all duration-300 border border-transparent hover:border-primary-200 cursor-pointer h-full flex flex-col group-hover:shadow-lg relative">
                  {/* Background Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={industry.image} 
                      alt={industry.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/60 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-6 text-center flex flex-col items-center justify-center flex-1">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors -mt-14 relative z-10 border-4 border-white shadow-lg">
                      <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-industrial-dark mb-2 group-hover:text-primary-600 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-industrial-gray">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

