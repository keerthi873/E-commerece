import { createFileRoute } from "@tanstack/react-router";
import { ProductCard, type Product } from "@/components/store/ProductCard";
import { SiteFooter } from "@/components/store/SiteFooter";
import { SiteHeader } from "@/components/store/SiteHeader";
import bannerHero from "@/assets/banner-hero.jpg";
import bannerAudio from "@/assets/banner-audio.jpg";
import pFashion from "@/assets/p-fashion.jpg";
import pLaptop from "@/assets/p-laptop.jpg";
import pCookware from "@/assets/p-cookware.jpg";
import pWatch from "@/assets/p-watch.jpg";
import pBeauty from "@/assets/p-beauty.jpg";
import pShoes from "@/assets/p-shoes.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kartly — Mobiles, Fashion & Electronics Online" },
      {
        name: "description",
        content:
          "Freedom Sale on Kartly: up to 80% off mobiles, fashion, electronics, home and beauty with free delivery on first order.",
      },
      { property: "og:title", content: "Kartly — Mobiles, Fashion & Electronics Online" },
      {
        property: "og:description",
        content: "Freedom Sale: up to 80% off across mobiles, fashion, electronics and home.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const deals: Product[] = [
  {
    image: pLaptop,
    brand: "Nexon",
    title: "Nexon Air 14 Thin & Light Laptop, 16GB RAM, 512GB SSD",
    price: 54990,
    mrp: 72990,
    rating: 4.4,
    reviews: "12,480",
  },
  {
    image: pWatch,
    brand: "Pulseform",
    title: "Pulseform Active 2 Smartwatch with AMOLED Display",
    price: 2199,
    mrp: 5999,
    rating: 4.2,
    reviews: "38,102",
  },
  {
    image: pFashion,
    brand: "Loomwear",
    title: "Loomwear Solid Cotton Round Neck T-Shirt (Pack of 3)",
    price: 649,
    mrp: 1999,
    rating: 4.1,
    reviews: "9,354",
  },
  {
    image: pShoes,
    brand: "Stridr",
    title: "Stridr Glide Lightweight Running Shoes for Men",
    price: 1499,
    mrp: 3999,
    rating: 4.3,
    reviews: "21,870",
  },
  {
    image: pCookware,
    brand: "Ferra",
    title: "Ferra Triply Stainless Steel Cookware Set, 3 Pieces",
    price: 2749,
    mrp: 4600,
    rating: 4.5,
    reviews: "5,612",
  },
  {
    image: pBeauty,
    brand: "Cleanleaf",
    title: "Cleanleaf Rice Water Face Wash + Glow Serum Combo",
    price: 449,
    mrp: 799,
    rating: 4.0,
    reviews: "44,209",
  },
];

const strips = [
  { label: "Mobiles", note: "From ₹6,999" },
  { label: "Fashion", note: "Up to 70% off" },
  { label: "Electronics", note: "Top brands" },
  { label: "Home", note: "Under ₹499" },
  { label: "Beauty", note: "Buy 2 get 1" },
  { label: "Grocery", note: "Up to 40% off" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main>
        <h1 className="sr-only">Kartly online shopping — mobiles, fashion, electronics and home</h1>

        <section className="mx-auto max-w-[1400px] px-4 pt-4">
          <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
            <div className="relative overflow-hidden bg-brand-deep">
              <img
                src={bannerHero}
                alt="Freedom Sale on flagship smartphones"
                width={1600}
                height={640}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-10">
                <p className="w-fit bg-accent px-2 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-foreground">
                  Freedom Sale
                </p>
                <p className="max-w-xs text-2xl font-bold leading-tight text-primary-foreground sm:text-4xl">
                  Flagship phones at launch prices
                </p>
                <p className="text-sm text-primary-foreground/80">
                  Extra 10% off on bank cards · Starts 8<sup>th</sup> Aug
                </p>
                <button className="w-fit bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90">
                  Notify me
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden bg-accent">
              <img
                src={bannerAudio}
                alt="Audio sale on earbuds and headphones"
                loading="lazy"
                width={1600}
                height={640}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end gap-1 p-6">
                <p className="text-xl font-bold text-accent-foreground">Best of Audio</p>
                <p className="text-sm text-accent-foreground/75">Up to 80% off earbuds</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pt-3">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {strips.map((s) => (
              <li key={s.label}>
                <button className="w-full border border-border bg-card px-4 py-3 text-left transition-colors hover:border-brand">
                  <span className="block text-sm font-semibold text-foreground">{s.label}</span>
                  <span className="block text-xs text-brand">{s.note}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-brand pb-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">Deals of the Day</h2>
              <p className="text-sm text-muted-foreground">Ends in 6 hours · Limited stock</p>
            </div>
            <button className="bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-deep">
              View all
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {deals.map((p) => (
              <ProductCard key={p.title} product={p} />
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <dl className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 sm:grid-cols-3">
            {[
              ["Free delivery", "On your first order, no minimum spend."],
              ["7-day returns", "Easy pickup from your doorstep."],
              ["Secure payments", "UPI, cards, net banking and EMI."],
            ].map(([title, note]) => (
              <div key={title} className="border-l-4 border-accent pl-4">
                <dt className="text-sm font-bold text-foreground">{title}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{note}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
