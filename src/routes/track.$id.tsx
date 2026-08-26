import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  Package,
  PackageCheck,
  Truck,
  Bike,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Copy,
  Download,
  HelpCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { OrderInvoiceModal } from "@/components/store/OrderInvoiceModal";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider, useStore, type Order, type OrderStatus } from "@/components/store/store-context";
import { products, inr } from "@/components/store/catalog";

export const Route = createFileRoute("/track/$id")({
  component: TrackRoute,
});

function TrackRoute() {
  return <TrackPage />;
}

const STEPS: { status: OrderStatus; label: string; description: string; icon: React.ElementType }[] = [
  {
    status: "Ordered",
    label: "Order Placed",
    description: "Your order has been placed and verified.",
    icon: Package,
  },
  {
    status: "Packed",
    label: "Packed & Sealed",
    description: "Items packed securely at Bengaluru Fulfillment Hub.",
    icon: PackageCheck,
  },
  {
    status: "Shipped",
    label: "Shipped in Transit",
    description: "Handed over to Express Courier (AWB: BLR-98427104).",
    icon: Truck,
  },
  {
    status: "Out for Delivery",
    label: "Out for Delivery",
    description: "Agent Ramesh Kumar (Ph: +91 98450 12345) is on the way.",
    icon: Bike,
  },
  {
    status: "Delivered",
    label: "Delivered",
    description: "Package delivered to recipient.",
    icon: CheckCircle2,
  },
];

