import * as React from "react";
import { Filter, RotateCcw, Check, Star, ShieldCheck, Search, X } from "lucide-react";
import type { FilterState } from "./filter-types";

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  totalResults: number;
  availableBrands?: string[];
}

const COLOR_OPTIONS = [
  { name: "Red", bgClass: "bg-red-500" },
  { name: "Blue", bgClass: "bg-blue-500" },
  { name: "Black", bgClass: "bg-black" },
  { name: "White", bgClass: "bg-white border border-slate-300 dark:border-slate-700" },
  { name: "Green", bgClass: "bg-emerald-500" },
  { name: "Yellow", bgClass: "bg-amber-400" },
];

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];
const RATING_OPTIONS = [4, 3, 2];
const DISCOUNT_OPTIONS = [
  { label: "50% or more", value: 50 },
  { label: "30% or more", value: 30 },
  { label: "20% or more", value: 20 },
  { label: "10% or more", value: 10 },
];

const PRICE_PRESETS = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 - ₹5,000", min: 2500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 100000 },
];

export function ProductFilters({
  filters,
  onFilterChange,
  onClearAll,
  totalResults,
  availableBrands = ["Zara", "H&M", "Nike", "Adidas", "Puma", "Loomwear", "Nexon", "Cleanleaf"],
}: ProductFiltersProps) {
  const [brandSearch, setBrandSearch] = React.useState("");

  const activeFilterCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000 ? 1 : 0) +
    filters.selectedColors.length +
    filters.selectedSizes.length +
    filters.selectedBrands.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.onlyAssured ? 1 : 0);

  const handleToggleColor = (color: string) => {
    const updated = filters.selectedColors.includes(color)
      ? filters.selectedColors.filter((c) => c !== color)
      : [...filters.selectedColors, color];
    onFilterChange({ ...filters, selectedColors: updated });
  };

  const handleToggleSize = (size: string) => {
    const updated = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({ ...filters, selectedSizes: updated });
  };

  const handleToggleBrand = (brand: string) => {
    const updated = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onFilterChange({ ...filters, selectedBrands: updated });
  };

  const filteredBrands = availableBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="w-full space-y-5 rounded-lg border border-border bg-card p-4 shadow-sm">
      {/* Filter Header & Reset */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-brand" />
          <h2 className="text-sm font-bold text-foreground">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline cursor-pointer"
          >
            <RotateCcw className="size-3" />
            Clear All
          </button>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-border">
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand border border-brand/20">
              "{filters.searchQuery}"
              <X
                className="size-3 cursor-pointer hover:opacity-80"
                onClick={() => onFilterChange({ ...filters, searchQuery: "" })}
              />
            </span>
          )}
          {filters.onlyAssured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Assured Only
              <X
                className="size-3 cursor-pointer hover:opacity-80"
                onClick={() => onFilterChange({ ...filters, onlyAssured: false })}
              />
            </span>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand border border-brand/20">
              ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              <X
                className="size-3 cursor-pointer hover:opacity-80"
                onClick={() => onFilterChange({ ...filters, priceRange: [0, 100000] })}
              />
            </span>
          )}
          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {filters.minRating}★ & above
              <X
                className="size-3 cursor-pointer hover:opacity-80"
                onClick={() => onFilterChange({ ...filters, minRating: 0 })}
              />
            </span>
          )}
          {filters.minDiscount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {filters.minDiscount}%+ Off
              <X
                className="size-3 cursor-pointer hover:opacity-80"
                onClick={() => onFilterChange({ ...filters, minDiscount: 0 })}
              />
            </span>
          )}
          {filters.selectedColors.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-0.5 text-[11px] font-bold text-foreground border border-border"
            >
              {c}
              <X className="size-3 cursor-pointer hover:opacity-80" onClick={() => handleToggleColor(c)} />
            </span>
          ))}
          {filters.selectedSizes.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-0.5 text-[11px] font-bold text-foreground border border-border"
            >
              Size: {s}
              <X className="size-3 cursor-pointer hover:opacity-80" onClick={() => handleToggleSize(s)} />
            </span>
          ))}
          {filters.selectedBrands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-bold text-brand border border-brand/20"
            >
              {b}
              <X className="size-3 cursor-pointer hover:opacity-80" onClick={() => handleToggleBrand(b)} />
            </span>
          ))}
        </div>
      )}

      {/* 1. Flipkart / Amazon Assured Toggle */}
      <div className="flex items-center justify-between rounded-md border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-xs font-bold text-foreground leading-none">Kartly Assured</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Quality tested & fast delivery</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, onlyAssured: !filters.onlyAssured })}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            filters.onlyAssured ? "bg-blue-600" : "bg-muted"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              filters.onlyAssured ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* 2. In-Category Keyword Search */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Search in Results
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full rounded-md border border-border bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Price Range Filter & Presets */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Price Range
          </span>
          <span className="text-xs font-semibold text-brand">
            ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
          </span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={0}
          max={10000}
          step={250}
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priceRange: [filters.priceRange[0], Number(e.target.value)],
            })
          }
          className="w-full accent-brand cursor-pointer"
        />

        {/* Presets */}
        <div className="mt-2 flex flex-wrap gap-1">
          {PRICE_PRESETS.map((preset) => {
            const isSelected =
              filters.priceRange[0] === preset.min && filters.priceRange[1] === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    priceRange: isSelected ? [0, 100000] : [preset.min, preset.max],
                  })
                }
                className={`px-2 py-1 text-[10px] font-semibold rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? "border-brand bg-brand/10 text-brand font-bold"
                    : "border-border text-muted-foreground hover:border-brand hover:text-foreground"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Customer Rating Filter */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Customer Ratings
        </span>
        <div className="space-y-1">
          {RATING_OPTIONS.map((stars) => {
            const isSelected = filters.minRating === stars;
            return (
              <button
                key={stars}
                onClick={() =>
                  onFilterChange({ ...filters, minRating: isSelected ? 0 : stars })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                    : "border-border text-foreground hover:border-emerald-500/50"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    {stars} <Star className="size-3 fill-amber-500" />
                  </span>
                  <span>& above</span>
                </div>
                {isSelected && <Check className="size-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Discount Percentage Filter */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Discount
        </span>
        <div className="space-y-1">
          {DISCOUNT_OPTIONS.map((disc) => {
            const isSelected = filters.minDiscount === disc.value;
            return (
              <button
                key={disc.value}
                onClick={() =>
                  onFilterChange({ ...filters, minDiscount: isSelected ? 0 : disc.value })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "border-brand bg-brand/10 text-brand font-bold"
                    : "border-border text-foreground hover:border-brand/50"
                }`}
              >
                <span>{disc.label}</span>
                {isSelected && <Check className="size-3.5 text-brand" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Color Swatch Filter */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Color
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_OPTIONS.map((c) => {
            const isChecked = filters.selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleToggleColor(c.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                  isChecked
                    ? "border-brand font-bold ring-1 ring-brand bg-brand/10 text-brand"
                    : "border-border bg-background text-foreground hover:border-brand"
                }`}
              >
                <span className={`size-3.5 rounded-full ${c.bgClass} inline-block`} />
                <span>{c.name}</span>
                {isChecked && <Check className="size-3 text-brand" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Size Filter */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Size
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SIZE_OPTIONS.map((size) => {
            const isChecked = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleToggleSize(size)}
                className={`min-w-8 px-2.5 py-1 text-xs rounded-md border font-semibold transition-all cursor-pointer text-center ${
                  isChecked
                    ? "border-brand bg-brand text-primary-foreground font-bold shadow-xs"
                    : "border-border bg-background text-foreground hover:border-brand"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Brand Filter Checklist */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Brand
          </span>
          <span className="text-[10px] text-muted-foreground">{filteredBrands.length} brands</span>
        </div>

        {availableBrands.length > 5 && (
          <input
            type="text"
            placeholder="Search brand..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="mb-2 w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        )}

        <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
          {filteredBrands.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer hover:text-brand"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleBrand(brand)}
                  className="rounded border-border text-brand focus:ring-brand accent-brand size-3.5"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
