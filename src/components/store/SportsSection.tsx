import * as React from "react";
import {
  Trophy,
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
  Sparkles,
  Layers,
  Activity,
  Dumbbell,
  Bike,
  Target,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// LARGE HERO BANNERS (250px - 350px HEIGHT)
type SportsHeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  fallbackImage: string;
  route: string;
};

const SPORTS_HERO_SLIDES: SportsHeroSlide[] = [
  {
    id: "cricket-hero",
    tag: "PRO CRICKET FESTIVAL",
    title: "English Willow Bats & Pro Kit Bags",
    subtitle: "SG, SS, MRF Bats, Leather Match Balls & Helmets",
    discount: "UP TO 45% OFF",
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://picsum.photos/1200/350?random=1",
    route: "/sports/cricket",
  },
  {
    id: "football-hero",
    tag: "MATCH DAY GEAR",
    title: "FIFA Approved Footballs & Studs",
    subtitle: "Adidas Match Balls, Nike Cleats & Training Accessories",
    discount: "FLAT 30% OFF",
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://picsum.photos/1200/350?random=2",
    route: "/sports/football",
  },
  {
    id: "fitness-hero",
    tag: "HOME GYM SETUP",
    title: "Motorized Treadmills & Dumbbell Sets",
    subtitle: "Fitkit Treadmills, Kore Dumbbell Weights & Benches",
    discount: "BIG SAVINGS DAY",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001ab?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://picsum.photos/1200/350?random=3",
    route: "/sports/fitness",
  },
];

// 8 SPORTS CATEGORIES (EXACT SAME RECTANGULAR CARD ARCHITECTURE AS APPLIANCES SECTION)
type SportsCategoryItem = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
};

const SPORTS_CATEGORIES_SECTIONS: SportsCategoryItem[] = [
  {
    slug: "cricket",
    title: "Cricket",
    subtitle: "English Willow Bats, Leather Balls & Kit Bags",
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?cricket",
  },
  {
    slug: "football",
    title: "Football",
    subtitle: "Match Balls, Studs, Shin Guards & Jerseys",
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?football",
  },
  {
    slug: "fitness",
    title: "Fitness Equipment",
    subtitle: "Treadmills, Exercise Bikes & Ellipticals",
    image: "https://images.unsplash.com/photo-1558611848-73f7eb4001ab?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?fitness",
  },
  {
    slug: "gym",
    title: "Gym & Training",
    subtitle: "Dumbbells, Benches, Resistance Bands & Gloves",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?gym",
  },
  {
    slug: "outdoor",
    title: "Outdoor Sports",
    subtitle: "Badminton Rackets, Tennis & Basketballs",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?outdoor",
  },
  {
    slug: "indoor",
    title: "Indoor Games",
    subtitle: "Table Tennis, Carrom Boards, Chess & Darts",
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?indoor",
  },
  {
    slug: "cycling",
    title: "Cycling",
    subtitle: "MTB Bicycles, Helmets & Cycling Gear",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?cycling",
  },
  {
    slug: "accessories",
    title: "Sports Accessories",
    subtitle: "Duffel Bags, Water Bottles & Wristbands",
    image: "https://images.unsplash.com/photo-1521417531039-7c2b1a0d7f89?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?accessories",
  },
];

const FILTER_BRANDS = ["SG", "Adidas", "Fitkit", "Kore", "Yonex", "Stag", "Firefox", "Nike"];

