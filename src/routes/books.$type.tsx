import { createFileRoute } from "@tanstack/react-router";
import { BooksSection } from "@/components/store/BooksSection";

export const Route = createFileRoute("/books/$type")({
  component: BooksTypeRoute,
});

function BooksTypeRoute() {
  const { type } = Route.useParams();
  return <BooksSection selectedType={type} />;
}
