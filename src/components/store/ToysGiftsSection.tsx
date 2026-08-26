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
  Gift,
  Smile,
  Heart,
  Gamepad2,
  Trophy,
  BookOpen,
  Backpack,
  Layers,
  Bot,
  Puzzle,
  Boxes,
  Palette,
  Cake,
  PartyPopper,
  Mail,
  Sparkle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// Hero Banner Defs for Toys & Gifts
type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  route: string;
};

const TOYS_GIFTS_HERO_SLIDES: HeroSlide[] = [
  {
    id: "action-toys-hero",
    tag: "TOYS & FUN",
    title: "Action Track Sets & RC Stunt Cars",
    subtitle: "Hot Wheels, RC Racing Cars, Superheroes & Robots",
    discount: "UP TO 40% OFF",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1600&q=80",
    route: "/toys-gifts/action-toys",
  },
  {
    id: "gifts-hero",
    tag: "PERFECT GIFTS FOR ALL",
    title: "Gift Boxes, Hampers & Personalized Frames",
    subtitle: "Chocolate Hampers, Customized Photo Frames & Greeting Cards",
    discount: "FLAT 30% OFF",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1600&q=80",
    route: "/toys-gifts/gift-sets",
  },
  {
    id: "building-blocks-hero",
    tag: "CREATIVE LEARNING",
    title: "LEGO Bricks & Board Games",
    subtitle: "Building Blocks, Monopoly Games & Educational STEM Kits",
    discount: "MIN. 25% OFF",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1600&q=80",
    route: "/toys-gifts/building-blocks",
  },
];

// CIRCULAR BRAND LOGOS FOR TOYS & GIFTS
const TOYS_GIFTS_BRAND_LOGOS: Record<string, React.ReactNode> = {
  lego: <span className="text-xs font-black tracking-widest text-red-600 bg-yellow-400 px-1 py-0.5 rounded-sm uppercase font-mono">LEGO</span>,
  barbie: <span className="text-xs font-black tracking-wider text-fuchsia-600 font-serif italic">Barbie</span>,
  hotwheels: <span className="text-[10px] font-black tracking-tighter text-red-600 uppercase font-sans text-center leading-tight">Hot Wheels</span>,
  hasbro: <span className="text-xs font-black tracking-widest text-blue-600 uppercase font-sans">Hasbro</span>,
  funskool: <span className="text-xs font-black tracking-wider text-amber-600 uppercase font-sans">FUNSKOOL</span>,
  cadbury: <span className="text-xs font-black tracking-widest text-purple-700 uppercase font-serif">Cadbury</span>,
  hallmark: <span className="text-xs font-black tracking-wider text-emerald-700 uppercase font-serif">Hallmark</span>,
};

const TOYS_GIFTS_BRAND_LIST = [
  { slug: "lego", name: "Lego" },
  { slug: "barbie", name: "Barbie" },
  { slug: "hotwheels", name: "Hot Wheels" },
  { slug: "hasbro", name: "Hasbro" },
  { slug: "funskool", name: "Funskool" },
  { slug: "cadbury", name: "Cadbury" },
  { slug: "hallmark", name: "Hallmark" },
];

