import Header from "../components/Header";
import { BlogsPage as BlogsPageComponent } from "../components/BlogsPage";
import Footer from "../components/Footer";

export function BlogsPageRoute() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <BlogsPageComponent />
      <Footer />
    </div>
  );
}
