import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/grocery")({
  head: () => ({
    meta: [
      { title: "Grocery & Daily Essentials Store — Fruits, Vegetables, Atta, Oil & Milk | Kartly" },
      {
        name: "description",
        content: "Explore Grocery & Essentials on Kartly: Fresh Kashmiri apples, Aashirvaad Atta, Fortune Oil, Amul milk, Lay's chips & Surf Excel.",
      },
    ],
  }),
  component: GroceryLayoutRoute,
});

function GroceryLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Grocery & Daily Essentials Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
