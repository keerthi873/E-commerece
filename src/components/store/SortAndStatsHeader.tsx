import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import type { SortOption } from "./filter-types";

interface SortAndStatsHeaderProps {
  totalCount: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onMobileFilterOpen?: () => void;
  categoryTitle?: string;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Price -- Low to High", value: "price-asc" },
  { label: "Price -- High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "rating" },
  { label: "Discount", value: "discount" },
];

export function SortAndStatsHeader({
  totalCount,
  currentSort,
  onSortChange,
  onMobileFilterOpen,
  categoryTitle,
}: SortAndStatsHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-3 mb-4">
      <div className="flex items-center gap-3 justify-between sm:justify-start">
        <div>
          {categoryTitle && (
            <h2 className="text-base font-bold text-foreground capitalize leading-tight">
              {categoryTitle}
            </h2>
          )}
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            Showing <span className="font-bold text-foreground">{totalCount}</span> product(s)
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        {onMobileFilterOpen && (
          <button
            onClick={onMobileFilterOpen}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground sm:hidden cursor-pointer hover:border-brand"
          >
            <SlidersHorizontal className="size-3.5 text-brand" />
            Filters
          </button>
        )}
      </div>

      {/* Sorting bar */}
      <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 shrink-0">
          <ArrowUpDown className="size-3 text-brand" />
          Sort By:
        </span>

        <div className="flex items-center gap-1">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = currentSort === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand text-primary-foreground font-bold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