// Main Categories (Toys)
const TOYS_MAIN_CATEGORIES = [
  { slug: "action-toys", title: "Action Toys", subtitle: "Cars, Bikes, Superheroes & Robots", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80", bg: "bg-amber-50/90 dark:bg-amber-950/20" },
  { slug: "educational-toys", title: "Educational Toys", subtitle: "Learning Kits, Science & Math Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80", bg: "bg-yellow-50/90 dark:bg-yellow-950/20" },
  { slug: "rc-toys", title: "Remote Control Toys", subtitle: "360° Stunt Cars & Drones", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80", bg: "bg-rose-50/90 dark:bg-rose-950/20" },
  { slug: "board-games", title: "Board Games", subtitle: "Monopoly, Chess & Strategy Games", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80", bg: "bg-cyan-50/90 dark:bg-cyan-950/20" },
  { slug: "soft-toys", title: "Soft Toys", subtitle: "Plush Teddy Bears & Cute Pillows", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80", bg: "bg-pink-50/90 dark:bg-pink-950/20" },
  { slug: "dolls", title: "Dolls & Doll Houses", subtitle: "Barbie Dolls & Fashion Sets", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=600&q=80", bg: "bg-purple-50/90 dark:bg-purple-950/20" },
  { slug: "building-blocks", title: "Building Blocks", subtitle: "LEGO Brick Sets & Towers", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80", bg: "bg-emerald-50/90 dark:bg-emerald-950/20" },
  { slug: "puzzles", title: "Puzzles", subtitle: "Jigsaw Puzzles & Brain Teasers", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80", bg: "bg-indigo-50/90 dark:bg-indigo-950/20" },
  { slug: "outdoor-toys", title: "Outdoor & Sports Toys", subtitle: "Badminton Sets, Tricycles & Kits", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=600&q=80", bg: "bg-lime-50/90 dark:bg-lime-950/20" },
  { slug: "stationery", title: "Stationery & Art", subtitle: "Art Supplies, Paints & School Kits", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80", bg: "bg-orange-50/90 dark:bg-orange-950/20" },
];

// Gifts Categories
const GIFTS_CATEGORIES = [
  { slug: "gift-sets", title: "Gift Sets", subtitle: "Assorted Hampers & Combo Boxes", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80", bg: "bg-pink-50/90 dark:bg-pink-950/20" },
  { slug: "birthday-gifts", title: "Birthday Gifts", subtitle: "Surprise Gifts & Chocolate Hampers", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80", bg: "bg-purple-50/90 dark:bg-purple-950/20" },
  { slug: "anniversary-gifts", title: "Anniversary Gifts", subtitle: "Personalized Frames & Keepsakes", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80", bg: "bg-rose-50/90 dark:bg-rose-950/20" },
  { slug: "festival-gifts", title: "Festival Gifts", subtitle: "Festive Sweets & Celebration Sets", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80", bg: "bg-amber-50/90 dark:bg-amber-950/20" },
  { slug: "personalized-gifts", title: "Personalized Gifts", subtitle: "Custom Wood Frames & LED Lamps", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80", bg: "bg-cyan-50/90 dark:bg-cyan-950/20" },
  { slug: "greeting-cards", title: "Greeting Cards", subtitle: "Handmade 3D Pop-Up Cards", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80", bg: "bg-yellow-50/90 dark:bg-yellow-950/20" },
];

const FILTER_BRANDS = ["Lego", "Barbie", "Hot Wheels", "Hasbro", "Funskool", "Cadbury", "Hallmark", "GiftCart", "Hug n Feel"];
const FILTER_OCCASIONS = ["For Kids", "For Friends", "For Family", "Birthday Gifts", "Anniversary Gifts"];

export function ToysGiftsSection({
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
  const [selectedOccasion, setSelectedOccasion] = React.useState<string>("");
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
      setCurrentSlide((prev) => (prev + 1) % TOYS_GIFTS_HERO_SLIDES.length);
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
    setSelectedOccasion("");
    setSortBy("popularity");
  };

  // COMBINED TOYS & GIFTS FILTER LOGIC
  const toyGiftsProducts = React.useMemo(() => {
    return products.filter((p) => {
      const isToyGiftCategory = p.category === "Toys & Gifts" || p.category === "Toys & Baby" || p.category === "Toys";
      if (!isToyGiftCategory) return false;

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
        if (type === "action-toys") return title.includes("action") || title.includes("car") || title.includes("hot wheels");
        if (type === "educational-toys") return title.includes("educational") || title.includes("brick") || title.includes("lego");
        if (type === "rc-toys") return title.includes("remote") || title.includes("stunt") || title.includes("rc");
        if (type === "board-games") return title.includes("board") || title.includes("monopoly") || title.includes("game");
        if (type === "soft-toys") return title.includes("soft") || title.includes("teddy") || title.includes("plush");
        if (type === "dolls") return title.includes("doll") || title.includes("barbie");
        if (type === "building-blocks") return title.includes("lego") || title.includes("blocks") || title.includes("building");
        if (type === "puzzles") return title.includes("puzzle");
        if (type === "outdoor-toys") return title.includes("outdoor") || title.includes("sports");
        if (type === "stationery") return title.includes("stationery") || title.includes("school") || title.includes("art");

        if (type === "gift-sets") return title.includes("gift") || title.includes("hamper") || title.includes("box");
        if (type === "birthday-gifts") return title.includes("birthday") || title.includes("gift");
        if (type === "anniversary-gifts") return title.includes("anniversary") || title.includes("personalized");
        if (type === "festival-gifts") return title.includes("festival") || title.includes("sweets");
        if (type === "personalized-gifts") return title.includes("personalized") || title.includes("customized");
        if (type === "greeting-cards") return title.includes("card") || title.includes("greeting");

        return false;
      }

      return true;
    });
  }, [selectedBrand, selectedType]);

  // Apply Search, Price, Occasion & Sorting
  const filteredProducts = React.useMemo(() => {
    let result = toyGiftsProducts.filter((p) => {
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

      if (selectedOccasion && p.occasion !== selectedOccasion) {
        return false;
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
  }, [toyGiftsProducts, query, minPrice, maxPrice, selectedBrands, selectedOccasion, sortBy]);

  // Discovery lists for /toys-gifts main page
  const trendingToysGifts = React.useMemo(() => {
    return products.filter((p) => (p.category === "Toys & Gifts" || p.category === "Toys & Baby") && p.rating >= 4.7).slice(0, 4);
  }, []);

  const bestSellers = React.useMemo(() => {
    return products.filter((p) => (p.category === "Toys & Gifts" || p.category === "Toys & Baby") && p.mrp > p.price).slice(0, 4);
  }, []);

  const budgetPicks = React.useMemo(() => {
    return products.filter((p) => (p.category === "Toys & Gifts" || p.category === "Toys & Baby") && p.price <= 999).slice(0, 4);
  }, []);

  const activeHeaderTitle = selectedBrand
    ? `${selectedBrand.toUpperCase()} TOYS & GIFTS`
    : selectedType
    ? `${selectedType.toUpperCase().replace("-", " ")} COLLECTION`
    : "TOYS & GIFTS STORE";

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-8 font-sans">
      {/* 1. MAIN PAGE /toys-gifts */}
      {!selectedBrand && !selectedType ? (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* CLEAN TOP HEADER SECTION */}
          <div className="text-left space-y-1 border-b border-yellow-200/80 dark:border-border pb-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Gift className="size-7 text-pink-500 animate-bounce" /> Toys & Gifts
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Fun, learning & perfect gifts for everyone
            </p>
          </div>

          {/* Playful Hero Banner Slider */}
          <div
            className="relative rounded-3xl overflow-hidden border border-yellow-200 dark:border-border shadow-md aspect-21/9 sm:aspect-25/9 min-h-[240px] md:min-h-[340px] bg-slate-900 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              key={TOYS_GIFTS_HERO_SLIDES[currentSlide].id}
              src={TOYS_GIFTS_HERO_SLIDES[currentSlide].image}
              alt={TOYS_GIFTS_HERO_SLIDES[currentSlide].title}
              className="size-full object-cover transition-all duration-700 filter brightness-90 animate-in fade-in"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-pink-950/40 to-transparent flex flex-col justify-center p-6 md:p-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500 text-white font-black text-xs uppercase tracking-widest self-start shadow-md">
                <Sparkles className="size-3.5 fill-current text-white" /> {TOYS_GIFTS_HERO_SLIDES[currentSlide].tag}
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {TOYS_GIFTS_HERO_SLIDES[currentSlide].title}
              </h2>
              <p className="text-xs sm:text-sm text-pink-100 font-medium max-w-lg">
                {TOYS_GIFTS_HERO_SLIDES[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={TOYS_GIFTS_HERO_SLIDES[currentSlide].route}
                  className="px-6 py-3 bg-pink-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-pink-600 transition-transform cursor-pointer hover:scale-105 inline-block text-center"
                >
                  SHOP TOYS & GIFTS • {TOYS_GIFTS_HERO_SLIDES[currentSlide].discount}
                </Link>
              </div>
            </div>

            {/* Manual Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? TOYS_GIFTS_HERO_SLIDES.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-500 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % TOYS_GIFTS_HERO_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-500 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* CIRCULAR BRAND LOGOS (80px Circles) */}
          <div className="py-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block mb-3 text-left">
              Popular Toys & Gifts Brands
            </span>
            <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TOYS_GIFTS_BRAND_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to={`/toys-gifts/brand/${b.slug}`}
                  className="group flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <div className="size-20 rounded-full bg-yellow-50/80 dark:bg-yellow-950/30 border border-yellow-200/60 dark:border-yellow-900/40 flex items-center justify-center p-3 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-pink-500">
                    {TOYS_GIFTS_BRAND_LOGOS[b.slug] || (
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

          {/* 1. TOYS CATEGORIES GRID */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-yellow-100 dark:border-border pb-3">
              <Gamepad2 className="size-5 text-amber-500" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Top Toys & Games</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {TOYS_MAIN_CATEGORIES.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/toys-gifts/${sec.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-yellow-100 dark:border-border shadow-xs min-h-[180px] flex flex-col justify-end p-4 cursor-pointer ${sec.bg} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-left`}
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="relative z-10 space-y-1">
                    <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 2. GIFTS CATEGORIES GRID */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 border-b border-pink-100 dark:border-border pb-3">
              <Gift className="size-5 text-pink-500" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Gifts & Celebrations</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {GIFTS_CATEGORIES.map((sec) => (
                <Link
                  key={sec.slug}
                  to={`/toys-gifts/${sec.slug}`}
                  className={`group relative rounded-3xl overflow-hidden border border-pink-100 dark:border-border shadow-xs min-h-[180px] flex flex-col justify-end p-4 cursor-pointer ${sec.bg} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-left`}
                >
                  <img
                    src={sec.image}
                    alt={sec.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  <div className="relative z-10 space-y-1">
                    <span className="text-[9px] font-black uppercase text-pink-600 bg-white/95 px-2 py-0.5 rounded-full inline-block">
                      GIFT
                    </span>
                    <h3 className="text-xs md:text-sm font-black text-white tracking-tight flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="size-3 text-pink-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Toys & Gifts */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Flame className="size-5 text-pink-500 fill-current" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Trending Toys & Gifts</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingToysGifts.map((p) => (
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Budget Picks */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-emerald-500" />
              <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Budget Gift Picks</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {budgetPicks.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. SECTION OR BRAND FILTERED PRODUCT LISTING PAGE (e.g. /toys-gifts/action-toys or /toys-gifts/gift-sets) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/toys-gifts"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-pink-500 hover:text-pink-500 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Toys & Gifts Overview
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Gift className="size-6 text-pink-500" />
                  {activeHeaderTitle}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} item(s) available
                </p>
              </div>
            </div>

            {/* Quick Switch Category Links */}
            <div className="flex items-center gap-1.5 bg-pink-50/40 dark:bg-muted/40 p-1 rounded-xl border border-pink-200/60 dark:border-border overflow-x-auto">
              {[
                { slug: "action-toys", label: "Action Toys", route: "/toys-gifts/action-toys" },
                { slug: "educational-toys", label: "Educational", route: "/toys-gifts/educational-toys" },
                { slug: "gift-sets", label: "Gift Sets", route: "/toys-gifts/gift-sets" },
                { slug: "birthday-gifts", label: "Birthday Gifts", route: "/toys-gifts/birthday-gifts" },
              ].map((tab) => (
                <Link
                  key={tab.slug}
                  to={tab.route}
                  className={
                    "px-3 py-1 text-[11px] font-bold rounded-lg uppercase transition-all cursor-pointer shrink-0 " +
                    (selectedType === tab.slug
                      ? "bg-pink-500 text-white shadow-xs font-black"
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
                  <SlidersHorizontal className="size-4 text-pink-500" />
                  <h3 className="font-extrabold text-foreground text-xs uppercase tracking-wider">
                    Filter Toys & Gifts
                  </h3>
                </div>

                {(minPrice > 0 || maxPrice < 10000 || selectedBrands.length > 0 || selectedOccasion || query) && (
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

              {/* Occasion Filter for Gifts */}
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                  Gift Occasion
                </span>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-pink-500 cursor-pointer"
                >
                  <option value="">All Occasions</option>
                  {FILTER_OCCASIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
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
              <div className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between gap-3 shadow-xs">
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

              {/* 4-COLUMN PRODUCT GRID (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols) */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    className="px-5 py-2.5 bg-pink-500 text-white font-bold text-xs uppercase rounded-xl cursor-pointer hover:bg-pink-600 transition-colors shadow-sm"
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