export function SportsSection({
  selectedBrand,
  selectedType,
}: {
  selectedBrand?: string;
  selectedType?: string;
}) {
  const { query } = useStore();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});

  // Touch/Swipe State for Banner Carousel
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Filter States
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(50000);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    selectedBrand ? [selectedBrand] : []
  );
  const [sortBy, setSortBy] = React.useState<"popularity" | "low-high" | "high-low" | "newest">("popularity");

  // Auto-slide banner carousel every 3.5 seconds
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SPORTS_HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % SPORTS_HERO_SLIDES.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? SPORTS_HERO_SLIDES.length - 1 : prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]));
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(50000);
    setSelectedBrands([]);
    setSortBy("popularity");
  };

  const handleImgError = (slug: string) => {
    setImgErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // COMBINED SPORTS FILTER LOGIC
  const sportsProducts = React.useMemo(() => {
    return products.filter((p) => {
      const isSportsCategory = p.category === "Sports" || p.subCategory === "sports";
      if (!isSportsCategory) return false;

      // Brand Filter if in route or sidebar
      if (selectedBrand) {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Section/Type Filter if in route
      if (selectedType) {
        const type = selectedType.toLowerCase();

        // Direct matching
        if (p.sportsType === type) return true;

        // Title synonym matching
        const title = p.title.toLowerCase();
        if (type === "cricket") return title.includes("cricket") || title.includes("bat") || title.includes("ball");
        if (type === "football") return title.includes("football") || title.includes("fifa") || title.includes("cleats");
        if (type === "fitness") return title.includes("treadmill") || title.includes("fitness") || title.includes("bike");
        if (type === "gym") return title.includes("dumbbell") || title.includes("gym") || title.includes("bench");
        if (type === "outdoor") return title.includes("badminton") || title.includes("racket") || title.includes("tennis");
        if (type === "indoor") return title.includes("table tennis") || title.includes("chess") || title.includes("carrom");
        if (type === "cycling") return title.includes("bike") || title.includes("cycle") || title.includes("firefox");
        if (type === "accessories") return title.includes("bag") || title.includes("duffel") || title.includes("bottle");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = sportsProducts.filter((p) => {
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
  }, [sportsProducts, query, minPrice, maxPrice, selectedBrands, sortBy]);

  // Discovery lists for /sports main page
  const trendingSports = React.useMemo(() => {
    return products.filter((p) => (p.category === "Sports" || p.subCategory === "sports") && p.rating >= 4.6).slice(0, 6);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => (p.category === "Sports" || p.subCategory === "sports") && p.mrp > p.price).slice(0, 6);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} SPORTS`
    : selectedType
    ? `${selectedType.toUpperCase().replace("-", " ")} COLLECTION`
    : "SPORTS & FITNESS STORE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. MAIN SPORTS PAGE: BIG BANNER CAROUSEL + EXACT APPLIANCES CATEGORIES ARCHITECTURE + PRODUCT GRIDS */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* CLEAN TOP HEADER */}
          <div className="text-left space-y-1 border-b border-border pb-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Trophy className="size-7 text-emerald-600" /> Sports & Fitness Store
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Gear up with professional equipment & activewear
            </p>
          </div>

          {/* 1. LARGE BANNER SLIDER (250px - 350px HEIGHT) */}
          <div
            className="relative rounded-3xl overflow-hidden border border-border shadow-md aspect-21/9 sm:aspect-25/9 min-h-[250px] md:min-h-[350px] bg-slate-900 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={SPORTS_HERO_SLIDES[currentSlide].id}
              src={imgErrors[SPORTS_HERO_SLIDES[currentSlide].id] ? SPORTS_HERO_SLIDES[currentSlide].fallbackImage : SPORTS_HERO_SLIDES[currentSlide].image}
              alt={SPORTS_HERO_SLIDES[currentSlide].title}
              onError={() => handleImgError(SPORTS_HERO_SLIDES[currentSlide].id)}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-950/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-widest self-start shadow-md">
                <Sparkles className="size-3.5 fill-current text-white" /> {SPORTS_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {SPORTS_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-100 font-medium max-w-lg">
                {SPORTS_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={SPORTS_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-emerald-700 transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  SHOP SPORTS • {SPORTS_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Left/Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? SPORTS_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SPORTS_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {SPORTS_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={
                    "h-1.5 rounded-full transition-all cursor-pointer " +
                    (currentSlide === idx ? "w-6 bg-emerald-400" : "w-1.5 bg-white/60")
                  }
                />
              ))}
            </div>
          </div>

          {/* 2. CLICKABLE CATEGORY SECTIONS GRID (EXACT SAME ARCHITECTURE & STYLING AS APPLIANCES SECTION) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Layers className="size-5 text-emerald-600" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Explore Sports Categories</h2>
            </div>

            {/* Grid Layout: Desktop 4 cards/row, Tablet 2 cards/row, Mobile 1 card/row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {SPORTS_CATEGORIES_SECTIONS.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/sports/${sec.slug}`}
                  className="group relative rounded-3xl overflow-hidden border border-border shadow-md min-h-[220px] flex flex-col justify-end p-5 cursor-pointer bg-card transition-all duration-300 hover:shadow-2xl hover:border-emerald-600 hover:scale-[1.02] text-left"
                >
                  <img
                    src={imgErrors[sec.slug] ? sec.fallbackImage : sec.image}
                    alt={sec.title}
                    loading="lazy"
                    onError={() => handleImgError(sec.slug)}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full inline-block">
                      SPORTS
                    </span>
                    <h3 className="text-lg font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-xs text-emerald-100 font-medium line-clamp-1">{sec.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. PRODUCT SECTION: TRENDING SPORTS ITEMS */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-emerald-600 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Sports Gear</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingSports.map((p) => (
                <ProductCard key={p.id} product={p} badgeLabel="TRENDING" />
              ))}
            </div>
          </div>

          {/* 4. PRODUCT SECTION: BEST SELLERS */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-amber-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} badgeLabel="BEST SELLER" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. FILTERED LISTING PAGE (e.g. /sports/cricket or /sports/football) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/sports"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-emerald-600 hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Sports Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Trophy className="size-6 text-emerald-600" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} sports item(s) available
                </p>
              </div>
            </div>
          </div>

          {/* FILTER SIDEBAR + SORT BAR + GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 3 COLS: FILTER SIDEBAR */}
            <aside className="lg:col-span-3 space-y-6 rounded-3xl border border-border bg-card p-5 shadow-xs sticky top-20">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-emerald-600" />
                  <h3 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    Filter Sports
                  </h3>
                </div>

                {(minPrice > 0 || maxPrice < 50000 || selectedBrands.length > 0 || query) && (
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
                  <span className="text-emerald-600 font-black">
                    {inr(minPrice)} – {inr(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
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
                        className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-emerald-600 transition-colors"
                      >
                        <div
                          className={
                            "size-4 rounded-md border flex items-center justify-center transition-all " +
                            (checked
                              ? "bg-emerald-600 border-emerald-600 text-white"
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
                  className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-emerald-600 cursor-pointer shadow-xs"
                >
                  <option value="popularity">Popularity</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="newest">Customer Rating</option>
                </select>
              </div>

              {/* 5 COLUMNS PRODUCT GRID */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center space-y-4 max-w-md mx-auto border border-dashed border-border rounded-3xl p-6 bg-card shadow-xs">
                  <h3 className="text-lg font-bold text-foreground">No products available in this category</h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Try widening your price range or clearing active filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs uppercase rounded-xl cursor-pointer hover:bg-emerald-700 transition-colors shadow-sm"
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
