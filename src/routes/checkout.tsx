import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import {
  MapPin,
  Phone,
  User,
  Home,
  Building2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Check,
} from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider, useStore, type DeliveryAddress } from "@/components/store/store-context";
import { inr } from "@/components/store/catalog";
import { handleImageError } from "@/components/store/image-fallback";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutRoute,
});

function CheckoutRoute() {
  return (
    <StoreProvider>
      <CheckoutPage />
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}

function CheckoutPage() {
  const { cart, buyNowProduct, savedAddress, setSavedAddress } = useStore();
  const navigate = useNavigate();

  const buyNowFromStorage = React.useMemo(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem("buyNowProduct") : null;
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.product) return parsed;
      if (parsed.id) return { product: parsed, qty: 1 };
      return null;
    } catch {
      return null;
    }
  }, []);

  const activeBuyNow = buyNowProduct || buyNowFromStorage;
  const checkoutItems = activeBuyNow ? [activeBuyNow] : cart;
  const checkoutCount = checkoutItems.reduce((n, l) => n + l.qty, 0);
  const checkoutSubtotal = checkoutItems.reduce((n, l) => n + l.qty * l.product.price, 0);
  const checkoutMrpTotal = checkoutItems.reduce((n, l) => n + l.qty * l.product.mrp, 0);
  const checkoutGstTotal = checkoutItems.reduce(
    (n, l) => n + Math.round((l.product.price * l.qty * (l.product.price <= 1000 ? 5 : 12)) / 100),
    0,
  );
  const checkoutDeliveryFee = checkoutSubtotal > 0 && checkoutSubtotal < 499 ? 40 : 0;
  const checkoutGrandTotal = checkoutSubtotal + checkoutGstTotal + checkoutDeliveryFee;
  const savings = checkoutMrpTotal - checkoutSubtotal;

  const [fullName, setFullName] = React.useState(savedAddress?.fullName || "");
  const [phone, setPhone] = React.useState(savedAddress?.phone || "");
  const [pincode, setPincode] = React.useState(savedAddress?.pincode || "560001");
  const [addressLine, setAddressLine] = React.useState(savedAddress?.addressLine || "");
  const [city, setCity] = React.useState(savedAddress?.city || "Bengaluru");
  const [state, setState] = React.useState(savedAddress?.state || "Karnataka");
  const [landmark, setLandmark] = React.useState(savedAddress?.landmark || "");
  const [addressType, setAddressType] = React.useState<"home" | "work">(
    savedAddress?.addressType || "home",
  );

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!phone.trim() || phone.trim().length < 10)
      errs.phone = "Enter a valid 10-digit phone number";
    if (!pincode.trim() || pincode.trim().length < 6)
      errs.pincode = "Enter a valid 6-digit pincode";
    if (!addressLine.trim()) errs.addressLine = "House No, Street, Locality is required";
    if (!city.trim()) errs.city = "City is required";
    if (!state.trim()) errs.state = "State is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    const addr: DeliveryAddress = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      state: state.trim(),
      landmark: landmark.trim(),
      addressType,
    };

    setSavedAddress(addr);
    toast.success("Address saved", { description: `Delivering to ${city}, ${pincode}` });
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate({ to: "/payment" });
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main className="mx-auto max-w-[1400px] px-4 py-16 text-center space-y-4">
          <ShoppingBag className="mx-auto size-16 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">
            Add items to cart or click Buy Now before proceeding to checkout.
          </p>
          <Link
            to="/"
            className="inline-block bg-brand px-6 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Return to Store
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        {/* Step Indicator Header */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <h1 className="text-xl font-bold text-foreground">Checkout</h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="size-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              Address
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="size-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
                2
              </span>
              Payment
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="size-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
                3
              </span>
              Confirmation
            </span>
          </div>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Address Form Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-border bg-card p-5 sm:p-6 space-y-4 rounded-xl shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <MapPin className="size-5 text-brand" /> 1. Delivery Address
                </h2>
                {savedAddress && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <Check className="size-3" /> Address Saved
                  </span>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full bg-background border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-brand rounded-md ${
                        errors.fullName ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    10-Digit Mobile Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className={`w-full bg-background border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-brand rounded-md ${
                        errors.phone ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Pincode <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 560001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    className={`w-full bg-background border px-3 py-2 text-sm text-foreground outline-none focus:border-brand rounded-md ${
                      errors.pincode ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-[11px] text-destructive mt-1">{errors.pincode}</p>
                  )}
                </div>

                {/* Flat / House No / Street */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Flat, House No., Building, Street, Locality{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Flat 402, Sunshine Apartments, 5th Main, Indiranagar"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className={`w-full bg-background border px-3 py-2 text-sm text-foreground outline-none focus:border-brand resize-none rounded-md ${
                      errors.addressLine ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.addressLine && (
                    <p className="text-[11px] text-destructive mt-1">{errors.addressLine}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    City / District <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full bg-background border px-3 py-2 text-sm text-foreground outline-none focus:border-brand rounded-md ${
                      errors.city ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[11px] text-destructive mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    State <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Karnataka"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`w-full bg-background border px-3 py-2 text-sm text-foreground outline-none focus:border-brand rounded-md ${
                      errors.state ? "border-destructive" : "border-border"
                    }`}
                  />
                  {errors.state && (
                    <p className="text-[11px] text-destructive mt-1">{errors.state}</p>
                  )}
                </div>

                {/* Landmark (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Metro Station / Behind Axis Bank"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-brand rounded-md"
                  />
                </div>

                {/* Address Type */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground mb-2">
                    Address Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        checked={addressType === "home"}
                        onChange={() => setAddressType("home")}
                        className="accent-brand"
                      />
                      <Home className="size-4 text-muted-foreground" /> Home (All-day delivery)
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="addressType"
                        checked={addressType === "work"}
                        onChange={() => setAddressType("work")}
                        className="accent-brand"
                      />
                      <Building2 className="size-4 text-muted-foreground" /> Work (Delivery 10 AM -
                      6 PM)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Promise */}
            <div className="border border-border bg-card p-4 rounded-xl flex items-center gap-3 text-xs text-muted-foreground shadow-xs">
              <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
              <span>
                Guaranteed delivery by <strong>4 days</strong> with free live order tracking and
                hassle-free returns.
              </span>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-border bg-card p-5 space-y-4 rounded-xl shadow-xs">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <ShoppingBag className="size-5 text-brand" /> 2. Order Summary ({checkoutCount} item
                {checkoutCount > 1 ? "s" : ""})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-border max-h-64 overflow-y-auto pr-1">
                {checkoutItems.map((line) => (
                  <div key={line.product.id} className="py-3 flex items-center gap-3">
                    <img
                      src={line.product.image}
                      alt={line.product.title}
                      onError={(e) => handleImageError(e, line.product.category)}
                      className="size-14 object-contain bg-muted p-1 rounded-md shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-semibold text-foreground line-clamp-1">
                        {line.product.title}
                      </p>
                      <p className="text-muted-foreground mt-0.5">Qty: {line.qty}</p>
                      <p className="font-bold text-foreground mt-0.5">
                        {inr(line.product.price * line.qty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation with GST */}
              <div className="border-t border-border pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Item Subtotal ({checkoutCount} items)</span>
                  <span className="font-semibold text-foreground">{inr(checkoutSubtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST & Applicable Taxes</span>
                  <span className="font-semibold text-brand">+{inr(checkoutGstTotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{inr(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charges</span>
                  {checkoutDeliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold text-foreground">
                      {inr(checkoutDeliveryFee)}
                    </span>
                  )}
                </div>

                <div className="border-t border-dashed border-border pt-3 flex justify-between font-bold text-base text-foreground">
                  <span>Amount Payable</span>
                  <span className="text-brand text-lg">{inr(checkoutGrandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent px-4 py-3.5 text-center text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90 flex items-center justify-center gap-2 mt-2 cursor-pointer rounded-md shadow-xs"
              >
                Continue to Payment <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
