import * as React from "react";
import {
  Shirt,
  Sparkles,
  Baby,
  Tag,
  SlidersHorizontal,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Zap,
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Grid,
  Layers,
  Sparkle,
  Palette,
  Ruler,
  X,
  Filter,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";
import { products, Product, inr } from "./catalog";
import { useStore } from "./store-context";

// ==========================================
// TOP BANNER CAROUSEL DATA FOR MAIN FASHION PAGE
// ==========================================
type FashionBanner = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  route: string;
  buttonText: string;
};

const FASHION_HERO_BANNERS: FashionBanner[] = [
  {
    id: "banner-1",
    title: "Grand Fashion Fest",
    subtitle: "Min. 50-80% OFF on 1,00,000+ Styles & Top Brands",
    tag: "SPECIAL OFFER",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    route: "/fashion",
    buttonText: "Shop Main Sale",
  },
  {
    id: "banner-2",
    title: "Men's Modern Wardrobe",
    subtitle: "Casual Shirts, Denim Jeans, Suits & Sneakers",
    tag: "NEW ARRIVALS",
    image: "https://images.unsplash.com/photo-1520975922203-bcb7cbe8fcb9?auto=format&fit=crop&w=1400&q=80",
    route: "/fashion/men",
    buttonText: "Explore Men",
  },
  {
    id: "banner-3",
    title: "Women's Couture & Ethnic",
    subtitle: "Sarees, Indo-Western Dresses, Kurtis & Heels",
    tag: "TRENDING NOW",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80",
    route: "/fashion/women",
    buttonText: "Explore Women",
  },
  {
    id: "banner-4",
    title: "Kids' Playful Outfits",
    subtitle: "Bright Frocks, Rompers, T-Shirts & Toys",
    tag: "FLAT 60% OFF",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=80",
    route: "/fashion/kids",
    buttonText: "Explore Kids",
  },
];

// ==========================================
// 3 LARGE CATEGORY BOXES DATA (MEN, WOMEN, KIDS)
// ==========================================
type Level1CategoryBox = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  route: string;
  badge: string;
};

const CATEGORY_BOXES: Level1CategoryBox[] = [
  {
    id: "men",
    title: "Men's Collection",
    subtitle: "Shirts, T-Shirts, Jeans, Footwear & Grooming",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    route: "/fashion/men",
    badge: "MEN'S STORE",
  },
  {
    id: "women",
    title: "Women's Collection",
    subtitle: "Western Wear, Sarees, Dresses, Tops & Heels",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    route: "/fashion/women",
    badge: "WOMEN'S STORE",
  },
  {
    id: "kids",
    title: "Kids' Collection",
    subtitle: "Boys, Girls, Infants, Teens & Footwear",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    route: "/fashion/kids",
    badge: "KIDS' STORE",
  },
];

// LEVEL 2 CATEGORY GRID DATA
type SubCategoryCard = {
  slug: string;
  title: string;
  image: string;
  fallbackImage: string;
  route: string;
};

const MEN_CATEGORIES: SubCategoryCard[] = [
  {
    slug: "shirts",
    title: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?men-shirt",
    route: "/fashion/men/shirts",
  },
  {
    slug: "t-shirts",
    title: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?men-tshirt",
    route: "/fashion/men/t-shirts",
  },
  {
    slug: "jeans",
    title: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-780c36856d60?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?men-jeans",
    route: "/fashion/men/jeans",
  },
  {
    slug: "trousers",
    title: "Trousers & Pants",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?men-trousers",
    route: "/fashion/men/trousers",
  },
  {
    slug: "shorts",
    title: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?shorts",
    route: "/fashion/men/shorts",
  },
  {
    slug: "hoodies",
    title: "Hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?hoodie",
    route: "/fashion/men/hoodies",
  },
  {
    slug: "ethnic",
    title: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?ethnic",
    route: "/fashion/men/ethnic",
  },
  {
    slug: "footwear",
    title: "Footwear",
    image: "https://images.unsplash.com/photo-1528701800489-20be3c4bfa2b?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?footwear",
    route: "/fashion/men/footwear",
  },
  {
    slug: "accessories",
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?accessories",
    route: "/fashion/men/accessories",
  },
  {
    slug: "grooming",
    title: "Grooming",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?grooming",
    route: "/fashion/men/grooming",
  },
  {
    slug: "sportswear",
    title: "Sportswear",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?sportswear",
    route: "/fashion/men/sportswear",
  },
];

