import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { ShieldCheck, Mail, Lock, KeyRound, ArrowRight, Shield } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginRoute,
});

function AdminLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <AdminLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function AdminLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("admin.level2@kartly.com");
  const [password, setPassword] = React.useState("adminSecurePass");
  const [captchaInput, setCaptchaInput] = React.useState("K89A");
  const [mfaCode, setMfaCode] = React.useState("9103");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== "K89A") {
      toast.error("Invalid CAPTCHA Code");
      return;
    }

    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: email,
        password,
        captcha: captchaInput,
        mfaCode,
        role: "ADMIN",
      });

      if (ok) {
        navigate({ to: "/admin/dashboard" as any });
      }
    } catch {
      toast.error("Admin Authentication Failed");
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
            <div className="mx-auto size-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <ShieldCheck className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Control Portal</h1>
            <p className="text-xs text-muted-foreground">
              Level 2 Security Clearance · User management, seller approvals & product moderation.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Admin Email ID</label>
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

            {/* CAPTCHA Challenge */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Visual CAPTCHA Verification</label>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-amber-100 text-amber-950 px-4 py-2 font-mono font-black tracking-widest text-lg rounded border border-amber-300 select-none line-through italic">
                  K89A
                </div>
                <span className="text-[11px] text-muted-foreground">Type exact code displayed</span>
              </div>
              <input
                type="text"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm font-mono tracking-widest text-foreground outline-none focus:border-brand uppercase"
              />
            </div>

            {/* MFA Field */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Admin MFA Key (2FA)</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm font-mono tracking-widest text-foreground outline-none focus:border-brand"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Verifying Credentials..." : "Authenticate Admin Session"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <Shield className="size-3.5 text-amber-600" /> CAPTCHA + MFA Protected
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
