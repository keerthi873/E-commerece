import { createFileRoute } from "@tanstack/react-router";
import { BooksSection } from "@/components/store/BooksSection";

export const Route = createFileRoute("/books/brand/$brand")({
  component: BooksBrandRoute,
});

function BooksBrandRoute() {
  const { brand } = Route.useParams();
  return <BooksSection selectedBrand={brand} />;
}
