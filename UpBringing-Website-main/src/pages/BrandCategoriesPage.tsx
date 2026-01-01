import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BrandProductCategories } from "../components/BrandProductCategories";

export function BrandCategoriesPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/products");
  };

  if (!brandId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Brand ID not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage="products" />
      <BrandProductCategories brandId={parseInt(brandId)} onBack={handleBack} />
      <Footer />
    </div>
  );
}
