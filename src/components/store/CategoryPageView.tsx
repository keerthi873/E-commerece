import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ChevronRight } from "lucide-react";
import { CategoryPageData } from "@/data/categoryData";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ProductCard } from "./ProductCard";

export function CategoryPageView({ data }: { data: CategoryPageData }) {
  // Generate the exact 3 main tabs requested for each category
  const tabs = React.useMemo(() => {
    const slug = data.slug.toLowerCase();

    // Map 3 main tabs per category
    const tabConfigs: Record<string, { id: string; label: string; filterKeys: string[] }[]> = {
      mobiles: [
        { id: "smartphones", label: "Smartphones", filterKeys: ["phone", "trending", "budget", "flagship", "gaming"] },
        { id: "accessories", label: "Accessories", filterKeys: ["access", "case", "charger", "powerbank"] },
        { id: "gadgets", label: "Gadgets", filterKeys: ["gadget", "watch", "bud", "wearable"] },
      ],
      electronics: [
        { id: "devices", label: "Devices", filterKeys: ["laptop", "tv", "device"] },
        { id: "accessories", label: "Accessories", filterKeys: ["audio", "bud", "headphone", "speaker", "access"] },
        { id: "components", label: "Components", filterKeys: ["comp", "smartwatch", "powerbank", "cable"] },
      ],
      beauty: [
        { id: "makeup", label: "Makeup", filterKeys: ["makeup", "lipstick", "foundation"] },
        { id: "skincare", label: "Skincare", filterKeys: ["skin", "serum", "moisturizer", "cleanser"] },
        { id: "haircare", label: "Haircare", filterKeys: ["hair", "fragrance", "perfume", "shampoo"] },
      ],
      home: [
        { id: "decor", label: "Decor", filterKeys: ["decor", "clock", "light", "lamp"] },
        { id: "kitchen", label: "Kitchen", filterKeys: ["kitchen", "cookware", "pan"] },
      ],
      appliances: [
        { id: "large-appliances", label: "Large Appliances", filterKeys: ["wash", "refrig", "air condition", "ac"] },
        { id: "small-appliances", label: "Small Appliances", filterKeys: ["fryer", "oven", "mixer", "small"] },
        { id: "essentials", label: "Essentials", filterKeys: ["iron", "purifier", "essential", "heater"] },
      ],
      toys: [
        { id: "toys", label: "Toys", filterKeys: ["toy", "lego", "figure"] },
        { id: "baby-care", label: "Baby Care", filterKeys: ["baby", "diaper", "stroller"] },
        { id: "clothing", label: "Clothing", filterKeys: ["cloth", "romper", "frock"] },
      ],
      grocery: [
        { id: "food", label: "Food", filterKeys: ["fruit", "vegetable", "packaged", "oat"] },
        { id: "essentials", label: "Essentials", filterKeys: ["essential", "staple", "oil"] },
        { id: "beverages", label: "Beverages", filterKeys: ["bever", "tea", "coffee", "juice"] },
      ],
      sports: [
        { id: "outdoor", label: "Outdoor", filterKeys: ["cricket", "bat", "outdoor"] },
        { id: "fitness", label: "Fitness", filterKeys: ["fit", "yoga", "gym", "mat"] },
        { id: "sportswear", label: "Sportswear", filterKeys: ["wear", "t-shirt", "shoe"] },
      ],
      books: [
        { id: "fiction", label: "Fiction", filterKeys: ["fict", "atomic", "psychology", "bestseller"] },
        { id: "education", label: "Education", filterKeys: ["edu", "ncert", "exam"] },
        { id: "kids", label: "Kids", filterKeys: ["kid", "story", "drawing"] },
      ],
      fashion: [
        { id: "men", label: "Men", filterKeys: ["men"] },
        { id: "women", label: "Women", filterKeys: ["women"] },
        { id: "kids", label: "Kids", filterKeys: ["kids"] },
      ],
    };

    const config = tabConfigs[slug] || [
      { id: "tab1", label: "Tab 1", filterKeys: [] },
      { id: "tab2", label: "Tab 2", filterKeys: [] },
      { id: "tab3", label: "Tab 3", filterKeys: [] },
    ];

    return config.map((tab, tabIdx) => {
      // Group matching sections into tab
      const matchedSections = data.sections.filter((sec) => {
        if (tab.filterKeys.length === 0) return true;
        const lowerId = sec.id.toLowerCase();
        const lowerTitle = sec.title.toLowerCase();
        return tab.filterKeys.some((k) => lowerId.includes(k) || lowerTitle.includes(k));
      });

      // Fallback distribution to ensure all products render cleanly
      const activeSecs =
        matchedSections.length > 0
          ? matchedSections
          : data.sections.filter((_, idx) => idx % config.length === tabIdx);

      return {
        id: tab.id,
        label: tab.label,
        sections: activeSecs.length > 0 ? activeSecs : data.sections,
      };
    });
  }, [data]);

  // First tab active by default
  const [activeTabId, setActiveTabId] = React.useState<string>(tabs[0]?.id || "");

  // Sync tab selection when navigating between category pages
  React.useEffect(() => {
    if (tabs.length > 0) {
      setActiveTabId(tabs[0].id);
    }
  }, [data.slug, tabs]);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground font-bold">{data.name}</span>
        </div>

        {/* Hero Banner with 3 Main Tabs INSIDE Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm min-h-[220px] md:min-h-[280px] flex items-center justify-start p-6 md:p-10 bg-card">
          <img
            src={data.bannerImage}
            alt={data.name}
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-extrabold uppercase tracking-wider border border-brand/20">
              <Sparkles className="size-3.5" /> Featured Category
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              {data.name}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              {data.description}
            </p>

            {/* Exactly 3 Main Category Tabs INSIDE Banner Box */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tabs.map((tab) => {
                const isActive = activeTab.id === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={
                      "px-4 py-2 text-xs md:text-sm font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-2 shadow-xs " +
                      (isActive
                        ? "bg-brand text-primary-foreground border-brand"
                        : "border-border bg-card/90 text-foreground hover:border-brand hover:text-brand")
                    }
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid Displayed by Active Tab */}
        <div className="space-y-12 pt-2">
          {activeTab.sections.map((section) => (
            <section
              key={section.id}
              className="space-y-4 border-b border-border/60 pb-10 last:border-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-l-4 border-brand pl-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">
                      {section.subtitle}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold text-brand uppercase tracking-wider">
                  {section.products.length} Items Available
                </span>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {section.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
