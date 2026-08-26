import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/mobiles")({
  head: () => ({
    meta: [
      { title: "Smartphones & Mobiles Store — 5G, Budget, Gaming & Flagships | Kartly" },
      {
        name: "description",
        content: "Explore smartphones on Kartly: trending 5G phones, budget phones under ₹15,000, flagship camera phones & gaming beasts.",
      },
    ],
  }),
  component: MobilesLayoutRoute,
});

function MobilesLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Smartphones & Mobiles Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
