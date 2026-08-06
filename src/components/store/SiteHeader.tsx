import * as React from "react";
import {
  ChevronDown,
  LogOut,
  MapPin,
  Search,
  ShoppingCart,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "./catalog";
import { LoginDialog } from "./LoginDialog";
import { useStore } from "./store-context";

export function SiteHeader() {
  const {
    query,
    setQuery,
    category,
    setCategory,
    cartCount,
    setCartOpen,
    user,
    signOut,
    pincode,
    setPincode,
    wishlist,
  } = useStore();

  const [loginOpen, setLoginOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(query);

  React.useEffect(() => setDraft(query), [query]);

  return (
    <header className="sticky top-0 z-30">
      <div className="bg-brand text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-4 py-2.5">
          <a href="/" className="flex items-baseline gap-1.5">
            <span className="rounded-sm bg-accent px-2 py-0.5 text-lg font-black italic tracking-tight text-accent-foreground">
              Kartly
            </span>
            <span className="hidden text-[11px] italic opacity-80 sm:inline">Explore Plus</span>
          </a>

          <form
            className="order-3 flex min-w-0 flex-1 items-center gap-2 rounded-sm bg-card px-3 py-2 md:order-none"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(draft);
              document
                .getElementById("deals")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="search"
              aria-label="Search for products, brands and more"
              placeholder="Search for products, brands and more"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setQuery(e.target.value);
              }}
              className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </form>

          <nav className="flex items-center gap-5 text-sm font-medium">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 transition-colors hover:bg-brand-deep">
                  <UserRound className="size-4" />
                  {user}
                  <ChevronDown className="size-3.5 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => toast("No orders yet")}>
                    My orders
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      toast(`Wishlist: ${wishlist.length} item(s)`, {
                        description: "Tap the heart on any product to save it.",
                      })
                    }
                  >
                    Wishlist ({wishlist.length})
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 transition-colors hover:bg-brand-deep"
              >
                <UserRound className="size-4" />
                Login
                <ChevronDown className="size-3.5 opacity-70" />
              </button>
            )}

            <button
              onClick={() =>
                toast("Seller onboarding", {
                  description: "Kartly Seller Hub opens for new partners next week.",
                })
              }
              className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 sm:flex"
            >
              <Store className="size-4" />
              Become a Seller
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <ShoppingCart className="size-4" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 min-w-4 rounded-full bg-accent px-1 text-[10px] font-bold leading-4 text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          <p className="order-4 flex w-full items-center gap-1.5 text-xs md:order-none md:w-auto">
            <MapPin className="size-3.5 text-accent" />
            Deliver to
            <input
              aria-label="Delivery pincode"
              inputMode="numeric"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              className="w-14 bg-transparent font-semibold underline decoration-dotted outline-none"
            />
          </p>
        </div>
      </div>

      <div className="border-b border-border bg-card">
        <ul className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 text-sm font-medium text-foreground/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => setCategory(c)}
                aria-current={category === c ? "true" : undefined}
                className={
                  "whitespace-nowrap border-b-2 px-3.5 py-3 transition-colors " +
                  (category === c
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

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}
