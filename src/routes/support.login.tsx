import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Headphones, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { StoreProvider } from "@/components/store/store-context";
import { EnterpriseAuthProvider, useEnterpriseAuth } from "@/components/auth/enterprise-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/support/login")({
  component: SupportLoginRoute,
});

function SupportLoginRoute() {
  return (
    <StoreProvider>
      <EnterpriseAuthProvider>
        <SupportLoginPage />
      </EnterpriseAuthProvider>
    </StoreProvider>
  );
}

function SupportLoginPage() {
  const { login } = useEnterpriseAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("agent.ananya@kartly.com");
  const [password, setPassword] = React.useState("agentPass123");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSupportLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await login({
        emailOrPhone: email,
        password,
        role: "SUPPORT",
      });

      if (ok) {
        navigate({ to: "/support/dashboard" as any });
      }
    } catch {
      toast.error("Support Agent Login Failed");
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
            <div className="mx-auto size-12 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <Headphones className="size-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Customer Helpdesk Portal</h1>
            <p className="text-xs text-muted-foreground">
              Agent Portal · Ticket Management, Live Chat Queue & Refund Processing.
            </p>
          </div>

          <form onSubmit={handleSupportLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">Agent Email ID</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-indigo-600"
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
                  className="w-full bg-background border border-border px-3 py-2 pl-9 text-sm text-foreground outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Authenticating Agent..." : "Login to Helpdesk Console"} <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border flex items-center justify-between">
            <Link to="/portals" className="text-brand hover:underline">
              ← Portals Directory
            </Link>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-indigo-600" /> Zendesk / Helpdesk Protocol
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
