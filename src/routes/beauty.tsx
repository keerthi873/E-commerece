import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/beauty")({
  head: () => ({
    meta: [
      { title: "Beauty & Personal Care Store — Skincare, Makeup, Haircare & Fragrances | Kartly" },
      {
        name: "description",
        content: "Explore beauty products on Kartly: Lakme lipsticks, Maybelline foundations, L'Oreal serums, Nivea creams & Mamaearth shampoos.",
      },
    ],
  }),
  component: BeautyLayoutRoute,
});

function BeautyLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Beauty & Personal Care Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
