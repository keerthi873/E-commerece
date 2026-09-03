import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import {
  ArrowLeft,
  Star,
  Heart,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  Tag,
  CreditCard,
  MapPin,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import { products, inr, type Product } from "@/components/store/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { StoreProvider, useStore } from "@/components/store/store-context";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  return (
    <StoreProvider>
      <ProductDetailPage />
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}

function ProductDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    buyNow,
    wishlist,
    toggleWishlist,
    addRecentlyViewed,
    pincode,
    setPincode,
    user,
    openAuthModal,
  } = useStore();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.color) {
        setSelectedColor(product.color);
      }
    }
  }, [product, addRecentlyViewed]);

  const [activeImage, setActiveImage] = React.useState(product.image);
  const [pincodeCheckInput, setPincodeCheckInput] = React.useState(pincode || "500034");
  const [pincodeStatus, setPincodeStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  const saved = wishlist.includes(product.id);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const emiPerMonth = Math.round(product.price / 6);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeCheckInput.length === 6) {
      setPincode(pincodeCheckInput);
      setPincodeStatus(`Delivery available to ${pincodeCheckInput} (Express delivery by tomorrow)`);
    } else {
      setPincodeStatus("Please enter a valid 6-digit pincode.");
    }
  };

  const handleBuyNow = () => {
    if (!user || !user.isAuth) {
      openAuthModal("Please log in to purchase this product.");
      return;
    }
    buyNow(product);
    navigate({ to: "/checkout" });
  };

  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  ];

  const similarProducts = React.useMemo(() => {
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category || p.subCategory === product.subCategory)
      )
      .slice(0, 6);
  }, [product]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6 space-y-8">
        {/* Back Link */}
        <Link
          to="/category/$name"
          params={{ name: product.category }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-brand transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back to {product.category}
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-20">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm">
              <img
                src={activeImage}
                alt={product.title}
                className="size-full object-contain transition-all duration-300"
              />

              {/* Wishlist Button Overlay */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute right-4 top-4 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-xs hover:bg-background hover:text-brand shadow-sm transition-all cursor-pointer"
                title={saved ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={"size-5 " + (saved ? "fill-pink-600 text-pink-600" : "")} />
              </button>
            </div>

            {/* Thumbnail switcher */}
            <div className="flex gap-2">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-square size-16 overflow-hidden rounded-md border p-1 bg-muted cursor-pointer transition-all ${
                    activeImage === imgUrl
                      ? "border-brand ring-2 ring-brand"
                      : "border-border hover:border-brand/60"
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="size-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Offers, Pincode & Action Buttons (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {product.brand}
                </span>
                {product.isBestseller && (
                  <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="mt-1 text-xl font-extrabold text-foreground leading-snug">
                {product.title}
              </h1>

              <div className="mt-2.5 flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 rounded bg-emerald-600 px-2 py-0.5 font-bold text-white shadow-2xs">
                  {product.rating.toFixed(1)}
                  <Star className="size-3.5 fill-current" />
                </span>
                <span className="text-muted-foreground font-semibold">({product.reviews} customer ratings)</span>
              </div>
            </div>

            {/* Price & Discounts */}
            <div className="rounded-lg bg-muted/30 p-4 border border-border space-y-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-foreground">{inr(product.price)}</span>
                <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {off}% OFF
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-medium">Inclusive of all taxes</p>
            </div>

            {/* Available Sizes if Fashion */}
            {product.sizes && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Select Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={
                        "px-4 py-2 border rounded-xl text-xs font-extrabold cursor-pointer transition-all " +
                        (selectedSize === sz
                          ? "bg-brand border-brand text-primary-foreground shadow-md scale-105"
                          : "border-border bg-background text-foreground hover:border-brand")
                      }
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bank Offers & EMI Box */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-2 text-xs">
              <h3 className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <Tag className="size-3.5" />
                Available Offers & Bank Discounts
              </h3>
              <ul className="space-y-1 text-foreground/90 font-medium">
                <li className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-amber-600 shrink-0" />
                  <span><strong>Bank Offer:</strong> 10% Instant Discount on HDFC Credit Card EMI transactions.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CreditCard className="size-3.5 text-amber-600 shrink-0" />
                  <span><strong>No Cost EMI:</strong> Available starting from <strong>{inr(emiPerMonth)}/month</strong> for 6 months.</span>
                </li>
              </ul>
            </div>

            {/* Pincode Availability Checker */}
            <div className="rounded-lg border border-border bg-card p-3.5 space-y-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <MapPin className="size-3.5 text-brand" />
                Check Delivery & Pincode
              </label>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeCheckInput}
                  onChange={(e) => setPincodeCheckInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-brand focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded bg-brand px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-brand-deep cursor-pointer"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="size-3.5" />
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Guarantees List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-y border-border py-3">
              <p className="flex items-center gap-2 font-medium">
                <Check className="size-4 text-emerald-500" />
                In Stock & Fast Delivery
              </p>
              <p className="flex items-center gap-2 font-medium">
                <Truck className="size-4 text-brand" />
                Free Shipping over ₹500
              </p>
              <p className="flex items-center gap-2 font-medium">
                <RotateCcw className="size-4 text-brand" />
                7 Days Return Policy
              </p>
              <p className="flex items-center gap-2 font-medium">
                <ShieldCheck className="size-4 text-brand" />
                1 Year Brand Warranty
              </p>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 rounded-lg border-2 border-brand bg-card py-3 text-xs font-extrabold uppercase tracking-wider text-brand hover:bg-brand/10 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 rounded-lg bg-brand py-3 text-xs font-extrabold uppercase tracking-wider text-primary-foreground hover:bg-brand-deep transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Zap className="size-4 fill-current" />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Specifications Table */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-foreground border-b border-border pb-2">
            Product Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-medium">Brand</span>
              <span className="font-bold text-foreground">{product.brand}</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-medium">Category</span>
              <span className="font-bold text-foreground">{product.category}</span>
            </div>
            {product.subCategory && (
              <div className="flex justify-between border-b border-border/60 pb-1.5">
                <span className="text-muted-foreground font-medium">Sub-Category</span>
                <span className="font-bold text-foreground capitalize">{product.subCategory}</span>
              </div>
            )}
            {product.color && (
              <div className="flex justify-between border-b border-border/60 pb-1.5">
                <span className="text-muted-foreground font-medium">Color</span>
                <span className="font-bold text-foreground">{product.color}</span>
              </div>
            )}
            {product.sizes && (
              <div className="flex justify-between border-b border-border/60 pb-1.5">
                <span className="text-muted-foreground font-medium">Available Sizes</span>
                <span className="font-bold text-foreground">{product.sizes.join(", ")}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-medium">Warranty</span>
              <span className="font-bold text-foreground">1 Year Manufacturer Warranty</span>
            </div>
          </div>
        </div>

        {/* Similar Products Recommendation Grid */}
        {similarProducts.length > 0 && (
          <div className="space-y-4">
            <div className="border-b-2 border-brand pb-2">
              <h2 className="text-lg font-bold text-foreground">Similar Products You May Like</h2>
            </div>
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} badgeLabel="Similar" />
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
