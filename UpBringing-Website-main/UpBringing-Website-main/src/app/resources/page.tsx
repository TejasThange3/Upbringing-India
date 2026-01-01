import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, Download, BookOpen, Video, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const resources = [
  {
    icon: FileText,
    title: 'Product Catalogs',
    description: 'Comprehensive product catalogs with detailed specifications and technical information.',
    type: 'PDF',
    size: '2.5 MB'
  },
  {
    icon: BookOpen,
    title: 'Technical Documentation',
    description: 'Detailed technical documentation, installation guides, and operation manuals.',
    type: 'PDF',
    size: '1.8 MB'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video tutorials for installation, operation, and maintenance.',
    type: 'Video',
    size: '15 min'
  },
  {
    icon: FileText,
    title: 'Case Studies',
    description: 'Real-world case studies showcasing successful implementations and results.',
    type: 'PDF',
    size: '3.2 MB'
  },
  {
    icon: BookOpen,
    title: 'White Papers',
    description: 'In-depth white papers on industry trends, technologies, and best practices.',
    type: 'PDF',
    size: '2.1 MB'
  },
  {
    icon: FileText,
    title: 'Application Guides',
    description: 'Industry-specific application guides and solution recommendations.',
    type: 'PDF',
    size: '1.5 MB'
  }
]

const blogPosts = [
  {
    title: 'Understanding Vacuum Pump Selection for Industrial Applications',
    excerpt: 'A comprehensive guide to selecting the right vacuum pump for your industrial needs.',
    date: 'March 15, 2024',
    category: 'Technical'
  },
  {
    title: 'Automation Trends in Modern Manufacturing',
    excerpt: 'Exploring the latest trends and technologies shaping the future of manufacturing.',
    date: 'March 10, 2024',
    category: 'Industry Insights'
  },
  {
    title: 'Maintenance Best Practices for Industrial Equipment',
    excerpt: 'Essential maintenance strategies to maximize equipment lifespan and performance.',
    date: 'March 5, 2024',
    category: 'Maintenance'
  }
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-industrial-dark via-industrial-gray to-industrial-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Resources & Documentation
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Access comprehensive resources, documentation, and educational materials to support your operations.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20 bg-industrial-light">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-industrial-dark mb-12 text-center">
              Downloadable Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 group hover:-translate-y-2"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-industrial-dark group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                    </div>
                    <p className="text-industrial-gray mb-4 text-sm leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-industrial-gray">
                        {resource.type} • {resource.size}
                      </span>
                      <button className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm group-hover:gap-2 transition-all">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Blog/Articles Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-industrial-dark mb-12 text-center">
              Latest Articles & Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-industrial-light rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary-200"
                >
                  <div className="text-xs text-primary-600 font-semibold mb-2">{post.category}</div>
                  <h3 className="text-xl font-bold text-industrial-dark mb-3">
                    {post.title}
                  </h3>
                  <p className="text-industrial-gray mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-industrial-gray">{post.date}</span>
                    <Link
                      href="/blogs"
                      className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Need Additional Support?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our technical team is available to assist with any questions or provide additional resources.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Contact Support Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

