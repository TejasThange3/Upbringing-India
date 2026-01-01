import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BlogDetail } from "../components/BlogDetail";

const blogsData = [
  {
    id: 1,
    title: "Atex Solutions",
    description: "Discover explosion-proof equipment and safety protocols for hazardous environments with advanced technology solutions.",
    category: "Manufacturing",
    readTime: "5 min read",
    icon: "package",
    author: "John Doe",
    date: "November 5, 2025",
    fullContent: "In today's rapidly evolving industrial landscape, explosion-proof equipment has become essential for ensuring workplace safety in hazardous environments. Our comprehensive solutions combine cutting-edge technology with proven safety protocols.\n\nThe implementation of advanced explosion-proof systems requires careful planning and expertise. Our team works closely with clients to assess their specific needs and design customized solutions that meet or exceed industry standards.\n\nFrom initial consultation to ongoing maintenance, we provide complete support throughout the lifecycle of your equipment. Our commitment to quality and safety ensures that your operations remain protected while maintaining optimal efficiency."
  },
    {
    id: 2,
    title: "How Modern Technology Is Transforming the Brick Manufacturing Industry",
    description: "The brick manufacturing industry has evolved rapidly in recent years, driven by automation, digitalization, and energy-efficient production technologies.",
    category: "Manufacturing",
    readTime: "6 min read",
    icon: "building",
    author: "Michael Chen",
    date: "November 1, 2025",
    fullContent: "The brick manufacturing industry has undergone significant transformation with the introduction of advanced production techniques. Modern facilities now utilize automated systems that ensure precise dimensions and consistent quality.\n\nEnergy efficiency is a major consideration in contemporary brick production. New kiln technologies and heat recovery systems have dramatically reduced energy consumption while maintaining or improving product quality.\n\nThe integration of smart manufacturing principles allows for real-time monitoring and optimization of production processes. This results in reduced waste, improved consistency, and better overall efficiency in brick manufacturing operations."
  },
  {
    id: 3,
    title: "Beverage Industry",
    description: "Modern bottling technologies and quality control systems revolutionizing beverage production coverage.",
    category: "Technology",
    readTime: "4 min read",
    icon: "trending",
    author: "Sarah Miller",
    date: "November 3, 2025",
    fullContent: "The beverage industry is experiencing a technological revolution that is transforming production processes and quality control measures. Modern bottling systems incorporate advanced automation and precision engineering.\n\nQuality control has reached new heights with the integration of AI-powered inspection systems and real-time monitoring capabilities. These innovations ensure consistent product quality while reducing waste and improving efficiency.\n\nSustainability is also a key focus, with new technologies enabling better resource management and reduced environmental impact. The future of beverage production is both efficient and environmentally responsible."
  },

  {
    id: 4,
    title: "Chemical Pharmaceutical",
    description: "Precision dosing solutions and innovative pharmaceutical-grade chemical manufacturing and testing.",
    category: "Technology",
    readTime: "7 min read",
    icon: "beaker",
    author: "Dr. Emily White",
    date: "October 28, 2025",
    fullContent: "The pharmaceutical and chemical industries demand the highest levels of precision and quality control. Our advanced dosing solutions ensure accurate formulation and consistent results in pharmaceutical-grade manufacturing.\n\nRegulatory compliance is paramount in this sector, and our systems are designed to meet or exceed all relevant standards. Comprehensive documentation and traceability features provide complete oversight of all production processes.\n\nInnovation in this field continues to drive improvements in both efficiency and safety. From automated dispensing systems to advanced analytics, modern technology is reshaping pharmaceutical chemical manufacturing."
  },
  {
    id: 5,
    title: "Composite Materials",
    description: "Advanced lightweight high-strength composite materials transforming aerospace and automotive expertise.",
    category: "Technology",
    readTime: "5 min read",
    icon: "box",
    author: "Robert Taylor",
    date: "October 25, 2025",
    fullContent: "Composite materials represent the cutting edge of materials science, offering unprecedented combinations of strength, lightness, and durability. These advanced materials are revolutionizing industries from aerospace to automotive manufacturing.\n\nThe production of high-quality composites requires specialized equipment and expertise. Our solutions incorporate the latest manufacturing technologies to ensure consistent quality and optimal material properties.\n\nAs industries continue to demand lighter, stronger materials, composite technology will play an increasingly important role. Investment in advanced composite manufacturing capabilities positions companies for future success."
  },
  {
    id: 6,
    title: "Electronics",
    description: "Cutting-edge electronic manufacturing technology ensuring precision assembly systems for high-tech applications.",
    category: "Technology",
    readTime: "6 min read",
    icon: "zap",
    author: "James Wilson",
    date: "October 19, 2025",
    fullContent: "Electronics manufacturing has become increasingly sophisticated, requiring precision equipment and rigorous quality control. Modern assembly systems utilize advanced robotics and computer vision to achieve tolerances previously thought impossible.\n\nThe complexity of modern electronics demands careful attention to detail at every stage of manufacturing. From component procurement to final assembly and testing, our systems ensure consistent quality and reliability.\n\nAs electronics continue to evolve and become more complex, manufacturing capabilities must advance in parallel. Investment in cutting-edge manufacturing technology is essential for competitive advantage."
  }
];

export function BlogDetailPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const blog = blogId ? blogsData.find(b => b.id === parseInt(blogId)) : null;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Blog post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage="blogs" />
      <BlogDetail blog={blog} onBack={() => navigate("/blogs")} />
      <Footer />
    </div>
  );
}
