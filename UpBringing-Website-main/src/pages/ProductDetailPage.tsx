import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductDetail } from "../components/ProductDetail";
import { useParams, useNavigate } from "react-router-dom";
import productImage from 'figma:asset/a4a5af2683bbdd28f7ae7396c60654e45e826fcd.png';

const productsDataByBrand: { [key: string]: any } = {
  "1": {
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
    technicalFeatures: [
      "Oil-lubricated rotary vane design",
      "High pumping speed",
      "Compact construction",
      "Low noise operation",
      "Easy maintenance"
    ],
    models: [
      { name: "GP300E Standard", highlighted: true },
      { name: "GP300E Premium" },
      { name: "GP300E Heavy Duty" }
    ],
    image: productImage
  },
  "2": {
    brand: "FIPA GMBH",
    product: "FP Series",
    type: "Vacuum Pump",
    subtype: "Rotary Vane Pump",
    description: "Premium rotary vane pumps from Germany with superior efficiency",
    specifications: {
      "m3/h": "350",
      "Hz": "50",
      "Vacuum (mbar)": "0.5",
      "Pressure (mbar)": "2000",
      "Motor Rating (kW)": "7.5",
      "RPM": "1450",
      "Oil (ltr)": "3.0"
    },
    technicalFeatures: [
      "German engineering",
      "High reliability",
      "Low vibration",
      "Energy efficient"
    ],
    models: [
      { name: "FP Series Standard", highlighted: true },
      { name: "FP Series Premium" }
    ],
    image: productImage
  },
  "3": {
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
    technicalFeatures: [
      "Variable speed drive technology",
      "Energy efficient operation",
      "High performance screw design",
      "Advanced cooling system",
      "Integrated monitoring"
    ],
    models: [
      { name: "GHS VSD+ 110", highlighted: true },
      { name: "GHS VSD+ 160" },
      { name: "GHS VSD+ 250" }
    ],
    image: productImage
  },
  "4": {
    brand: "BRIWATEC GMBH",
    product: "BW Series",
    type: "Blower",
    subtype: "Rotary Lobe Blower",
    description: "Reliable German-made rotary lobe blowers for industrial applications",
    specifications: {
      "m3/h": "500",
      "Hz": "50",
      "Pressure (mbar)": "800",
      "Motor Rating (kW)": "15",
      "RPM": "1450",
      "Oil (ltr)": "5.0"
    },
    technicalFeatures: [
      "Rotary lobe design",
      "High flow rate",
      "Compact size",
      "Low maintenance"
    ],
    models: [
      { name: "BW Series Standard", highlighted: true },
      { name: "BW Series Heavy Duty" }
    ],
    image: productImage
  },
  "5": {
    brand: "SUPERVANE",
    product: "SV Pump",
    type: "Vacuum Pump",
    subtype: "Rotary Vane Pump",
    description: "High-quality UK-manufactured rotary vane vacuum pumps",
    specifications: {
      "m3/h": "400",
      "Hz": "50",
      "Vacuum (mbar)": "0.5",
      "Pressure (mbar)": "2000",
      "Motor Rating (kW)": "10",
      "RPM": "1450",
      "Oil (ltr)": "3.5"
    },
    technicalFeatures: [
      "UK engineered",
      "Precision manufactured",
      "Long service life",
      "Quiet operation"
    ],
    models: [
      { name: "SV Pump Standard", highlighted: true },
      { name: "SV Pump Heavy Duty" }
    ],
    image: productImage
  }
};

export function ProductDetailPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();

  const rawProduct = brandId ? productsDataByBrand[brandId] : null;

  if (!rawProduct) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header currentPage="products" />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/products")}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Map the raw data to match ProductDetail interface
  const product = {
    name: rawProduct.product,
    brand: rawProduct.brand,
    image: rawProduct.image,
    description: rawProduct.description,
    technicalFeatures: rawProduct.technicalFeatures,
    specifications: rawProduct.specifications,
    models: rawProduct.models,
    seriesName: rawProduct.subtype || rawProduct.type,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage="products" />
      <ProductDetail
        product={product}
        onBack={() => navigate("/products")}
      />
      <Footer />
    </div>
  );
}
