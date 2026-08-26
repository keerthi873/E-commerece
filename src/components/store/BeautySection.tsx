import * as React from "react";
import {
  Sparkles,
  Heart,
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
  Flower2,
  Brush,
  Smile,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// Hero Banner Defs with soft beauty aesthetic
type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  route: string;
};

const BEAUTY_HERO_SLIDES: HeroSlide[] = [
  {
    id: "skincare-hero",
    tag: "GLOW & HYDRATE",
    title: "Glow & Hydration Skincare Sale",
    subtitle: "Serums, Moisturisers & Sunscreens for Radiant Skin",
    discount: "UP TO 50% OFF",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=80",
    route: "/beauty/skincare",
  },
  {
    id: "makeup-hero",
    tag: "LUXURY MAKEUP",
    title: "Matte Lipsticks & Liquid Foundations",
    subtitle: "Glam Up With Top Brands Lakme & Maybelline",
    discount: "FLAT 40% OFF",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80",
    route: "/beauty/makeup",
  },
  {
    id: "fragrance-hero",
    tag: "ESSENTIAL FRAGRANCE",
    title: "Signature Perfumes & Body Mists",
    subtitle: "Floral, Fruity & Luxe Long-Lasting Fragrances",
    discount: "MIN. 30% OFF",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80",
    route: "/beauty/fragrance",
  },
];

// CIRCULAR BRAND LOGOS FOR BEAUTY (80px Circles)
const BEAUTY_BRAND_LOGOS: Record<string, React.ReactNode> = {
  lakme: (
    <span className="text-xs font-black tracking-widest text-slate-900 dark:text-white uppercase font-sans">
      LAKMÉ
    </span>
  ),
  maybelline: (
    <span className="text-[10px] font-black tracking-tighter text-rose-600 uppercase font-sans text-center leading-tight">
      MAYBELLINE
    </span>
  ),
  loreal: (
    <span className="text-xs font-black tracking-widest text-amber-600 uppercase font-serif">
      L'ORÉAL
    </span>
  ),
  nivea: (
    <span className="text-xs font-black tracking-widest text-blue-700 uppercase font-sans">
      NIVEA
    </span>
  ),
  mamaearth: (
    <span className="text-[10px] font-black tracking-tight text-emerald-600 lowercase font-sans">
      mamaearth
    </span>
  ),
  himalaya: (
    <span className="text-xs font-black tracking-wider text-emerald-700 uppercase font-serif">
      Himalaya
    </span>
  ),
};

const BEAUTY_BRAND_LIST = [
  { slug: "lakme", name: "Lakme" },
  { slug: "maybelline", name: "Maybelline" },
  { slug: "loreal", name: "L'Oreal" },
  { slug: "nivea", name: "Nivea" },
  { slug: "mamaearth", name: "Mamaearth" },
  { slug: "himalaya", name: "Himalaya" },
];

