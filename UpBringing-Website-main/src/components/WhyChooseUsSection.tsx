'use client'

import { motion } from 'framer-motion'
import { 
  Award, 
  Users, 
  Headphones, 
  Wrench, 
  Globe 
} from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'High Quality Standards',
    description: 'Rigorous quality control processes ensuring every product meets international standards and exceeds expectations.',
  },
  {
    icon: Users,
    title: 'Engineering Expertise',
    description: 'Decades of combined experience from our team of skilled engineers and technical specialists.',
  },
  {
    icon: Headphones,
    title: 'Reliable Support',
    description: 'Comprehensive after-sales support and maintenance services to keep your operations running smoothly.',
  },
  {
    icon: Wrench,
    title: 'Custom Solutions',
    description: 'Tailored engineering solutions designed specifically for your unique requirements and challenges.',
  },
  {
    icon: Globe,
    title: 'Global Quality Approach',
    description: 'International standards and best practices applied to deliver world-class industrial solutions.',
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-industrial-light to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64">
          <img 
            src="https://images.unsplash.com/photo-1581092918484-8313e1f6e825?w=400&q=80" 
            alt="Industrial equipment"
            className="w-full h-full object-cover rounded-full blur-sm"
          />
        </div>
        <div className="absolute bottom-10 right-10 w-64 h-64">
          <img 
            src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&q=80" 
            alt="Industrial machinery"
            className="w-full h-full object-cover rounded-full blur-sm"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-industrial-gray max-w-2xl mx-auto">
            Building trust through excellence, expertise, and unwavering commitment to quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-primary-200">
                  <div className="w-14 h-14 rounded-lg bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-industrial-dark mb-4 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-industrial-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

