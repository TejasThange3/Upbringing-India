import { Card } from "./ui/card";

interface BrandCardProps {
  brand: {
    name: string;
    country: string;
    logo: string;
  };
  onClick: () => void;
}

export function BrandCard({ brand, onClick }: BrandCardProps) {
  return (
    <Card 
      className="bg-white rounded-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col items-center justify-center min-h-[280px]"
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-6 h-32">
        <img 
          src={brand.logo} 
          alt={brand.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-slate-900 mb-2">{brand.name}</h3>
        <p className="text-red-500 text-sm">{brand.country}</p>
      </div>
    </Card>
  );
}
