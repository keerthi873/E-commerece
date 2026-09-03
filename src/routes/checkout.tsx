import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  CreditCard,
  MapPin,
  Plus,
  ShieldCheck,
  Smartphone,
  Truck,
  Building2,
  Calendar,
  Package,
  ShoppingBag,
} from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider, useStore } from "@/components/store/store-context";
import { inr } from "@/components/store/catalog";
import type { Address, PaymentDetails, PaymentMethodType } from "@/components/store/types";

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
  const {
    user,
    cart,
    cartCount,
    cartTotal,
    cartMrpTotal,
    appliedCoupon,
    couponDiscountAmount,
    addresses,
    addAddress,
    placeOrder,
    openAuthModal,
    pincode,
  } = useStore();

  const navigate = useNavigate();

  // Redirect if guest
  React.useEffect(() => {
    if (!user || !user.isAuth) {
      openAuthModal("Please sign in to access checkout.");
    }
  }, [user, openAuthModal]);

  const [activeStep, setActiveStep] = React.useState<1 | 2 | 3 | 4>(2);
  const [selectedAddrId, setSelectedAddrId] = React.useState<string>(
    addresses[0]?.id || "addr-1"
  );
  const [showAddAddressForm, setShowAddAddressForm] = React.useState(false);

  // New Address Form State
  const [newAddr, setNewAddr] = React.useState({
    name: user?.name || "Kartly Customer",
    phone: user?.phone || "9999999999",
    house: "",
    street: "",
    city: "Hyderabad",
    state: "Telangana",
    pincode: pincode || "500034",
    type: "home" as "home" | "work" | "other",
  });

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethodType>("upi");
  const [upiProvider, setUpiProvider] = React.useState("PhonePe");
  const [upiIdInput, setUpiIdInput] = React.useState("");
  const [cardFields, setCardFields] = React.useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [selectedBank, setSelectedBank] = React.useState("HDFC Bank");
  const [emiTenure, setEmiTenure] = React.useState(3);

  const deliveryCharge = cartTotal > 500 ? 0 : 40;
  const finalPayable = cartTotal - couponDiscountAmount + deliveryCharge;
  const totalSavings = cartMrpTotal - cartTotal + couponDiscountAmount;

  const selectedAddressObj =
    addresses.find((a) => a.id === selectedAddrId) || addresses[0] || {
      id: "addr-1",
      name: user?.name || "Kartly User",
      phone: "9999999999",
      house: "Flat 402",
      street: "Road No. 12",
      city: "Hyderabad",
      state: "Telangana",
      pincode: pincode || "500034",
      type: "home",
    };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.house || !newAddr.street || !newAddr.pincode) return;
    addAddress(newAddr);
    setShowAddAddressForm(false);
  };

  const handleConfirmOrder = () => {
    const paymentDetails: PaymentDetails = {
      method: paymentMethod,
      providerName:
        paymentMethod === "upi"
          ? upiProvider
          : paymentMethod === "netbanking"
          ? selectedBank
          : paymentMethod === "emi"
          ? "HDFC Credit Card EMI"
          : paymentMethod === "card"
          ? "Visa Debit Card"
          : "Cash on Delivery",
      upiId: upiIdInput || "demo@ybl",
      cardNumberMasked: cardFields.number ? `•••• ${cardFields.number.slice(-4)}` : "•••• 4242",
      emiTenureMonths: emiTenure,
      emiMonthlyAmount: Math.round(finalPayable / emiTenure),
    };

    const newOrder = placeOrder(paymentDetails, selectedAddrId);
    if (newOrder) {
      navigate({ to: "/orders/$id", params: { id: newOrder.id } });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main className="mx-auto max-w-[1400px] px-4 py-16 text-center space-y-4">
          <ShoppingBag className="mx-auto size-16 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">
            Add items to cart before proceeding to checkout.
          </p>
          <Link
            to="/"
            className="inline-block bg-brand px-6 py-2.5 text-sm font-bold text-primary-foreground rounded-md shadow-xs"
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

      <main className="mx-auto max-w-[1300px] px-4 py-6 space-y-6">
        {/* Checkout Header Progress Bar */}
        <div className="rounded-lg border border-border bg-card p-4 shadow-2xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-bold">
            <div className="flex items-center gap-2 text-brand">
              <span className="flex size-6 items-center justify-center rounded-full bg-brand text-primary-foreground font-extrabold text-[11px]">
                1
              </span>
              <span>Account</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground opacity-50" />
            <div className={`flex items-center gap-2 ${activeStep >= 2 ? "text-brand" : "text-muted-foreground"}`}>
              <span className={`flex size-6 items-center justify-center rounded-full font-extrabold text-[11px] ${activeStep >= 2 ? "bg-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                2
              </span>
              <span>Delivery Address</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground opacity-50" />
            <div className={`flex items-center gap-2 ${activeStep >= 3 ? "text-brand" : "text-muted-foreground"}`}>
              <span className={`flex size-6 items-center justify-center rounded-full font-extrabold text-[11px] ${activeStep >= 3 ? "bg-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                3
              </span>
              <span>Order Summary</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground opacity-50" />
            <div className={`flex items-center gap-2 ${activeStep >= 4 ? "text-brand" : "text-muted-foreground"}`}>
              <span className={`flex size-6 items-center justify-center rounded-full font-extrabold text-[11px] ${activeStep >= 4 ? "bg-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                4
              </span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
          {/* Main Steps Accordion Container */}
          <div className="lg:col-span-2 space-y-4">
            {/* Step 1: Logged In Account Info */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
                    <Check className="size-3 stroke-[3]" />
                  </span>
                  <span>1. Logged In User</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {user?.name} ({user?.phone})
                </span>
              </div>
            </div>

            {/* Step 2: Delivery Address Selection */}
            <div className="rounded-lg border border-border bg-card p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                  <MapPin className="size-4 text-brand" />
                  2. Select Delivery Address
                </h2>
                <button
                  onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                  className="flex items-center gap-1 text-xs font-bold text-brand hover:underline cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  Add New Address
                </button>
              </div>

              {/* Add New Address Form Modal/Panel */}
              {showAddAddressForm && (
                <form onSubmit={handleSaveAddress} className="rounded-lg border border-brand/30 bg-brand/5 p-4 space-y-3">
                  <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                    Add New Delivery Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.name}
                        onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                        className="w-full rounded border border-border bg-background p-2 text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        className="w-full rounded border border-border bg-background p-2 text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                        Flat / House No. / Building
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flat 402, Green Valley Apartments"
                        value={newAddr.house}
                        onChange={(e) => setNewAddr({ ...newAddr, house: e.target.value })}
                        className="w-full rounded border border-border bg-background p-2 text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                        Street Address / Locality
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Road No. 12, Jubilee Hills"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        className="w-full rounded border border-border bg-background p-2 text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full rounded border border-border bg-background p-2 text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        className="w-full rounded border border-border bg-background p-2 text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="submit"
                      className="rounded bg-brand px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-brand-deep cursor-pointer"
                    >
                      Save & Use Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      className="rounded border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Address Cards */}
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddrId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddrId(addr.id);
                        setActiveStep(3);
                      }}
                      className={`relative flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? "border-brand bg-brand/5 ring-1 ring-brand"
                          : "border-border bg-card hover:border-brand/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryAddress"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedAddrId(addr.id);
                          setActiveStep(3);
                        }}
                        className="mt-1 size-4 text-brand accent-brand cursor-pointer"
                      />
                      <div className="flex-1 text-xs space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-foreground">{addr.name}</span>
                          <span className="uppercase text-[10px] font-bold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-brand bg-brand/10 px-1.5 py-0.5 rounded">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-foreground/90 font-medium">
                          {addr.house}, {addr.street}
                        </p>
                        <p className="text-muted-foreground">
                          {addr.city}, {addr.state} - <strong className="text-foreground">{addr.pincode}</strong>
                        </p>
                        <p className="text-muted-foreground">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Order Summary & Review */}
            <div className="rounded-lg border border-border bg-card p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                  <Package className="size-4 text-brand" />
                  3. Order Items ({cartCount})
                </h2>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Truck className="size-3.5" />
                  Estimated Delivery in 3 Days
                </span>
              </div>

              <div className="divide-y divide-border max-h-60 overflow-y-auto pr-1">
                {cart.map((line) => (
                  <div key={line.product.id} className="flex items-center gap-3 py-2.5 text-xs">
                    <img
                      src={line.product.image}
                      alt={line.product.title}
                      className="size-12 object-contain border border-border rounded bg-muted p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{line.product.title}</p>
                      <p className="text-muted-foreground">Qty: {line.qty}</p>
                    </div>
                    <span className="font-bold text-foreground">
                      {inr(line.product.price * line.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Organized Payment Methods */}
            <div className="rounded-lg border border-border bg-card p-5 shadow-2xs space-y-4">
              <div className="border-b border-border pb-3">
                <h2 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4 text-brand" />
                  4. Select Payment Method
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  100% secure payment gateway with SSL encryption
                </p>
              </div>

              {/* Payment Tabs */}
              <div className="space-y-3">
                {/* 1. UPI */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-lg border p-3.5 cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border bg-card hover:border-brand/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="size-4 accent-brand cursor-pointer"
                      />
                      <Smartphone className="size-4 text-brand" />
                      <span className="text-xs font-bold text-foreground">UPI (PhonePe, GPay, Paytm)</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Fastest
                    </span>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="mt-3 pt-3 border-t border-border/60 space-y-2 text-xs">
                      <div className="flex gap-2">
                        {["PhonePe", "Google Pay", "Paytm", "Other UPI"].map((prov) => (
                          <button
                            key={prov}
                            type="button"
                            onClick={() => setUpiProvider(prov)}
                            className={`px-3 py-1.5 rounded border text-xs font-semibold cursor-pointer ${
                              upiProvider === prov
                                ? "border-brand bg-brand text-primary-foreground font-bold"
                                : "border-border bg-background text-foreground hover:border-brand"
                            }`}
                          >
                            {prov}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. mobile@ybl or username@upi)"
                        value={upiIdInput}
                        onChange={(e) => setUpiIdInput(e.target.value)}
                        className="w-full max-w-sm rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-brand focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* 2. Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-lg border p-3.5 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border bg-card hover:border-brand/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentGroup"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="size-4 accent-brand cursor-pointer"
                    />
                    <CreditCard className="size-4 text-brand" />
                    <span className="text-xs font-bold text-foreground">Credit / Debit / ATM Card</span>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-3 pt-3 border-t border-border/60 space-y-2 max-w-md text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 •••• •••• 8921"
                          value={cardFields.number}
                          onChange={(e) => setCardFields({ ...cardFields, number: e.target.value })}
                          className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-brand focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardFields.expiry}
                            onChange={(e) => setCardFields({ ...cardFields, expiry: e.target.value })}
                            className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-brand focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-muted-foreground mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardFields.cvv}
                            onChange={(e) => setCardFields({ ...cardFields, cvv: e.target.value })}
                            className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-brand focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Net Banking */}
                <div
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`rounded-lg border p-3.5 cursor-pointer transition-all ${
                    paymentMethod === "netbanking"
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border bg-card hover:border-brand/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentGroup"
                      checked={paymentMethod === "netbanking"}
                      onChange={() => setPaymentMethod("netbanking")}
                      className="size-4 accent-brand cursor-pointer"
                    />
                    <Building2 className="size-4 text-brand" />
                    <span className="text-xs font-bold text-foreground">Net Banking</span>
                  </div>

                  {paymentMethod === "netbanking" && (
                    <div className="mt-3 pt-3 border-t border-border/60 text-xs">
                      <div className="flex flex-wrap gap-2">
                        {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank"].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setSelectedBank(b)}
                            className={`px-3 py-1.5 rounded border text-xs font-semibold cursor-pointer ${
                              selectedBank === b
                                ? "border-brand bg-brand text-primary-foreground font-bold"
                                : "border-border bg-background text-foreground hover:border-brand"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Credit Card EMI */}
                <div
                  onClick={() => setPaymentMethod("emi")}
                  className={`rounded-lg border p-3.5 cursor-pointer transition-all ${
                    paymentMethod === "emi"
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border bg-card hover:border-brand/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={paymentMethod === "emi"}
                        onChange={() => setPaymentMethod("emi")}
                        className="size-4 accent-brand cursor-pointer"
                      />
                      <Calendar className="size-4 text-brand" />
                      <span className="text-xs font-bold text-foreground">EMI (Easy Monthly Installments)</span>
                    </div>
                    <span className="text-[10px] font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                      No Cost EMI Available
                    </span>
                  </div>

                  {paymentMethod === "emi" && (
                    <div className="mt-3 pt-3 border-t border-border/60 text-xs space-y-2">
                      <p className="text-muted-foreground">Select EMI Tenure:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[3, 6, 9, 12].map((m) => {
                          const perMonth = Math.round(finalPayable / m);
                          const isSel = emiTenure === m;
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setEmiTenure(m)}
                              className={`p-2 rounded border text-left cursor-pointer transition-all ${
                                isSel
                                  ? "border-brand bg-brand/10 text-brand font-bold ring-1 ring-brand"
                                  : "border-border bg-background text-foreground hover:border-brand"
                              }`}
                            >
                              <div className="font-extrabold">{m} Months</div>
                              <div className="text-[11px]">{inr(perMonth)}/mo</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-lg border p-3.5 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border bg-card hover:border-brand/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="size-4 accent-brand cursor-pointer"
                      />
                      <Truck className="size-4 text-brand" />
                      <span className="text-xs font-bold text-foreground">Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Order Price Breakdown & Action */}
          <div className="lg:col-span-1 sticky top-20 space-y-4">
            <div className="rounded-lg border border-border bg-card p-5 shadow-2xs space-y-3">
              <h2 className="text-sm font-extrabold text-foreground border-b border-border pb-3">
                Price Details
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Price ({cartCount} items)</span>
                  <span>{inr(cartMrpTotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount Savings</span>
                  <span>-{inr(cartMrpTotal - cartTotal)}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span>-{inr(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <strong className="text-emerald-600">FREE</strong>
                    ) : (
                      inr(deliveryCharge)
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-border font-black text-sm text-foreground">
                  <span>Total Amount</span>
                  <span className="text-base text-brand">{inr(finalPayable)}</span>
                </div>

                {totalSavings > 0 && (
                  <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 text-center pt-1 bg-emerald-500/10 py-1 rounded border border-emerald-500/20">
                    You save {inr(totalSavings)} on this order!
                  </p>
                )}
              </div>

              {/* Delivery Address Summary preview */}
              <div className="border-t border-border pt-3 text-xs space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Delivering To:
                </span>
                <p className="font-bold text-foreground truncate">{selectedAddressObj.name}</p>
                <p className="text-muted-foreground line-clamp-1">
                  {selectedAddressObj.house}, {selectedAddressObj.street}, {selectedAddressObj.city} - {selectedAddressObj.pincode}
                </p>
              </div>

              <button
                onClick={handleConfirmOrder}
                className="w-full rounded-md bg-brand py-3 text-xs font-extrabold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-brand-deep cursor-pointer"
              >
                Confirm & Place Order
              </button>
            </div>

            <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 p-3.5 text-xs flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-tight">
                Safe and Secure Payments. Easy returns within 7 days of delivery.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
