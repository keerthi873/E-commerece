import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Receipt,
} from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider, useStore, getGstBreakdown } from "@/components/store/store-context";
import { inr } from "@/components/store/catalog";
import { handleImageError } from "@/components/store/image-fallback";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartRoute,
});

function CartRoute() {
  return (
    <StoreProvider>
      <CartPage />
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}

function CartPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartGstTotal,
    deliveryFee,
    cartMrpTotal,
    setQty,
    removeFromCart,
    clearCart,
  } = useStore();

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);
  const [appliedCoupon, setAppliedCoupon] = React.useState("");

  const handleProceedToCheckout = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("buyNowProduct");
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate({ to: "/checkout" });
  };

  const totalBeforeCoupon = cartSubtotal + cartGstTotal + deliveryFee;
  const finalTotal = Math.max(0, totalBeforeCoupon - discount);
  const totalSavings = cartMrpTotal - cartSubtotal + discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "KARTLY10" || code === "SAVE10" || code === "WELCOME10") {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscount(disc);
      setAppliedCoupon(code);
      toast.success("Coupon Applied!", { description: `Saved extra ${inr(disc)} with ${code}` });
    } else {
      toast.error("Invalid Coupon", { description: "Try using code KARTLY10" });
    }
  };

  const safeCartItems = React.useMemo(() => {
    try {
      if (!cart || !Array.isArray(cart)) return [];
      return cart.filter((item) => item && item.product && typeof item.product.price === "number");
    } catch {
      return [];
    }
  }, [cart]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-xs text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-foreground">Shopping Cart</span>
        </div>

        <div className="flex items-center justify-between border-b-2 border-brand pb-3 mb-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-6 text-brand" />
            <h1 className="text-xl font-bold text-foreground">My Shopping Cart ({cartCount})</h1>
          </div>
          {safeCartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-destructive underline cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {safeCartItems.length === 0 ? (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="mx-auto size-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="size-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground">
              Looks like you haven't added anything to your cart yet. Explore our top categories and
              deals!
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-brand px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 mt-2"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-border bg-card divide-y divide-border rounded-xl shadow-xs overflow-hidden">
                {safeCartItems.map((line) => {
                  const safeGstBreakdown = (price: number, qty: number) => {
                    try {
                      if (typeof getGstBreakdown === "function") {
                        return getGstBreakdown(price, qty);
                      }
                    } catch {}
                    const safePrice = price || 0;
                    const safeQty = qty || 1;
                    const rate = safePrice <= 1000 ? 5 : 12;
                    const gstAmount = Math.round((safePrice * safeQty * rate) / 100);
                    const itemPrice = safePrice * safeQty;
                    const totalPrice = itemPrice + gstAmount;
                    return { rate, gstAmount, itemPrice, totalPrice };
                  };

                  const gst = safeGstBreakdown(line.product.price, line.qty);
                  const itemSavings = (line.product.mrp - line.product.price) * line.qty;

                  return (
                    <article
                      key={line.product.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                    >
                      <Link to="/product/$id" params={{ id: line.product.id }} className="shrink-0">
                        <img
                          src={line.product.image}
                          alt={line.product.title}
                          onError={(e) => handleImageError(e, line.product.category)}
                          className="size-24 sm:size-28 object-contain bg-muted p-2 rounded-md mx-auto"
                        />
                      </Link>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              {line.product.brand}
                            </p>
                            <span className="text-[11px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                              GST {gst.rate}% (₹{gst.gstAmount})
                            </span>
                          </div>

                          <Link
                            to="/product/$id"
                            params={{ id: line.product.id }}
                            className="font-medium text-sm text-foreground hover:text-brand line-clamp-2 mt-0.5"
                          >
                            {line.product.title}
                          </Link>

                          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                            <Truck className="size-3" /> In Stock · Free Delivery
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 border border-border bg-background p-1 rounded-md">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => setQty(line.product.id, line.qty - 1)}
                              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold">
                              {line.qty}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => setQty(line.product.id, line.qty + 1)}
                              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>

                          {/* Price & GST Breakdown */}
                          <div className="text-right">
                            <div className="flex items-baseline gap-2 justify-end">
                              <span className="text-base font-bold text-foreground">
                                {inr(gst.totalPrice)}
                              </span>
                              <span className="text-xs text-muted-foreground line-through">
                                {inr(line.product.mrp * line.qty)}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              Base: {inr(gst.itemPrice)} + GST ({gst.rate}%): {inr(gst.gstAmount)}
                            </p>
                            {itemSavings > 0 && (
                              <p className="text-[11px] font-semibold text-emerald-600">
                                Save {inr(itemSavings)}
                              </p>
                            )}
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(line.product.id)}
                            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="size-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Security badge banner */}
              <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-3 text-xs text-muted-foreground shadow-xs">
                <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
                <span>
                  Safe and Secure Payments. Easy returns and 100% Buyer Protection on all orders.
                </span>
              </div>
            </div>

            {/* Price Details Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {/* Coupon section */}
              <div className="border border-border bg-card p-4 rounded-xl shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="size-4 text-brand" />
                  <h3 className="text-sm font-bold text-foreground">Apply Coupon</h3>
                </div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. KARTLY10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-background border border-border px-3 py-1.5 text-xs text-foreground uppercase outline-none focus:border-brand rounded-md"
                  />
                  <button
                    type="submit"
                    className="bg-brand text-primary-foreground px-3.5 py-1.5 text-xs font-bold hover:opacity-90 rounded-md cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <p className="text-xs font-semibold text-emerald-600 mt-2">
                    ✓ Coupon "{appliedCoupon}" applied ({inr(discount)} OFF)
                  </p>
                )}
              </div>

              {/* Bill Summary Box (Swiggy/Flipkart Style) */}
              <div className="border border-border bg-card p-5 space-y-4 rounded-xl shadow-xs">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <Receipt className="size-4 text-brand" />
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                    Bill Summary
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Item Subtotal ({cartCount} items)</span>
                    <span className="font-semibold">{inr(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST & Applicable Taxes</span>
                    <span className="font-semibold text-brand">+{inr(cartGstTotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      <span className="font-semibold">{inr(deliveryFee)}</span>
                    )}
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Coupon Discount</span>
                      <span className="font-semibold">-{inr(discount)}</span>
                    </div>
                  )}

                  <div className="border-t border-dashed border-border pt-3 flex justify-between font-bold text-base text-foreground">
                    <span>Total Amount Payable</span>
                    <span className="text-lg text-brand">{inr(finalTotal)}</span>
                  </div>
                </div>

                {totalSavings > 0 && (
                  <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold p-2.5 rounded-md text-center border border-emerald-200">
                    🎉 Total Savings: {inr(totalSavings)} on this order
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full bg-accent px-4 py-3.5 text-center text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90 flex items-center justify-center gap-2 mt-4 rounded-md shadow-xs cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
