export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "discount" | "newest";

export interface FilterState {
  searchQuery: string;
  priceRange: [number, number];
  selectedColors: string[];
  selectedSizes: string[];
  selectedBrands: string[];
  minRating: number; // e.g. 0, 3, 4
  minDiscount: number; // e.g. 0, 10, 30, 50, 70
  onlyAssured: boolean;
  sortBy: SortOption;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  searchQuery: "",
  priceRange: [0, 100000],
  selectedColors: [],
  selectedSizes: [],
  selectedBrands: [],
  minRating: 0,
  minDiscount: 0,
  onlyAssured: false,
  sortBy: "relevance",
};