// Clickable Soft Category Cards
const BEAUTY_CATEGORIES = [
  { slug: "skincare", title: "Skincare", subtitle: "Serums, Moisturisers & Face Washes", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", bg: "bg-rose-50/80 dark:bg-rose-950/20" },
  { slug: "makeup", title: "Makeup", subtitle: "Lipsticks, Foundations & Mascaras", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80", bg: "bg-pink-50/80 dark:bg-pink-950/20" },
  { slug: "haircare", title: "Haircare", subtitle: "Shampoos, Oils & Hair Serums", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80", bg: "bg-purple-50/80 dark:bg-purple-950/20" },
  { slug: "fragrance", title: "Fragrance", subtitle: "Luxe Perfumes & Body Mists", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80", bg: "bg-amber-50/80 dark:bg-amber-950/20" },
  { slug: "personalcare", title: "Personal Care", subtitle: "Neem Washes, Soaps & Lotions", image: "https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&w=600&q=80", bg: "bg-emerald-50/80 dark:bg-emerald-950/20" },
  { slug: "accessories", title: "Tools & Accessories", subtitle: "Makeup Brushes, Sponges & Kits", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80", bg: "bg-indigo-50/80 dark:bg-indigo-950/20" },
];

const FILTER_BRANDS = ["Lakme", "Maybelline", "L'Oreal", "Nivea", "Mamaearth", "Himalaya"];

export function BeautySection({
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
  const [maxPrice, setMaxPrice] = React.useState<number>(10000);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    selectedBrand ? [selectedBrand] : []
  );
  const [sortBy, setSortBy] = React.useState<"popularity" | "low-high" | "high-low" | "newest">("popularity");

  // Sync prop selection with filter array
  React.useEffect(() => {
    if (selectedBrand) {
      const match = FILTER_BRANDS.find((b) => b.toLowerCase().replace(/['\s]/g, "") === selectedBrand.toLowerCase().replace(/['\s]/g, ""));
      if (match) setSelectedBrands([match]);
    }
  }, [selectedBrand]);

  // Auto slide Carousel
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BEAUTY_HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]));
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setSelectedBrands([]);
    setSortBy("popularity");
  };

  // COMBINED BEAUTY FILTER LOGIC
  const beautyProducts = React.useMemo(() => {
    return products.filter((p) => {
      if (p.category !== "Beauty") return false;

      // Brand Filter if in route or sidebar
      if (selectedBrand) {
        const targetB = selectedBrand.toLowerCase().replace(/['\s]/g, "");
        const curB = p.brand.toLowerCase().replace(/['\s]/g, "");
        if (curB !== targetB) return false;
      }

      // Section/Type Filter if in route
      if (selectedType) {
        const type = selectedType.toLowerCase();
        if (p.beautyType === type || p.subCategory === type) return true;

        const title = p.title.toLowerCase();
        if (type === "skincare") return title.includes("serum") || title.includes("cream") || title.includes("skincare") || title.includes("face wash");
        if (type === "makeup") return title.includes("lipstick") || title.includes("foundation") || title.includes("powder") || title.includes("mascara");
        if (type === "haircare") return title.includes("shampoo") || title.includes("hair") || title.includes("oil");
        if (type === "fragrance") return title.includes("perfume") || title.includes("fragrance") || title.includes("mist");
        if (type === "personalcare") return title.includes("neem") || title.includes("facewash") || title.includes("lotion");
        if (type === "accessories") return title.includes("brush") || title.includes("kit") || title.includes("sponge");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = beautyProducts.filter((p) => {
      if (query && query.trim() !== "") {
        const q = query.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand) return false;
      }

      if (p.price < minPrice || p.price > maxPrice) return false;

      if (selectedBrands.length > 0) {
        const matchesBrandInArray = selectedBrands.some(
          (b) => b.toLowerCase().replace(/['\s]/g, "") === p.brand.toLowerCase().replace(/['\s]/g, "")
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
  }, [beautyProducts, query, minPrice, maxPrice, selectedBrands, sortBy]);

  // Discovery lists for /beauty main page
  const trendingBeauty = React.useMemo(() => {
    return products.filter((p) => p.category === "Beauty" && p.rating >= 4.5).slice(0, 4);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => p.category === "Beauty" && p.reviews.includes(",")).slice(0, 4);
  }, []);

  const budgetPicks = React.useMemo(() => {
    return products.filter((p) => p.category === "Beauty" && p.price <= 350).slice(0, 4);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} BEAUTY`
    : selectedType
    ? `${selectedType.toUpperCase()} COLLECTION`
    : "BEAUTY & PERSONAL CARE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. ROUTE /beauty: MAIN PAGE (PASTEL HERO + CIRCULAR BRANDS + CATEGORY CARDS + SECTIONS) */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Soft Pastel Hero Banner Slider */}
          <div
            className="relative rounded-3xl overflow-hidden border border-rose-100 dark:border-border shadow-md aspect-21/9 sm:aspect-25/9 min-h-[240px] md:min-h-[340px] bg-gradient-to-r from-rose-950 via-slate-900 to-pink-950 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              key={BEAUTY_HERO_SLIDES[currentSlide].id}
              src={BEAUTY_HERO_SLIDES[currentSlide].image}
              alt={BEAUTY_HERO_SLIDES[currentSlide].title}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-rose-950/85 via-pink-950/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-black uppercase tracking-widest self-start shadow-md">
                <Sparkles className="size-3.5 fill-current" /> {BEAUTY_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {BEAUTY_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-pink-100 font-medium max-w-lg">
                {BEAUTY_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={BEAUTY_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-pink-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-pink-600 transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  EXPLORE BEAUTY • {BEAUTY_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Left/Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? BEAUTY_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-500 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % BEAUTY_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-500 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* CIRCULAR BEAUTY BRAND ICONS (80px CIRCLES) */}
          <div className="py-2">
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {BEAUTY_BRAND_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to={`/beauty/brand/${b.slug}`}
                  className="group flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <div className="size-20 rounded-full bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-center p-3 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-pink-500">
                    {BEAUTY_BRAND_LOGOS[b.slug] || (
                      <span className="font-black text-xs uppercase text-foreground">{b.name}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-foreground/90 group-hover:text-pink-600 tracking-tight transition-colors">
                    {b.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* SOFT CATEGORY CARDS GRID */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-rose-100 dark:border-border pb-3">
              <Flower2 className="size-5 text-pink-500" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Shop By Category</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {BEAUTY_CATEGORIES.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/beauty/${sec.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-rose-100 dark:border-border shadow-xs min-h-[220px] flex flex-col justify-end p-6 cursor-pointer ${sec.bg} transition-all duration-300 hover:shadow-xl hover:border-pink-500 text-left`}
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="relative z-10 space-y-1 text-left">
                    <span className="text-[10px] font-black uppercase text-pink-600 bg-white/95 px-2.5 py-0.5 rounded-full inline-block shadow-xs">
                      BEAUTY SELECTION
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-5 text-pink-400 group-hover:translate-x-1 transition-transform" />
                    </h2>
                    <p className="text-xs text-white/80 font-medium">{sec.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Beauty Products */}
          <div className="space-y-4 pt-4 border-t border-rose-100 dark:border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-pink-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Beauty Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trendingBeauty.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="space-y-4 pt-4 border-t border-rose-100 dark:border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-amber-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Budget Picks */}
          <div className="space-y-4 pt-4 border-t border-rose-100 dark:border-border">
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-rose-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Budget Beauty Picks</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {budgetPicks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. BRAND OR SECTION FILTERED PRODUCT LISTING PAGE (e.g. /beauty/skincare or /beauty/brand/lakme) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 dark:border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/beauty"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-pink-500 hover:text-pink-500 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Beauty Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Flower2 className="size-6 text-pink-500" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} beauty product(s) available
                </p>
              </div>
            </div>

            {/* Quick Switch Links */}
            <div className="flex items-center gap-1.5 bg-rose-50/50 dark:bg-muted/40 p-1 rounded-xl border border-rose-100 dark:border-border overflow-x-auto">
              {[
                { slug: "skincare", label: "Skincare", route: "/beauty/skincare" },
                { slug: "makeup", label: "Makeup", route: "/beauty/makeup" },
                { slug: "haircare", label: "Haircare", route: "/beauty/haircare" },
                { slug: "fragrance", label: "Fragrance", route: "/beauty/fragrance" },
              ].map((tab) => (
                <Link
                  key={tab.slug}
                  to={tab.route}
                  className={
                    "px-3 py-1 text-[11px] font-bold rounded-lg uppercase transition-all cursor-pointer shrink-0 " +
                    (selectedType === tab.slug
                      ? "bg-pink-500 text-white shadow-xs"
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
            <aside className="lg:col-span-3 space-y-6 rounded-3xl border border-rose-100 dark:border-border bg-card p-5 shadow-xs sticky top-20">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-pink-500" />
                  <h3 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    Filter Beauty
                  </h3>
                </div>

                {(minPrice > 0 || maxPrice < 10000 || selectedBrands.length > 0 || query) && (
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
                  <span className="text-pink-600 font-black">
                    {inr(minPrice)} – {inr(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
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
                      (b) => b.toLowerCase().replace(/['\s]/g, "") === brand.toLowerCase().replace(/['\s]/g, "")
                    );
                    return (
                      <label
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-500 transition-colors"
                      >
                        <div
                          className={
                            "size-4 rounded-md border flex items-center justify-center transition-all " +
                            (checked
                              ? "bg-pink-500 border-pink-500 text-white"
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
              <div className="p-4 rounded-2xl border border-rose-100 dark:border-border bg-card flex items-center justify-between gap-3 shadow-xs">
                <span className="text-xs font-bold text-muted-foreground uppercase">Sort Options:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-pink-500 cursor-pointer shadow-xs"
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
                <div className="py-16 text-center space-y-4 max-w-md mx-auto border border-dashed border-rose-200 rounded-3xl p-6 bg-card shadow-xs">
                  <h3 className="text-lg font-bold text-foreground">No products available in this category</h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Try widening your price range or clearing active brand filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-pink-500 text-white text-xs font-bold uppercase rounded-xl cursor-pointer hover:bg-pink-600 transition-colors shadow-sm"
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
