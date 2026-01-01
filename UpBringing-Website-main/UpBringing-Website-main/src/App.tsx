import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductsPageRoute } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { BrandCategoriesPage } from "./pages/BrandCategoriesPage";
import { ProductSeriesDetailPage } from "./pages/ProductSeriesDetailPage";
import { BlogsPageRoute } from "./pages/BlogsPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ContactPage } from "./pages/ContactPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { AtexSolutionsBlog } from "./components/blogs/AtexSolutionsBlog";
import { BeverageIndustryBlog } from "./components/blogs/BeverageIndustryBlog";
import { BricksManufacturingBlog } from "./components/blogs/BricksManufacturingBlog";
import { ChemicalPharmaceuticalBlog } from "./components/blogs/ChemicalPharmaceuticalBlog";
import { CompositeMaterialsBlog } from "./components/blogs/CompositeMaterialsBlog";
import { ElectronicsBlog } from "./components/blogs/ElectronicsBlog";
import { EnvironmentalTechnologyBlog } from "./components/blogs/EnvironmentalTechnologyBlog";
import { FoodIndustryBlog } from "./components/blogs/FoodIndustryBlog";
import { AtexBlog } from "./components/blogs/AtexBlog";

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPageRoute />} />
            <Route path="/products/:brandId" element={<ProductDetailPage />} />
            <Route path="/products/categories/:brandId" element={<BrandCategoriesPage />} />
            <Route path="/products/categories/:brandId/series/:seriesName" element={<ProductSeriesDetailPage />} />
            <Route path="/blogs" element={<BlogsPageRoute />} />
            <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
            <Route path="/blogs/atex-solutions" element={<AtexSolutionsBlog />} />
            <Route path="/blogs/beverage-industry" element={<BeverageIndustryBlog />} />
            <Route path="/blogs/bricks-manufacturing" element={<BricksManufacturingBlog />} />
            <Route path="/blogs/chemical-pharmaceutical" element={<ChemicalPharmaceuticalBlog />} />
            <Route path="/blogs/composite-materials" element={<CompositeMaterialsBlog />} />
            <Route path="/blogs/electronics" element={<ElectronicsBlog />} />
            <Route path="/blogs/environmental-technology" element={<EnvironmentalTechnologyBlog />} />
            <Route path="/blogs/food-industry" element={<FoodIndustryBlog />} />
            <Route path="/blogs/atex-vacuum-pump" element={<AtexBlog />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}