import { useState, useEffect } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";
import {
  buildBrandDataFromZoho,
  type BrandProductData,
  type ZohoProduct,
} from "../services/brandProductService";
import { useProducts } from "../contexts/ProductsContext";
import productImage from 'figma:asset/a4a5af2683bbdd28f7ae7396c60654e45e826fcd.png';
import generalEuropeLogo from '../assets/general-europe-vacuum-srl-italy (1).png';
import briwatecLogo from '../assets/briwatec-gmbh-germany.png';
import atlasCopcoLogo from '../assets/atlas-copco-vacuum-global.png';
import fipaLogo from '../assets/fipa-gmbh-germany.png';
import supervaneLogo from '../assets/supervane-united-kingdom.png';
import eurovacLogos from '../assets/eurovac.png';

interface ProductSeries {
  name: string;
  image: string;
  description: string;
}

interface ProductCategory {
  title: string;
  series: ProductSeries[];
}

interface BrandInfo {
  id: number;
  name: string;
  logo: string;
  tagline: string;
  country: string;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  categories: ProductCategory[];
}

const brandProductData: { [key: number]: BrandInfo } = {
  // VACUUM PUMPS SECTION
  1: {
    id: 1,
    name: "EUROVAC",
    logo: eurovacLogos,
    tagline: "ADVANCED VACUUM TECHNOLOGY",
    country: "Europe",
    primaryColor: "#f58522 ", 
    secondaryColor: "#f58522 ", 
    bgColor: "rgba(245, 131, 31, 0.23)", 
    categories: [
      {
        title: "ROTARY VANE VACUUM PUMPS",
        series: [
          {
            name: "EV SERIES",
            image: productImage,
            description: "EV SERIES European-engineered rotary vane vacuum pumps. High performance and reliability for demanding industrial vacuum applications."
          },
          {
            name: "EV PREMIUM",
            image: productImage,
            description: "EV PREMIUM Premium rotary vane pumps with advanced sealing technology. Optimized for continuous operation in critical industrial environments."
          }
        ]
      },
      {
        title: "DRY SCREW VACUUM PUMPS",
        series: [
          {
            name: "ESD SERIES",
            image: productImage,
            description: "ESD SERIES Dry screw vacuum pumps designed for oil-free vacuum applications. Advanced cooling ensures maximum efficiency and reliability."
          }
        ]
      }
    ]
  },
  2: {
    id: 2,
    name: "Atlas Copco Vacuum",
    logo: atlasCopcoLogo,
    tagline: "SUSTAINABLE PRODUCTIVITY",
    country: "Global",
    primaryColor: "#02708f", 
    secondaryColor: "#02708f", 
    bgColor: "#00708f43",
    categories: [
      {
        title: "OIL-SEALED VACUUM PUMPS",
        series: [
          {
            name: "GHS VSD+",
            image: productImage,
            description: "GHS VSD+ Variable speed drive technology for maximum energy efficiency. Smart controls automatically adjust pump speed to match demand, reducing energy consumption by up to 50%."
          },
          {
            name: "GVS SERIES",
            image: productImage,
            description: "GVS SERIES Oil-sealed rotary vane vacuum pumps designed for continuous operation. Proven reliability in demanding industrial applications with minimal maintenance requirements."
          }
        ]
      },
      {
        title: "DRY VACUUM SOLUTIONS",
        series: [
          {
            name: "DZS VSD+",
            image: productImage,
            description: "DZS VSD+ Dry screw vacuum pumps with variable speed drive. 100% oil-free vacuum for critical applications. Advanced cooling system ensures optimal performance."
          }
        ]
      }
    ]
  },
  3: {
    id: 3,
    name: "GENERAL EUROPE VACUUM S.r.l",
    logo: generalEuropeLogo,
    tagline: "MADE IN ITALY",
    country: "Italy",
    primaryColor: "#df0a0aff", 
    secondaryColor: "#df0a0aff", 
    bgColor: "#e1070729", 
    categories: [
      {
        title: "OIL LUBRICATED & ROTARY VANES VACUUM PUMPS",
        series: [
          {
            name: "GP/GPM SERIES",
            image: productImage,
            description: "GP/GPM SERIES Range 'S' is the last generation of two-stage and two-finned oil-lubricated and rotary vanes vacuum pumps model GP S and GPM S, manufactured under best standards with quality seals and"
          },
          {
            name: "Oxygen Range",
            image: productImage,
            description: "Oxygen Range GEV builds GP-My oxy series lubricated empty. oven-ruined characteristicsof its reliability and low operating costs. They are pumps built to be used in the presence of oxygen, emerging industries."
          },
          {
            name: "Z SERIES",
            image: productImage,
            description: "Z SERIES The Z SERIES lubricated vane vacuum pumps have an increased ability to tolerate vapors and allow them to work in environments with a damp presence of water vapor. The"
          }
        ]
      },
      {
        title: "CLAW VACUUM PUMP MODEL GPR",
        series: [
          {
            name: "GPR 150",
            image: productImage,
            description: "GPR SERIES The compressors and clean vacuum pumps of the GPR series SIMULATOR SERIES are based on a claw compression system. Compared to rotary vane models, compression occurs internally by contactless cl"
          }
        ]
      },
      {
        title: "DRY SCREW VACUUM PUMPS",
        series: [
          {
            name: "GSD SERIES",
            image: productImage,
            description: "GSD SERIES Dry screw vacuum pumps designed for industrial applications requiring oil-free vacuum technology. Advanced sealing technology ensures maximum efficiency and reliability."
          },
          {
            name: "GSH SERIES",
            image: productImage,
            description: "GSH SERIES High-performance dry screw vacuum pumps with variable speed drive technology. Optimized for energy efficiency and continuous operation in demanding industrial environments."
          }
        ]
      }
    ]
  },
  4: {
    id: 4,
    name: "Briwatec GmbH",
    logo: briwatecLogo,
    tagline: "GERMAN ENGINEERING",
    country: "Germany",
    primaryColor: "#2e308cff", 
    secondaryColor: "#2e308cff", 
    bgColor: "#2d2e873a", 
    categories: [
      {
        title: "INDUSTRIAL VACUUM SOLUTIONS",
        series: [
          {
            name: "BV SERIES",
            image: productImage,
            description: "BV SERIES Industrial vacuum pumps designed for heavy-duty applications. Features advanced German engineering with robust construction for maximum reliability and performance."
          },
          {
            name: "BT COMPACT",
            image: productImage,
            description: "BT COMPACT Space-saving vacuum solutions perfect for installations with limited space. Combines efficiency with compact design without compromising on performance."
          }
        ]
      }
    ]
  },
  
  // VACUUM COMPONENTS SECTION
  5: {
    id: 5,
    name: "SUPERVANE",
    logo: supervaneLogo,
    tagline: "QUALITY ENGINEERING",
    country: "United Kingdom",
    primaryColor: "#090909ff", 
    secondaryColor: "#090909ff", 
    bgColor: "#00000040", 
    categories: [
      {
        title: "ROTARY VANE COMPONENTS",
        series: [
          {
            name: "SV ROTOR KITS",
            image: productImage,
            description: "SV ROTOR KITS High-precision rotor assemblies for vacuum pumps. Premium quality components ensuring maximum durability and performance."
          },
          {
            name: "SV VALVE KITS",
            image: productImage,
            description: "SV VALVE KITS Complete valve assemblies with superior sealing characteristics. Engineered for demanding vacuum applications."
          }
        ]
      },
      {
        title: "SHAFT & BEARING ASSEMBLIES",
        series: [
          {
            name: "PRECISION SHAFTS",
            image: productImage,
            description: "PRECISION SHAFTS Perfectly balanced and hardened shafts for smooth operation. Manufactured to exact tolerances for optimal performance."
          }
        ]
      }
    ]
  },
  6: {
    id: 6,
    name: "FIPA GmbH",
    logo: fipaLogo,
    tagline: "VACUUM TECHNOLOGY",
    country: "Germany",
    primaryColor: "#a82029ff",
    secondaryColor: "#a82029ff", 
    bgColor: "#a71f2837", 
    categories: [
      {
        title: "VACUUM GENERATORS & EJECTORS",
        series: [
          {
            name: "FV SERIES",
            image: productImage,
            description: "FV SERIES Compact vacuum generators for automation and handling. High suction capacity with minimal air consumption. Perfect for pick and place applications in assembly lines."
          },
          {
            name: "MULTI-STAGE EJECTORS",
            image: productImage,
            description: "Multi-stage vacuum ejectors offering superior performance. Multiple venturi stages provide high vacuum levels with excellent energy efficiency for demanding automation tasks."
          }
        ]
      },
      {
        title: "VACUUM COMPONENTS",
        series: [
          {
            name: "SUCTION CUPS",
            image: productImage,
            description: "Wide range of suction cups for various materials and surfaces. From delicate electronics to heavy industrial components, our suction cups ensure reliable gripping."
          },
          {
            name: "VACUUM PADS & GRIPPERS",
            image: productImage,
            description: "Specialized vacuum pads and grippers for precision automation. Available in various materials and configurations for different applications."
          }
        ]
      }
    ]
  }
};

