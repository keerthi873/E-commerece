import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { ProductCard } from "@/components/store/ProductCard";
import { products } from "@/components/store/catalog";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider, useStore } from "@/components/store/store-context";
import { MobileSection } from "@/components/store/MobileSection";
import { FashionSection } from "@/components/store/FashionSection";
import { ElectronicsSection } from "@/components/store/ElectronicsSection";

import { BeautySection } from "@/components/store/BeautySection";
import { HomeSection } from "@/components/store/HomeSection";
import { AppliancesSection } from "@/components/store/AppliancesSection";
import { ToysGiftsSection } from "@/components/store/ToysGiftsSection";
import { GrocerySection } from "@/components/store/GrocerySection";
import { SportsSection } from "@/components/store/SportsSection";
import { BooksSection } from "@/components/store/BooksSection";

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

  // Decode category name from URL param
  const decodedCategory = React.useMemo(() => {
    try {
      return decodeURIComponent(name);
    } catch {
      return name;
    }
  }, [name]);

  const catLower = decodedCategory.toLowerCase();

  // Compute category products unconditionally BEFORE any conditional returns (Rules of Hooks)
  const categoryProducts = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = p.category.toLowerCase() === catLower;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [catLower, query]);

  // Unified Section Delegation for Mobiles, Fashion, Electronics, Beauty, Home, Appliances, Toys/Gifts, Grocery, Sports & Books
  if (catLower === "mobiles") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <MobileSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "fashion") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <FashionSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "electronics") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <ElectronicsSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "beauty") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <BeautySection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "home") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <HomeSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "appliances") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <AppliancesSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "toys" || catLower === "toys & gifts" || catLower === "toys & baby" || catLower === "gifts" || catLower === "toys-gifts") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <ToysGiftsSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "grocery" || catLower === "grocery & essentials") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <GrocerySection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "sports" || catLower === "sports & fitness") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <SportsSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (catLower === "books" || catLower === "books & stationery" || catLower === "stationery") {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <BooksSection />
        </main>
        <SiteFooter />
      </div>
    );
  }

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
