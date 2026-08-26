import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: [
      { title: "Sports & Fitness Store — Cricket Bats, Footballs, Treadmills & Gym Gear | Kartly" },
      {
        name: "description",
        content: "Explore Sports & Fitness on Kartly: SG Cricket bats, Adidas footballs, Fitkit treadmills, Kore dumbbells, Yonex rackets & Firefox bikes.",
      },
    ],
  }),
  component: SportsLayoutRoute,
});

function SportsLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Sports & Fitness Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