const WOMEN_CATEGORIES: SubCategoryCard[] = [
  {
    slug: "western",
    title: "Western Wear",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?western",
    route: "/fashion/women/western",
  },
  {
    slug: "ethnic",
    title: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?ethnic",
    route: "/fashion/women/ethnic",
  },
  {
    slug: "fusion",
    title: "Fusion Wear",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?fusion",
    route: "/fashion/women/fusion",
  },
  {
    slug: "dresses",
    title: "Dresses",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?dress",
    route: "/fashion/women/dresses",
  },
  {
    slug: "tops",
    title: "Tops",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?top",
    route: "/fashion/women/tops",
  },
  {
    slug: "jeans",
    title: "Jeans & Leggings",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?jeans",
    route: "/fashion/women/jeans",
  },
  {
    slug: "footwear",
    title: "Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?heels",
    route: "/fashion/women/footwear",
  },
  {
    slug: "accessories",
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?handbag",
    route: "/fashion/women/accessories",
  },
  {
    slug: "beauty",
    title: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?beauty",
    route: "/fashion/women/beauty",
  },
  {
    slug: "sportswear",
    title: "Sportswear",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?sportswear",
    route: "/fashion/women/sportswear",
  },
];

const KIDS_CATEGORIES: SubCategoryCard[] = [
  {
    slug: "boys",
    title: "Boys Clothing",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?kid-clothes",
    route: "/fashion/kids/boys",
  },
  {
    slug: "girls",
    title: "Girls Clothing",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?girl-frock",
    route: "/fashion/kids/girls",
  },
  {
    slug: "infants",
    title: "Infants",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?infant",
    route: "/fashion/kids/infants",
  },
  {
    slug: "teens",
    title: "Teens",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?teens",
    route: "/fashion/kids/teens",
  },
  {
    slug: "footwear",
    title: "Footwear",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?kidsfootwear",
    route: "/fashion/kids/footwear",
  },
  {
    slug: "toys",
    title: "Toys",
    image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?kid-toys",
    route: "/fashion/kids/toys",
  },
  {
    slug: "accessories",
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80",
    fallbackImage: "https://picsum.photos/300?kidsacc",
    route: "/fashion/kids/accessories",
  },
];

// FILTER DATA CONSTANTS
const FILTER_BRANDS = ["Nike", "Adidas", "Puma", "Levi's", "H&M", "Zudio", "Allen Solly"];
const FABRIC_OPTIONS = ["Cotton", "Polyester", "Linen", "Denim", "Wool"];
const PATTERN_OPTIONS = ["Solid", "Printed", "Checked", "Striped"];
const FIT_OPTIONS = ["Slim Fit", "Regular Fit", "Oversized"];
const OCCASION_OPTIONS = ["Casual", "Formal", "Party", "Sports"];
const COLLAR_OPTIONS = ["Spread Collar", "Button Down", "Mandarin"];
const SLEEVES_OPTIONS = ["Full Sleeve", "Half Sleeve", "Sleeveless"];
const PACK_OPTIONS = ["1", "2", "3", "4+"];
const DISCOUNT_OPTIONS = ["10%+", "20%+", "30%+", "Flipkart Assured"];
const OFFER_OPTIONS = ["Buy More Save More", "No Cost EMI", "Bank Offers"];

type ColorOption = {
  name: string;
  bgClass: string;
  borderClass?: string;
};

