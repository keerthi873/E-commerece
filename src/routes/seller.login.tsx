import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Store, Mail, Lock, ShieldCheck, ArrowRight, Laptop, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/login")({
  component: SellerLoginRoute,
});

function SellerLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <SellerLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function SellerLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("seller.apex@kartly.com");
  const [password, setPassword] = React.useState("sellerPass123");
  const [mfaCode, setMfaCode] = React.useState("8402");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSellerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: email,
        password,
        mfaCode,
        role: "SELLER",
      });

      if (ok) {
        navigate({ to: "/seller/dashboard" as any });
      }
    } catch {
      toast.error("Seller Authentication Failed");
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
            <div className="mx-auto size-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
              <Store className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Seller Partner Portal</h1>
            <p className="text-xs text-muted-foreground">
              Manage inventory, view store approval status, sales analytics & payouts.
            </p>
          </div>

          {/* Security Status Badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 shrink-0" /> KYC Status: Verified
            </div>
            <div className="bg-purple-50 border border-purple-200 text-purple-800 p-2 rounded flex items-center gap-1.5">
              <Laptop className="size-3.5 shrink-0" /> Device Tracked
            </div>
          </div>

          <form onSubmit={handleSellerLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Seller Registered Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                MFA Authenticator Code (2FA Enforced)
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm font-mono tracking-widest text-foreground outline-none focus:border-brand"
              />
              <p className="text-[11px] text-muted-foreground mt-1">Pre-filled sample code: 8402</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-700 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Authenticating Seller..." : "Login to Seller Dashboard"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-purple-600" /> Device Fingerprinted
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
