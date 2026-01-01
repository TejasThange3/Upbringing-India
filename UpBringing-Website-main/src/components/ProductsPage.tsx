import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { StaticImageData } from "next/image";
import { BrandCard } from "./BrandCard";
import { ProductCard } from "./ProductCard";
import { BrandProductCategories } from "./BrandProductCategories";
import { Toggle } from "./ui/toggle";
import generalEuropeLogo from '../assets/general-europe-vacuum-srl-italy (1).png';
import briwatecLogo from '../assets/briwatec-gmbh-germany.png';
import atlasLogo from '../assets/atlas-copco-vacuum-global.png';
import fipaLogo from '../assets/fipa-gmbh-germany.png';
import supervaneLogo from '../assets/supervane-united-kingdom.png';
import eurovacLogo from '../assets/eurovac.png';
import productImage from '@/assets/a4a5af2683bbdd28f7ae7396c60654e45e826fcd.png';

const brandsData = [
  // VACUUM PUMPS
  {
    id: 1,
    name: "EUROVAC",
    country: "Europe",
    logo: eurovacLogo,
    category: "vacuum-pump"
  },
  {
    id: 2,
    name: "Atlas Copco Vacuum",
    country: "Global",
    logo: atlasLogo,
    category: "vacuum-pump"
  },
  {
    id: 3,
    name: "General Europe Vacuum S.R.L",
    country: "Italy",
    logo: generalEuropeLogo,
    category: "vacuum-pump"
  },
  {
    id: 4,
    name: "Briwatec GmbH",
    country: "Germany",
    logo: briwatecLogo,
    category: "vacuum-pump"
  },
  
  // VACUUM COMPONENTS
  {
    id: 5,
    name: "SUPERVANE",
    country: "United Kingdom",
    logo: supervaneLogo,
    category: "vacuum-component"
  },
  {
    id: 6,
    name: "FIPA GmbH",
    country: "Germany",
    logo: fipaLogo,
    category: "vacuum-component"
  }
];

const productsDataByBrand: { [key: number]: any[] } = {
  1: [
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
      image: typeof productImage === 'string' ? productImage : productImage.src
    }
  ],
  3: [
    {
      brand: "ATLAS COPCO VACUUM",
      product: "GHS VSD+",
      type: "Vacuum Pump",
      subtype: "Oil-Sealed Screw Vacuum Pump",
      description: "Variable speed drive technology for maximum energy efficiency and performance in industrial vacuum applications",
      specifications: {
        "m3/h": "450",
        "Hz": "50/60",
        "Vacuum (mbar)": "0.3",
        "Pressure (mbar)": "-",
        "Motor Rating (kW)": "11",
        "RPM": "Variable",
        "Oil (ltr)": "4.0"
      },
      applications: [
        "Packaging Industry",
        "Food Processing",
        "Plastics Manufacturing",
        "Automation Systems",
        "Material Handling"
      ],
      image: typeof productImage === 'string' ? productImage : productImage.src
    }
  ],
  4: [
    {
      brand: "FIPA GMBH",
      product: "FV Series",
      type: "Vacuum Pump",
      subtype: "Compact Vacuum Generator",
      description: "Compact and lightweight vacuum generators designed for automation and handling applications",
      specifications: {
        "m3/h": "120",
        "Hz": "50/60",
        "Vacuum (mbar)": "1.0",
        "Pressure (mbar)": "-",
        "Motor Rating (kW)": "2.2",
        "RPM": "2800",
        "Oil (ltr)": "0"
      },
      applications: [
        "Automation Systems",
        "Robotic Handling",
        "Pick and Place",
        "Assembly Lines",
        "Material Handling"
      ],
      image: typeof productImage === 'string' ? productImage : productImage.src
    }
  ]
};

type ViewMode = "brands" | "categories" | "products";
type ProductType = "vacuum-pump" | "vacuum-component";

export function ProductsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("brands");
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [productTypeFilter, setProductTypeFilter] = useState<ProductType>("vacuum-pump");

  const handleBrandClick = (brandId: number) => {
    navigate(`/products/categories/${brandId}`);
  };

  const handleBackToBrands = () => {
    setViewMode("brands");
    setSelectedBrand(null);
  };

  const handleBackToCategories = () => {
    setViewMode("categories");
  };

  // Show brand product categories
  if (viewMode === "categories" && selectedBrand !== null) {
    return <BrandProductCategories brandId={selectedBrand} onBack={handleBackToBrands} />;
  }

  // Show products for selected brand (old view - keeping for compatibility)
  if (viewMode === "products" && selectedBrand !== null) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 py-16 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-purple-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-44 h-44 bg-blue-300/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-purple-200/25 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8">
            <button
              onClick={handleBackToBrands}
              className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Brands
            </button>

            <div className="text-center mb-12">
              <h2 className="text-slate-900 mb-3">
                {brandsData.find(b => b.id === selectedBrand)?.name}
              </h2>
              <p className="text-slate-600">
                Browse our range of vacuum pump solutions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsDataByBrand[selectedBrand]?.map((product, index) => (
              <ProductCard key={index} product={product} />
            )) || (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400">No products available for this brand yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Show brands grid (default view)
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 py-16 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-purple-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-44 h-44 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-purple-200/25 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Brands View */}
        <div className="text-center mb-16">
          <h2 className="text-slate-900 mb-4" style={{ fontSize: 40, fontWeight: 600 }}>
            PRODUCT<span className="text-red-500">S</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto mb-8">
            Discover our comprehensive range of vacuum pumps and components from leading global manufacturers. Premium quality, reliable performance, and innovative solutions for your industrial applications.
          </p>
          
          {/* Toggle Button */}
          <div className="flex justify-center items-center gap-2" style={{
 
  padding: "8px",
  width: "fit-content",
  justifySelf: "center",
  borderRadius: "6px",
}}>
            <button
              onClick={() => setProductTypeFilter("vacuum-pump")}
              className={`px-6 py-2 rounded-l-lg font-semibold transition-all ${
                productTypeFilter === "vacuum-pump"
                  ? "bg-red-600 text-white shadow-lg rounded"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}

              style={{ borderRadius: 4 }}
            >
              Vacuum Pump
            </button>
            <button
              onClick={() => setProductTypeFilter("vacuum-component")}
              className={`px-6 py-2 rounded-r-lg font-semibold transition-all ${
                productTypeFilter === "vacuum-component"
                  ? "bg-red-600 text-white shadow-lg rounded"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}

                style={{ borderRadius: 4 }}
            >
              Vacuum Component
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {brandsData
            .filter((brand) => brand.category === productTypeFilter)
            .map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onClick={() => handleBrandClick(brand.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}