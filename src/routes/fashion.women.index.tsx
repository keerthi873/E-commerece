import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/women/")({
  component: WomenFashionIndexRoute,
});

function WomenFashionIndexRoute() {
  return <FashionSection selectedGender="women" />;
}
