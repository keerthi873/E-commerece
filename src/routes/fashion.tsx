import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { FashionSection } from "@/components/store/FashionSection";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/fashion")({
  component: FashionRoute,
});

function FashionRoute() {
  return (
    <StoreProvider>
      <FashionPage />
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}

function FashionPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader />

      <main>
        <h1 className="sr-only">Fashion Store — Men, Women & Kids</h1>
        <FashionSection />
      </main>

      <SiteFooter />
    </div>
  );
}
