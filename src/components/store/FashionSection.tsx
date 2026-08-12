import * as React from "react";
import { Shirt, Sparkles, Baby, Tag, Filter, RotateCcw, Check } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { products } from "./catalog";

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

const FILTER_COLORS = [
  { name: "Red", bgClass: "bg-red-500" },
  { name: "Blue", bgClass: "bg-blue-500" },
  { name: "Black", bgClass: "bg-black" },
  { name: "White", bgClass: "bg-white border border-border text-foreground" },
  { name: "Green", bgClass: "bg-emerald-500" },
];

const FILTER_SIZES = ["S", "M", "L", "XL", "XXL"];
const FILTER_BRANDS = ["Zara", "H&M", "Nike", "Adidas", "Puma", "Loomwear"];

export function FashionSection() {
  const [activeGender, setActiveGender] = React.useState<"men" | "women" | "kids">("men");
  const [selectedSub, setSelectedSub] = React.useState<string | null>(null);

  // Multi-select Filter States
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);

  const handleGenderChange = (g: "men" | "women" | "kids") => {
    setActiveGender(g);
    setSelectedSub(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedSub(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
  };

  const currentSubCategories = React.useMemo(() => {
    if (activeGender === "men") return MEN_SUBCATEGORIES;
    if (activeGender === "women") return WOMEN_SUBCATEGORIES;
    return KIDS_SUBCATEGORIES;
  }, [activeGender]);

  const hasActiveFilters =
    selectedSub !== null ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    selectedBrands.length > 0;

  const displayedProducts = React.useMemo(() => {
    return products.filter((p) => {
      const isFashion = p.category === "Fashion";
      const matchGender = p.fashionCategory === activeGender;
      const matchSub = !selectedSub || p.subCategory === selectedSub;
      const matchColor =
        selectedColors.length === 0 ||
        (p.color && selectedColors.includes(p.color));
      const matchSize =
        selectedSizes.length === 0 ||
        (p.sizes && p.sizes.some((s) => selectedSizes.includes(s)));
      const matchBrand =
        selectedBrands.length === 0 ||
        (p.brand && selectedBrands.includes(p.brand));

      return isFashion && matchGender && matchSub && matchColor && matchSize && matchBrand;
    });
  }, [activeGender, selectedSub, selectedColors, selectedSizes, selectedBrands]);

  const mainCategories = [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: Sparkles },
    { id: "kids", label: "Kids", icon: Baby },
  ];

  return (
    <section id="fashion-section" className="mx-auto max-w-[1400px] px-4 py-6 scroll-mt-24">
      {/* Page Title & Subtitle */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Fashion Store</h1>
        <p className="text-sm text-muted-foreground">
          Explore curated fashion for Men, Women & Kids
        </p>
      </div>

      {/* Horizontal Category Navigation Bar - Starting from Left */}
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

      {/* Filter Bar (Color, Size, Brand) */}
      <div className="mb-6 rounded-lg border border-border bg-card p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-brand" />
            <h2 className="text-sm font-bold text-foreground">Filter Products</h2>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* A. Color Filter */}
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Color
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTER_COLORS.map((c) => {
                const isChecked = selectedColors.includes(c.name);

                return (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    className={
                      "flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer " +
                      (isChecked
                        ? "border-brand font-bold ring-1 ring-brand bg-brand/10 text-brand"
                        : "border-border bg-background text-foreground hover:border-brand")
                    }
                  >
                    <span className={`size-3.5 rounded-full ${c.bgClass} inline-block`} />
                    <span>{c.name}</span>
                    {isChecked && <Check className="size-3 text-brand" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Size Filter */}
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Size
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTER_SIZES.map((size) => {
                const isChecked = selectedSizes.includes(size);

                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={
                      "min-w-8 px-2.5 py-1 text-xs rounded-md border font-semibold transition-all cursor-pointer text-center " +
                      (isChecked
                        ? "border-brand bg-brand text-primary-foreground font-bold shadow-xs"
                        : "border-border bg-background text-foreground hover:border-brand")
                    }
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* C. Brand Filter */}
          <div>
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Brand
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTER_BRANDS.map((brand) => {
                const isChecked = selectedBrands.includes(brand);

                return (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={
                      "px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer " +
                      (isChecked
                        ? "border-brand bg-brand/10 text-brand font-bold ring-1 ring-brand"
                        : "border-border bg-background text-foreground hover:border-brand")
                    }
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Subcategories Thumbnails Horizontal/Grid Section */}
        <div>
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
                    "group relative overflow-hidden rounded-md border text-left transition-all p-1.5 flex flex-col items-center gap-1.5 cursor-pointer " +
                    (isActive
                      ? "border-brand bg-brand/5 ring-2 ring-brand"
                      : "border-border bg-card hover:border-brand")
                  }
                >
                  <div className="aspect-square w-full overflow-hidden bg-muted rounded-sm">
                    <img
                      src={sub.image}
                      alt={sub.label}
                      loading="lazy"
                      width={300}
                      height={300}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
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

        {/* Filtered Products Display Grid */}
        <div className="pt-2">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h3 className="text-sm font-bold text-foreground capitalize">
              {selectedSub
                ? `${activeGender} / ${currentSubCategories.find((s) => s.id === selectedSub)?.label}`
                : `All ${activeGender}'s Products`}
            </h3>
            <span className="text-xs text-muted-foreground font-semibold">
              {displayedProducts.length} product(s) found
            </span>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="py-12 text-center bg-card rounded-md border border-border">
              <p className="text-sm font-semibold text-foreground">No matching products found.</p>
              <p className="text-xs text-muted-foreground mt-1">Try relaxing your color, size, or brand filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-brand text-primary-foreground px-4 py-2 text-xs font-bold rounded-sm hover:bg-brand-deep transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
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