function TrackPage() {
  const { id } = Route.useParams();
  const { orders, lastOrder } = useStore();

  // Find order matching ID or fallback to last order / sample order
  const order: Order = React.useMemo(() => {
    const found = orders.find((o) => o.id.toLowerCase() === id.toLowerCase() || o.id === id);
    if (found) return found;
    if (lastOrder) return lastOrder;

    const now = new Date();
    const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const item1 = products[0];
    const item2 = products[2] || products[1];

    return {
      id: id || "KART-ORD-928415",
      date: now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      items: [
        { product: item1, qty: 1 },
        { product: item2, qty: 1 },
      ],
      totalAmount: item1.price + item2.price,
      subtotal: item1.price + item2.price,
      gstTotal: Math.round(((item1.price + item2.price) * 12) / 100),
      mrpTotal: item1.mrp + item2.mrp,
      savings: (item1.mrp - item1.price) + (item2.mrp - item2.price),
      deliveryAddress: {
        fullName: "Rahul Sharma",
        phone: "9876543210",
        pincode: "560001",
        addressLine: "Flat 402, Sunshine Apartments, 5th Main, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        addressType: "home",
      },
      paymentMethod: "UPI",
      paymentStatus: "SUCCESS",
      status: "Packed",
      estimatedDelivery: deliveryDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  }, [id, orders, lastOrder]);

  // Determine current step index
  const statusIndexMap: Record<OrderStatus, number> = {
    Ordered: 0,
    Packed: 1,
    Shipped: 2,
    "Out for Delivery": 3,
    Delivered: 4,
  };

  const currentStepIndex = statusIndexMap[order.status ?? "Ordered"] ?? 1;
  const [invoiceOpen, setInvoiceOpen] = React.useState(false);

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.id);
      toast.success("Order ID copied to clipboard!");
    }
  };

  const handleDownloadInvoice = () => {
    toast.success("Invoice downloading...", { description: `Invoice_${order.id}.pdf` });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1100px] px-4 py-8 space-y-6">
        {/* Back Link & Page Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-brand transition-colors mb-1"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Shopping</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-3">
              <span>Track Order</span>
              <span className="text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full font-bold border border-brand/20">
                {order.status}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyOrderId}
              className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand rounded-md transition-colors cursor-pointer"
            >
              <Copy className="size-3.5" /> Copy Order ID
            </button>
            <button
              onClick={() => setInvoiceOpen(true)}
              className="inline-flex items-center gap-1.5 bg-brand text-primary-foreground px-3.5 py-1.5 text-xs font-bold hover:bg-brand-deep rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <FileText className="size-3.5" /> View Tax Invoice
            </button>
          </div>
        </div>

        {/* Order Quick Details Box */}
        <div className="border border-border bg-card p-5 rounded-xl shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground block text-[11px]">Order Number</span>
            <span className="font-bold text-foreground text-sm flex items-center gap-1 mt-0.5">
              #{order.id}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[11px]">Placed On</span>
            <span className="font-bold text-foreground text-sm mt-0.5 block">{order.date}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[11px]">Expected Delivery Date</span>
            <span className="font-extrabold text-brand text-sm mt-0.5 block flex items-center gap-1">
              <Clock className="size-4 text-brand inline" />
              {order.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* TRACKING PROGRESS TIMELINE */}
        <div className="border border-border bg-card p-6 sm:p-8 rounded-xl shadow-xs space-y-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
            <Truck className="size-5 text-brand" /> Shipment Progress
          </h2>

          {/* Progress Bar Header */}
          <div className="relative my-6">
            <div className="hidden sm:block absolute left-8 right-8 top-5 h-1 bg-muted -z-0">
              <div
                className="h-full bg-brand transition-all duration-500 rounded-full"
                style={{
                  width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2">
              {STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step.status}
                    className="relative z-10 flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2"
                  >
                    {/* Circle Icon */}
                    <div
                      className={`size-10 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isCompleted
                          ? "bg-brand text-primary-foreground shadow-md ring-4 ring-brand/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      <IconComponent className="size-5" />
                    </div>

                    {/* Step Content */}
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          isCurrent
                            ? "text-brand"
                            : isCompleted
                              ? "text-foreground"
                              : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                        {step.description}
                      </p>
                      {isCurrent && (
                        <span className="inline-block mt-1 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold animate-pulse">
                          Current Status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Agent Information Card */}
          <div className="bg-muted/50 border border-border p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">
                <Bike className="size-5" />
              </div>
              <div>
                <p className="font-bold text-foreground text-xs">Delivery Executive: Ramesh Kumar</p>
                <p className="text-muted-foreground text-[11px]">
                  Assigned Agent · Fast Delivery Partner
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground font-semibold">Delivery OTP</p>
                <p className="text-sm font-extrabold text-brand tracking-wider">4928</p>
              </div>
              <a
                href="tel:9845012345"
                className="bg-brand px-3.5 py-2 text-xs font-bold text-primary-foreground rounded-md flex items-center gap-1.5 hover:opacity-90 transition-opacity ml-auto sm:ml-0"
              >
                <Phone className="size-3.5" /> Call Agent
              </a>
            </div>
          </div>
        </div>

        {/* Address & Payment Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="border border-border bg-card p-5 rounded-xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
              <MapPin className="size-4 text-brand" /> Delivery Address
            </h3>
            <div className="text-xs text-foreground space-y-1">
              <p className="font-bold text-sm">{order.deliveryAddress.fullName}</p>
              <p>{order.deliveryAddress.addressLine}</p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
              {order.deliveryAddress.landmark && (
                <p className="text-muted-foreground">Landmark: {order.deliveryAddress.landmark}</p>
              )}
              <p className="pt-1 flex items-center gap-1 font-semibold text-muted-foreground">
                <Phone className="size-3" /> {order.deliveryAddress.phone}
              </p>
            </div>
          </div>

          {/* Payment & Price Summary */}
          <div className="border border-border bg-card p-5 rounded-xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-2">
              <ShieldCheck className="size-4 text-brand" /> Payment Summary
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-bold text-foreground">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="font-bold text-emerald-600">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item Subtotal:</span>
                <span className="font-semibold text-foreground">{inr(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST & Taxes:</span>
                <span className="font-semibold text-brand">+{inr(order.gstTotal)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-extrabold text-sm text-foreground">
                <span>Total Amount Paid:</span>
                <span className="text-brand text-base">{inr(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Products List */}
        <div className="border border-border bg-card p-5 rounded-xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2">
            Items in this Package ({order.items.reduce((acc, i) => acc + i.qty, 0)})
          </h3>

          <div className="divide-y divide-border">
            {order.items.map((line) => (
              <div key={line.product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={line.product.image}
                    alt={line.product.title}
                    className="size-16 object-contain bg-muted p-1 rounded-md shrink-0"
                  />
                  <div className="min-w-0 text-xs">
                    <p className="font-semibold text-foreground line-clamp-1">{line.product.title}</p>
                    <p className="text-muted-foreground mt-0.5">Brand: {line.product.brand}</p>
                    <p className="text-muted-foreground">Qty: {line.qty}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 text-xs">
                  <p className="font-bold text-foreground">{inr(line.product.price * line.qty)}</p>
                  <p className="text-muted-foreground line-through">{inr(line.product.mrp * line.qty)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="border border-border bg-muted/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HelpCircle className="size-4 text-brand shrink-0" />
            <span>Need help with your order or package delivery? Our support team is available 24/7.</span>
          </div>

          <a
            href="mailto:support@kartly.com"
            className="border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:border-brand rounded-md transition-colors shrink-0"
          >
            Contact Support
          </a>
        </div>
      </main>

      <SiteFooter />
      <OrderInvoiceModal order={order} open={invoiceOpen} onOpenChange={setInvoiceOpen} />
    </div>
  );
}
