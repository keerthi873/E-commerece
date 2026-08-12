import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { ProductCard } from "@/components/store/ProductCard";
import { products } from "@/components/store/catalog";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider, useStore } from "@/components/store/store-context";

export const Route = createFileRoute("/category/$name")({
  component: CategoryRoute,
});

function CategoryRoute() {
  return (
    <StoreProvider>
      <CategoryPage />
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}

function CategoryPage() {
  const { name } = Route.useParams();
  const { query } = useStore();

  // Decode category name from URL param (e.g., "Toys%20%26%20Baby" -> "Toys & Baby")
  const decodedCategory = React.useMemo(() => {
    try {
      return decodeURIComponent(name);
    } catch {
      return name;
    }
  }, [name]);

  const categoryProducts = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat =
        p.category.toLowerCase() === decodedCategory.toLowerCase() ||
        (decodedCategory.toLowerCase() === "fashion" && p.category === "Fashion");
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [decodedCategory, query]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        {/* Category Header Bar matching existing UI style */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-brand pb-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground capitalize">
              {decodedCategory} Store
            </h1>
            <p className="text-sm text-muted-foreground">
              Showing {categoryProducts.length} item(s) in {decodedCategory}
            </p>
          </div>
        </div>

        {/* Product Cards Grid using existing ProductCard UI */}
        {categoryProducts.length === 0 ? (
          <p className="mt-8 text-sm text-muted-foreground">
            No products found in {decodedCategory}.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} badgeLabel={decodedCategory} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
