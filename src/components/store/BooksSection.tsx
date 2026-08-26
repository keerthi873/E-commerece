import * as React from "react";
import {
  BookOpen,
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
  GraduationCap,
  PenTool,
  Bookmark,
  Palette,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// LARGE HERO BANNERS (250px - 350px HEIGHT)
type BooksHeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  fallbackImage: string;
  route: string;
};

const BOOKS_HERO_SLIDES: BooksHeroSlide[] = [
  {
    id: "bestsellers-hero",
    tag: "WORLDWIDE BESTSELLERS",
    title: "Atomic Habits & Top Self-Help Novels",
    subtitle: "James Clear, Rich Dad Poor Dad, Psychology of Money & More",
    discount: "UP TO 40% OFF",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://picsum.photos/1200/350?random=1",
    route: "/books/novels",
  },
  {
    id: "exam-prep-hero",
    tag: "EXAM SPECIAL 2026",
    title: "JEE, NEET & UPSC Competitive Guides",
    subtitle: "Arihant, MTG, Oswaal & NCERT Class 10/12 Textbook Sets",
    discount: "FLAT 30% OFF",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://picsum.photos/1200/350?random=2",
    route: "/books/competitive",
  },
  {
    id: "stationery-hero",
    tag: "BACK TO SCHOOL",
    title: "Classmate Notebooks & Camel Art Supplies",
    subtitle: "Spiral Registers, Acrylic Paint Sets & Wildcraft School Bags",
    discount: "BIG SAVINGS DAY",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    fallbackImage: "https://picsum.photos/1200/350?random=3",
    route: "/books/notebooks",
  },
];

// 8 BOOKS & STATIONERY CATEGORIES (EXACT SAME RECTANGULAR CARD ARCHITECTURE AS APPLIANCES SECTION)
type BooksCategoryItem = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  fallbackImage: string;
};

const BOOKS_CATEGORIES_SECTIONS: BooksCategoryItem[] = [
  {
    slug: "academic",
    title: "Academic Books",
    subtitle: "NCERT Textbooks, CBSE, ICSE & University Guides",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?academic",
  },
  {
    slug: "competitive",
    title: "Competitive Exams",
    subtitle: "JEE, NEET, UPSC, SSC & Banking Exam Prep Books",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?exam",
  },
  {
    slug: "novels",
    title: "Novels & Literature",
    subtitle: "Fiction, Non-Fiction, Thrillers & Bestselling Novels",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?novels",
  },
  {
    slug: "children",
    title: "Children's Books",
    subtitle: "Storybooks, Activity Books, Comics & Encyclopedias",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?children",
  },
  {
    slug: "notebooks",
    title: "Notebooks & Diaries",
    subtitle: "Hardbound Journals, Spiral Registers & Planners",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?notebooks",
  },
  {
    slug: "office",
    title: "Office Supplies",
    subtitle: "Pens, Files, Staplers, Calculators & Organizers",
    image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?office",
  },
  {
    slug: "art",
    title: "Art & Craft Materials",
    subtitle: "Acrylic Paints, Canvas Boards, Brushes & Sketchbooks",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?art",
  },
  {
    slug: "school",
    title: "School Essentials",
    subtitle: "School Bags, Pencil Boxes, Water Bottles & Geometry Sets",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
    fallbackImage: "https://picsum.photos/600/400?school",
  },
];

const FILTER_BRANDS = ["NCERT", "Arihant", "Penguin", "Scholastic", "Classmate", "Camlin", "Camel", "Wildcraft"];

