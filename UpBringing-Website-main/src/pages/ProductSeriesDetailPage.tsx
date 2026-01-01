import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductDetail } from "../components/ProductDetail";
import {
  getProductsByBrand,
  getProductImageUrl,
  type ZohoProduct,
} from "../services/brandProductService";
import { useProducts } from "../contexts/ProductsContext";
import productImage from '@/assets/a4a5af2683bbdd28f7ae7396c60654e45e826fcd.png';
import generalEuropeLogo from '../assets/general-europe-vacuum-srl-italy (1).png';
import briwatecLogo from '../assets/briwatec-gmbh-germany.png';
import atlasLogo from '../assets/atlas-copco-vacuum-global.png';
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
  // VACUUM PUMPS
  1: {
    id: 1,
    name: "EUROVAC",
    logo: eurovacLogos,
    tagline: "ADVANCED VACUUM TECHNOLOGY",
    country: "Europe",
    primaryColor: "#f58522",
    secondaryColor: "#f58522",
    bgColor: "rgba(245, 131, 34, 0.23)",
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
    logo: atlasLogo,
    tagline: "SUSTAINABLE PRODUCTIVITY",
    country: "Global",
    primaryColor: "#DC2626",
    secondaryColor: "#991B1B",
    bgColor: "#FEE2E2",
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
    primaryColor: "#15803D",
    secondaryColor: "#166534",
    bgColor: "#DCFCE7",
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
    primaryColor: "#0369A1",
    secondaryColor: "#075985",
    bgColor: "#E0F2FE",
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

  // VACUUM COMPONENTS
  5: {
    id: 5,
    name: "SUPERVANE",
    logo: supervaneLogo,
    tagline: "QUALITY ENGINEERING",
    country: "United Kingdom",
    primaryColor: "#7C3AED",
    secondaryColor: "#6D28D9",
    bgColor: "#EDE9FE",
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
    primaryColor: "#0891B2",
    secondaryColor: "#0E7490",
    bgColor: "#CFFAFE",
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
const brandIdToName: { [key: number]: string } = {
  1: "EUROVAC",                    // Vacuum Pumps
  2: "Atlas Copco",                // Vacuum Pumps
  3: "GENERAL EUROPE VACUUM",      // Vacuum Pumps
  4: "Briwatec",                   // Vacuum Pumps
  5: "SUPERVANE",                  // Vacuum Components
  6: "FIPA GmbH",                  // Vacuum Components
};

export function ProductSeriesDetailPage() {
  const { brandId, seriesName } = useParams();
  const navigate = useNavigate();

  // Use products from context (cached)
  const { products: zohoProducts, isLoading: isLoadingProducts } = useProducts();

  const [seriesProducts, setSeriesProducts] = useState<ZohoProduct[]>([]);
  const [useZohoData, setUseZohoData] = useState(false);

  useEffect(() => {
    loadSeriesProducts();
  }, [brandId, seriesName, zohoProducts]);

  const loadSeriesProducts = () => {
    const brandName = brandId ? brandIdToName[parseInt(brandId)] : null;
    const decodedSeriesName = seriesName ? decodeURIComponent(seriesName) : '';

    if (zohoProducts.length > 0 && brandName) {
      // Filter products by brand
      const brandProducts = getProductsByBrand(zohoProducts, brandName);

      // Filter products by series
      const filtered = brandProducts.filter(
        (p) => p.Series?.toLowerCase() === decodedSeriesName.toLowerCase()
      );

      // Deduplicate products by Product name (keep first occurrence)
      const uniqueProducts = Array.from(
        new Map(filtered.map(p => [p.Product, p])).values()
      );

      if (uniqueProducts.length > 0) {
        setSeriesProducts(uniqueProducts);
        setUseZohoData(true);
      }
    }
  };

  const brand = brandId ? brandProductData[parseInt(brandId)] : null;

  // Try Zoho data first, fallback to hardcoded
  if (useZohoData && seriesProducts.length > 0 && brand) {
    const firstProduct = seriesProducts[0];
    const brandName = brandId ? brandIdToName[parseInt(brandId)] : '';
    // Use frontend brand data for colors instead of backend logic
    const colors = {
      primaryColor: brand.primaryColor,
      secondaryColor: brand.secondaryColor,
      bgColor: brand.bgColor,
    };

    // Build models list from all products in this series with complete data for each
    const models = seriesProducts.map((p, index) => {
      // Debug: Log available fields for first product
      if (index === 0) {
        console.log('📊 Product fields available:', Object.keys(p));
        console.log('📊 Sample product data:', p);
      }

      // Build technical features for this product
      const technicalFeatures = [
        p['m3/h'] && `Flow Rate: ${p['m3/h']} m³/h`,
        p['Vacuum(mbar)'] && `Ultimate Vacuum: ${p['Vacuum(mbar)']} mbar`,
        p['Pressure(mbar)'] && `Pressure: ${p['Pressure(mbar)']} mbar`,
        p['Motor Rating (kw)'] && `Motor Rating: ${p['Motor Rating (kw)']} kW`,
        p.RPM && `RPM: ${p.RPM}`,
        p['Oil_ltr'] && `Oil Capacity: ${p['Oil_ltr']} ltr`,
      ].filter(Boolean) as string[];

      // Debug: Log technical features
      if (index === 0) {
        console.log('📊 Technical features extracted:', technicalFeatures);
      }

      // Build specifications for this product
      const specifications: { [key: string]: string } = {};
      if (p['m3/h']) specifications['Flow Rate (m³/h)'] = p['m3/h'];
      if (p.Hz) specifications['Frequency (Hz)'] = p.Hz;
      if (p['Vacuum(mbar)']) specifications['Vacuum (mbar)'] = p['Vacuum(mbar)'];
      if (p['Pressure(mbar)']) specifications['Pressure (mbar)'] = p['Pressure(mbar)'];
      if (p['Motor Rating (kw)']) specifications['Motor Rating (kW)'] = p['Motor Rating (kw)'];
      if (p.RPM) specifications['RPM'] = p.RPM;
      if (p['Oil_ltr']) specifications['Oil (ltr)'] = p['Oil_ltr'];

      return {
        name: p.Product,
        description: p.Product_Details || p.Description || 'No description available',
        technicalFeatures,
        specifications,
        highlighted: index === 0, // Highlight first product
        imageUrl: getProductImageUrl(p) || productImage, // Each model has its own image
      };
    });

    // Get first product data for initial display
    const firstProductData = models[0];

    return (
      <div className="min-h-screen bg-slate-50">
        <Header currentPage="products" />
        <ProductDetail
          product={{
            name: firstProduct.Series || seriesName || 'Unknown Series',
            image: getProductImageUrl(firstProduct) || productImage,
            description: firstProductData.description,
            technicalFeatures: firstProductData.technicalFeatures,
            specifications: firstProductData.specifications,
            models: models,
            seriesName: firstProduct.Subtype || firstProduct.Type || 'Vacuum Pumps',
            brandColor: colors.primaryColor,
            brand: brand.name, // Use frontend brand name
          }}
          onBack={() => navigate(`/products/categories/${brandId}`)}
        />
        <Footer />
      </div>
    );
  }

  // Fallback to hardcoded data
  let selectedProduct = null;
  let categoryTitle = "";

  if (brand && seriesName) {
    for (const category of brand.categories) {
      const series = category.series.find(s => s.name === decodeURIComponent(seriesName));
      if (series) {
        selectedProduct = {
          series,
          categoryTitle: category.title
        };
        categoryTitle = category.title;
        break;
      }
    }
  }

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header currentPage="products" />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-16 h-16 text-red-500 animate-spin mb-6" />
          <p className="text-slate-600 text-lg">Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!selectedProduct || !brand) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header currentPage="products" />
        <div className="flex items-center justify-center py-20">
          <p className="text-slate-400">Product series not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const category = brand.categories.find(cat => cat.title === categoryTitle);
  const models = category?.series.map(s => ({
    name: s.name,
    highlighted: s.name === selectedProduct.series.name,
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage="products" />
      <ProductDetail
        product={{
          name: selectedProduct.series.name,
          image: selectedProduct.series.image,
          description: selectedProduct.series.description,
          technicalFeatures: [
            "GP ultimate vacuum: 0.1 Mbar/abs",
            "GPM ultimate vacuum: 0.1 Mbar/abs",
            "Displacement: from 11 to 300 m3/h",
            "Displacement upon request: 400-600-750-1000 m3/h"
          ],
          specifications: {
            "Type": "VER-2",
            "10 Hz": "4.1",
            "10 Hz (continued)": "19.2",
            "50 Hz": "0.10",
            "50 Hz (continued)": "0.22",
            "Motor Speed (single phase)": "3000"
          },
          models: models,
          seriesName: categoryTitle,
          brandColor: brand.primaryColor,
        }}
        onBack={() => navigate(`/products/categories/${brandId}`)}
      />
      <Footer />
    </div>
  );
}
