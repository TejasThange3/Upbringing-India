import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { SearchSection } from "../components/SearchSection";
import { ProductCard } from "../components/ProductCard";
import { InquiryModal } from "../components/InquiryModal";
import { AuthModal } from "../components/AuthModal";
import Footer from "../components/Footer";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { getRecommendations } from "../services/recommendationService";
import { useAuth } from "../contexts/AuthContext";
import productImage from '@/assets/a4a5af2683bbdd28f7ae7396c60654e45e826fcd.png';

const productsData = [
  {
    brand: "GENERAL EUROPE VACUUM",
    product: "GP300E",
    type: "Vacuum Pump",
    subtype: "Oil Lubricated Vacuum Pump",
    description: "Oil-lubricated rotary vane vacuum pump, Designed for robustness and reliability in demanding industrial environments",
    specifications: {
      "m3/h": "300",
      "Hz": "50",
      "Vacuum (mbar)": "0.5",
      "Pressure (mbar)": "2000",
      "Motor Rating (kW)": "5.5",
      "RPM": "1450",
      "Oil (ltr)": "2.5"
    },
    applications: [
      "Food Industry",
      "Chemical and Pharmaceutical Industry",
      "Industrial Manufacturing",
      "Packaging",
      "Vacuum Systems"
    ],
    image: productImage
  },
  {
    brand: "BUSCH VACUUM SOLUTIONS",
    product: "R5 RA 0250",
    type: "Vacuum Pump",
    subtype: "Dry Rotary Vane Vacuum Pump",
    description: "High-performance dry running rotary vane vacuum pump, Ideal for clean and oil-free vacuum applications",
    specifications: {
      "m3/h": "250",
      "Hz": "50/60",
      "Vacuum (mbar)": "0.1",
      "Pressure (mbar)": "-",
      "Motor Rating (kW)": "7.5",
      "RPM": "1800",
      "Oil (ltr)": "0"
    },
    applications: [
      "Medical and Laboratory",
      "Electronics Manufacturing",
      "Food Processing",
      "Printing Industry",
      "Packaging Machinery"
    ],
    image: productImage
  }
];

export function HomePage() {
  const { user } = useAuth();
  const productsRef = useRef<HTMLDivElement>(null);
  const [showProducts, setShowProducts] = useState(false);
  const [application, setApplication] = useState("");
  const [power, setPower] = useState("");
  const [description, setDescription] = useState("");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    // Check if user is logged in
    if (!user) {
      setError("Please login to search for products");
      setIsAuthModalOpen(true);
      return;
    }

    if (application && power && description) {
      setIsLoading(true);
      setError(null);
      setShowProducts(false);

      try {
        const response = await getRecommendations({
          application,
          power,
          description,
          count: 10,
        });

        if (response.success && response.data) {
          // Map API response to ProductCard format
          const mappedProducts = response.data.map((item) => ({
            brand: item.Brand,
            product: item.Product_Name,
            type: "Vacuum Pump",
            subtype: item.Product_Name,
            description: `Recommended for ${item.Application} applications with ${item.PowerUsage} power usage`,
            specifications: {
              "Application": item.Application,
              "Power Usage": item.PowerUsage,
            },
            applications: [item.Application],
            image: item.Image_URL || productImage,
          }));

          setRecommendedProducts(mappedProducts);
          setShowProducts(true);
          
          // Scroll to products section after a short delay to ensure state is updated
          setTimeout(() => {
            productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else {
          setError(response.message || "Failed to get recommendations");
        }
      } catch (err) {
        setError("An error occurred while fetching recommendations");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage="home" />
      <HeroSection />
      <SearchSection 
        application={application}
        setApplication={setApplication}
        power={power}
        setPower={setPower}
        description={description}
        setDescription={setDescription}
        onSearch={handleSearch}
      />
      
      {isInquiryOpen && (
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          productName={selectedProductName}
          brandName={selectedBrandName}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setError(null);
        }}
      />

      <section id="products" ref={productsRef} className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-3">Recommended Products</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Select your application and describe your requirements to discover the ideal solution
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
            <p className="text-slate-600 text-lg">
              Finding the perfect products for you...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <p className="text-red-600 text-lg font-semibold mb-2">{error}</p>
            {!user && (
              <p className="text-slate-600 mb-6">
                Create an account or login to access product search and recommendations
              </p>
            )}
            <button
              onClick={() => {
                if (!user) {
                  setIsAuthModalOpen(true);
                } else {
                  handleSearch();
                }
              }}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              {!user ? "Login to Continue" : "Try Again"}
            </button>
          </div>
        ) : !showProducts ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-slate-300" />
            </div>
            <p className="text-slate-400 text-lg">
              Use the search above to find your perfect pump
            </p>
          </div>
        ) : recommendedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-slate-300" />
            </div>
            <p className="text-slate-600 text-lg mb-2">
              No products found matching your criteria
            </p>
            <p className="text-slate-400">
              Try adjusting your search parameters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                isInquiryOpen={isInquiryOpen && selectedProductName === product.product}
                setIsInquiryOpen={(open) => {
                  setIsInquiryOpen(open);
                  if (open) {
                    setSelectedProductName(product.product);
                    setSelectedBrandName(product.brand);
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
