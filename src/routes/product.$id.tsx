import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { ArrowLeft, Star, Heart, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { products, inr } from "@/components/store/catalog";
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
  const { addToCart, wishlist, toggleWishlist, addRecentlyViewed } = useStore();

  const product = products.find((p) => p.id === id) || products[0];

  React.useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
    }
  }, [product, addRecentlyViewed]);

  const saved = wishlist.includes(product.id);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-brand mb-4"
        >
          <ArrowLeft className="size-4" />
          <span>Back to products</span>
        </Link>

        <div className="grid gap-8 md:grid-cols-2 border border-border bg-card p-6 shadow-xs">
          {/* Left: Product Image */}
          <div className="relative aspect-square overflow-hidden bg-muted p-4">
            <img
              src={product.image}
              alt={product.title}
              className="size-full object-contain"
            />
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              className="absolute right-3 top-3 bg-card/90 p-2 text-muted-foreground hover:text-brand"
            >
              <Heart className={"size-5 " + (saved ? "fill-brand text-brand" : "")} />
            </button>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {product.brand}
              </span>
              <h1 className="mt-1 text-2xl font-bold text-foreground">
                {product.title}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-sm bg-brand px-2 py-0.5 font-semibold text-primary-foreground">
                  {product.rating.toFixed(1)}
                  <Star className="size-3 fill-current" />
                </span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 border-y border-border py-4">
              <span className="text-3xl font-bold text-foreground">
                {inr(product.price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {inr(product.mrp)}
              </span>
              <span className="text-sm font-semibold text-brand">
                {off}% off
              </span>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Check className="size-4 text-brand" />
                <span>In Stock & Ready to Ship</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck className="size-4 text-brand" />
                <span>Free Express Delivery available</span>
              </p>
              <p className="flex items-center gap-2">
                <RotateCcw className="size-4 text-brand" />
                <span>7 Days Hassle-Free Return Policy</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" />
                <span>100% Genuine Product Warranty</span>
              </p>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-accent py-3 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90 shadow-sm"
            >
              Add to cart — {inr(product.price)}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
