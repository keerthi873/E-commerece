import * as React from "react";
import {
  Armchair,
  Sparkles,
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
  Lamp,
  Bed,
  Utensils,
  Box,
  Broom,
  Layers,
  Home as HomeIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// Hero Banner Defs with warm home aesthetic
type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  route: string;
};

const HOME_HERO_SLIDES: HeroSlide[] = [
  {
    id: "decor-hero",
    tag: "COZY SPACES",
    title: "Minimalist Home Decor & Lighting",
    subtitle: "Ceramic Vases, Warm Desk Lamps & Wall Accents",
    discount: "MIN. 40% OFF",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1600&q=80",
    route: "/home/decor",
  },
  {
    id: "bedding-hero",
    tag: "PURE COMFORT",
    title: "100% Cotton Bedding & Kitchen Sets",
    subtitle: "King Size Sheets, Cookware & Storage Containers",
    discount: "FLAT ₹1,000 OFF",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80",
    route: "/home/bedding",
  },
];

// CIRCULAR BRAND LOGOS FOR HOME (80px Circles)
const HOME_BRAND_LOGOS: Record<string, React.ReactNode> = {
  ikea: (
    <span className="text-xs font-black tracking-widest text-blue-600 bg-amber-400 px-1 py-0.5 rounded-sm uppercase font-mono">
      IKEA
    </span>
  ),
  homecentre: (
    <span className="text-[10px] font-black tracking-tight text-slate-800 dark:text-white uppercase font-sans text-center leading-tight">
      HOME CENTRE
    </span>
  ),
  pepperfry: (
    <span className="text-xs font-black tracking-tight text-orange-600 font-sans">
      pepperfry
    </span>
  ),
  urbanladder: (
    <span className="text-[10px] font-black tracking-tighter text-amber-700 uppercase font-sans text-center leading-tight">
      URBAN LADDER
    </span>
  ),
  nilkamal: (
    <span className="text-xs font-black tracking-wider text-rose-600 uppercase font-sans">
      Nilkamal
    </span>
  ),
};

const HOME_BRAND_LIST = [
  { slug: "ikea", name: "IKEA" },
  { slug: "homecentre", name: "Home Centre" },
  { slug: "pepperfry", name: "Pepperfry" },
  { slug: "urbanladder", name: "Urban Ladder" },
  { slug: "nilkamal", name: "Nilkamal" },
];