export function BooksSection({
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
  const [maxPrice, setMaxPrice] = React.useState<number>(5000);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(
    selectedBrand ? [selectedBrand] : []
  );
  const [sortBy, setSortBy] = React.useState<"popularity" | "low-high" | "high-low" | "newest">("popularity");

  // Auto-slide banner carousel every 3.5 seconds
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BOOKS_HERO_SLIDES.length);
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
      setCurrentSlide((prev) => (prev + 1) % BOOKS_HERO_SLIDES.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? BOOKS_HERO_SLIDES.length - 1 : prev - 1));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]));
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(5000);
    setSelectedBrands([]);
    setSortBy("popularity");
  };

  const handleImgError = (slug: string) => {
    setImgErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // COMBINED BOOKS FILTER LOGIC
  const bookProducts = React.useMemo(() => {
    return products.filter((p) => {
      const isBookCategory = p.category === "Books & Stationery" || p.category === "Books";
      if (!isBookCategory) return false;

      // Brand Filter if in route or sidebar
      if (selectedBrand) {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Section/Type Filter if in route
      if (selectedType) {
        const type = selectedType.toLowerCase();

        // Direct matching
        if (p.bookType === type) return true;

        // Title synonym matching
        const title = p.title.toLowerCase();
        if (type === "academic") return title.includes("ncert") || title.includes("class") || title.includes("textbook");
        if (type === "competitive") return title.includes("jee") || title.includes("neet") || title.includes("upsc") || title.includes("exam");
        if (type === "novels") return title.includes("habits") || title.includes("novel") || title.includes("book");
        if (type === "children") return title.includes("geronimo") || title.includes("storybook") || title.includes("children");
        if (type === "notebooks") return title.includes("notebook") || title.includes("register") || title.includes("spiral");
        if (type === "office") return title.includes("pen") || title.includes("desk") || title.includes("office");
        if (type === "art") return title.includes("acrylic") || title.includes("paint") || title.includes("color") || title.includes("camel");
        if (type === "school") return title.includes("bag") || title.includes("backpack") || title.includes("school");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = bookProducts.filter((p) => {
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
  }, [bookProducts, query, minPrice, maxPrice, selectedBrands, sortBy]);

  // Discovery lists for /books main page
  const trendingBooks = React.useMemo(() => {
    return products.filter((p) => (p.category === "Books & Stationery" || p.category === "Books") && p.rating >= 4.8).slice(0, 6);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => (p.category === "Books & Stationery" || p.category === "Books") && p.mrp > p.price).slice(0, 6);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} BOOKS`
    : selectedType
    ? `${selectedType.toUpperCase().replace("-", " ")} COLLECTION`
    : "BOOKS & STATIONERY STORE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. MAIN BOOKS PAGE: BIG BANNER CAROUSEL + EXACT APPLIANCES CATEGORIES ARCHITECTURE + PRODUCT GRIDS */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* CLEAN TOP HEADER */}
          <div className="text-left space-y-1 border-b border-border pb-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="size-7 text-amber-600" /> Books & Stationery Store
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Academic books, exam guides, novels, notebooks & office supplies
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
              key={BOOKS_HERO_SLIDES[currentSlide].id}
              src={imgErrors[BOOKS_HERO_SLIDES[currentSlide].id] ? BOOKS_HERO_SLIDES[currentSlide].fallbackImage : BOOKS_HERO_SLIDES[currentSlide].image}
              alt={BOOKS_HERO_SLIDES[currentSlide].title}
              onError={() => handleImgError(BOOKS_HERO_SLIDES[currentSlide].id)}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-amber-950/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white font-black text-xs uppercase tracking-widest self-start shadow-md">
                <Sparkles className="size-3.5 fill-current text-white" /> {BOOKS_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {BOOKS_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-lg">
                {BOOKS_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={BOOKS_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-amber-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-amber-700 transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  EXPLORE BOOKS • {BOOKS_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Left/Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? BOOKS_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-600 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % BOOKS_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-600 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {BOOKS_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={
                    "h-1.5 rounded-full transition-all cursor-pointer " +
                    (currentSlide === idx ? "w-6 bg-amber-400" : "w-1.5 bg-white/60")
                  }
                />
              ))}
            </div>
          </div>

          {/* 2. CLICKABLE CATEGORY SECTIONS GRID (EXACT SAME ARCHITECTURE & STYLING AS APPLIANCES SECTION) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Layers className="size-5 text-amber-600" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Explore Books & Stationery Categories</h2>
            </div>

            {/* Grid Layout: Desktop 4 cards/row, Tablet 2 cards/row, Mobile 1 card/row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {BOOKS_CATEGORIES_SECTIONS.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/books/${sec.slug}`}
                  className="group relative rounded-3xl overflow-hidden border border-border shadow-md min-h-[220px] flex flex-col justify-end p-5 cursor-pointer bg-card transition-all duration-300 hover:shadow-2xl hover:border-amber-600 hover:scale-[1.02] text-left"
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
                    <span className="text-[10px] font-black uppercase text-amber-400 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full inline-block">
                      BOOKS & STATIONERY
                    </span>
                    <h3 className="text-lg font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-xs text-amber-100 font-medium line-clamp-1">{sec.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. PRODUCT SECTION: TRENDING BOOKS */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-amber-600 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Books</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trendingBooks.map((p) => (
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
        /* 2. FILTERED LISTING PAGE (e.g. /books/academic or /books/novels) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/books"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-amber-600 hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Books Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <BookOpen className="size-6 text-amber-600" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} item(s) available
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
                  <SlidersHorizontal className="size-4 text-amber-600" />
                  <h3 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    Filter Books & Stationery
                  </h3>
                </div>

                {(minPrice > 0 || maxPrice < 5000 || selectedBrands.length > 0 || query) && (
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
                  <span className="text-amber-600 font-black">
                    {inr(minPrice)} – {inr(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Brand Filter */}
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                  Publishers & Brands
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
                        className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-amber-600 transition-colors"
                      >
                        <div
                          className={
                            "size-4 rounded-md border flex items-center justify-center transition-all " +
                            (checked
                              ? "bg-amber-600 border-amber-600 text-white"
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
                  className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-amber-600 cursor-pointer shadow-xs"
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
                    className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs uppercase rounded-xl cursor-pointer hover:bg-amber-700 transition-colors shadow-sm"
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
