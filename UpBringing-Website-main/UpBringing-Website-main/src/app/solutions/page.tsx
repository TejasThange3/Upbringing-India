import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const solutions = [
  {
    title: 'Vacuum Solutions',
    description: 'Complete vacuum system solutions for industrial applications including food processing, pharmaceuticals, packaging, and manufacturing.',
    benefits: [
      'Improved process efficiency',
      'Energy optimization',
      'Reliable performance',
      'Customized configurations',
      'Comprehensive support'
    ]
  },
  {
    title: 'Automation & Control',
    description: 'Integrated automation solutions that streamline operations, reduce costs, and enhance productivity across your facility.',
    benefits: [
      'Process optimization',
      'Real-time monitoring',
      'Reduced downtime',
      'Scalable architecture',
      'Expert implementation'
    ]
  },
  {
    title: 'Engineering Consulting',
    description: 'Expert engineering services from concept to completion, ensuring optimal design and implementation of industrial systems.',
    benefits: [
      'Technical expertise',
      'Custom design solutions',
      'Project management',
      'Quality assurance',
      'Ongoing support'
    ]
  },
  {
    title: 'Maintenance & Support',
    description: 'Comprehensive maintenance programs and technical support to keep your equipment running at peak performance.',
    benefits: [
      'Preventive maintenance',
      '24/7 technical support',
      'Spare parts availability',
      'Training programs',
      'Performance optimization'
    ]
  }
]

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-industrial-dark via-industrial-gray to-industrial-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Industrial Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive solutions designed to optimize your operations, enhance efficiency, and drive business growth.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-industrial-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
                >
                  <h2 className="text-2xl font-bold text-industrial-dark mb-4">
                    {solution.title}
                  </h2>
                  <p className="text-industrial-gray mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  <div>
                    <h3 className="text-sm font-semibold text-industrial-dark mb-3">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-industrial-gray">
                          <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-industrial-dark mb-12 text-center">
                Our Solution Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Consultation', desc: 'Understanding your requirements' },
                  { step: '02', title: 'Design', desc: 'Custom solution development' },
                  { step: '03', title: 'Implementation', desc: 'Professional installation' },
                  { step: '04', title: 'Support', desc: 'Ongoing maintenance & support' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-industrial-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-industrial-gray">{item.desc}</p>
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
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our solutions can help optimize your industrial processes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

