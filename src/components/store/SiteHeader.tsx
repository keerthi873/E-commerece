import {
  ChevronDown,
  MapPin,
  Search,
  ShoppingCart,
  Store,
  UserRound,
} from "lucide-react";

const categories = [
  "For You",
  "Fashion",
  "Mobiles",
  "Electronics",
  "Beauty",
  "Home",
  "Appliances",
  "Toys & Baby",
  "Grocery",
  "Sports",
  "Furniture",
  "Books",
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30">
      <div className="bg-brand text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-2.5">
          <a href="/" className="flex items-baseline gap-1.5">
            <span className="rounded-sm bg-accent px-2 py-0.5 text-lg font-black italic tracking-tight text-accent-foreground">
              Kartly
            </span>
            <span className="hidden text-[11px] italic opacity-80 sm:inline">
              Explore Plus
            </span>
          </a>

          <form
            className="order-3 flex min-w-0 flex-1 items-center gap-2 rounded-sm bg-card px-3 py-2 md:order-none"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search for products, brands and more"
              placeholder="Search for products, brands and more"
              className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </form>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <button className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 transition-colors hover:bg-brand-deep">
              <UserRound className="size-4" />
              Login
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
            <button className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 sm:flex">
              <Store className="size-4" />
              Become a Seller
            </button>
            <button className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
              <ShoppingCart className="size-4" />
              Cart
            </button>
          </nav>

          <p className="order-4 flex w-full items-center gap-1.5 text-xs md:order-none md:w-auto">
            <MapPin className="size-3.5 text-accent" />
            Deliver to
            <span className="font-semibold underline decoration-dotted">560001</span>
          </p>
        </div>
      </div>

      <div className="border-b border-border bg-card">
        <ul className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 text-sm font-medium text-foreground/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c, i) => (
            <li key={c}>
              <button
                className={
                  "whitespace-nowrap border-b-2 px-3.5 py-3 transition-colors " +
                  (i === 0
                    ? "border-brand font-bold text-brand"
                    : "border-transparent hover:border-accent hover:text-foreground")
                }
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
