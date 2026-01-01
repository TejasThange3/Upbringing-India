import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Package, Gauge, Zap } from "lucide-react";
import { useState } from "react";
import productImage from 'figma:asset/a4a5af2683bbdd28f7ae7396c60654e45e826fcd.png';

interface ProductCardProps {
  product: {
    brand: string;
    product: string;
    type: string;
    subtype: string;
    description: string;
    specifications: {
      [key: string]: string;
    };
    applications: string[];
    image?: string;
  };
}

export function ProductCard({ product, isInquiryOpen, setIsInquiryOpen }: ProductCardProps & { isInquiryOpen?: boolean; setIsInquiryOpen?: (open: boolean) => void }) {
  const [localInquiryOpen, setLocalInquiryOpen] = useState(false);
  const inquiryOpen = isInquiryOpen !== undefined ? isInquiryOpen : localInquiryOpen;
  const setInquiry = setIsInquiryOpen || setLocalInquiryOpen;

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative h-80 bg-white overflow-hidden">
        <img
          src={product.image || productImage}
          alt={product.product}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== productImage) {
              target.src = productImage;
            }
          }}
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">
            {product.type}
          </Badge>
          <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-lg">
            <p className="text-white text-sm">{product.product}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-1 border-b border-slate-100">
        <p className="text-slate-900 font-bold">{product.brand}</p>
      </div>

      <CardHeader className="pb-0 pt-0 px-6">
        <div className="flex items-start gap-2">
          <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-slate-900 mb-0">{product.subtype}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-1 px-6 pb-6">
        {/* Technical Specifications Table */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-blue-600" />
            <h4 className="text-slate-900">Technical Specifications</h4>
          </div>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-3 py-2 text-slate-700 text-sm">Parameter</th>
                  <th className="text-right px-3 py-2 text-slate-700 text-sm">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <tr 
                    key={idx} 
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    } border-b border-slate-100 last:border-b-0`}
                  >
                    <td className="px-3 py-2 text-slate-600 text-sm">{key}</td>
                    <td className="px-3 py-2 text-slate-900 text-sm text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applications */}
        <div >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-blue-600" />
            <h4 className="text-slate-900">Applications</h4>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.applications.map((app, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                style={{  whiteSpace: "normal",
    wordWrap: "break-word",
    overflowWrap: "break-word", }}
              >
                {app}
              </Badge>
            ))}
          </div>
          <Button 
            onClick={() => setInquiry(true)}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white" 
          >
            Inquire
          </Button>
        </div>
      </CardContent>
    </Card>
    </>
  );
}