import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import {
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ShieldCheck,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Check,
  Smartphone,
  ExternalLink,
  Copy,
  Clock,
  RotateCcw,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import {
  StoreProvider,
  useStore,
  type DeliveryAddress,
  type CartLine,
} from "@/components/store/store-context";
import { products, inr } from "@/components/store/catalog";
import { toast } from "sonner";

export const Route = createFileRoute("/payment")({
  component: PaymentRoute,
});

function PaymentRoute() {
  return <PaymentPage />;
}

function PaymentPage() {
  const { cart, savedAddress, addOrder } = useStore();
  const navigate = useNavigate();

  // Fallback demo items if cart is empty so Payment Page ALWAYS works clearly
  const activeCartItems: CartLine[] = React.useMemo(() => {
    if (cart.length > 0) return cart;
    return [
      { product: products[0], qty: 1 }, // Nexon Pro Max
      { product: products[3] || products[1], qty: 1 }, // Loomwear Silk Blend
    ];
  }, [cart]);

  const activeCartCount = activeCartItems.reduce((acc, i) => acc + i.qty, 0);
  const activeMrpTotal = activeCartItems.reduce((acc, i) => acc + i.qty * i.product.mrp, 0);
  const activeSubtotal = activeCartItems.reduce((acc, i) => acc + i.qty * i.product.price, 0);
  const activeGstTotal = activeCartItems.reduce(
    (acc, i) =>
      acc + Math.round((i.product.price * i.qty * (i.product.price <= 1000 ? 5 : 12)) / 100),
    0,
  );
  const activeDeliveryFee = activeSubtotal > 0 && activeSubtotal < 499 ? 40 : 0;
  const activePriceTotal = activeSubtotal + activeGstTotal + activeDeliveryFee;
  const activeSavings = activeMrpTotal - activeSubtotal;

  // Fallback demo delivery address if user visits /payment directly
  const activeAddress: DeliveryAddress = React.useMemo(() => {
    if (savedAddress && savedAddress.fullName) return savedAddress;
    return {
      fullName: "Rahul Sharma",
      phone: "9876543210",
      pincode: "560001",
      addressLine: "Flat 402, Sunshine Apartments, 5th Main, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      addressType: "home",
    };
  }, [savedAddress]);

  // Payment Method Selection State
  const [paymentMethod, setPaymentMethod] = React.useState<"UPI" | "Card" | "Net Banking" | "COD">(
    "UPI",
  );

  // UPI Sub-Option State: "qr" (QR Code Scanner & Timer) or "id" (Manual VPA)
  const [upiSubOption, setUpiSubOption] = React.useState<"qr" | "id">("qr");

  // 5-Minute (300 Seconds) Countdown Timer State
  const [timeLeft, setTimeLeft] = React.useState<number>(300);
  const [isQrExpired, setIsQrExpired] = React.useState<boolean>(false);
  const [qrTimestamp, setQrTimestamp] = React.useState<number>(Date.now());

  // UPI Form State
  const [upiApp, setUpiApp] = React.useState<"gpay" | "phonepe" | "paytm" | "custom">("gpay");
  const [upiId, setUpiId] = React.useState("9876543210@okicici");

  // Card Form State
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCvv, setCardCvv] = React.useState("");
  const [cardName, setCardName] = React.useState("");

  // Net Banking State
  const [bank, setBank] = React.useState("HDFC");

  // Inline Validation Errors
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Processing & Simulation State
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState("Connecting to bank gateway...");
  const [paymentFailed, setPaymentFailed] = React.useState(false);
  const [failureReason, setFailureReason] = React.useState("");

  // Simulated Test Mode Toggle (allows user to test both success & failure)
  const [simulateFailure, setSimulateFailure] = React.useState(false);

  // Dynamic UPI Deep Link & QR URL
  const merchantVpa = "kartly@okicici";
  const upiDeepLink = `upi://pay?pa=${merchantVpa}&pn=KartlyStore&am=${activePriceTotal}&cu=INR&tn=OrderPayment`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(
    `${upiDeepLink}&ts=${qrTimestamp}`,
  )}`;

  // 5-Minute Timer Countdown Effect
  React.useEffect(() => {
    if (paymentMethod !== "UPI" || upiSubOption !== "qr" || isQrExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsQrExpired(true);
          toast.error("QR Code Expired", {
            description: "Timer reached 00:00. Please refresh QR code to continue.",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentMethod, upiSubOption, isQrExpired, qrTimestamp]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Refresh QR Code handler
  const handleRefreshQr = () => {
    setTimeLeft(300);
    setIsQrExpired(false);
    setQrTimestamp(Date.now());
    toast.success("QR Code Refreshed!", { description: "New QR generated. Timer reset to 05:00." });
  };

  // Auto-detect Card Type from first digits
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\D/g, "");
    if (!clean) return null;
    if (clean.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(clean)) return "Mastercard";
    if (/^6/.test(clean) || /^35/.test(clean)) return "RuPay";
    if (/^3[47]/.test(clean)) return "American Express";
    return "Card";
  };

  // Format Card Number with space separation (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  // Format Expiry MM/YY with automated slash insertion
  const handleExpiryChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    setCardExpiry(formatted);
    if (errors.cardExpiry) setErrors((prev) => ({ ...prev, cardExpiry: "" }));
  };

  // Handle Preset UPI Selection
  const handleUpiAppChange = (app: "gpay" | "phonepe" | "paytm" | "custom") => {
    setUpiApp(app);
    if (app === "gpay") setUpiId("9876543210@okicici");
    else if (app === "phonepe") setUpiId("9876543210@ybl");
    else if (app === "paytm") setUpiId("9876543210@paytm");
    else setUpiId("");
    if (errors.upiId) setErrors((prev) => ({ ...prev, upiId: "" }));
  };

  // Handle UPI Deep Link App Redirection
  const handlePayViaUpiApp = () => {
    if (isQrExpired) {
      toast.error("QR Code Expired", { description: "Please refresh the QR code first." });
      return;
    }
    toast("Opening UPI App...", { description: `Launching payment request` });

    try {
      window.location.href = upiDeepLink;
    } catch (e) {
      console.warn(e);
    }

    setTimeout(() => {
      toast.info(
        "If no UPI app opens automatically, please scan the QR code or complete payment below.",
      );
    }, 1500);
  };

  // Comprehensive Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "UPI") {
      if (upiSubOption === "qr" && isQrExpired) {
        toast.error("QR Code Expired", {
          description: "Please click 'Refresh QR Code' to extend the timer.",
        });
        return false;
      }
      if (upiSubOption === "id") {
        if (!upiId.trim()) {
          newErrors.upiId = "UPI ID is required (e.g. name@upi)";
        } else if (!upiId.includes("@") || upiId.trim().length < 4) {
          newErrors.upiId = "Invalid UPI ID format. Must contain '@' (e.g. username@upi)";
        }
      }
    } else if (paymentMethod === "Card") {
      if (!cardName.trim()) {
        newErrors.cardName = "Cardholder Name is required";
      }
      const rawCard = cardNumber.replace(/\s/g, "");
      if (!rawCard) {
        newErrors.cardNumber = "Card Number is required";
      } else if (rawCard.length < 16) {
        newErrors.cardNumber = "Enter complete 16-digit card number";
      }
      if (!cardExpiry) {
        newErrors.cardExpiry = "Expiry Date required (MM/YY)";
      } else {
        const parts = cardExpiry.split("/");
        const month = parseInt(parts[0], 10);
        if (parts.length !== 2 || isNaN(month) || month < 1 || month > 12) {
          newErrors.cardExpiry = "Enter valid month (01-12)";
        }
      }
      if (!cardCvv) {
        newErrors.cardCvv = "CVV is required";
      } else if (cardCvv.length < 3) {
        newErrors.cardCvv = "Enter 3-digit CVV";
      }
    } else if (paymentMethod === "Net Banking") {
      if (!bank) {
        newErrors.bank = "Please select a bank";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Payment Execution & Simulation
  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix invalid payment fields.");
      return;
    }

    // Reset failure state
    setPaymentFailed(false);
    setIsProcessing(true);
    setProcessingStep("Connecting to payment gateway...");

    // Simulated multi-stage payment verification pipeline
    setTimeout(() => {
      setProcessingStep("Encrypting transaction & contacting bank...");
    }, 800);

    setTimeout(() => {
      setProcessingStep("Verifying 2FA / Payment Credentials...");
    }, 1600);

    // Check if test failure triggered
    setTimeout(() => {
      if (
        simulateFailure ||
        cardNumber.replace(/\s/g, "") === "4000000000000000" ||
        upiId === "fail@upi"
      ) {
        setIsProcessing(false);
        setPaymentFailed(true);
        setFailureReason(
          "Transaction declined by issuing bank. Please check your credentials or select another payment method.",
        );
        toast.error("Payment Failed!", { description: "Transaction declined by bank." });
      } else {
        setProcessingStep("Payment Authorized! Generating Order receipt...");

        setTimeout(() => {
          // Add Order to localStorage and clear cart
          const newOrder = addOrder({
            items: activeCartItems,
            totalAmount: activePriceTotal,
            subtotal: activeSubtotal,
            gstTotal: activeGstTotal,
            mrpTotal: activeMrpTotal,
            savings: activeSavings,
            deliveryAddress: activeAddress,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "PENDING" : "SUCCESS",
            status: "Ordered",
          });

          setIsProcessing(false);
          toast.success("Payment Successful!", {
            description: `Order ${newOrder.id} placed successfully.`,
          });
          window.scrollTo({ top: 0, behavior: "instant" });
          navigate({ to: "/success" });
        }, 800);
      }
    }, 2400);
  };

  const cardBrand = getCardBrand(cardNumber);

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        {/* Step Indicator Header */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <h1 className="text-xl font-bold text-foreground">Payment Options</h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="size-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                ✓
              </span>
              Address
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="size-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
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

        {/* Delivery Address Banner */}
        <div className="mb-6 border border-border bg-card p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-foreground">
                Delivering to: <span className="font-semibold">{activeAddress.fullName}</span> (
                {activeAddress.phone})
              </p>
              <p className="text-muted-foreground mt-0.5">
                {activeAddress.addressLine}, {activeAddress.city}, {activeAddress.state} -{" "}
                {activeAddress.pincode}
              </p>
            </div>
          </div>
          <Link to="/checkout" className="text-brand hover:underline font-semibold shrink-0">
            Edit Address
          </Link>
        </div>

        {/* Payment Failure Alert Banner */}
        {paymentFailed && (
          <div className="mb-6 border border-destructive bg-destructive/10 p-4 rounded-sm text-xs text-destructive space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="size-5" /> Payment Failed
            </div>
            <p>{failureReason}</p>
            <p className="font-semibold text-foreground">
              Please review your details or select another payment option below to try again.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Payment Options Selection Box */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border border-border bg-card rounded-sm shadow-sm">
              {/* Payment Method Selector Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border bg-muted/20">
                {[
                  { id: "UPI", label: "UPI / QR Code", icon: QrCode },
                  { id: "Card", label: "Debit / Credit", icon: CreditCard },
                  { id: "Net Banking", label: "Net Banking", icon: Building2 },
                  { id: "COD", label: "Cash on Delivery", icon: Banknote },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(item.id as any);
                        setErrors({});
                      }}
                      className={`p-3.5 text-xs font-bold flex flex-col items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                        isSelected
                          ? "border-brand bg-card text-brand font-extrabold shadow-sm"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                      {isSelected && (
                        <span className="text-[10px] bg-brand text-primary-foreground px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                          <Check className="size-2.5" /> Selected
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Input Fields for Selected Method */}
              <form onSubmit={handlePayNow} className="p-5 sm:p-6 space-y-5">
                {/* ----------------- 1. ENHANCED UPI / QR METHOD WITH SCANNER & 5-MIN TIMER ----------------- */}
                {paymentMethod === "UPI" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <QrCode className="size-4 text-brand" /> Pay via UPI or Scan QR Code
                      </h3>
                      <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Instant & 100% Free
                      </span>
                    </div>

                    {/* Sub-Option Selector: QR Scanner vs Enter UPI ID */}
                    <div className="grid grid-cols-2 gap-2 bg-muted/40 p-1.5 rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() => setUpiSubOption("qr")}
                        className={`py-2 px-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          upiSubOption === "qr"
                            ? "bg-card text-brand shadow-sm font-extrabold border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <QrCode className="size-3.5" /> QR Code Scanner View
                      </button>

                      <button
                        type="button"
                        onClick={() => setUpiSubOption("id")}
                        className={`py-2 px-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          upiSubOption === "id"
                            ? "bg-card text-brand shadow-sm font-extrabold border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Smartphone className="size-3.5" /> Enter UPI ID Manually
                      </button>
                    </div>

                    {/* SUB-OPTION A: REALISTIC QR SCANNER VIEW WITH 5-MIN COUNTDOWN TIMER */}
                    {upiSubOption === "qr" && (
                      <div className="space-y-5 text-center">
                        {/* Scanner Frame Container */}
                        <div className="relative border-2 border-brand/50 bg-card p-6 rounded-xl max-w-sm mx-auto space-y-4 shadow-lg overflow-hidden">
                          {/* Top Header Bar inside Scanner View */}
                          <div className="flex items-center justify-between text-xs border-b border-border pb-2.5">
                            <span className="font-bold text-foreground flex items-center gap-1">
                              <ShieldCheck className="size-4 text-emerald-600" /> Kartly Store
                            </span>
                            <span className="font-extrabold text-brand text-sm">
                              {inr(activePriceTotal)}
                            </span>
                          </div>

                          {/* 5-Minute Live Countdown Timer Badge */}
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                              isQrExpired
                                ? "bg-destructive/15 text-destructive border border-destructive/30"
                                : timeLeft < 60
                                  ? "bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
                                  : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            }`}
                          >
                            <Clock className="size-3.5" />
                            {isQrExpired ? (
                              <span>QR Code Expired</span>
                            ) : (
                              <span>Expires in {formatTime(timeLeft)}</span>
                            )}
                          </div>

                          {/* Centered QR Code Box with Viewfinder Corners */}
                          <div className="relative bg-white p-3 rounded-lg border-2 border-border inline-block shadow-inner">
                            {/* Visual Scanner Overlay Corner Lines */}
                            <div className="absolute top-1 left-1 size-4 border-t-2 border-l-2 border-brand" />
                            <div className="absolute top-1 right-1 size-4 border-t-2 border-r-2 border-brand" />
                            <div className="absolute bottom-1 left-1 size-4 border-b-2 border-l-2 border-brand" />
                            <div className="absolute bottom-1 right-1 size-4 border-b-2 border-r-2 border-brand" />

                            {isQrExpired ? (
                              <div className="size-48 bg-muted/80 rounded flex flex-col items-center justify-center p-4 space-y-2 text-center">
                                <AlertTriangle className="size-10 text-destructive mx-auto" />
                                <p className="text-xs font-bold text-destructive">
                                  QR Code Expired
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  Timer reached 00:00
                                </p>
                              </div>
                            ) : (
                              <img
                                src={qrImageUrl}
                                alt="Scan QR Code to Pay via UPI"
                                width={200}
                                height={200}
                                className="size-48 object-contain mx-auto"
                              />
                            )}
                          </div>

                          {/* Scanning Instruction Text */}
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-foreground">
                              Scan this QR using any UPI app to complete payment
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              Supports Google Pay, PhonePe, Paytm, BHIM, CRED & Banking Apps
                            </p>
                          </div>

                          {/* VPA Info & Copy */}
                          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-mono bg-muted/50 p-2 rounded border border-border">
                            <span>VPA: {merchantVpa}</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(merchantVpa);
                                toast.success("Copied Merchant VPA");
                              }}
                              className="hover:text-foreground p-0.5 cursor-pointer"
                              title="Copy VPA"
                            >
                              <Copy className="size-3" />
                            </button>
                          </div>

                          {/* Refresh QR & Cancel Control Buttons */}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                            <button
                              type="button"
                              onClick={handleRefreshQr}
                              className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-border"
                            >
                              <RotateCcw className="size-3.5" /> Refresh QR Code
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setPaymentMethod("Card");
                                toast("Switched to Card payment option.");
                              }}
                              className="bg-card hover:bg-muted text-muted-foreground hover:text-foreground py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer border border-border"
                            >
                              <X className="size-3.5" /> Cancel / Back
                            </button>
                          </div>
                        </div>

                        {/* Pay using Installed UPI App Button */}
                        <div className="space-y-2 max-w-sm mx-auto">
                          <button
                            type="button"
                            onClick={handlePayViaUpiApp}
                            disabled={isQrExpired}
                            className="w-full bg-brand text-primary-foreground py-3 px-4 rounded text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow disabled:opacity-50"
                          >
                            <Smartphone className="size-4" /> Pay using Installed UPI App{" "}
                            <ExternalLink className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* SUB-OPTION B: ENTER UPI ID MANUALLY */}
                    {upiSubOption === "id" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-2">
                            Select Preset App or Enter Custom ID
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              {
                                id: "gpay",
                                label: "Google Pay",
                                color: "bg-blue-50 text-blue-700 border-blue-200",
                              },
                              {
                                id: "phonepe",
                                label: "PhonePe",
                                color: "bg-purple-50 text-purple-700 border-purple-200",
                              },
                              {
                                id: "paytm",
                                label: "Paytm",
                                color: "bg-sky-50 text-sky-700 border-sky-200",
                              },
                              {
                                id: "custom",
                                label: "Custom UPI ID",
                                color: "bg-amber-50 text-amber-700 border-amber-200",
                              },
                            ].map((app) => (
                              <button
                                key={app.id}
                                type="button"
                                onClick={() => handleUpiAppChange(app.id as any)}
                                className={`p-2.5 rounded border text-xs font-bold transition-all text-center cursor-pointer ${
                                  upiApp === app.id
                                    ? `${app.color} ring-2 ring-brand font-extrabold`
                                    : "border-border text-foreground hover:bg-muted"
                                }`}
                              >
                                {app.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1">
                            UPI ID (Virtual Private Address){" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="name@upi (e.g. 9876543210@okicici)"
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              if (errors.upiId) setErrors((prev) => ({ ...prev, upiId: "" }));
                            }}
                            className={`w-full bg-background border px-3 py-2 text-sm text-foreground outline-none focus:border-brand font-mono ${
                              errors.upiId ? "border-destructive" : "border-border"
                            }`}
                          />
                          {errors.upiId ? (
                            <p className="text-[11px] text-destructive mt-1 font-medium">
                              {errors.upiId}
                            </p>
                          ) : (
                            <p className="text-[11px] text-muted-foreground mt-1">
                              Example format:{" "}
                              <code className="bg-muted px-1 rounded">username@upi</code>,{" "}
                              <code className="bg-muted px-1 rounded">9876543210@ybl</code>
                            </p>
                          )}
                        </div>

                        <div className="bg-muted/40 p-3 rounded border border-border text-xs text-muted-foreground flex items-center gap-2">
                          <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                          <span>
                            A collect request will be sent to your{" "}
                            <strong>{upiApp.toUpperCase()}</strong> app.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Simulation Test Toggle */}
                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={simulateFailure}
                          onChange={(e) => setSimulateFailure(e.target.checked)}
                          className="accent-destructive"
                        />
                        <span className="text-[11px]">
                          Simulate Test Payment Failure (For testing retry flow)
                        </span>
                      </label>
                    </div>

                    {/* Security Badges */}
                    <div className="pt-2 flex items-center justify-between border-t border-border text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Lock className="size-3.5 text-emerald-600" /> 256-Bit SSL Encrypted Gateway
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-brand" /> 100% Buyer Protection
                      </span>
                    </div>

                    {/* Main Action Button */}
                    <button
                      type="submit"
                      disabled={isProcessing || (upiSubOption === "qr" && isQrExpired)}
                      className="w-full bg-accent px-4 py-4 text-center text-base font-extrabold text-accent-foreground transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {upiSubOption === "qr" ? "I have completed payment" : "Verify & Pay"}{" "}
                      {inr(activePriceTotal)} <ArrowRight className="size-5" />
                    </button>
                  </div>
                )}

                {/* ----------------- 2. CARD METHOD ----------------- */}
                {paymentMethod === "Card" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <CreditCard className="size-4 text-brand" /> Debit or Credit Card
                      </h3>
                      {cardBrand && (
                        <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded font-bold uppercase">
                          {cardBrand}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Cardholder Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RAHUL SHARMA"
                        value={cardName}
                        onChange={(e) => {
                          setCardName(e.target.value);
                          if (errors.cardName) setErrors((prev) => ({ ...prev, cardName: "" }));
                        }}
                        className={`w-full bg-background border px-3 py-2 text-sm text-foreground uppercase outline-none focus:border-brand ${
                          errors.cardName ? "border-destructive" : "border-border"
                        }`}
                      />
                      {errors.cardName && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        Card Number <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4532 1234 5678 9010"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          className={`w-full bg-background border px-3 py-2 text-sm font-mono tracking-wider text-foreground outline-none focus:border-brand ${
                            errors.cardNumber ? "border-destructive" : "border-border"
                          }`}
                        />
                        <CreditCard className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
                      </div>
                      {errors.cardNumber && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">
                          Expiry Date (MM/YY) <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          className={`w-full bg-background border px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-brand ${
                            errors.cardExpiry ? "border-destructive" : "border-border"
                          }`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-[11px] text-destructive mt-1 font-medium">
                            {errors.cardExpiry}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">
                          CVV / CVC <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => {
                            setCardCvv(e.target.value.replace(/\D/g, ""));
                            if (errors.cardCvv) setErrors((prev) => ({ ...prev, cardCvv: "" }));
                          }}
                          className={`w-full bg-background border px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-brand ${
                            errors.cardCvv ? "border-destructive" : "border-border"
                          }`}
                        />
                        {errors.cardCvv && (
                          <p className="text-[11px] text-destructive mt-1 font-medium">
                            {errors.cardCvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-accent px-4 py-4 text-center text-base font-extrabold text-accent-foreground transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      Pay {inr(activePriceTotal)} <ArrowRight className="size-5" />
                    </button>
                  </div>
                )}

                {/* ----------------- 3. NET BANKING METHOD ----------------- */}
                {paymentMethod === "Net Banking" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Building2 className="size-4 text-brand" /> Select Net Banking Partner
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "HDFC", name: "HDFC Bank" },
                        { id: "SBI", name: "State Bank of India" },
                        { id: "ICICI", name: "ICICI Bank" },
                        { id: "AXIS", name: "Axis Bank" },
                        { id: "KOTAK", name: "Kotak Mahindra" },
                        { id: "PNB", name: "Punjab National Bank" },
                        { id: "BOB", name: "Bank of Baroda" },
                        { id: "CANARA", name: "Canara Bank" },
                        { id: "UNION", name: "Union Bank of India" },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setBank(b.id);
                            if (errors.bank) setErrors((prev) => ({ ...prev, bank: "" }));
                          }}
                          className={`p-3 rounded border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                            bank === b.id
                              ? "border-brand bg-brand/5 text-brand ring-2 ring-brand font-extrabold"
                              : "border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>{b.name}</span>
                          {bank === b.id && <Check className="size-3.5 text-brand" />}
                        </button>
                      ))}
                    </div>
                    {errors.bank && (
                      <p className="text-[11px] text-destructive mt-1 font-medium">{errors.bank}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-accent px-4 py-4 text-center text-base font-extrabold text-accent-foreground transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      Pay {inr(activePriceTotal)} <ArrowRight className="size-5" />
                    </button>
                  </div>
                )}

                {/* ----------------- 4. COD ----------------- */}
                {paymentMethod === "COD" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Banknote className="size-4 text-emerald-600" /> Cash / Pay on Delivery
                      </h3>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        Zero Fee
                      </span>
                    </div>

                    <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded text-xs text-emerald-950 space-y-2">
                      <p className="font-semibold">
                        Pay by Cash or scan UPI QR code when your package is delivered to your
                        doorstep.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-emerald-800">
                        <li>No online transaction risks</li>
                        <li>Exact cash or UPI scan accepted at delivery</li>
                        <li>Includes free doorstep delivery</li>
                      </ul>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-accent px-4 py-4 text-center text-base font-extrabold text-accent-foreground transition-all hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                    >
                      Place Order (COD) {inr(activePriceTotal)} <ArrowRight className="size-5" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-border bg-card p-5 space-y-4 rounded-sm shadow-sm">
              <h2 className="text-base font-bold text-foreground border-b border-border pb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {activeCartCount} item(s)
                </span>
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Item Subtotal ({activeCartCount} items)</span>
                  <span className="font-semibold text-foreground">{inr(activeSubtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST & Applicable Taxes</span>
                  <span className="font-semibold text-brand">+{inr(activeGstTotal)}</span>
                </div>
                {activeSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Savings</span>
                    <span>-{inr(activeSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Charges</span>
                  {activeDeliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold text-foreground">{inr(activeDeliveryFee)}</span>
                  )}
                </div>

                <div className="border-t border-dashed border-border pt-3 flex justify-between font-extrabold text-base text-foreground">
                  <span>Final Amount Payable</span>
                  <span className="text-brand text-lg">{inr(activePriceTotal)}</span>
                </div>
              </div>

              {/* Items List Breakdown */}
              <div className="border-t border-border pt-3">
                <p className="text-xs font-bold text-foreground mb-2">Item Details:</p>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 divide-y divide-border">
                  {activeCartItems.map((line) => (
                    <div key={line.product.id} className="pt-2 flex items-center gap-3 text-xs">
                      <img
                        src={line.product.image}
                        alt={line.product.title}
                        className="size-10 object-contain bg-muted p-1 rounded shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground line-clamp-1">
                          {line.product.title}
                        </p>
                        <p className="text-muted-foreground text-[11px]">Qty: {line.qty}</p>
                      </div>
                      <div className="text-right font-bold text-foreground">
                        {inr(line.product.price * line.qty)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simulated Gateway Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border p-8 rounded-lg max-w-sm w-full text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="relative mx-auto size-16 flex items-center justify-center">
              <Loader2 className="size-16 text-brand animate-spin" />
              <Lock className="size-6 text-brand absolute" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">Processing Payment</h3>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{processingStep}</p>
            </div>

            <div className="bg-muted p-3 rounded text-xs text-muted-foreground flex items-center justify-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              Do not refresh or close this window
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
