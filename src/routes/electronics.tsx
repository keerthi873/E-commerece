import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/electronics")({
  head: () => ({
    meta: [
      { title: "Electronics Store — Laptops, TVs, Headphones, Cameras & Smartwatches | Kartly" },
      {
        name: "description",
        content: "Explore electronics on Kartly: MacBooks, gaming laptops, 4K Smart TVs, Sony noise-cancelling headphones & smartwatches.",
      },
    ],
  }),
  component: ElectronicsLayoutRoute,
});

function ElectronicsLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Electronics & Tech Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
