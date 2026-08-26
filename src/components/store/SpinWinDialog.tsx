import * as React from "react";
import { X, Sparkles, Trophy, Check, Gift } from "lucide-react";
import { toast } from "sonner";

const REWARDS = [
  { code: "SPIN10", label: "10% OFF", desc: "10% discount on order" },
  { code: "FLAT100", label: "₹100 OFF", desc: "₹100 instant cash off" },
  { code: "FREESHIP", label: "Free Delivery", desc: "Zero delivery charges" },
  { code: "MEGA20", label: "20% OFF", desc: "20% festive super savings" },
  { code: "LUCKY250", label: "₹250 OFF", desc: "₹250 off on orders > ₹1000" },
  { code: "SPINBONUS", label: "50 Pts Bonus", desc: "50 extra reward points" },
];

export function SpinWinDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [spinning, setSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [wonReward, setWonReward] = React.useState<typeof REWARDS[0] | null>(null);

  if (!open) return null;

  const handleSpin = () => {
    if (spinning || wonReward) return;
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * REWARDS.length);
    const reward = REWARDS[randomIndex];

    // Calculate rotation angle (multi-spin degrees + section offset)
    const baseDegrees = 360 * 5; // 5 full rotations
    const sectionDegrees = 360 / REWARDS.length;
    const finalDegree = baseDegrees + randomIndex * sectionDegrees + sectionDegrees / 2;

    setRotation(finalDegree);

    setTimeout(() => {
      setSpinning(false);
      setWonReward(reward);
      toast.success(`🎉 Congratulations! You won ${reward.label}!`, {
        description: `Use coupon code "${reward.code}" at checkout.`,
      });
    }, 3500);
  };

  const copyCoupon = () => {
    if (!wonReward) return;
    navigator.clipboard.writeText(wonReward.code);
    toast.success("Coupon code copied!", { description: wonReward.code });
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-border p-6 shadow-2xl overflow-hidden text-center space-y-5">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="size-5" />
        </button>

        {/* Title */}
        <div className="space-y-1 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-extrabold uppercase tracking-wider border border-amber-500/20">
            <Gift className="size-3.5" /> Spin & Win Rewards
          </span>
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Lucky Discount Wheel
          </h2>
          <p className="text-xs text-muted-foreground font-medium">
            Spin the wheel to win exclusive coupons & reward points!
          </p>
        </div>

        {/* Spinning Wheel */}
        <div className="relative mx-auto size-56 sm:size-64 flex items-center justify-center my-4">
          {/* Wheel Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-brand filter drop-shadow-md">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-brand" />
          </div>

          {/* SVG Wheel */}
          <div
            className="size-full rounded-full border-4 border-brand/80 shadow-xl overflow-hidden transition-transform duration-3500 cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="size-full">
              {REWARDS.map((r, i) => {
                const angle = 360 / REWARDS.length;
                const startAngle = i * angle;
                const endAngle = (i + 1) * angle;
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const color = i % 2 === 0 ? "fill-brand" : "fill-accent";

                return (
                  <g key={r.code}>
                    <path
                      d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                      className={`${color} opacity-90`}
                    />
                    <text
                      x="50"
                      y="25"
                      transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                      textAnchor="middle"
                      className="fill-primary-foreground text-[7px] font-black tracking-tighter"
                    >
                      {r.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Action Button / Reward State */}
        {wonReward ? (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 animate-in zoom-in-95 duration-200">
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Coupon Won!
            </p>
            <p className="text-lg font-black text-foreground">{wonReward.label}</p>
            <button
              onClick={copyCoupon}
              className="w-full py-2.5 bg-brand text-primary-foreground font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-brand-deep transition-all"
            >
              <Check className="size-4" /> Copy Coupon Code ({wonReward.code})
            </button>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full py-3 bg-brand text-primary-foreground font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-brand-deep transition-all disabled:opacity-50"
          >
            <Sparkles className="size-4" /> {spinning ? "Spinning Wheel..." : "Spin Now"}
          </button>
        )}
      </div>
    </div>
  );
}
