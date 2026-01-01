import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProductsSection from '@/components/ProductsSection'
import IndustriesSection from '@/components/IndustriesSection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'
import AboutUsSection from '@/components/AboutUsSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <HeroSection />
        <ProductsSection />
        <IndustriesSection />
        <WhyChooseUsSection />
        <AboutUsSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}

