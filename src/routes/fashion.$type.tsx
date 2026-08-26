import { createFileRoute } from "@tanstack/react-router";
import { FashionSection } from "@/components/store/FashionSection";

export const Route = createFileRoute("/fashion/$type")({
  component: FashionTypeRoute,
});

function FashionTypeRoute() {
  const { type } = Route.useParams();
  return <FashionSection selectedType={type} />;
}
