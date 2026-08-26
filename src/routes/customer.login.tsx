import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Users, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/login")({
  component: CustomerLoginRoute,
});

function CustomerLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <CustomerLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function CustomerLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("rahul.customer@kartly.com");
  const [password, setPassword] = React.useState("password123");
  const [phone, setPhone] = React.useState("9876543210");
  const [otp, setOtp] = React.useState("4920");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: authMode === "email" ? email : phone,
        password: authMode === "email" ? password : undefined,
        otp: authMode === "otp" ? otp : undefined,
        role: "CUSTOMER",
      });

      if (ok) {
        navigate({ to: "/customer/dashboard" as any });
      }
    } catch {
      toast.error("Login Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple" | "facebook") => {
    setIsSubmitting(true);
    await login({
      emailOrPhone: `user.${provider}@kartly.com`,
      role: "CUSTOMER",
      socialProvider: provider,
    });
    setIsSubmitting(false);
    navigate({ to: "/customer/dashboard" as any });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main className="mx-auto max-w-[1200px] px-4 py-10">
        <div className="mx-auto max-w-md border border-border bg-card p-6 sm:p-8 rounded-lg shadow-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-border pb-4">
            <div className="mx-auto size-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Users className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Customer Portal Login</h1>
            <p className="text-xs text-muted-foreground">
              Sign in to manage your orders, wishlist, addresses, and loyalty points.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 bg-muted/40 p-1 rounded-md border border-border">
            <button
              type="button"
              onClick={() => setAuthMode("email")}
              className={`py-2 text-xs font-bold rounded transition-all ${
                authMode === "email" ? "bg-card text-brand shadow-sm" : "text-muted-foreground"
              }`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("otp")}
              className={`py-2 text-xs font-bold rounded transition-all ${
                authMode === "otp" ? "bg-card text-brand shadow-sm" : "text-muted-foreground"
              }`}
            >
              Mobile & OTP
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authMode === "email" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Email Address</label>
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
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-foreground">Password</label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); toast("Password Reset Link sent to " + email); }} className="text-[11px] text-brand hover:underline">
                      Forgot Password?
                    </a>
                  </div>
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
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">4-Digit OTP Code</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-sm font-mono tracking-widest text-foreground outline-none focus:border-brand"
                  />
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Sample OTP pre-filled (4920)
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-brand"
                />
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Login to Customer Account"} <ArrowRight className="size-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 border-t border-border pt-4">
            <p className="text-center text-xs text-muted-foreground font-semibold">Or Connect via Social Auth</p>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="border border-border p-2 rounded hover:bg-muted text-center cursor-pointer"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("apple")}
                className="border border-border p-2 rounded hover:bg-muted text-center cursor-pointer"
              >
                Apple
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className="border border-border p-2 rounded hover:bg-muted text-center cursor-pointer"
              >
                Facebook
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-600" /> OAuth 2.0 Encrypted
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
