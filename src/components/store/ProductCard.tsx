import { Heart, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { inr, type Product } from "./catalog";
import { useStore } from "./store-context";

export function ProductCard({
  product,
  badgeLabel,
}: {
  product: Product;
  badgeLabel?: string;
}) {
  const { wishlist, toggleWishlist, addRecentlyViewed } = useStore();
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const saved = wishlist.includes(product.id);

  const handleClick = () => {
    addRecentlyViewed(product.id);
  };

  return (
    <article className="group flex h-full flex-col border border-border bg-card p-4 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 cursor-pointer">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        onClick={handleClick}
        className="relative mb-3 aspect-square overflow-hidden bg-muted rounded-xl block cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={640}
          height={640}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/300?fallback";
          }}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge Label (Trending / Special Offer / Discount) */}
        {badgeLabel ? (
          <span className="absolute left-2 top-2 bg-pink-600 px-2 py-0.5 text-[10px] font-black uppercase text-white rounded-md shadow-md">
            {badgeLabel}
          </span>
        ) : off > 0 ? (
          <span className="absolute left-2 top-2 bg-pink-600 px-2 py-0.5 text-[10px] font-black uppercase text-white rounded-md shadow-md">
            {off}% OFF
          </span>
        ) : null}

        {/* Wishlist ❤️ Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className="absolute right-2 top-2 bg-card/90 backdrop-blur-xs p-1.5 rounded-full text-muted-foreground hover:text-pink-600 shadow-sm transition-colors cursor-pointer"
        >
          <Heart className={"size-4 " + (saved ? "fill-pink-600 text-pink-600" : "")} />
        </button>
      </Link>

      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {product.brand}
      </p>

      <Link
        to="/product/$id"
        params={{ id: product.id }}
        onClick={handleClick}
        className="mt-1 line-clamp-2 text-xs font-semibold text-foreground group-hover:text-pink-600 transition-colors"
      >
        {product.title}
      </Link>

      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-1.5 py-0.5 font-bold text-white text-[11px]">
          {product.rating.toFixed(1)}
          <Star className="size-3 fill-current" />
        </span>
        <span className="text-muted-foreground text-[11px] font-medium">({product.reviews})</span>
      </div>

      <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-3 border-t border-border/60">
        <span className="text-sm md:text-base font-black text-foreground">{inr(product.price)}</span>
        <span className="text-xs text-muted-foreground line-through font-medium">{inr(product.mrp)}</span>
      </div>
    </article>
  );
}
