import { createFileRoute } from "@tanstack/react-router";
import { SportsSection } from "@/components/store/SportsSection";

export const Route = createFileRoute("/sports/brand/$brand")({
  component: SportsBrandRoute,
});

function SportsBrandRoute() {
  const { brand } = Route.useParams();
  return <SportsSection selectedBrand={brand} />;
}
