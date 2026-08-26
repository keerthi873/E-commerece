import { createFileRoute } from "@tanstack/react-router";
import { AppliancesSection } from "@/components/store/AppliancesSection";

export const Route = createFileRoute("/appliances/brand/$brand")({
  component: AppliancesBrandRoute,
});

function AppliancesBrandRoute() {
  const { brand } = Route.useParams();
  return <AppliancesSection selectedBrand={brand} />;
}
