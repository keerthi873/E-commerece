import { createFileRoute } from "@tanstack/react-router";
import { BooksSection } from "@/components/store/BooksSection";

export const Route = createFileRoute("/books/")({
  component: BooksIndexRoute,
});

function BooksIndexRoute() {
  return <BooksSection />;
}
