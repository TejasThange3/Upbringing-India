import Header from "../components/Header";
import Footer from "../components/Footer";

export function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">About Us</h1>
          <div className="prose max-w-none text-slate-700">
            <p className="mb-4">
              Welcome to UPBRINGING, your trusted partner in vacuum pump solutions since 2007.
            </p>
            <p className="mb-4">
              With over 15 years of industry experience, we have established ourselves as a leading provider of high-quality vacuum pumps and related solutions for industries worldwide.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Mission</h2>
            <p className="mb-4">
              To provide innovative, reliable, and efficient vacuum pump solutions that meet the diverse needs of our customers across various industries.
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Trusted Dealers of Industrial Vacuum Pumps in India since 2007</li>
              <li>Wide range of high-quality products</li>
              <li>Expert technical support</li>
              <li>Competitive pricing</li>
              <li>Fast and reliable delivery</li>
              <li>Global reach with local expertise</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
