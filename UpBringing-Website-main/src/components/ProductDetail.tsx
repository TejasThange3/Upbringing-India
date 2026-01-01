import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { InquiryModal } from "./InquiryModal";

interface ProductSpec {
  [key: string]: string;
}

interface ProductModel {
  name: string;
  description: string;
  technicalFeatures: string[];
  specifications: ProductSpec;
  highlighted?: boolean;
  imageUrl?: string; // Image URL for this specific model
}

interface ProductDetailData {
  name: string;
  image: string;
  description: string;
  technicalFeatures: string[];
  specifications: ProductSpec;
  models?: ProductModel[];
  seriesName?: string;
  brandColor?: string;
  brand?: string;
}

interface ProductDetailProps {
  product: ProductDetailData;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedModel, setSelectedModel] = useState(product.models?.[0]?.name || "");
  const [showSpecs, setShowSpecs] = useState(false);
  const [selectedTableModel, setSelectedTableModel] = useState("VER-2");
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Get the currently selected product model data
  const currentModelData = product.models?.find(m => m.name === selectedModel) || {
    name: selectedModel,
    description: product.description,
    technicalFeatures: product.technicalFeatures,
    specifications: product.specifications,
    imageUrl: product.image
  };

  // Use the model's specific image if available, otherwise use the default product image
  const currentImage = currentModelData.imageUrl || product.image;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-100 to-slate-50">
      {/* Header with title */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-b-4 border-blue-300 py-6 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontWeight: 600, fontSize: 40, }}>
            PRODUCT<span className="text-red-600">S</span>
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Category Title */}
      <div className="bg-white border-b border-slate-200 py-3 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">
            {product.seriesName}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="flex top-4 relative  grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Models */}
          {product.models && product.models.length > 0 && (
            <div className="w-full lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-32">
                <h3 className="text-xs font-bold text-slate-700 mb-4 uppercase tracking-wider">
                  Models
                </h3>
                <div className="space-y-2">
                  {product.models.map((model, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedModel(model.name)}
                      className={`w-full text-left px-4 py-2.5 rounded text-sm font-semibold transition-all duration-200 ${
                        selectedModel === model.name
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Content */}
          <div className={product.models ? "lg:col-span-3" : "lg:col-span-4"}>
            {/* Product Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {product.name}
              </h1>
            </div>

            {/* Main Product Section */}
            <div className="bg-white rounded-lg shadow p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex items-center justify-center bg-slate-100 rounded-lg p-6 min-h-72">
                  <img
                    src={currentImage}
                    alt={selectedModel || product.name}
                    className="max-w-full max-h-full object-contain"
                    key={selectedModel} // Force re-render when model changes
                  />
                </div>

                {/* Product Info */}
                <div>
                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed mb-6 text-sm">
                    {currentModelData.description}
                  </p>

                  {/* Technical Features */}
                  {currentModelData.technicalFeatures && currentModelData.technicalFeatures.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                        Technical Features
                      </h3>
                      <ul className="space-y-2 mb-8">
                        {currentModelData.technicalFeatures.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-slate-700 text-sm"
                          >
                            <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* View Technical Data Button */}
                  {currentModelData.specifications && Object.keys(currentModelData.specifications).length > 0 && (
                    <Button
                      onClick={() => setShowSpecs(!showSpecs)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {showSpecs ? "Hide" : "View"} Technical Data
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            {showSpecs && currentModelData.specifications && Object.keys(currentModelData.specifications).length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-8">
                  <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">
                    Technical Specifications - {selectedModel}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          <th className="px-4 py-3 text-left font-bold">Specification</th>
                          <th className="px-4 py-3 text-left font-bold">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(currentModelData.specifications).map(([key, value], idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-slate-200 ${
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                            } hover:bg-slate-100`}
                          >
                            <td className="px-4 py-3 font-semibold text-slate-900">{key}</td>
                            <td className="px-4 py-3 text-slate-700">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiry Button */}
            <div className="mt-8">
              <Button
                onClick={() => setIsInquiryModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded"
              >
                Inquire About This Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        productName={selectedModel || product.name}
        brandName={product.brand}
      />
    </section>
  );
}
