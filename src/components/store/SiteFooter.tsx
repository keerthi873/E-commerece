import { toast } from "sonner";

const columns = [
  { title: "About", links: ["Contact Us", "About Us", "Careers", "Press"] },
  { title: "Help", links: ["Payments", "Shipping", "Cancellation", "Returns"] },
  { title: "Policy", links: ["Return Policy", "Terms of Use", "Privacy", "Security"] },
  { title: "Sell", links: ["Become a Seller", "Seller Hub", "Advertise", "Gift Cards"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-primary-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm opacity-85">
              {col.links.map((l) => (
                <li key={l}>
                  <button
                    onClick={() =>
                      toast(l, { description: "This page is coming soon on Kartly." })
                    }
                    className="hover:underline"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-[1400px] px-4 py-5 text-xs opacity-70">
          © 2026 Kartly Retail Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
