import * as React from "react";
import { ProductCard } from "./ProductCard";
import { products, type Product } from "./catalog";
import { useStore } from "./store-context";

export function ForYouSection() {
  const { recentlyViewed } = useStore();
  const [activeTab, setActiveTab] = React.useState<"trending" | "recent" | "recommended">("trending");

  // 1. Trending Picks (e.g. Products with high ratings or deal flag)
  const trendingProducts = React.useMemo(() => {
    return products.filter((p) => p.rating >= 4.5 || p.isDealOfTheDay).slice(0, 6);
  }, []);

  // 2. Recently Viewed Products (Hydrated from localStorage via store-context)
  const recentProducts = React.useMemo(() => {
    if (!recentlyViewed || recentlyViewed.length === 0) return [];
    return recentlyViewed
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 6);
  }, [recentlyViewed]);

  // 3. Recommended for You (e.g. Top discount / curated picks)
  const recommendedProducts = React.useMemo(() => {
    return products.filter((p) => p.mrp > p.price).slice(0, 6);
  }, []);

  const currentProducts =
    activeTab === "trending"
      ? trendingProducts
      : activeTab === "recent"
      ? recentProducts
      : recommendedProducts;

  const currentBadgeLabel =
    activeTab === "trending"
      ? "Trending"
      : activeTab === "recent"
      ? "Recent"
      : "Recommended";

  return (
    <section id="for-you" className="mx-auto max-w-[1400px] px-4 py-6">
      {/* Section Title & Sub-category Tabs matching existing UI design style */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-brand pb-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">For You</h2>
          <p className="text-sm text-muted-foreground">
            Personalized picks, trending items & your recent history
          </p>
        </div>

        {/* 3 Sub-category Tabs */}
        <div className="flex items-center gap-1 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("trending")}
            className={
              "px-3 py-1.5 transition-colors border-b-2 " +
              (activeTab === "trending"
                ? "border-brand text-brand font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            Trending Picks
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={
              "px-3 py-1.5 transition-colors border-b-2 " +
              (activeTab === "recent"
                ? "border-brand text-brand font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            Recently Viewed ({recentProducts.length})
          </button>
          <button
            onClick={() => setActiveTab("recommended")}
            className={
              "px-3 py-1.5 transition-colors border-b-2 " +
              (activeTab === "recommended"
                ? "border-brand text-brand font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            Recommended for You
          </button>
        </div>
      </div>

      {/* Product Display Grid using exact existing ProductCard */}
      {currentProducts.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          {activeTab === "recent"
            ? "No recently viewed products yet. Click on any product to view details!"
            : "No items available in this category."}
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {currentProducts.map((p) => (
            <ProductCard key={p.id} product={p} badgeLabel={currentBadgeLabel} />
          ))}
        </div>
      )}
    </section>
  );
}
