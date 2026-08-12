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
  const { addToCart, wishlist, toggleWishlist, addRecentlyViewed } = useStore();
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const saved = wishlist.includes(product.id);

  const handleClick = () => {
    addRecentlyViewed(product.id);
  };

  return (
    <article className="group flex h-full flex-col border border-border bg-card p-4 transition-shadow hover:shadow-[0_2px_14px_rgba(0,0,0,0.12)]">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        onClick={handleClick}
        className="relative mb-3 aspect-square overflow-hidden bg-muted block cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={640}
          height={640}
          className="size-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />

        {/* Small label (Trending / Recommended / Badge) */}
        {badgeLabel && (
          <span className="absolute left-1 top-1 bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
            {badgeLabel}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className="absolute right-1 top-1 bg-card/90 p-1.5 text-muted-foreground hover:text-brand"
        >
          <Heart className={"size-4 " + (saved ? "fill-brand text-brand" : "")} />
        </button>
      </Link>

      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {product.brand}
      </p>

      <Link
        to="/product/$id"
        params={{ id: product.id }}
        onClick={handleClick}
        className="mt-0.5 line-clamp-2 text-sm text-foreground hover:text-brand transition-colors"
      >
        {product.title}
      </Link>

      <p className="mt-2 flex items-center gap-1.5 text-xs">
        <span className="inline-flex items-center gap-1 rounded-sm bg-brand px-1.5 py-0.5 font-semibold text-primary-foreground">
          {product.rating.toFixed(1)}
          <Star className="size-3 fill-current" />
        </span>
        <span className="text-muted-foreground">({product.reviews})</span>
      </p>

      <p className="mt-auto flex flex-wrap items-baseline gap-2 pt-3">
        <span className="text-base font-bold text-foreground">{inr(product.price)}</span>
        <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>
        <span className="text-xs font-semibold text-brand">{off}% off</span>
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-accent px-3 py-2 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Add to cart
      </button>
    </article>
  );
}
