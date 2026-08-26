import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Truck, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/delivery/login")({
  component: DeliveryLoginRoute,
});

function DeliveryLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <DeliveryLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function DeliveryLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = React.useState("9876543210");
  const [otp, setOtp] = React.useState("8910");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleDeliveryLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: phone,
        otp,
        role: "DELIVERY",
      });

      if (ok) {
        navigate({ to: "/delivery/dashboard" as any });
      }
    } catch {
      toast.error("Delivery Partner Authentication Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="mx-auto max-w-md border border-border bg-card p-6 sm:p-8 rounded-lg shadow-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-border pb-4">
            <div className="mx-auto size-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <Truck className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Delivery Partner Portal</h1>
            <p className="text-xs text-muted-foreground">
              Mobile-First OTP Login · Navigation, OTP Confirmations & Earnings.
            </p>
          </div>

          <form onSubmit={handleDeliveryLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Registered Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">4-Digit Delivery Login OTP</label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm font-mono tracking-widest text-foreground outline-none focus:border-teal-600"
              />
              <p className="text-[11px] text-teal-700 mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="size-3" /> Pre-filled OTP: 8910
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-700 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Authenticating Rider..." : "Login to Delivery App"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-teal-600" /> GPS & Rider Tracking
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
