import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Crown, Mail, Lock, ShieldCheck, ArrowRight, ShieldAlert, Globe } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/super-admin/login")({
  component: SuperAdminLoginRoute,
});

function SuperAdminLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <SuperAdminLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function SuperAdminLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("root.superadmin@kartly.com");
  const [password, setPassword] = React.useState("superRootPass999");
  const [mfaCode, setMfaCode] = React.useState("9901");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: email,
        password,
        mfaCode,
        role: "SUPER_ADMIN",
      });

      if (ok) {
        navigate({ to: "/super-admin/dashboard" as any });
      }
    } catch {
      toast.error("Super Admin Privilege Failure");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="mx-auto max-w-md border-2 border-red-500/40 bg-card p-6 sm:p-8 rounded-lg shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-border pb-4">
            <div className="mx-auto size-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center border border-red-300">
              <Crown className="size-6" />
            </div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">Super Admin Root Portal</h1>
            <p className="text-xs text-muted-foreground">
              Highest Privilege System Access · Mandatory MFA & IP Security Whitelist Enforced.
            </p>
          </div>

          {/* Security Badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
            <div className="bg-red-50 text-red-900 border border-red-200 p-2 rounded flex items-center gap-1.5">
              <Globe className="size-3.5 shrink-0" /> IP Whitelisted (192.168.1.104)
            </div>
            <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 p-2 rounded flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 shrink-0" /> Mandatory 2FA Active
            </div>
          </div>

          <form onSubmit={handleSuperAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Root Admin Account Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Master Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Hardware Security Key / MFA Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm font-mono tracking-widest text-foreground outline-none focus:border-red-500"
              />
              <p className="text-[11px] text-muted-foreground mt-1">Pre-filled security token: 9901</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Verifying Root Privileges..." : "Authenticate Root Access"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1 font-semibold text-red-600">
              <ShieldAlert className="size-3.5" /> Full Audit Logging Active
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
