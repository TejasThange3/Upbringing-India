'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

export default function AboutUsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-5 pointer-events-none hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1581092918484-8313e1f6e825?w=800&q=80" 
          alt="Industrial background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-industrial-dark mb-4">
              About Upbringing Technologies
            </h2>
            <p className="text-xl text-industrial-gray">
              Leading the future of industrial innovation
            </p>
          </div>

          <div className="space-y-12">
            {/* Company Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              <h3 className="text-2xl font-bold text-industrial-dark mb-4">
                Company Overview
              </h3>
              <p className="text-industrial-gray leading-relaxed mb-4">
                Upbringing Technologies stands as a premier provider of industrial solutions, 
                combining engineering excellence with innovative technology. Since our establishment, 
                we have been dedicated to delivering precision-engineered products and services 
                that drive operational efficiency and manufacturing excellence.
              </p>
              <p className="text-industrial-gray leading-relaxed">
                Our commitment to quality, reliability, and customer satisfaction has positioned us 
                as a trusted partner for businesses across diverse industrial sectors. We leverage 
                cutting-edge technology and deep industry expertise to solve complex challenges 
                and deliver measurable results.
              </p>
            </motion.div>

            {/* Mission, Vision, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-industrial-light rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-industrial-dark mb-3">Our Mission</h3>
                <p className="text-industrial-gray">
                  To deliver exceptional industrial solutions that empower businesses to achieve 
                  operational excellence and sustainable growth through innovation and engineering expertise.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-industrial-light rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-industrial-dark mb-3">Our Vision</h3>
                <p className="text-industrial-gray">
                  To be the global leader in industrial technology solutions, recognized for 
                  innovation, reliability, and transformative impact on manufacturing and industrial processes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-industrial-light rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-industrial-dark mb-3">Our Values</h3>
                <p className="text-industrial-gray">
                  Excellence, Integrity, Innovation, and Customer-Centricity guide every decision 
                  and action, ensuring we deliver value that exceeds expectations.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

