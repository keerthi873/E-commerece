import { createFileRoute } from "@tanstack/react-router";
import { HomeSection } from "@/components/store/HomeSection";

export const Route = createFileRoute("/home/brand/$brand")({
  component: HomeBrandRoute,
});

function HomeBrandRoute() {
  const { brand } = Route.useParams();
  return <HomeSection selectedBrand={brand} />;
}
