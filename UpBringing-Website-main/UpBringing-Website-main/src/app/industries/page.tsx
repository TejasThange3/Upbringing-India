import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Factory, Car, Package, Pill, Printer, Cpu, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const industries = [
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Comprehensive solutions for manufacturing excellence, from production lines to quality control systems.',
    applications: [
      'Production automation',
      'Quality control systems',
      'Material handling',
      'Process optimization',
      'Equipment maintenance'
    ]
  },
  {
    icon: Car,
    name: 'Automotive',
    description: 'Precision components and systems for automotive manufacturing and assembly operations.',
    applications: [
      'Assembly line automation',
      'Component manufacturing',
      'Quality testing',
      'Supply chain solutions',
      'Aftermarket support'
    ]
  },
  {
    icon: Package,
    name: 'Packaging',
    description: 'Advanced packaging solutions and systems for efficient product packaging and distribution.',
    applications: [
      'Packaging machinery',
      'Filling systems',
      'Labeling solutions',
      'Conveyor systems',
      'Quality inspection'
    ]
  },
  {
    icon: Pill,
    name: 'Pharmaceuticals',
    description: 'Clean and precise solutions for pharmaceutical manufacturing, ensuring compliance and quality.',
    applications: [
      'Clean room systems',
      'Precision manufacturing',
      'Quality assurance',
      'Compliance solutions',
      'Sterilization systems'
    ]
  },
  {
    icon: Printer,
    name: 'Printing',
    description: 'Specialized equipment and solutions for printing industry applications.',
    applications: [
      'Printing machinery',
      'Color management',
      'Finishing systems',
      'Material handling',
      'Quality control'
    ]
  },
  {
    icon: Cpu,
    name: 'Industrial Automation',
    description: 'Smart automation solutions for modern industrial facilities and smart factories.',
    applications: [
      'PLC systems',
      'SCADA solutions',
      'IoT integration',
      'Data analytics',
      'Predictive maintenance'
    ]
  }
]

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-industrial-dark via-industrial-gray to-industrial-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Industries We Serve
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Delivering specialized solutions across diverse industrial sectors with deep industry expertise and proven track record.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 bg-industrial-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => {
                const Icon = industry.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h2 className="text-2xl font-bold text-industrial-dark mb-4 group-hover:text-primary-600 transition-colors">
                      {industry.name}
                    </h2>
                    <p className="text-industrial-gray mb-6 leading-relaxed">
                      {industry.description}
                    </p>
                    <div>
                      <h3 className="text-sm font-semibold text-industrial-dark mb-3">Key Applications:</h3>
                      <ul className="space-y-2">
                        {industry.applications.map((app, idx) => (
                          <li key={idx} className="text-sm text-industrial-gray flex items-start gap-2">
                            <span className="text-primary-600 mt-1">•</span>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us for Industries */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-industrial-dark mb-12 text-center">
                Why Industries Trust Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Industry Expertise', desc: 'Deep understanding of industry-specific challenges and requirements' },
                  { title: 'Proven Solutions', desc: 'Tested and validated solutions with successful implementations' },
                  { title: 'Custom Approach', desc: 'Tailored solutions designed for your specific operational needs' },
                  { title: 'Reliable Support', desc: 'Comprehensive support and maintenance services for long-term success' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-industrial-dark mb-2">{item.title}</h3>
                      <p className="text-industrial-gray">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Let's Discuss Your Industry Needs
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our experts are ready to help you find the right solutions for your industry.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Contact Industry Experts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

