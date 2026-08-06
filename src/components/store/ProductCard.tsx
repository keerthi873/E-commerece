import { Star } from "lucide-react";

export type Product = {
  image: string;
  title: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: string;
};

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <article className="group flex h-full flex-col border border-border bg-card p-4 transition-shadow hover:shadow-[0_2px_14px_rgba(0,0,0,0.12)]">
      <div className="mb-3 aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={640}
          height={640}
          className="size-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {product.brand}
      </p>
      <h3 className="mt-0.5 line-clamp-2 text-sm text-foreground">{product.title}</h3>

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
    </article>
  );
}
