import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import bgImage from "../assets/bg.jpg";

interface SearchSectionProps {
  application: string;
  setApplication: (value: string) => void;
  power: string;
  setPower: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  onSearch: () => void;
}

export function SearchSection({
  application,
  setApplication,
  power,
  setPower,
  description,
  setDescription,
  onSearch,
}: SearchSectionProps) {
  const isSearchEnabled = application && power && description;

  return (
    <section className="relative -mt-16 z-20">
      <div className="container mx-auto px-4">
        <div
          className="rounded-2xl shadow-lg p-8 max-w-4xl mx-auto bg-white"
          style={{
            willChange: 'transform',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <h2 className="text-center text-slate-900 mb-2">Find Your Perfect Pump</h2>
          <p className="text-center text-slate-600 mb-6">
            Select your application and describe your requirements to discover the ideal solution
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-slate-700 mb-2">
                <span className="text-red-500">*</span> Choose Your Application
              </label>
              <Select value={application} onValueChange={setApplication}>
                <SelectTrigger className="w-full" style={{border:" 1px solid #A9A7A7"}}>
                  <SelectValue placeholder="Find Your Perfect Pump" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food Industry</SelectItem>
                  <SelectItem value="chemical">Chemical Industry</SelectItem>
                  <SelectItem value="pharmaceutical">Pharmaceutical Industry</SelectItem>
                  <SelectItem value="manufacturing">Industrial Manufacturing</SelectItem>
                  <SelectItem value="packaging">Packaging</SelectItem>
                  <SelectItem value="vacuum">Vacuum Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                <span className="text-red-500">*</span> Kw
              </label>
              <Select value={power} onValueChange={setPower}>
                <SelectTrigger className="w-full" style={{border:" 1px solid #A9A7A7"}}>
                  <SelectValue placeholder="Select Power Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                <span className="text-red-500">*</span> Description
              </label>
              <Input
                type="text"
                placeholder="Describe your requirements"
                className="w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{border:" 1px solid #A9A7A7", height: '50px'}}
              />
            </div>
          </div>

          <div className="text-center">
            <Button
              className="bg-red-500 hover:bg-red-600 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isSearchEnabled}
              onClick={onSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}