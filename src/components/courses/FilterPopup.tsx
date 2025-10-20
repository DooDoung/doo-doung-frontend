import { useState } from "react";

import { GlobalButton, GlobalInput } from "@/components/globalComponents";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/globalComponents/Select";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filters: FilterState) => void;
}

export interface FilterState {
  sortBy: string;
  priceRange: [number, number];
  horoscopeMethod: string;
  horoscopeSector: string;
}

// Custom styles for dual range slider
const sliderStyles = `
  .range-slider {
    position: relative;
    height: 4px;
    background: #f8d7da;
    border-radius: 4px;
  }
  
  .range-slider-track {
    position: absolute;
    height: 4px;
    background: var(--accent-pink);
    border-radius: 4px;
    top: 0;
  }
  
  .slider-thumb {
    position: absolute;
    height: 8px;
    background: transparent;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    pointer-events: none;
  }
  
  .slider-thumb::-webkit-slider-thumb {
    appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: var(--accent-pink);
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    pointer-events: auto;
    position: relative;
    z-index: 2;
    transform: translateY(-6px);
  }
  
  .slider-thumb::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--accent-pink);
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    pointer-events: auto;
    position: relative;
    z-index: 2;
    transform: translateY(-6px);
  }
  
  .slider-thumb::-webkit-slider-track {
    height: 8px;
    background: transparent;
    border: none;
  }
  
  .slider-thumb::-moz-range-track {
    height: 8px;
    background: transparent;
    border: none;
  }
`;

const FilterPopup = ({ isOpen, onClose, onApply }: FilterPopupProps) => {
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 3000]);
  const [horoscopeMethod, setHoroscopeMethod] = useState("");
  const [horoscopeSector, setHoroscopeSector] = useState("");

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];

    if (index === 0) {
      // Min value shouldn't be greater than max value
      newRange[0] = Math.min(value, priceRange[1] - 10);
    } else {
      // Max value shouldn't be less than min value
      newRange[1] = Math.max(value, priceRange[0] + 10);
    }

    setPriceRange(newRange);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        sortBy,
        priceRange,
        horoscopeMethod,
        horoscopeSector,
      });
    }
    onClose();
  };

  const handleCancel = () => {
    // Reset to default values
    setSortBy("Newest Update");
    setPriceRange([100, 3000]);
    setHoroscopeMethod("");
    setHoroscopeSector("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      <div className="font-chakra fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl">
          {/* Sort by Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Sort by
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { value: "Lowest Price", label: "Lowest Price" },
                { value: "Highest Price", label: "Highest Price" },
                { value: "Oldest Update", label: "Oldest" },
                { value: "Popular", label: "Popular" },
                { value: "Newest Update", label: "Newest" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Filter by
            </h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="mb-3 text-lg font-medium text-gray-700">
                Price Range
              </h4>
              <div className="flex items-center gap-4">
                {/* Min value label */}
                <span className="text-sm font-medium text-gray-500">10฿</span>

                {/* Slider container */}
                <div className="flex-1 px-4">
                  <div className="relative py-8">
                    {/* Value labels above sliders */}
                    <div className="absolute -top-2 w-full">
                      <div
                        className="bg-primary-500 text-neutral-black absolute -translate-x-1/2 transform rounded-full px-3 py-1 text-sm"
                        style={{
                          left: `${((priceRange[0] - 10) / (3000 - 10)) * 100}%`,
                        }}
                      >
                        {priceRange[0]}฿
                      </div>
                      <div
                        className="bg-primary-500 text-neutral-black absolute -translate-x-1/2 transform rounded-full px-3 py-1 text-sm"
                        style={{
                          left: `${((priceRange[1] - 10) / (3000 - 10)) * 100}%`,
                        }}
                      >
                        {priceRange[1]}฿
                      </div>
                    </div>

                    {/* Background track */}
                    <div className="range-slider">
                      {/* Active range track */}
                      <div
                        className="range-slider-track"
                        style={{
                          left: `${((priceRange[0] - 10) / (3000 - 10)) * 100}%`,
                          width: `${((priceRange[1] - priceRange[0]) / (3000 - 10)) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Min range slider */}
                    <input
                      type="range"
                      min="10"
                      max="3000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange(0, parseInt(e.target.value))
                      }
                      className="slider-thumb w-full"
                    />

                    {/* Max range slider */}
                    <input
                      type="range"
                      min="10"
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceChange(1, parseInt(e.target.value))
                      }
                      className="slider-thumb w-full"
                    />
                  </div>
                </div>

                {/* Max value label */}
                <span className="text-sm font-medium text-gray-500">3000฿</span>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap text-gray-700">
                  Horoscope Method
                </label>
                <GlobalInput
                  value={horoscopeMethod}
                  onChange={(e) => setHoroscopeMethod(e.target.value)}
                  placeholder="Enter Horoscope method"
                  className="w-48"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium whitespace-nowrap text-gray-700">
                  Horoscope Sector
                </label>
                <Select
                  value={horoscopeSector}
                  onValueChange={setHoroscopeSector}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Choose sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOVE">Love</SelectItem>
                    <SelectItem value="WORK">Work</SelectItem>
                    <SelectItem value="STUDY">Study</SelectItem>
                    <SelectItem value="MONEY">Money</SelectItem>
                    <SelectItem value="LUCK">Luck</SelectItem>
                    <SelectItem value="FAMILY">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <GlobalButton
              variant="secondary"
              onClick={handleCancel}
              className="w-28"
            >
              Cancel
            </GlobalButton>
            <GlobalButton
              variant="primary"
              onClick={handleApply}
              className="w-28"
            >
              Apply
            </GlobalButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPopup;
