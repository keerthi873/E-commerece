import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home & Living Store — Decor, Kitchen & Bedding | Kartly" },
      {
        name: "description",
        content: "Explore Home & Living on Kartly: IKEA wing chairs, Pepperfry coffee tables, Home Centre bedsheets & kitchenware.",
      },
    ],
  }),
  component: HomeLayoutRoute,
});

function HomeLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Home & Living Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
