import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function ChemicalPharmaceuticalBlog() {
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
                Technology
              </div>
              <h1 className="text-4xl font-bold mb-4">Chemical Pharmaceutical</h1>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Precision dosing solutions and innovative pharmaceutical-grade chemical manufacturing and testing.
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Dr. Emily White</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>October 28, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>7 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12 prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              The pharmaceutical and chemical industries demand the highest levels of precision and quality control. Our advanced dosing solutions ensure accurate formulation and consistent results in pharmaceutical-grade manufacturing.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Regulatory compliance is paramount in this sector, and our systems are designed to meet or exceed all relevant standards. Comprehensive documentation and traceability features provide complete oversight of all production processes.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Innovation in this field continues to drive improvements in both efficiency and safety. From automated dispensing systems to advanced analytics, modern technology is reshaping pharmaceutical chemical manufacturing.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