const COLOR_OPTIONS: ColorOption[] = [
  { name: "Black", bgClass: "bg-black" },
  { name: "White", bgClass: "bg-white", borderClass: "border-slate-300 dark:border-slate-600" },
  { name: "Blue", bgClass: "bg-blue-600" },
  { name: "Red", bgClass: "bg-red-600" },
  { name: "Green", bgClass: "bg-emerald-600" },
  { name: "Yellow", bgClass: "bg-amber-400" },
  { name: "Pink", bgClass: "bg-pink-500" },
  { name: "Grey", bgClass: "bg-slate-500" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

// COLLAPSIBLE ACCORDION HELPER COMPONENT
function FilterAccordion({
  title,
  isOpen,
  onToggle,
  children,
  badgeCount,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badgeCount?: number;
}) {
  return (
    <div className="border-t border-border pt-3.5 pb-1">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-1 text-xs font-black uppercase tracking-wider text-foreground hover:text-pink-600 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          {title}
          {badgeCount ? (
            <span className="size-4 rounded-full bg-pink-600 text-[10px] text-white font-bold flex items-center justify-center">
              {badgeCount}
            </span>
          ) : null}
        </span>
        {isOpen ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
      </button>
      {isOpen && <div className="pt-2 pb-1 space-y-2 animate-in fade-in duration-200">{children}</div>}
    </div>
  );
}

export function FashionSection({
  selectedGender,
  selectedSection,
  selectedBrand,
  selectedType,
}: {
  selectedGender?: "men" | "women" | "kids";
  selectedSection?: string;
  selectedBrand?: string;
  selectedType?: string;
}) {
  const { query } = useStore();
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Hero Carousel Banner Slider State
  const [activeBannerIndex, setActiveBannerIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);

  // Auto-slide carousel effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % FASHION_HERO_BANNERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setActiveBannerIndex((prev) => (prev + 1) % FASHION_HERO_BANNERS.length);
  };

  const prevBanner = () => {
    setActiveBannerIndex((prev) => (prev - 1 + FASHION_HERO_BANNERS.length) % FASHION_HERO_BANNERS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) nextBanner();
    if (touchEnd - touchStart > 50) prevBanner();
    setTouchStart(null);
  };

  // Accordion Open/Collapse States
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    categories: true,
    price: true,
    brand: true,
    color: true,
    size: true,
    fabric: false,
    pattern: false,
    fit: false,
    occasion: false,
    collar: false,
    sleeves: false,
    pack: false,
    rating: true,
    discount: false,
    newArrivals: false,
    offers: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter States
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(5000);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>(selectedBrand ? [selectedBrand] : []);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = React.useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = React.useState<string[]>([]);
  const [selectedFits, setSelectedFits] = React.useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = React.useState<string[]>([]);
  const [selectedCollars, setSelectedCollars] = React.useState<string[]>([]);
  const [selectedSleeves, setSelectedSleeves] = React.useState<string[]>([]);
  const [selectedPacks, setSelectedPacks] = React.useState<string[]>([]);
  const [minRating, setMinRating] = React.useState<number | null>(null);
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([]);
  const [onlyNewArrivals, setOnlyNewArrivals] = React.useState(false);
  const [selectedOffers, setSelectedOffers] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<"popularity" | "low-high" | "high-low" | "newest">("popularity");

  const toggleArrayFilter = (arr: string[], setFn: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setFn((prev) => (prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]));
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(5000);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedPatterns([]);
    setSelectedFits([]);
    setSelectedOccasions([]);
    setSelectedCollars([]);
    setSelectedSleeves([]);
    setSelectedPacks([]);
    setMinRating(null);
    setSelectedDiscounts([]);
    setOnlyNewArrivals(false);
    setSelectedOffers([]);
    setSortBy("popularity");
  };

  const handleImgError = (slug: string) => {
    setImgErrors((prev) => ({ ...prev, [slug]: true }));
  };

  // STRICT 100% ISOLATED GENDER & SUBCATEGORY FILTERING LOGIC
  const fashionProducts = React.useMemo(() => {
    return products.filter((p) => {
      const isFashionCategory = p.category === "Fashion" || p.subCategory === "fashion" || p.fashionCategory;
      if (!isFashionCategory) return false;

      // Brand Filter
      if (selectedBrand) {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // STRICT GENDER FILTERING (ZERO DATA MIXING EVER)
      if (selectedGender) {
        const genderLower = selectedGender.toLowerCase();
        if (p.fashionCategory) {
          if (p.fashionCategory.toLowerCase() !== genderLower) return false;
        } else {
          // Strict title keyword checks if fashionCategory is not explicitly populated
          const titleLower = p.title.toLowerCase();
          if (genderLower === "men") {
            const isMen = titleLower.includes("men") || titleLower.includes("man") || titleLower.includes("male");
            const isWomenOrKids = titleLower.includes("women") || titleLower.includes("girl") || titleLower.includes("kid") || titleLower.includes("frock") || titleLower.includes("saree") || titleLower.includes("kurti");
            if (!isMen || isWomenOrKids) return false;
          } else if (genderLower === "women") {
            const isWomen = titleLower.includes("women") || titleLower.includes("woman") || titleLower.includes("female") || titleLower.includes("saree") || titleLower.includes("kurti") || titleLower.includes("dress") || titleLower.includes("heels");
            const isMenOrKids = titleLower.includes("men's") || titleLower.includes("man's") || titleLower.includes("boy") || titleLower.includes("kid") || titleLower.includes("infant");
            if (!isWomen || isMenOrKids) return false;
          } else if (genderLower === "kids") {
            const isKids = titleLower.includes("kid") || titleLower.includes("boy") || titleLower.includes("girl") || titleLower.includes("infant") || titleLower.includes("frock") || titleLower.includes("baby") || titleLower.includes("teen") || titleLower.includes("youth");
            if (!isKids) return false;
          }
        }
      }

      // Section / SubCategory Filter (Level 3)
      const categoryType = selectedType || selectedSection;
      if (categoryType) {
        const type = categoryType.toLowerCase();
        if (p.subCategory === type) return true;

        const title = p.title.toLowerCase();
        if (type === "shirts") return title.includes("shirt") && !title.includes("t-shirt");
        if (type === "t-shirts") return title.includes("t-shirt") || title.includes("tee");
        if (type === "jeans") return title.includes("jeans") || title.includes("denim") || title.includes("leggings");
        if (type === "trousers" || type === "shorts") return title.includes("trouser") || title.includes("pant") || title.includes("shorts");
        if (type === "hoodies") return title.includes("hoodie") || title.includes("jacket") || title.includes("sweatshirt");
        if (type === "ethnic" || type === "sarees" || type === "kurtis") return title.includes("kurta") || title.includes("kurti") || title.includes("saree") || title.includes("ethnic") || title.includes("anarkali") || title.includes("nehru");
        if (type === "footwear" || type === "heels") return title.includes("shoe") || title.includes("sneaker") || title.includes("footwear") || title.includes("heels") || title.includes("sandal") || title.includes("oxford");
        if (type === "accessories" || type === "handbags") return title.includes("watch") || title.includes("belt") || title.includes("wallet") || title.includes("handbag") || title.includes("bag") || title.includes("sunglasses");
        if (type === "grooming" || type === "beauty") return title.includes("trimmer") || title.includes("perfume") || title.includes("face wash") || title.includes("grooming") || title.includes("lipstick") || title.includes("makeup");
        if (type === "sportswear") return title.includes("dry-fit") || title.includes("gym") || title.includes("active") || title.includes("sport") || title.includes("tracksuit");
        if (type === "western" || type === "dresses" || type === "tops" || type === "fusion") return title.includes("dress") || title.includes("top") || title.includes("skirt") || title.includes("western") || title.includes("tunic") || title.includes("maxi");
        if (type === "winter") return title.includes("jacket") || title.includes("sweater") || title.includes("hoodie") || title.includes("winter");
        if (type === "innerwear") return title.includes("innerwear") || title.includes("brief") || title.includes("vest") || title.includes("pyjama") || title.includes("undershirt");
        if (type === "bags") return title.includes("bag") || title.includes("handbag") || title.includes("backpack") || title.includes("luggage");
        if (type === "boys") return title.includes("boy");
        if (type === "girls") return title.includes("girl") || title.includes("frock");
        if (type === "infants") return title.includes("infant") || title.includes("baby") || title.includes("romper") || title.includes("onesie");
        if (type === "teens") return title.includes("teen") || title.includes("youth");
        if (type === "toys") return title.includes("toy") || title.includes("lego") || title.includes("teddy");

        return false;
      }

      return true;
    });
  }, [selectedGender, selectedSection, selectedBrand, selectedType]);

  // RECOMMENDED FASHION PRODUCTS FOR MAIN PAGE
  const recommendedFashionProducts = React.useMemo(() => {
    return products.filter((p) => p.category === "Fashion" || p.subCategory === "fashion" || p.fashionCategory).slice(0, 10);
  }, []);

  // COMBINED MULTI-FILTER LOGIC
  const filteredProducts = React.useMemo(() => {
    let result = fashionProducts.filter((p) => {
      if (query && query.trim() !== "") {
        const q = query.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand) return false;
      }

      // Price Range Filter
      if (p.price < minPrice || p.price > maxPrice) return false;

      // Rating Filter
      if (minRating !== null && p.rating < minRating) return false;

      // Brand Filter
      if (selectedBrands.length > 0) {
        const matchesBrandInArray = selectedBrands.some(
          (b) => b.toLowerCase() === p.brand.toLowerCase()
        );
        if (!matchesBrandInArray) return false;
      }

      // Color Filter
      if (selectedColors.length > 0) {
        const pColor = p.color ? p.color.toLowerCase() : "";
        const pTitle = p.title.toLowerCase();
        const matchesColor = selectedColors.some(
          (c) => pColor.includes(c.toLowerCase()) || pTitle.includes(c.toLowerCase())
        );
        if (!matchesColor) return false;
      }

      // Size Filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes && p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
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
  }, [fashionProducts, query, minPrice, maxPrice, selectedBrands, selectedColors, selectedSizes, minRating, sortBy]);

  // LEVEL 2 CATEGORY GRID SELECTION
  const activeLevel2Categories = selectedGender === "men"
    ? MEN_CATEGORIES
    : selectedGender === "women"
    ? WOMEN_CATEGORIES
    : selectedGender === "kids"
    ? KIDS_CATEGORIES
    : [];

  const isLevel1 = !selectedGender && !selectedSection && !selectedBrand && !selectedType;
  const isLevel2 = selectedGender && (!selectedSection && !selectedType && !selectedBrand);
  const isLevel3 = selectedSection || selectedType || selectedBrand;

  const totalActiveFilterCount =
    (minPrice > 0 || maxPrice < 5000 ? 1 : 0) +
    selectedBrands.length +
    selectedColors.length +
    selectedSizes.length +
    selectedFabrics.length +
    selectedPatterns.length +
    selectedFits.length +
    selectedOccasions.length +
    (minRating ? 1 : 0);

  // SIDEBAR RENDER FUNCTION
  const renderSidebarContent = () => (
    <div className="space-y-4">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-pink-600" />
          <h3 className="font-black text-foreground text-xs uppercase tracking-wider">
            Filters
          </h3>
          {totalActiveFilterCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-pink-600 text-[10px] text-white font-bold">
              {totalActiveFilterCount}
            </span>
          )}
        </div>

        {totalActiveFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="size-3" /> Clear All
          </button>
        )}
      </div>

      {/* 1. CATEGORIES HIERARCHY */}
      <FilterAccordion title="Categories" isOpen={openSections.categories} onToggle={() => toggleAccordion("categories")}>
        <div className="text-xs space-y-1.5 text-muted-foreground font-medium pl-1">
          <div className="font-bold text-foreground flex items-center gap-1">
            <span>Clothing & Accessories</span>
          </div>
          <div className="pl-3 space-y-1 border-l-2 border-pink-200 dark:border-pink-900">
            <div className="font-bold text-pink-600">{selectedGender ? `${selectedGender.toUpperCase()}'S WEAR` : "FASHION"}</div>
            {activeLevel2Categories.map((c) => (
              <Link
                key={c.slug}
                to={c.route}
                className={
                  "block hover:text-pink-600 transition-colors py-0.5 " +
                  (selectedSection === c.slug ? "font-black text-pink-600" : "")
                }
              >
                • {c.title}
              </Link>
            ))}
          </div>
        </div>
      </FilterAccordion>

      {/* 2. PRICE RANGE */}
      <FilterAccordion title="Price" isOpen={openSections.price} onToggle={() => toggleAccordion("price")}>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-muted-foreground uppercase">Range</span>
            <span className="text-pink-600 font-black">
              {inr(minPrice)} – {inr(maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-pink-600 cursor-pointer"
          />

          <div className="flex items-center gap-2 text-xs font-bold pt-1">
            <select
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-1/2 p-1.5 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-pink-600"
            >
              <option value={0}>Min (₹0)</option>
              <option value={500}>₹500</option>
              <option value={1000}>₹1,000</option>
              <option value={2000}>₹2,000</option>
            </select>
            <span className="text-muted-foreground">to</span>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-1/2 p-1.5 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-pink-600"
            >
              <option value={1000}>₹1,000</option>
              <option value={2000}>₹2,000</option>
              <option value={3000}>₹3,000</option>
              <option value={5000}>Max (₹5,000+)</option>
            </select>
          </div>
        </div>
      </FilterAccordion>

      {/* 3. BRAND */}
      <FilterAccordion title="Brand" isOpen={openSections.brand} onToggle={() => toggleAccordion("brand")} badgeCount={selectedBrands.length}>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {FILTER_BRANDS.map((brand) => {
            const checked = selectedBrands.some((b) => b.toLowerCase() === brand.toLowerCase());
            return (
              <label
                key={brand}
                onClick={() => toggleArrayFilter(selectedBrands, setSelectedBrands, brand)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600 transition-colors"
              >
                <div
                  className={
                    "size-4 rounded-md border flex items-center justify-center transition-all " +
                    (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border bg-background")
                  }
                >
                  {checked && <Check className="size-3" />}
                </div>
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 4. COLOR */}
      <FilterAccordion title="Color" isOpen={openSections.color} onToggle={() => toggleAccordion("color")} badgeCount={selectedColors.length}>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => toggleArrayFilter(selectedColors, setSelectedColors, c.name)}
                className={
                  `size-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 relative ${c.bgClass} ${c.borderClass || ""} ` +
                  (isSelected
                    ? "ring-2 ring-pink-600 ring-offset-2 scale-110 shadow-md"
                    : "opacity-80 hover:opacity-100 hover:scale-105")
                }
              >
                {isSelected && (
                  <Check className={`size-3.5 font-bold ${c.name === "White" || c.name === "Yellow" ? "text-black" : "text-white"}`} />
                )}
              </button>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 5. SIZE */}
      <FilterAccordion title="Size" isOpen={openSections.size} onToggle={() => toggleAccordion("size")} badgeCount={selectedSizes.length}>
        <div className="flex flex-wrap gap-2 pt-1">
          {SIZE_OPTIONS.map((sz) => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => toggleArrayFilter(selectedSizes, setSelectedSizes, sz)}
                className={
                  "size-8 rounded-lg border text-xs font-black flex items-center justify-center transition-all cursor-pointer " +
                  (isSelected
                    ? "bg-pink-600 border-pink-600 text-white shadow-xs font-bold scale-105"
                    : "border-border bg-background text-foreground hover:border-pink-500 hover:text-pink-600")
                }
              >
                {sz}
              </button>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 6. FABRIC */}
      <FilterAccordion title="Fabric" isOpen={openSections.fabric} onToggle={() => toggleAccordion("fabric")} badgeCount={selectedFabrics.length}>
        <div className="space-y-1.5">
          {FABRIC_OPTIONS.map((fab) => {
            const checked = selectedFabrics.includes(fab);
            return (
              <label
                key={fab}
                onClick={() => toggleArrayFilter(selectedFabrics, setSelectedFabrics, fab)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{fab}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 7. PATTERN */}
      <FilterAccordion title="Pattern" isOpen={openSections.pattern} onToggle={() => toggleAccordion("pattern")} badgeCount={selectedPatterns.length}>
        <div className="space-y-1.5">
          {PATTERN_OPTIONS.map((pat) => {
            const checked = selectedPatterns.includes(pat);
            return (
              <label
                key={pat}
                onClick={() => toggleArrayFilter(selectedPatterns, setSelectedPatterns, pat)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{pat}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 8. FIT */}
      <FilterAccordion title="Fit" isOpen={openSections.fit} onToggle={() => toggleAccordion("fit")} badgeCount={selectedFits.length}>
        <div className="space-y-1.5">
          {FIT_OPTIONS.map((fit) => {
            const checked = selectedFits.includes(fit);
            return (
              <label
                key={fit}
                onClick={() => toggleArrayFilter(selectedFits, setSelectedFits, fit)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{fit}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 9. OCCASION */}
      <FilterAccordion title="Occasion" isOpen={openSections.occasion} onToggle={() => toggleAccordion("occasion")} badgeCount={selectedOccasions.length}>
        <div className="space-y-1.5">
          {OCCASION_OPTIONS.map((occ) => {
            const checked = selectedOccasions.includes(occ);
            return (
              <label
                key={occ}
                onClick={() => toggleArrayFilter(selectedOccasions, setSelectedOccasions, occ)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{occ}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 10. COLLAR */}
      <FilterAccordion title="Collar" isOpen={openSections.collar} onToggle={() => toggleAccordion("collar")} badgeCount={selectedCollars.length}>
        <div className="space-y-1.5">
          {COLLAR_OPTIONS.map((col) => {
            const checked = selectedCollars.includes(col);
            return (
              <label
                key={col}
                onClick={() => toggleArrayFilter(selectedCollars, setSelectedCollars, col)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{col}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 11. SLEEVES */}
      <FilterAccordion title="Sleeves" isOpen={openSections.sleeves} onToggle={() => toggleAccordion("sleeves")} badgeCount={selectedSleeves.length}>
        <div className="space-y-1.5">
          {SLEEVES_OPTIONS.map((slv) => {
            const checked = selectedSleeves.includes(slv);
            return (
              <label
                key={slv}
                onClick={() => toggleArrayFilter(selectedSleeves, setSelectedSleeves, slv)}
                className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{slv}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 12. PACK OF */}
      <FilterAccordion title="Pack Of" isOpen={openSections.pack} onToggle={() => toggleAccordion("pack")} badgeCount={selectedPacks.length}>
        <div className="flex gap-2">
          {PACK_OPTIONS.map((pk) => {
            const checked = selectedPacks.includes(pk);
            return (
              <button
                key={pk}
                type="button"
                onClick={() => toggleArrayFilter(selectedPacks, setSelectedPacks, pk)}
                className={"px-3 py-1 rounded-lg border text-xs font-bold cursor-pointer " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border bg-background")}
              >
                {pk}
              </button>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 13. CUSTOMER RATINGS */}
      <FilterAccordion title="Customer Ratings" isOpen={openSections.rating} onToggle={() => toggleAccordion("rating")}>
        <div className="space-y-2 text-xs font-bold">
          {[4, 3].map((r) => (
            <label
              key={r}
              onClick={() => setMinRating(minRating === r ? null : r)}
              className="flex items-center gap-2 cursor-pointer hover:text-pink-600"
            >
              <div className={"size-4 rounded-md border flex items-center justify-center " + (minRating === r ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                {minRating === r && <Check className="size-3" />}
              </div>
              <span className="flex items-center gap-1">
                {r} <Star className="size-3 fill-amber-400 text-amber-400 inline" /> & above
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* 14. DISCOUNT */}
      <FilterAccordion title="Discount" isOpen={openSections.discount} onToggle={() => toggleAccordion("discount")} badgeCount={selectedDiscounts.length}>
        <div className="space-y-1.5 text-xs font-semibold">
          {DISCOUNT_OPTIONS.map((disc) => {
            const checked = selectedDiscounts.includes(disc);
            return (
              <label
                key={disc}
                onClick={() => toggleArrayFilter(selectedDiscounts, setSelectedDiscounts, disc)}
                className="flex items-center gap-2 cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{disc}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>

      {/* 15. NEW ARRIVALS */}
      <FilterAccordion title="New Arrivals" isOpen={openSections.newArrivals} onToggle={() => toggleAccordion("newArrivals")}>
        <label
          onClick={() => setOnlyNewArrivals(!onlyNewArrivals)}
          className="flex items-center justify-between text-xs font-semibold cursor-pointer pt-1"
        >
          <span>Show Only New Arrivals</span>
          <div className={"w-9 h-5 rounded-full p-0.5 transition-colors " + (onlyNewArrivals ? "bg-pink-600" : "bg-slate-300 dark:bg-slate-700")}>
            <div className={"size-4 rounded-full bg-white transition-transform " + (onlyNewArrivals ? "translate-x-4" : "")} />
          </div>
        </label>
      </FilterAccordion>

      {/* 16. OFFERS */}
      <FilterAccordion title="Offers" isOpen={openSections.offers} onToggle={() => toggleAccordion("offers")} badgeCount={selectedOffers.length}>
        <div className="space-y-1.5 text-xs font-semibold">
          {OFFER_OPTIONS.map((off) => {
            const checked = selectedOffers.includes(off);
            return (
              <label
                key={off}
                onClick={() => toggleArrayFilter(selectedOffers, setSelectedOffers, off)}
                className="flex items-center gap-2 cursor-pointer hover:text-pink-600"
              >
                <div className={"size-4 rounded-md border flex items-center justify-center " + (checked ? "bg-pink-600 border-pink-600 text-white" : "border-border")}>
                  {checked && <Check className="size-3" />}
                </div>
                <span>{off}</span>
              </label>
            );
          })}
        </div>
      </FilterAccordion>
    </div>
  );

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 space-y-10 font-sans">
      {/* ========================================================
          🎯 LEVEL 1 – MAIN FASHION PAGE (/fashion)
          SHOW: 1. BIG SLIDABLE TOP BANNER CAROUSEL
                2. 3 LARGE CATEGORY BOXES (MEN, WOMEN, KIDS)
                3. RECOMMENDED ITEMS SECTION
         ======================================================== */}
      {isLevel1 && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* 1. TOP BANNER CAROUSEL (350px - 450px) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="group relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-border bg-slate-900"
          >
            {FASHION_HERO_BANNERS.map((banner, index) => (
              <div
                key={banner.id}
                className={
                  "absolute inset-0 transition-opacity duration-700 ease-in-out flex items-end p-6 md:p-12 " +
                  (index === activeBannerIndex ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none")
                }
              >
                <img
                  src={imgErrors[banner.id] ? "https://picsum.photos/1200/400?fashion" : banner.image}
                  alt={banner.title}
                  loading="lazy"
                  onError={() => handleImgError(banner.id)}
                  className="absolute inset-0 size-full object-cover filter brightness-[0.85] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-20 space-y-3 max-w-xl text-left">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-600 text-white font-black text-xs uppercase tracking-widest shadow-md">
                    <Sparkles className="size-3.5 fill-current" /> {banner.tag}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                    {banner.title}
                  </h1>
                  <p className="text-sm md:text-lg text-pink-100 font-medium drop-shadow-xs">
                    {banner.subtitle}
                  </p>
                  <Link
                    to={banner.route}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-black text-xs uppercase rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    <span>{banner.buttonText}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Carousel Navigation Buttons */}
            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Pagination Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {FASHION_HERO_BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBannerIndex(i)}
                  className={
                    "h-2 rounded-full transition-all cursor-pointer " +
                    (i === activeBannerIndex ? "w-8 bg-pink-600" : "w-2 bg-white/60 hover:bg-white")
                  }
                />
              ))}
            </div>
          </div>

          {/* 2. 3 CATEGORY BOXES (MEN, WOMEN, KIDS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                <Shirt className="size-6 text-pink-600" /> Explore By Department
              </h2>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                3 Main Collections
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORY_BOXES.map((box) => (
                <Link
                  key={box.id}
                  to={box.route}
                  className="group relative rounded-3xl overflow-hidden border border-border shadow-md min-h-[320px] md:min-h-[400px] flex flex-col justify-end p-6 cursor-pointer bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:border-pink-500 hover:scale-[1.02] text-left"
                >
                  <img
                    src={imgErrors[box.id] ? "https://picsum.photos/600/400?fashion" : box.image}
                    alt={box.title}
                    loading="lazy"
                    onError={() => handleImgError(box.id)}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  <div className="relative z-10 space-y-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-600 text-white font-black text-xs uppercase tracking-widest self-start shadow-md">
                      <Sparkles className="size-3.5 fill-current" /> {box.badge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center justify-between">
                      <span>{box.title}</span>
                      <ArrowRight className="size-6 text-pink-400 group-hover:translate-x-1.5 transition-transform" />
                    </h3>
                    <p className="text-xs md:text-sm text-pink-100 font-medium">
                      {box.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. RECOMMENDED ITEMS SECTION */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                  <Flame className="size-6 text-amber-500 fill-amber-500" /> Recommended For You
                </h2>
                <p className="text-xs text-muted-foreground font-medium">
                  Handpicked trending styles across Men, Women & Kids
                </p>
              </div>
            </div>

            {/* 5 COLUMNS PRODUCT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recommendedFashionProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          🎯 LEVEL 2 – CATEGORY GRID PAGE (/fashion/men, /fashion/women, /fashion/kids)
          SHOW MOBILE-STYLE SMALL SQUARE CARDS FOR CATEGORIES
         ======================================================== */}
      {isLevel2 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* HEADER & BREADCRUMB */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to="/fashion"
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-pink-600 hover:text-pink-600 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> All Departments
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Shirt className="size-6 text-pink-600" />
                  {selectedGender}'s Fashion Categories
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Select a category to view products
                </p>
              </div>
            </div>
          </div>

          {/* CATEGORY ICON GRID (MOBILES STYLE ARCHITECTURE) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {activeLevel2Categories.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.route}
                className="group flex flex-col items-center justify-center p-3 rounded-[12px] bg-pink-50/90 dark:bg-pink-950/30 border border-pink-200/80 dark:border-pink-900/50 shadow-xs hover:shadow-md hover:border-pink-500 transition-all duration-300 cursor-pointer text-center"
              >
                <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-[8px]">
                  <img
                    src={imgErrors[cat.slug] ? cat.fallbackImage : cat.image}
                    alt={cat.title}
                    loading="lazy"
                    onError={() => handleImgError(cat.slug)}
                    className="size-full object-cover filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-foreground/90 group-hover:text-pink-600 tracking-tight line-clamp-1">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          🎯 LEVEL 3 – PRODUCT LISTING PAGE (/fashion/men/shirts, /fashion/women/dresses, etc.)
          SHOW COLLAPSIBLE FLIPKART-LEVEL FILTER SIDEBAR + PRODUCT GRID
         ======================================================== */}
      {isLevel3 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* HEADER & BREADCRUMB */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <Link
                to={selectedGender ? `/fashion/${selectedGender}` : "/fashion"}
                className="px-3.5 py-1.5 bg-card border border-border rounded-xl text-xs font-bold text-foreground hover:border-pink-600 hover:text-pink-600 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="size-4" /> Back to {selectedGender ? `${selectedGender}'s` : "Fashion"} Categories
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight capitalize flex items-center gap-2">
                  <Shirt className="size-6 text-pink-600" />
                  {selectedGender ? `${selectedGender.toUpperCase()} ` : ""}
                  {(selectedSection || selectedType || selectedBrand || "").toUpperCase().replace("-", " ")}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Showing {filteredProducts.length} product(s) available
                </p>
              </div>
            </div>

            {/* Mobile Filter Drawer Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-pink-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer self-start"
            >
              <Filter className="size-4" /> Filter & Sort {totalActiveFilterCount > 0 && `(${totalActiveFilterCount})`}
            </button>
          </div>

          {/* FILTER SIDEBAR + SORT BAR + PRODUCT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* DESKTOP FIXED/STICKY LEFT SIDEBAR (17 COLLAPSIBLE SECTIONS) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-2 rounded-3xl border border-border bg-card p-5 shadow-xs sticky top-20 max-h-[85vh] overflow-y-auto [scrollbar-width:none]">
              {renderSidebarContent()}
            </aside>

            {/* MOBILE FILTER DRAWER MODAL */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs animate-in fade-in">
                <div className="ml-auto size-full max-w-xs bg-card p-6 shadow-2xl overflow-y-auto space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                      <span className="font-black text-sm uppercase">Fashion Filters</span>
                      <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-full hover:bg-muted cursor-pointer">
                        <X className="size-5" />
                      </button>
                    </div>
                    {renderSidebarContent()}
                  </div>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full py-3 bg-pink-600 text-white font-black text-xs uppercase rounded-xl shadow-md cursor-pointer mt-4"
                  >
                    Apply Filters ({filteredProducts.length} items)
                  </button>
                </div>
              </div>
            )}

            {/* RIGHT 9 COLS: SORT BAR & PRODUCT GRID */}
            <div className="lg:col-span-9 space-y-6">
              {/* Sort Bar */}
              <div className="p-4 rounded-2xl border border-border bg-card flex items-center justify-between gap-3 shadow-xs">
                <span className="text-xs font-bold text-muted-foreground uppercase">Sort Options:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground outline-none focus:border-pink-600 cursor-pointer shadow-xs"
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
                  <h3 className="text-lg font-bold text-foreground">No products available matching these filters</h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Try widening your price range or clearing active filter selections.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-pink-600 text-white font-bold text-xs uppercase rounded-xl cursor-pointer hover:bg-pink-700 transition-colors shadow-sm"
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
