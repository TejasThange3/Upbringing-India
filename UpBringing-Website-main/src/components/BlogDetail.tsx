import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "./ui/button";

interface BlogDetailProps {
  blog: {
    id: number;
    title: string;
    description: string;
    category: string;
    readTime: string;
    icon: string;
    fullContent: string;
    author: string;
    date: string;
  };
  onBack: () => void;
}

export function BlogDetail({ blog, onBack }: BlogDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          onClick={onBack}
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
                {blog.category}
              </div>
              <h1 className="text-white mb-4">{blog.title}</h1>
              <p className="text-white/90 max-w-2xl">
                {blog.description}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-slate-700 leading-relaxed space-y-6">
                {blog.fullContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-slate-900 mb-4">Key Takeaways</h3>
                <ul className="space-y-3">
                  <li className="text-slate-700">Advanced technology solutions for modern industrial applications</li>
                  <li className="text-slate-700">Improved efficiency and cost-effectiveness in operations</li>
                  <li className="text-slate-700">Sustainable and environmentally friendly practices</li>
                  <li className="text-slate-700">Expert support and comprehensive service offerings</li>
                </ul>
              </div>

              <div className="mt-12 p-6 bg-red-50 rounded-lg border border-red-100">
                <h3 className="text-slate-900 mb-3">Need More Information?</h3>
                <p className="text-slate-700 mb-4">
                  Our team of experts is ready to help you find the perfect solution for your specific requirements.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Contact Our Experts
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
