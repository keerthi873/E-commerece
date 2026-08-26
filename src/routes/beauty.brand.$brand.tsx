import { createFileRoute } from "@tanstack/react-router";
import { BeautySection } from "@/components/store/BeautySection";

export const Route = createFileRoute("/beauty/brand/$brand")({
  component: BeautyBrandRoute,
});

function BeautyBrandRoute() {
  const { brand } = Route.useParams();
  return <BeautySection selectedBrand={brand} />;
}
