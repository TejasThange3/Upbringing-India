import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Cog, Settings, Wrench, Factory, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    icon: Cog,
    title: 'Vacuum Systems',
    description: 'High-performance vacuum solutions engineered for reliability and efficiency in demanding industrial applications. Our vacuum systems are designed to meet the most stringent requirements across various industries.',
    features: [
      'Oil-lubricated rotary vane pumps',
      'Dry running vacuum pumps',
      'High vacuum systems',
      'Custom vacuum solutions',
      'Maintenance and support services'
    ],
    href: '/products/vacuum-systems',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Settings,
    title: 'Industrial Equipment',
    description: 'Comprehensive range of industrial machinery designed to optimize your manufacturing processes. From standard equipment to custom-engineered solutions.',
    features: [
      'Manufacturing equipment',
      'Process machinery',
      'Material handling systems',
      'Quality control equipment',
      'Industrial automation components'
    ],
    href: '/products/industrial-equipment',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Wrench,
    title: 'Automation Solutions',
    description: 'Cutting-edge automation technology to streamline operations and enhance productivity. Integrated solutions for modern industrial facilities.',
    features: [
      'PLC systems',
      'SCADA solutions',
      'Robotic automation',
      'IoT integration',
      'Smart factory solutions'
    ],
    href: '/products/automation',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Factory,
    title: 'Engineering Services',
    description: 'Expert engineering consultation and custom solutions tailored to your specific requirements. From design to implementation and support.',
    features: [
      'Engineering consultation',
      'Custom design services',
      'Project management',
      'Technical support',
      'Training and documentation'
    ],
    href: '/products/engineering-services',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Package,
    title: 'Custom Manufacturing',
    description: 'Bespoke manufacturing services delivering precision-engineered components and systems. Quality craftsmanship meeting international standards.',
    features: [
      'Custom component manufacturing',
      'Precision machining',
      'Assembly services',
      'Quality assurance',
      'Prototype development'
    ],
    href: '/products/custom-manufacturing',
    color: 'from-orange-500 to-orange-600',
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-industrial-dark via-industrial-gray to-industrial-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our Products & Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive industrial solutions engineered for excellence, reliability, and performance across diverse applications.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-industrial-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const Icon = product.icon
                return (
                  <div
                    key={product.title}
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-primary-200 group-hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-industrial-dark mb-3 group-hover:text-primary-600 transition-colors">
                      {product.title}
                    </h2>
                    <p className="text-industrial-gray mb-6 flex-grow">
                      {product.description}
                    </p>
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-industrial-dark mb-3">Key Features:</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-industrial-gray flex items-start gap-2">
                            <span className="text-primary-600 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-industrial-dark mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-industrial-gray mb-8 max-w-2xl mx-auto">
              Our engineering team can design and deliver custom solutions tailored to your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Our Experts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

