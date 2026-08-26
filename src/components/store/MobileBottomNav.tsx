import * as React from "react";
import { Home, Grid, Heart, ShoppingBag, UserRound } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { useStore } from "./store-context";

export function MobileBottomNav() {
  const { cartCount, wishlist, user } = useStore();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isWishlist = location.pathname === "/wishlist";
  const isCart = location.pathname === "/cart" || location.pathname === "/checkout";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl px-2 py-2">
      <div className="grid grid-cols-5 gap-1 text-center">
        {/* Home */}
        <Link
          to="/"
          className={
            "flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-extrabold uppercase transition-colors " +
            (isHome ? "text-pink-600 dark:text-pink-400" : "text-muted-foreground hover:text-foreground")
          }
        >
          <Home className="size-5" />
          <span>Home</span>
        </Link>

        {/* Categories */}
        <a
          href="#categories-section"
          className="flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-extrabold uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Grid className="size-5" />
          <span>Categories</span>
        </a>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className={
            "relative flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-extrabold uppercase transition-colors " +
            (isWishlist ? "text-pink-600 dark:text-pink-400" : "text-muted-foreground hover:text-foreground")
          }
        >
          <Heart className="size-5" />
          <span>Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-2 size-4 rounded-full bg-pink-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <button
          onClick={() => {
            const el = document.getElementById("cart-panel-trigger");
            if (el) el.click();
            else window.location.href = "/checkout";
          }}
          className={
            "relative flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-extrabold uppercase transition-colors " +
            (isCart ? "text-pink-600 dark:text-pink-400" : "text-muted-foreground hover:text-foreground")
          }
        >
          <ShoppingBag className="size-5" />
          <span>Bag</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 size-4 rounded-full bg-brand text-primary-foreground text-[9px] font-black flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <a
          href="/orders"
          className="flex flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-extrabold uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <UserRound className="size-5" />
          <span>{user ? "Account" : "Profile"}</span>
        </a>
      </div>
    </nav>
  );
}
