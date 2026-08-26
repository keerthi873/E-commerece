import * as React from "react";
import { Sparkles, Flame, Coffee, PartyPopper, Briefcase, Dumbbell } from "lucide-react";
import { categoryPagesData } from "@/data/categoryData";
import { ProductCard } from "./ProductCard";

const MOODS = [
  { id: "casual", label: "Casual Vibes", icon: Coffee, desc: "Relaxed daily wear & comfortable tees" },
  { id: "party", label: "Party Night", icon: PartyPopper, desc: "Trendy dresses, blazers & party shoes" },
  { id: "formal", label: "Executive Formal", icon: Briefcase, desc: "Office shirts, trousers & laptops" },
  { id: "gym", label: "Gym & Active", icon: Dumbbell, desc: "Workout tights, tracksuits & sneakers" },
  { id: "ethnic", label: "Festive Ethnic", icon: Flame, desc: "Silk sarees, festive kurtas & lehengas" },
];

export function MoodShopping() {
  const [activeMood, setActiveMood] = React.useState("casual");

  // Filter products by mood
  const moodProducts = React.useMemo(() => {
    const allFashion = categoryPagesData.fashion.sections.flatMap((s) => s.products);
    const allMobiles = categoryPagesData.mobiles.sections.flatMap((s) => s.products);
    const allElec = categoryPagesData.electronics.sections.flatMap((s) => s.products);

    if (activeMood === "casual") return allFashion.slice(0, 4);
    if (activeMood === "party") return [allFashion[0], allFashion[4], allFashion[7], allFashion[1] || allFashion[0]];
    if (activeMood === "formal") return [allElec[0], allElec[1], allFashion[2], allFashion[0]];
    if (activeMood === "gym") return [allFashion[3], allFashion[5], allFashion[9] || allFashion[0], allElec[3]];
    if (activeMood === "ethnic") return [allFashion[2], allFashion[8] || allFashion[0], allFashion[0], allFashion[1]];

    return allFashion.slice(0, 4);
  }, [activeMood]);

  return (
    <section className="my-8 space-y-6">
      <div className="border-l-4 border-brand pl-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-extrabold uppercase tracking-wider border border-brand/20">
          <Sparkles className="size-3.5" /> Personalized Curation
        </span>
        <h2 className="text-2xl font-black tracking-tight text-foreground mt-1">
          Shop By Mood
        </h2>
        <p className="text-xs text-muted-foreground font-medium">
          Select your vibe to discover handpicked fashion & tech gadgets
        </p>
      </div>

      {/* Mood Selector Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MOODS.map((m) => {
          const Icon = m.icon;
          const isActive = activeMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMood(m.id)}
              className={
                "px-5 py-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer flex items-center gap-3 shadow-xs " +
                (isActive
                  ? "bg-brand text-primary-foreground border-brand scale-105"
                  : "bg-card text-foreground border-border hover:border-brand/60 hover:text-brand")
              }
            >
              <div
                className={
                  "p-2 rounded-xl " + (isActive ? "bg-white/20 text-white" : "bg-brand/10 text-brand")
                }
              >
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold leading-tight">{m.label}</p>
                <p className={"text-[10px] " + (isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {m.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Curated Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moodProducts.map((p) => (
          <ProductCard key={p.id} product={p} badgeLabel="Curated Mood" />
        ))}
      </div>
    </section>
  );
}
