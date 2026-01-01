import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function AtexBlog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          onClick={() => navigate("/blogs")}
          variant="ghost"
          className="mb-8 hover:bg-white/50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Image */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 h-80 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
                Manufacturing
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Explosion-Proof Industrial Solutions and Advanced Vacuum Pump Technology
              </h1>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Safer, Smarter Operations: Discover explosion-proof equipment, vacuum pump solutions, and ATEX-certified systems for hazardous environments.
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Technical Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>December 23, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12 prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              In today's fast-changing industrial world, companies are facing increasing demands for safety, reliability, and operational efficiency. Whether you operate in manufacturing, chemical processing, pharmaceuticals, food production, or oil and gas, one thing remains constant: industrial vacuum pumps and explosion-proof equipment play a critical role in maintaining safe and smooth operations.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              At Upbringing Technologies, we provide advanced explosion-proof systems and high-performance vacuum pump solutions designed specifically for industries that operate in hazardous environments. Our goal is simple: to help you improve safety, reduce downtime, and achieve maximum productivity with modern engineering solutions.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Why Explosion-Proof Industrial Equipment Matters
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Workplaces that deal with combustible dust, chemicals, fumes, solvents, or flammable gases require ATEX-certified, explosion-proof machinery to avoid accidental ignition. Even a small spark can cause a major industrial disaster.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              This is why businesses today are actively searching for:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Explosion-proof vacuum pumps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Explosion-proof control panels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Hazardous area industrial equipment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Flameproof motors and systems</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              Our explosion-proof solutions combine cutting-edge technology, robust engineering, and global safety standards, ensuring complete protection for employees and equipment.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Industrial Vacuum Pump Solutions for Every Application
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              As companies search for the best vacuum pump for industrial use, we offer a wide range of systems tailored for different sectors:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Oil-sealed vacuum pumps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Dry vacuum pumps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Rotary vane vacuum pumps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Industrial high-capacity vacuum systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Explosion-proof vacuum pump systems</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              These pumps are engineered for:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Continuous operation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Harsh working conditions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Low maintenance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Long lifecycle</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Energy-efficient performance</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              Whether your requirement is material handling, packaging, degassing, filtration, distillation, or industrial dust extraction, our solutions ensure stable vacuum levels and maximum reliability.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Customized Explosion-Proof Systems: Built for Your Industry
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Every facility has unique operational risks. Our experienced engineering team works closely with clients to design custom explosion-proof solutions that match their exact requirements. This includes:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Hazard assessment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Selection of vacuum pumps and equipment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Designing ATEX/IECEx certified systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Installation and integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Ongoing support and maintenance</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              We ensure all equipment meets or exceeds relevant industry standards.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Our End-to-End Support Process
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              From the first consultation to maintenance, our process ensures that your operations remain safe and efficient:
            </p>

            <ol className="space-y-3 text-slate-700 list-decimal list-inside">
              <li className="text-lg">Initial Consultation & Requirement Analysis</li>
              <li className="text-lg">Designing a Customized Explosion-Proof or Vacuum Pump Solution</li>
              <li className="text-lg">Manufacturing & Quality Testing</li>
              <li className="text-lg">Installation and Commissioning</li>
              <li className="text-lg">Lifecycle Maintenance & After-Sales Support</li>
            </ol>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              This complete ecosystem eliminates downtime and guarantees long-term reliability.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Key Takeaways
            </h2>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Advanced and reliable industrial vacuum pump solutions</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Explosion-proof and ATEX-certified equipment for hazardous areas</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Improved operational efficiency, reduced downtime, and cost savings</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Sustainable and environment-friendly industrial practices</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Custom engineering support from design to maintenance</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Looking for the Best Vacuum Pump or Explosion-Proof Solution?
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Our comprehensive range includes:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Best vacuum pump for industrial use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Industrial vacuum pump solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>High-capacity industrial vacuum systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Vacuum pumps for manufacturing industries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Dry vacuum pumps for industrial applications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Rotary vane vacuum pumps for industrial use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Industrial dust extraction vacuum systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Energy-efficient industrial vacuum pumps</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
              Let our expert team help you find the perfect explosion-proof or vacuum pump solution for your operational needs. 
              <strong className="block mt-2 text-red-600">Contact us today for a consultation.</strong>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
