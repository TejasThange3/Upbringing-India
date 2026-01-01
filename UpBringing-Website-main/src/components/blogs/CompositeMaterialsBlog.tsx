import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function CompositeMaterialsBlog() {
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
              <h1 className="text-4xl font-bold mb-4">Composite Materials</h1>
              <p className="text-white/90 max-w-2xl mx-auto text-lg">
                Advanced lightweight high-strength composite materials transforming aerospace and automotive.
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Robert Taylor</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>October 25, 2025</span>
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
              Composite materials represent the cutting edge of materials science, offering unprecedented combinations of strength, lightness, and durability. These advanced materials are revolutionizing industries from aerospace to automotive manufacturing.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              The production of high-quality composites requires specialized equipment and expertise. Our solutions incorporate the latest manufacturing technologies to ensure consistent quality and optimal material properties.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              As industries continue to demand lighter, stronger materials, composite technology will play an increasingly important role. Investment in advanced composite manufacturing capabilities positions companies for future success.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
