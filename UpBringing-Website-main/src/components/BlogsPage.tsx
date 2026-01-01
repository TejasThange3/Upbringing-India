import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface BlogCardData {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: string;
  path: string;
}

const blogsData: BlogCardData[] = [
  {
    id: "atex-solutions",
    title: "Explosion-Proof Industrial Solutions and Advanced Vacuum Pump Technology for Safer, Smarter Operations",
    description: "In today’s fast-changing industrial world, companies are facing increasing demands for safety, reliability, and operational efficiency.",
    category: "Manufacturing",
    readTime: "5 min read",
    icon: "package",
    path: "/blogs/atex-solutions"
  },
   {
    id: "How Modern Technology Is Transforming the Brick Manufacturing Industry",
    title: "How Modern Technology Is Transforming the Brick Manufacturing Industry",
    description: "The brick manufacturing industry has evolved rapidly in recent years, driven by automation, digitalization, and energy-efficient production technologies.",
    category: "Manufacturing",
    readTime: "6 min read",
    icon: "building",
    path: "/blogs/bricks-manufacturing"
  },
  {
    id: "beverage-industry",
    title: "Beverage Industry",
    description: "Modern bottling technologies and quality control systems revolutionizing beverage production coverage.",
    category: "Technology",
    readTime: "4 min read",
    icon: "trending",
    path: "/blogs/beverage-industry"
  },
  {
    id: "chemical-pharmaceutical",
    title: "Chemical Pharmaceutical",
    description: "Precision dosing solutions and innovative pharmaceutical-grade chemical manufacturing and testing.",
    category: "Technology",
    readTime: "7 min read",
    icon: "beaker",
    path: "/blogs/chemical-pharmaceutical"
  },
  {
    id: "composite-materials",
    title: "Composite Materials",
    description: "Advanced lightweight high-strength composite materials transforming aerospace and automotive expertise.",
    category: "Technology",
    readTime: "5 min read",
    icon: "box",
    path: "/blogs/composite-materials"
  },
  {
    id: "electronics",
    title: "Electronics",
    description: "Cutting-edge electronic manufacturing technology ensuring precision assembly systems for high-tech precision assembly.",
    category: "Technology",
    readTime: "6 min read",
    icon: "cpu",
    path: "/blogs/electronics"
  },
  {
    id: "environmental-technology",
    title: "Environmental Technology",
    description: "Innovative solutions for emissions control and sustainable manufacturing practices.",
    category: "Analysis",
    readTime: "5 min read",
    icon: "leaf",
    path: "/blogs/environmental-technology"
  },
  {
    id: "food-industry",
    title: "Food Industry",
    description: "Hygienic processing equipment and automation for enhanced food production facilities.",
    category: "Manufacturing",
    readTime: "5 min read",
    icon: "apple",
    path: "/blogs/food-industry"
  }
];

const categories = ["All Industries", "Manufacturing", "Technology", "Processing", "Analysis"];

export function BlogsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Industries");

  const filteredBlogs = blogsData.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Industries" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 py-16 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-purple-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-44 h-44 bg-blue-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-slate-900 mb-4" style={{ fontSize: 40, fontWeight: 600 }}>
            BLOG <span className="text-red-500">PAGE</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto mb-8">
            Stay updated with industry insights, expert articles, and case studies on manufacturing, vacuum technology, and industrial automation. Learn best practices and innovations shaping the future of industrial solutions.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for industries or applications..."
                className="pl-10 pr-4 py-3 w-full rounded-full border-slate-200 focus:border-red-500 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 transition-all ${
                  selectedCategory === category
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onClick={() => navigate(blog.path)}
            />
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No blogs found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
