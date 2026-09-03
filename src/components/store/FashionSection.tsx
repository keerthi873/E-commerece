import * as React from "react";
import { Shirt, Sparkles, Baby, Tag, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { products, type Product } from "./catalog";
import { ProductFilters } from "./ProductFilters";
import { SortAndStatsHeader } from "./SortAndStatsHeader";
import { DEFAULT_FILTER_STATE, type FilterState, type SortOption } from "./filter-types";

type SubCategoryDef = {
  id: string;
  label: string;
  image: string;
};

const MEN_SUBCATEGORIES: SubCategoryDef[] = [
  {
    id: "casual",
    label: "Casual Wear",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "ethnic",
    label: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "sports",
    label: "Active Sports",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "essentials",
    label: "Essentials",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "boys",
    label: "Boys Fashion",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "addons",
    label: "Add-ons & Belts",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "fragrance",
    label: "Fragrance",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "footwear",
    label: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
  },
];

const WOMEN_SUBCATEGORIES: SubCategoryDef[] = [
  {
    id: "western",
    label: "Western Wear",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "ethnic",
    label: "Ethnic & Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "fusion",
    label: "Fusion Wear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "essentials",
    label: "Daily Essentials",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "sportswear",
    label: "Active Sportswear",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "girls",
    label: "Girls Fashion",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "footwear",
    label: "Footwear & Heels",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=300&q=80",
  },
];

const KIDS_SUBCATEGORIES: SubCategoryDef[] = [
  {
    id: "girls",
    label: "Girls Wear",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "boys",
    label: "Boys Wear",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "infants",
    label: "Infants Wear",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "teens",
    label: "Teens Wear",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "addons",
    label: "Toys & Add-ons",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=300&q=80",
  },
];

export function FashionSection() {
  const [activeGender, setActiveGender] = React.useState<"men" | "women" | "kids">("men");
  const [selectedSub, setSelectedSub] = React.useState<string | null>(null);
  const [filterState, setFilterState] = React.useState<FilterState>(DEFAULT_FILTER_STATE);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  const handleGenderChange = (g: "men" | "women" | "kids") => {
    setActiveGender(g);
    setSelectedSub(null);
    setFilterState(DEFAULT_FILTER_STATE);
  };

  const clearAllFilters = () => {
    setSelectedSub(null);
    setFilterState(DEFAULT_FILTER_STATE);
  };

  const currentSubCategories = React.useMemo(() => {
    if (activeGender === "men") return MEN_SUBCATEGORIES;
    if (activeGender === "women") return WOMEN_SUBCATEGORIES;
    return KIDS_SUBCATEGORIES;
  }, [activeGender]);

  // Compute available brands for fashion
  const availableBrands = React.useMemo(() => {
    const brandSet = new Set<string>();
    products
      .filter((p) => p.category === "Fashion" && p.fashionCategory === activeGender)
      .forEach((p) => {
        if (p.brand) brandSet.add(p.brand);
      });
    return Array.from(brandSet);
  }, [activeGender]);

  // Filter & Sort Pipeline
  const displayedProducts = React.useMemo(() => {
    let result = products.filter((p) => {
      const isFashion = p.category === "Fashion";
      const matchGender = p.fashionCategory === activeGender;
      const matchSub = !selectedSub || p.subCategory === selectedSub;

      // In-category search
      const matchQuery =
        !filterState.searchQuery ||
        p.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(filterState.searchQuery.toLowerCase());

      // Price range
      const matchPrice =
        p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1];

      // Colors
      const matchColor =
        filterState.selectedColors.length === 0 ||
        (p.color && filterState.selectedColors.includes(p.color));

      // Sizes
      const matchSize =
        filterState.selectedSizes.length === 0 ||
        (p.sizes && p.sizes.some((s) => filterState.selectedSizes.includes(s)));

      // Brands
      const matchBrand =
        filterState.selectedBrands.length === 0 ||
        (p.brand && filterState.selectedBrands.includes(p.brand));

      // Assured
      const matchAssured = !filterState.onlyAssured || Boolean(p.isAssured);

      // Min Rating
      const matchRating = filterState.minRating === 0 || p.rating >= filterState.minRating;

      // Min Discount
      const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      const matchDiscount = filterState.minDiscount === 0 || off >= filterState.minDiscount;

      return (
        isFashion &&
        matchGender &&
        matchSub &&
        matchQuery &&
        matchPrice &&
        matchColor &&
        matchSize &&
        matchBrand &&
        matchAssured &&
        matchRating &&
        matchDiscount
      );
    });

    // Sorting
    switch (filterState.sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        result = [...result].sort((a, b) => {
          const offA = (a.mrp - a.price) / a.mrp;
          const offB = (b.mrp - b.price) / b.mrp;
          return offB - offA;
        });
        break;
      default:
        // Relevance / default
        break;
    }

    return result;
  }, [activeGender, selectedSub, filterState]);

  const mainCategories = [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: Sparkles },
    { id: "kids", label: "Kids", icon: Baby },
  ];

  const currentSubObj = currentSubCategories.find((s) => s.id === selectedSub);
  const activeSubTitle = selectedSub
    ? `${activeGender.toUpperCase()} / ${currentSubObj?.label}`
    : `All ${activeGender.toUpperCase()}'s Fashion`;

  return (
    <section id="fashion-section" className="mx-auto max-w-[1400px] px-4 py-6 scroll-mt-24">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Fashion Store</h1>
        <p className="text-sm text-muted-foreground">
          Explore curated fashion for Men, Women & Kids with Flipkart & Amazon style smart filters
        </p>
      </div>

      {/* Top Gender Navigation Bar */}
      <nav className="flex items-center justify-start gap-8 border-b border-border pb-3 mb-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mainCategories.map((cat) => {
          const IconComp = cat.icon;
          const isSelected = activeGender === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleGenderChange(cat.id as "men" | "women" | "kids")}
              className={
                "flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer py-1 border-b-2 -mb-[13px] whitespace-nowrap " +
                (isSelected
                  ? "border-brand text-brand font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground")
              }
            >
              <IconComp className={`size-4 ${isSelected ? "text-brand" : "opacity-70"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Explore Subcategories Widget Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Tag className="size-3.5 text-brand" />
            Explore {activeGender.toUpperCase()} Categories ({currentSubCategories.length})
          </h3>
          {selectedSub && (
            <button
              onClick={() => setSelectedSub(null)}
              className="text-xs font-semibold text-brand hover:underline cursor-pointer"
            >
              Clear Subcategory
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {currentSubCategories.map((sub) => {
            const isActive = selectedSub === sub.id;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSub(isActive ? null : sub.id)}
                className={
                  "group relative overflow-hidden rounded-lg border text-left transition-all p-2 flex flex-col items-center gap-2 cursor-pointer shadow-2xs " +
                  (isActive
                    ? "border-brand bg-brand/5 ring-2 ring-brand"
                    : "border-border bg-card hover:border-brand/60 hover:shadow-md")
                }
              >
                <div className="aspect-square w-full overflow-hidden bg-muted rounded-md relative">
                  <img
                    src={sub.image}
                    alt={sub.label}
                    loading="lazy"
                    width={300}
                    height={300}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-brand/20 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-brand text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Selected
                      </span>
                    </div>
                  )}
                </div>
                <span
                  className={
                    "text-xs font-bold text-center leading-tight line-clamp-1 " +
                    (isActive ? "text-brand" : "text-foreground")
                  }
                >
                  {sub.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Pane Layout: Left Sidebar Filters + Right Product Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-start">
        {/* Left Sidebar Filters (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <ProductFilters
            filters={filterState}
            onFilterChange={setFilterState}
            onClearAll={clearAllFilters}
            totalResults={displayedProducts.length}
            availableBrands={availableBrands}
          />
        </div>

        {/* Mobile Filter Modal Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs lg:hidden">
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-background p-4 shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-brand" />
                  Product Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="size-5" />
                </button>
              </div>
              <ProductFilters
                filters={filterState}
                onFilterChange={setFilterState}
                onClearAll={clearAllFilters}
                totalResults={displayedProducts.length}
                availableBrands={availableBrands}
              />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="mt-4 w-full bg-brand py-2 text-xs font-bold text-primary-foreground rounded-md"
              >
                Apply Filters ({displayedProducts.length})
              </button>
            </div>
          </div>
        )}

        {/* Right Side: Header Sorting & Product Grid */}
        <div className="lg:col-span-3">
          <SortAndStatsHeader
            totalCount={displayedProducts.length}
            currentSort={filterState.sortBy}
            onSortChange={(sortBy: SortOption) => setFilterState({ ...filterState, sortBy })}
            onMobileFilterOpen={() => setMobileFilterOpen(true)}
            categoryTitle={activeSubTitle}
          />

          {displayedProducts.length === 0 ? (
            <div className="py-16 text-center bg-card rounded-lg border border-border px-4 shadow-2xs">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
                <Tag className="size-6" />
              </div>
              <p className="text-base font-bold text-foreground">No matching products found</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Try expanding your price range, clearing specific filters, or searching with different keywords.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-brand text-primary-foreground px-4 py-2 text-xs font-bold rounded-md hover:bg-brand-deep transition-colors cursor-pointer shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">
              {displayedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  badgeLabel={p.subCategory?.toUpperCase()}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
