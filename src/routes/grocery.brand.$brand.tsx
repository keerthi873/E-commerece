import { createFileRoute } from "@tanstack/react-router";
import { GrocerySection } from "@/components/store/GrocerySection";

export const Route = createFileRoute("/grocery/brand/$brand")({
  component: GroceryBrandRoute,
});

function GroceryBrandRoute() {
  const { brand } = Route.useParams();
  return <GrocerySection selectedBrand={brand} />;
}
