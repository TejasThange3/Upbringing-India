import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import BrickManu1 from "./assets/BrickManu1.png";
import BrickManu2 from "./assets/BrickManu2.png";
import BrickManu3 from "./assets/BrickManu3.png";


export function BricksManufacturingBlog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
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
              <h1 className="text-4xl font-bold mb-4">How Modern Technology Is Transforming the Brick Manufacturing Industry</h1>

              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Advanced brick production techniques with enhanced precision for reduced energy and improved quality.
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Michael Chen</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>November 1, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>6 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12 prose prose-lg max-w-none">
            <h1 style={{ color: "#1e293b", fontSize: "24px", fontWeight: "bold" }}>How Modern Technology Is Transforming the Brick Manufacturing Industry</h1>
              <img 
                          src={BrickManu1} 
                          alt="Industrial facility with advanced vacuum pump and explosion-proof equipment setup"
                          className="w-full h-auto rounded-lg my-6 shadow-lg"
                        />

            <p className="text-lg text-slate-700 leading-relaxed">
              The brick manufacturing industry has evolved rapidly in recent years, driven by automation, digitalization, and energy-efficient production technologies. Modern brick plants are no longer dependent on manual processes. Instead, they operate with advanced machinery, smart monitoring systems, and high-precision equipment that ensure consistent output and superior brick quality.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              As infrastructure and construction demand continue to grow in India and globally, manufacturers are increasingly searching for:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Automated brick manufacturing machine solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Energy-efficient brick kilns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Robotic brick handling systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Modern clay brick production technology</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Sustainable and eco-friendly brick-making processes</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              At Upbringing Technologies, we support this transformation through advanced industrial solutions engineered for maximum productivity and safety.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4" style={{ color: "#1e293b", fontSize: "20px", fontWeight: "bold" }}>
              Automation: The Backbone of Modern Brick Manufacturing
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              The introduction of automation in brick manufacturing has eliminated most inconsistencies and inefficiencies in traditional production. Today's advanced systems provide:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Precision in brick dimensions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Uniform shaping and compaction</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Reduced labor dependency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Higher production speed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Consistent product quality across batches</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              Automated conveyor systems, robotic stacking units, and controlled material feeders ensure uninterrupted, predictable performance. This shift not only improves output but also reduces operational downtime significantly.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4" style={{ color: "#1e293b", fontSize: "20px", fontWeight: "bold" }}>
              Energy-Efficient Kilns: Lower Consumption, Higher Sustainability
            </h2>
                 <img 
                          src={BrickManu2} 
                          alt="Industrial facility with advanced vacuum pump and explosion-proof equipment setup"
                          className="w-full h-auto rounded-lg my-6 shadow-lg"
                        />

            <p className="text-lg text-slate-700 leading-relaxed">
              Energy costs account for a major percentage of manufacturing expenses in the brick industry. Modern kilns have transformed energy usage with:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Heat recovery systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Optimized fuel consumption</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Lower carbon emissions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Consistent temperature control</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              Technologies such as tunnel kilns, zig-zag kilns, and hybrid Hoffman kilns provide higher efficiency while maintaining product strength and color consistency. Manufacturers searching for low-energy brick kiln systems or environment-friendly brick production solutions now have access to advanced designs that bring long-term cost savings.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4" style={{ color: "#1e293b", fontSize: "20px", fontWeight: "bold" }}>
              Smart Manufacturing for Real-Time Monitoring and Optimization
            </h2>
                 <img 
                          src={BrickManu3} 
                          alt="Industrial facility with advanced vacuum pump and explosion-proof equipment setup"
                          className="w-full h-auto rounded-lg my-6 shadow-lg"
                        />

            <p className="text-lg text-slate-700 leading-relaxed">
              The adoption of smart manufacturing and IoT-based technologies has elevated brick production to a new level. Sensors, data analytics, and automated alerts help manufacturers:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Monitor kiln performance in real time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Track moisture levels, temperature, and drying cycles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Reduce material waste</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Improve batch consistency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Optimize energy and resource usage</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              This greatly enhances the operational efficiency of brick factories, allowing managers to make data-driven decisions and eliminate recurring problems.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4" style={{ color: "#1e293b", fontSize: "20px", fontWeight: "bold" }}>
              Why Modern Brick Manufacturers Choose Advanced Industrial Solutions
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Manufacturers are continuously upgrading to advanced systems because they offer:
            </p>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Better quality control</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Higher production capacities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Reduced operational costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Improved worker safety</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span>Compliance with environmental standards</span>
              </li>
            </ul>

            <p className="text-lg text-slate-700 leading-relaxed mt-4">
              Upbringing Technologies provides end-to-end engineering, installation, and maintenance for brick manufacturing facilities, ensuring seamless integration and long-term performance.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Key Takeaways
            </h2>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Advanced technology solutions for modern brick production</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Improved operational efficiency and cost-effectiveness</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Environment-friendly, energy-saving kiln technologies</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Smart manufacturing for real-time monitoring and optimization</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <span className="text-red-600 font-bold text-lg">✓</span>
                  <span className="text-lg">Expert engineering support from consultation to maintenance</span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
              Need More Information?
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
              Our team of experts is ready to help you choose the perfect automation, kiln technology, or industrial solution for your brick manufacturing requirements.
              <strong className="block mt-2 text-green-600">Contact us today for a consultation.</strong>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
