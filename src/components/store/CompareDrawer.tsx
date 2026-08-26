import * as React from "react";
import { X, SlidersHorizontal, Trash2, CheckCircle2, Zap } from "lucide-react";
import { Product, inr } from "./catalog";
import { useStore, getGstRate } from "./store-context";
import { useNavigate } from "@tanstack/react-router";

export function CompareDrawer({
  compareItems,
  onRemoveItem,
  onClearAll,
  open,
  onOpenChange,
}: {
  compareItems: Product[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addToCart, buyNow } = useStore();
  const navigate = useNavigate();

  if (!open || compareItems.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-card border border-border p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand/10 text-brand">
              <SlidersHorizontal className="size-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-foreground text-xl">Product Comparison Studio</h3>
              <p className="text-xs text-muted-foreground">Side-by-side spec & price breakdown ({compareItems.length}/3 products)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="size-3.5" /> Clear All
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-xs font-extrabold text-muted-foreground uppercase w-1/4">Feature</th>
                {compareItems.map((p) => (
                  <th key={p.id} className="p-3 w-1/4 align-top">
                    <div className="relative space-y-2 text-center p-2 rounded-xl bg-muted/40 border border-border">
                      <button
                        onClick={() => onRemoveItem(p.id)}
                        className="absolute right-1 top-1 text-muted-foreground hover:text-rose-500 p-1"
                      >
                        <X className="size-3.5" />
                      </button>
                      <img src={p.image} alt={p.title} className="size-24 object-contain mx-auto" />
                      <p className="text-xs font-bold text-foreground line-clamp-2">{p.title}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs font-medium">
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">Price</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 font-black text-brand text-base text-center">
                    {inr(p.price)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">MRP</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-muted-foreground line-through text-center">
                    {inr(p.mrp)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">Brand</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 font-bold text-foreground text-center">
                    {p.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">Rating</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand text-primary-foreground font-bold">
                      ★ {p.rating.toFixed(1)}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">GST Rate</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center font-semibold text-foreground">
                    {getGstRate(p.price)}% GST
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">Delivery</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="size-3.5 inline mr-1" /> Free Delivery
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-muted-foreground uppercase">Action</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <button
                      onClick={() => {
                        addToCart(p);
                        onOpenChange(false);
                      }}
                      className="w-full py-2 px-3 bg-brand text-primary-foreground font-bold rounded-xl text-xs hover:bg-brand-deep cursor-pointer transition-all"
                    >
                      Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
