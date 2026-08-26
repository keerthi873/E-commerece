import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/toys-gifts")({
  head: () => ({
    meta: [
      { title: "Toys & Gifts Store — Action Toys, LEGO, Board Games, Hampers & Gift Sets | Kartly" },
      {
        name: "description",
        content: "Explore Toys & Gifts on Kartly: Hot Wheels, LEGO building blocks, Barbie dolls, Monopoly board games, chocolate hampers & greeting cards.",
      },
    ],
  }),
  component: ToysGiftsLayoutRoute,
});

function ToysGiftsLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Toys & Gifts Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
