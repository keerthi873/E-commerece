import * as React from "react";
import { Tag, Sparkles, Copy, Check, Gift, X } from "lucide-react";
import { toast } from "sonner";

export function FloatingOfferTab() {
  const [open, setOpen] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState("");

  const coupons = [
    { code: "MYNTRA2000", label: "FLAT ₹2,000 OFF", desc: "Applicable on orders above ₹4,999" },
    { code: "FASHION500", label: "FLAT ₹500 OFF", desc: "Applicable on first order above ₹1,499" },
    { code: "FREESHIP", label: "FREE DELIVERY", desc: "Zero delivery charges on all cart items" },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied!`, {
      description: "Paste it at checkout to claim instant discount.",
    });
  };

  return (
    <>
      {/* Vertical Fixed Tab on Right Edge */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-l from-rose-600 via-pink-600 to-amber-500 text-white px-2 py-4 rounded-l-2xl shadow-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform flex flex-col items-center gap-2 border-l border-t border-b border-white/20"
        title="View Exclusive Offers"
      >
        <span className="p-1 rounded-full bg-white/20">
          <Gift className="size-4 animate-bounce" />
        </span>
        <span className="[writing-mode:vertical-lr] rotate-180 font-black tracking-widest text-[11px]">
          UP TO ₹2000 OFF
        </span>
      </button>

      {/* Coupon Vouchers Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-2xl space-y-4 text-left">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500">
                <Tag className="size-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-foreground text-lg">Myntra Festive Savings</h3>
                <p className="text-xs text-muted-foreground font-medium">Claim instant discount vouchers</p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-500/5 via-rose-500/5 to-amber-500/5 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 block">
                      {c.label}
                    </span>
                    <strong className="text-sm text-foreground font-extrabold font-mono">{c.code}</strong>
                    <p className="text-[11px] text-muted-foreground font-medium">{c.desc}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(c.code)}
                    className="px-3.5 py-1.5 bg-brand text-primary-foreground font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-brand-deep cursor-pointer transition-colors shrink-0 shadow-xs"
                  >
                    {copiedCode === c.code ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copiedCode === c.code ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
