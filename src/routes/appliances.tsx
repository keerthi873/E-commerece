import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/appliances")({
  head: () => ({
    meta: [
      { title: "Home Appliances Store — ACs, Refrigerators, Washing Machines & TVs | Kartly" },
      {
        name: "description",
        content: "Explore Home Appliances on Kartly: LG Inverter ACs, Samsung Double Door Fridges, Whirlpool & IFB Washing Machines.",
      },
    ],
  }),
  component: AppliancesLayoutRoute,
});

function AppliancesLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Home Appliances Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
