import * as React from "react";

export const DEFAULT_FALLBACK_IMAGES: Record<string, string> = {
  Mobiles: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  Fashion: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  Electronics: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  Beauty: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
  Home: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
  Appliances: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  Toys: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80",
  Grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  Sports: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=600&q=80",
  Books: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  Default: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
};

export function getFallbackImage(category?: string): string {
  if (!category) return DEFAULT_FALLBACK_IMAGES.Default;
  const key = Object.keys(DEFAULT_FALLBACK_IMAGES).find((k) =>
    category.toLowerCase().includes(k.toLowerCase())
  );
  return key ? DEFAULT_FALLBACK_IMAGES[key] : DEFAULT_FALLBACK_IMAGES.Default;
}

export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category?: string
) {
  const target = e.currentTarget;
  const fallback = getFallbackImage(category);
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
