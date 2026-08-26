import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { DollarSign, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/finance/login")({
  component: FinanceLoginRoute,
});

function FinanceLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <FinanceLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function FinanceLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("finance.comptroller@kartly.com");
  const [password, setPassword] = React.useState("finSecure9001");
  const [mfaCode, setMfaCode] = React.useState("7104");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFinanceLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: email,
        password,
        mfaCode,
        role: "FINANCE",
      });

      if (ok) {
        navigate({ to: "/finance/dashboard" as any });
      }
    } catch {
      toast.error("Finance Authentication Failed");
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
            <div className="mx-auto size-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-300">
              <DollarSign className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Finance Comptroller Portal</h1>
            <p className="text-xs text-muted-foreground">
              Financial Audit & Control · Settlements, GST Reports & Refund Approvals.
            </p>
          </div>

          <form onSubmit={handleFinanceLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Finance Officer Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-emerald-600"
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
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">MFA Security Token</label>
              <input
                type="text"
                required
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm font-mono tracking-widest text-foreground outline-none focus:border-emerald-600"
              />
              <p className="text-[11px] text-muted-foreground mt-1">Sample token: 7104</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Verifying Finance Tokens..." : "Login to Finance Portal"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-600" /> Audit Log Enforced
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
