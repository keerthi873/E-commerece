import * as React from "react";
import {
  Wind,
  Refrigerator,
  Tv,
  Flame,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  Check,
  ArrowRight,
  ArrowLeft,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Droplets,
  Utensils,
  WashingMachine,
  Wrench,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// Hero Banner Defs with cool blue appliances theme
type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  route: string;
};

const APPLIANCES_HERO_SLIDES: HeroSlide[] = [
  {
    id: "ac-hero",
    tag: "SUMMER COOLING FESTIVAL",
    title: "AI Dual Inverter Split ACs",
    subtitle: "5 Star Energy Rating, Convertible 6-in-1 Cooling & Copper Condenser",
    discount: "UP TO 45% OFF",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80",
    route: "/appliances/ac",
  },
  {
    id: "refrigerator-hero",
    tag: "FROST-FREE TECH",
    title: "Convertible Double Door Refrigerators",
    subtitle: "Digital Inverter Compressors, Twin Cooling Plus & Freshness Lock",
    discount: "FLAT ₹12,000 OFF",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1600&q=80",
    route: "/appliances/refrigerator",
  },
  {
    id: "washing-hero",
    tag: "SMART WASHING",
    title: "Fully Automatic Front Load Washers",
    subtitle: "Inverter Direct Drive, Hygiene Steam Wash & 5 Star Energy Rating",
    discount: "MIN. 35% OFF",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1600&q=80",
    route: "/appliances/washingmachine",
  },
];

// CIRCULAR BRAND LOGOS FOR APPLIANCES (80px Circles)
const APPLIANCES_BRAND_LOGOS: Record<string, React.ReactNode> = {
  lg: (
    <div className="flex items-center gap-0.5 font-black text-rose-600 text-sm tracking-widest font-mono">
      <span>(LG)</span>
    </div>
  ),
  samsung: (
    <span className="text-xs font-black tracking-widest text-blue-600 uppercase font-mono">
      SAMSUNG
    </span>
  ),
  whirlpool: (
    <span className="text-xs font-black tracking-tighter text-amber-600 italic uppercase font-serif">
      Whirlpool
    </span>
  ),
  ifb: (
    <span className="text-sm font-black tracking-widest text-red-600 uppercase font-sans">
      IFB
    </span>
  ),
  godrej: (
    <span className="text-xs font-black tracking-wider text-purple-700 uppercase font-serif">
      Godrej
    </span>
  ),
  bosch: (
    <span className="text-xs font-black tracking-widest text-red-700 uppercase font-sans">
      BOSCH
    </span>
  ),
  haier: (
    <span className="text-xs font-black tracking-widest text-blue-700 uppercase font-mono">
      Haier
    </span>
  ),
};

const APPLIANCES_BRAND_LIST = [
  { slug: "lg", name: "LG" },
  { slug: "samsung", name: "Samsung" },
  { slug: "whirlpool", name: "Whirlpool" },
  { slug: "ifb", name: "IFB" },
  { slug: "godrej", name: "Godrej" },
  { slug: "bosch", name: "Bosch" },
  { slug: "haier", name: "Haier" },
];

