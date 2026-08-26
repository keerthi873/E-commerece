import * as React from "react";
import { X, Camera, Sparkles, RefreshCw, CheckCircle2, Sliders } from "lucide-react";
import { Product } from "./catalog";
import { toast } from "sonner";

export function VirtualTryOnModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [scale, setScale] = React.useState(100);
  const [activeColor, setActiveColor] = React.useState("Black");
  const [isSimulatingCamera, setIsSimulatingCamera] = React.useState(true);

  if (!product || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-card border border-border p-6 shadow-2xl overflow-hidden space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand/10 text-brand">
              <Camera className="size-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-foreground text-lg">AR Virtual Try-On Studio</h3>
              <p className="text-xs text-muted-foreground">Simulated Augmented Reality Mirror</p>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Live Mirror Preview Frame */}
        <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-brand/40 shadow-inner flex items-center justify-center">
          {/* Simulated Camera Viewfinder Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

          {/* Model / Mirror Face Background */}
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
            alt="Virtual Mirror Viewfinder"
            className="absolute inset-0 size-full object-cover opacity-85 filter brightness-95"
          />

          {/* Overlay Product Item */}
          <div
            className="relative z-10 transition-all duration-200 drop-shadow-2xl"
            style={{ transform: `scale(${scale / 100})` }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-48 max-w-48 object-contain mix-blend-normal filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* AR Tracking Target Reticle */}
          <div className="absolute inset-8 border border-dashed border-brand/60 rounded-xl pointer-events-none flex items-start justify-between p-2">
            <span className="text-[10px] font-mono text-brand font-bold bg-black/60 px-2 py-0.5 rounded-xs">
              AR TRACKING: LOCKED
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-black/60 px-2 py-0.5 rounded-xs">
              <CheckCircle2 className="size-3" /> 60 FPS
            </span>
          </div>
        </div>

        {/* Live Controls */}
        <div className="space-y-3 pt-2">
          {/* Fit Scale Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span className="flex items-center gap-1">
                <Sliders className="size-3.5 text-brand" /> Fit & Scale Adjustment
              </span>
              <span className="text-brand">{scale}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={150}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
          </div>

          {/* Color Switcher */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-foreground">Color Variant:</span>
            <div className="flex gap-2">
              {["Black", "Navy", "Silver", "Crimson"].map((col) => (
                <button
                  key={col}
                  onClick={() => {
                    setActiveColor(col);
                    toast.success("AR Color Updated", { description: `Switched to ${col}` });
                  }}
                  className={
                    "px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer " +
                    (activeColor === col ? "bg-brand text-primary-foreground border-brand" : "border-border bg-card text-foreground")
                  }
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
