import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/")({
  component: FashionIndexPage,
});

function FashionIndexPage() {
  return <FashionSection />;
}
