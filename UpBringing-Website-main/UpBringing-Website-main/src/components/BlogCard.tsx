import { Card } from "./ui/card";
import { ArrowRight, Package, TrendingUp, Building2, Beaker, Box, GraduationCap, Cpu, Leaf, Apple } from "lucide-react";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    description: string;
    category: string;
    readTime: string;
    icon: string;
  };
  onClick: () => void;
}

const iconMap: { [key: string]: any } = {
  package: Package,
  trending: TrendingUp,
  building: Building2,
  beaker: Beaker,
  box: Box,
  graduation: GraduationCap,
  cpu: Cpu,
  leaf: Leaf,
  apple: Apple,
};

export function BlogCard({ blog, onClick }: BlogCardProps) {
  const IconComponent = iconMap[blog.icon] || Package;

  return (
    <Card 
      className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-200 group"
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-red-600 to-red-700 h-48 flex items-center justify-center">
        <IconComponent className="w-20 h-20 text-white/90" strokeWidth={1.5} />
      </div>
      
      <div className="p-6">
        <h3 className="text-slate-900 mb-3">{blog.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {blog.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">{blog.readTime}</span>
          <button className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
