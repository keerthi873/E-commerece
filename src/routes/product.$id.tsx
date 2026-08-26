import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { ArrowLeft, Star, Heart, Check, Truck, RotateCcw, ShieldCheck, Tag, ShoppingCart, Zap, CheckCircle2 } from "lucide-react";
import { products, inr } from "@/components/store/catalog";
import { StoreProvider, useStore } from "@/components/store/store-context";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { ProductCard } from "@/components/store/ProductCard";

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
  const { addToCart, buyNow, wishlist, toggleWishlist, addRecentlyViewed } = useStore();
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [addedToCartToast, setAddedToCartToast] = React.useState(false);

  const product = products.find((p) => p.id === id) || products[0];

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

  const saved = wishlist.includes(product.id);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const navigate = useNavigate();

  const handleAddToCart = (targetProduct?: typeof product) => {
    const p = targetProduct || product;
    if (!p) return;

    try {
      let cartData = typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;
      let cart = cartData ? JSON.parse(cartData) : [];

      if (!Array.isArray(cart)) {
        cart = [];
      }

      const itemToAdd = {
        id: p.id,
        name: p.title || (p as any).name,
        title: p.title || (p as any).name,
        price: p.price,
        mrp: p.mrp || p.price,
        brand: p.brand || "",
        image: p.image,
        category: p.category || "general",
        qty: 1,
      };

      const foundIndex = cart.findIndex((i: any) =>
        i.product ? i.product.id === p.id : i.id === p.id
      );

      if (foundIndex >= 0) {
        if (cart[foundIndex].qty) {
          cart[foundIndex].qty += 1;
        } else {
          cart[foundIndex].qty = 2;
        }
      } else {
        cart.push(itemToAdd);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(cart));
        localStorage.setItem("antigravity_cart", JSON.stringify(cart));
      }

      addToCart(p);
      toast.success("Item added to cart", { description: p.title || (p as any).name });
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    buyNow(product);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("buyNowProduct", JSON.stringify({ product, qty: 1 }));
      }
    } catch (e) {
      console.error("Error setting buyNowProduct in localStorage", e);
    }
    navigate({ to: "/checkout" });
  };

  // STRICT RELATED PRODUCTS FILTERING (NO CATEGORY MIXING)
  const relatedProducts = React.useMemo(() => {
    return products
      .filter((p) => {
        if (p.id === product.id) return false;
        if (product.fashionCategory) {
          return p.fashionCategory === product.fashionCategory;
        }
        return p.category === product.category;
      })
      .slice(0, 5);
  }, [product]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6 space-y-8">
        {/* Breadcrumb / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to={product.fashionCategory ? `/fashion/${product.fashionCategory}` : "/"}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to {product.fashionCategory ? `${product.fashionCategory.toUpperCase()}'S Store` : "Catalog"}</span>
          </Link>

          {addedToCartToast && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md animate-in fade-in">
              <CheckCircle2 className="size-4" /> Added to Bag!
            </span>
          )}
        </div>

        {/* Product Main Detail Container */}
        <div className="grid gap-8 md:grid-cols-2 border border-border bg-card p-6 md:p-8 shadow-xs rounded-3xl">
          {/* Left: Product Image */}
          <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-border flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/600?fallback";
              }}
              className="size-full object-contain transition-transform duration-500 hover:scale-105"
            />
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              className="absolute right-4 top-4 bg-card/90 backdrop-blur-xs p-3 rounded-full text-muted-foreground hover:text-pink-600 shadow-md cursor-pointer transition-colors"
            >
              <Heart className={"size-6 " + (saved ? "fill-pink-600 text-pink-600" : "")} />
            </button>
          </div>

          {/* Right: Details & Action Buttons */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-pink-600 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900">
                  {product.fashionCategory ? `${product.fashionCategory.toUpperCase()}'S COLLECTION` : product.category}
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-snug">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 font-bold text-white text-xs shadow-xs">
                  {product.rating.toFixed(1)}
                  <Star className="size-3.5 fill-current" />
                </span>
                <span className="text-muted-foreground font-medium">({product.reviews} verified reviews)</span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 border-y border-border py-4">
              <span className="text-3xl md:text-4xl font-black text-foreground">
                {inr(product.price)}
              </span>
              <span className="text-sm md:text-base text-muted-foreground line-through font-medium">
                {inr(product.mrp)}
              </span>
              <span className="text-sm font-black text-pink-600 bg-pink-50 dark:bg-pink-950/40 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-900">
                {off}% OFF
              </span>
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
                          ? "bg-pink-600 border-pink-600 text-white shadow-md scale-105"
                          : "border-border bg-background text-foreground hover:border-pink-500")
                      }
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock & Guarantee Badges */}
            <div className="space-y-2 text-xs text-muted-foreground font-medium pt-2">
              <p className="flex items-center gap-2">
                <Check className="size-4 text-emerald-600" />
                <span className="font-bold text-foreground">In Stock & Ready for Immediate Dispatch</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck className="size-4 text-pink-600" />
                <span>Free Express Doorstep Delivery within 24-48 Hours</span>
              </p>
              <p className="flex items-center gap-2">
                <RotateCcw className="size-4 text-pink-600" />
                <span>7 Days Easy Return & Exchange Guarantee</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-pink-600" />
                <span>100% Verified Authentic Product Quality</span>
              </p>
            </div>

            {/* 🟢 ADD TO CART & 🟡 BUY NOW BUTTONS (ONLY ON DETAILS PAGE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              {/* 🟢 ADD TO CART BUTTON */}
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                <ShoppingCart className="size-4" />
                <span>Add To Cart</span>
              </button>

              {/* 🟡 BUY NOW BUTTON */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3.5 px-6 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="size-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <Tag className="size-5 text-pink-600" />
              <h2 className="text-xl font-black uppercase text-foreground tracking-tight">
                Similar Products in {product.fashionCategory ? `${product.fashionCategory.toUpperCase()}'S` : product.category}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
