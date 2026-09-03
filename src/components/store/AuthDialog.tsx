import * as React from "react";
import { User, Lock, Mail, Phone, X, ShieldCheck } from "lucide-react";
import { useStore } from "./store-context";

export function AuthDialog() {
  const { authModalOpen, authModalReason, closeAuthModal, signIn } = useStore();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (email ? email.split("@")[0] : "Kartly Customer");
    const finalEmail = email.trim() || `${phone}@kartly.com`;
    const finalPhone = phone.trim() || "9999999999";

    signIn(finalName, finalEmail, finalPhone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-brand" />
            <h2 className="text-base font-bold text-foreground">
              {isSignUp ? "Create Kartly Account" : "Sign In to Kartly"}
            </h2>
          </div>
          <button
            onClick={closeAuthModal}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {authModalReason && (
            <div className="rounded-md bg-brand/10 border border-brand/20 p-3 text-xs font-semibold text-brand">
              {authModalReason}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground focus:border-brand focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Email Address / Mobile Number
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 9999999999"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!phone && /^\d+$/.test(e.target.value)) {
                      setPhone(e.target.value);
                    }
                  }}
                  className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-xs text-foreground focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-brand py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-brand-deep cursor-pointer mt-2"
            >
              {isSignUp ? "Create Account & Continue" : "Sign In & Continue"}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="relative flex items-center justify-center my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-2 text-[10px] uppercase font-bold text-muted-foreground">
              Or Instant Demo Sign-In
            </span>
          </div>

          <button
            type="button"
            onClick={() => signIn("Kartly Demo User", "demo@kartly.com", "9999999999")}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-border bg-muted/60 py-2 text-xs font-bold text-foreground hover:bg-muted cursor-pointer"
          >
            <Phone className="size-3.5 text-brand" />
            Continue as Kartly Demo User (9999999999)
          </button>

          {/* Toggle Login / Signup */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-brand hover:underline cursor-pointer"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
