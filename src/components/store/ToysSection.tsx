import * as React from "react";
import {
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
  Smile,
  Heart,
  Gamepad2,
  Trophy,
  BookOpen,
  Backpack,
  Layers,
  Baby,
  Shirt,
  Bot,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// Hero Banner Defs with bright playful theme
type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  route: string;
};

const TOYS_HERO_SLIDES: HeroSlide[] = [
  {
    id: "lego-hero",
    tag: "CREATIVE FUN & GAMES",
    title: "LEGO & Building Bricks Festival",
    subtitle: "Classic Brick Boxes, City Playsets & STEM Educational Kits",
    discount: "UP TO 40% OFF",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1600&q=80",
    route: "/toys/educational",
  },
  {
    id: "baby-hero",
    tag: "GENTLE BABY CARE",
    title: "Pampers, Chicco & Diaper Essentials",
    subtitle: "Ultra Soft Pants, Massage Oils & Hypoallergenic Wipes",
    discount: "FLAT 30% OFF",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80",
    route: "/toys/diapers",
  },
  {
    id: "rc-hero",
    tag: "ACTION TOYS",
    title: "Remote Control Cars & Barbie World",
    subtitle: "360° Stunt Cars, Fashion Dolls & Outdoor Play Kits",
    discount: "MIN. 25% OFF",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1600&q=80",
    route: "/toys/rc",
  },
];

// CIRCULAR BRAND LOGOS FOR TOYS & BABY (80px Circles)
const TOYS_BRAND_LOGOS: Record<string, React.ReactNode> = {
  pampers: (
    <span className="text-xs font-black tracking-widest text-teal-600 uppercase font-sans">
      Pampers
    </span>
  ),
  chicco: (
    <span className="text-xs font-black tracking-wider text-blue-700 uppercase font-sans">
      chicco
    </span>
  ),
  meemee: (
    <span className="text-xs font-black tracking-tight text-pink-600 lowercase font-sans">
      Mee Mee
    </span>
  ),
  lego: (
    <span className="text-xs font-black tracking-widest text-red-600 bg-yellow-400 px-1 py-0.5 rounded-sm uppercase font-mono">
      LEGO
    </span>
  ),
  barbie: (
    <span className="text-xs font-black tracking-wider text-fuchsia-600 font-serif italic">
      Barbie
    </span>
  ),
  funskool: (
    <span className="text-xs font-black tracking-wider text-amber-600 uppercase font-sans">
      FUNSKOOL
    </span>
  ),
  fisherprice: (
    <span className="text-[10px] font-black tracking-tighter text-red-600 uppercase font-sans text-center leading-tight">
      Fisher-Price
    </span>
  ),
};

const TOYS_BRAND_LIST = [
  { slug: "pampers", name: "Pampers" },
  { slug: "chicco", name: "Chicco" },
  { slug: "meemee", name: "Mee Mee" },
  { slug: "lego", name: "Lego" },
  { slug: "barbie", name: "Barbie" },
  { slug: "funskool", name: "Funskool" },
  { slug: "fisherprice", name: "Fisher-Price" },
];

