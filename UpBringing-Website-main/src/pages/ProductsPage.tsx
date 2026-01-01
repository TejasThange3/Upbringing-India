import { Header } from "../components/Header";
import { ProductsPage as ProductsPageComponent } from "../components/ProductsPage";
import { Footer } from "../components/Footer";

export function ProductsPageRoute() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage="products" />
      <ProductsPageComponent />
      <Footer />
    </div>
  );
}
