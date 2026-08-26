import { createFileRoute } from "@tanstack/react-router";
import { BeautySection } from "@/components/store/BeautySection";

export const Route = createFileRoute("/beauty/$type")({
  component: BeautyTypeRoute,
});

function BeautyTypeRoute() {
  const { type } = Route.useParams();
  return <BeautySection selectedType={type} />;
}
