import * as React from "react";
import { SlidersHorizontal, RotateCcw, Check, Star, X, Tag } from "lucide-react";
import { Product, inr } from "./catalog";

export type FilterState = {
  minPrice: number;
  maxPrice: number;
  selectedBrands: string[];
  minRating: number;
  selectedColors: string[];
  selectedSizes: string[];
  minDiscount: number;
  sortBy: "featured" | "price-low" | "price-high" | "rating" | "discount";
};

export const DEFAULT_FILTER_STATE: FilterState = {
  minPrice: 0,
  maxPrice: 100000,
  selectedBrands: [],
  minRating: 0,
  selectedColors: [],
  selectedSizes: [],
  minDiscount: 0,
  sortBy: "featured",
};

export function filterAndSortProducts(
  products: Product[],
  filters: FilterState
): Product[] {
  let result = products.filter((p) => {
    // 1. Price Range
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;

    // 2. Brand
    if (
      filters.selectedBrands.length > 0 &&
      !filters.selectedBrands.includes(p.brand)
    ) {
      return false;
    }

    // 3. Rating
    if (filters.minRating > 0 && p.rating < filters.minRating) return false;

    // 4. Discount
    if (filters.minDiscount > 0) {
      const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      if (discount < filters.minDiscount) return false;
    }

    // 5. Color (if applicable)
    if (filters.selectedColors.length > 0) {
      const titleLower = p.title.toLowerCase();
      const matchesColor = filters.selectedColors.some((c) =>
        titleLower.includes(c.toLowerCase())
      );
      if (!matchesColor) return false;
    }

    // 6. Size (if applicable)
    if (filters.selectedSizes.length > 0) {
      const titleLower = p.title.toLowerCase();
      const matchesSize = filters.selectedSizes.some(
        (s) => titleLower.includes(s.toLowerCase()) || s === "M" || s === "L"
      );
      if (!matchesSize) return false;
    }

    return true;
  });

  // Sorting
  switch (filters.sortBy) {
    case "price-low":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      result = [...result].sort((a, b) => {
        const discA = ((a.mrp - a.price) / a.mrp) * 100;
        const discB = ((b.mrp - b.price) / b.mrp) * 100;
        return discB - discA;
      });
      break;
    default:
      break;
  }

  return result;
}

