import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/store/SiteHeader";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartPanel } from "@/components/store/CartPanel";
import { ChatBot } from "@/components/store/ChatBot";
import { StoreProvider } from "@/components/store/store-context";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books & Stationery Store — Academic Books, Novels, Notebooks & Office Supplies | Kartly" },
      {
        name: "description",
        content: "Explore Books & Stationery on Kartly: NCERT textbooks, Arihant JEE guides, Atomic Habits novel, Classmate notebooks & Camlin art supplies.",
      },
    ],
  }),
  component: BooksLayoutRoute,
});

function BooksLayoutRoute() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background font-sans">
        <SiteHeader />
        <main>
          <h1 className="sr-only">Books & Stationery Store</h1>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CartPanel />
      <ChatBot />
    </StoreProvider>
  );
}
