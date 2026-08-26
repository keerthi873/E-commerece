import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { PackageCheck, BadgeCheck, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/warehouse/login")({
  component: WarehouseLoginRoute,
});

function WarehouseLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <WarehouseLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function WarehouseLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [staffBadge, setStaffBadge] = React.useState("WH-STAFF-8902");
  const [pin, setPin] = React.useState("1234");
  const [station, setStation] = React.useState("WH-BLR-04 (Packing Bay)");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleWarehouseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: staffBadge,
        password: pin,
        role: "WAREHOUSE",
      });

      if (ok) {
        navigate({ to: "/warehouse/dashboard" as any });
      }
    } catch {
      toast.error("Warehouse Staff Login Failed");
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
            <div className="mx-auto size-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <PackageCheck className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Warehouse Operations Portal</h1>
            <p className="text-xs text-muted-foreground">
              Staff Badge Authentication · Pick, Pack, Barcode Scanner & Dispatch Queue.
            </p>
          </div>

          <form onSubmit={handleWarehouseLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Staff Badge ID</label>
              <div className="relative">
                <BadgeCheck className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={staffBadge}
                  onChange={(e) => setStaffBadge(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm font-mono text-foreground outline-none focus:border-emerald-600 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">4-Digit Security PIN</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm font-mono tracking-widest text-foreground outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Assigned Station / Bay</label>
              <select
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-emerald-600"
              >
                <option value="WH-BLR-04 (Packing Bay)">WH-BLR-04 (Packing Bay)</option>
                <option value="WH-BLR-02 (Order Sorting)">WH-BLR-02 (Order Sorting)</option>
                <option value="WH-BLR-09 (Dispatch Dock)">WH-BLR-09 (Dispatch Dock)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Verifying Badge..." : "Login to Warehouse Station"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-600" /> RFID / Barcode Station
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