export function ProductFilterSidebar({
  allCategoryProducts,
  filters,
  onChange,
  onReset,
  categoryName,
}: {
  allCategoryProducts: Product[];
  filters: FilterState;
  onChange: (updated: FilterState) => void;
  onReset: () => void;
  categoryName?: string;
}) {
  // Extract unique brands dynamically from products
  const availableBrands = React.useMemo(() => {
    const set = new Set(allCategoryProducts.map((p) => p.brand).filter(Boolean));
    return Array.from(set);
  }, [allCategoryProducts]);

  // Max price limit from items
  const maxPriceLimit = React.useMemo(() => {
    if (allCategoryProducts.length === 0) return 100000;
    const highest = Math.max(...allCategoryProducts.map((p) => p.price));
    return Math.ceil(highest / 1000) * 1000 || 100000;
  }, [allCategoryProducts]);

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    onChange({ ...filters, minPrice: Math.min(val, filters.maxPrice) });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    onChange({ ...filters, maxPrice: Math.max(val, filters.minPrice) });
  };

  const toggleBrand = (brand: string) => {
    const exists = filters.selectedBrands.includes(brand);
    const updated = exists
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onChange({ ...filters, selectedBrands: updated });
  };

  const toggleColor = (color: string) => {
    const exists = filters.selectedColors.includes(color);
    const updated = exists
      ? filters.selectedColors.filter((c) => c !== color)
      : [...filters.selectedColors, color];
    onChange({ ...filters, selectedColors: updated });
  };

  const toggleSize = (size: string) => {
    const exists = filters.selectedSizes.includes(size);
    const updated = exists
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onChange({ ...filters, selectedSizes: updated });
  };

  const isFashion =
    categoryName?.toLowerCase().includes("fashion") ||
    categoryName?.toLowerCase().includes("clothing");

  const isMobileOrElec =
    categoryName?.toLowerCase().includes("mobile") ||
    categoryName?.toLowerCase().includes("electronic");

  const hasActiveFilters =
    filters.minPrice > 0 ||
    filters.maxPrice < maxPriceLimit ||
    filters.selectedBrands.length > 0 ||
    filters.minRating > 0 ||
    filters.selectedColors.length > 0 ||
    filters.selectedSizes.length > 0 ||
    filters.minDiscount > 0 ||
    filters.sortBy !== "featured";

  return (
    <aside className="w-full space-y-6 rounded-2xl border border-border bg-card p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-brand" />
          <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider">
            Filters
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3" /> Clear All
          </button>
        )}
      </div>

      {/* Sort By Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            onChange({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })
          }
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground outline-none focus:border-brand cursor-pointer"
        >
          <option value="featured">Featured Deals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="discount">Biggest Discount %</option>
        </select>
      </div>

      {/* 1. PRICE RANGE FILTER */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-muted-foreground uppercase tracking-wider">Price Range</span>
          <span className="text-brand">
            {inr(filters.minPrice)} – {inr(filters.maxPrice)}
          </span>
        </div>

        {/* Dual Range Sliders */}
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={maxPriceLimit}
            step={500}
            value={filters.minPrice}
            onChange={(e) =>
              onChange({
                ...filters,
                minPrice: Math.min(Number(e.target.value), filters.maxPrice - 500),
              })
            }
            className="w-full accent-brand cursor-pointer"
          />
          <input
            type="range"
            min={0}
            max={maxPriceLimit}
            step={500}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({
                ...filters,
                maxPrice: Math.max(Number(e.target.value), filters.minPrice + 500),
              })
            }
            className="w-full accent-brand cursor-pointer"
          />
        </div>

        {/* Manual Price Inputs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <span className="text-[10px] text-muted-foreground font-bold block mb-1">Min (₹)</span>
            <input
              type="number"
              min={0}
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={handlePriceMinChange}
              className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-bold text-foreground outline-none focus:border-brand"
            />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold block mb-1">Max (₹)</span>
            <input
              type="number"
              min={filters.minPrice}
              max={maxPriceLimit}
              value={filters.maxPrice}
              onChange={handlePriceMaxChange}
              className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-bold text-foreground outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      {/* 2. BRAND FILTER */}
      {availableBrands.length > 0 && (
        <div className="space-y-2 border-t border-border pt-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
            Brand ({availableBrands.length})
          </span>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
            {availableBrands.map((b) => {
              const checked = filters.selectedBrands.includes(b);
              return (
                <label
                  key={b}
                  onClick={() => toggleBrand(b)}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-brand transition-colors"
                >
                  <div
                    className={
                      "size-4 rounded-md border flex items-center justify-center transition-all " +
                      (checked
                        ? "bg-brand border-brand text-primary-foreground"
                        : "border-border bg-background")
                    }
                  >
                    {checked && <Check className="size-3" />}
                  </div>
                  <span>{b}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. RATING FILTER */}
      <div className="space-y-2 border-t border-border pt-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
          Customer Rating
        </span>
        <div className="space-y-1.5">
          {[4, 3, 2].map((ratingVal) => {
            const active = filters.minRating === ratingVal;
            return (
              <button
                key={ratingVal}
                onClick={() =>
                  onChange({
                    ...filters,
                    minRating: active ? 0 : ratingVal,
                  })
                }
                className={
                  "w-full px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-colors cursor-pointer " +
                  (active
                    ? "bg-brand text-primary-foreground border-brand"
                    : "border-border bg-background text-foreground hover:border-brand")
                }
              >
                <span className="flex items-center gap-1">
                  {ratingVal} <Star className="size-3.5 fill-amber-400 text-amber-400" /> & above
                </span>
                {active && <Check className="size-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. DISCOUNT FILTER */}
      <div className="space-y-2 border-t border-border pt-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
          Discount Offers
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {[10, 20, 30, 50].map((disc) => {
            const active = filters.minDiscount === disc;
            return (
              <button
                key={disc}
                onClick={() =>
                  onChange({
                    ...filters,
                    minDiscount: active ? 0 : disc,
                  })
                }
                className={
                  "px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center transition-colors cursor-pointer " +
                  (active
                    ? "bg-brand text-primary-foreground border-brand"
                    : "border-border bg-background text-foreground hover:border-brand")
                }
              >
                {disc}% or more
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. FASHION CATEGORY EXTRA FILTERS (COLOR & SIZE) */}
      {isFashion && (
        <>
          <div className="space-y-2 border-t border-border pt-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
              Color Family
            </span>
            <div className="flex flex-wrap gap-1.5">
              {["Black", "Blue", "White", "Red", "Green"].map((col) => {
                const active = filters.selectedColors.includes(col);
                return (
                  <button
                    key={col}
                    onClick={() => toggleColor(col)}
                    className={
                      "px-2.5 py-1 text-xs font-bold rounded-md border transition-all cursor-pointer " +
                      (active
                        ? "bg-brand text-primary-foreground border-brand"
                        : "border-border bg-background text-foreground hover:border-brand")
                    }
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
              Size
            </span>
            <div className="flex gap-1.5">
              {["S", "M", "L", "XL", "XXL"].map((sz) => {
                const active = filters.selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={
                      "size-8 rounded-lg border text-xs font-black flex items-center justify-center transition-all cursor-pointer " +
                      (active
                        ? "bg-brand text-primary-foreground border-brand"
                        : "border-border bg-background text-foreground hover:border-brand")
                    }
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
