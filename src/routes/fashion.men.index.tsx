import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/men/")({
  component: MenFashionIndexRoute,
});

function MenFashionIndexRoute() {
  return <FashionSection selectedGender="men" />;
}