// Clickable Category Sections
const APPLIANCES_SECTIONS = [
  { slug: "ac", title: "Air Conditioners", subtitle: "1.5 Ton 5 Star Split & Inverter ACs", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" },
  { slug: "refrigerator", title: "Refrigerators", subtitle: "Double Door & Side-by-Side Fridges", image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80" },
  { slug: "washingmachine", title: "Washing Machines", subtitle: "Front Load & Top Load Washers", image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80" },
  { slug: "tv", title: "Televisions", subtitle: "4K OLED & Smart Android LED TVs", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80" },
  { slug: "kitchen", title: "Kitchen Appliances", subtitle: "Dishwashers & Oven Toaster Grills", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
  { slug: "water", title: "Water Purifiers", subtitle: "Mineral RO + UV + UF Purifiers", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" },
  { slug: "small", title: "Small Appliances", subtitle: "Mixer Grinders, Air Fryers & Irons", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80" },
];

const FILTER_BRANDS = ["LG", "Samsung", "Whirlpool", "IFB", "Godrej", "Bosch", "Haier", "Ferra"];

export function AppliancesSection({
  selectedBrand,
  selectedType,
}: {
  selectedBrand?: string;
  selectedType?: string;
}) {
  const { query } = useStore();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Filter States
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(200000);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    selectedBrand ? [selectedBrand] : []
  );
  const [sortBy, setSortBy] = React.useState<"popularity" | "low-high" | "high-low" | "newest">("popularity");

  // Sync prop selection with filter array
  React.useEffect(() => {
    if (selectedBrand) {
      const targetStr = selectedBrand.toLowerCase();
      const match = FILTER_BRANDS.find((b) => b.toLowerCase() === targetStr);
      if (match) setSelectedBrands([match]);
    }
  }, [selectedBrand]);

  // Auto slide Carousel
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % APPLIANCES_HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]));
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(200000);
    setSelectedBrands([]);
    setSortBy("popularity");
  };

  // COMBINED APPLIANCES FILTER LOGIC
  const applianceProducts = React.useMemo(() => {
    return products.filter((p) => {
      if (p.category !== "Appliances") return false;

      // Brand Filter if in route or sidebar
      if (selectedBrand) {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Section/Type Filter if in route
      if (selectedType) {
        const type = selectedType.toLowerCase();
        if (p.applianceType === type || p.subCategory === type) return true;

        const title = p.title.toLowerCase();
        if (type === "ac") return title.includes("ac") || title.includes("split") || title.includes("inverter ac");
        if (type === "refrigerator") return title.includes("refrigerator") || title.includes("fridge") || title.includes("door");
        if (type === "washingmachine") return title.includes("washing") || title.includes("washer") || title.includes("front load");
        if (type === "tv") return title.includes("tv") || title.includes("oled") || title.includes("led");
        if (type === "kitchen") return title.includes("dishwasher") || title.includes("oven") || title.includes("kitchen");
        if (type === "water") return title.includes("purifier") || title.includes("ro");
        if (type === "small") return title.includes("mixer") || title.includes("fryer") || title.includes("grinder");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = applianceProducts.filter((p) => {
      if (query && query.trim() !== "") {
        const q = query.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand) return false;
      }

      if (p.price < minPrice || p.price > maxPrice) return false;

      if (selectedBrands.length > 0) {
        const matchesBrandInArray = selectedBrands.some(
          (b) => b.toLowerCase() === p.brand.toLowerCase()
        );
        if (!matchesBrandInArray) return false;
      }

      return true;
    });

    if (sortBy === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [applianceProducts, query, minPrice, maxPrice, selectedBrands, sortBy]);

  // Discovery lists for /appliances main page
  const trendingAppliances = React.useMemo(() => {
    return products.filter((p) => p.category === "Appliances" && p.rating >= 4.6).slice(0, 4);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => p.category === "Appliances" && p.mrp > p.price).slice(0, 4);
  }, []);

  const budgetPicks = React.useMemo(() => {
    return products.filter((p) => p.category === "Appliances" && p.price <= 25000).slice(0, 4);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} APPLIANCES`
    : selectedType
    ? `${selectedType.toUpperCase()} COLLECTION`
    : "HOME APPLIANCES STORE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. ROUTE /appliances: MAIN PAGE (HERO BANNER + CIRCULAR BRANDS + CATEGORY CARDS + SECTIONS) */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Top Banner Slider */}
          <div
            className="relative rounded-3xl overflow-hidden border border-border shadow-md aspect-21/9 sm:aspect-25/9 min-h-[240px] md:min-h-[340px] bg-slate-900 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              key={APPLIANCES_HERO_SLIDES[currentSlide].id}
              src={APPLIANCES_HERO_SLIDES[currentSlide].image}
              alt={APPLIANCES_HERO_SLIDES[currentSlide].title}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand text-primary-foreground text-xs font-black uppercase tracking-widest self-start shadow-md">
                <Flame className="size-3.5 fill-current" /> {APPLIANCES_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {APPLIANCES_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium max-w-lg">
                {APPLIANCES_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={APPLIANCES_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-brand text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-deep transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  SHOP APPLIANCES • {APPLIANCES_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Left/Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? APPLIANCES_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % APPLIANCES_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* CIRCULAR APPLIANCES BRAND ICONS (80px CIRCLES) */}
          <div className="py-2">
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {APPLIANCES_BRAND_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to={`/appliances/brand/${b.slug}`}
                  className="group flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <div className="size-20 rounded-full bg-sky-50/80 dark:bg-slate-800 border border-sky-200/50 dark:border-border/40 flex items-center justify-center p-3 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-brand">
                    {APPLIANCES_BRAND_LOGOS[b.slug] || (
                      <span className="font-black text-xs uppercase text-foreground">{b.name}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-foreground/90 group-hover:text-brand tracking-tight transition-colors">
                    {b.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* CLICKABLE CATEGORY SECTIONS GRID */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Layers className="size-5 text-brand" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Explore Appliance Categories</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {APPLIANCES_SECTIONS.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/appliances/${sec.slug}`}
                  className="group relative rounded-3xl overflow-hidden border border-border shadow-md min-h-[220px] flex flex-col justify-end p-5 cursor-pointer bg-card transition-all duration-300 hover:shadow-2xl hover:border-brand text-left"
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="relative z-10 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-brand bg-card/90 px-2 py-0.5 rounded-full inline-block">
                      CATEGORY
                    </span>
                    <h2 className="text-xl font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-4 text-brand group-hover:translate-x-1 transition-transform" />
                    </h2>
                    <p className="text-[11px] text-white/80 font-medium line-clamp-2">{sec.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Appliances */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-brand fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Appliances</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trendingAppliances.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-amber-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Budget Picks */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-emerald-500" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Budget Appliance Deals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {budgetPicks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. SECTION OR BRAND FILTERED PRODUCT LISTING PAGE (e.g. /appliances/ac or /appliances/brand/lg) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/appliances"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Appliances Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Wrench className="size-6 text-brand" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} appliance product(s) available
                </p>
              </div>
            </div>

            {/* Quick Switch Category Links */}
            <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border overflow-x-auto">
              {[
                { slug: "ac", label: "ACs", route: "/appliances/ac" },
                { slug: "refrigerator", label: "Refrigerators", route: "/appliances/refrigerator" },
                { slug: "washingmachine", label: "Washing Machines", route: "/appliances/washingmachine" },
                { slug: "tv", label: "TVs", route: "/appliances/tv" },
              ].map((tab) => (
                <Link
                  key={tab.slug}
                  to={tab.route}
                  className={
                    "px-3 py-1 text-[11px] font-bold rounded-lg uppercase transition-all cursor-pointer shrink-0 " +
                    (selectedType === tab.slug
                      ? "bg-brand text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* FILTER SIDEBAR + SORT BAR + GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 3 COLS: FILTER SIDEBAR */}
            <aside className="lg:col-span-3 space-y-6 rounded-3xl border border-border bg-card p-5 shadow-xs sticky top-20">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-brand" />
                  <h3 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    Filter Appliances
                  </h3>
                </div>

                {(minPrice > 0 || maxPrice < 200000 || selectedBrands.length > 0 || query) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="size-3" /> Clear
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-muted-foreground uppercase">Price Range</span>
                  <span className="text-brand font-black">
                    {inr(minPrice)} – {inr(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={2000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
              </div>

              {/* Brand Filter */}
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                  Brands
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {FILTER_BRANDS.map((brand) => {
                    const checked = selectedBrands.some(
                      (b) => b.toLowerCase() === brand.toLowerCase()
                    );
                    return (
                      <label
                        key={brand}
                        onClick={() => toggleBrand(brand)}
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
                        <span>{brand}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* RIGHT 9 COLS: SORT BAR & PRODUCT GRID */}
            <div className="lg:col-span-9 space-y-6">
              {/* Sort Bar */}
              <div className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between gap-3 shadow-xs">
                <span className="text-xs font-bold text-muted-foreground uppercase">Sort Options:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-brand cursor-pointer shadow-xs"
                >
                  <option value="popularity">Popularity</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="newest">Customer Rating</option>
                </select>
              </div>

              {/* 4-COLUMN PRODUCT GRID */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center space-y-4 max-w-md mx-auto border border-dashed border-border rounded-3xl p-6 bg-card shadow-xs">
                  <h3 className="text-lg font-bold text-foreground">No products available in this category</h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Try widening your price range or clearing active brand filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-brand text-primary-foreground text-xs font-bold uppercase rounded-xl cursor-pointer hover:bg-brand-deep transition-colors shadow-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
