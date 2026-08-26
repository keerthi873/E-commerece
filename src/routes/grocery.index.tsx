import { createFileRoute } from "@tanstack/react-router";
import { GrocerySection } from "@/components/store/GrocerySection";

export const Route = createFileRoute("/grocery/")({
  component: GroceryIndexRoute,
});

function GroceryIndexRoute() {
  return <GrocerySection />;
}