// Mapping from brandId to brand name for Zoho lookup
// IMPORTANT: These must match exactly with the Brand field in Zoho CRM
const brandIdToName: { [key: number]: string } = {
  1: "EUROVAC",                    // Vacuum Pumps
  2: "Atlas Copco",                // Vacuum Pumps
  3: "GENERAL EUROPE VACUUM",      // Vacuum Pumps
  4: "Briwatec",                   // Vacuum Pumps
  5: "SUPERVANE",                  // Vacuum Components
  6: "FIPA GmbH",                  // Vacuum Components
};

interface BrandProductCategoriesProps {
  brandId: number;
  onBack: () => void;
}

export function BrandProductCategories({ brandId, onBack }: BrandProductCategoriesProps) {
  const navigate = useNavigate();

  // Use products from context (cached)
  const { products: zohoProducts, isLoading: isLoadingProducts } = useProducts();

  const [brand, setBrand] = useState<BrandInfo | null>(null);
  const [useZohoData, setUseZohoData] = useState(false);

  useEffect(() => {
    loadBrandData();
  }, [brandId, zohoProducts]);

  const loadBrandData = () => {
    const brandName = brandIdToName[brandId];
    // Always get frontend brand data for name, logo, colors
    const frontendBrandData = brandProductData[brandId];

    if (!frontendBrandData) {
      setBrand(null);
      return;
    }

    if (zohoProducts.length > 0 && brandName) {
      // Build brand data from Zoho
      const zohoBrandData = buildBrandDataFromZoho(
        brandName,
        brandId,
        zohoProducts,
        productImage
      );

      if (zohoBrandData.categories.length > 0) {
        // Use Zoho categories but keep frontend brand info (name, logo, colors)
        setBrand({
          ...frontendBrandData,
          categories: zohoBrandData.categories,
        });
        setUseZohoData(true);
      } else {
        // Fallback to hardcoded data if no categories found
        setBrand(frontendBrandData);
        setUseZohoData(false);
      }
    } else {
      // Fallback to hardcoded data
      setBrand(frontendBrandData);
      setUseZohoData(false);
    }
  };

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-red-500 animate-spin mb-6" />
        <p className="text-slate-600 text-lg">Loading products ...</p>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Brand data not available</p>
          <button
            onClick={onBack}
            className="text-red-500 hover:text-red-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Brand Header */}
      <div 
        className="py-12 relative"
        style={{ backgroundColor: brand.bgColor }}
      >
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-8 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-white rounded-lg p-6 shadow-lg flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h2
                  className="mb-1"
                  style={{ color: brand.primaryColor }}
                >
                  {brand.name}
                </h2>
                <p className="text-slate-600 text-sm">{brand.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {brand.categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-slate-800 text-center mb-12">
                {category.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.series.map((series, seriesIndex) => (
                  <button
                    key={seriesIndex}
                    onClick={() =>
                      navigate(`/products/categories/${brandId}/series/${encodeURIComponent(series.name)}`)
                    }
                    className="text-left group"
                  >
                    <Card 
                      className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-opacity-100 cursor-pointer"
                      style={{ borderColor: `${brand.primaryColor}20` }}
                    >
                      {/* Product Image */}
                      <div className="bg-slate-50 p-6 flex items-center justify-center h-56 group-hover:bg-slate-100 transition-colors">
                        <img
                          src={series.image || productImage}
                          alt={series.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== productImage) {
                              target.src = productImage;
                            }
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 
                          className="mb-4 text-center group-hover:opacity-80 transition-opacity"
                          style={{ color: brand.primaryColor }}
                        >
                          {series.name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {series.description}
                        </p>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
