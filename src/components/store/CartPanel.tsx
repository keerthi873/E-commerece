import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { inr } from "./catalog";
import { useStore } from "./store-context";

export function CartPanel() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartCount,
    cartTotal,
    cartMrpTotal,
    setQty,
    removeFromCart,
    clearCart,
    pincode,
  } = useStore();

  const saved = cartMrpTotal - cartTotal;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart ({cartCount})</SheetTitle>
          <SheetDescription>Delivering to {pincode}</SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Add something from Deals of the Day.
            </p>
            <button
              onClick={() => setCartOpen(false)}
              className="bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {cart.map((line) => (
                <li key={line.product.id} className="flex gap-3 py-4">
                  <img
                    src={line.product.image}
                    alt={line.product.title}
                    className="size-16 shrink-0 object-contain bg-muted"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm text-foreground">{line.product.title}</p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {inr(line.product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(line.product.id, line.qty - 1)}
                        className="border border-border p-1 hover:border-brand"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm">{line.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(line.product.id, line.qty + 1)}
                        className="border border-border p-1 hover:border-brand"
                      >
                        <Plus className="size-3.5" />
                      </button>
                      <button
                        aria-label="Remove item"
                        onClick={() => removeFromCart(line.product.id)}
                        className="ml-auto p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="border-t border-border">
              <div className="w-full space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-foreground">{inr(cartTotal)}</span>
                </p>
                {saved > 0 && (
                  <p className="flex justify-between text-brand">
                    <span>You save</span>
                    <span>{inr(saved)}</span>
                  </p>
                )}
              </div>
              <Link
                to="/checkout"
                onClick={() => {
                  setCartOpen(false);
                  try {
                    if (typeof window !== "undefined") {
                      window.localStorage.removeItem("buyNowProduct");
                    }
                  } catch {}
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="w-full bg-accent px-4 py-3 text-center text-sm font-bold text-accent-foreground hover:opacity-90 block rounded-md shadow-xs cursor-pointer"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className="w-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-brand"
              >
                Clear cart
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