// Clickable Category Sections
const TOYS_SECTIONS = [
  { slug: "babycare", title: "Baby Care", subtitle: "Gentle Lotions, Body Wash & Oils", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80", bg: "bg-cyan-50/80 dark:bg-cyan-950/20" },
  { slug: "diapers", title: "Diapers & Essentials", subtitle: "Pampers Monthly Boxes & Wipes", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80", bg: "bg-amber-50/80 dark:bg-amber-950/20" },
  { slug: "clothing", title: "Baby Clothing", subtitle: "Infant Rompers, Onesies & Sets", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80", bg: "bg-pink-50/80 dark:bg-pink-950/20" },
  { slug: "toys", title: "Toys & Dolls", subtitle: "Barbie Dolls, Plushies & Figures", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=600&q=80", bg: "bg-purple-50/80 dark:bg-purple-950/20" },
  { slug: "educational", title: "Educational Toys", subtitle: "LEGO Bricks, Puzzles & Piano Gyms", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80", bg: "bg-yellow-50/80 dark:bg-yellow-950/20" },
  { slug: "rc", title: "Remote Control Toys", subtitle: "High Speed 360° Stunt Cars & Robots", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80", bg: "bg-rose-50/80 dark:bg-rose-950/20" },
  { slug: "outdoor", title: "Outdoor & Sports", subtitle: "Badminton Sets, Tricycles & Kits", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=600&q=80", bg: "bg-emerald-50/80 dark:bg-emerald-950/20" },
  { slug: "school", title: "School Supplies", subtitle: "Backpacks, Pencil Cases & Sets", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80", bg: "bg-indigo-50/80 dark:bg-indigo-950/20" },
];

const FILTER_BRANDS = ["Pampers", "Chicco", "Mee Mee", "Lego", "Barbie", "Funskool", "Fisher-Price", "Playnest"];

export function ToysSection({
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
      const targetStr = selectedBrand.toLowerCase().replace(/[\s-]/g, "");
      const match = FILTER_BRANDS.find((b) => b.toLowerCase().replace(/[\s-]/g, "") === targetStr);
      if (match) setSelectedBrands([match]);
    }
  }, [selectedBrand]);

  // Auto slide Carousel
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOYS_HERO_SLIDES.length);
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

  // COMBINED TOYS FILTER LOGIC
  const toyProducts = React.useMemo(() => {
    return products.filter((p) => {
      const isToyCategory = p.category === "Toys & Baby" || p.category === "Toys";
      if (!isToyCategory) return false;

      // Brand Filter if in route or sidebar
      if (selectedBrand) {
        const targetB = selectedBrand.toLowerCase().replace(/[\s-]/g, "");
        const curB = p.brand.toLowerCase().replace(/[\s-]/g, "");
        if (curB !== targetB) return false;
      }

      // Section/Type Filter if in route
      if (selectedType) {
        const type = selectedType.toLowerCase();
        if (p.toyType === type || p.subCategory === type) return true;

        const title = p.title.toLowerCase();
        if (type === "babycare") return title.includes("wash") || title.includes("oil") || title.includes("lotion") || title.includes("gentle");
        if (type === "diapers") return title.includes("diaper") || title.includes("pants") || title.includes("wipes");
        if (type === "clothing") return title.includes("romper") || title.includes("onesie") || title.includes("infant");
        if (type === "toys") return title.includes("doll") || title.includes("barbie") || title.includes("toy");
        if (type === "educational") return title.includes("lego") || title.includes("brick") || title.includes("blocks") || title.includes("piano");
        if (type === "rc") return title.includes("remote") || title.includes("stunt") || title.includes("rc");
        if (type === "outdoor") return title.includes("outdoor") || title.includes("cricket") || title.includes("badminton");
        if (type === "school") return title.includes("school") || title.includes("backpack") || title.includes("station");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = toyProducts.filter((p) => {
      if (query && query.trim() !== "") {
        const q = query.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand) return false;
      }

      if (p.price < minPrice || p.price > maxPrice) return false;

      if (selectedBrands.length > 0) {
        const matchesBrandInArray = selectedBrands.some(
          (b) => b.toLowerCase().replace(/[\s-]/g, "") === p.brand.toLowerCase().replace(/[\s-]/g, "")
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
  }, [toyProducts, query, minPrice, maxPrice, selectedBrands, sortBy]);

  // Discovery lists for /toys main page
  const trendingToys = React.useMemo(() => {
    return products.filter((p) => (p.category === "Toys & Baby" || p.category === "Toys") && p.rating >= 4.6).slice(0, 4);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => (p.category === "Toys & Baby" || p.category === "Toys") && p.mrp > p.price).slice(0, 4);
  }, []);

  const budgetPicks = React.useMemo(() => {
    return products.filter((p) => (p.category === "Toys & Baby" || p.category === "Toys") && p.price <= 1000).slice(0, 4);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} TOYS & BABY`
    : selectedType
    ? `${selectedType.toUpperCase()} COLLECTION`
    : "TOYS & BABY STORE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. ROUTE /toys: MAIN PAGE (PLAYFUL HERO BANNER + CIRCULAR BRANDS + CATEGORY CARDS + SECTIONS) */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Playful Bright Hero Banner Slider */}
          <div
            className="relative rounded-3xl overflow-hidden border border-yellow-200 dark:border-border shadow-md aspect-21/9 sm:aspect-25/9 min-h-[240px] md:min-h-[340px] bg-gradient-to-r from-yellow-950 via-slate-900 to-cyan-950 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              key={TOYS_HERO_SLIDES[currentSlide].id}
              src={TOYS_HERO_SLIDES[currentSlide].image}
              alt={TOYS_HERO_SLIDES[currentSlide].title}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-cyan-950/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-black font-black text-xs uppercase tracking-widest self-start shadow-md">
                <Sparkles className="size-3.5 fill-current text-black" /> {TOYS_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {TOYS_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-yellow-100 font-medium max-w-lg">
                {TOYS_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={TOYS_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-yellow-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-yellow-500 transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  DISCOVER KIDS TOYS • {TOYS_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Left/Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? TOYS_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-400 hover:text-black cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % TOYS_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-400 hover:text-black cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* CIRCULAR TOYS BRAND ICONS (80px CIRCLES) */}
          <div className="py-2">
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TOYS_BRAND_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to={`/toys/brand/${b.slug}`}
                  className="group flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <div className="size-20 rounded-full bg-yellow-50/80 dark:bg-yellow-950/30 border border-yellow-200/60 dark:border-yellow-900/40 flex items-center justify-center p-3 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-yellow-400">
                    {TOYS_BRAND_LOGOS[b.slug] || (
                      <span className="font-black text-xs uppercase text-foreground">{b.name}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-foreground/90 group-hover:text-yellow-600 tracking-tight transition-colors">
                    {b.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLORFUL CATEGORY CARDS GRID */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-yellow-100 dark:border-border pb-3">
              <Smile className="size-5 text-yellow-500" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Explore Toys & Baby Categories</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {TOYS_SECTIONS.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/toys/${sec.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-yellow-100 dark:border-border shadow-xs min-h-[220px] flex flex-col justify-end p-5 cursor-pointer ${sec.bg} transition-all duration-300 hover:shadow-xl hover:border-yellow-400 text-left`}
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="relative z-10 space-y-1 text-left">
                    <span className="text-[10px] font-black uppercase text-yellow-600 bg-white/95 px-2.5 py-0.5 rounded-full inline-block shadow-xs">
                      KIDS WORLD
                    </span>
                    <h2 className="text-xl font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                    </h2>
                    <p className="text-[11px] text-white/80 font-medium line-clamp-2">{sec.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Toys */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-yellow-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Toys & Games</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trendingToys.map((p) => (
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
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Budget Kids Picks</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {budgetPicks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. SECTION OR BRAND FILTERED PRODUCT LISTING PAGE (e.g. /toys/educational or /toys/brand/lego) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/toys"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-yellow-400 hover:text-yellow-600 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Toys & Baby Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Smile className="size-6 text-yellow-500" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} toy product(s) available
                </p>
              </div>
            </div>

            {/* Quick Switch Category Links */}
            <div className="flex items-center gap-1.5 bg-yellow-50/40 dark:bg-muted/40 p-1 rounded-xl border border-yellow-200/60 dark:border-border overflow-x-auto">
              {[
                { slug: "educational", label: "Educational", route: "/toys/educational" },
                { slug: "toys", label: "Toys", route: "/toys/toys" },
                { slug: "diapers", label: "Diapers", route: "/toys/diapers" },
                { slug: "rc", label: "RC Toys", route: "/toys/rc" },
              ].map((tab) => (
                <Link
                  key={tab.slug}
                  to={tab.route}
                  className={
                    "px-3 py-1 text-[11px] font-bold rounded-lg uppercase transition-all cursor-pointer shrink-0 " +
                    (selectedType === tab.slug
                      ? "bg-yellow-400 text-black shadow-xs font-black"
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
                  <SlidersHorizontal className="size-4 text-yellow-500" />
                  <h3 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    Filter Toys
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
                  <span className="text-yellow-600 font-black">
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
                  className="w-full accent-yellow-400 cursor-pointer"
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
                      (b) => b.toLowerCase().replace(/[\s-]/g, "") === brand.toLowerCase().replace(/[\s-]/g, "")
                    );
                    return (
                      <label
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-yellow-600 transition-colors"
                      >
                        <div
                          className={
                            "size-4 rounded-md border flex items-center justify-center transition-all " +
                            (checked
                              ? "bg-yellow-400 border-yellow-400 text-black"
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
                  className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-yellow-400 cursor-pointer shadow-xs"
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
                    className="px-5 py-2.5 bg-yellow-400 text-black font-black text-xs uppercase rounded-xl cursor-pointer hover:bg-yellow-500 transition-colors shadow-sm"
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
