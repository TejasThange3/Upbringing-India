import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Target, Eye, Heart, Award, Users, Globe, TrendingUp } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-industrial-dark via-industrial-gray to-industrial-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About Upbringing Technologies
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Leading the future of industrial innovation with engineering excellence and unwavering commitment to quality.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-4xl font-bold text-industrial-dark mb-6">
                  Company Overview
                </h2>
                <p className="text-lg text-industrial-gray leading-relaxed mb-4">
                  Upbringing Technologies stands as a premier provider of industrial solutions, combining engineering 
                  excellence with innovative technology. Since our establishment, we have been dedicated to delivering 
                  precision-engineered products and services that drive operational efficiency and manufacturing excellence.
                </p>
                <p className="text-lg text-industrial-gray leading-relaxed mb-4">
                  Our commitment to quality, reliability, and customer satisfaction has positioned us as a trusted partner 
                  for businesses across diverse industrial sectors. We leverage cutting-edge technology and deep industry 
                  expertise to solve complex challenges and deliver measurable results.
                </p>
                <p className="text-lg text-industrial-gray leading-relaxed">
                  With a team of experienced engineers and technical specialists, we provide end-to-end solutions from 
                  initial consultation through design, implementation, and ongoing support. Our global approach ensures 
                  that every solution meets international standards while addressing local market needs.
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { number: '17+', label: 'Years of Experience' },
                  { number: '500+', label: 'Projects Completed' },
                  { number: '200+', label: 'Happy Clients' },
                  { number: '50+', label: 'Expert Engineers' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                    <div className="text-sm text-industrial-gray">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-industrial-light">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-industrial-dark mb-4">Our Mission</h3>
                  <p className="text-industrial-gray leading-relaxed">
                    To deliver exceptional industrial solutions that empower businesses to achieve operational excellence 
                    and sustainable growth through innovation and engineering expertise.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-6">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-industrial-dark mb-4">Our Vision</h3>
                  <p className="text-industrial-gray leading-relaxed">
                    To be the global leader in industrial technology solutions, recognized for innovation, reliability, 
                    and transformative impact on manufacturing and industrial processes.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center mb-6">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-industrial-dark mb-4">Our Values</h3>
                  <p className="text-industrial-gray leading-relaxed">
                    Excellence, Integrity, Innovation, and Customer-Centricity guide every decision and action, ensuring 
                    we deliver value that exceeds expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-industrial-dark mb-12 text-center">
                Why Choose Upbringing Technologies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Award, title: 'Quality Excellence', desc: 'Rigorous quality control ensuring international standards' },
                  { icon: Users, title: 'Expert Team', desc: 'Experienced engineers and technical specialists' },
                  { icon: Globe, title: 'Global Standards', desc: 'International quality with local expertise' },
                  { icon: TrendingUp, title: 'Proven Results', desc: 'Track record of successful implementations' }
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-industrial-dark mb-2">{item.title}</h3>
                        <p className="text-industrial-gray">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

