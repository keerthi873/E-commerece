import * as React from "react";
import { Sparkles, ShoppingCart, Check, RefreshCw } from "lucide-react";
import { inr, type Product } from "./catalog";
import { useStore } from "./store-context";
import { categoryPagesData } from "@/data/categoryData";
import { toast } from "sonner";

export function OutfitBuilder() {
  const { addToCart } = useStore();

  const fashionSections = categoryPagesData.fashion.sections;

  const tops = React.useMemo(
    () => fashionSections.find((s) => s.id === "men-casual-wear")?.products || [],
    [fashionSections]
  );
  const bottoms = React.useMemo(
    () => fashionSections.find((s) => s.id === "men-casual-wear")?.products.slice().reverse() || [],
    [fashionSections]
  );
  const shoes = React.useMemo(
    () => fashionSections.find((s) => s.id === "men-footwear")?.products || [],
    [fashionSections]
  );

  const [selectedTop, setSelectedTop] = React.useState<Product>(tops[0]);
  const [selectedBottom, setSelectedBottom] = React.useState<Product>(bottoms[0] || tops[1]);
  const [selectedShoe, setSelectedShoe] = React.useState<Product>(shoes[0] || tops[0]);

  const totalPrice = (selectedTop?.price || 0) + (selectedBottom?.price || 0) + (selectedShoe?.price || 0);

  const handleAddOutfit = () => {
    if (selectedTop) addToCart(selectedTop);
    if (selectedBottom) addToCart(selectedBottom);
    if (selectedShoe) addToCart(selectedShoe);
    toast.success("Complete Outfit Added!", {
      description: "Added Top, Bottom & Footwear bundle to cart.",
    });
  };

  return (
    <section className="my-8 rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-extrabold uppercase tracking-wider border border-brand/20">
            <Sparkles className="size-3.5" /> Interactive Outfit Studio
          </span>
          <h2 className="text-2xl font-black tracking-tight text-foreground mt-1">
            Build Your Outfit
          </h2>
          <p className="text-xs text-muted-foreground font-medium">
            Mix & match Topwear, Bottomwear & Shoes to preview complete styles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-muted-foreground font-semibold block">Bundle Price</span>
            <span className="text-2xl font-black text-brand">{inr(totalPrice)}</span>
          </div>
          <button
            onClick={handleAddOutfit}
            className="px-5 py-2.5 bg-brand text-primary-foreground font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md hover:bg-brand-deep transition-all"
          >
            <ShoppingCart className="size-4" /> Add Outfit to Cart
          </button>
        </div>
      </div>

      {/* 3 Columns Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Topwear Selection */}
        <div className="space-y-3 p-4 rounded-2xl bg-muted/40 border border-border">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
            1. Topwear
          </span>
          <div className="aspect-square rounded-xl bg-card border border-border overflow-hidden p-3 flex items-center justify-center">
            {selectedTop && (
              <img
                src={selectedTop.image}
                alt={selectedTop.title}
                className="size-full object-contain"
              />
            )}
          </div>
          <p className="text-xs font-bold text-foreground line-clamp-1">
            {selectedTop?.title}
          </p>
          <span className="text-sm font-black text-brand">{inr(selectedTop?.price || 0)}</span>
          <div className="flex gap-2 pt-1 overflow-x-auto">
            {tops.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTop(item)}
                className={
                  "size-12 rounded-lg border overflow-hidden shrink-0 cursor-pointer " +
                  (selectedTop?.id === item.id ? "border-brand ring-2 ring-brand/20" : "border-border opacity-70")
                }
              >
                <img src={item.image} alt="" className="size-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottomwear Selection */}
        <div className="space-y-3 p-4 rounded-2xl bg-muted/40 border border-border">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
            2. Bottomwear
          </span>
          <div className="aspect-square rounded-xl bg-card border border-border overflow-hidden p-3 flex items-center justify-center">
            {selectedBottom && (
              <img
                src={selectedBottom.image}
                alt={selectedBottom.title}
                className="size-full object-contain"
              />
            )}
          </div>
          <p className="text-xs font-bold text-foreground line-clamp-1">
            {selectedBottom?.title}
          </p>
          <span className="text-sm font-black text-brand">{inr(selectedBottom?.price || 0)}</span>
          <div className="flex gap-2 pt-1 overflow-x-auto">
            {bottoms.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedBottom(item)}
                className={
                  "size-12 rounded-lg border overflow-hidden shrink-0 cursor-pointer " +
                  (selectedBottom?.id === item.id ? "border-brand ring-2 ring-brand/20" : "border-border opacity-70")
                }
              >
                <img src={item.image} alt="" className="size-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Footwear Selection */}
        <div className="space-y-3 p-4 rounded-2xl bg-muted/40 border border-border">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
            3. Footwear
          </span>
          <div className="aspect-square rounded-xl bg-card border border-border overflow-hidden p-3 flex items-center justify-center">
            {selectedShoe && (
              <img
                src={selectedShoe.image}
                alt={selectedShoe.title}
                className="size-full object-contain"
              />
            )}
          </div>
          <p className="text-xs font-bold text-foreground line-clamp-1">
            {selectedShoe?.title}
          </p>
          <span className="text-sm font-black text-brand">{inr(selectedShoe?.price || 0)}</span>
          <div className="flex gap-2 pt-1 overflow-x-auto">
            {shoes.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedShoe(item)}
                className={
                  "size-12 rounded-lg border overflow-hidden shrink-0 cursor-pointer " +
                  (selectedShoe?.id === item.id ? "border-brand ring-2 ring-brand/20" : "border-border opacity-70")
                }
              >
                <img src={item.image} alt="" className="size-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