// Clickable Category Sections
const HOME_SECTIONS = [
  { slug: "decor", title: "Home Decor", subtitle: "Ceramic Vases, Wall Clocks & Planters", image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=600&q=80" },
  { slug: "kitchen", title: "Kitchen & Dining", subtitle: "Triply Cookware, Dinnerware & Jars", image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80" },
  { slug: "bedding", title: "Bedding", subtitle: "100% Cotton Sheets & Pillows", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80" },
  { slug: "lighting", title: "Lighting", subtitle: "Steel Desk Lamps & Warm Floor Lights", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" },
  { slug: "storage", title: "Storage & Organizers", subtitle: "Fabric Storage Boxes & Shelves", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80" },
  { slug: "cleaning", title: "Cleaning Essentials", subtitle: "Spin Mops, Buckets & Cleaners", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" },
];

const FILTER_BRANDS = ["IKEA", "Home Centre", "Pepperfry", "Urban Ladder", "Nilkamal", "Ferra", "Woodmark"];

export function HomeSection({
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
  const [maxPrice, setMaxPrice] = React.useState<number>(100000);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    selectedBrand ? [selectedBrand] : []
  );
  const [sortBy, setSortBy] = React.useState<"popularity" | "low-high" | "high-low" | "newest">("popularity");

  // Sync prop selection with filter array
  React.useEffect(() => {
    if (selectedBrand) {
      const targetStr = selectedBrand.toLowerCase().replace(/\s+/g, "");
      const match = FILTER_BRANDS.find((b) => b.toLowerCase().replace(/\s+/g, "") === targetStr);
      if (match) setSelectedBrands([match]);
    }
  }, [selectedBrand]);

  // Auto slide Carousel
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]));
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(100000);
    setSelectedBrands([]);
    setSortBy("popularity");
  };

  // COMBINED HOME FILTER LOGIC
  const homeProducts = React.useMemo(() => {
    return products.filter((p) => {
      if (p.category !== "Home") return false;

      // Brand Filter if in route or sidebar
      if (selectedBrand) {
        const targetB = selectedBrand.toLowerCase().replace(/\s+/g, "");
        const curB = p.brand.toLowerCase().replace(/\s+/g, "");
        if (curB !== targetB) return false;
      }

      // Section/Type Filter if in route
      if (selectedType) {
        const type = selectedType.toLowerCase();
        if (p.homeType === type || p.subCategory === type) return true;

        const title = p.title.toLowerCase();
        if (type === "decor") return title.includes("vase") || title.includes("decor") || title.includes("clock");
        if (type === "kitchen") return title.includes("cookware") || title.includes("kitchen") || title.includes("triply");
        if (type === "bedding") return title.includes("bedsheet") || title.includes("pillow") || title.includes("bedding");
        if (type === "lighting") return title.includes("lamp") || title.includes("light");
        if (type === "storage") return title.includes("storage") || title.includes("box") || title.includes("organizer");
        if (type === "cleaning") return title.includes("mop") || title.includes("cleaning") || title.includes("bucket");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = homeProducts.filter((p) => {
      if (query && query.trim() !== "") {
        const q = query.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand) return false;
      }

      if (p.price < minPrice || p.price > maxPrice) return false;

      if (selectedBrands.length > 0) {
        const matchesBrandInArray = selectedBrands.some(
          (b) => b.toLowerCase().replace(/\s+/g, "") === p.brand.toLowerCase().replace(/\s+/g, "")
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
  }, [homeProducts, query, minPrice, maxPrice, selectedBrands, sortBy]);

  // Discovery lists for /home main page
  const trendingHome = React.useMemo(() => {
    return products.filter((p) => p.category === "Home" && p.rating >= 4.6).slice(0, 4);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => p.category === "Home" && p.mrp > p.price).slice(0, 4);
  }, []);

  const budgetPicks = React.useMemo(() => {
    return products.filter((p) => p.category === "Home" && p.price <= 2000).slice(0, 4);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} HOME`
    : selectedType
    ? `${selectedType.toUpperCase()} COLLECTION`
    : "HOME & LIVING STORE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. ROUTE /home: MAIN PAGE (HERO BANNER + CIRCULAR BRANDS + CATEGORY CARDS + SECTIONS) */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Top Banner Slider */}
          <div
            className="relative rounded-3xl overflow-hidden border border-border shadow-md aspect-21/9 sm:aspect-25/9 min-h-[240px] md:min-h-[340px] bg-slate-900 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              key={HOME_HERO_SLIDES[currentSlide].id}
              src={HOME_HERO_SLIDES[currentSlide].image}
              alt={HOME_HERO_SLIDES[currentSlide].title}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand text-primary-foreground text-xs font-black uppercase tracking-widest self-start shadow-md">
                <Flame className="size-3.5 fill-current" /> {HOME_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {HOME_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium max-w-lg">
                {HOME_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={HOME_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-brand text-primary-foreground font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-brand-deep transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  SHOP HOME • {HOME_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Left/Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? HOME_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HOME_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* CIRCULAR HOME BRAND ICONS (80px CIRCLES) */}
          <div className="py-2">
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {HOME_BRAND_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to={`/home/brand/${b.slug}`}
                  className="group flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <div className="size-20 rounded-full bg-[#f8f6f0] dark:bg-slate-800 border border-amber-200/50 dark:border-border/40 flex items-center justify-center p-3 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-brand">
                    {HOME_BRAND_LOGOS[b.slug] || (
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
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Explore Home & Living Categories</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {HOME_SECTIONS.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/home/${sec.slug}`}
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

          {/* Trending Home Products */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-brand fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Home Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trendingHome.map((p) => (
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
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Budget Home Picks</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {budgetPicks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. SECTION OR BRAND FILTERED PRODUCT LISTING PAGE (e.g. /home/furniture or /home/brand/ikea) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/home"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-brand hover:text-brand transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Home Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <HomeIcon className="size-6 text-brand" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} home product(s) available
                </p>
              </div>
            </div>

            {/* Quick Switch Category Links */}
            <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border overflow-x-auto">
              {[
                { slug: "decor", label: "Decor", route: "/home/decor" },
                { slug: "kitchen", label: "Kitchen", route: "/home/kitchen" },
                { slug: "bedding", label: "Bedding", route: "/home/bedding" },
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
                    Filter Home
                  </h3>
                </div>

                {(minPrice > 0 || maxPrice < 100000 || selectedBrands.length > 0 || query) && (
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
                  max={100000}
                  step={1000}
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
                      (b) => b.toLowerCase().replace(/\s+/g, "") === brand.toLowerCase().replace(/\s+/g, "")
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
