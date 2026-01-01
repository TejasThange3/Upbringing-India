import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function FoodIndustryBlog() {
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
              <h1 className="text-4xl font-bold mb-4">Food Industry</h1>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Hygienic processing equipment and automation for enhanced food production facilities.
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Thomas Brown</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>October 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12 prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed">
              Food processing requires specialized equipment designed for hygiene, efficiency, and food safety. Our solutions meet the stringent requirements of modern food production while maximizing productivity.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Automation in food processing has transformed the industry, enabling consistent quality and improved food safety. Advanced systems can monitor and control every aspect of the production process in real time.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              The future of food processing lies in the integration of smart technologies and sustainable practices. From farm to table, modern food processing equipment ensures safety, quality, and efficiency at every step.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
